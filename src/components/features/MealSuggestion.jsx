import Card from '../ui/Card.jsx'
import { useDailyMeals } from '../../hooks/useMeals.js'
import { getTodayKey } from '../../utils/dateUtils.js'

const MEAL_ICONS = {
  frukost: '🌅',
  lunch: '☀️',
  middag: '🌙',
  mellanmal: '🍎',
}

const MEAL_LABELS = {
  frukost: 'Frukost',
  lunch: 'Lunch',
  middag: 'Middag',
  mellanmal: 'Mellanmål',
}

function MealItem({ mealKey, meal }) {
  if (!meal) return null
  return (
    <div className="flex gap-3 py-2.5 border-b border-border/40 last:border-b-0">
      <div className="flex flex-col items-center pt-0.5 w-14 flex-shrink-0">
        <span className="text-lg leading-none">{MEAL_ICONS[mealKey]}</span>
        <span className="text-[10px] font-sans font-medium text-text-secondary/70 mt-1 uppercase tracking-wide">
          {MEAL_LABELS[mealKey]}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-sans font-medium text-text-primary">{meal.name}</span>
          {meal.star && <span className="text-yellow-500 text-xs">★</span>}
          {meal.japanese && <span className="text-xs">🇯🇵</span>}
        </div>
        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed font-sans font-light">{meal.description}</p>
      </div>
    </div>
  )
}

export default function MealSuggestion() {
  const suggestions = useDailyMeals(getTodayKey())

  return (
    <Card>
      <h3 className="section-label mb-3">Dagens måltidsförslag</h3>
      <MealItem mealKey="frukost" meal={suggestions.frukost} />
      <MealItem mealKey="lunch" meal={suggestions.lunch} />
      <MealItem mealKey="middag" meal={suggestions.middag} />
      <MealItem mealKey="mellanmal" meal={suggestions.mellanmal} />
    </Card>
  )
}
