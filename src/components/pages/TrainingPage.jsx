import { useState, useEffect, useMemo } from 'react'
import PageHeader from '../layout/PageHeader.jsx'
import Card from '../ui/Card.jsx'
import ExerciseList from '../features/ExerciseList.jsx'
import IsometricTimer from '../features/IsometricTimer.jsx'
import BreathingLibrary from '../features/BreathingLibrary.jsx'
import { WEEKLY_SCHEDULE } from '../../data/schedule.js'
import { EXERCISES } from '../../data/exercises.js'
import { getWeekdayIndex } from '../../utils/dateUtils.js'
import { useChecklist } from '../../hooks/useChecklist.js'

const TYPE_BADGE = {
  strength: 'bg-primary text-white',
  cardio: 'bg-primary-light text-white',
  rest: 'bg-surface text-primary border border-border',
}

function CardioGuidance({ day }) {
  return (
    <Card>
      <h2 className="section-label mb-3">Konditionspass</h2>
      <div className="flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center text-2xl flex-shrink-0">
          🏃
        </div>
        <div>
          <div className="font-sans font-semibold text-text-primary text-[15px]">{day.label}</div>
          <div className="text-sm text-text-secondary font-sans mt-0.5">{day.description}</div>
          <div className="text-xs text-text-secondary/70 font-sans mt-1 leading-snug">
            Prata-tempo — du ska kunna hålla ett samtal under hela passet
          </div>
        </div>
      </div>
    </Card>
  )
}

function RestGuidance({ day }) {
  return (
    <Card>
      <h2 className="section-label mb-3">Återhämtning</h2>
      <div className="flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center text-2xl flex-shrink-0">
          🧘
        </div>
        <div>
          <div className="font-sans font-semibold text-text-primary text-[15px]">Vildag</div>
          <div className="text-sm text-text-secondary font-sans mt-0.5">
            Aktiv återhämtning. Promenaden räknas.
          </div>
          {day.extra && (
            <div className="text-xs text-text-secondary/70 font-sans mt-0.5">+ {day.extra}</div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default function TrainingPage() {
  const todayIdx = getWeekdayIndex()
  const { checklist, toggle } = useChecklist()
  const [selectedDay, setSelectedDay] = useState(todayIdx)
  const [completedSets, setCompletedSets] = useState({})
  const [timerExercise, setTimerExercise] = useState(null)

  const selectedDayData = WEEKLY_SCHEDULE[selectedDay]
  const selectedPass = selectedDayData.passId ? EXERCISES[selectedDayData.passId] : null
  const isToday = selectedDay === todayIdx

  const allExercisesComplete = useMemo(() => {
    if (!selectedPass || !isToday) return false
    return selectedPass.exercises.every((ex) => (completedSets[ex.id] || 0) >= ex.sets)
  }, [completedSets, selectedPass, isToday])

  useEffect(() => {
    if (allExercisesComplete && !checklist.training_done) {
      toggle('training_done')
    }
  }, [allExercisesComplete])

  const handleSelectDay = (i) => {
    if (i !== selectedDay) {
      setSelectedDay(i)
      setCompletedSets({})
      setTimerExercise(null)
    }
  }

  const handleSetToggle = (exerciseId, dotIndex) => {
    setCompletedSets((prev) => {
      const current = prev[exerciseId] || 0
      const newValue = current === dotIndex + 1 ? dotIndex : dotIndex + 1
      return { ...prev, [exerciseId]: newValue }
    })
  }

  const handleTimerComplete = (exerciseId) => {
    if (!selectedPass) return
    const exercise = selectedPass.exercises.find((e) => e.id === exerciseId)
    if (exercise) {
      setCompletedSets((prev) => ({ ...prev, [exerciseId]: exercise.sets }))
    }
    setTimerExercise(null)
  }

  return (
    <div>
      <PageHeader title="Träning" subtitle="Veckans schema" />

      {/* Weekly day strip */}
      <div className="bg-background border-b border-border/60 px-4 py-3">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {WEEKLY_SCHEDULE.map((day, i) => (
            <button
              key={day.day}
              onClick={() => handleSelectDay(i)}
              className={`flex-shrink-0 flex flex-col items-center p-2 rounded-xl min-w-[46px] transition-all active:scale-95 ${
                i === selectedDay
                  ? 'bg-primary text-white shadow-sm'
                  : i === todayIdx
                  ? 'bg-surface text-text-secondary ring-1 ring-primary/30'
                  : 'bg-surface text-text-secondary'
              }`}
            >
              <span
                className={`text-[10px] font-sans font-semibold uppercase tracking-wide ${
                  i === selectedDay ? 'text-white/70' : 'text-text-secondary'
                }`}
              >
                {day.day.slice(0, 3)}
              </span>
              <span className="text-lg mt-0.5">{day.icon}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Selected day card */}
        <Card>
          <h2 className="section-label mb-3">
            {isToday ? `Idag — ${selectedDayData.day}` : selectedDayData.day}
          </h2>
          <div className="flex items-center gap-3.5">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${
                TYPE_BADGE[selectedDayData.type]
              }`}
            >
              {selectedDayData.icon}
            </div>
            <div>
              <div className="font-sans font-semibold text-text-primary text-[15px]">
                {selectedDayData.label}
              </div>
              <div className="text-sm text-text-secondary font-sans mt-0.5">
                {selectedDayData.description}
              </div>
              {selectedDayData.extra && (
                <div className="text-xs text-text-secondary/70 font-sans mt-0.5">
                  + {selectedDayData.extra}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Exercise list or guidance */}
        {selectedPass ? (
          <ExerciseList
            pass={selectedPass}
            completedSets={completedSets}
            onSetToggle={handleSetToggle}
            onStartTimer={setTimerExercise}
          />
        ) : selectedDayData.type === 'cardio' ? (
          <CardioGuidance day={selectedDayData} />
        ) : (
          <RestGuidance day={selectedDayData} />
        )}

        {/* Breathing library */}
        <BreathingLibrary />

        {/* Full week list */}
        <Card>
          <h2 className="section-label mb-3">Hela veckan</h2>
          <div className="space-y-1">
            {WEEKLY_SCHEDULE.map((day, i) => (
              <button
                key={day.day}
                onClick={() => handleSelectDay(i)}
                className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all active:scale-[0.98] text-left ${
                  i === selectedDay ? 'bg-primary/10' : i === todayIdx ? 'bg-surface' : 'hover:bg-surface/60'
                }`}
              >
                <span className="text-xl w-8">{day.icon}</span>
                <div className="flex-1">
                  <div
                    className={`text-sm font-sans font-medium ${
                      i === selectedDay ? 'text-primary' : 'text-text-primary'
                    }`}
                  >
                    {day.day}
                    {i === todayIdx && (
                      <span className="ml-2 text-xs text-primary/60 font-normal">(idag)</span>
                    )}
                  </div>
                  <div className="text-xs text-text-secondary font-sans font-light">
                    {day.label} — {day.description}
                  </div>
                </div>
                {day.passId && (
                  <span className="text-xs text-text-secondary/50 font-sans">›</span>
                )}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Timer overlay */}
      {timerExercise && (
        <IsometricTimer
          exercise={timerExercise}
          onClose={() => setTimerExercise(null)}
          onComplete={handleTimerComplete}
        />
      )}
    </div>
  )
}
