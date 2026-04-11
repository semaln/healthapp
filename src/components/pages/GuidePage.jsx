import { useState } from 'react'
import PageHeader from '../layout/PageHeader.jsx'
import ExpandableSection from '../ui/ExpandableSection.jsx'
import { GUIDE_SECTIONS } from '../../data/guide-content.js'

function renderContent(blocks) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case 'text':
        return (
          <p key={i} className="text-sm text-text-primary leading-relaxed mb-3">
            {block.text}
          </p>
        )
      case 'heading':
        return (
          <h3 key={i} className="text-sm font-semibold text-primary mt-4 mb-2">
            {block.text}
          </h3>
        )
      case 'list':
        return (
          <ul key={i} className="mb-3 space-y-1">
            {block.items.map((item, j) => (
              <li key={j} className="text-sm text-text-primary flex gap-2">
                <span className="text-primary-light mt-0.5 flex-shrink-0">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        )
      case 'table':
        return (
          <div key={i} className="overflow-x-auto mb-3">
            <table className="w-full text-sm">
              <tbody>
                {block.rows.map((row, j) => (
                  <tr key={j} className={j % 2 === 0 ? 'bg-surface' : 'bg-white'}>
                    {row.map((cell, k) => (
                      <td
                        key={k}
                        className={`px-3 py-2 text-sm ${
                          k === 0 ? 'font-medium text-text-primary w-2/5' : 'text-text-secondary'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      default:
        return null
    }
  })
}

export default function GuidePage() {
  const [search, setSearch] = useState('')
  const q = search.toLowerCase().trim()

  const filtered = q
    ? GUIDE_SECTIONS.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.content.some(
            (b) =>
              (b.text && b.text.toLowerCase().includes(q)) ||
              (b.items && b.items.some((item) => item.toLowerCase().includes(q)))
          )
      )
    : GUIDE_SECTIONS

  return (
    <div>
      <PageHeader title="Guide" subtitle="Referensinformation" />

      <div className="px-4 py-3 bg-white border-b border-border sticky top-0 z-10">
        <input
          type="text"
          placeholder="Sök i guiden..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:border-primary-light"
        />
      </div>

      <div className="p-4 space-y-3">
        {filtered.length === 0 && (
          <p className="text-center text-text-secondary text-sm py-8">
            Inga träffar för "{search}"
          </p>
        )}
        {filtered.map((section, i) => (
          <ExpandableSection
            key={section.id}
            title={section.title}
            defaultOpen={i === 0 && !q}
          >
            <div className="pt-3">{renderContent(section.content)}</div>
          </ExpandableSection>
        ))}
      </div>
    </div>
  )
}
