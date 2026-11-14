#!/usr/bin/env python3
"""README 맨 아래 '오픈소스에 보탠 것' 목록을 다시 만든다.

    python3 scripts/contributions.py

gh로 남의 저장소에 낸 PR·이슈를 전부 가져와 README.md / README.en.md의
<!-- contributions:start --> ~ <!-- contributions:end --> 사이를 바꾼다.
한국어 설명은 scripts/contributions_ko.json ("owner/repo#번호": "설명")에서 읽고,
없으면 원래 제목을 쓴다 (실행하면 빠진 항목을 알려 준다).
저장소 한 줄 설명은 scripts/contributions_repos.json, 별 수는 실행할 때 가져온다.
"""
import json
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
ME = "wonjangcloud9"
START, END = "<!-- contributions:start -->", "<!-- contributions:end -->"


def search(kind):
    out = subprocess.run(
        ["gh", "search", kind, f"--author={ME}", "--limit", "1000",
         "--json", "repository,title,url,number,state,createdAt"],
        check=True, capture_output=True, text=True).stdout
    rows = [r for r in json.loads(out) if not r["repository"]["nameWithOwner"].startswith(ME + "/")]
    for r in rows:
        r["kind"], r["repo"] = kind, r["repository"]["nameWithOwner"]
    return rows


def stars(repo):
    n = int(subprocess.run(["gh", "api", f"repos/{repo}", "-q", ".stargazers_count"],
                           check=True, capture_output=True, text=True).stdout)
    return f"{n / 1000:.0f}k" if n >= 10000 else f"{n / 1000:.1f}k" if n >= 1000 else str(n)


def repo_table(rows, ko, about):
    repos = {}
    for r in rows:
        repos.setdefault(r["repo"], []).append(r)
    ranked = sorted(repos.items(), key=lambda kv: (-len(kv[1]), kv[0].lower()))
    out = ["| 프로젝트 | 어떤 저장소인가 | 낸 것 |" if ko else "| Project | What it is | Mine |", "|---|---|---|"]
    for repo, items in ranked:
        n_pr = sum(r["kind"] == "prs" for r in items)
        n_merged = sum(r["state"] == "merged" for r in items)
        n_is = len(items) - n_pr
        mine = []
        if n_pr:
            mine.append(f"PR {n_pr}" + (f" (머지 {n_merged})" if ko and n_merged else f" ({n_merged} merged)" if n_merged else ""))
        if n_is:
            mine.append(f"이슈 {n_is}" if ko else f"{n_is} issue" + ("s" if n_is > 1 else ""))
        what = about.get(repo, {}).get("ko" if ko else "en", "")
        name = repo.split("/")[1]
        out.append(f'| **[{name}](https://github.com/{repo})**<br><sub>★ {stars(repo)}</sub> | {what} | {"<br>".join(mine)} |')
    return out + [""]


def line(r, ko, texts):
    text = (texts.get(f'{r["repo"]}#{r["number"]}') if ko else None) or r["title"]
    name = r["repo"].split("/")[1]
    return f'- [{name} #{r["number"]}]({r["url"]}) {text}'


def fold(title, items, ko, texts):
    if not items:
        return []
    return ["<details>", f"<summary><b>{title}</b></summary>", "", "<br>", ""] + [line(r, ko, texts) for r in items] + ["", "</details>", ""]


def block(rows, ko, texts, about):
    rows = sorted(rows, key=lambda r: r["createdAt"], reverse=True)
    prs = [r for r in rows if r["kind"] == "prs"]
    merged = [r for r in prs if r["state"] == "merged"]
    waiting = [r for r in prs if r["state"] == "open"]
    closed = [r for r in prs if r["state"] == "closed"]
    issues = [r for r in rows if r["kind"] == "issues"]
    repos = len({r["repo"] for r in rows})
    out = [START]
    if ko:
        out += ["## 오픈소스에 보탠 것", "",
                f"쓰다가 걸린 문제를 고쳐서 보내거나 알렸습니다. 한글 입력이나 한국어 자막처럼, 한국어로 써야 보이는 문제가 많습니다. 프로젝트 {repos}곳에 PR {len(prs)}개와 이슈 {len(issues)}개를 냈고, 그중 {len(merged)}개가 머지됐습니다.", "",
                *repo_table(rows, ko, about),
                "**머지된 것**", ""]
    else:
        out += ["## Contributions to other people's projects", "",
                f"Problems I hit while using a tool, fixed or reported. Many only show up when you work in Korean, such as IME input and Korean captions. {len(prs)} pull requests and {len(issues)} issues across {repos} projects, {len(merged)} merged so far.", "",
                *repo_table(rows, ko, about),
                "**Merged**", ""]
    out += [line(r, ko, texts) for r in merged] + [""]
    out += fold(f"리뷰를 기다리는 PR {len(waiting)}개" if ko else f"{len(waiting)} pull requests in review", waiting, ko, texts)
    out += fold(f"알린 문제 {len(issues)}개" if ko else f"{len(issues)} issues reported", issues, ko, texts)
    out += fold(f"닫힌 PR {len(closed)}개" if ko else f"{len(closed)} closed pull requests", closed, ko, texts)
    out += [END]
    return "\n".join(out)


def main():
    rows = search("prs") + search("issues")
    texts = json.loads((ROOT / "scripts/contributions_ko.json").read_text())
    about = json.loads((ROOT / "scripts/contributions_repos.json").read_text())
    missing_repo = sorted({r["repo"] for r in rows} - set(about))
    missing = [f'{r["repo"]}#{r["number"]}  {r["title"]}' for r in rows if f'{r["repo"]}#{r["number"]}' not in texts]
    for name, ko in (("README.md", True), ("README.en.md", False)):
        path = ROOT / name
        s = path.read_text()
        a, b = s.index(START), s.index(END) + len(END)
        path.write_text(s[:a] + block(rows, ko, texts, about) + s[b:])
    if missing_repo:
        print("저장소 설명이 없는 곳 (scripts/contributions_repos.json에 추가):", *missing_repo, sep="\n  ", file=sys.stderr)
    if missing:
        print("한국어 설명이 없는 항목 (scripts/contributions_ko.json에 추가):", *missing, sep="\n  ", file=sys.stderr)


if __name__ == "__main__":
    main()
