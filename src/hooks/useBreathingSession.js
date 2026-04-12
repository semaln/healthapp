import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage.js'

const TICK_MS = 50

function getPhaseInfo(phases, totalElapsed) {
  const totalCycleLen = phases.reduce((sum, p) => sum + p.duration, 0)
  if (totalCycleLen === 0) return { phaseIndex: 0, phaseProgress: 0, phaseCountdown: phases[0]?.duration ?? 0 }
  const cyclePos = totalElapsed % totalCycleLen
  let cumulative = 0
  for (let i = 0; i < phases.length; i++) {
    const end = cumulative + phases[i].duration
    if (cyclePos < end) {
      const phaseElapsed = cyclePos - cumulative
      return {
        phaseIndex: i,
        phaseProgress: phaseElapsed / phases[i].duration,
        phaseCountdown: Math.max(1, Math.ceil(phases[i].duration - phaseElapsed)),
      }
    }
    cumulative += phases[i].duration
  }
  return { phaseIndex: 0, phaseProgress: 0, phaseCountdown: phases[0]?.duration ?? 0 }
}

function playTone(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.value = type.includes('inhale') ? 523 : type.includes('hold') ? 440 : 392
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
    osc.start()
    osc.stop(ctx.currentTime + 0.15)
  } catch {}
}

export function useBreathingSession(
  exercise,
  { quickMode = false, quickBreaths = 5, onComplete } = {}
) {
  const [bSettings] = useLocalStorage('breathing_settings', {
    sound_enabled: false,
    vibration_enabled: true,
  })
  const [, setBreathingLog] = useLocalStorage('breathing_log', [])

  const [status, setStatus] = useState('idle') // idle | running | paused | done
  const [totalElapsed, setTotalElapsed] = useState(0)
  const [breathCount, setBreathCount] = useState(0)

  const intervalRef = useRef(null)
  const elapsedRef = useRef(0)
  const breathCountRef = useRef(0)
  const prevPhaseIndexRef = useRef(-1)
  const onCompleteRef = useRef(onComplete)
  const bSettingsRef = useRef(bSettings)

  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])
  useEffect(() => { bSettingsRef.current = bSettings }, [bSettings])

  const phases = exercise.phases
  const sessionDuration = exercise.defaultDuration
  const isQuick = quickMode && !!exercise.quickMode

  const phaseInfo = getPhaseInfo(phases, totalElapsed)

  const totalProgress = isQuick
    ? breathCount / quickBreaths
    : Math.min(totalElapsed / sessionDuration, 1)

  const elapsed_m = Math.floor(totalElapsed / 60)
  const elapsed_s = Math.floor(totalElapsed % 60)
  const total_m = Math.floor(sessionDuration / 60)
  const total_s = sessionDuration % 60
  const timeDisplay = isQuick
    ? `${breathCount} / ${quickBreaths} andetag`
    : `${elapsed_m}:${String(elapsed_s).padStart(2, '0')} / ${total_m}:${String(total_s).padStart(2, '0')}`

  const finishSession = useCallback(
    (finalElapsed, finalBreaths) => {
      setBreathingLog((prev) => [
        ...prev,
        {
          date: new Date().toISOString(),
          exercise_id: exercise.id,
          duration_seconds: Math.round(finalElapsed),
          completed: true,
          breath_count: finalBreaths,
        },
      ])
      setStatus('done')
      onCompleteRef.current?.()
    },
    [exercise.id, setBreathingLog]
  )

  useEffect(() => {
    if (status !== 'running') return

    intervalRef.current = setInterval(() => {
      elapsedRef.current += TICK_MS / 1000
      const newElapsed = elapsedRef.current

      const newPhaseInfo = getPhaseInfo(phases, newElapsed)

      if (newPhaseInfo.phaseIndex !== prevPhaseIndexRef.current) {
        const newType = phases[newPhaseInfo.phaseIndex]?.type ?? ''
        prevPhaseIndexRef.current = newPhaseInfo.phaseIndex

        if (bSettingsRef.current.sound_enabled) playTone(newType)
        if (bSettingsRef.current.vibration_enabled && navigator.vibrate) navigator.vibrate(60)

        if (isQuick && newPhaseInfo.phaseIndex === 0) {
          breathCountRef.current++
          setBreathCount(breathCountRef.current)
          if (breathCountRef.current >= quickBreaths) {
            clearInterval(intervalRef.current)
            finishSession(newElapsed, breathCountRef.current)
            return
          }
        }
      }

      if (!isQuick && newElapsed >= sessionDuration) {
        clearInterval(intervalRef.current)
        setTotalElapsed(sessionDuration)
        finishSession(sessionDuration, breathCountRef.current)
        return
      }

      setTotalElapsed(newElapsed)
    }, TICK_MS)

    return () => clearInterval(intervalRef.current)
  }, [status, isQuick, quickBreaths, sessionDuration, phases, finishSession])

  const start = () => {
    elapsedRef.current = 0
    breathCountRef.current = 0
    prevPhaseIndexRef.current = -1
    setTotalElapsed(0)
    setBreathCount(0)
    setStatus('running')
  }

  const pause = () => {
    clearInterval(intervalRef.current)
    setStatus('paused')
  }

  const resume = () => setStatus('running')

  const stop = () => {
    clearInterval(intervalRef.current)
    elapsedRef.current = 0
    breathCountRef.current = 0
    prevPhaseIndexRef.current = -1
    setTotalElapsed(0)
    setBreathCount(0)
    setStatus('idle')
  }

  return {
    status,
    currentPhase: phases[phaseInfo.phaseIndex],
    phaseIndex: phaseInfo.phaseIndex,
    phaseProgress: phaseInfo.phaseProgress,
    phaseCountdown: phaseInfo.phaseCountdown,
    totalProgress,
    timeDisplay,
    breathCount,
    start,
    pause,
    resume,
    stop,
  }
}
