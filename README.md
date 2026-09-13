<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Noto%20Sans%20KR&weight=700&size=26&duration=2600&pause=700&color=D97757&center=true&vCenter=true&width=700&height=70&lines=%EC%A4%91%EA%B3%A0%EC%B0%A8%20%EC%95%B1%EC%9D%84%2024%EB%B2%88%20%EB%A7%8C%EB%93%A4%EC%97%88%EC%8A%B5%EB%8B%88%EB%8B%A4%3B24%EB%B2%88%20%EB%8B%A4%20%EC%9E%98%20%EC%95%88%20%EB%90%90%EC%8A%B5%EB%8B%88%EB%8B%A4%3B%EA%B7%B8%EB%9E%98%EC%84%9C%20%EB%8F%84%EA%B5%AC%EB%A5%BC%20%EB%A7%8C%EB%93%A4%EA%B8%B0%20%EC%8B%9C%EC%9E%91%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4%3B%EC%A7%80%EA%B8%88%EC%9D%80%2025%EB%B2%88%EC%A7%B8%EB%A5%BC%20%EC%A4%80%EB%B9%84%20%EC%A4%91%EC%9E%85%EB%8B%88%EB%8B%A4" alt="중고차 앱을 24번 만들었습니다 / 24번 다 잘 안 됐습니다 / 그래서 도구를 만들기 시작했습니다 / 지금은 25번째를 준비 중입니다" />

**안녕하세요, 원장입니다.** 서울에서 만듭니다 · [GS Neotek](https://www.gsneotek.co.kr)

한국어 · [English](README.en.md)

</div>

<br>

<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/dashboard-dark-20260913.svg">
  <img src="./assets/dashboard-light-20260913.svg" alt="원장 실험실 현황판 — 레포·커밋·언어·다시 만든 횟수" width="100%">
</picture>
</div>

> 위 현황판은 **매일 새벽 3시 30분에 스스로 다시 그려집니다.**
> 남의 서비스에 얹지 않고 [직접 그리는 스크립트](scripts/dashboard.mjs)를 GitHub Actions로 돌립니다 — 그래야 안 죽으니까요.

<br>

<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wonjangcloud9/wonjangcloud9/output/snake-dark.svg">
  <img src="https://raw.githubusercontent.com/wonjangcloud9/wonjangcloud9/output/snake-light.svg" alt="잔디를 먹어치우는 뱀">
</picture>
<br>
<sub>뱀이 제 잔디를 먹고 있습니다 🐍</sub>
</div>

---

## 🔨 지금 손에 잡고 있는 것

<table>
<tr>
<td width="50%" valign="top">

### 🐢 vibing
**살 빼는 앱.** 먹은 것·체중·움직임을 적으면 **오늘의 칼로리 적자**가 숫자 하나로 보입니다.

Mifflin-St Jeor로 예산을 잡고, 21일치 기록으로 실제 소모량을 역산하고, 거북이 코치 "비비"가 잔소리를 합니다.

`Next.js` `Supabase` `PWA` · 비공개 · **매일 고치는 중**

</td>
<td width="50%" valign="top">

### 🦀 [wonjangAgent](https://github.com/wonjangcloud9/wonjangAgent)
**한국어 우선** 자율 AI 에이전트. Rust 단일 바이너리라 런타임 없이 바로 돕니다.

제공자 무관 LLM · 로컬 파일/셸 도구 · 한 달치 습관을 카톡용 카드 한 장으로 뽑는 `wonjang 자랑`

[![dl](https://img.shields.io/npm/dm/wonjang-agent?style=flat-square&label=월%20다운로드&color=dea584)](https://www.npmjs.com/package/wonjang-agent)

</td>
</tr>
<tr>
<td valign="top">

### 🌳 [claude-tree](https://github.com/wonjangcloud9/claude-tree)
Claude Code 세션을 **git worktree로 격리해 여러 개 동시에** 굴리는 CLI. 한 번에 한 디렉터리라는 제약을 없앱니다.

한국어·영어·일본어·중국어 문서

[![dl](https://img.shields.io/npm/dm/@claudetree/cli?style=flat-square&label=월%20다운로드&color=CB3837)](https://www.npmjs.com/package/@claudetree/cli)

</td>
<td valign="top">

### 🛡️ [open-guardrail](https://github.com/wonjangcloud9/open-guardrail)
LLM 앱용 가드레일 엔진. 프롬프트 인젝션·PII(26개 지역)·GDPR·EU AI Act를 **API 호출 0번, 0.1ms 안에**.

3줄이면 붙습니다. npm + PyPI 양쪽 배포.

[![npm](https://img.shields.io/npm/v/open-guardrail?style=flat-square&label=npm&color=CB3837)](https://www.npmjs.com/package/open-guardrail) [![pypi](https://img.shields.io/pypi/v/open-guardrail?style=flat-square&label=PyPI&color=3775A9)](https://pypi.org/project/open-guardrail/)

</td>
</tr>
<tr>
<td colspan="2" valign="top">

### 📏 [harness-eval](https://github.com/wonjangcloud9/harness-eval)
**"하네스 엔지니어링"** 품질에 점수를 매기고, 아무 레포에서나 벤치마크 과제를 뽑아내는 CLI.
*같은 모델이어도 하네스가 좋으면 결과가 확 달라진다* — 그걸 숫자로 확인하려고 만들었습니다.

[![pypi](https://img.shields.io/pypi/v/harness-eval?style=flat-square&label=PyPI&color=3775A9)](https://pypi.org/project/harness-eval/)

</td>
</tr>
</table>

---

## 📖 7년치 삽질 연대기

<table>
<tr><td width="80" align="center"><b>2019</b><br><sub>레포 3</sub></td><td>
🐣 <b>첫 커밋.</b> 웹이 뭔지 몰라서 <b>클론 코딩</b>부터. 코코아톡, 넷플릭스를 그대로 따라 그렸습니다.
</td></tr>
<tr><td align="center"><b>2022</b><br><sub>레포 94</sub><br><sub>커밋 1,184</sub></td><td>
📚 <b>문법을 손에 붙이던 해.</b> React · Next.js · Django. 당근마켓, 에어비앤비, 트위터를 클론하며 한 달에 8개씩 레포를 열었습니다. 레포 이름 뒤에 🔥🚀🇰🇷를 붙이던 시절.
</td></tr>
<tr><td align="center"><b>2023</b><br><sub>레포 127</sub><br><sub>커밋 1,955</sub></td><td>
📱 <b>앱으로 넓힌 해 — 역대 최다 레포.</b> Flutter · React Native · Jetpack Compose를 <i>동시에</i> 붙잡았습니다. 그리고 처음으로 <i>쓸 사람이 있는 것</i>을 시도했습니다: 화장실 찾기, 교육 LMS, 민원 처리, AI 컴패니언. <b>거의 다 런칭 전에 멈췄습니다.</b>
</td></tr>
<tr><td align="center"><b>2024</b><br><sub>레포 48</sub><br><sub>커밋 1,355</sub></td><td>
🚗 <b>도메인으로 좁힌 해.</b> 만들고 싶은 게 <b>중고차</b> 하나로 모였습니다 — 엔카 크롤러, 차량 손상 판별 FastAPI(385MB짜리 레포), mycarpageGPT. 동시에 LangChain · RAG · CrewAI로 LLM을 처음 제품에 붙여봤습니다.
</td></tr>
<tr><td align="center"><b>2025</b><br><sub>레포 45</sub><br><sub>커밋 907</sub></td><td>
🔁 <b>다시 만들며 배운 해.</b> 중고차를 네 번 더 갈아엎고(wonjang-usedcar → woncha → norica → dealer-joes), 건강·운동 앱을 다섯 개 만들었습니다. 후반부터 남이 만든 에이전트를 쓰는 대신 <b>직접 짜기 시작</b>했습니다.
</td></tr>
<tr><td align="center"><b>2026</b><br><sub>레포 35</sub><br><sub>커밋 2,183</sub><br><sub><i>아직 9월</i></sub></td><td>
🛠️ <b>도구를 만드는 쪽으로.</b> 도구를 <i>쓰는</i> 사람에서 <b>만드는</b> 사람으로 옮겼습니다. AI 코딩 에이전트를 위한 CLI·평가·가드레일을 npm과 PyPI에 올렸고, 감량 앱 vibing을 매일 고칩니다. <b>역대 가장 많이 커밋한 해인데 아직 안 끝났습니다.</b>
</td></tr>
</table>

---

## 🪦 레포 무덤

<details>
<summary><b>끝까지 못 간 것들 — 펼쳐서 비웃어 주세요</b></summary>

<br>

| 무엇 | 시도 | 사인(死因) |
|---|---|---|
| 🚗 **중고차** | 24번 | 2022년부터 계속. 손상 판별 API, 크롤러, GPT 검색, MVP 네 번. **매번 "이번엔 다르다"고 생각했습니다** |
| 🚽 **화장실 찾기** | 3번 | 웹·앱·Flutter로 각각 한 번씩. 셋 다 지도 API 앞에서 멈췄습니다 |
| ⏱️ **포모도로** | 6번 | 새 프레임워크를 배울 때마다 포모도로를 만드는 병이 있습니다 |
| 🎵 **틱톡 클론** | 4번 | 대신 Flutter 애니메이션은 확실히 배웠습니다 |
| 😴 **수면 앱** | 3번 | [잠만보](https://life-save-with-claude-code-multi-se.vercel.app)만 겨우 살아남았습니다 |
| 🎤 **보컬 트레이너** | 1번 | 레포만 만들고 커밋 **0개**. 가장 정직한 실패 |
| 👻 **이름만 지은 것들** | **34개** | 커밋이 단 하나도 없는 빈 레포. `myApp Dream`, `your_vocal_trainer`, `real-final-usedCar-search`… |

<b>배운 것:</b> 아이디어가 없어서 망한 적은 한 번도 없습니다. 전부 <i>범위를 못 줄여서</i> 망했습니다.
그래서 요즘 만드는 건 화면이 다섯 개를 안 넘습니다.

</details>

<details>
<summary><b>🎮 딴짓 모음 — 이건 그래도 돌아갑니다</b></summary>

<br>

- 🎌 **[custo](https://wonjangcloud9.github.io/custo/)** — 아이돌(큐티스트리트) 덕질하면서 일본어 배우는 사이트. 히라가나부터 팬레터 실전 표현까지
- 🎬 **[자막 줄잘러](https://github.com/wonjangcloud9/ko-video-subtitle-sync)** — 자동 자막 + 대본을 합쳐 **음성인식 없이** 자막을 고칩니다. *대본 = 정답, 자막 = 타이밍*
- 🎮 **[mobily](https://github.com/wonjangcloud9/mobily)** — 로그인 없는 모바일 RPG 데일리 체크리스트. 서버도 없고 localStorage만 씁니다
- 🛏️ **[잠만보](https://life-save-with-claude-code-multi-se.vercel.app)** — XP·레벨업·연속 스트릭 붙인 수면 트래커 PWA
- 🧱 **[flutter_riverpod_architecture_example](https://github.com/wonjangcloud9/flutter_riverpod_architecture_example)** — Flutter + Riverpod 클린 아키텍처 예제
- 📷 **[react-native-compact-camera](https://github.com/wonjangcloud9/react-native-compact-camera)** — 가볍게 쓰는 RN 카메라 컴포넌트

</details>

---

## 🎬 요즘 노는 것

<div align="center">

<img src="./assets/storm.webp" width="420" alt="Higgsfield로 만든 영상 — 다들 인사하는 컷">

<sub>코드 안 쓸 땐 <b>Higgsfield</b>로 이런 걸 만듭니다.</sub>

<sub>중고차 25번째를 준비하는 사람의 자기 위로 🫡</sub>

</div>

## 🧰 쓰는 것

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)
![Flutter](https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3FCF8E)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Claude](https://img.shields.io/badge/Claude_Code-D97757?style=for-the-badge&logo=anthropic&logoColor=white)

<br>

<img src="https://streak-stats.demolab.com?user=wonjangcloud9&theme=transparent&hide_border=true&date_format=Y.n.j&locale=ko&border_radius=10&ring=D97757&fire=D97757&currStreakLabel=D97757" alt="연속 기록" />

</div>

---

<div align="center">

<sub>레포 361개 중 <b>189개가 비공개</b>입니다 — 위 숫자는 비공개 커밋을 포함합니다.</sub>

<sub><b>끝까지 간 것만 공개로 올립니다.</b> 그래서 공개 레포가 172개뿐입니다.</sub>

<br>

<sub><i>"아이디어가 없어서 망한 적은 없다. 전부 범위를 못 줄여서 망했다."</i></sub>

</div>
