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
    }"){ totalCommitContributions restrictedContributionsCount contributionCalendar{ weeks{ contributionDays{ date contributionCount } } } }`
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

// 연속 기록 — 달력을 하루 단위로 펴서 현재/최장 연속을 센다.
const dayMap = new Map();
for (const y of years) {
  for (const w of user[`y${y}`].contributionCalendar.weeks) {
    // 달력은 주 단위로 오므로 연 경계의 날짜가 범위 밖이면 0으로 온다.
    // 덮어쓰면 연말연시 스트릭이 끊기니 큰 값을 남긴다.
    for (const d of w.contributionDays) {
      dayMap.set(d.date, Math.max(dayMap.get(d.date) ?? 0, d.contributionCount));
    }
  }
}
const days = [...dayMap.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1));

let longestStreak = 0;
let run = 0;
for (const [, n] of days) {
  run = n > 0 ? run + 1 : 0;
  if (run > longestStreak) longestStreak = run;
}

// 현재 연속: 오늘부터 거슬러 센다. 오늘이 아직 0이면 어제부터 시작.
let currentStreak = 0;
for (let i = days.length - 1; i >= 0; i--) {
  const n = days[i][1];
  if (n > 0) currentStreak++;
  else if (i === days.length - 1) continue; // 오늘은 아직 안 끝났다
  else break;
}

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

// ── 3. 주제별 레포 수 — 오래 파고든 순서 ─────────────────────
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
// 수직 리듬을 상수로 못박아 둔다. 눈대중으로 고치지 말 것.
const W = 880;
const PAD = 48;          // 좌우 여백
const INNER = W - PAD * 2;

const TITLE_Y = 52;
const RULE1_Y = 76;

const STAT_NUM_Y = 134;  // 큰 숫자 베이스라인
const STAT_CAP_Y = 157;  // 그 아래 설명
const STAT_X = [PAD, PAD + 134, PAD + 268, PAD + 402];

const SPARK_X = 596;
const SPARK_LABEL_Y = 104;
const SPARK_BASE_Y = 182;
const SPARK_MAX_H = 66;
const SPARK_TICK_Y = 199;

const RULE2_Y = 224;
const LANG_LABEL_Y = 252;
const LANG_BAR_Y = 266;
const LANG_BAR_H = 14;
const LANG_LEG_Y = 306;

const RULE3_Y = 334;
const THEME_LABEL_Y = 362;
const THEME_BAR_Y0 = 384;
const THEME_STEP = 36;
const THEME_BAR_H = 18;
const THEME_LABEL_X = PAD;
const THEME_TRACK_X = PAD + 132;
const THEME_TRACK_W = 420;
const THEME_NUM_X = THEME_TRACK_X + THEME_TRACK_W + 34; // 오른쪽 정렬 기준
const THEME_YEAR_X = THEME_NUM_X + 22;

const FOOT_Y = THEME_BAR_Y0 + THEME_STEP * counted.length + 30;
const H = FOOT_Y + 26;

const THEME_COLORS = {
  light: { bg: '#ffffff', line: '#d8dee4', text: '#1f2328', dim: '#656d76', track: '#eaeef2' },
  dark: { bg: '#0d1117', line: '#2a3038', text: '#e6edf3', dim: '#8b949e', track: '#21262d' },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fmt = (n) => n.toLocaleString('en-US');

function svg(mode) {
  const t = THEME_COLORS[mode];

  // 주제별 막대
  const bars = counted
    .map((c, i) => {
      const y = THEME_BAR_Y0 + i * THEME_STEP;
      const w = Math.max(8, Math.round((c.n / maxN) * THEME_TRACK_W));
      const mid = y + THEME_BAR_H / 2 + 4.5; // 시각적 중앙 정렬
      return `
    <text x="${THEME_LABEL_X}" y="${mid}" class="rowlbl">${esc(c.label)}</text>
    <rect x="${THEME_TRACK_X}" y="${y}" width="${THEME_TRACK_W}" height="${THEME_BAR_H}" rx="${THEME_BAR_H / 2}" fill="${t.track}"/>
    <rect x="${THEME_TRACK_X}" y="${y}" width="${w}" height="${THEME_BAR_H}" rx="${THEME_BAR_H / 2}" fill="${c.color}">
      <animate attributeName="width" values="0;${w}" dur="1s" begin="${0.3 + i * 0.1}s" fill="freeze"/>
    </rect>
    <text x="${THEME_NUM_X}" y="${mid}" class="rownum" text-anchor="end" fill="${c.color}">${c.n}</text>
    <text x="${THEME_YEAR_X}" y="${mid}" class="rowsub">${c.first}년부터</text>`;
    })
    .join('');

  // 연도별 커밋 스파크라인
  const ys = years.filter((y) => commitsByYear[y] > 0);
  const maxC = Math.max(...ys.map((y) => commitsByYear[y]));
  const slot = Math.floor((W - PAD - SPARK_X) / ys.length);
  const bw = slot - 10;
  const spark = ys
    .map((y, i) => {
      const x = SPARK_X + i * slot;
      const h = Math.max(4, Math.round((commitsByYear[y] / maxC) * SPARK_MAX_H));
      const yy = SPARK_BASE_Y - h;
      const now = y === THIS_YEAR;
      return `
    <rect x="${x}" y="${yy}" width="${bw}" height="${h}" rx="3" fill="${now ? '#D97757' : t.line}">
      <animate attributeName="height" values="0;${h}" dur="0.7s" begin="${0.12 * i}s" fill="freeze"/>
      <animate attributeName="y" values="${SPARK_BASE_Y};${yy}" dur="0.7s" begin="${0.12 * i}s" fill="freeze"/>
    </rect>
    <text x="${x + bw / 2}" y="${SPARK_TICK_Y}" class="tick" text-anchor="middle">'${String(y).slice(2)}</text>`;
    })
    .join('');

  // 언어 스택 바 + 범례 (범례는 글자 폭에 맞춰 한 줄로 흘린다)
  let bx = PAD;
  const langBar = langs
    .map(([name, n], i) => {
      const w = Math.round((n / langTotal) * INNER) - 2;
      const x = bx;
      bx += w + 2;
      return `
    <rect x="${x}" y="${LANG_BAR_Y}" width="${w}" height="${LANG_BAR_H}" rx="3" fill="${LANG_COLOR[name] || t.dim}">
      <animate attributeName="width" values="0;${w}" dur="0.6s" begin="${0.08 * i}s" fill="freeze"/>
    </rect>`;
    })
    .join('');

  let lx = PAD;
  const langLegend = langs
    .map(([name, n]) => {
      const label = `${name} ${n}`;
      const x = lx;
      lx += 16 + label.length * 6.3 + 18; // 점 + 글자 + 항목 간격
      return `
    <circle cx="${x + 4}" cy="${LANG_LEG_Y - 4}" r="4" fill="${LANG_COLOR[name] || t.dim}"/>
    <text x="${x + 15}" y="${LANG_LEG_Y}" class="legend">${esc(label)}</text>`;
    })
    .join('');

  const rule = (y) => `<line x1="${PAD}" y1="${y}" x2="${W - PAD}" y2="${y}" stroke="${t.line}"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Pretendard','Malgun Gothic','Segoe UI',sans-serif">
  <style>
    text{font-feature-settings:'tnum' 1}
    .h1{font-size:20px;font-weight:700;fill:${t.text};letter-spacing:-.2px}
    .live{font-size:11px;font-weight:600;fill:${t.dim};letter-spacing:.3px}
    .big{font-size:34px;font-weight:800;fill:${t.text};letter-spacing:-1px}
    .cap{font-size:12px;fill:${t.dim}}
    .sec{font-size:11px;font-weight:700;fill:${t.dim};letter-spacing:1.4px}
    .rowlbl{font-size:13.5px;font-weight:600;fill:${t.text}}
    .rownum{font-size:15px;font-weight:800}
    .rowsub{font-size:11.5px;fill:${t.dim}}
    .legend{font-size:11.5px;fill:${t.dim}}
    .tick{font-size:10.5px;fill:${t.dim}}
    .foot{font-size:11.5px;fill:${t.dim}}
  </style>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="16" fill="${t.bg}" stroke="${t.line}"/>

  <text x="${PAD}" y="${TITLE_Y}" class="h1">원장 실험실 · WONJANG LAB</text>
  <text x="${W - PAD}" y="${TITLE_Y - 2}" class="live" text-anchor="end">${new Date().toISOString().slice(0, 10)} 기준</text>
  ${rule(RULE1_Y)}

  <text x="${STAT_X[0]}" y="${STAT_NUM_Y}" class="big">${fmt(repos.length)}</text>
  <text x="${STAT_X[0]}" y="${STAT_CAP_Y}" class="cap">레포 · 공개 ${publicRepos}</text>
  <text x="${STAT_X[1]}" y="${STAT_NUM_Y}" class="big">${fmt(totalCommits)}</text>
  <text x="${STAT_X[1]}" y="${STAT_CAP_Y}" class="cap">커밋 · 비공개 포함</text>
  <text x="${STAT_X[2]}" y="${STAT_NUM_Y}" class="big" fill="#D97757">${fmt(commitsByYear[THIS_YEAR] || 0)}</text>
  <text x="${STAT_X[2]}" y="${STAT_CAP_Y}" class="cap">올해 커밋</text>
  <text x="${STAT_X[3]}" y="${STAT_NUM_Y}" class="big" fill="#3fb950">${currentStreak}</text>
  <text x="${STAT_X[3]}" y="${STAT_CAP_Y}" class="cap">연속 기록 · 일</text>

  <text x="${SPARK_X}" y="${SPARK_LABEL_Y}" class="sec">연도별 커밋</text>
  ${spark}

  ${rule(RULE2_Y)}
  <text x="${PAD}" y="${LANG_LABEL_Y}" class="sec">주력 언어 · 레포 ${langTotal}개 기준</text>
  ${langBar}
  ${langLegend}

  ${rule(RULE3_Y)}
  <text x="${PAD}" y="${THEME_LABEL_Y}" class="sec">오래 파고든 주제</text>
  ${bars}

  <text x="${PAD}" y="${FOOT_Y}" class="foot">최장 연속 ${longestStreak}일  ·  지금 만드는 것 — vibing, 칼로리 적자 감량 PWA</text>
</svg>
`;
}

// ── 5. 파일로 쓰기 ──────────────────────────────────────────
// 파일명에 날짜를 박는다. GitHub raw는 ?v= 쿼리를 무시하고 옛 이미지를
// 계속 내주기 때문에, URL 자체가 매일 바뀌어야 갱신이 보인다.
// 그래서 SVG를 쓴 뒤 README의 <img src>도 같이 고친다.
const { writeFileSync, readFileSync, readdirSync, unlinkSync } = await import('node:fs');

// 날짜가 아니라 *내용 해시*를 쓴다. 같은 날 두 번 고치면 날짜는 그대로라
// 캐시가 또 옛 이미지를 내주기 때문이다. 내용이 같으면 파일명도 같아서
// 쓸데없는 커밋이 생기지 않는 장점도 있다.
const { createHash } = await import('node:crypto');
const light = svg('light');
const dark = svg('dark');
const hash = createHash('sha1').update(light).digest('hex').slice(0, 10);
const names = { light: `dashboard-light-${hash}.svg`, dark: `dashboard-dark-${hash}.svg` };

writeFileSync(`assets/${names.light}`, light);
writeFileSync(`assets/${names.dark}`, dark);

// 지난 날짜의 현황판은 지운다 (레포가 SVG 무덤이 되지 않도록)
for (const f of readdirSync('assets')) {
  if (/^dashboard-.*\.svg$/.test(f) && f !== names.light && f !== names.dark) unlinkSync(`assets/${f}`);
}

// 연대기 표의 연도별 레포/커밋 수도 여기서 고친다. README에 손으로 박아두면
// 레포를 지우거나 커밋이 쌓일 때마다 조용히 틀려진다.
const reposByYear = {};
for (const r of repos) {
  const y = r.createdAt.slice(0, 4);
  reposByYear[y] = (reposByYear[y] || 0) + 1;
}
const n = (x) => (x || 0).toLocaleString('en-US');

// 2020–21은 레포 수가 아니라 커밋만 보여준다(깃허브를 안 쓰던 시기라서).
const early = (commitsByYear[2020] || 0) + (commitsByYear[2021] || 0);

const cells = {
  'README.md': [
    [/(<b>2019<\/b><br><sub>레포 )\d+(<\/sub>)/, `$1${n(reposByYear[2019])}$2`],
    [/(<b>2020–21<\/b><br><sub>커밋 )[\d,]+(<\/sub>)/, `$1${n(early)}$2`],
    ...[2022, 2023, 2024, 2025, 2026].map((y) => [
      new RegExp(`(<b>${y}</b><br><sub>레포 )\\d+(</sub><br><sub>커밋 )[\\d,+]+(</sub>)`),
      `$1${n(reposByYear[y])}$2${n(commitsByYear[y])}$3`,
    ]),
  ],
  'README.en.md': [
    [/(<b>2019<\/b><br><sub>)\d+( repos<\/sub>)/, `$1${n(reposByYear[2019])}$2`],
    [/(<b>2020–21<\/b><br><sub>)[\d,]+( commits<\/sub>)/, `$1${n(early)}$2`],
    ...[2022, 2023, 2024, 2025, 2026].map((y) => [
      new RegExp(`(<b>${y}</b><br><sub>)\\d+( repos</sub><br><sub>)[\\d,+]+( commits</sub>)`),
      `$1${n(reposByYear[y])}$2${n(commitsByYear[y])}$3`,
    ]),
  ],
};

for (const readme of ['README.md', 'README.en.md']) {
  const before = readFileSync(readme, 'utf8');
  let after = before
    .replace(/\.\/assets\/dashboard-light[^"]*/g, `./assets/${names.light}`)
    .replace(/\.\/assets\/dashboard-dark[^"]*/g, `./assets/${names.dark}`);
  for (const [re, rep] of cells[readme]) {
    if (!re.test(after)) console.error(`경고: ${readme}에서 ${re} 를 못 찾았다`);
    after = after.replace(re, rep);
  }
  if (after !== before) writeFileSync(readme, after);
}

console.log(`레포 ${repos.length} (공개 ${publicRepos}) · 커밋 ${totalCommits} · 올해 ${commitsByYear[THIS_YEAR]}`);
console.log(counted.map((c) => `${c.label} ${c.n}`).join(' / '));
console.log(`연속 기록 현재 ${currentStreak}일 · 최장 ${longestStreak}일`);
console.log(`→ assets/${names.light}, assets/${names.dark}`);
