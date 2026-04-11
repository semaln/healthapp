import Card from '../ui/Card.jsx'
import { getDailyMealSuggestions } from '../../data/meals.js'
import { getTodayKey } from '../../utils/dateUtils.js'

function MealItem({ label, meal }) {
  if (!meal) return null
  return (
    <div className="flex gap-3 py-2 border-b border-surface last:border-b-0">
      <div className="text-text-secondary text-sm w-16 flex-shrink-0 pt-0.5">{label}</div>
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-text-primary">{meal.name}</span>
          {meal.star && <span className="text-yellow-400 text-xs">⭐</span>}
          {meal.japanese && <span className="text-xs">🇯🇵</span>}
        </div>
        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{meal.description}</p>
      </div>
    </div>
  )
}

export default function MealSuggestion() {
  const suggestions = getDailyMealSuggestions(getTodayKey())

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
        Dagens måltidsförslag
      </h3>
      <MealItem label="Frukost" meal={suggestions.frukost} />
      <MealItem label="Lunch" meal={suggestions.lunch} />
      <MealItem label="Middag" meal={suggestions.middag} />
      <MealItem label="Mellanmål" meal={suggestions.mellanmal} />
    </Card>
  )
}
