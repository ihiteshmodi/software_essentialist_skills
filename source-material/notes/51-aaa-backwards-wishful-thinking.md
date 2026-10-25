# Lesson 51 — 2 Techniques to Defeat Overwhelm: Arrange-Act-Assert Backwards & Program By Wishful Thinking
- **Source file:** 51) 2 Techniques to Defeat Overwhelm Arrange-Act-Assert Backwards & Program By Wishful Thinking.txt
- **Category:** testing-practice
- **Topics:** arrange-act-assert, thinking-backwards, wishful-thinking, api-design, developer-experience, result-verification, password-validator, emergent-design, result-class, overwhelm

## Summary
When you face a new assignment (like the Password Validator) with anxiety and no clear starting point, start at the end. Write the **assert** first, then act, then arrange. Imagine the API already exists ("programming by wishful thinking") so you can feel out its design in real time. Khalil demonstrates this by writing the expected result object first (`result` boolean plus an `errors` array) and then letting a `validate` function emerge to return it. Benefits: clarity, fewer paths to the solution, less decision fatigue, fast feedback on API design, and design flaws exposed immediately. He also warns against copying his utility classes (e.g., the Result class); build your own via emergent design instead.

## Core ideas
- Overwhelm comes from not knowing how you'll make it work. Starting from where you are toward a vague end is hard. Starting at the end leaves fewer paths.
- "Vagueness does not compile." Get as clear as possible so you can get into flow.
- The Password Validator (passwords 5–15 chars, etc.) includes one line that asks for **API design**: return an object with a boolean result and an errors key holding an error message/type for every error that occurred.
- **Everything you write is an API for someone else**: code, project organization, test scripts. This mindset shift forces empathy. Is it clear? Will people hate it or get confused? People will get around abstractions they don't enjoy using.
- **Assert first:** Khalil took the most complex example and first wrote the expected object. He started with a single `error` key, reread the spec ("for all errors in occurrence", so there can be several), and switched to an array.
- This uses **result verification**, the subject verification form for the stateless level.
- **Programming by wishful thinking:** imagine the code exists, piece by piece, even though it won't compile yet. You feel out the API design in real time with very fast feedback. You don't have to wait 10–15 minutes writing arrange and act only to find at the assert that it won't work.
- At the stateless level, problems are simple enough to do FA²STR upfront design in your head. Wishful thinking is how you do it on the fly.
- **Don't copy utility classes** (Result class, Value Object, Entity) from Khalil's projects/blog. Students have copied the Result class and then complained about its API. Carve out your own minimal API through emergent design, safely and iteratively.
- Start with the hardest problem (most complex example) and the design is largely settled from the start.
- At other guess points, result verification won't be available. You'll need other verification types, which forces you to understand collaborations between abstractions. This is how TDD teaches OO design: "so much of design is just structuring out relationships properly".
- After the assert, write **act** and then **arrange**. The inline object literal then got abstracted into an encapsulated `validate` function that returns that shape, so the literal no longer needs to be spelled out in the test.

## Named frameworks / mental models
- **Arrange-Act-Assert backwards**
  - Purpose: defeat overwhelm, clarify the API and verification.
  - Steps: (1) Assert: write the expected output/verification. (2) Act: write the call that produces it. (3) Arrange: set up inputs.
  - When: starting any test/assignment, especially when unclear. Critical at higher guess points.
- **Programming by wishful thinking**
  - Purpose: design APIs in real time with fast feedback.
  - Steps: imagine the ideal call/object exists, write it as if real (non-compiling), judge whether you'd enjoy using it, then implement.
  - When: stateless-level problems (in-head design) and designing your own utilities.
- **Everything is an API for someone else** (mindset)
- **Design principles summary:** "Think backwards, start at the end" and "Clarify how you'll verify."

## Definitions
- **Programming by wishful thinking** — imagining the code already exists and writing it piece by piece as if real, even though it won't compile, to feel out the API design.
- **Result verification** — verifying the subject by its returned result. This is the form used at the stateless level.
- **API design** — designing the shape/usage of anything others (or you) will consume. Per Khalil, pretty much everything you write.

## Rules & heuristics
- Start at the end: assert → act → arrange.
- Start with the most complex example to settle the hard design early.
- Clarify how you'll verify before building anything.
- Design APIs you would enjoy using. If you don't like it, others won't either.
- Build your own utility classes via emergent design rather than copying.

## Anti-patterns / mistakes called out
- Starting at arrange and fumbling toward a vague solution, which causes cognitive strain and late discovery that the design doesn't work.
- Copying someone else's utility classes (e.g., the Result class) and then fighting their API.
- Designing APIs without empathy for their users. People will circumvent unpleasant abstractions.
- Building lots of things you probably won't need before clarifying verification.

## Code discussed
Password Validator test written backwards:
1. **Assert first**, using the most complex example: wrote the expected object with a boolean `result` key and an `errors` key.
2. Initially `errors` held one error message. After rereading "contains an error message or type for all errors in occurrence", it changed to an **array** of errors.
3. **Act:** the object found its way into an encapsulated `validate` function (name as narrated) that returns that shape.
4. **Arrange:** set up the password input.
5. Once the function existed, the object literal no longer needed to be written out inline in the test.

```ts
// reconstructed from narration (key names beyond result/errors, and error values, not given)
it("returns all errors for an invalid password", () => { // test name (inferred)
  // Arrange (written last)
  const password = "..."; // example value not given

  // Act (written second) — wishful thinking: validate() doesn't exist yet
  const output = validate(password);

  // Assert (written first)
  expect(output.result).toBe(false);
  expect(output.errors).toEqual([/* error message or type for each error */]);
});
```

- Referenced upcoming utilities: Result class (functional error handling), Value Object, Entity.

## Diagrams / visual models described
- The Password Validator spec with one line circled in red (the requirement about the returned object shape).
- Side-by-side comparison: the object spelled out inline vs abstracted behind `validate`. The inline version makes the API visible, while starting from an opaque call "you can't really read what it is you're trying to say".

## Notable quotes
- "Vagueness does not compile."
- "Every single time that you're writing code… is you designing an API for someone else to use."
- "People are going to find ways to… circumvent them if they find them not pleasurable to use."
- "What if it was real? Think about that."
- "Don't copy mine, just do your own."
- "So much of design is just structuring out relationships properly."
- "Think backwards, start at the end… clarify how you'll verify."

## Cross-references
- Lesson 52 (FA²STR at the stateless guess point)
- Lesson 53 (3 types of verification: result, state, communication)
- Lessons 54–55 (Password Validator demos)
- Lesson 75 (Key mental model: thinking backwards)
- Lesson 20 (Subject/system verification)

## Fluff skipped
Greeting and sign-off. Motivational framing about anxiety kept only as context.

## AI-era relevance hint
- Writing the assert/API shape first is the best prompt you can give an AI agent. It pins down the contract so generated code has a precise target.
- Judging whether an API is pleasant to use is a human skill. Agents will happily generate awkward APIs that satisfy the tests.
- Copy-pasted utilities (from agents or blogs) carry APIs you didn't design. Growing your own minimal version through TDD keeps them fitted to your needs.

## Coverage proof
- Lines read: 72 / 72
- Final line (verbatim): "next ones. Always to master it."
