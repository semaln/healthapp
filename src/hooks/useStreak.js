import { useState, useEffect } from 'react'
import { calcStreak } from '../utils/streakCalc.js'

export function useStreak() {
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    setStreak(calcStreak())
  }, [])

  return streak
}
