export default function Sidebar({ parts, activeId, onSelect, open, onClose }) {
  const groups = []
  for (const p of parts) {
    let g = groups.find((x) => x.name === p.group)
    if (!g) groups.push((g = { name: p.group, items: [] }))
    g.items.push(p)
  }

  return (
    <>
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <div className="brand">
          <div className="brand-kicker">없던컴퍼니 · 퓨처테리어</div>
          <h1 className="brand-title">인턴 사전 과제</h1>
          <div className="brand-sub">박기성</div>
        </div>

        <nav className="nav">
          {groups.map((g) => (
            <div className="nav-group" key={g.name}>
              <div className="nav-group-name">{g.name}</div>
              {g.items.map((p) => {
                const ready = !!p.content
                return (
                  <button
                    key={p.id}
                    className={`nav-item${p.id === activeId ? ' active' : ''}${ready ? '' : ' pending'}`}
                    onClick={() => {
                      onSelect(p.id)
                      onClose?.()
                    }}
                  >
                    <span className="nav-no">{String(p.id).padStart(2, '0')}</span>
                    <span className="nav-title">{p.title}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>
      {open && <div className="scrim" onClick={onClose} />}
    </>
  )
}
