const WEEKDAYS = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag']
const WEEKDAYS_CAP = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag']
const MONTHS = [
  'januari', 'februari', 'mars', 'april', 'maj', 'juni',
  'juli', 'augusti', 'september', 'oktober', 'november', 'december'
]

export function getTodayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function getDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function formatDateLong(date = new Date()) {
  const day = WEEKDAYS_CAP[date.getDay()]
  const num = date.getDate()
  const month = MONTHS[date.getMonth()]
  return `${day} ${num} ${month}`
}

export function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 10) return 'God morgon'
  if (hour < 12) return 'God förmiddag'
  if (hour < 17) return 'God eftermiddag'
  if (hour < 21) return 'God kväll'
  return 'God natt'
}

export function getWeekdayIndex(date = new Date()) {
  // 0=sön, 1=mån, ..., 6=lör → return Monday-indexed (0=mån...6=sön)
  return (date.getDay() + 6) % 7
}

export function getWeekdayName(date = new Date()) {
  return WEEKDAYS[date.getDay()]
}

export function getWeekdays() {
  return ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']
}
