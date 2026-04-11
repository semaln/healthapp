import PageHeader from '../layout/PageHeader.jsx'
import Card from '../ui/Card.jsx'
import { WEEKLY_SCHEDULE } from '../../data/schedule.js'
import { getWeekdayIndex } from '../../utils/dateUtils.js'

const TYPE_BADGE = {
  strength: 'bg-primary text-white',
  cardio: 'bg-primary-light text-white',
  rest: 'bg-surface text-primary border border-border',
}

export default function TrainingPage() {
  const todayIdx = getWeekdayIndex()

  return (
    <div>
      <PageHeader title="Träning" subtitle="Veckans schema" />

      {/* Veckovy */}
      <div className="bg-white border-b border-border px-4 py-3">
        <div className="flex gap-1 overflow-x-auto pb-1">
          {WEEKLY_SCHEDULE.map((day, i) => (
            <div
              key={day.day}
              className={`flex-shrink-0 flex flex-col items-center p-2 rounded-xl min-w-[44px] ${
                i === todayIdx ? 'bg-primary text-white' : 'bg-surface'
              }`}
            >
              <span className={`text-[10px] font-medium ${i === todayIdx ? 'text-white/80' : 'text-text-secondary'}`}>
                {day.day.slice(0, 3)}
              </span>
              <span className="text-lg mt-0.5">{day.icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Dagens pass */}
        <Card>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            Idag – {WEEKLY_SCHEDULE[todayIdx].day}
          </h2>
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${TYPE_BADGE[WEEKLY_SCHEDULE[todayIdx].type]}`}>
              {WEEKLY_SCHEDULE[todayIdx].icon}
            </div>
            <div>
              <div className="font-semibold text-text-primary text-lg">{WEEKLY_SCHEDULE[todayIdx].label}</div>
              <div className="text-sm text-text-secondary">{WEEKLY_SCHEDULE[todayIdx].description}</div>
              <div className="text-xs text-text-secondary mt-1">+ {WEEKLY_SCHEDULE[todayIdx].extra}</div>
            </div>
          </div>
        </Card>

        {/* Vecka-lista */}
        <Card>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            Hela veckan
          </h2>
          <div className="space-y-2">
            {WEEKLY_SCHEDULE.map((day, i) => (
              <div
                key={day.day}
                className={`flex items-center gap-3 p-2 rounded-xl ${i === todayIdx ? 'bg-surface' : ''}`}
              >
                <span className="text-xl w-8">{day.icon}</span>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${i === todayIdx ? 'text-primary' : 'text-text-primary'}`}>
                    {day.day}
                    {i === todayIdx && <span className="ml-2 text-xs text-primary font-normal">(idag)</span>}
                  </div>
                  <div className="text-xs text-text-secondary">{day.label} – {day.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="text-center text-sm text-text-secondary py-4">
          Detaljerade övningar och timers kommer i nästa version ⏱️
        </div>
      </div>
    </div>
  )
}
