import { useEffect, useState } from 'react'
import { parts } from './data/parts.js'
import Sidebar from './components/Sidebar.jsx'
import Content from './components/Content.jsx'

function idFromHash() {
  const m = location.hash.match(/part-(\d+)/)
  const id = m ? Number(m[1]) : 1
  return parts.some((p) => p.id === id) ? id : 1
}

export default function App() {
  const [activeId, setActiveId] = useState(idFromHash)
  const [menuOpen, setMenuOpen] = useState(false)

  const index = parts.findIndex((p) => p.id === activeId)
  const part = parts[index]

  useEffect(() => {
    const onHash = () => setActiveId(idFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const select = (id) => {
    history.replaceState(null, '', `#part-${id}`)
    setActiveId(id)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="layout">
      <button className="menu-btn" onClick={() => setMenuOpen(true)} aria-label="메뉴 열기">
        <span />
        <span />
        <span />
      </button>
      <Sidebar
        parts={parts}
        activeId={activeId}
        onSelect={select}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <Content
        key={activeId}
        part={part}
        index={index}
        total={parts.length}
        onPrev={() => select(parts[index - 1].id)}
        onNext={() => select(parts[index + 1].id)}
      />
    </div>
  )
}
