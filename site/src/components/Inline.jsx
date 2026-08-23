// 인라인 마크업 렌더러: **굵게**, `코드`, \n(줄바꿈)
import { Fragment } from 'react'

export default function Inline({ text }) {
  if (!text) return null
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\n)/g)
  return (
    <>
      {parts.map((p, i) => {
        if (p === '\n') return <br key={i} />
        if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
        if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>
        return <Fragment key={i}>{p}</Fragment>
      })}
    </>
  )
}
