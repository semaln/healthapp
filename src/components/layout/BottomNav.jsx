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
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto px-3"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 10px)' }}
    >
      <div className="glass-nav rounded-2xl flex overflow-hidden">
        {NAV_ITEMS.map(({ to, icon: Icon, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all duration-200 ${
                isActive
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200"
                  style={isActive ? { background: 'rgba(29,53,40,0.08)' } : {}}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.2 : 1.6} />
                </div>
                <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'text-primary' : 'text-text-secondary'}`}>
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
