import PageHeader from '../layout/PageHeader.jsx'
import Card from '../ui/Card.jsx'
import TabBar from '../ui/TabBar.jsx'
import TrendChart from '../features/TrendChart.jsx'
import { useState, useMemo } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import { useStreak } from '../../hooks/useStreak.js'
import { getTodayKey, getDateKey } from '../../utils/dateUtils.js'
import { GOALS } from '../../utils/constants.js'

const TABS = [
  { id: 'logg', label: 'Logg' },
  { id: 'kropp', label: 'Kropp' },
  { id: 'trend', label: 'Trend' },
  { id: 'blodprov', label: 'Blodprov' },
  { id: 'historik', label: 'Historik' },
]

const DEFAULT_HEALTHLOG = {
  body_battery: '',
  stress_score: '',
  steps: '',
  sleep_hours: '',
  weight: '',
}

const DEFAULT_SETTINGS = {
  step_goal: 7000,
  sleep_goal: 7.5,
  body_battery_goal: 70,
  stress_max: 50,
}

const DEFAULT_BLOOD_TEST = {
  fasting_glucose: '',
  hba1c: '',
  total_cholesterol: '',
  ldl: '',
  hdl: '',
  triglycerides: '',
  potassium: '',
}

// ─── Shared NumberField ────────────────────────────────────────────────────────

function NumberField({ label, value, onChange, unit, min, max, step = 1 }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-b-0">
      <span className="text-sm font-sans text-text-primary">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, Number(value || min) - step))}
          className="w-9 h-9 rounded-xl font-bold flex items-center justify-center active:scale-95 transition-all"
          style={{ background: '#ede8df', color: '#1d3528' }}
        >
          −
        </button>
        <span className="text-sm font-sans font-semibold w-16 text-center tabular-nums">
          {value !== '' ? `${value}${unit ? ' ' + unit : ''}` : '—'}
        </span>
        <button
          onClick={() => onChange(Math.min(max, Number(value || min) + step))}
          className="w-9 h-9 rounded-xl font-bold flex items-center justify-center active:scale-95 transition-all"
          style={{ background: '#ede8df', color: '#1d3528' }}
        >
          +
        </button>
      </div>
    </div>
  )
}

// ─── Daglig logg ──────────────────────────────────────────────────────────────

function DagligLoggTab() {
  const todayKey = getTodayKey()
  const [log, setLog] = useLocalStorage(`healthlog_${todayKey}`, DEFAULT_HEALTHLOG)
  const update = (field, value) => setLog((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="p-4 space-y-4">
      <Card>
        <h2 className="section-label mb-3">{todayKey}</h2>
        <NumberField label="Body Battery (uppvakning)" value={log.body_battery} onChange={(v) => update('body_battery', v)} unit="" min={0} max={100} />
        <NumberField label="Stress Score (snitt)" value={log.stress_score} onChange={(v) => update('stress_score', v)} unit="" min={0} max={100} />
        <NumberField label="Steg" value={log.steps} onChange={(v) => update('steps', v)} unit="steg" min={0} max={30000} step={500} />
        <NumberField label="Sömn" value={log.sleep_hours} onChange={(v) => update('sleep_hours', v)} unit="h" min={0} max={12} step={0.5} />
        <NumberField label="Vikt (valfritt)" value={log.weight} onChange={(v) => update('weight', v)} unit="kg" min={40} max={200} step={0.5} />
      </Card>
      <p className="text-[11px] font-sans text-text-secondary/60 text-center">Sparas automatiskt lokalt</p>
    </div>
  )
}

// ─── Kroppsmätning ─────────────────────────────────────────────────────────────

function KroppsmätningTab() {
  const [measurements, setMeasurements] = useLocalStorage('body_measurements', [])
  const [waist, setWaist] = useState('')
  const [height, setHeight] = useState('')

  const ratio = waist && height ? (Number(waist) / Number(height)).toFixed(2) : null
  const ratioColor = !ratio ? '' : ratio < 0.5 ? 'text-green-600' : ratio < 0.6 ? 'text-yellow-600' : ratio < 0.7 ? 'text-orange-500' : 'text-accent-red'
  const ratioLabel = !ratio ? '' : ratio < 0.5 ? 'Bra!' : ratio < 0.6 ? 'Acceptabelt' : ratio < 0.7 ? 'Förhöjt' : 'Högt'

  const save = () => {
    if (!waist || !height) return
    setMeasurements([...measurements, { date: getTodayKey(), waist_cm: Number(waist), height_cm: Number(height) }])
    setWaist('')
    setHeight('')
  }

  return (
    <div className="p-4 space-y-4">
      <Card>
        <h2 className="section-label mb-3">Midje/höjd-kvot</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-sans text-text-secondary block mb-1">Midjemått (cm)</label>
            <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="t.ex. 92" className="input-field" />
          </div>
          <div>
            <label className="text-sm font-sans text-text-secondary block mb-1">Längd (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="t.ex. 182" className="input-field" />
          </div>
          {ratio && (
            <div className="bg-surface rounded-2xl p-3 text-center">
              <div className={`font-display text-4xl font-light ${ratioColor}`}>{ratio}</div>
              <div className={`text-sm font-sans font-medium mt-1 ${ratioColor}`}>{ratioLabel}</div>
              <div className="text-xs font-sans text-text-secondary mt-1">Mål: under 0.50</div>
            </div>
          )}
          <button onClick={save} disabled={!waist || !height}
            className="w-full py-3 bg-primary text-white rounded-2xl text-sm font-sans font-medium disabled:opacity-40 transition-all active:scale-[0.98]">
            Spara mätning
          </button>
        </div>
      </Card>

      {measurements.length > 0 && (
        <Card>
          <h2 className="section-label mb-3">Historik</h2>
          <div className="space-y-1">
            {[...measurements].reverse().slice(0, 10).map((m, i) => {
              const r = (m.waist_cm / m.height_cm).toFixed(2)
              const c = r < 0.5 ? 'text-green-600' : r < 0.6 ? 'text-yellow-600' : 'text-accent-red'
              return (
                <div key={i} className="flex justify-between items-center text-sm py-1.5 border-b border-border/30 last:border-b-0">
                  <span className="text-text-secondary font-sans">{m.date}</span>
                  <span className="font-sans">{m.waist_cm} / {m.height_cm} cm</span>
                  <span className={`font-sans font-semibold ${c}`}>{r}</span>
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}

// ─── Trend ─────────────────────────────────────────────────────────────────────

function buildSeries(field, days = 14) {
  const result = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = getDateKey(d)
    const raw = localStorage.getItem(`healthlog_${key}`)
    const log = raw ? JSON.parse(raw) : null
    const rawVal = log?.[field]
    result.push({ date: key, value: rawVal !== '' && rawVal != null ? Number(rawVal) : null })
  }
  return result
}

function RatioLineChart({ measurements }) {
  if (measurements.length < 2) return null

  const sorted = [...measurements].sort((a, b) => a.date.localeCompare(b.date)).slice(-10)
  const vals = sorted.map((m) => m.waist_cm / m.height_cm)
  const minV = Math.min(...vals, 0.4)
  const maxV = Math.max(...vals, 0.7)
  const range = maxV - minV || 0.1

  const W = 280, H = 60
  const points = sorted.map((m, i) => {
    const x = (i / (sorted.length - 1)) * W
    const y = H - ((m.waist_cm / m.height_cm - minV) / range) * (H - 8) - 4
    return `${x},${y}`
  }).join(' ')

  const goalY = H - ((0.5 - minV) / range) * (H - 8) - 4

  const lastRatio = vals[vals.length - 1].toFixed(2)
  const delta = (vals[vals.length - 1] - vals[0]).toFixed(2)

  return (
    <Card>
      <div className="flex items-baseline justify-between mb-2">
        <span className="section-label">Midje/höjd-kvot</span>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-text-primary" style={{ fontSize: '1.25rem', lineHeight: 1 }}>{lastRatio}</span>
          {delta !== '0.00' && (
            <span className={`text-[11px] font-sans ${Number(delta) < 0 ? 'text-green-600' : 'text-accent-red'}`}>
              {Number(delta) < 0 ? '' : '+'}{delta}
            </span>
          )}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H + 4}`} width="100%" style={{ overflow: 'visible' }}>
        {goalY >= 0 && goalY <= H && (
          <>
            <line x1="0" y1={goalY} x2={W} y2={goalY} stroke="#b06a47" strokeWidth="1" strokeDasharray="4,3" opacity="0.7" />
            <text x={W + 2} y={goalY + 3.5} fontSize="7" fill="#b06a47" opacity="0.8" fontFamily="Jost, sans-serif">0.50</text>
          </>
        )}
        <polyline points={points} fill="none" stroke="#4d7a56" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {sorted.map((m, i) => {
          const x = (i / (sorted.length - 1)) * W
          const y = H - ((m.waist_cm / m.height_cm - minV) / range) * (H - 8) - 4
          const isLast = i === sorted.length - 1
          return <circle key={i} cx={x} cy={y} r={isLast ? 4 : 2.5} fill={isLast ? '#1d3528' : '#4d7a56'} />
        })}
      </svg>
      <p className="text-[10px] font-sans text-text-secondary/60 mt-2">
        Mål: under 0.50 · senaste {sorted.length} mätningar
      </p>
    </Card>
  )
}

function TrendTab() {
  const [settings] = useLocalStorage('settings', DEFAULT_SETTINGS)
  const [measurements] = useLocalStorage('body_measurements', [])

  const bbGoal = settings.body_battery_goal ?? DEFAULT_SETTINGS.body_battery_goal
  const stressGoal = settings.stress_max ?? DEFAULT_SETTINGS.stress_max
  const stepGoal = settings.step_goal ?? DEFAULT_SETTINGS.step_goal
  const sleepGoal = settings.sleep_goal ?? DEFAULT_SETTINGS.sleep_goal

  const bbData = buildSeries('body_battery')
  const stressData = buildSeries('stress_score')
  const stepsData = buildSeries('steps')
  const sleepData = buildSeries('sleep_hours')

  const hasAnyData = [...bbData, ...stressData, ...stepsData, ...sleepData].some((d) => d.value !== null)

  if (!hasAnyData && measurements.length === 0) {
    return (
      <div className="p-4">
        <Card>
          <div className="py-6 text-center">
            <div className="text-3xl mb-3">📊</div>
            <p className="text-sm font-sans font-medium text-text-primary mb-1">Ingen data ännu</p>
            <p className="text-xs font-sans font-light text-text-secondary leading-relaxed">
              Logga hälsodata i "Logg" så visas trenderna här efter några dagar.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-1">
      <Card>
        <TrendChart label="Body Battery" data={bbData} goal={bbGoal} goalLabel={`mål ${bbGoal}`} max={100} color="#4d7a56" unit="" />
        <TrendChart label="Stress Score" data={stressData} goal={stressGoal} goalLabel={`max ${stressGoal}`} max={100} color="#b06a47" unit="" invertGoal={true} />
        <TrendChart label="Steg" data={stepsData} goal={stepGoal} goalLabel={`${(stepGoal / 1000).toFixed(0)}k`} max={Math.max(15000, ...stepsData.filter((d) => d.value).map((d) => d.value))} color="#4d7a56" unit="steg" />
        <TrendChart label="Sömn" data={sleepData} goal={sleepGoal} goalLabel={`${sleepGoal}h`} max={12} color="#6b8f71" unit="h" />
      </Card>
      {measurements.length >= 2 && <RatioLineChart measurements={measurements} />}
      <p className="text-[10px] font-sans text-text-secondary/50 text-center pt-2">
        Senaste 14 dagarna · mål från Inställningar
      </p>
    </div>
  )
}

// ─── Blodprov ─────────────────────────────────────────────────────────────────

function BloodInputRow({ label, unit, value, onChange, step = 0.1 }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-b-0">
      <div>
        <span className="text-sm font-sans text-text-primary">{label}</span>
        {unit && <span className="text-xs font-sans text-text-secondary ml-1">{unit}</span>}
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="—"
        step={step}
        className="w-24 text-right text-sm font-sans rounded-xl px-3 py-1.5 border border-border bg-surface focus:outline-none focus:border-primary/40 transition-colors"
      />
    </div>
  )
}

function BlodprovTab() {
  const [bloodTests, setBloodTests] = useLocalStorage('blood_tests', [])
  const [form, setForm] = useState(DEFAULT_BLOOD_TEST)
  const [date, setDate] = useState(getTodayKey())

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))
  const hasAnyValue = Object.values(form).some((v) => v !== '')

  const save = () => {
    const entry = {
      date,
      ...Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v !== '' ? Number(v) : null])
      ),
    }
    setBloodTests((prev) =>
      [...prev.filter((t) => t.date !== date), entry].sort((a, b) =>
        b.date.localeCompare(a.date)
      )
    )
    setForm(DEFAULT_BLOOD_TEST)
  }

  return (
    <div className="p-4 space-y-4">
      <Card>
        <h2 className="section-label mb-3">Nytt blodprov</h2>
        <div className="mb-3">
          <label className="text-sm font-sans text-text-secondary block mb-1">Datum</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
        </div>
        <BloodInputRow label="Fasteglukos" unit="mmol/L" value={form.fasting_glucose} onChange={(v) => update('fasting_glucose', v)} step={0.1} />
        <BloodInputRow label="HbA1c" unit="mmol/mol" value={form.hba1c} onChange={(v) => update('hba1c', v)} step={1} />
        <BloodInputRow label="Kolesterol totalt" unit="mmol/L" value={form.total_cholesterol} onChange={(v) => update('total_cholesterol', v)} step={0.1} />
        <BloodInputRow label="LDL" unit="mmol/L" value={form.ldl} onChange={(v) => update('ldl', v)} step={0.1} />
        <BloodInputRow label="HDL" unit="mmol/L" value={form.hdl} onChange={(v) => update('hdl', v)} step={0.1} />
        <BloodInputRow label="Triglycerider" unit="mmol/L" value={form.triglycerides} onChange={(v) => update('triglycerides', v)} step={0.1} />
        <BloodInputRow label="Kalium" unit="mmol/L" value={form.potassium} onChange={(v) => update('potassium', v)} step={0.1} />
        <button
          onClick={save}
          disabled={!hasAnyValue}
          className="w-full py-3 mt-4 bg-primary text-white rounded-2xl text-sm font-sans font-medium disabled:opacity-40 transition-all active:scale-[0.98]"
        >
          Spara blodprov
        </button>
      </Card>

      {bloodTests.length > 0 && (
        <Card>
          <h2 className="section-label mb-3">Historik</h2>
          <div className="space-y-4">
            {bloodTests.slice(0, 5).map((t, i) => (
              <div key={i} className="border-b border-border/30 pb-4 last:border-b-0 last:pb-0">
                <div className="text-xs font-sans font-semibold text-primary mb-2">{t.date}</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {t.fasting_glucose != null && (
                    <div className="text-xs font-sans text-text-secondary">
                      Glukos: <span className="text-text-primary font-medium">{t.fasting_glucose}</span>
                    </div>
                  )}
                  {t.hba1c != null && (
                    <div className="text-xs font-sans text-text-secondary">
                      HbA1c: <span className="text-text-primary font-medium">{t.hba1c}</span>
                    </div>
                  )}
                  {t.total_cholesterol != null && (
                    <div className="text-xs font-sans text-text-secondary">
                      Kolesterol: <span className="text-text-primary font-medium">{t.total_cholesterol}</span>
                    </div>
                  )}
                  {t.ldl != null && (
                    <div className="text-xs font-sans text-text-secondary">
                      LDL: <span className="text-text-primary font-medium">{t.ldl}</span>
                    </div>
                  )}
                  {t.hdl != null && (
                    <div className="text-xs font-sans text-text-secondary">
                      HDL: <span className="text-text-primary font-medium">{t.hdl}</span>
                    </div>
                  )}
                  {t.triglycerides != null && (
                    <div className="text-xs font-sans text-text-secondary">
                      TG: <span className="text-text-primary font-medium">{t.triglycerides}</span>
                    </div>
                  )}
                  {t.potassium != null && (
                    <div className="text-xs font-sans text-text-secondary">
                      Kalium: <span className="text-text-primary font-medium">{t.potassium}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

// ─── Checklisthistorik ─────────────────────────────────────────────────────────

function cellColor(count) {
  if (count === null) return '#e2ddd6'
  if (count >= 8) return '#4d7a56'
  if (count >= 5) return '#c49b22'
  return '#d94f3a'
}

function cellTextColor(count) {
  if (count === null) return '#a09890'
  return 'rgba(255,255,255,0.9)'
}

function ChecklistHistorikTab() {
  const streak = useStreak()

  const days = useMemo(() => {
    const result = []
    for (let i = 59; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = getDateKey(d)
      const raw = localStorage.getItem(`checklist_${key}`)
      let count = null
      if (raw) {
        try {
          count = Object.values(JSON.parse(raw)).filter(Boolean).length
        } catch {}
      }
      result.push({
        date: d,
        key,
        count,
        dayNum: d.getDate(),
        // Monday-indexed weekday: 0=Mon ... 6=Sun
        weekday: (d.getDay() + 6) % 7,
      })
    }
    return result
  }, [])

  // Pad start so first day aligns to its weekday column
  const firstWeekday = days[0]?.weekday ?? 0
  const paddedDays = [...Array(firstWeekday).fill(null), ...days]
  const weeks = []
  for (let i = 0; i < paddedDays.length; i += 7) {
    weeks.push(paddedDays.slice(i, i + 7))
  }

  const loggadDagar = days.filter((d) => d.count !== null).length

  return (
    <div className="p-4 space-y-4">
      {/* Streak */}
      <Card>
        <div className="flex items-center gap-4">
          <div>
            <div className="font-display text-5xl font-light text-primary leading-none">{streak}</div>
            <div className="text-xs font-sans text-text-secondary mt-1">dagar i rad</div>
          </div>
          <div className="flex-1">
            <div className="text-sm font-sans font-medium text-text-primary">Aktiv streak</div>
            <div className="text-xs font-sans text-text-secondary leading-relaxed mt-0.5">
              8+ av 12 checklistepunkter avbockade per dag
            </div>
          </div>
          <div className="text-3xl">🔥</div>
        </div>
      </Card>

      {/* Calendar grid */}
      <Card>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="section-label">Senaste 60 dagarna</h2>
          <span className="text-xs font-sans text-text-secondary">{loggadDagar} loggade</span>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['M', 'T', 'O', 'T', 'F', 'L', 'S'].map((d, i) => (
            <div key={i} className="text-center text-[9px] font-sans text-text-secondary/50 font-medium">
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
            {week.map((day, di) => {
              if (!day) return <div key={di} />
              return (
                <div
                  key={di}
                  className="aspect-square rounded-md flex items-center justify-center"
                  style={{ background: cellColor(day.count) }}
                  title={`${day.key}: ${day.count !== null ? `${day.count}/12` : 'ej loggad'}`}
                >
                  <span
                    className="text-[9px] font-sans font-medium leading-none"
                    style={{ color: cellTextColor(day.count) }}
                  >
                    {day.dayNum}
                  </span>
                </div>
              )
            })}
          </div>
        ))}

        {/* Legend */}
        <div className="flex gap-4 mt-3 flex-wrap">
          {[
            { color: '#4d7a56', label: '8–12' },
            { color: '#c49b22', label: '5–7' },
            { color: '#d94f3a', label: '1–4' },
            { color: '#e2ddd6', label: 'Ej loggad' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: color }} />
              <span className="text-[10px] font-sans text-text-secondary">{label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MeasurementPage() {
  const [activeTab, setActiveTab] = useState('logg')

  return (
    <div>
      <PageHeader title="Mätning" subtitle="Hälsodata & mätningar" />
      <TabBar tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === 'logg' && <DagligLoggTab />}
      {activeTab === 'kropp' && <KroppsmätningTab />}
      {activeTab === 'trend' && <TrendTab />}
      {activeTab === 'blodprov' && <BlodprovTab />}
      {activeTab === 'historik' && <ChecklistHistorikTab />}
    </div>
  )
}
