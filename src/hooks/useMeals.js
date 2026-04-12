import { useLocalStorage } from './useLocalStorage.js'
import { MEALS } from '../data/meals.js'

const EMPTY_CUSTOM = { frukost: [], lunch: [], middag: [], mellanmal: [] }

export function useMeals() {
  const [customMeals, setCustomMeals] = useLocalStorage('custom_meals', EMPTY_CUSTOM)
  const [hiddenIds, setHiddenIds] = useLocalStorage('hidden_meal_ids', [])

  const meals = {
    frukost:   [...MEALS.frukost.filter(m => !hiddenIds.includes(m.id)),   ...customMeals.frukost],
    lunch:     [...MEALS.lunch.filter(m => !hiddenIds.includes(m.id)),     ...customMeals.lunch],
    middag:    [...MEALS.middag.filter(m => !hiddenIds.includes(m.id)),    ...customMeals.middag],
    mellanmal: [...MEALS.mellanmal.filter(m => !hiddenIds.includes(m.id)), ...customMeals.mellanmal],
  }

  const addMeal = (category, { name, description }) => {
    const meal = { id: `custom_${category}_${Date.now()}`, name, description }
    setCustomMeals(prev => ({ ...prev, [category]: [...prev[category], meal] }))
  }

  const removeMeal = (id, category) => {
    if (id.startsWith('custom_')) {
      setCustomMeals(prev => ({ ...prev, [category]: prev[category].filter(m => m.id !== id) }))
    } else {
      setHiddenIds(prev => [...prev, id])
    }
  }

  return { meals, addMeal, removeMeal }
}

// Deterministiskt dagligt val baserat på merged meals
export function useDailyMeals(dateKey) {
  const { meals } = useMeals()
  const digits = dateKey.replace(/-/g, '')
  const seed = digits.split('').reduce((acc, d) => acc + parseInt(d), 0)
  const pick = (arr, offset) => arr.length ? arr[(seed + offset) % arr.length] : null

  return {
    frukost:   pick(meals.frukost, 0),
    lunch:     pick(meals.lunch, 3),
    middag:    pick(meals.middag, 7),
    mellanmal: pick(meals.mellanmal, 11),
  }
}
