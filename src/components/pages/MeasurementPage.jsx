import PageHeader from '../layout/PageHeader.jsx'
import Card from '../ui/Card.jsx'
import TabBar from '../ui/TabBar.jsx'
import { useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import { getTodayKey } from '../../utils/dateUtils.js'

const TABS = [
  { id: 'logg', label: 'Daglig logg' },
  { id: 'kropp', label: 'Kroppsmätning' },
]

const DEFAULT_HEALTHLOG = {
  body_battery: '',
  stress_score: '',
  steps: '',
  sleep_hours: '',
  weight: '',
}

function NumberField({ label, value, onChange, unit, min, max, step = 1 }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-surface last:border-b-0">
      <span className="text-sm text-text-primary">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, Number(value || min) - step))}
          className="w-8 h-8 rounded-lg bg-surface text-primary font-bold flex items-center justify-center"
        >
          −
        </button>
        <span className="text-sm font-semibold w-16 text-center">
          {value !== '' ? `${value} ${unit}` : '—'}
        </span>
        <button
          onClick={() => onChange(Math.min(max, Number(value || min) + step))}
          className="w-8 h-8 rounded-lg bg-surface text-primary font-bold flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  )
}

function DagligLoggTab() {
  const todayKey = getTodayKey()
  const [log, setLog] = useLocalStorage(`healthlog_${todayKey}`, DEFAULT_HEALTHLOG)

  const update = (field, value) => setLog((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="p-4 space-y-4">
      <Card>
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
          {todayKey}
        </h2>
        <NumberField label="Body Battery (uppvakning)" value={log.body_battery} onChange={(v) => update('body_battery', v)} unit="" min={0} max={100} />
        <NumberField label="Stress Score (snitt)" value={log.stress_score} onChange={(v) => update('stress_score', v)} unit="" min={0} max={100} />
        <NumberField label="Steg" value={log.steps} onChange={(v) => update('steps', v)} unit="steg" min={0} max={30000} step={500} />
        <NumberField label="Sömn" value={log.sleep_hours} onChange={(v) => update('sleep_hours', v)} unit="h" min={0} max={12} step={0.5} />
        <NumberField label="Vikt (valfritt)" value={log.weight} onChange={(v) => update('weight', v)} unit="kg" min={40} max={200} step={0.5} />
      </Card>
      <p className="text-xs text-text-secondary text-center">Sparas automatiskt lokalt</p>
    </div>
  )
}

function KroppsmätningTab() {
  const [measurements, setMeasurements] = useLocalStorage('body_measurements', [])
  const [waist, setWaist] = useState('')
  const [height, setHeight] = useState('')

  const ratio = waist && height ? (Number(waist) / Number(height)).toFixed(2) : null
  const ratioColor = !ratio ? '' : ratio < 0.5 ? 'text-green-600' : ratio < 0.6 ? 'text-yellow-600' : ratio < 0.7 ? 'text-orange-500' : 'text-accent-red'
  const ratioLabel = !ratio ? '' : ratio < 0.5 ? 'Bra!' : ratio < 0.6 ? 'Acceptabelt' : ratio < 0.7 ? 'Förhöjt' : 'Högt'

  const save = () => {
    if (!waist || !height) return
    const entry = {
      date: getTodayKey(),
      waist_cm: Number(waist),
      height_cm: Number(height),
    }
    setMeasurements([...measurements, entry])
    setWaist('')
    setHeight('')
  }

  return (
    <div className="p-4 space-y-4">
      <Card>
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
          Midje/höjd-kvot
        </h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-text-secondary block mb-1">Midjemått (cm)</label>
            <input
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              placeholder="t.ex. 92"
              className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:border-primary-light"
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary block mb-1">Längd (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="t.ex. 182"
              className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:border-primary-light"
            />
          </div>
          {ratio && (
            <div className="bg-surface rounded-xl p-3 text-center">
              <div className={`text-3xl font-bold ${ratioColor}`}>{ratio}</div>
              <div className={`text-sm font-medium mt-1 ${ratioColor}`}>{ratioLabel}</div>
              <div className="text-xs text-text-secondary mt-1">Mål: under 0.50</div>
            </div>
          )}
          <button
            onClick={save}
            disabled={!waist || !height}
            className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-medium disabled:opacity-40"
          >
            Spara mätning
          </button>
        </div>
      </Card>

      {measurements.length > 0 && (
        <Card>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            Historik
          </h2>
          <div className="space-y-1">
            {[...measurements].reverse().slice(0, 10).map((m, i) => {
              const r = (m.waist_cm / m.height_cm).toFixed(2)
              const c = r < 0.5 ? 'text-green-600' : r < 0.6 ? 'text-yellow-600' : 'text-accent-red'
              return (
                <div key={i} className="flex justify-between items-center text-sm py-1 border-b border-surface last:border-b-0">
                  <span className="text-text-secondary">{m.date}</span>
                  <span>{m.waist_cm} / {m.height_cm} cm</span>
                  <span className={`font-semibold ${c}`}>{r}</span>
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}

export default function MeasurementPage() {
  const [activeTab, setActiveTab] = useState('logg')

  return (
    <div>
      <PageHeader title="Mätning" subtitle="Hälsodata & mätningar" />
      <TabBar tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === 'logg' && <DagligLoggTab />}
      {activeTab === 'kropp' && <KroppsmätningTab />}
    </div>
  )
}
