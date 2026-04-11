export default function Card({ children, className = '', padding = true }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-border ${padding ? 'p-4' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
