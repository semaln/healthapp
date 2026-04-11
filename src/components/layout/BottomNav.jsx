import { NavLink } from 'react-router-dom'
import { Home, Utensils, Dumbbell, BarChart2, BookOpen } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Idag', exact: true },
  { to: '/kost', icon: Utensils, label: 'Kost' },
  { to: '/traning', icon: Dumbbell, label: 'Träning' },
  { to: '/matning', icon: BarChart2, label: 'Mätning' },
  { to: '/guide', icon: BookOpen, label: 'Guide' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto">
      <div
        className="flex bg-white border-t border-border"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {NAV_ITEMS.map(({ to, icon: Icon, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
                isActive ? 'text-primary' : 'text-text-secondary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-text-secondary'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
