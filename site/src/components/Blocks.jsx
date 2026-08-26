import Inline from "./Inline.jsx";

function List({ items }) {
  const arr = Array.isArray(items) ? items : [items];
  return (
    <ul className="list">
      {arr.map((t, i) => (
        <li key={i}>
          <Inline text={t} />
        </li>
      ))}
    </ul>
  );
}

function Paragraphs({ items }) {
  const arr = Array.isArray(items) ? items : [items];
  return arr.map((t, i) => (
    <p key={i}>
      <Inline text={t} />
    </p>
  ));
}

function Quote({ text, source }) {
  return (
    <blockquote className="quote">
      <p>“{text}”</p>
      {source && <cite>— {source}</cite>}
    </blockquote>
  );
}

/* Fact → Insight → Proposal */
function FIP({ note, fact, insight, proposal, quote, figures }) {
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
      {figures && (
        <div className="fip-figures">
          <Figures {...figures} />
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
  );
}

// 가격 · 숫자만 든 칸은 줄바꿈하지 않는다
const isNumericCell = (v) =>
  typeof v === "string" &&
  /^[\d,.\s~]+(원|개|%|만 원)?$/.test(v.replace(/\*\*/g, "").trim());

function Table({ columns, rows }) {
  const indexed = columns[0] === "#";
  return (
    <div className="table-wrap">
      <table className={indexed ? "table-indexed" : ""}>
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
                <td
                  key={j}
                  className={isNumericCell(cell) ? "cell-num" : undefined}
                >
                  <Inline text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Summary({ items, labelWidth }) {
  return (
    <div
      className="summary"
      style={labelWidth ? { "--summary-label-w": labelWidth } : undefined}
    >
      {items.map((it, i) => (
        <div className="summary-row" key={i}>
          <span className="summary-label">{it.label}</span>
          <span className="summary-text">
            <Inline text={it.text} />
          </span>
        </div>
      ))}
    </div>
  );
}

function Ref({ index, name, tagline, what, why, how }) {
  const rows = [
    ["무엇을 참고하는가", what],
    ["왜 퓨처테리어와 맞는가", why],
    ["어떻게 적용하는가", how],
  ];
  return (
    <div className="ref">
      <div className="ref-head">
        <span className="ref-index">{String(index).padStart(2, "0")}</span>
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
  );
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
            {s.code && (
              <pre className="step-code">
                <code>{s.code}</code>
              </pre>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function Funnel({ index, title, tagline, steps }) {
  return (
    <div className="funnel">
      <div className="funnel-head">
        <span className="funnel-index">{String(index).padStart(2, "0")}</span>
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
  );
}

function Callout({ text }) {
  return (
    <div className="callout">
      <p>
        <Inline text={text} />
      </p>
    </div>
  );
}

/* 플랫폼 아이콘 (유튜브 · 인스타그램) */
function PlatformIcon({ kind }) {
  if (kind === "youtube")
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-label="YouTube">
        <rect x="1.5" y="4.5" width="21" height="15" rx="4" fill="#FF0000" />
        <polygon points="10,9 16,12 10,15" fill="#fff" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" aria-label="Instagram">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="#E4405F" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" fill="none" stroke="#E4405F" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.4" fill="#E4405F" />
    </svg>
  );
}

function Profile({ index, name, meta, rows, note, links }) {
  return (
    <div className="profile">
      <div className="profile-head">
        <span className="profile-index">{String(index).padStart(2, "0")}</span>
        <h4 className="profile-name">{name}</h4>
        {meta && <span className="profile-meta">{meta}</span>}
        {links && links.length > 0 && (
          <span className="profile-links">
            {links.map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noreferrer" title={`${name} ${l.kind === "youtube" ? "유튜브" : "인스타그램"} 열기`}>
                <PlatformIcon kind={l.kind} />
              </a>
            ))}
          </span>
        )}
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
  );
}

function Proposal({ index, title, text, label = "Proposal" }) {
  const arr = Array.isArray(text) ? text : [text];
  return (
    <div className="proposal">
      <div className="proposal-label">
        {label} {String(index).padStart(2, "0")}
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
  );
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
  );
}

/* 이미지 1장 또는 여러 장(가로 배치). items: [{ src, alt, caption, maxHeight?, width? }] */
function Figures({ items, caption }) {
  return (
    <figure className="figures">
      <div className={`figures-row${items.length > 1 ? " multi" : ""}`}>
        {items.map((it, i) => (
          <div
            className="figure"
            key={i}
            style={it.width ? { flex: `0 1 ${it.width}` } : undefined}
          >
            <div className="figure-img">
              <img
                src={it.src}
                alt={it.alt || ""}
                style={it.maxHeight ? { maxHeight: it.maxHeight } : undefined}
              />
            </div>
            {it.caption && <div className="figure-caption">{it.caption}</div>}
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="figures-caption">{caption}</figcaption>
      )}
    </figure>
  );
}

/* ── 아키텍처 계층도: 층마다 이름 + 칩들 ── */
function Arch({ title, caption, layers }) {
  return (
    <div className="arch">
      {title && <div className="arch-title">{title}</div>}
      <div className="arch-stack">
        {layers.map((l, i) => (
          <div className="arch-layer" key={i}>
            <div className="arch-layer-head">
              <span className="arch-layer-no">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="arch-layer-name">{l.name}</span>
              {l.note && <span className="arch-layer-note">{l.note}</span>}
            </div>
            <div className="arch-chips">
              {l.items.map((it, j) => (
                <span className="arch-chip" key={j}>
                  <Inline text={it} />
                </span>
              ))}
            </div>
            {l.desc && (
              <p className="arch-layer-desc">
                <Inline text={l.desc} />
              </p>
            )}
          </div>
        ))}
      </div>
      {caption && <p className="arch-caption">{caption}</p>}
    </div>
  );
}

/* ── 되돌아오는 고리: 단계들 + 마지막에 처음으로 돌아가는 화살표 ── */
function Cycle({ title, steps, back }) {
  return (
    <div className="cycle">
      {title && <div className="cycle-title">{title}</div>}
      <ol className="cycle-steps">
        {steps.map((st, i) => (
          <li className="cycle-step" key={i}>
            <span className="cycle-dot">{i + 1}</span>
            <div className="cycle-body">
              <div className="cycle-when">{st.when}</div>
              <div className="cycle-what">
                <Inline text={st.what} />
              </div>
            </div>
          </li>
        ))}
      </ol>
      {back && (
        <div className="cycle-back">
          <span className="cycle-back-arrow">↺</span>
          <Inline text={back} />
        </div>
      )}
    </div>
  );
}

/* ── 파일 · 코드 예시 ── */
function CodeBlock({ title, meta, text }) {
  return (
    <div className="codeblock">
      {(title || meta) && (
        <div className="codeblock-head">
          {title && <span className="codeblock-title">{title}</span>}
          {meta && <span className="codeblock-meta">{meta}</span>}
        </div>
      )}
      <pre className="codeblock-body">
        <code>{text}</code>
      </pre>
    </div>
  );
}

/* ── 지금 / 바뀐 뒤 나란히 비교 ── */
function Compare({ title, leftLabel = "지금", rightLabel = "바뀐 뒤", rows }) {
  return (
    <div className="compare">
      {title && <div className="compare-title">{title}</div>}
      <div className="compare-head">
        <span className="compare-key" />
        <span className="compare-col compare-col--left">{leftLabel}</span>
        <span className="compare-col compare-col--right">{rightLabel}</span>
      </div>
      {rows.map((r, i) => (
        <div className="compare-row" key={i}>
          <span className="compare-key">{r.key}</span>
          <span className="compare-col compare-col--left">
            <Inline text={r.left} />
          </span>
          <span className="compare-col compare-col--right">
            <Inline text={r.right} />
          </span>
        </div>
      ))}
    </div>
  );
}

/* -- 가로 파이프라인: 상자 -> 상자 -> 상자 -- */
function Flow({ title, nodes, caption }) {
  return (
    <div className="flowline">
      {title && <div className="flowline-title">{title}</div>}
      <div className="flowline-track">
        {nodes.map((n, i) => (
          <div className="flowline-node" key={i}>
            <div className={`flowline-box${n.accent ? " is-accent" : ""}`}>
              <span className="flowline-label">{n.label}</span>
              {n.sub && <span className="flowline-sub">{n.sub}</span>}
            </div>
            {i < nodes.length - 1 && <span className="flowline-arrow">-&gt;</span>}
          </div>
        ))}
      </div>
      {caption && (
        <p className="flowline-caption">
          <Inline text={caption} />
        </p>
      )}
    </div>
  )
}

/* -- 출처 링크 목록 -- */
function Sources({ title = "출처", items }) {
  return (
    <div className="srcs">
      <span className="srcs-label">{title}</span>
      <ul className="srcs-list">
        {items.map((it, i) => (
          <li key={i}>
            <a href={it.url} target="_blank" rel="noreferrer">
              {it.label}
            </a>
            {it.note && <span className="srcs-note">{it.note}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* -- 시스템 다이어그램 (박스-화살표 그림, PART 11 전용) -- */
function SysDiagram({ title, caption }) {
  const box = { fill: "#fff", stroke: "#111", strokeWidth: 1.2, rx: 5 }
  const t = { fontSize: 13, fontWeight: 600, fill: "#111", textAnchor: "middle" }
  const st = { fontSize: 10.5, fill: "#777", textAnchor: "middle" }
  const lbl = { fontSize: 10.5, fill: "#777" }
  return (
    <div className="sysdia">
      {title && <div className="sysdia-title">{title}</div>}
      <svg viewBox="0 0 880 620" role="img" aria-label={title}>
        <defs>
          <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#111" />
          </marker>
          <marker id="ahg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#999" />
          </marker>
        </defs>

        {/* 헤르메스 컨테이너 */}
        <rect x="240" y="40" width="400" height="440" rx="10" fill="#fafafa" stroke="#a3a3a3" strokeDasharray="6 5" strokeWidth="1.2" />
        <text x="440" y="68" style={{ fontSize: 12, fontWeight: 700, fill: "#777", textAnchor: "middle", letterSpacing: "0.04em" }}>
          퓨처크루 — 헤르메스 서버에서 24시간
        </text>

        {/* 입력 */}
        <g>
          <rect x="16" y="100" width="168" height="52" {...box} />
          <text x="100" y="122" style={t}>슬랙 하루치 대화</text>
          <text x="100" y="140" style={st}>채널 · DM</text>

          <rect x="16" y="170" width="168" height="52" {...box} />
          <text x="100" y="192" style={t}>회의 녹음</text>
          <text x="100" y="210" style={st}>자동으로 글이 됨</text>

          <rect x="16" y="240" width="168" height="52" {...box} />
          <text x="100" y="262" style={t}>사이트 데이터</text>
          <text x="100" y="280" style={st}>상품 · 딜 현황</text>

          <rect x="16" y="310" width="168" height="52" {...box} />
          <text x="100" y="332" style={t}>내 질문 · 지시</text>
          <text x="100" y="350" style={st}>슬랙에서</text>
        </g>

        {/* 입력 → 컨테이너 */}
        <line x1="184" y1="126" x2="238" y2="126" stroke="#111" strokeWidth="1.2" markerEnd="url(#ah)" />
        <line x1="184" y1="196" x2="238" y2="196" stroke="#111" strokeWidth="1.2" markerEnd="url(#ah)" />
        <line x1="184" y1="266" x2="238" y2="266" stroke="#111" strokeWidth="1.2" markerEnd="url(#ah)" />
        <line x1="184" y1="336" x2="238" y2="336" stroke="#111" strokeWidth="1.2" markerEnd="url(#ah)" />

        {/* 직원들 */}
        <g>
          <rect x="272" y="110" width="148" height="54" {...box} />
          <text x="346" y="133" style={t}>조사 담당들</text>
          <text x="346" y="151" style={st}>웹 검색으로 조사</text>

          <rect x="272" y="196" width="148" height="54" {...box} />
          <text x="346" y="219" style={t}>기록 담당들</text>
          <text x="346" y="237" style={st}>요점만 남게 정제</text>

          <rect x="272" y="282" width="148" height="54" fill="#fff" stroke="#a3a3a3" strokeDasharray="4 4" strokeWidth="1.1" rx="5" />
          <text x="346" y="305" style={{ ...t, fill: "#777" }}>+ 담당 추가</text>
          <text x="346" y="323" style={st}>지침 문서 한 장</text>
        </g>

        {/* 검증 (강조) */}
        <rect x="478" y="150" width="136" height="96" fill="#111" rx="6" />
        <text x="546" y="184" style={{ ...t, fill: "#fff" }}>검증 담당</text>
        <text x="546" y="204" style={{ ...st, fill: "rgba(255,255,255,0.75)" }}>사실 단위 재검색</text>
        <text x="546" y="220" style={{ ...st, fill: "rgba(255,255,255,0.75)" }}>근거 대조</text>

        {/* 담당 → 검증 */}
        <line x1="420" y1="137" x2="474" y2="176" stroke="#111" strokeWidth="1.2" markerEnd="url(#ah)" />
        <line x1="420" y1="223" x2="474" y2="212" stroke="#111" strokeWidth="1.2" markerEnd="url(#ah)" />

        {/* 검증 → 지적 되돌림 */}
        <path d="M 490 246 C 470 280, 450 285, 424 268" fill="none" stroke="#999" strokeWidth="1.1" strokeDasharray="4 4" markerEnd="url(#ahg)" />
        <text x="470" y="292" style={lbl}>지적 → 고쳐 쓰기</text>

        {/* 나 */}
        <rect x="704" y="164" width="160" height="66" {...box} />
        <text x="784" y="192" style={t}>나 — 슬랙</text>
        <text x="784" y="211" style={st}>검증된 최종본만 받음</text>

        {/* 검증 → 나 */}
        <line x1="614" y1="197" x2="700" y2="197" stroke="#111" strokeWidth="1.4" markerEnd="url(#ah)" />

        {/* 팀 기억 */}
        <rect x="446" y="530" width="200" height="66" {...box} />
        <text x="546" y="557" style={t}>팀 기억</text>
        <text x="546" y="576" style={st}>저녁마다 정리본 한 장으로 갱신</text>

        {/* 검증 → 기억 */}
        <line x1="546" y1="246" x2="546" y2="526" stroke="#111" strokeWidth="1.2" markerEnd="url(#ah)" />
        <text x="558" y="400" style={lbl}>통과한 것만</text>

        {/* 기억 → 직원들 (다음 날) */}
        <path d="M 442 566 C 300 566, 250 480, 320 344" fill="none" stroke="#999" strokeWidth="1.2" strokeDasharray="5 4" markerEnd="url(#ahg)" />
        <text x="212" y="530" style={lbl}>다음 날 아침, 자동 주입</text>
      </svg>
      {caption && (
        <p className="sysdia-caption">
          <Inline text={caption} />
        </p>
      )}
    </div>
  )
}

export function Block({
  block,
  sectionNo,
  subNo,
  refNo,
  funnelNo,
  profileNo,
  proposalNo,
}) {
  switch (block.type) {
    case "sub":
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
      );
    case "fip":
      return <FIP {...block} />;
    case "quote":
      return <Quote {...block} />;
    case "table":
      return <Table {...block} />;
    case "summary":
      return <Summary {...block} />;
    case "p":
      return (
        <p>
          <Inline text={block.text} />
        </p>
      );
    case "ref":
      return <Ref {...block} index={refNo} />;
    case "steps":
      return <Steps {...block} />;
    case "funnel":
      return <Funnel {...block} index={funnelNo} />;
    case "callout":
      return <Callout {...block} />;
    case "profile":
      return <Profile {...block} index={profileNo} />;
    case "proposal":
      return <Proposal {...block} index={proposalNo} />;
    case "persona":
      return <Persona {...block} />;
    case "sysdiagram":
      return <SysDiagram {...block} />;
    case "sources":
      return <Sources {...block} />;
    case "flow":
      return <Flow {...block} />;
    case "arch":
      return <Arch {...block} />;
    case "cycle":
      return <Cycle {...block} />;
    case "code":
      return <CodeBlock {...block} />;
    case "compare":
      return <Compare {...block} />;
    case "figures":
      return <Figures {...block} />;
    default:
      return null;
  }
}
