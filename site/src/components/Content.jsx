import { Block } from './Blocks.jsx'
import Inline from './Inline.jsx'

// 섹션 안에서 번호가 매겨지는 블록(sub · ref · funnel · profile)과
// 파트 전체에서 번호가 이어지는 블록(proposal)을 구분해 카운트한다.
function renderSections(sections) {
  let proposalNo = 0
  return sections.map((sec, si) => {
    const counters = { sub: 0, ref: 0, funnel: 0, profile: 0 }
    return (
      <section className="section" key={si}>
        <h3 className="section-title">
          <span className="section-no">{si + 1}</span>
          {sec.title}
        </h3>
        {sec.blocks.map((b, bi) => {
          if (b.type in counters) counters[b.type] += 1
          if (b.type === 'proposal') proposalNo += 1
          return (
            <Block
              key={bi}
              block={b}
              sectionNo={si + 1}
              subNo={counters.sub}
              refNo={counters.ref}
              funnelNo={counters.funnel}
              profileNo={counters.profile}
              proposalNo={proposalNo}
            />
          )
        })}
      </section>
    )
  })
}

export default function Content({ part, index, total, onPrev, onNext }) {
  const c = part.content

  return (
    <main className="content">
      <header className="part-head">
        <div className="part-kicker">
          PART {String(part.id).padStart(2, '0')} <span className="sep">/</span> {String(total).padStart(2, '0')}
        </div>
        <h2 className="part-title">{part.title}</h2>
        {c?.lead && (
          <p className="part-lead">
            <Inline text={c.lead} />
          </p>
        )}
      </header>

      {!c ? (
        <div className="pending-box">
          <p>이 파트는 아직 작성 중입니다.</p>
        </div>
      ) : (
        renderSections(c.sections)
      )}

      <footer className="part-foot">
        <button className="foot-btn" onClick={onPrev} disabled={index === 0}>
          ← 이전
        </button>
        <span className="foot-pos">
          {index + 1} / {total}
        </span>
        <button className="foot-btn" onClick={onNext} disabled={index === total - 1}>
          다음 →
        </button>
      </footer>
    </main>
  )
}
