export default function PageHeader({ title, subtitle }) {
  return (
    <div
      className="px-5 pt-8 pb-5 text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1d3528 0%, #2c4f3c 60%, #325a43 100%)' }}
    >
      {/* Decorative arc */}
      <div
        className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }}
      />
      <div
        className="absolute right-4 bottom-2 w-24 h-24 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #a8d5b0 0%, transparent 70%)' }}
      />
      <h1 className="font-display text-[1.75rem] font-semibold leading-tight text-white">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm mt-0.5 text-white/60 font-sans font-light tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  )
}
