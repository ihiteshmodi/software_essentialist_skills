# Lesson 44 — How & When to Commit in Red-Green-Refactor for Readability
- **Source file:** 44) How & When To Commit in Red-Green-Refactor For Readability.txt
- **Category:** testing-practice
- **Topics:** TDD, red-green-refactor, commit discipline, commit messages, fake it, FizzBuzz, readability for reviewers, rule of three

## Summary
Commits should make your work easy for reviewers to read. The default rule: **only commit on green**. Committing on red is like pausing Mario mid-jump over the flames, which is not a safe place to resume from. There are two reasons to commit on green: **new functionality** or **a refactoring** (structure change only), and the message should say which. Exception: in the **Emergent Design** section (the first assignments) you should commit on **every phase: red, green and refactor**, so reviewers can check your physical TDD mechanics.

## Core ideas
- Commits exist to make work **readable** for feedback.
- **Default: commit only on green.**
- **Exception (Emergent Design section)**: commit on red, green and refactor to show the mechanics. Afterwards, go back to commit-on-green only.
- Two reasons to commit on green:
  1. **New functionality added**
  2. **Refactoring**: no new functionality, only changes to the structure of the code
- Refactor when you've seen duplication **three times** ("you're probably going to want to refactor. In fact, you should").

## Named frameworks / mental models
- **Mario analogy**: committing on red = pausing mid-jump over lava. Not a safe save point. Green = standing on a platform.
- **Two commit types**: `new` (functionality) vs `refactor`/`design`/`improvements` (transformation). The exact wording doesn't matter; the intent must be clear.
- **Fake it** (one of several ways to make a test pass): return the simplest thing possible.
- **Flip the switch**: after going green, deliberately break the code to see red, confirming the test is legit, then restore it.

## Definitions
- **Refactoring** — a transformation that changes the structure of code without adding new functionality.
- **Fake it strategy** — make the test pass by returning the simplest hardcoded value.

## Rules & heuristics
- Never commit on red (except the Emergent Design section, where you commit on every phase).
- Label each commit as new functionality or refactor.
- Verify a new green test can fail (flip the switch).
- Rule of three for duplication → refactor.
- Start with the easiest test you can find in the requirements (e.g., "outputs as a string" → returns a string).

## Anti-patterns / mistakes called out
- Committing on red makes history unsafe and hard to review.
- Commit messages that don't communicate whether behavior changed or only structure.

## Code discussed
- Problem statement: "Write a function that takes numbers from 1 to 100 and outputs them as a string", with multiples of three etc.
- The easiest first test comes from "outputs them as a string".
- Run tests: `npm run test dev` (watch mode). It starts red.
- Test **"returns a string"**: `expect(typeof fizzbuzz(5)).toBe('string')`. It fails because `fizzbuzz` doesn't exist.
- Implementation: fake it by returning a string. Import it into the test, then green.
- Flip the switch: make it return a non-string, see red, then revert.
- Commits:

```bash
# reconstructed from narration (exact message format flexible)
git add .
git commit -m "new: fizzbuzz returns a string"
# later, after refactoring duplication:
git commit -m "refactor: ..."   # or "design: ..." / "improvements: ..."
```

```ts
// reconstructed from narration
describe('fizzbuzz', () => {
  it('returns a string', () => {
    expect(typeof fizzbuzz(5)).toBe('string');
  });
});

// fake it
export function fizzbuzz(n: number): string {
  return '';
}
```

## Diagrams / visual models described
- Mario platform stage: platforms = green states, flames = red. A pause mid-jump = a commit on red.

## Notable quotes
- "You're going to want to commit in a way such that it makes the work that you've done really easy to read."
- "We do not want to commit when we're in red."
- "It's not a very safe place to be for you to unpause the game."
- "Two reasons we would commit when we're in green... either we've added new functionality or we have done a refactoring."
- "All that we're doing here is changing the structure of the code."

## Cross-references
- Lesson 43 (branch per attempt), Lesson 41 (reviewing commit by commit), Lesson 45 (Demo FizzBuzz), Lessons 46–47 (FizzBuzz reviews)
- Emergent Design section; Kent Beck TDD patterns such as "fake it" (inferred)

## Fluff skipped
Brief intro and sign-off.

## AI-era relevance hint
- Small, green-only commits labeled as behavior vs structure make AI-generated changes auditable and easy to revert.
- Separating refactor commits from feature commits lets reviewers (or agents) verify that refactors don't change behavior.
- "Flip the switch" guards against AI-written tests that pass vacuously.

## Coverage proof
- Lines read: 33 / 33
- Final line (verbatim): "plugging through your TD assignments. See you in the next one."
