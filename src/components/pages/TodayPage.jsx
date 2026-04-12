import { useNavigate } from 'react-router-dom'
import { Settings } from 'lucide-react'
import Card from '../ui/Card.jsx'
import DailyChecklist from '../features/DailyChecklist.jsx'
import MealSuggestion from '../features/MealSuggestion.jsx'
import StreakCounter from '../features/StreakCounter.jsx'
import { useChecklist } from '../../hooks/useChecklist.js'
import { formatDateLong, getGreeting, getWeekdayIndex } from '../../utils/dateUtils.js'
import { WEEKLY_SCHEDULE } from '../../data/schedule.js'

const TYPE_STYLES = {
  strength: { bg: 'bg-primary', text: 'text-white', dot: '#1d3528' },
  cardio:   { bg: 'bg-primary-light', text: 'text-white', dot: '#4d7a56' },
  rest:     { bg: 'bg-surface', text: 'text-primary', dot: '#6b8f71' },
}

export default function TodayPage() {
  const navigate = useNavigate()
  const { checklist, toggle, checkedCount, totalCount } = useChecklist()
  const todaySchedule = WEEKLY_SCHEDULE[getWeekdayIndex()]
  const greeting = getGreeting()
  const dateStr = formatDateLong()
  const typeStyle = TYPE_STYLES[todaySchedule.type]

  return (
    <div className="pb-4">
      {/* ── Hero Header ────────────────────────────────────── */}
      <div
        className="relative px-5 pt-12 pb-8 text-white overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #1d3528 0%, #2c4f3c 55%, #1a3a2a 100%)' }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -right-12 -top-12 w-52 h-52 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)' }}
        />
        <div
          className="absolute -left-8 bottom-0 w-36 h-36 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(168,213,176,0.08) 0%, transparent 65%)' }}
        />

        {/* Settings button */}
        <button
          onClick={() => navigate('/installningar')}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
          aria-label="Inställningar"
        >
          <Settings size={16} color="rgba(255,255,255,0.7)" />
        </button>

        <div className="relative stagger">
          <p className="text-white/50 text-xs font-sans font-light tracking-widest uppercase mb-1">
            {dateStr}
          </p>
          <h1 className="font-display text-[2rem] font-semibold leading-tight text-white mb-3">
            {greeting} 👋
          </h1>
          <StreakCounter />
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="px-4 py-4 space-y-3 stagger">
        {/* Today's workout */}
        <Card>
          <h2 className="section-label mb-3">
            Idag — {todaySchedule.day}
          </h2>
          <div className="flex items-center gap-3.5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${typeStyle.bg} ${typeStyle.text}`}>
              {todaySchedule.icon}
            </div>
            <div>
              <div className="font-sans font-semibold text-text-primary text-[15px]">
                {todaySchedule.label}
              </div>
              <div className="text-sm text-text-secondary font-sans font-light mt-0.5">
                {todaySchedule.description}
              </div>
              {todaySchedule.extra && (
                <div className="text-xs text-text-secondary/70 mt-0.5 font-sans">
                  + {todaySchedule.extra}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Daily checklist */}
        <Card>
          <h2 className="section-label mb-3">Daglig checklista</h2>
          <DailyChecklist
            checklist={checklist}
            toggle={toggle}
            checkedCount={checkedCount}
            totalCount={totalCount}
          />
        </Card>

        {/* Meal suggestions */}
        <MealSuggestion />
      </div>
    </div>
  )
}
