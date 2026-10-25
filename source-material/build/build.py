import datetime
import html
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BUILD = ROOT / "build"
OUTPUT = ROOT / "software-essentialist-guide.html"
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr",
        "path", "circle", "rect", "line", "polyline", "polygon", "ellipse", "stop", "use"}
CHECKED = {"section", "article", "div", "figure", "pre", "code", "table", "ol", "ul", "aside", "blockquote", "svg"}


class Balance(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack, self.errors, self.ids = [], [], []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag in CHECKED:
            self.stack.append((tag, self.getpos()))

    def handle_startendtag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])

    def handle_endtag(self, tag):
        if tag not in CHECKED:
            return
        if not self.stack or self.stack[-1][0] != tag:
            self.errors.append(f"unexpected </{tag}> at {self.getpos()} (open: {self.stack[-1] if self.stack else None})")
            for i in range(len(self.stack) - 1, -1, -1):
                if self.stack[i][0] == tag:
                    del self.stack[i:]
                    break
            return
        self.stack.pop()


def build_toc(fragments):
    items = []
    for frag in fragments:
        sec = re.search(r'<section[^>]*\bid="([^"]+)"[^>]*\bdata-title="([^"]+)"', frag)
        if not sec:
            continue
        subs = re.findall(r'<article[^>]*\bclass="topic"[^>]*\bid="([^"]+)"[^>]*\bdata-title="([^"]+)"', frag)
        sub_html = "".join(f'<li><a href="#{i}">{t}</a></li>' for i, t in subs)
        items.append(f'<li><a href="#{sec.group(1)}">{sec.group(2)}</a>' + (f"<ul>{sub_html}</ul>" if subs else "") + "</li>")
    return '<ul class="toc">' + "".join(items) + "</ul>"


def main():
    fragments = [p.read_text(encoding="utf-8") for p in sorted((BUILD / "sections").glob("*.html"))]
    template = (BUILD / "template.html").read_text(encoding="utf-8")
    page = (template.replace("<!--TOC-->", build_toc(fragments))
                    .replace("<!--SECTIONS-->", "\n".join(fragments))
                    .replace("<!--DATE-->", datetime.date.today().isoformat()))
    OUTPUT.write_text(page, encoding="utf-8")

    checker = Balance()
    checker.feed(page)
    problems = list(checker.errors)
    problems += [f"unclosed <{t}> opened at {pos}" for t, pos in checker.stack]
    dupes = sorted({i for i in checker.ids if checker.ids.count(i) > 1})
    if dupes:
        problems.append(f"duplicate ids: {dupes}")
    hrefs = set(re.findall(r'href="#([\w-]+)"', page))
    missing_targets = sorted(h for h in hrefs if h not in set(checker.ids))
    if missing_targets:
        problems.append(f"links to missing ids: {missing_targets}")

    cited = {int(n) for n in re.findall(r'data-lesson="(\d+)"', page)} - {0}
    uncited = sorted(set(range(1, 96)) - cited)
    if uncited:
        problems.append(f"lessons never cited: {uncited}")

    unbadged = 0
    for fig in re.findall(r'<figure class="code">(.*?)</figure>', page, re.S):
        if 'class="badge' not in fig:
            unbadged += 1
    if unbadged:
        problems.append(f"{unbadged} code blocks without badge")

    for code in re.findall(r"<code[^>]*>(.*?)</code>", page, re.S):
        if re.search(r"<(?!/?(span|mark|b|i|em|strong)\b)", code):
            problems.append(f"possibly unescaped markup in code: {html.unescape(code[:60])!r}")
            break

    print(f"wrote {OUTPUT.name}: {len(page) // 1024} KB, {len(fragments)} sections, {len(cited)} lessons cited")
    for p in problems:
        print("  PROBLEM:", p)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
