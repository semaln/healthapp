const variants = {
  green: 'bg-surface text-primary border border-border/80',
  red: 'bg-red-50 text-accent-red border border-red-100',
  blue: 'bg-blue-50 text-accent-blue border border-blue-100',
  brown: 'bg-amber-50 text-secondary border border-amber-100',
  japanese: 'bg-orange-50 text-japanese border border-orange-100',
}

export default function Badge({ children, variant = 'green', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
