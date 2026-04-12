import { useState, useEffect, useRef } from 'react'
import Card from '../ui/Card.jsx'

const SESSION_SECS = 5 * 60
const TICK_MS = 50
const MIN_SCALE = 0.42
const MAX_SCALE = 1.0
const INNER_R = 80
const OUTER_R = 92
const CX = 100
const CY = 100
const CIRCUM = 2 * Math.PI * OUTER_R

// Default pattern — 4s in / 4s hold / 6s out
const DEFAULT_PATTERN = { inhale: 4, hold: 4, exhale: 6 }

export default function BreathingGuide() {
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [done, setDone] = useState(false)

  const intervalRef = useRef(null)
  const elapsedRef = useRef(0)

  const { inhale, hold, exhale } = DEFAULT_PATTERN
  const cycleLen = inhale + hold + exhale

  // Derived phase
  const cyclePos = elapsed % cycleLen
  let phase, phaseProgress
  if (cyclePos < inhale) {
    phase = 'inhale'
    phaseProgress = cyclePos / inhale
  } else if (cyclePos < inhale + hold) {
    phase = 'hold'
    phaseProgress = hold > 0 ? (cyclePos - inhale) / hold : 1
  } else {
    phase = 'exhale'
    phaseProgress = exhale > 0 ? (cyclePos - inhale - hold) / exhale : 1
  }

  const scale =
    phase === 'inhale'
      ? MIN_SCALE + (MAX_SCALE - MIN_SCALE) * phaseProgress
      : phase === 'hold'
      ? MAX_SCALE
      : MAX_SCALE - (MAX_SCALE - MIN_SCALE) * phaseProgress

  const phaseCountdown =
    phase === 'inhale'
      ? Math.ceil(inhale - cyclePos)
      : phase === 'hold'
      ? Math.ceil(inhale + hold - cyclePos)
      : Math.ceil(cycleLen - cyclePos)

  const sessionProgress = Math.min(elapsed / SESSION_SECS, 1)
  const sessionOffset = CIRCUM * (1 - sessionProgress)

  const phaseLabel = done
    ? 'Klar'
    : !running && elapsed === 0
    ? 'Redo'
    : phase === 'inhale'
    ? 'Andas in'
    : phase === 'hold'
    ? 'Håll'
    : 'Andas ut'

  const start = () => {
    elapsedRef.current = 0
    setElapsed(0)
    setDone(false)
    setRunning(true)
  }

  const stop = () => {
    clearInterval(intervalRef.current)
    setRunning(false)
  }

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        elapsedRef.current += TICK_MS / 1000
        if (elapsedRef.current >= SESSION_SECS) {
          clearInterval(intervalRef.current)
          setRunning(false)
          setElapsed(SESSION_SECS)
          setDone(true)
        } else {
          setElapsed(elapsedRef.current)
        }
      }, TICK_MS)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const minsLeft = Math.ceil((SESSION_SECS - elapsed) / 60)

  return (
    <Card>
      <h2 className="section-label mb-4">Andningsövning</h2>
      <div className="flex flex-col items-center gap-2">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Session progress track */}
          <circle
            cx={CX} cy={CY} r={OUTER_R}
            fill="none" stroke="#ede8df" strokeWidth="4"
          />
          {/* Session progress fill */}
          <circle
            cx={CX} cy={CY} r={OUTER_R}
            fill="none" stroke="#1d3528" strokeWidth="4"
            strokeDasharray={CIRCUM}
            strokeDashoffset={sessionOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${CX} ${CY})`}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
          {/* Breathing circle */}
          <circle
            cx={CX} cy={CY} r={INNER_R}
            fill="rgba(29,53,40,0.07)"
            stroke="rgba(29,53,40,0.18)"
            strokeWidth="1.5"
            style={{
              transformOrigin: `${CX}px ${CY}px`,
              transform: `scale(${scale.toFixed(4)})`,
              transition: running ? `transform ${TICK_MS * 1.8}ms linear` : 'none',
            }}
          />
          {/* Phase label */}
          <text
            x={CX} y={CY - 6}
            textAnchor="middle"
            fontFamily="Cormorant, serif"
            fontSize="15"
            fill="#1d3528"
            fontWeight="500"
          >
            {phaseLabel}
          </text>
          {/* Countdown */}
          {running && !done && (
            <text
              x={CX} y={CY + 20}
              textAnchor="middle"
              fontFamily="Jost, sans-serif"
              fontSize="28"
              fill="#1d3528"
              fontWeight="300"
            >
              {phaseCountdown}
            </text>
          )}
        </svg>

        <p className="text-xs font-sans text-text-secondary/60 text-center">
          {running
            ? `${minsLeft} min kvar · ${inhale}s in / ${hold}s håll / ${exhale}s ut`
            : done
            ? '5 minuter klara 🌿'
            : `5 min · ${inhale}s in / ${hold}s håll / ${exhale}s ut`}
        </p>

        <button
          onClick={running ? stop : start}
          className="mt-1 px-8 py-2.5 rounded-2xl text-sm font-sans font-medium transition-all active:scale-95"
          style={{
            background: running ? '#ede8df' : '#1d3528',
            color: running ? '#1d3528' : '#faf8f4',
          }}
        >
          {running ? 'Stoppa' : done ? 'Gör om' : 'Starta'}
        </button>
      </div>
    </Card>
  )
}
