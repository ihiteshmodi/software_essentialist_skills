# Lesson 50 — Discussion: Palindrome Review #2
- **Source file:** 50) Discussion Palindrome Review #2.txt
- **Category:** kata-review
- **Topics:** code-review, palindrome, pure-functions, imperative-vs-functional, it.each, test-readability, commit-size, commit-message-phase, error-throwing, comments

## Summary
Khalil reviews a Palindrome PR whose final tests are very readable. They use `describe` + `it.each` groups for palindromes, non-palindromes (books, movies, places), and non-string inputs that throw. The student asked whether the solution was a pure function. Khalil's answer: it has no side effects, but because it declares a local `const` (introducing state via line-by-line imperative execution), it's functional and not pure by his definition. On mechanics: the student started with a fake implementation before red, the second commit was far too big, commit messages lacked phase labels, and an unnecessary comment should be removed. He recommends redoing the kata to practise strict red-green-refactor.

## Core ideas
- **Pure function, as Khalil defines it:** same input gives same output, no side effects, *and* no variable declarations or assignments. You return immediately and chain/pipe. Using `const` introduces state (a local variable), and imperative line-by-line execution means the program tracks "where you are", which is state.
  - Pure functions are evaluated like piping or mathematical equations ("railroad oriented programming").
  - The student's solution: no side effects against collaborators, so it's an input/output system. "It's functional, but it's not a pure function."
  - (Annotator note, not from transcript: many FP references treat local immutable bindings as compatible with purity. This is Khalil's stricter framing.)
- Test readability praised: reading the tests alone tells you "where we're going".
- Normally go to red first, then implement. Starting with a fake implementation skips that. It's OK for trivial problems, but don't skip it for complex ones.
- **Commit size trade-off:** one example at a time is slower but simpler. Many examples at once is faster but more complex. "How much complexity can you tolerate?" Ideally do one thing and one example at a time. FA²STR will require one example at a time because the next guess point's problems are more complex.
- Starting with `it.each` isn't necessarily bad, but don't do two groups at once.
- Commit messages should show the phase: red, green or refactor.
- One commit that adds an example and makes it pass (green→red→green) breaks the emergent-design focus.
- If you've already mastered red-green-refactor elsewhere, evaluate the submission differently. Otherwise redo it with commits on red, green and refactor.
- Remove unnecessary comments.

## Named frameworks / mental models
- **Imperative vs pure (piping)**: imperative code runs line by line with implicit state (current line, local variables). Pure code is evaluated as a pipeline of functions with no declarations.
- **Commit-size complexity tolerance**: pick the step size by how much complexity you can tolerate. Default to one example per commit.

## Definitions
- **Pure function** (course definition) — same input → same output, no side effects, and no variable declarations/assignments. It returns immediately, chaining into other functions.
- **Side effect** (as used) — creating state, e.g., using the assignment operation, or acting on external collaborators.
- **Railroad oriented programming / piping** — composing functions like pipes, similar to mathematical equations.

## Rules & heuristics
- Red first, then implement, especially on complex problems.
- Keep commits small, one example each.
- Label the phase in every commit message.
- Put the "throws when not a string" feature in its own commit, separate from the other examples.
- Delete comments that don't explain why.

## Anti-patterns / mistakes called out
- "Add module with fake implementation to get started" before any red test.
- Second commit too big: "Add capability to normalize parameter value to lowercase, reverse it, compare it" plus all the examples at once.
- Several `it.each` groups introduced in the same commit.
- Commit messages without red/green/refactor labels.
- Adding an example and making it pass in one commit.
- Unnecessary code comment.

## Code discussed
**Student's final tests (reviewed first):**
- `describe` / `it.each` palindromes (including books, movies, places): "should return true when the parameter value is a palindrome".
- `it.each` non-palindromes: "when the parameter value is not a palindrome" → `toBe(false)`.
- Non-string types: "should throw an error if the parameter is not a string", expecting a specific error message of the form "The argument type of [type volume] is …" (exact text unclear in transcript).
- Couldn't test `bigint` because of the TypeScript target setting ("targeting ES 2020 or greater" [as transcribed]).

**Commits:**
1. "Add module with fake implementation to get started" (skipped red).
2. "Add capability to normalize parameter value to lowercase, reverse it, compare it", with all examples (too big, and the student admitted it).
3. "Add feature to throw an error when the argument type is not a string" (many examples at once. Make the throw one commit and the rest separate).

**Solution:** normalizes (e.g., `const normalizedValue = …`), reverses, compares. Clean, but not pure because of the local `const`.

```ts
// reconstructed from narration (student-style, "functional but not pure" per Khalil)
export function isPalindrome(value: unknown): boolean {
  if (typeof value !== "string") throw new Error("..."); // message not fully audible
  const normalizedValue = value.toLowerCase(); // further normalization (inferred)
  return normalizedValue === normalizedValue.split("").reverse().join("");
}
```

```ts
// reconstructed from narration — Khalil's "pure" framing: no declarations, just a pipeline
const reverse = (s: string) => s.split("").reverse().join("");
const isPalindrome = (s: string): boolean =>
  s.toLowerCase() === reverse(s.toLowerCase()); // (inferred illustration)
```

```ts
// reconstructed from narration — test structure praised
describe("palindrome checker", () => {
  it.each(["mom" /* , books, movies, places ... */])(
    "should return true when the parameter value is a palindrome",
    (value) => expect(isPalindrome(value)).toBe(true)
  );
  it.each(["dog" /* ... */])(
    "should return false when the parameter value is not a palindrome",
    (value) => expect(isPalindrome(value)).toBe(false)
  );
  it("should throw an error if the parameter is not a string", () => {
    expect(() => isPalindrome(123 as any)).toThrow();
  });
});
```

## Diagrams / visual models described
None

## Notable quotes
- "As soon as you use the const keyword, you've just introduced state."
- "It's functional, but it's not a pure function."
- "Pure functions do not even have the idea or essence or element of going line by line and knowing where you are in the program."
- "How much complexity can you tolerate in the amount of examples and the amount you take on in one of these commits?"
- "I want to see in your commit messages… which phase you're on."
- "That comment is unnecessary. So get rid of that."

## Cross-references
- Lesson 48 (Comments explain why only)
- Lesson 49 (Palindrome review #1: one example at a time)
- Lesson 52 (FA²STR requires one example at a time)
- Lesson 44 (Commit phases)

## Fluff skipped
Greeting, "water break" aside, sign-off.

## AI-era relevance hint
- Knowing what "pure" really buys you (no side effects, testability) helps you judge whether AI-generated "functional" code is actually safe to call anywhere.
- Asking agents for phase-labelled, one-example commits keeps generated history auditable.

## Coverage proof
- Lines read: 55 / 55
- Final line (verbatim): "everyone else watching this, that's it for the video. So as always to mastery, let's get into the next one."
