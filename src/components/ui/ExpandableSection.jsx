import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function ExpandableSection({ title, children, defaultOpen = false, badge = null }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left group"
      >
        <div className="flex items-center gap-2.5">
          <span className="font-sans font-semibold text-text-primary text-sm">{title}</span>
          {badge && (
            <span className="text-[11px] bg-surface text-text-secondary px-2 py-0.5 rounded-full font-medium">
              {badge}
            </span>
          )}
        </div>
        <div className={`w-6 h-6 rounded-full bg-surface flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown size={14} className="text-text-secondary" />
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-border/60">
          {children}
        </div>
      )}
    </div>
  )
}
