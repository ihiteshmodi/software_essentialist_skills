# Lesson 62 — Discussion: Boolean Calculator Review #1
- **Source file:** 62)  Discussion Boolean Calculator Review #1.txt
- **Category:** kata-review
- **Topics:** boolean-calculator, simplest-transformation, obvious-implementation, fake-it, defensive-coding, describe-grouping, categorical-thinking, swim-lanes, triangulation, rule-of-three, one-test-at-a-time, nested-describes, metacognition, ubiquitous-language, test-naming, levels-of-abstraction, essential-complexity

## Summary
Khalil reviews Johan Char's [spelling uncertain] Boolean Calculator, which he calls "one of the best ones I've seen so far". He praises grouping tests into describe "swim lanes" (incorrect input, TRUE/FALSE, NOT, AND) as categorical thinking. He also praises the simple transformations: return `true`, then evaluate the condition inline instead of adding an `if`. Things get harder at `AND`. Two tests get added in one batch, deeply nested describes make the test hard to parse, and vague words like "parts" and "one/two/three" show that a ubiquitous language is missing. He recommends leading with a concrete example instead of nested context, naming concepts (tokens, expressions, values), and refactoring test names for meaning. The final code is complex but elegant and matches the essential complexity of the problem.

## Core ideas
- Grouping tests by context (describe blocks) is **categorical thinking**. It makes it easy to know where future tests go and to navigate the file.
- Every keystroke is a tiny metacognitive decision, and those decisions matter.
- The first test (invalid input → throw) uses obvious implementation, which is fine because it's already simple. Khalil calls it "a great first defensive coding commit".
- Even with foresight, do the simplest thing (`return true`). Jumping ahead takes you off the guess you're currently making. "Lead with the guess."
- Evaluating the condition inline (e.g., `return input === "TRUE"`) is a simpler transformation than an `if` statement (inferred exact code).
- Swim lanes let you **triangulate** inside each category with more examples.
- Seeing similar code twice isn't enough to refactor. Wait for three (rule of three).
- Introduce **one test at a time**. Two tests in one red-green-refactor loop means two purposes in one act.
- Nested describe context ("when AND is provided › when no negation provided › when all parts true › should return true") puts **psychic entropy** into the reader. Leading with a concrete example (`TRUE AND TRUE`) is easier.
- When the code maps clauses to numbered parts (one, two, three), name those concepts instead.
- A ubiquitous language is needed: is it a *part*, a *token*, a *value*, an *expression*? "What is a part really?"
- A programmer is an abstraction designer, "creating an entire world inside of your computer" and describing its metaphysics.
- Test names get refactored too. You can refactor meaning as well.
- Pushing complexity into deeper layers (tests → facing production code → private helpers) is good. Essential complexity has to go somewhere.
- Look at many different submissions. You learn a lot from other attempts.

## Named frameworks / mental models
- **Categorical thinking / swim lanes in tests**
  - Purpose: organize tests by context so each group can be extended and triangulated.
  - Components: a `describe` per category (incorrect input, TRUE/FALSE, NOT, AND, …), with examples inside.
  - When: whenever tests share context. Place new tests in the matching lane.
- **Triangulation within a lane**: add more examples in the same category to force generalization.
- **Rule of three**: refactor duplication only at the third occurrence.
- **Metacognition / psychic entropy**: measure a test by how much complexity it puts into the reader's head. Prefer concrete examples over nested conditional context.
- **Ubiquitous language**: name the concepts the code manipulates (tokens, values, expressions) consistently in tests and code.
- **Layers of abstraction**: test code (highest) → public production code → deeper private helpers ("the weeds").

## Definitions
- **Obvious implementation** — writing the real logic directly. It's fine here because throwing an error is already the simplest option.
- **Psychic entropy** — how much complexity you put into someone's brain as they try to parse what you did.
- **Abstraction designer** — what every programmer is: someone who describes the reality (metaphysics) of what things are inside the computer.

## Rules & heuristics
- Phrase test contexts in plain English: "when input is not correct" rather than "when not correct inputs".
- Do the simplest possible thing even if you can see further ahead.
- Prefer inline evaluation of a condition over introducing an `if`.
- One test per red-green-refactor loop. Aim for this even if two tests feel cohesive.
- Lead with the concrete example in the test name or structure rather than layers of nested conditions.
- Keep test descriptions "as close to English as possible", even at the cost of terseness.
- Name mappings and concepts rather than numbering them.
- Refactor test names and meaning, not just code.
- Push complexity down into deeper layers so the public layer stays declarative.

## Anti-patterns / mistakes called out
- Awkward context names ("when not correct inputs").
- Adding two tests in one batch (two purposes in one loop).
- Deep nesting of describes that encodes conditions ("when negation not provided › when all parts true with not in one"), which is hard to parse.
- Vague terms ("parts", "in one") and numeric positional thinking with no names.
- Test names that are hard to read, e.g. "when negation is not provided when all parts true with NOT in one should return false".

## Code discussed
**Test structure (describe swim lanes):**
- "when not correct inputs" (suggested rename: "when input is not correct") → "should throw an error". Implementation: obvious implementation, throw an error.
- "should return true" when the input is `TRUE` → implementation: `return true` (simplest).
- "should return false" when the input is `FALSE` → the transformation evaluates the condition inline instead of using an `if`.
- NOT: "the calculator should return negation value in case NOT is provided" / "when NOT is provided should return the opposite value". Implementation: simplest check for "input includes NOT". Similar code appeared twice, so no refactor yet (rule of three).
- Tests are split into Arrange/Act/Assert and are easy to read.

**AND stage (two tests at once):**
- Nested: "when AND is provided" › "when no negation (NOT) provided" › "when all parts true" › "should return true" (`TRUE AND TRUE`). Also "when all parts not true should return false" (`TRUE AND FALSE`).
- Khalil's suggestion: start from the example itself (`TRUE AND TRUE`) instead of this nested setup.
- Implementation: split the input on `AND`, go through each resulting value/token (TRUE/FALSE), and return true only when all are true (inferred `every`).
- Refactor commit: introduced `private transformValuesToExpression` and input parsing. Declarative words like *values* and *expressions* began to appear, which Khalil welcomed.

**Negation inside AND:**
- Test: "when negation is provided › when all parts true with NOT in one › should return false" (`TRUE AND NOT TRUE` → false). Khalil found it hard to read and asked for plainer English and a named concept.
- `checkNegation`: checks whether the negation token exists in at least one part. It's a good approach, but the description should be revised, e.g. "if the negation token exists".
- The final code (parsing the input, etc.) looks complex "to the untrained eye", but Khalil called it elegant and matched to the problem's complexity. It might get "messier, hairier" further down.

```ts
// reconstructed from narration
describe('boolean calculator', () => {
  describe('when input is not correct', () => {
    it('should throw an error', () => {
      expect(() => calculator.evaluate('garbage')).toThrow();
    });
  });

  it('returns true for TRUE', () => {
    // arrange
    const input = 'TRUE';
    // act
    const result = calculator.evaluate(input);
    // assert
    expect(result).toBe(true);
  });

  // Khalil's suggestion: lead with the example rather than nested context
  it('returns true for TRUE AND TRUE', () => { /* ... */ });
  it('returns false for TRUE AND NOT TRUE', () => { /* ... */ });
});
```

```ts
// reconstructed from narration
// Simpler transformation than an if statement:
evaluate(input: string): boolean {
  return input === 'TRUE';
}
```

## Diagrams / visual models described
- None beyond the verbal "swim lanes" of describe blocks and the layers of abstraction (tests → public code → weeds).

## Notable quotes
- "It's the type of categorical thinking we want to be doing."
- "You want to constantly be leading with the guess and doing the simplest possible thing."
- "Ideally we want to introduce one at a time."
- "It's always going to be easier to just use an example."
- "What is a part really?"
- "If you're a programmer, you're also an abstraction designer."
- "We refactor the tests and we can refactor meaning as well."
- "That complexity needs to go somewhere and it's essential."

## Cross-references
- Lesson 60 (TPP table, the simplest transformations)
- Lesson 63 (Boolean Calculator review #2, the upfront-design contrast)
- Lesson 14 (Essential: Abstraction), Lesson 22 (Domain discovery, ubiquitous language)
- Lesson 51 (AAA, wishful thinking)
- Lesson 45 (rule of three, fake it)

## Fluff skipped
Greeting, tangent about "quantum moments" of cognition, promises about upcoming content.

## AI-era relevance hint
- Agents tend to add several behaviors per change. Enforcing "one test, one purpose per loop" keeps generated diffs reviewable.
- Naming concepts (token, expression, value) is domain judgment agents can't infer reliably. A human-owned ubiquitous language keeps generated code coherent.
- Measuring tests by the reader's "psychic entropy" matters even more when humans mostly read and review, rather than write, the code.

## Coverage proof
- Lines read: 90 / 90
- Final line (verbatim): "be looking at a lot of these different attempts because you're going to learn a lot by looking at that as well. All right, let's do that."
