# Topic Map & Section Authoring Guide

Source of truth for content: `notes/NN-*.md` (one per lesson, extracted from full transcripts).
Each HTML section fragment lives in `build/sections/NN-<id>.html` and is concatenated by `build/build.py`.

## Section -> lessons

| # | Section id | Title | Primary lessons | Also mine from (only content in scope) |
|---|---|---|---|---|
| 00 | cheatsheet | Cheat Sheet | (authored last from all other sections) | all |
| 01 | course-map | Course Map & The Big Picture | 1, 2, 7, 13, 40, 41, 43 | 82, 83, 85, 91 (phases of craftship, final course structure) |
| 02 | mindsets | Mindsets (Distilled) | 3, 4, 5, 6, 75 | 85 (right action, quantum moments), 89 (clarity/anxiety) |
| 03 | metaphysics | Metaphysics: Mental Models & Systems | 8, 9, 10, 11, 12 | 90 (scalability, 4 pillars), 94 (essence/role/goal/purpose/form, what software is), 85 (value creation system) |
| 04 | essentials-metaphysical | 12 Essentials I: Metaphysical (Abstraction, Feedback Loop) | 13, 14, 15 | 93, 91, 90, 82 (debugging by zooming out) |
| 05 | essentials-physical | 12 Essentials II: Physical | 16, 17, 18, 19, 20, 24, 25 | 81 (walking skeleton, pipeline), 82 (composition root, pipeline), 84 (core vs infra), 88 (dependency inversion, application interface), 93 (folder structure, events, composition root, pipeline) |
| 06 | essentials-theoretical | 12 Essentials III: Theoretical | 21, 22, 23 | 65, 82 (role→goal→features→examples), 85 (tools per guess point), 93 |
| 07 | workflow | FA²STR, Guess Points & The Ideal Developer Workflow | 26, 27, 52, 40, 72 | 81 (execution guess point, test levels), 86 (FA²STR at any level), 87 (ideal workflow from GOOS, level 3), 89 (why level-3 is hard), 85 (zero theoretical guesses) |
| 08 | testing | Testing: Principles & Techniques | 31, 44, 48, 51, 53, 64, 73, 78 | 81 (contract tests, mocks), 82 (acceptance test 4 layers, 3 test types), 84 (3 verifications), 87 (verification per guess point, contract tests, spies), 89 (Clock, contract tests), 92 (2 test strategies, incoming tests), 91 (no time to test) |
| 09 | katas | Kata Walkthroughs (Before → After) | 42, 45, 46, 47, 49, 50, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63 | 86 (first milestone context) |
| 10 | ddd-feedbook | Theoretical Design & DDD: The FeedBook Case Study | 65, 66, 67, 68, 69, 70, 71, 74, 76, 77 | 88 (aggregates, process modelling, stateful section), 89 (aggregates, state machines, events), 86 (state machines, invariants) |
| 11 | abstraction-rdd | Abstraction Levels, OOP & Responsibility-Driven Design | 79, 36, 38, 30 | 94 (RDD, category theory, stereotypes), 95 (upfront design review), 84 (interfaces first, repo role), 91 (designing own abstractions) |
| 12 | architecture | Architecture & Code Structure | 32, 35, 37, 39, 29, 71 | 84 (microservices, modular monolith), 88 (stereotypical architecture), 93 (structure), 92 (modules vs shared), 91 (jargon → essentials) |
| 13 | frontend | Frontend Architecture | 33, 92 | 87, 90, 94, 81 (observer, hooks), 83 |
| 14 | career | Learning Path, Books & Career | 28, 34, 39, 80 | 82 (books), 85, 91 (know your role), 86 (planning is a lie) |
| 15 | qa-highlights | Live Q&A Highlights (by session) | 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95 | — |
| 16 | glossary | Glossary | all | all |

Every lesson 1–95 must be cited at least once somewhere (`data-lesson="N"`).

## HTML fragment conventions (MUST follow)

A fragment is plain HTML (no `<html>`, `<head>`, `<body>`, `<style>`, `<script>`). Structure:

```html
<section id="SECTION-ID" class="doc-section" data-title="Short TOC Title">
  <h2>Section Title</h2>
  <p class="lede">1–3 sentence overview.</p>

  <article class="topic" id="SECTION-ID--topic-slug" data-title="Topic TOC Title">
    <h3>Topic Title <a class="src" data-lesson="14">L14</a></h3>
    ...content...
  </article>
</section>
```

- `id`s: lowercase kebab-case, topic ids prefixed with the section id + `--`. Unique.
- Lesson citations: `<a class="src" data-lesson="N">LN</a>` (put after headings, bullets, quotes). Multiple: one tag per lesson.
- Badges (use on every code block and every non-course addition):
  - `<span class="badge course">Course</span>` — content directly from lessons (optional on prose; prose is course content by default).
  - `<span class="badge recon">Reconstructed from L45</span>` — code rebuilt from narration (transcripts have speech only, no code).
  - `<span class="badge copilot">Added by Copilot</span>` — illustrative code/diagram/explanation NOT in the course.
  - `<span class="badge ai">AI-era lens · Copilot</span>` — only inside `.ai-lens` asides.
- Code blocks:
  ```html
  <figure class="code">
    <figcaption><span class="badge copilot">Added by Copilot</span> Short caption</figcaption>
    <pre><code class="language-ts">...HTML-ESCAPED code (&lt; &gt; &amp;)...</code></pre>
  </figure>
  ```
- Before/after comparisons:
  ```html
  <div class="compare">
    <div class="before"><div class="compare-label">Before — why it hurts</div> figure.code ...</div>
    <div class="after"><div class="compare-label">After — why it's better</div> figure.code ...</div>
  </div>
  ```
- Callouts: `<div class="callout rule">` (rules/heuristics), `<div class="callout anti">` (anti-patterns), `<div class="callout def">` (definitions), `<div class="callout tip">`. Start each with `<strong>Title</strong>`.
- Frameworks with steps: `<ol class="steps"><li><strong>Step</strong> — explanation</li></ol>`.
- Cards grid: `<div class="cards"><div class="card"><h4>Title</h4>...</div></div>`.
- Quotes: `<blockquote class="quote">“text”<cite><a class="src" data-lesson="12">L12</a></cite></blockquote>`.
- Tables: `<table class="tbl">`.
- AI-era lens (one per major framework, short, 1–3 sentences or bullets):
  `<aside class="ai-lens"><span class="badge ai">AI-era lens · Copilot</span><p>...</p></aside>`
- Diagrams:
  - Preferred (offline): inline `<figure class="diagram"><svg viewBox="..." role="img" aria-label="...">...</svg><figcaption>...</figcaption></figure>`. Use `fill="var(--svg-fill)"`, `stroke="var(--svg-stroke)"`, text `fill="var(--fg)"`, accents `var(--accent)`, `var(--accent-2)` so dark mode works. Keep SVG hand-written and simple (boxes, arrows via `<marker id="arrow-UNIQUE">`; marker ids must be unique across the whole page).
  - Mermaid (needs internet, source shown as fallback): `<figure class="diagram"><pre class="mermaid">flowchart LR ...</pre><figcaption>...</figcaption></figure>`. Escape `<`/`>`/`&` in mermaid text. Avoid parentheses/quotes issues: wrap labels in double quotes `A["label"]`.
- Never invent course claims. If something is your addition, badge it `Added by Copilot`. Transcription oddities stay out of the HTML unless meaningful.
- Filter fluff. Keep it dense, scannable, specific (names of steps, concrete examples, test names).
