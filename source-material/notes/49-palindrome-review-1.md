# Lesson 49 — Discussion: Palindrome Review #1
- **Source file:** 49) Discussion Palindrome Review #1.txt
- **Category:** kata-review
- **Topics:** code-review, palindrome, red-for-right-reason, commit-per-phase, one-example-at-a-time, refactor-vs-transformation, test-naming, rule-of-three, guess-points

## Summary
Khalil reviews a Palindrome PR, looking at the end result first (good tests: mom, dog, racecar, etc.) and then critiquing the commit-by-commit mechanics. Key feedback: the first red commit failed for the wrong reason, a compile error because `palindrome` didn't exist yet. The student added multiple examples in one step. One commit mixed a refactor with a new transformation. The refactor was done without duplication appearing three times, though it did look cleaner. He stresses that these micro-mechanics matter much more at higher guess points (outgoing adapters, end-to-end).

## Core ideas
- Assignment: a palindrome checker that detects words (mom, wow are palindromes; bill is not) and phrases ("Was it a rat I saw?", "Never odd or even"). The grading checklist adds more examples and considerations.
- If the end-result solution is good but misses checklist examples, just add those examples next.
- **Commit on red only when you're red for the right reason**, meaning a logical failure, not a compilation error. Create the exported function stub in the red commit. The next commit should make it green for the right reason.
- This section is about the tiny micro-commits and decisions. Later you'll mostly commit on green, but the skill of tiny moves is still needed at times.
- Avoid double negatives in test names.
- **One example at a time.** Adding several at once can push you into doing work for two different reasons to make it pass, which makes transformations harder. It's tolerable on simple string problems but painful higher up. His example: a Discord integration with three tests at once, at the outgoing-adapter or end-to-end/system guess point.
- **Refactor XOR transformation per step.** Start on green, add one example, save, and see where you are (red?). If you want to refactor, only refactor. Don't do both in one step.
- Refactor only when duplication appears three times. The student's split/join cleanup didn't meet that bar, but it was cleaner, so Khalil accepted it.

## Named frameworks / mental models
- **Red-green-refactor micro-mechanics**: red (logical failure, commit) → green (minimum transformation, commit) → refactor (only on rule of three, commit). Each step does one kind of change.
- **Guess points ladder** (referenced): stateless (simple) → … → outgoing adapter → end-to-end/system. Discipline pays off more as you go up.

## Definitions
- **Red for the right reason** — the test fails because the logic is incorrect, not because it doesn't compile.
- **Transformation** — a production code change to go from red to green (vs a refactor, which keeps green→green).

## Rules & heuristics
- Commit on red only when the failure is logical.
- Create the function stub (e.g., `export function palindrome`) as part of the red step.
- One example per step. Bend this rule only on trivial problems, knowing the risk.
- A step is either a refactor or a new transformation, never both.
- Name tests positively, e.g., "knows dog is not a palindrome", not "does not know dog is not a palindrome".
- Use concrete examples in test names (praised: "knows that mom is a palindrome").

## Anti-patterns / mistakes called out
- Red commit whose test references a not-yet-existing `palindrome` function (a compile failure).
- Creating the function *and* returning `true` in the next commit. The stub belonged in the previous red commit.
- A double-negative test name.
- Adding two tests/examples in one step.
- A commit that both adds new behavior (handling spaces) and refactors.
- Refactoring without the rule-of-three trigger (minor, accepted).

## Code discussed
**End result tests (seen first):** palindrome checker knows "mom" is a palindrome, knows "dog" is not, "racecar"/"race car", and other cases. Khalil judged them good.

**Commit walk-through:**
1. **Red:** "knows that mom is a palindrome". Concrete example praised, but `palindrome` didn't exist, so it was red for the wrong reason.
2. "Created palindrome function that returns true". The stub creation should have been in commit 1. Also a test the student had earlier was removed.
3. **Red:** "does not know dog is not a palindrome". Rename to "knows dog is not a palindrome". It fails as expected.
4. **Green:** split-string based implementation. Khalil likes its expressiveness.
5. Added two tests at once, which breaks the one-at-a-time rule (OK on this trivial problem, with a warning).
6. **Green:** smallest transformation, lowercasing everything. Fine.
7. Handling empty spaces. That commit mixed a new transformation and a refactor. Feedback: do one or the other.
8. **Refactor:** consolidated `split`/`join` usage into one chain. Cleaner, though there was no rule-of-three duplication.

```ts
// reconstructed from narration (exact code not read out; shape inferred)
export function palindrome(input: string): boolean {
  const normalized = input.toLowerCase().split(" ").join("");
  return normalized === normalized.split("").reverse().join("");
}
```

```ts
// reconstructed from narration — naming feedback
it("knows that mom is a palindrome", () => {
  expect(palindrome("mom")).toBe(true);
});
it("knows dog is not a palindrome", () => { // not "does not know dog is not…"
  expect(palindrome("dog")).toBe(false);
});
```

## Diagrams / visual models described
- On screen: problem description, grading checklist, and review list filtered by "level one stateless" and searched "palin".

## Notable quotes
- "You only want to commit on red when you're in red for the right reason."
- "It's just all about those tiny little micro commits and decisions."
- "Jumping outside of the rule could introduce problems for you later on down the road."
- "Do either a refactor or do a new transformation moving forward. Don't do both."
- "This skill, this mechanical process, red, green, refactor is huge."

## Cross-references
- Lesson 44 (When to commit in red-green-refactor)
- Lesson 45 (FizzBuzz demo: red for the right reason)
- Lesson 50 (Palindrome review #2)
- Lessons 15/13 (guess points, feedback loop)

## Fluff skipped
Greeting, navigating the review list, sign-off.

## AI-era relevance hint
- Agents often bundle a refactor with new behavior in one diff. "Refactor XOR transformation" is a good review rule for AI PRs.
- At higher guess points (integrations, E2E), letting an agent add many examples at once makes failures hard to diagnose. One example per step keeps the feedback loop tight.

## Coverage proof
- Lines read: 61 / 61
- Final line (verbatim): "going to get more and more complex as we keep going. So I'll leave the video right there. And as always, I'll see you in the next one to mastery."
