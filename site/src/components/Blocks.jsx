import Inline from './Inline.jsx'

function List({ items }) {
  const arr = Array.isArray(items) ? items : [items]
  return (
    <ul className="list">
      {arr.map((t, i) => (
        <li key={i}>
          <Inline text={t} />
        </li>
      ))}
    </ul>
  )
}

function Paragraphs({ items }) {
  const arr = Array.isArray(items) ? items : [items]
  return arr.map((t, i) => (
    <p key={i}>
      <Inline text={t} />
    </p>
  ))
}

function Quote({ text, source }) {
  return (
    <blockquote className="quote">
      <p>“{text}”</p>
      {source && <cite>— {source}</cite>}
    </blockquote>
  )
}

/* Fact → Insight → Proposal */
function FIP({ note, fact, insight, proposal, quote }) {
  return (
    <div className="fip">
      {note && <p className="fip-note">{note}</p>}
      {fact && (
        <div className="fip-row">
          <div className="fip-label">Fact</div>
          <div className="fip-body">
            <List items={fact} />
            {quote && <Quote {...quote} />}
          </div>
        </div>
      )}
      {insight && (
        <div className="fip-row">
          <div className="fip-label">Insight</div>
          <div className="fip-body fip-insight">
            <Paragraphs items={insight} />
          </div>
        </div>
      )}
      {proposal && (
        <div className="fip-row">
          <div className="fip-label">Proposal</div>
          <div className="fip-body">
            <List items={proposal} />
          </div>
        </div>
      )}
    </div>
  )
}

// 가격 · 숫자만 든 칸은 줄바꿈하지 않는다
const isNumericCell = (v) =>
  typeof v === 'string' && /^[\d,.\s]+(원|개|%|만 원)?$/.test(v.replace(/\*\*/g, '').trim())

function Table({ columns, rows }) {
  const indexed = columns[0] === '#'
  return (
    <div className="table-wrap">
      <table className={indexed ? 'table-indexed' : ''}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} className={isNumericCell(cell) ? 'cell-num' : undefined}>
                  <Inline text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Summary({ items, labelWidth }) {
  return (
    <div className="summary" style={labelWidth ? { '--summary-label-w': labelWidth } : undefined}>
      {items.map((it, i) => (
        <div className="summary-row" key={i}>
          <span className="summary-label">{it.label}</span>
          <span className="summary-text">
            <Inline text={it.text} />
          </span>
        </div>
      ))}
    </div>
  )
}

function Ref({ index, name, tagline, what, why, how }) {
  const rows = [
    ['무엇을 참고하는가', what],
    ['왜 퓨처테리어와 맞는가', why],
    ['어떻게 적용하는가', how],
  ]
  return (
    <div className="ref">
      <div className="ref-head">
        <span className="ref-index">{String(index).padStart(2, '0')}</span>
        <h4 className="ref-name">{name}</h4>
        {tagline && <span className="ref-tagline">{tagline}</span>}
      </div>
      <dl className="ref-body">
        {rows.map(([k, v], i) => (
          <div className="ref-row" key={i}>
            <dt>{k}</dt>
            <dd>
              <Inline text={v} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Steps({ items }) {
  return (
    <ol className="steps">
      {items.map((s, i) => (
        <li className="step" key={i}>
          <div className="step-num">{i + 1}</div>
          <div className="step-body">
            <h4 className="step-title">{s.title}</h4>
            <p>
              <Inline text={s.text} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function Funnel({ index, title, tagline, steps }) {
  return (
    <div className="funnel">
      <div className="funnel-head">
        <span className="funnel-index">{String(index).padStart(2, '0')}</span>
        <h4 className="funnel-title">{title}</h4>
        {tagline && <span className="funnel-tagline">{tagline}</span>}
      </div>
      <ol className="funnel-steps">
        {steps.map((s, i) => (
          <li className="funnel-step" key={i}>
            <span className="funnel-label">{s.label}</span>
            <span className="funnel-text">
              <Inline text={s.text} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Callout({ text }) {
  return (
    <div className="callout">
      <p>
        <Inline text={text} />
      </p>
    </div>
  )
}

function Profile({ index, name, meta, rows, note }) {
  return (
    <div className="profile">
      <div className="profile-head">
        <span className="profile-index">{String(index).padStart(2, '0')}</span>
        <h4 className="profile-name">{name}</h4>
        {meta && <span className="profile-meta">{meta}</span>}
      </div>
      <dl className="profile-body">
        {rows.map(([k, v], i) => (
          <div className="profile-row" key={i}>
            <dt>{k}</dt>
            <dd>
              <Inline text={v} />
            </dd>
          </div>
        ))}
      </dl>
      {note && <p className="profile-note">{note}</p>}
    </div>
  )
}

function Proposal({ index, title, text, label = 'Proposal' }) {
  const arr = Array.isArray(text) ? text : [text]
  return (
    <div className="proposal">
      <div className="proposal-label">
        {label} {String(index).padStart(2, '0')}
      </div>
      <div className="proposal-body">
        <h4 className="proposal-title">{title}</h4>
        {arr.map((t, i) => (
          <p key={i}>
            <Inline text={t} />
          </p>
        ))}
      </div>
    </div>
  )
}

function Persona({ tag, name, profile, traits, behavior, value }) {
  return (
    <div className="persona">
      <div className="persona-head">
        <div className="persona-tag">{tag}</div>
        <div>
          <h4 className="persona-name">{name}</h4>
          {profile && <div className="persona-profile">{profile}</div>}
        </div>
      </div>
      {traits && (
        <dl className="persona-traits">
          {traits.map(([k, v], i) => (
            <div className="persona-trait" key={i}>
              <dt>{k}</dt>
              <dd>
                <Inline text={v} />
              </dd>
            </div>
          ))}
        </dl>
      )}
      {behavior && (
        <p className="persona-behavior">
          <Inline text={behavior} />
        </p>
      )}
      {value && (
        <div className="persona-value">
          <span className="persona-value-label">퓨처테리어가 줄 가치</span>
          <p>
            <Inline text={value} />
          </p>
        </div>
      )}
    </div>
  )
}

/* 이미지 1장 또는 여러 장(가로 배치). items: [{ src, alt, caption, maxHeight?, width? }] */
function Figures({ items, caption }) {
  return (
    <figure className="figures">
      <div className={`figures-row${items.length > 1 ? ' multi' : ''}`}>
        {items.map((it, i) => (
          <div className="figure" key={i} style={it.width ? { flex: `0 1 ${it.width}` } : undefined}>
            <div className="figure-img">
              <img src={it.src} alt={it.alt || ''} style={it.maxHeight ? { maxHeight: it.maxHeight } : undefined} />
            </div>
            {it.caption && <div className="figure-caption">{it.caption}</div>}
          </div>
        ))}
      </div>
      {caption && <figcaption className="figures-caption">{caption}</figcaption>}
    </figure>
  )
}

export function Block({ block, sectionNo, subNo, refNo, funnelNo, profileNo, proposalNo }) {
  switch (block.type) {
    case 'sub':
      return (
        <div className="sub">
          <h3 className="sub-title">
            <span className="sub-no">
              {sectionNo}-{subNo}
            </span>
            {block.title}
          </h3>
          {block.children.map((c, i) => (
            <Block key={i} block={c} sectionNo={sectionNo} subNo={subNo} />
          ))}
        </div>
      )
    case 'fip':
      return <FIP {...block} />
    case 'quote':
      return <Quote {...block} />
    case 'table':
      return <Table {...block} />
    case 'summary':
      return <Summary {...block} />
    case 'p':
      return (
        <p>
          <Inline text={block.text} />
        </p>
      )
    case 'ref':
      return <Ref {...block} index={refNo} />
    case 'steps':
      return <Steps {...block} />
    case 'funnel':
      return <Funnel {...block} index={funnelNo} />
    case 'callout':
      return <Callout {...block} />
    case 'profile':
      return <Profile {...block} index={profileNo} />
    case 'proposal':
      return <Proposal {...block} index={proposalNo} />
    case 'persona':
      return <Persona {...block} />
    case 'figures':
      return <Figures {...block} />
    default:
      return null
  }
}
