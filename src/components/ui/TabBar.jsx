export default function TabBar({ tabs, activeTab, onChange }) {
  return (
    <div className="px-4 py-3 bg-background border-b border-border sticky top-0 z-10">
      <div className="flex gap-1 bg-surface rounded-2xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
              activeTab === tab.id
                ? 'tab-pill-active'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
