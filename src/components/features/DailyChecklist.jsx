import { CHECKLIST_ITEMS } from '../../data/checklist.js'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'

const DEFAULT_SETTINGS = {
  fish_days: ['tisdag', 'torsdag', 'lördag'],
  step_goal: 8000,
  sleep_goal: 7.5,
}

export default function DailyChecklist({ checklist, toggle, checkedCount, totalCount }) {
  const [settings] = useLocalStorage('settings', DEFAULT_SETTINGS)
  const todayName = new Date().toLocaleDateString('sv-SE', { weekday: 'long' }).toLowerCase()
  const isFishDay = settings.fish_days?.includes(todayName)

  const visibleItems = CHECKLIST_ITEMS.filter(
    (item) => !item.conditional || isFishDay
  )

  const percentage = Math.round((checkedCount / totalCount) * 100)

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-text-secondary">
          {checkedCount} av {totalCount} avbockade
        </span>
        <span className="text-sm font-semibold text-primary">{percentage}%</span>
      </div>
      <div className="w-full bg-surface rounded-full h-2 mb-4">
        <div
          className="bg-primary-light h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Items */}
      <div className="space-y-1">
        {visibleItems.map((item) => {
          const checked = checklist[item.key] || false
          return (
            <button
              key={item.key}
              onClick={() => toggle(item.key)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${
                checked ? 'bg-surface' : 'hover:bg-gray-50'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  checked
                    ? 'bg-primary border-primary'
                    : 'border-border'
                }`}
              >
                {checked && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm">
                <span className="mr-1">{item.icon}</span>
                <span className={checked ? 'line-through text-text-secondary' : 'text-text-primary'}>
                  {item.label}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
