import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function ExpandableSection({ title, children, defaultOpen = false, badge = null }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-text-primary">{title}</span>
          {badge && (
            <span className="text-xs bg-surface text-text-secondary px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          size={18}
          className={`text-text-secondary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-border">
          {children}
        </div>
      )}
    </div>
  )
}
