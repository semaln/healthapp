import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import Card from '../ui/Card.jsx'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'

const DEFAULT_SETTINGS = {
  fish_days: ['tisdag', 'torsdag', 'lördag'],
  step_goal: 7000,
  sleep_goal: 7.5,
  body_battery_goal: 70,
  stress_max: 50,
}

const ALL_DAYS = [
  { key: 'måndag',  label: 'Mån' },
  { key: 'tisdag',  label: 'Tis' },
  { key: 'onsdag',  label: 'Ons' },
  { key: 'torsdag', label: 'Tor' },
  { key: 'fredag',  label: 'Fre' },
  { key: 'lördag',  label: 'Lör' },
  { key: 'söndag',  label: 'Sön' },
]

function Stepper({ value, onChange, min, max, step = 1, format }) {
  const dec = () => onChange(Math.max(min, Math.round((value - step) * 100) / 100))
  const inc = () => onChange(Math.min(max, Math.round((value + step) * 100) / 100))
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={dec}
        className="w-9 h-9 rounded-xl flex items-center justify-center font-sans font-semibold text-primary text-lg transition-all active:scale-95"
        style={{ background: '#ede8df' }}
      >
        −
      </button>
      <span className="w-20 text-center font-sans font-semibold text-text-primary text-sm tabular-nums">
        {format ? format(value) : value}
      </span>
      <button
        onClick={inc}
        className="w-9 h-9 rounded-xl flex items-center justify-center font-sans font-semibold text-primary text-lg transition-all active:scale-95"
        style={{ background: '#ede8df' }}
      >
        +
      </button>
    </div>
  )
}

function SettingRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/40 last:border-b-0">
      <div className="flex-1 pr-4">
        <div className="text-sm font-sans font-medium text-text-primary">{label}</div>
        {description && (
          <div className="text-[11px] font-sans font-light text-text-secondary mt-0.5 leading-snug">
            {description}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const [settings, setSettings] = useLocalStorage('settings', DEFAULT_SETTINGS)

  const update = (key, value) => setSettings((prev) => ({ ...DEFAULT_SETTINGS, ...prev, [key]: value }))

  const toggleFishDay = (day) => {
    const days = settings.fish_days ?? DEFAULT_SETTINGS.fish_days
    const next = days.includes(day) ? days.filter((d) => d !== day) : [...days, day]
    update('fish_days', next)
  }

  const fishDays = settings.fish_days ?? DEFAULT_SETTINGS.fish_days

  return (
    <div className="pb-4">
      {/* Header */}
      <div
        className="relative px-5 pt-12 pb-5 text-white overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #1d3528 0%, #2c4f3c 60%, #325a43 100%)' }}
      >
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-white/70 text-sm font-sans mb-3 hover:text-white transition-colors"
        >
          <ChevronLeft size={16} />
          Tillbaka
        </button>
        <h1 className="font-display text-[1.75rem] font-semibold leading-tight text-white">
          Inställningar
        </h1>
        <p className="text-sm mt-0.5 text-white/60 font-sans font-light tracking-wide">
          Anpassa appen efter dina mål
        </p>
      </div>

      <div className="px-4 py-4 space-y-3">
        {/* Fish days */}
        <Card>
          <h2 className="section-label mb-1">Fiskdagar</h2>
          <p className="text-[11px] font-sans font-light text-text-secondary mb-3 leading-snug">
            Vilka dagar förväntar du dig att äta fisk? Checklistan visar "Fisk idag" dessa dagar.
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {ALL_DAYS.map(({ key, label }) => {
              const active = fishDays.includes(key)
              return (
                <button
                  key={key}
                  onClick={() => toggleFishDay(key)}
                  className="px-3 py-1.5 rounded-xl text-sm font-sans font-medium transition-all duration-150 active:scale-95"
                  style={active
                    ? { background: '#1d3528', color: '#fff' }
                    : { background: '#ede8df', color: '#7c7165' }
                  }
                >
                  {label}
                </button>
              )
            })}
          </div>
        </Card>

        {/* Movement goals */}
        <Card>
          <h2 className="section-label mb-1">Rörelsemål</h2>
          <SettingRow
            label="Stegmål"
            description="Antal steg per dag som räknas som uppnått"
          >
            <Stepper
              value={settings.step_goal ?? DEFAULT_SETTINGS.step_goal}
              onChange={(v) => update('step_goal', v)}
              min={3000} max={20000} step={500}
              format={(v) => `${(v / 1000).toFixed(1)}k`}
            />
          </SettingRow>
          <SettingRow
            label="Sömnmål"
            description="Antal timmar sömn per natt"
          >
            <Stepper
              value={settings.sleep_goal ?? DEFAULT_SETTINGS.sleep_goal}
              onChange={(v) => update('sleep_goal', v)}
              min={5} max={10} step={0.5}
              format={(v) => `${v} h`}
            />
          </SettingRow>
        </Card>

        {/* Health goals */}
        <Card>
          <h2 className="section-label mb-1">Hälsomål</h2>
          <SettingRow
            label="Body Battery-mål"
            description="Målvärde för Body Battery vid uppvakning (0–100)"
          >
            <Stepper
              value={settings.body_battery_goal ?? DEFAULT_SETTINGS.body_battery_goal}
              onChange={(v) => update('body_battery_goal', v)}
              min={40} max={100} step={5}
            />
          </SettingRow>
          <SettingRow
            label="Stressmål (max)"
            description="Maxgräns för genomsnittligt stressvärde per dag (0–100)"
          >
            <Stepper
              value={settings.stress_max ?? DEFAULT_SETTINGS.stress_max}
              onChange={(v) => update('stress_max', v)}
              min={20} max={80} step={5}
            />
          </SettingRow>
        </Card>

        <p className="text-[11px] font-sans text-text-secondary/60 text-center pt-1">
          Alla inställningar sparas automatiskt lokalt
        </p>
      </div>
    </div>
  )
}
