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
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-sans font-medium text-text-secondary uppercase tracking-widest">
          Framsteg
        </span>
        <span className="text-sm font-semibold font-sans text-primary tabular-nums">
          {checkedCount}<span className="text-text-secondary font-normal">/{totalCount}</span>
        </span>
      </div>
      <div className="w-full bg-surface rounded-full h-1.5 mb-4 overflow-hidden">
        <div
          className="h-1.5 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percentage}%`,
            background: percentage === 100
              ? 'linear-gradient(90deg, #4d7a56, #1d3528)'
              : 'linear-gradient(90deg, #6b8f71, #4d7a56)',
          }}
        />
      </div>

      {/* Items */}
      <div className="space-y-0.5">
        {visibleItems.map((item, i) => {
          const checked = checklist[item.key] || false
          return (
            <button
              key={item.key}
              onClick={() => toggle(item.key)}
              style={{ animationDelay: `${i * 0.04}s` }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left animate-fade-up"
              style={checked ? { background: 'rgba(29,53,40,0.06)' } : {}}
            >
              {/* Custom checkbox */}
              <div
                className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  checked
                    ? 'bg-primary border-primary shadow-sm'
                    : 'border-border bg-cream'
                }`}
              >
                {checked && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="animate-check-pop">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-sans flex items-center gap-1.5">
                <span className="text-base leading-none">{item.icon}</span>
                <span className={`transition-all duration-200 ${
                  checked
                    ? 'line-through text-text-secondary/60'
                    : 'text-text-primary'
                }`}>
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
