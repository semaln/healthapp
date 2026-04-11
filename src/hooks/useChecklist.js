import { useLocalStorage } from './useLocalStorage.js'
import { getTodayKey } from '../utils/dateUtils.js'

const DEFAULT_CHECKLIST = {
  morning_breathing: false,
  breakfast_fiber: false,
  legumes: false,
  fish: false,
  nuts: false,
  fruit: false,
  vegetables: false,
  steps_7000: false,
  training_done: false,
  last_meal_early: false,
  evening_winddown: false,
  evening_breathing: false,
}

export function useChecklist(dateKey = null) {
  const key = dateKey || getTodayKey()
  const [checklist, setChecklist] = useLocalStorage(`checklist_${key}`, DEFAULT_CHECKLIST)

  const toggle = (itemKey) => {
    setChecklist(prev => ({ ...prev, [itemKey]: !prev[itemKey] }))
  }

  const checkedCount = Object.values(checklist).filter(Boolean).length
  const totalCount = Object.keys(checklist).length

  return { checklist, toggle, checkedCount, totalCount }
}
