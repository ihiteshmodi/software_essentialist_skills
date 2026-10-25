# Lesson 63 — Discussion: Boolean Calculator Review #2
- **Source file:** 63) Discussion Boolean Calculator Review #2.txt
- **Category:** kata-review
- **Topics:** boolean-calculator, upfront-vs-emergent-design, fa2str, table-driven-tests, describe.each, tpp, simplest-transformation, too-many-guesses, feedback-loop, design-it-twice, ubiquitous-language, reviewability, stack, tokens, operands

## Summary
Khalil reviews Shannon's Boolean Calculator. All tests pass, but Shannon felt there might be a better way. The first commit jumps straight to table-driven test infrastructure (`describe.each`) and a full implementation built around a "condition map", a stack, tokens and operands. Khalil calls this an **upfront design decision**. He uses FA²STR to separate upfront design (Find, Architect, Automate) from emergent design (Specify, Test, Refine, i.e. red-green-refactor). The main criticism is that **too many guesses were made at once**. On the TPP ladder the first transformation jumped to "level seven or eight" instead of returning a constant, so the design story lives in the author's head, not in the commits, and Khalil can't give useful feedback on how it was reached. He challenges Shannon to "design it twice" (from *A Philosophy of Software Design*), this time arriving emergently. He also acknowledges the code works and is elegant.

## Core ideas
- Setting up `describe.each` from the first test is a choice about how all tests will run, and it's upfront design. It's elegant but may add complexity that makes continuing hard.
- **FA²STR split:** Find, Architect, Automate = upfront design. Specify, Test, Refine = red-green-refactor, where emergent design comes out.
- There's no single correct approach. But with TDD, and especially for **stateless** tests, starting with a simpler test architecture and **refactoring toward** a table is easier.
- Simpler start: take one example, write it as English, make it your `it` statement. Examples: "returns true when I pass in true", "returns true when I do true and true", "returns false when I do true and false".
- Fake it vs obvious implementation: jumping straight to designing abstractions (a condition map) skips the simple TPP transformations. Return a constant first.
- Preferring simpler transformations has a cost: you can't jump straight to the solution in your head. That takes foresight plus metacognition, and stopping yourself so you can do "the good hygienic thing".
- Many guesses at once: all the thinking happens in your brain rather than in code that reads as a story, which makes it hard to review.
- Pursuing two intentions at once splits focus and needs more willpower and creativity. One at a time lets the **feedback loop** show you what you need next.
- Nobody beelines to a solution. There's backspacing, rerunning and wandering. Small goals move you point to point.
- Let the tool (the feedback loop of small guesses) do the heavy lifting, not your mind.
- Good concepts did appear (operands, stack, tokens pushed onto the stack). Khalil would rather see them emerge over time.
- It's a spectrum. For someone confident, the whole thing might be an obvious implementation. If time is short and you're confident, this style works.
- Nested conditionals can be refined later, but not in this section. The goal here is to learn the mechanics and minimize complexity. The upcoming stateful assignments will refactor ifs/elses into better-encapsulated units.

## Named frameworks / mental models
- **FA²STR (upfront vs emergent split)**
  - Find, Architect, Automate → upfront design.
  - Specify, Test, Refine → red-green-refactor → emergent design.
  - When: to recognize which kind of design decision you're making (e.g., choosing a table-driven test harness is Architect/upfront).
- **Transformation Priority Premise (TPP)** — used here for "managing complexity". Jumping to a map-based design is roughly level 7–8, while returning a constant sits near the top of the list.
- **One guess at a time (feedback loop)**
  - Purpose: avoid split focus. Let each small guess's feedback show the next step.
  - Analogy: learning entrepreneurship (ship a product that makes money, often with no-code tools like off-the-shelf email marketing) vs learning programming (build it yourself with good principles). Pursued together, they pull in different directions, and reality won't let both converge.
  - Image: "tunnel visioned", "a piece of paper in front of your face". Do the next thing, then the next.
- **Design it twice** (*A Philosophy of Software Design*; author John Ousterhout, inferred): once you have a working solution, redo it. Here the challenge is to arrive at the same place emergently.

## Definitions
- **Upfront design** — design decisions made before coding (FA²STR's Find, Architect, Automate), e.g. choosing a table-driven test structure.
- **Emergent design** — design that comes out of Specify/Test/Refine (red-green-refactor).
- **Fake it / obvious implementation** — the two TDD strategies. Here the obvious implementation jumped past the simpler transformations.

## Rules & heuristics
- For stateless problems, start with plain `it` tests written as English examples. Refactor toward `describe.each`/`it.each` later.
- The first transformation should be a constant, not an abstraction.
- Add types like `type Expression = string` in a **refactor** step, not all at once.
- Make one guess at a time so the commit history tells the story and can be reviewed.
- After solving something upfront, design it twice, emergently.
- Defer refactoring nested statements to later sections. In this section, focus on mechanics and minimal complexity.
- Spelling issues in test names ("single") aren't a priority.

## Anti-patterns / mistakes called out
- Building table-driven test infrastructure on the first commit.
- Jumping straight to designing abstractions (a condition map) instead of returning a constant.
- Making "five, six, seven different guesses all at the same time". It forces you "up into your mind" and produces a lot of code.
- Doing the heavy lifting in your head instead of letting the feedback loop do it.
- Commits that can't be reviewed step by step because the design happened off-screen.

## Code discussed
**Submission:** Shannon's. All tests passing, but Shannon "felt there might be a better way" and found this the hardest assignment.

**Tests:**
- Step one ("express the first test") went straight to `describe.each` driving all functionality from one test. Khalil: elegant but an upfront choice.
- Input changed to a string (necessary once it's a full expression rather than a boolean).
- Suggested simpler start:

```ts
// reconstructed from narration
describe('boolean calculator', () => {
  it('returns true when I pass in TRUE', () => {
    expect(evaluate('TRUE')).toBe(true);
  });
  it('returns true when I do TRUE AND TRUE', () => {
    expect(evaluate('TRUE AND TRUE')).toBe(true);
  });
  it('returns false when I do TRUE AND FALSE', () => {
    expect(evaluate('TRUE AND FALSE')).toBe(false);
  });
});
```

**Production code:**
- First commit: a "condition map" abstraction solved the first test. Khalil puts this at TPP level 7–8, when `return true` (a constant) would do.
- "A lot of code to be seeing in one test": intent is readable, but he worries about complexity and can't review how it was reached.
- Suggested refactor-step typing:

```ts
// reconstructed from narration
type Expression = string;
```

- Concepts present: **operands**, a **stack**, **tokens** added onto the stack. This is good language, but he'd have liked it to emerge.
- Next commit: parentheses introduced, with tests as the guard. Then clean-up and "serious refactoring". The final solution "looks really elegant" but has nested statements, which are refinable later.

**Verdict:** It works, "makes me happy in my soul a little bit". The advice is smaller commits and smaller chunks moving toward this solution, and to redo it emergently ("design it twice").

**Anecdote:** Khalil did this assignment in his first or second year of college with linked lists. It took the whole weekend of deleting and retrying, which shows what doing the heavy lifting in your head costs.

## Diagrams / visual models described
- Path sketch: a wandering path from start to solution (going "all around", backtracking) vs a sequence of short hops, "here to here and then here to here", that reaches the end through small goals.
- FA²STR split into an upfront half (F, A, A) and an emergent half (S, T, R).

## Notable quotes
- "You've made an upfront design decision."
- "Take one example, write it as English, make that your it statement."
- "All of what is happening here is happening within your brain. It's not happening within the code to be read as a story."
- "You've made a lot of guesses at one time."
- "If you just chose one at a time, you can allow the mechanism of the feedback loop to present to you what you need at that time."
- "Don't try to do it all in one swift movement."
- "Allow the tool to be doing the heavy lifting, which is to make the small guesses and lead with that."

## Cross-references
- Lesson 27 / 52 (FA²STR; upfront & emergent design at the stateless guess point)
- Lesson 15 (Essential: Feedback loop, guesses and guess points)
- Lesson 60 (TPP table)
- Lesson 62 (Boolean Calculator review #1, the emergent contrast)
- Lesson 34 (book recommendations; *A Philosophy of Software Design*)

## Fluff skipped
Greeting, spelling nitpick waived, note about upcoming content release and stateful assignments.

## AI-era relevance hint
- AI agents naturally produce "upfront" one-shot solutions like this one. Reviewing them needs the skill of asking for a step-by-step, one-guess-at-a-time path.
- "Design it twice" is cheap with agents. Generate an upfront solution, then drive an emergent re-derivation and compare.
- If the reasoning isn't in the commits, nobody (human or AI reviewer) can give meaningful feedback on the design path.

## Coverage proof
- Lines read: 91 / 91
- Final line (verbatim): "job. Keep on plugging through your assignments and I will see you in the next one. All right."
