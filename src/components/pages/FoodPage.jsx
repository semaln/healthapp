import { useState } from 'react'
import TabBar from '../ui/TabBar.jsx'
import ExpandableSection from '../ui/ExpandableSection.jsx'
import Card from '../ui/Card.jsx'
import PageHeader from '../layout/PageHeader.jsx'
import { MEALS } from '../../data/meals.js'
import { FOOD_CATEGORIES } from '../../data/foods.js'
import { AVOID_ITEMS } from '../../data/avoid.js'

const TABS = [
  { id: 'maltider', label: 'Måltider' },
  { id: 'livsmedel', label: 'Livsmedel' },
  { id: 'undvik', label: 'Undvik' },
]

const MEAL_SECTIONS = [
  { key: 'frukost', label: 'Frukost', icon: '🌅' },
  { key: 'lunch', label: 'Lunch', icon: '☀️' },
  { key: 'middag', label: 'Middag', icon: '🌙' },
  { key: 'mellanmal', label: 'Mellanmål', icon: '🍎' },
]

function MealCard({ meal }) {
  return (
    <div className="py-2 border-b border-surface last:border-b-0">
      <div className="flex items-start gap-1.5">
        <span className="font-medium text-text-primary text-sm flex items-center gap-1">
          {meal.name}
          {meal.star && <span className="text-yellow-400">⭐</span>}
          {meal.japanese && <span>🇯🇵</span>}
        </span>
      </div>
      <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{meal.description}</p>
    </div>
  )
}

function MaltiderTab() {
  return (
    <div className="p-4 space-y-3">
      {MEAL_SECTIONS.map(({ key, label, icon }) => (
        <ExpandableSection
          key={key}
          title={`${icon} ${label}`}
          badge={`${MEALS[key].length} förslag`}
          defaultOpen={key === 'frukost'}
        >
          <div className="pt-3">
            {MEALS[key].map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </ExpandableSection>
      ))}
    </div>
  )
}

function LivsmedelsTab() {
  const [search, setSearch] = useState('')
  const q = search.toLowerCase().trim()

  const filtered = FOOD_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) =>
      !q || item.name.toLowerCase().includes(q)
    ),
  })).filter((cat) => cat.items.length > 0)

  return (
    <div className="p-4 space-y-3">
      <input
        type="text"
        placeholder="Sök livsmedel..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:border-primary-light"
      />
      {filtered.map((cat) => (
        <ExpandableSection
          key={cat.id}
          title={`${cat.icon} ${cat.label}`}
          badge={cat.note}
          defaultOpen={!!q}
        >
          <div className="pt-3 space-y-2">
            {cat.items.map((item) => (
              <div key={item.name} className="flex items-start gap-2 py-1">
                <div className="flex items-center gap-1 min-w-0">
                  {item.star && <span className="text-yellow-400 text-xs flex-shrink-0">★</span>}
                  {item.japanese && <span className="text-xs flex-shrink-0">🇯🇵</span>}
                  <span className="text-sm font-medium text-text-primary">{item.name}</span>
                </div>
                {item.note && (
                  <span className="text-xs text-text-secondary ml-auto text-right leading-relaxed">
                    {item.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        </ExpandableSection>
      ))}
    </div>
  )
}

function UndvikTab() {
  return (
    <div className="p-4 space-y-3">
      <Card className="bg-red-50 border-red-100">
        <p className="text-sm text-accent-red font-medium">
          Begränsa eller undvik dessa livsmedel för bättre hjärthälsa.
        </p>
      </Card>
      {AVOID_ITEMS.map((section) => (
        <ExpandableSection
          key={section.category}
          title={`⚠️ ${section.category}`}
          defaultOpen={true}
        >
          <div className="pt-3 space-y-3">
            {section.items.map((item) => (
              <div key={item.name} className="border-l-2 border-accent-red pl-3">
                <div className="text-sm font-medium text-text-primary">{item.name}</div>
                <div className="text-xs text-text-secondary mt-0.5">{item.reason}</div>
              </div>
            ))}
          </div>
        </ExpandableSection>
      ))}
    </div>
  )
}

export default function FoodPage() {
  const [activeTab, setActiveTab] = useState('maltider')

  return (
    <div>
      <PageHeader title="Kost" subtitle="Hjärthälsosam mat" />
      <TabBar tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === 'maltider' && <MaltiderTab />}
      {activeTab === 'livsmedel' && <LivsmedelsTab />}
      {activeTab === 'undvik' && <UndvikTab />}
    </div>
  )
}
