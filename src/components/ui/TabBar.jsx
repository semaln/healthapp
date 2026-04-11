export default function TabBar({ tabs, activeTab, onChange }) {
  return (
    <div className="flex border-b border-border bg-white sticky top-0 z-10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-secondary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
