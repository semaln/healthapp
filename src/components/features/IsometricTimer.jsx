import { useState, useEffect, useRef } from 'react'
import { X, Pause, Play, SkipForward } from 'lucide-react'

// SVG ring: viewBox 240×240, r=100, cx=cy=120
const RADIUS = 100
const CIRCUMFERENCE = 2 * Math.PI * RADIUS // ≈ 628.318
const REST_SECONDS = 30

function formatTime(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  if (m > 0) return `${m}:${String(sec).padStart(2, '0')}`
  return String(s)
}

export default function IsometricTimer({ exercise, onClose, onComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(exercise.timerSeconds)
  const [phase, setPhase] = useState('work') // 'work' | 'rest' | 'done'
  const [currentSet, setCurrentSet] = useState(1)
  const [paused, setPaused] = useState(false)

  // Refs to avoid stale closures in interval
  const phaseRef = useRef(phase)
  const currentSetRef = useRef(currentSet)
  const secondsLeftRef = useRef(secondsLeft)

  useEffect(() => { phaseRef.current = phase }, [phase])
  useEffect(() => { currentSetRef.current = currentSet }, [currentSet])
  useEffect(() => { secondsLeftRef.current = secondsLeft }, [secondsLeft])

  // Main countdown interval
  useEffect(() => {
    if (paused || phase === 'done') return

    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1

        // Reached 0 — handle phase transition
        clearInterval(id)
        const p = phaseRef.current
        const set = currentSetRef.current

        if (p === 'work') {
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([120, 60, 120])
          }
          if (set >= exercise.sets) {
            setPhase('done')
            setTimeout(() => onComplete(exercise.id), 1800)
            return 0
          } else {
            setPhase('rest')
            return REST_SECONDS
          }
        } else {
          // rest phase ended
          setCurrentSet((prev) => prev + 1)
          setPhase('work')
          return exercise.timerSeconds
        }
      })
    }, 1000)

    return () => clearInterval(id)
  }, [paused, phase, currentSet])

  const totalForPhase = phase === 'rest' ? REST_SECONDS : exercise.timerSeconds
  const progress = 1 - secondsLeft / totalForPhase
  const ringOffset = CIRCUMFERENCE * (1 - progress) // full ring at start, empty at end

  const workColor = '#6b8f71'   // sage green
  const restColor = '#b06a47'   // terracotta
  const ringColor = phase === 'rest' ? restColor : workColor

  const handleSkip = () => {
    if (phase === 'work') {
      if (currentSet >= exercise.sets) {
        setPhase('done')
        setTimeout(() => onComplete(exercise.id), 1800)
      } else {
        setPhase('rest')
        setSecondsLeft(REST_SECONDS)
      }
    } else {
      setCurrentSet((s) => s + 1)
      setPhase('work')
      setSecondsLeft(exercise.timerSeconds)
    }
  }

  const isDone = phase === 'done'

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between"
      style={{ background: 'rgba(10, 20, 14, 0.97)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 45%, ${ringColor}18 0%, transparent 70%)`,
          transition: 'background 0.8s ease',
        }}
      />

      {/* Top bar */}
      <div className="relative w-full flex items-center justify-between px-5 pt-safe" style={{ paddingTop: 'max(env(safe-area-inset-top), 20px)' }}>
        {/* Set indicator */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: exercise.sets }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i < currentSet - 1
                  ? workColor
                  : i === currentSet - 1 && !isDone
                  ? '#fff'
                  : 'rgba(255,255,255,0.2)',
                transform: i === currentSet - 1 && !isDone ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
          <span className="text-white/50 text-xs font-sans ml-1">
            Set {isDone ? exercise.sets : currentSet} av {exercise.sets}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <X size={18} color="rgba(255,255,255,0.7)" />
        </button>
      </div>

      {/* Center: ring + countdown */}
      <div className="relative flex flex-col items-center gap-4">
        <svg viewBox="0 0 240 240" width="220" height="220" className="-rotate-90">
          {/* Track */}
          <circle
            cx="120" cy="120" r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
          />
          {/* Progress ring */}
          <circle
            cx="120" cy="120" r={RADIUS}
            fill="none"
            stroke={isDone ? workColor : ringColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={isDone ? 0 : ringOffset}
            style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.5s ease' }}
          />
        </svg>

        {/* Countdown text (centered over ring) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isDone ? (
            <div className="flex flex-col items-center gap-2 animate-fade-up">
              <span className="text-5xl">✓</span>
              <span
                className="font-display text-white/90 font-light"
                style={{ fontSize: '1.1rem', letterSpacing: '0.05em' }}
              >
                Övning klar!
              </span>
            </div>
          ) : (
            <>
              <span
                className="font-display text-white font-light tabular-nums"
                style={{ fontSize: '4rem', lineHeight: 1, letterSpacing: '-0.02em' }}
              >
                {formatTime(secondsLeft)}
              </span>
              <span
                className="font-sans text-white/40 font-light mt-1"
                style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
              >
                {phase === 'rest' ? 'vila' : 'sekunder'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Exercise label */}
      <div className="text-center px-8">
        <div
          className="font-display text-white/80 font-light"
          style={{ fontSize: '1.25rem', letterSpacing: '0.01em' }}
        >
          {exercise.name}
        </div>
        {phase === 'rest' && !isDone && (
          <div
            className="font-sans mt-1 font-light animate-fade-up"
            style={{ color: restColor, fontSize: '0.8rem', letterSpacing: '0.08em' }}
          >
            VILA — nästa set startar snart
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 pb-safe" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 36px)' }}>
        {!isDone ? (
          <>
            <button
              onClick={() => setPaused((p) => !p)}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-150 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              {paused
                ? <Play size={24} color="white" fill="white" />
                : <Pause size={24} color="white" />
              }
            </button>

            <button
              onClick={handleSkip}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-150 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <SkipForward size={20} color="rgba(255,255,255,0.5)" />
            </button>
          </>
        ) : (
          <button
            onClick={onClose}
            className="px-8 py-3.5 rounded-2xl font-sans font-medium text-sm text-white animate-fade-up active:scale-95 transition-all"
            style={{ background: workColor }}
          >
            Stäng
          </button>
        )}
      </div>
    </div>
  )
}
