import { useState } from 'react'
import TabBar from '../ui/TabBar.jsx'
import ExpandableSection from '../ui/ExpandableSection.jsx'
import Card from '../ui/Card.jsx'
import PageHeader from '../layout/PageHeader.jsx'
import { useMeals } from '../../hooks/useMeals.js'
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

function MealCard({ meal, editMode, onRemove }) {
  return (
    <div className="py-2 border-b border-surface last:border-b-0 flex items-start gap-2">
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-1.5">
          <span className="font-medium text-text-primary text-sm flex items-center gap-1">
            {meal.name}
            {meal.star && <span className="text-yellow-400">⭐</span>}
            {meal.japanese && <span>🇯🇵</span>}
          </span>
        </div>
        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{meal.description}</p>
      </div>
      {editMode && (
        <button
          onClick={() => onRemove(meal.id)}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-accent-red hover:bg-accent-red/10 transition-colors text-base mt-0.5"
          aria-label="Ta bort måltid"
        >
          🗑️
        </button>
      )}
    </div>
  )
}

function AddMealForm({ category, onSave, onCancel }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSave = () => {
    if (!name.trim()) return
    onSave(category, { name: name.trim(), description: description.trim() })
    setName('')
    setDescription('')
  }

  return (
    <div className="mt-2 p-3 rounded-lg border border-primary/20 bg-surface space-y-2">
      <input
        type="text"
        placeholder="Namn (obligatoriskt)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field text-sm"
        autoFocus
      />
      <input
        type="text"
        placeholder="Beskrivning (valfritt)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field text-sm"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="flex-1 py-1.5 rounded-lg bg-primary text-cream text-sm font-medium disabled:opacity-40 transition-opacity"
        >
          Spara
        </button>
        <button
          onClick={onCancel}
          className="flex-1 py-1.5 rounded-lg border border-border text-text-secondary text-sm transition-colors hover:bg-surface"
        >
          Avbryt
        </button>
      </div>
    </div>
  )
}

function MaltiderTab() {
  const { meals, addMeal, removeMeal } = useMeals()
  const [editMode, setEditMode] = useState(false)
  const [openAddForm, setOpenAddForm] = useState(null) // category key or null

  const handleRemove = (id, category) => removeMeal(id, category)

  const handleSave = (category, mealData) => {
    addMeal(category, mealData)
    setOpenAddForm(null)
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex justify-end">
        <button
          onClick={() => { setEditMode(e => !e); setOpenAddForm(null) }}
          className={`text-sm font-medium px-3 py-1.5 rounded-lg border transition-colors ${
            editMode
              ? 'bg-primary text-cream border-primary'
              : 'border-border text-text-secondary hover:bg-surface'
          }`}
        >
          {editMode ? '✓ Klar' : '✏️ Redigera'}
        </button>
      </div>

      {MEAL_SECTIONS.map(({ key, label, icon }) => (
        <ExpandableSection
          key={key}
          title={`${icon} ${label}`}
          badge={`${meals[key].length} förslag`}
          defaultOpen={key === 'frukost'}
        >
          <div className="pt-3">
            {meals[key].map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                editMode={editMode}
                onRemove={(id) => handleRemove(id, key)}
              />
            ))}
            {editMode && (
              openAddForm === key ? (
                <AddMealForm
                  category={key}
                  onSave={handleSave}
                  onCancel={() => setOpenAddForm(null)}
                />
              ) : (
                <button
                  onClick={() => setOpenAddForm(key)}
                  className="mt-2 w-full py-1.5 rounded-lg border border-dashed border-primary/30 text-sm text-primary/70 hover:bg-primary/5 transition-colors"
                >
                  + Lägg till
                </button>
              )
            )}
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
        className="input-field"
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
      <div className="card p-4 border-l-4 border-accent-red bg-cream">
        <p className="text-sm font-sans text-accent-red font-medium">
          Begränsa eller undvik dessa livsmedel för bättre hjärthälsa.
        </p>
      </div>
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
