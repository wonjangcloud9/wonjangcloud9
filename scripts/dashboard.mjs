// 원장 실험실 현황판 — GitHub API로 실제 수치를 읽어 애니메이션 SVG를 그린다.
// 남의 서비스(github-readme-stats 등)가 죽어도 내 레포 안의 파일이라 항상 뜬다.
// 실행: GITHUB_TOKEN=... node scripts/dashboard.mjs

const USER = 'wonjangcloud9';
const TOKEN = process.env.GITHUB_TOKEN;
if (!TOKEN) throw new Error('GITHUB_TOKEN이 필요하다');

const gql = async (query) => {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
};

// ── 1. 연도별 커밋 (비공개 포함) ─────────────────────────────
const THIS_YEAR = new Date().getFullYear();
const years = [];
for (let y = 2019; y <= THIS_YEAR; y++) years.push(y);

const yearQuery = years
  .map(
    (y) => `y${y}: contributionsCollection(from:"${y}-01-01T00:00:00Z",to:"${
      y === THIS_YEAR ? new Date().toISOString() : `${y}-12-31T23:59:59Z`
    }"){ totalCommitContributions restrictedContributionsCount }`
  )
  .join('\n');

const { user } = await gql(`{ user(login:"${USER}"){ ${yearQuery} } }`);
const commitsByYear = {};
let restrictedTotal = 0;
for (const y of years) {
  const c = user[`y${y}`];
  restrictedTotal += c.restrictedContributionsCount;
  commitsByYear[y] = c.totalCommitContributions + c.restrictedContributionsCount;
}
const totalCommits = Object.values(commitsByYear).reduce((a, b) => a + b, 0);

// 안전장치 1: 비공개 기여가 안 보이는 토큰이면 커밋 수가 실제의 5분의 1로 잡힌다.
if (restrictedTotal === 0) {
  console.error('비공개 기여가 0 — read:user 스코프가 있는 LAB_TOKEN이 필요하다. 갱신을 건너뛴다.');
  process.exit(0);
}

// ── 2. 레포 전수 조사 ────────────────────────────────────────
const repos = [];
let cursor = null;
for (;;) {
  const page = await gql(`{ user(login:"${USER}"){ repositories(first:100, ownerAffiliations:OWNER, isFork:false${
    cursor ? `, after:"${cursor}"` : ''
  }){ pageInfo{hasNextPage endCursor} nodes{ name createdAt isPrivate primaryLanguage{name} } } } }`);
  const r = page.user.repositories;
  repos.push(...r.nodes);
  if (!r.pageInfo.hasNextPage) break;
  cursor = r.pageInfo.endCursor;
}

// 안전장치 2: 레포 361개 중 절반 이상이 비공개다. 비공개가 하나도 안 보이면
// repo 스코프가 없는 토큰이라 레포 수·언어·다시 만든 횟수가 전부 반토막 난다.
if (!repos.some((r) => r.isPrivate)) {
  console.error(`비공개 레포가 하나도 안 보인다(총 ${repos.length}개) — repo 스코프가 있는 LAB_TOKEN이 필요하다. 갱신을 건너뛴다.`);
  process.exit(0);
}

// ── 3. "같은 걸 몇 번 다시 만들었나" 집계 ────────────────────
const THEMES = [
  ['에이전트·LLM', /agent|gpt|langchain|crewAI|RAG|LLM|guardrail|harness|(?<!life-save-with-)claude|mcp/i, '#D97757'],
  ['중고차', /^car(?!rot)|encar|dealer-joes|woncha|norica|jungochagg|mycarpage|usedcar|usedCar|used-car/i, '#5B8FF9'],
  ['감량·운동', /diet|health|trainer|coach|exercise|updownfit|vibing/i, '#61DDAA'],
  ['덕질·일본어', /japan|custo|maid|miad|kstreet|silmoo/i, '#F6BD16'],
  ['포모도로', /pomodoro/i, '#9270CA'],
  ['틱톡 클론', /tictok|tiktok/i, '#78D3F8'],
];
const counted = THEMES.map(([label, re, color]) => {
  const hits = repos.filter((r) => re.test(r.name));
  return { label, color, n: hits.length, first: hits.map((h) => h.createdAt).sort()[0]?.slice(0, 4) };
}).sort((a, b) => b.n - a.n);

const maxN = Math.max(...counted.map((c) => c.n));
const publicRepos = repos.filter((r) => !r.isPrivate).length;

// 주력 언어 분포 (레포의 primaryLanguage 기준)
const LANG_COLOR = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Dart: '#00B4AB', Python: '#3572A5',
  'C++': '#f34b7d', Java: '#b07219', HTML: '#e34c26', CSS: '#563d7c', Kotlin: '#A97BFF',
  Rust: '#dea584', Swift: '#F05138', 'Jupyter Notebook': '#DA5B0B', Markdown: '#083fa1',
};
const langCount = {};
for (const r of repos) {
  const n = r.primaryLanguage?.name;
  if (n) langCount[n] = (langCount[n] || 0) + 1;
}
const langs = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 7);
const langTotal = langs.reduce((a, [, n]) => a + n, 0);

// ── 4. SVG 그리기 ────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fmt = (n) => n.toLocaleString('en-US');
const W = 860;
const H = 510;

const THEME = {
  light: { bg: '#ffffff', panel: '#f6f8fa', line: '#d0d7de', text: '#1f2328', dim: '#59636e', track: '#e6eaef' },
  dark: { bg: '#0d1117', panel: '#161b22', line: '#30363d', text: '#e6edf3', dim: '#8b949e', track: '#21262d' },
};

function svg(mode) {
  const t = THEME[mode];
  const bars = counted
    .map((c, i) => {
      const y = 272 + i * 34;
      const full = 430;
      const w = Math.max(6, Math.round((c.n / maxN) * full));
      return `
    <text x="40" y="${y + 13}" class="lbl">${esc(c.label)}</text>
    <rect x="168" y="${y}" width="${full}" height="18" rx="9" fill="${t.track}"/>
    <rect x="168" y="${y}" width="${w}" height="18" rx="9" fill="${c.color}" opacity="0.9">
      <animate attributeName="width" from="0" to="${w}" dur="1.1s" begin="${0.25 + i * 0.12}s" fill="freeze" calcMode="spline" keySplines="0.2 0.9 0.2 1" keyTimes="0;1" values="0;${w}"/>
    </rect>
    <text x="${168 + full + 14}" y="${y + 13}" class="num" fill="${c.color}">${c.n}</text>
    <text x="${168 + full + 58}" y="${y + 13}" class="sub">${c.first}~</text>`;
    })
    .join('');

  // 연도별 커밋 스파크라인
  const ys = years.filter((y) => commitsByYear[y] > 0);
  const maxC = Math.max(...ys.map((y) => commitsByYear[y]));
  const spark = ys
    .map((y, i) => {
      const bw = 30;
      const gap = 12;
      const x = 560 + i * (bw + gap);
      const h = Math.max(4, Math.round((commitsByYear[y] / maxC) * 86));
      const yy = 176 - h;
      const isNow = y === THIS_YEAR;
      return `
    <rect x="${x}" y="${yy}" width="${bw}" height="${h}" rx="4" fill="${isNow ? '#D97757' : t.line}" opacity="${isNow ? 1 : 0.75}">
      <animate attributeName="height" values="0;${h}" dur="0.8s" begin="${0.15 * i}s" fill="freeze"/>
      <animate attributeName="y" values="176;${yy}" dur="0.8s" begin="${0.15 * i}s" fill="freeze"/>
    </rect>
    <text x="${x + bw / 2}" y="192" class="tick" text-anchor="middle">'${String(y).slice(2)}</text>`;
    })
    .join('');

  // 언어 스택 바 + 범례
  let lx = 40;
  const LW = 470;
  const langBar = langs
    .map(([name, n], i) => {
      const w = Math.round((n / langTotal) * LW);
      const x = lx;
      lx += w + 2;
      const color = LANG_COLOR[name] || t.dim;
      const legendX = 40 + (i % 4) * 120;
      const legendY = 202 + Math.floor(i / 4) * 18;
      return `
    <rect x="${x}" y="${172}" width="${w}" height="14" rx="3" fill="${color}">
      <animate attributeName="width" values="0;${w}" dur="0.7s" begin="${0.1 * i}s" fill="freeze"/>
    </rect>
    <circle cx="${legendX + 4}" cy="${legendY - 4}" r="4" fill="${color}"/>
    <text x="${legendX + 14}" y="${legendY}" class="sub">${esc(name)} ${n}</text>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Malgun Gothic',Segoe UI,sans-serif">
  <style>
    .h1{font-size:19px;font-weight:700;fill:${t.text}}
    .live{font-size:10px;font-weight:700;fill:#3fb950;letter-spacing:1px}
    .big{font-size:34px;font-weight:800;fill:${t.text}}
    .cap{font-size:11px;fill:${t.dim};letter-spacing:.4px}
    .lbl{font-size:13px;font-weight:600;fill:${t.text}}
    .num{font-size:14px;font-weight:800}
    .sub{font-size:11px;fill:${t.dim}}
    .tick{font-size:10px;fill:${t.dim}}
    .sec{font-size:12px;font-weight:700;fill:${t.dim};letter-spacing:1.2px}
    .foot{font-size:11px;fill:${t.dim}}
    .pulse{animation:p 2s ease-in-out infinite}
    @keyframes p{0%,100%{opacity:1}50%{opacity:.25}}
  </style>
  <rect width="${W}" height="${H}" rx="14" fill="${t.bg}" stroke="${t.line}"/>

  <text x="40" y="46" class="h1">원장 실험실 · WONJANG LAB</text>
  <circle cx="${W - 108}" cy="41" r="4" fill="#3fb950" class="pulse"/>
  <text x="${W - 96}" y="45" class="live">LIVE · 매일 갱신</text>
  <line x1="40" y1="62" x2="${W - 40}" y2="62" stroke="${t.line}"/>

  <text x="40" y="108" class="big">${fmt(repos.length)}</text>
  <text x="40" y="128" class="cap">레포 (공개 ${publicRepos})</text>
  <text x="200" y="108" class="big">${fmt(totalCommits)}</text>
  <text x="200" y="128" class="cap">커밋 (비공개 포함)</text>
  <text x="380" y="108" class="big" fill="#D97757">${fmt(commitsByYear[THIS_YEAR] || 0)}</text>
  <text x="380" y="128" class="cap">올해 커밋</text>

  <text x="40" y="162" class="sec">주력 언어 (레포 ${langTotal}개 기준)</text>
  ${langBar}

  <text x="560" y="108" class="sec">연도별 커밋</text>
  ${spark}

  <line x1="40" y1="252" x2="${W - 40}" y2="252" stroke="${t.line}"/>
  <text x="40" y="268" class="sec">같은 걸 몇 번 다시 만들었나</text>
  ${bars}

  <text x="40" y="${H - 22}" class="foot">마지막 갱신 ${new Date().toISOString().slice(0, 10)} · 지금 만드는 것: vibing (칼로리 적자 감량 PWA)</text>
</svg>
`;
}

const { writeFileSync } = await import('node:fs');
writeFileSync('assets/dashboard-light.svg', svg('light'));
writeFileSync('assets/dashboard-dark.svg', svg('dark'));
console.log(`레포 ${repos.length} (공개 ${publicRepos}) · 커밋 ${totalCommits} · 올해 ${commitsByYear[THIS_YEAR]}`);
console.log(counted.map((c) => `${c.label} ${c.n}`).join(' / '));
