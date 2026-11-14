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


def line(r, ko, texts):
    text = (texts.get(f'{r["repo"]}#{r["number"]}') if ko else None) or r["title"]
    name = r["repo"].split("/")[1]
    return f'- [{name} #{r["number"]}]({r["url"]}) {text}'


def fold(title, items, ko, texts):
    if not items:
        return []
    return ["<details>", f"<summary><b>{title}</b></summary>", "", "<br>", ""] + [line(r, ko, texts) for r in items] + ["", "</details>", ""]


def block(rows, ko, texts):
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
                "**머지된 것**", ""]
    else:
        out += ["## Contributions to other people's projects", "",
                f"Problems I hit while using a tool, fixed or reported. Many only show up when you work in Korean, such as IME input and Korean captions. {len(prs)} pull requests and {len(issues)} issues across {repos} projects, {len(merged)} merged so far.", "",
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
