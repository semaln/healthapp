import Card from '../ui/Card.jsx'
import { Timer } from 'lucide-react'

function SetDots({ total, completed, exerciseId, onToggle }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onToggle(exerciseId, i)}
          className={`w-6 h-6 rounded-full border-2 transition-all duration-150 flex items-center justify-center flex-shrink-0 ${
            i < completed
              ? 'bg-primary border-primary'
              : 'border-border bg-background hover:border-primary-light'
          }`}
        >
          {i < completed && (
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              <path d="M1 3L2.8 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      ))}
    </div>
  )
}

function ExerciseRow({ exercise, completedSets, onToggle, onStartTimer }) {
  const done = completedSets >= exercise.sets
  const setsLabel = exercise.reps
    ? `${exercise.sets} set × ${exercise.reps}`
    : `${exercise.sets} set × ${exercise.duration}`

  return (
    <div className={`py-3.5 border-b border-border/40 last:border-b-0 transition-opacity duration-300 ${done ? 'opacity-50' : ''}`}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          <span className={`text-sm font-sans font-semibold ${done ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
            {exercise.name}
          </span>
          {exercise.isometric && (
            <span
              className="text-[10px] font-sans font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-md"
              style={{ color: '#4d7a56', background: 'rgba(77,122,86,0.1)' }}
            >
              Iso
            </span>
          )}
        </div>
        {done && (
          <span className="text-xs text-sage font-sans font-medium flex-shrink-0">✓ Klar</span>
        )}
      </div>

      {/* Sets description */}
      <div className="text-xs text-text-secondary font-sans mb-1">{setsLabel}</div>

      {/* Comment */}
      <div className="text-[11px] text-text-secondary/70 font-sans font-light leading-snug mb-3">
        {exercise.comment}
      </div>

      {/* Set dots + timer button */}
      <div className="flex items-center justify-between">
        <SetDots
          total={exercise.sets}
          completed={completedSets}
          exerciseId={exercise.id}
          onToggle={onToggle}
        />
        {exercise.timerSeconds !== null && !done && (
          <button
            onClick={() => onStartTimer(exercise)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-medium text-white transition-all duration-150 active:scale-95"
            style={{ background: '#1d3528' }}
          >
            <Timer size={12} strokeWidth={2} />
            Starta timer
          </button>
        )}
      </div>
    </div>
  )
}

export default function ExerciseList({ pass, completedSets, onSetToggle, onStartTimer }) {
  const doneCount = pass.exercises.filter(
    (ex) => (completedSets[ex.id] || 0) >= ex.sets
  ).length

  return (
    <Card>
      <div className="mb-1">
        <div className="flex items-center justify-between">
          <h2 className="section-label">Övningar – {pass.focus}</h2>
          <span className="text-xs font-sans text-text-secondary">
            {doneCount}/{pass.exercises.length}
          </span>
        </div>
        <p className="text-[11px] text-text-secondary/80 font-sans font-light mt-1.5 leading-relaxed">
          {pass.description}
        </p>
      </div>

      {pass.exercises.map((exercise) => (
        <ExerciseRow
          key={exercise.id}
          exercise={exercise}
          completedSets={completedSets[exercise.id] || 0}
          onToggle={onSetToggle}
          onStartTimer={onStartTimer}
        />
      ))}
    </Card>
  )
}
