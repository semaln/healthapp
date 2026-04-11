import { useStreak } from '../../hooks/useStreak.js'
import { Flame } from 'lucide-react'

export default function StreakCounter() {
  const streak = useStreak()

  if (streak === 0) {
    return (
      <div className="flex items-center gap-2 text-text-secondary">
        <Flame size={18} className="text-orange-300" />
        <span className="text-sm">Starta din streak idag!</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Flame size={20} className="text-orange-500" />
      <span className="text-sm font-semibold text-text-primary">
        {streak} dag{streak !== 1 ? 'ar' : ''} i rad
      </span>
      {streak >= 7 && <span className="text-xs text-text-secondary">(minst 8/12 avbockade)</span>}
    </div>
  )
}
