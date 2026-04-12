import { useEffect } from 'react'
import { X, Volume2, VolumeX, Pause, Play } from 'lucide-react'
import { useBreathingSession } from '../../hooks/useBreathingSession.js'
import { useChecklist } from '../../hooks/useChecklist.js'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import BreathingCircle from './BreathingCircle.jsx'

const DEFAULT_B_SETTINGS = { sound_enabled: false, vibration_enabled: true }

export default function BreathingSession({ exercise, quickMode = false, onClose }) {
  const [bSettings, setBSettings] = useLocalStorage('breathing_settings', DEFAULT_B_SETTINGS)
  const { checklist, toggle } = useChecklist()

  const handleComplete = () => {
    const hour = new Date().getHours()
    if (hour >= 6 && hour < 12 && !checklist.morning_breathing) toggle('morning_breathing')
    else if (hour >= 17 && !checklist.evening_breathing) toggle('evening_breathing')
  }

  const session = useBreathingSession(exercise, {
    quickMode,
    quickBreaths: exercise.quickBreaths ?? 5,
    onComplete: handleComplete,
  })

  const {
    status,
    currentPhase,
    phaseCountdown,
    totalProgress,
    timeDisplay,
    breathCount,
    start,
    pause,
    resume,
    stop,
  } = session

  const isQuick = quickMode && !!exercise.quickMode
  const color = exercise.color ?? '#1d3528'
  const active = status === 'running' || status === 'paused'

  // Auto-start when session opens
  useEffect(() => {
    start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleSound = () =>
    setBSettings((prev) => ({ ...prev, sound_enabled: !prev.sound_enabled }))

  const handleStop = () => {
    stop()
    onClose()
  }

  // ── Done state ────────────────────────────────────────────────────────────────
  if (status === 'done') {
    const [elapsed] = timeDisplay.split(' / ')
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-8 pt-safe pb-safe">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: color + '18', border: `2px solid ${color}40` }}
        >
          <span className="text-4xl">🌿</span>
        </div>
        <h2 className="font-display text-3xl text-primary font-light mb-1">Bra jobbat!</h2>
        <p className="text-sm font-sans text-text-secondary mb-8">{exercise.name}</p>

        <div className="flex gap-8 mb-10">
          {!isQuick && (
            <div className="text-center">
              <div className="font-display text-3xl text-text-primary font-light">{elapsed}</div>
              <div className="text-xs font-sans text-text-secondary mt-1">tid</div>
            </div>
          )}
          {isQuick && (
            <div className="text-center">
              <div className="font-display text-3xl text-text-primary font-light">{breathCount}</div>
              <div className="text-xs font-sans text-text-secondary mt-1">andetag</div>
            </div>
          )}
        </div>

        <div className="flex gap-3 w-full max-w-xs">
          <button
            onClick={() => start()}
            className="flex-1 py-3 rounded-2xl border border-border text-sm font-sans font-medium text-text-primary active:scale-95 transition-all"
          >
            Gör igen
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl text-sm font-sans font-medium text-white active:scale-95 transition-all"
            style={{ background: color }}
          >
            Klart
          </button>
        </div>
      </div>
    )
  }

  // ── Active session ─────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background pt-safe pb-safe">
      {/* Progress bar */}
      <div className="h-1 bg-surface flex-shrink-0">
        <div
          className="h-full"
          style={{
            width: `${totalProgress * 100}%`,
            background: color,
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
        <div>
          <div className="font-sans font-semibold text-text-primary text-[15px]">
            {exercise.name}
          </div>
          <div className="text-xs font-sans text-text-secondary mt-0.5">{timeDisplay}</div>
        </div>
        <button
          onClick={handleStop}
          className="w-9 h-9 rounded-full bg-surface flex items-center justify-center active:scale-90 transition-all"
          aria-label="Stäng"
        >
          <X size={16} className="text-text-secondary" />
        </button>
      </div>

      {/* Nadi Shodhana finger instruction */}
      {exercise.fingerInstruction && (
        <div className="mx-5 mb-1 px-3 py-2 rounded-xl bg-surface flex-shrink-0">
          <p className="text-xs font-sans text-text-secondary leading-relaxed">
            👆 {exercise.fingerInstruction}
          </p>
        </div>
      )}

      {/* Center */}
      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 min-h-0">
        <BreathingCircle
          phaseType={currentPhase?.type}
          phaseDuration={currentPhase?.duration}
          color={color}
          active={active}
          size={220}
        />

        <div className="text-center">
          <div className="font-display text-2xl text-text-primary font-light">
            {currentPhase?.name ?? ''}
          </div>

          {!isQuick && status === 'running' && (
            <div
              className="font-display text-6xl font-light mt-1 tabular-nums leading-none"
              style={{ color }}
            >
              {phaseCountdown}
            </div>
          )}

          {status === 'paused' && (
            <div className="text-sm font-sans text-text-secondary mt-2">Pausad</div>
          )}

          <div className="text-sm font-sans text-text-secondary mt-2 leading-relaxed max-w-[260px]">
            {currentPhase?.instruction ?? ''}
          </div>

          {currentPhase?.side && (
            <div className="text-xs font-sans font-semibold mt-1.5" style={{ color }}>
              {currentPhase.side === 'left'
                ? '← Vänster näsborre'
                : currentPhase.side === 'right'
                ? 'Höger näsborre →'
                : '← Stäng båda →'}
            </div>
          )}

          {isQuick && (
            <div className="font-sans text-sm text-text-secondary mt-2">
              Andetag {Math.min(breathCount + 1, exercise.quickBreaths ?? 5)} av{' '}
              {exercise.quickBreaths ?? 5}
            </div>
          )}
        </div>
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-center gap-6 px-6 py-6 flex-shrink-0">
        <button
          onClick={toggleSound}
          className="w-12 h-12 rounded-full bg-surface flex items-center justify-center active:scale-90 transition-all"
          aria-label={bSettings.sound_enabled ? 'Stäng av ljud' : 'Slå på ljud'}
        >
          {bSettings.sound_enabled ? (
            <Volume2 size={18} className="text-text-primary" />
          ) : (
            <VolumeX size={18} className="text-text-secondary" />
          )}
        </button>

        <button
          onClick={status === 'paused' ? resume : pause}
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all"
          style={{ background: color }}
          aria-label={status === 'paused' ? 'Fortsätt' : 'Pausa'}
        >
          {status === 'paused' ? (
            <Play size={26} fill="white" className="text-white ml-1" />
          ) : (
            <Pause size={26} fill="white" className="text-white" />
          )}
        </button>

        <button
          onClick={handleStop}
          className="w-12 h-12 rounded-full bg-surface flex items-center justify-center active:scale-90 transition-all"
          aria-label="Avsluta"
        >
          <X size={18} className="text-text-secondary" />
        </button>
      </div>
    </div>
  )
}
