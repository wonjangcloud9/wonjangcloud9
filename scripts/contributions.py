#!/usr/bin/env python3
"""README 맨 아래 '오픈소스에 보탠 것' 목록을 다시 만든다.

    python3 scripts/contributions.py

gh로 남의 저장소에 낸 PR·이슈를 전부 가져와 README.md / README.en.md의
<!-- contributions:start --> ~ <!-- contributions:end --> 사이를 바꾼다.
한국어 설명은 scripts/contributions_ko.json ("owner/repo#번호": "설명")에서 읽고,
없으면 원래 제목을 쓴다 (실행하면 빠진 항목을 알려 준다).
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


LABEL = {
    True: {("prs", "merged"): "**머지**", ("prs", "open"): "리뷰 중", ("prs", "closed"): "닫힘",
           ("issues", "open"): "이슈", ("issues", "closed"): "이슈 · 닫힘"},
    False: {("prs", "merged"): "**merged**", ("prs", "open"): "in review", ("prs", "closed"): "closed",
            ("issues", "open"): "issue", ("issues", "closed"): "issue · closed"},
}
ORDER = {("prs", "merged"): 0, ("prs", "open"): 1, ("prs", "closed"): 2, ("issues", "open"): 3, ("issues", "closed"): 4}


def block(rows, ko, texts):
    prs = [r for r in rows if r["kind"] == "prs"]
    merged = sum(r["state"] == "merged" for r in prs)
    issues = len(rows) - len(prs)
    out = [START]
    if ko:
        out += ["## 오픈소스에 보탠 것", "",
                f"직접 쓰다가 걸린 문제를 고쳐서 보내거나 알린 것들입니다. PR {len(prs)}개(머지 {merged}개) · 이슈 {issues}개.", ""]
    else:
        out += ["## Contributions to other people's projects", "",
                f"Problems I ran into while using a tool, fixed or reported. {len(prs)} pull requests ({merged} merged) · {issues} issues.", ""]
    repos = {}
    for r in rows:
        repos.setdefault(r["repo"], []).append(r)
    ranked = sorted(repos.items(), key=lambda kv: (-len(kv[1]), -max(int(r["createdAt"][:4]) for r in kv[1]), kv[0]))
    for i, (repo, items) in enumerate(ranked):
        n_pr = sum(r["kind"] == "prs" for r in items)
        n_merged = sum(r["state"] == "merged" for r in items)
        n_is = len(items) - n_pr
        parts = []
        if n_pr:
            parts.append((f"PR {n_pr}" + (f" · 머지 {n_merged}" if n_merged else "")) if ko
                         else (f"{n_pr} PR" + ("s" if n_pr > 1 else "") + (f" · {n_merged} merged" if n_merged else "")))
        if n_is:
            parts.append(f"이슈 {n_is}" if ko else f"{n_is} issue" + ("s" if n_is > 1 else ""))
        out += [f"<details{' open' if i == 0 else ''}>",
                f'<summary><b><a href="https://github.com/{repo}">{repo}</a></b> — {" · ".join(parts)}</summary>', "", ""]
        for r in sorted(items, key=lambda r: (ORDER[(r["kind"], r["state"])], -r["number"])):
            text = texts.get(f'{repo}#{r["number"]}') if ko else None
            out.append(f'- {LABEL[ko][(r["kind"], r["state"])]} [#{r["number"]}]({r["url"]}) {text or r["title"]}')
        out += ["", "</details>", ""]
    out += [END]
    return "\n".join(out)


def main():
    rows = search("prs") + search("issues")
    texts = json.loads((ROOT / "scripts/contributions_ko.json").read_text())
    missing = [f'{r["repo"]}#{r["number"]}  {r["title"]}' for r in rows if f'{r["repo"]}#{r["number"]}' not in texts]
    for name, ko in (("README.md", True), ("README.en.md", False)):
        path = ROOT / name
        s = path.read_text()
        a, b = s.index(START), s.index(END) + len(END)
        path.write_text(s[:a] + block(rows, ko, texts) + s[b:])
    if missing:
        print("한국어 설명이 없는 항목 (scripts/contributions_ko.json에 추가):", *missing, sep="\n  ", file=sys.stderr)


if __name__ == "__main__":
    main()
