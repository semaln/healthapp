import { useState, useEffect } from 'react'

const MIN_SCALE = 0.38
const MAX_SCALE = 1.0

/**
 * Animated breathing circle.
 * Uses CSS transitions over the full phase duration for smooth, native animation.
 * Only updates state when the phase type changes (not on every timer tick).
 */
export default function BreathingCircle({ phaseType, phaseDuration, color, active, size = 220 }) {
  const [scale, setScale] = useState(MIN_SCALE)
  const [transitionDuration, setTransitionDuration] = useState(500)

  useEffect(() => {
    if (!active) {
      setScale(MIN_SCALE)
      setTransitionDuration(600)
      return
    }
    if (phaseType?.includes('inhale')) {
      setScale(MAX_SCALE)
      setTransitionDuration((phaseDuration ?? 4) * 1000)
    } else if (phaseType?.includes('exhale')) {
      setScale(MIN_SCALE)
      setTransitionDuration((phaseDuration ?? 6) * 1000)
    }
    // hold: no scale change — circle stays at current size and pulses via CSS animation
  }, [phaseType, phaseDuration, active])

  const isHold = active && phaseType?.includes('hold')

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color + '18',
        border: `1.5px solid ${color}45`,
        boxShadow: `0 0 60px ${color}20, inset 0 0 30px ${color}08`,
        transform: `scale(${scale})`,
        transition: isHold ? 'none' : `transform ${transitionDuration}ms ease-in-out`,
        animation: isHold ? 'breathHoldPulse 2.5s ease-in-out infinite' : 'none',
      }}
    />
  )
}
