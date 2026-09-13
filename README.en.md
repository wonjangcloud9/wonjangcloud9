<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=26&duration=2600&pause=700&color=D97757&center=true&vCenter=true&width=700&height=70&lines=I+built+a+used-car+app+24+times.;All+24+failed.;So+I+started+building+tools+instead.;Now+I'm+prepping+attempt+%2325." alt="I built a used-car app 24 times / All 24 failed / So I started building tools instead / Now I'm prepping attempt #25" />

**Hi, I'm wonjang.** Building things in Seoul · [GS Neotek](https://www.gsneotek.co.kr)

[한국어](README.md) · English

</div>

<br>

<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/dashboard-dark.svg?v=2">
  <img src="./assets/dashboard-light.svg?v=2" alt="Wonjang Lab dashboard — repos, commits, languages, rebuild counts" width="100%">
</picture>
</div>

> The dashboard above **redraws itself every night.**
> No third-party stats service — [a script I wrote](scripts/dashboard.mjs) runs on GitHub Actions, so it never goes down.

<br>

<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wonjangcloud9/wonjangcloud9/output/snake-dark.svg">
  <img src="https://raw.githubusercontent.com/wonjangcloud9/wonjangcloud9/output/snake-light.svg" alt="A snake eating my contribution graph">
</picture>
<br>
<sub>A snake is eating my contribution graph 🐍</sub>
</div>

---

## 🔨 What I'm building now

<table>
<tr>
<td width="50%" valign="top">

### 🐢 vibing
**A weight-loss app.** Log what you ate, your weight, and how much you moved — see today's **calorie deficit** as a single number.

Mifflin-St Jeor for the budget, 21 days of logs to back out your real TDEE, and a turtle coach named Bibi who nags you.

`Next.js` `Supabase` `PWA` · private · **shipped to daily**

</td>
<td width="50%" valign="top">

### 🦀 [wonjangAgent](https://github.com/wonjangcloud9/wonjangAgent)
A **Korean-first** autonomous AI agent. Single Rust binary — no runtime to install.

Provider-agnostic LLM · local file/shell tools · a one-card monthly summary that survives KakaoTalk code blocks

[![dl](https://img.shields.io/npm/dm/wonjang-agent?style=flat-square&label=downloads/mo&color=dea584)](https://www.npmjs.com/package/wonjang-agent)

</td>
</tr>
<tr>
<td valign="top">

### 🌳 [claude-tree](https://github.com/wonjangcloud9/claude-tree)
A CLI that runs **multiple Claude Code sessions in parallel**, each isolated in its own git worktree.

Docs in Korean, English, Japanese, Chinese.

[![dl](https://img.shields.io/npm/dm/@claudetree/cli?style=flat-square&label=downloads/mo&color=CB3837)](https://www.npmjs.com/package/@claudetree/cli)

</td>
<td valign="top">

### 🛡️ [open-guardrail](https://github.com/wonjangcloud9/open-guardrail)
A guardrail engine for LLM apps. Prompt injection, PII (26 regions), GDPR, EU AI Act — **zero API calls, under 0.1ms**.

Three lines to wire in. Shipped to npm and PyPI.

[![npm](https://img.shields.io/npm/v/open-guardrail?style=flat-square&label=npm&color=CB3837)](https://www.npmjs.com/package/open-guardrail) [![pypi](https://img.shields.io/pypi/v/open-guardrail?style=flat-square&label=PyPI&color=3775A9)](https://pypi.org/project/open-guardrail/)

</td>
</tr>
<tr>
<td colspan="2" valign="top">

### 📏 [harness-eval](https://github.com/wonjangcloud9/harness-eval)
A CLI that scores **harness engineering** quality and generates benchmark tasks from any repo.
*Same model, better harness, dramatically better results* — I built this to put a number on that.

[![pypi](https://img.shields.io/pypi/v/harness-eval?style=flat-square&label=PyPI&color=3775A9)](https://pypi.org/project/harness-eval/)

</td>
</tr>
</table>

---

## 📖 Seven years of failing forward

<table>
<tr><td width="80" align="center"><b>2019</b><br><sub>3 repos</sub></td><td>
🐣 <b>First commit.</b> I had no idea what the web was, so I started by <b>cloning</b> — KakaoTalk, Netflix, pixel by pixel.
</td></tr>
<tr><td align="center"><b>2022</b><br><sub>94 repos<br>1,184 commits</sub></td><td>
📚 <b>The year syntax became muscle memory.</b> React · Next.js · Django. Cloned Karrot Market, Airbnb, Twitter — opening eight repos a month. I was still putting 🔥🚀🇰🇷 in repo descriptions.
</td></tr>
<tr><td align="center"><b>2023</b><br><sub>127 repos<br>1,955 commits</sub></td><td>
📱 <b>The year I went mobile — my busiest ever.</b> Flutter, React Native, and Jetpack Compose <i>at the same time</i>. Also my first attempts at things <i>someone might actually use</i>: a toilet finder, an education LMS, a complaint tracker, an AI companion. <b>Almost all died before launch.</b>
</td></tr>
<tr><td align="center"><b>2024</b><br><sub>48 repos<br>1,355 commits</sub></td><td>
🚗 <b>The year I picked a domain.</b> Everything converged on <b>used cars</b> — an Encar crawler, a damage-detection FastAPI (a 385MB repo), mycarpageGPT. Meanwhile LangChain, RAG and CrewAI put an LLM in a product for the first time.
</td></tr>
<tr><td align="center"><b>2025</b><br><sub>45 repos<br>907 commits</sub></td><td>
🔁 <b>The year of rebuilding.</b> Four more used-car rewrites (wonjang-usedcar → woncha → norica → dealer-joes) and five health/fitness apps. Late in the year I stopped using other people's agents and <b>started writing my own</b>.
</td></tr>
<tr><td align="center"><b>2026</b><br><sub>35 repos<br>2,183 commits<br><i>and it's only September</i></sub></td><td>
🛠️ <b>From tool user to toolmaker.</b> I shipped CLIs, evaluators and guardrails for AI coding agents to npm and PyPI — and I ship to vibing every day. <b>My highest-commit year ever, with three months left.</b>
</td></tr>
</table>

---

## 🪦 The repo graveyard

<details>
<summary><b>Things that never made it — open and laugh</b></summary>

<br>

| What | Attempts | Cause of death |
|---|---|---|
| 🚗 **Used cars** | 24 | Since 2022. Damage-detection API, crawlers, GPT search, four MVPs. **Every time I thought "this one's different."** |
| 🚽 **Toilet finder** | 3 | Web, native, Flutter — one each. All three died at the maps API. |
| ⏱️ **Pomodoro** | 6 | I have a condition where I build a pomodoro timer to learn any new framework. |
| 🎵 **TikTok clone** | 4 | At least I genuinely learned Flutter animations. |
| 😴 **Sleep apps** | 3 | Only [Jammanbo](https://life-save-with-claude-code-multi-se.vercel.app) survived. |
| 🎤 **Vocal trainer** | 1 | Created the repo. **Zero commits.** My most honest failure. |
| 👻 **Named and abandoned** | **34** | Repos with not a single commit. `myApp Dream`, `your_vocal_trainer`, `real-final-usedCar-search`… |

<b>What I learned:</b> I have never failed for lack of an idea. I have failed, every single time, by <i>failing to cut scope</i>.
Which is why the things I build now never exceed five screens.

</details>

<details>
<summary><b>🎮 Side quests — these actually run</b></summary>

<br>

- 🎌 **[custo](https://wonjangcloud9.github.io/custo/)** — learn Japanese by being a CUTIE STREET fan. Hiragana through real fan-letter phrasing
- 🎬 **[SubLineFix](https://github.com/wonjangcloud9/ko-video-subtitle-sync)** — merges auto-captions with the script to fix subtitles **without any ASR**. *The script is truth, the captions are timing*
- 🎮 **[mobily](https://github.com/wonjangcloud9/mobily)** — a login-free daily checklist for mobile RPG players. No server, just localStorage
- 🛏️ **[Jammanbo](https://life-save-with-claude-code-multi-se.vercel.app)** — a sleep tracker PWA with XP, levels and streaks
- 🧱 **[flutter_riverpod_architecture_example](https://github.com/wonjangcloud9/flutter_riverpod_architecture_example)** — Flutter + Riverpod clean architecture
- 📷 **[react-native-compact-camera](https://github.com/wonjangcloud9/react-native-compact-camera)** — a minimal RN camera component

</details>

---

## 🧰 What I reach for

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

<img src="https://streak-stats.demolab.com?user=wonjangcloud9&theme=transparent&hide_border=true&border_radius=10&ring=D97757&fire=D97757&currStreakLabel=D97757" alt="streak" />

</div>

---

<div align="center">
<sub>

**189 of my 361 repos are private** — the numbers above include private commits.<br>
**Only the ones that made it all the way go public.** That's why just 172 are.

<br>

*"I've never failed for lack of an idea. I've failed, every time, by failing to cut scope."*

</sub>
</div>
