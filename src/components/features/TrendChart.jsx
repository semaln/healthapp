// Pure SVG bar chart — no external dependencies
// viewBox: 280 × 84 (chart area 0–68, labels 72–82)

const CHART_TOP = 4
const CHART_BOTTOM = 68
const CHART_H = CHART_BOTTOM - CHART_TOP  // 64px
const LABEL_Y = 80
const SLOT_W = 20  // 280 / 14 slots
const BAR_W = 12

function formatValue(val, unit) {
  if (val === null || val === undefined) return '—'
  if (unit === 'steg' && val >= 1000) return `${(val / 1000).toFixed(1)}k`
  if (unit === 'h') return `${val}h`
  return String(Math.round(val))
}

function barColor(value, goal, invertGoal, baseColor) {
  if (value === null) return 'rgba(212,205,193,0.35)'
  if (invertGoal) return value <= goal ? baseColor : '#b06a47'
  return value >= goal ? baseColor : 'rgba(107,143,113,0.4)'
}

export default function TrendChart({ label, data, goal, goalLabel, max, color = '#4d7a56', unit = '', invertGoal = false, subtitle = null }) {
  const todayKey = data[data.length - 1]?.date

  // Stats: today's value + 7-day average
  const validValues = data.filter((d) => d.value !== null).map((d) => d.value)
  const last7 = data.slice(-7).filter((d) => d.value !== null).map((d) => d.value)
  const avg7 = last7.length ? Math.round((last7.reduce((a, b) => a + b, 0) / last7.length) * 10) / 10 : null
  const todayVal = data.find((d) => d.date === todayKey)?.value ?? null
  const lastVal = validValues.length ? validValues[validValues.length - 1] : null

  const goalY = CHART_BOTTOM - (goal / max) * CHART_H

  return (
    <div className="mb-5">
      {/* Header row */}
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-text-secondary">
          {label}
        </span>
        <div className="flex items-baseline gap-2">
          {lastVal !== null && (
            <span className="font-display text-text-primary" style={{ fontSize: '1.25rem', lineHeight: 1 }}>
              {formatValue(lastVal, unit)}
            </span>
          )}
          {avg7 !== null && (
            <span className="text-[11px] font-sans text-text-secondary">
              snitt {formatValue(avg7, unit)}
            </span>
          )}
        </div>
      </div>

      {/* SVG chart */}
      <svg
        viewBox="0 0 280 84"
        width="100%"
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        {/* Background track */}
        <rect x="0" y={CHART_TOP} width="280" height={CHART_H} rx="3" fill="rgba(237,232,223,0.5)" />

        {/* Goal line */}
        <line
          x1="0" y1={goalY}
          x2="280" y2={goalY}
          stroke="#b06a47"
          strokeWidth="1"
          strokeDasharray="4,3"
          opacity="0.7"
        />
        <text x="282" y={goalY + 3.5} fontSize="7" fill="#b06a47" opacity="0.8" fontFamily="Jost, sans-serif">
          {goalLabel}
        </text>

        {/* Bars */}
        {data.map((d, i) => {
          const barH = d.value !== null ? Math.max(2, (d.value / max) * CHART_H) : 0
          const barY = CHART_BOTTOM - barH
          const barX = i * SLOT_W + (SLOT_W - BAR_W) / 2
          const isToday = d.date === todayKey
          const fill = barColor(d.value, goal, invertGoal, color)

          return (
            <g key={d.date}>
              {d.value !== null ? (
                <rect
                  x={barX} y={barY}
                  width={BAR_W} height={barH}
                  rx="2.5"
                  fill={fill}
                  opacity={isToday ? 1 : 0.75}
                />
              ) : (
                <rect
                  x={barX} y={CHART_TOP}
                  width={BAR_W} height={CHART_H}
                  rx="2.5"
                  fill="rgba(212,205,193,0.2)"
                />
              )}
              {/* Today highlight ring */}
              {isToday && (
                <rect
                  x={barX - 1} y={CHART_TOP - 1}
                  width={BAR_W + 2} height={CHART_H + 2}
                  rx="3.5"
                  fill="none"
                  stroke={color}
                  strokeWidth="1"
                  opacity="0.4"
                />
              )}
              {/* Date label — show every other day */}
              {i % 2 === 0 && (
                <text
                  x={barX + BAR_W / 2} y={LABEL_Y}
                  fontSize="7.5"
                  textAnchor="middle"
                  fill={isToday ? '#1d3528' : '#7c7165'}
                  fontFamily="Jost, sans-serif"
                  fontWeight={isToday ? '600' : '400'}
                >
                  {new Date(d.date + 'T12:00:00').getDate()}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {subtitle && (
        <p className="text-[10px] font-sans text-text-secondary/70 mt-1">{subtitle}</p>
      )}
    </div>
  )
}
