import { useState } from 'react'
import Card from '../ui/Card.jsx'
import BreathingSession from './BreathingSession.jsx'
import {
  breathingExercises,
  breathingSituations,
  difficultyLabels,
} from '../../data/breathingExercises.js'

export default function BreathingLibrary() {
  const [view, setView] = useState('situations')
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [quickMode, setQuickMode] = useState(false)

  const startExercise = (exercise, isQuick = false) => {
    setSelectedExercise(exercise)
    setQuickMode(isQuick)
  }

  const closeSession = () => {
    setSelectedExercise(null)
    setQuickMode(false)
  }

  const getExercise = (id) => breathingExercises.find((e) => e.id === id)

  return (
    <>
      <Card>
        <h2 className="section-label mb-3">Andningsövningar</h2>

        {/* View toggle */}
        <div className="flex gap-1 bg-surface rounded-xl p-1 mb-4">
          <button
            onClick={() => setView('situations')}
            className={`flex-1 py-1.5 text-xs font-sans font-medium rounded-lg transition-all ${
              view === 'situations' ? 'tab-pill-active' : 'text-text-secondary'
            }`}
          >
            Välj situation
          </button>
          <button
            onClick={() => setView('all')}
            className={`flex-1 py-1.5 text-xs font-sans font-medium rounded-lg transition-all ${
              view === 'all' ? 'tab-pill-active' : 'text-text-secondary'
            }`}
          >
            Alla tekniker
          </button>
        </div>

        {/* Situations view */}
        {view === 'situations' && (
          <div className="space-y-2">
            {breathingSituations.map((sit) => {
              const exercise = getExercise(sit.recommended)
              if (!exercise) return null
              return (
                <div
                  key={sit.situation}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: '#ede8df' }}
                >
                  <span className="text-xl flex-shrink-0 w-8 text-center">{sit.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-sans font-medium text-text-primary leading-tight">
                      {sit.situation}
                    </div>
                    <div className="text-xs font-sans text-text-secondary truncate mt-0.5">
                      {exercise.name} · {exercise.shortName}
                    </div>
                  </div>
                  <button
                    onClick={() => startExercise(exercise)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-sans font-medium text-white active:scale-95 transition-all"
                    style={{ background: exercise.color }}
                  >
                    Starta
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* All techniques view */}
        {view === 'all' && (
          <div className="space-y-4">
            {breathingExercises.map((exercise) => {
              const diff = difficultyLabels[exercise.difficulty]
              return (
                <div
                  key={exercise.id}
                  className="border-b border-border/40 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-sans font-semibold text-text-primary">
                          {exercise.name}
                        </span>
                        <span
                          className="text-[10px] font-sans font-medium px-1.5 py-0.5 rounded-full flex-shrink-0"
                          style={{
                            background: diff.color + '22',
                            color: diff.color,
                          }}
                        >
                          {diff.label}
                        </span>
                      </div>
                      <div className="text-[11px] font-sans text-text-secondary/70 mt-0.5">
                        {exercise.shortName} ·{' '}
                        {exercise.defaultDuration >= 60
                          ? `${Math.round(exercise.defaultDuration / 60)} min`
                          : `${exercise.defaultDuration}s`}
                      </div>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      {exercise.quickMode && (
                        <button
                          onClick={() => startExercise(exercise, true)}
                          className="px-2.5 py-1.5 rounded-lg text-[11px] font-sans font-medium border border-border text-text-secondary active:scale-95 transition-all"
                        >
                          Snabbt
                        </button>
                      )}
                      <button
                        onClick={() => startExercise(exercise)}
                        className="px-3 py-1.5 rounded-lg text-xs font-sans font-medium text-white active:scale-95 transition-all"
                        style={{ background: exercise.color }}
                      >
                        Starta
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-sans text-text-secondary leading-relaxed">
                    {exercise.description}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </Card>

      {selectedExercise && (
        <BreathingSession
          exercise={selectedExercise}
          quickMode={quickMode}
          onClose={closeSession}
        />
      )}
    </>
  )
}
