export default function PageHeader({ title, subtitle }) {
  return (
    <div className="px-4 pt-6 pb-4 bg-primary text-white">
      <h1 className="text-xl font-semibold">{title}</h1>
      {subtitle && <p className="text-sm mt-0.5 text-white/70">{subtitle}</p>}
    </div>
  )
}
