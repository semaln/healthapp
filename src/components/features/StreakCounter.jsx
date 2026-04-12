import { useStreak } from '../../hooks/useStreak.js'
import { Flame } from 'lucide-react'

export default function StreakCounter() {
  const streak = useStreak()

  if (streak === 0) {
    return (
      <div className="flex items-center gap-2 text-white/50">
        <Flame size={16} strokeWidth={1.5} />
        <span className="text-sm font-sans font-light tracking-wide">Starta din streak idag</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <Flame
          size={20}
          className="text-orange-400"
          fill="rgba(251,146,60,0.3)"
          style={{ filter: 'drop-shadow(0 0 6px rgba(251,146,60,0.5))' }}
        />
      </div>
      <span className="text-sm font-sans font-medium text-white">
        {streak} dag{streak !== 1 ? 'ar' : ''} i rad
      </span>
      {streak >= 7 && (
        <span className="text-[10px] text-white/50 font-sans font-light">(≥ 8/12 avbockade)</span>
      )}
    </div>
  )
}
