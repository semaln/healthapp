import { getDateKey } from './dateUtils.js'
import { GOALS } from './constants.js'

export function calcStreak() {
  let streak = 0
  const today = new Date()

  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = `checklist_${getDateKey(d)}`
    const data = localStorage.getItem(key)
    if (!data) break

    const checklist = JSON.parse(data)
    const checked = Object.values(checklist).filter(Boolean).length
    if (checked >= GOALS.checklistMin) {
      streak++
    } else {
      if (i > 0) break // allow today to be incomplete
    }
  }

  return streak
}
