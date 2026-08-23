# 박기성 인턴 사전 과제 — 제출 사이트

## 실행
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ 생성 (정적 배포용)
```

## 구조
```
src/
  data/
    parts.js      # PART 목록(번호·제목·그룹) + 각 파트 파일 연결
    part1.js      # PART 1 내용  ← 파트별로 파일 하나씩 (part2.js, part3.js … 추가)
  components/
    Sidebar.jsx   # 좌측 목차
    Content.jsx   # 우측 본문 (섹션 번호 자동)
    Blocks.jsx    # 블록 렌더러 (fip / table / summary / ref / steps / quote / p)
    Inline.jsx    # **굵게**, `코드` 인라인 처리
  styles.css
```

## 새 파트 추가하기
1. `src/data/part2.js` 생성 — `part1.js`를 복사해서 내용만 바꾸면 됨
2. `src/data/parts.js`에서 `import part2 from './part2.js'` 후 해당 항목에 `content: part2` 추가

## 블록 타입
| type | 용도 | 필드 |
|---|---|---|
| `sub` | 소제목 묶음 (1-1, 1-2 …) | `title`, `children[]` |
| `fip` | Fact → Insight → Proposal | `fact[]`, `insight` (문자열 또는 배열), `proposal[]`, `note?`, `quote?` |
| `table` | 표 | `columns[]`, `rows[][]` |
| `summary` | 라벨 + 한 줄 요약 박스 | `items[{label,text}]` |
| `ref` | 레퍼런스 카드 | `name`, `tagline`, `what`, `why`, `how` |
| `steps` | 단계 목록 | `items[{title,text}]` |
| `quote` | 인용 | `text`, `source` |
| `p` | 문단 | `text` |
