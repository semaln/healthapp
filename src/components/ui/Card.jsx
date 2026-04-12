export default function Card({ children, className = '', padding = true }) {
  return (
    <div className={`card ${padding ? 'p-4' : ''} ${className}`}>
      {children}
    </div>
  )
}
