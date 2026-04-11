import Card from '../ui/Card.jsx'
import DailyChecklist from '../features/DailyChecklist.jsx'
import MealSuggestion from '../features/MealSuggestion.jsx'
import StreakCounter from '../features/StreakCounter.jsx'
import { useChecklist } from '../../hooks/useChecklist.js'
import { formatDateLong, getGreeting, getWeekdayIndex } from '../../utils/dateUtils.js'
import { WEEKLY_SCHEDULE } from '../../data/schedule.js'

const TYPE_COLORS = {
  strength: 'bg-primary text-white',
  cardio: 'bg-primary-light text-white',
  rest: 'bg-surface text-primary',
}

export default function TodayPage() {
  const { checklist, toggle, checkedCount, totalCount } = useChecklist()
  const todaySchedule = WEEKLY_SCHEDULE[getWeekdayIndex()]
  const greeting = getGreeting()
  const dateStr = formatDateLong()

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-primary px-4 pt-10 pb-6 text-white">
        <p className="text-white/70 text-sm mb-1">{dateStr}</p>
        <h1 className="text-2xl font-semibold">{greeting} 👋</h1>
        <div className="mt-3">
          <StreakCounter />
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Dagens schema */}
        <Card>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            Idag – {todaySchedule.day}
          </h2>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${TYPE_COLORS[todaySchedule.type]}`}>
              {todaySchedule.icon}
            </div>
            <div>
              <div className="font-semibold text-text-primary">{todaySchedule.label}</div>
              <div className="text-sm text-text-secondary">{todaySchedule.description}</div>
              {todaySchedule.extra && (
                <div className="text-xs text-text-secondary mt-0.5">+ {todaySchedule.extra}</div>
              )}
            </div>
          </div>
        </Card>

        {/* Daglig checklista */}
        <Card>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            Daglig checklista
          </h2>
          <DailyChecklist
            checklist={checklist}
            toggle={toggle}
            checkedCount={checkedCount}
            totalCount={totalCount}
          />
        </Card>

        {/* Måltidsförslag */}
        <MealSuggestion />
      </div>
    </div>
  )
}
