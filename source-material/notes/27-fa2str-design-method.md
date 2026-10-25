# Lesson 27 — FA²STR: How to Decompose, Architect, Design, Implement & Test Any Problem
- **Source file:** 27) FAВІSTR - How to Decompose, Architect, Design, Implement & Test Any Problem.txt
- **Category:** workflow
- **Topics:** FA2STR, design-method, problem-decomposition, ideal-developer-workflow, concrete-examples, acceptance-criteria, test-infrastructure, red-green-refactor, outer-loop-tests, thinking-backwards, 4-pillars

## Summary
FA²STR is Khalil's six-step design method — Find, Architect, Automate, Specify, Test, Refine — an abstraction on top of the ideal developer workflow that's easier to remember and think with. Its goal is problem decomposition: to systematically approach any non-trivial design challenge (even ones outside your experience) from concrete examples through architecture, test infrastructure, and TDD. Walked through with a Notion <-> Google Calendar two-way sync example. It integrates the 4 pillars (design, testing, architecture, strategy) into one method and gives the community a shared vocabulary for breaking problems down. It's the final tool, used in the value-first phase; this is the last metaphysics video.

## Core ideas
- Main skill being developed: **problem decomposition**.
- The ideal developer workflow has many parts and is hard to remember; FA²STR is a more effective level of abstraction to think/work with.
- When a problem is out of your wheelhouse you feel unequipped; FA²STR lets you tell yourself "I do have the tool to do this. I know how to walk through this."
- Example problems it should handle: Spotify-like playlist track reordering on the backend; auth on the front end.
- Shared design method -> community can discuss and break problems down consistently.
- Khalil uses it "in my head every single time I need to think through a design problem."
- Before writing any code: think backwards, start at the end, define the success criteria (how the feature will be tested).
- Specify/Test/Refine = red/green/refactor; start with an outer-loop test containing acceptance criteria, then move inwards repeatedly (nth looping).
- If architecture, testing strategy and patterns already exist, the Architect step is easy, but a checklist is useful.

## Named frameworks / mental models
- **FA²STR** (Find, Architect, Automate, Specify, Test, Refine)
  - Purpose: go from a non-trivial design challenge to action steps covering decomposition, architecture, design, implementation, and testing on any side of the stack.
  - Steps:
    1. **Find** — find the concrete examples (= problem guess point + solution guess point). Who / role, why, capabilities; then features, concrete stories/experiences, acceptance criteria, scenarios, concrete examples.
    2. **Architect** — determine patterns, any new components, the testing strategy; create a broad-stroke architecture. (Checklist-like when an architecture already exists.)
    3. **Automate** — set up initial test infrastructure (new project, or existing project with none); frame the mind to "think test infrastructure"; make it work in a deployment pipeline; think backwards and define success criteria before writing code.
    4. **Specify** — (red) write the failing outer-loop test from acceptance criteria.
    5. **Test** — (green) make it pass.
    6. **Refine** — (refactor); repeat, moving inwards (nth looping).
  - When to use: any non-trivial feature/design problem, after mastering the essentials (value-first phase).
- **Worked example — Notion <-> Google Calendar two-way sync**
  - Feature: tasks sync to Google Calendar; new Google Calendar events sync back to Notion.
  - Find: who = Khalil; role = business owner; why = speeds him up, he does most work from Notion; capabilities = synchronizing, writing into Google, writing into Notion, updates. Then write stories of intended use, document acceptance criteria, scenarios, pass in concrete examples.
  - Architect: patterns, new components, testing strategy, broad-stroke architecture.
  - Automate: decide how the feature will be tested; success criteria first.
  - Specify/Test/Refine: outer-loop acceptance test -> inner loops.

## Definitions
- **FA²STR** — six-step design method: Find, Architect, Automate, Specify, Test, Refine; an abstraction over the ideal developer workflow.
- **Find step** — finding the concrete examples (problem + solution guess points).
- **Specify–Test–Refine** — the same as red–green–refactor.
- **Problem decomposition** — breaking a design challenge into action steps; "the main skill".

## Rules & heuristics
- Always start from concrete examples (Find) before architecture.
- Decide the testing strategy and test infrastructure before writing code.
- Think backwards: start at the end, define success criteria.
- Turn the theoretical acceptance criteria into an outer test, then work inwards.
- Keep an architect-step checklist even in established codebases.

## Anti-patterns / mistakes called out
- Feeling unequipped for unfamiliar problems due to lacking a systematic method.
- Writing code before knowing how the feature will be tested (inferred from "one of the first things I do before I even write any code").

## Code discussed
None (no code). Test structure described: outer-loop acceptance test encoding acceptance criteria, followed by inner tests via red-green-refactor.

## Diagrams / visual models described
- FA²STR as six boxes: Find -> Architect -> Automate -> Specify -> Test -> Refine (last three form a loop).
- Mapping: Find ≈ problem + solution guess points; Architect ≈ architecture guess point; Automate ≈ test infra / deployment pipeline; S-T-R ≈ red-green-refactor / nth looping.
- FA²STR sits as an abstraction layer on top of the ideal developer workflow, which integrates the 4 pillars.

## Notable quotes
- "The goal here is to develop your problem decomposition skills, because this is the main skill."
- "No, I actually do have the tool to do this. I know how to walk through this properly."
- "It goes find, architect, automate, specify, test, and refine."
- "This is the design method that I personally use in my head, in my mind, every single time I need to think through the design problem."
- "Think backwards, start at the end, and I define the success criteria."
- "We now have a design method that integrates the four pillars."

## Cross-references
- Lesson 26 (Ideal Developer Workflow), Lesson 12 (4 Pillars), Lesson 14 (Abstraction Prism), Lessons 21–22 (Value Identification, Domain Discovery), Lesson 52 (FA²STR TDD's upfront & emergent design), Lesson 75 (Thinking Backwards).
- TDD red-green-refactor; phases of craftship (best-practice-first for TDD; value-first for FA²STR).

## Fluff skipped
Greeting, "we covered a hell of a lot" recap, note about moving videos, sign-off.

## AI-era relevance hint
- Find + Architect + Automate are exactly the human-owned upfront steps; Specify-Test-Refine is where agents can loop fast against human-approved tests.
- A shared named method gives teams (and agent prompts) a consistent decomposition structure.
- Defining success criteria first is the best defense against agents "completing" the wrong thing.

## Coverage proof
- Lines read: 55 / 55
- Final line (verbatim): "two minutes straight."
