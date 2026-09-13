<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=26&duration=2600&pause=700&color=D97757&center=true&vCenter=true&width=700&height=70&lines=I+built+a+used-car+app+24+times.;All+24+failed.;So+I+started+building+tools+instead.;Now+I'm+prepping+attempt+%2325." alt="I built a used-car app 24 times / All 24 failed / So I started building tools instead / Now I'm prepping attempt #25" />

Building things in Seoul · [GS Neotek](https://www.gsneotek.co.kr)

[한국어](README.md) · English

</div>

<br>

<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/dashboard-dark-b2b7fa5689.svg">
  <img src="./assets/dashboard-light-b2b7fa5689.svg" alt="Wonjang Lab dashboard — repos, commits, languages, rebuild counts" width="100%">
</picture>
</div>

<div align="center">
<sub>Redrawn every night by <a href="scripts/dashboard.mjs">a script I wrote</a>. Third-party stat services go down; this one can't.</sub>
</div>

<br>

<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wonjangcloud9/wonjangcloud9/output/snake-dark.svg">
  <img src="https://raw.githubusercontent.com/wonjangcloud9/wonjangcloud9/output/snake-light.svg" alt="A snake eating my contribution graph">
</picture>
</div>

---

## 🔨 What I'm building now

<table>
<tr>
<td width="50%" valign="top">

### 🐢 vibing
A weight-loss app. Log what you ate, your weight and how much you moved, and today's **calorie deficit** shows up as one number. It backs out your real TDEE from 21 days of logs, and a turtle coach named Bibi nags you.

`Next.js` `Supabase` `PWA` · private · **shipped to daily**

</td>
<td width="50%" valign="top">

### 🦀 [wonjangAgent](https://github.com/wonjangcloud9/wonjangAgent)
A **Korean-first** autonomous AI agent. Single Rust binary — no runtime to install.

[![dl](https://img.shields.io/npm/dm/wonjang-agent?style=flat-square&label=downloads/mo&color=dea584)](https://www.npmjs.com/package/wonjang-agent)

</td>
</tr>
<tr>
<td valign="top">

### 🌳 [claude-tree](https://github.com/wonjangcloud9/claude-tree)
A CLI that runs **multiple Claude Code sessions in parallel**, each isolated in its own git worktree. Docs in four languages.

[![dl](https://img.shields.io/npm/dm/@claudetree/cli?style=flat-square&label=downloads/mo&color=CB3837)](https://www.npmjs.com/package/@claudetree/cli)

</td>
<td valign="top">

### 🛡️ [open-guardrail](https://github.com/wonjangcloud9/open-guardrail)
A guardrail engine for LLM apps. Prompt injection, PII (26 regions), GDPR, EU AI Act — **zero API calls, under 0.1ms**.

[![npm](https://img.shields.io/npm/v/open-guardrail?style=flat-square&label=npm&color=CB3837)](https://www.npmjs.com/package/open-guardrail) [![pypi](https://img.shields.io/pypi/v/open-guardrail?style=flat-square&label=PyPI&color=3775A9)](https://pypi.org/project/open-guardrail/)

</td>
</tr>
<tr>
<td colspan="2" valign="top">

### 📏 [harness-eval](https://github.com/wonjangcloud9/harness-eval)
A CLI that scores **harness engineering** quality and generates benchmarks from any repo. *Same model, better harness, very different results* — I built this to put a number on that.

[![pypi](https://img.shields.io/pypi/v/harness-eval?style=flat-square&label=PyPI&color=3775A9)](https://pypi.org/project/harness-eval/)

</td>
</tr>
</table>

---

## 📖 Seven years of failing forward

<table>
<tr><td width="92" align="center"><b>2019</b><br><sub>3 repos</sub></td><td>
🐣 <b>First commit.</b> I had no idea what the web was, so I started by <b>cloning</b> — KakaoTalk, Netflix.
</td></tr>
<tr><td align="center"><b>2020–21</b><br><sub>389 commits</sub></td><td>
💤 <b>The years I didn't use GitHub.</b> I didn't know it mattered, so the code just piled up on my laptop. <b>Zero commits in 2020.</b>
</td></tr>
<tr><td align="center"><b>2022</b><br><sub>94 repos</sub><br><sub>1,184 commits</sub></td><td>
📚 <b>The year syntax became muscle memory.</b> React, Next.js and Django — cloning Karrot Market, Airbnb and Twitter at eight repos a month.
</td></tr>
<tr><td align="center"><b>2023</b><br><sub>127 repos</sub><br><sub>1,955 commits</sub></td><td>
📱 <b>The year I went mobile — my busiest ever.</b> Flutter, React Native and Jetpack Compose at once. My first attempts at things <i>someone might actually use</i>, almost all of which died before launch.
</td></tr>
<tr><td align="center"><b>2024</b><br><sub>48 repos</sub><br><sub>1,355 commits</sub></td><td>
🚗 <b>The year I picked a domain.</b> Everything converged on <b>used cars</b> — an Encar crawler, a damage-detection FastAPI, mycarpageGPT. LangChain and RAG put an LLM in a product for the first time.
</td></tr>
<tr><td align="center"><b>2025</b><br><sub>45 repos</sub><br><sub>907 commits</sub></td><td>
🔁 <b>The year of rebuilding.</b> Four more used-car rewrites and five health apps. Late in the year I stopped using other people's agents and <b>started writing my own</b>.
</td></tr>
<tr><td align="center"><b>2026</b><br><sub>35 repos</sub><br><sub>2,100+ commits</sub></td><td>
🛠️ <b>From tool user to toolmaker.</b> I shipped CLIs, evaluators and guardrails for AI coding agents to npm and PyPI. <b>My highest-commit year ever, and it's only September.</b>
</td></tr>
</table>

---

## 🪦 The repo graveyard

<details>
<summary><b>Things that never made it — open and laugh</b></summary>

<br>

| What | Attempts | Cause of death |
|---|---|---|
| 🚗 **Used cars** | 24 | Damage-detection API, crawlers, GPT search, four MVPs. **Every time I thought "this one's different."** |
| 🚽 **Toilet finder** | 3 | Web, native, Flutter — one each. All three died at the maps API. |
| ⏱️ **Pomodoro** | 6 | I have a condition where I build a pomodoro timer to learn any new framework. |
| 🎵 **TikTok clone** | 4 | At least I genuinely learned Flutter animations. |
| 😴 **Sleep apps** | 3 | Only [Jammanbo](https://life-save-with-claude-code-multi-se.vercel.app) survived. |
| 🎤 **Vocal trainer** | 1 | Created the repo. **Zero commits.** My most honest failure. |
| 👻 **Named and abandoned** | **34** | Repos without a single commit. `myApp Dream`, `real-final-usedCar-search`… |

<b>I've never failed for lack of an idea. I've failed, every time, by failing to cut scope.</b> Which is why what I build now never exceeds five screens.

</details>

<details>
<summary><b>🎮 Side quests — these actually run</b></summary>

<br>

- 🎌 **[custo](https://wonjangcloud9.github.io/custo/)** — learn Japanese by being an idol fan
- 🎬 **[SubLineFix](https://github.com/wonjangcloud9/ko-video-subtitle-sync)** — merges captions with the script to fix subtitles **without any ASR**
- 🎮 **[mobily](https://github.com/wonjangcloud9/mobily)** — a login-free daily checklist for mobile RPG players
- 🛏️ **[Jammanbo](https://life-save-with-claude-code-multi-se.vercel.app)** — a sleep tracker PWA with XP and levels
- 🧱 **[flutter_riverpod_architecture_example](https://github.com/wonjangcloud9/flutter_riverpod_architecture_example)** — Flutter + Riverpod clean architecture
- 📷 **[react-native-compact-camera](https://github.com/wonjangcloud9/react-native-compact-camera)** — a minimal RN camera component

</details>

---

## 🎬 What I do for fun

<div align="center">

<img src="./assets/storm.webp" width="420" alt="A clip I made with Higgsfield">

<sub>When I'm not writing code, I make things like this with <b>Higgsfield</b> 🫡</sub>

</div>

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

</div>

---

<div align="center">
<sub><b>189 of my 361 repos are private.</b> Only the ones that made it all the way go public.</sub>
</div>
