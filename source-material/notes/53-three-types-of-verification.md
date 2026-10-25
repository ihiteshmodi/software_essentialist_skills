# Lesson 53 — System/Subject Verification: 3 Types of Verification (Result, State, Communication)
- **Source file:** 53) SystemSubject Verification 3 Types of Verification (Result, State, Communication).txt
- **Category:** testing-practice
- **Topics:** subject-verification, result-verification, state-verification, communication-verification, subject-under-test, systems-thinking, data-behavior-namespace, stateless-guess-point, assert

## Summary
Khalil introduces subject verification, which he calls one of the first physical essentials. It answers a question many developers find hard: how to verify a test, meaning the assert part. He builds it from systems thinking (input, process/model, output, environment) and a first-principles view that everything is data, behavior and namespaces. At the stateless guess point you only look at the output data. That is **result verification**, the first of three types. The other two are **state verification** (query the object's state after the operation) and **communication verification** (check calls to external collaborators without making real network calls). He only hints at those for now. Which verification you need depends on the guess point and the relationships that exist there.

## Core ideas
- Verifying tests (the assert) is one of the biggest challenges in testing. It is easy at the stateless level and gets harder at later guess points.
- Current assert tools at the stateless level: `toBeTruthy`, `toContain`, `toHaveLength`, `toBeLessThan` and similar. All of them look only at the result.
- Systems-thinking mapping of a stateless test (palindrome example):
  - Input: `"mom"`
  - Model/process: palindrome checker, `isPalindrome` method (lowercase, remove spaces, compare)
  - Output: `true`, the result
  - Environment: the stateless guess point
- First principles: everything is **data, behavior and namespaces**, just arranged in different ways.
  - Data: input data comes in from the world, output data comes out of the model.
  - Behavior: the model's operations on that data, plus any state changes (later).
  - Namespace: the model's name (e.g., "palindrome checker").
- Result verification ignores the internal processes. If the output is correct, the model is correct.
- Object-oriented apps are systems of collaborating objects/roles that send each other messages. Relationships (how things collaborate and connect) are the structural side of design. You need to structure things so specific parts can be tested.
- The part you test is the **subject under test**. At the stateless guess point it is just a function or a stateless class with a static method.
- Each guess point needs different forms of subject verification:
  - Stateless: only result verification.
  - End-to-end: probably only one type, and you probably don't want some of the others. He doesn't say why yet but calls it "a fact."
  - Application: often a mixture.
- Game example of a mixture: check the result of an operation (result), query the game object's state (state), and check that the game called a notification service without making a real network call, which would slow tests down (communication).
- The relationships are inherent and look different at each guess point. At the stateless point the only relationship is data in to data out.
- The application guess point has more to test: edge cases, state changes across external services, more application logic, success and failure code paths. That calls for "much more rigorous verification tools," often mixed.
- For now, focus only on result verification at the stateless guess point. The topic comes back later and gives power across frontend, backend and desktop testing.

## Named frameworks / mental models
- **Subject Verification (3 types)**
  - Purpose: pick the right way to assert that a subject under test works.
  - Components:
    1. **Result verification**: assert on the output data only.
    2. **State verification**: query the subject's state after the operation.
    3. **Communication verification**: verify calls to external collaborators/services without making real calls.
  - When: depends on the guess point. Stateless uses result only. Application often uses a mix. End-to-end uses a restricted subset.
- **Systems thinking for tests**: inputs, processes/model, outputs, environment. Map each test onto it.
- **Data / Behavior / Namespace**: the first-principles building blocks of every problem across the system.

## Definitions
- **Subject verification** — how you verify that the subject under test works. The first physical essential covered here. Comes in three types: result, state, communication.
- **Result verification** — checking only the output data (the result) of the model, not its internal processes.
- **State verification** — querying the state of an object (e.g., the game object) after an operation.
- **Communication verification** — verifying that the subject called an external service (e.g., a notification service) without making real network calls.
- **Subject under test** — the part of the system of collaborating objects you want to test. At the stateless guess point, a function or a stateless class with a static method.
- **Data** — what comes in from the world and goes out of the model.
- **Behavior** — the model's operations on data, plus state changes later.
- **Namespace** — the name of the model (e.g., palindrome checker).

## Rules & heuristics
- At the stateless guess point, result verification is all you need.
- Pick the verification type(s) based on the guess point and the relationships present there.
- Structure code so specific parts (subjects) can be tested in isolation.
- Avoid real network calls in tests because they slow tests down. Use communication verification instead.

## Anti-patterns / mistakes called out
- Getting confused about how to verify (what to assert). Expected to become a real problem at higher guess points.
- Using certain verification types at the end-to-end guess point where they don't belong. Stated without explanation.
- Making real network calls to external services in tests.

## Code discussed
Palindrome example as a stateless system: input `"mom"` into `PalindromeChecker.isPalindrome` gives `true`, verified with result verification.

```ts
// reconstructed from narration
it("knows that 'mom' is a palindrome", () => { // test name (inferred)
  expect(PalindromeChecker.isPalindrome("mom")).toBeTruthy();
});
```

No other code.

## Diagrams / visual models described
- Systems-thinking diagram: input → model/processes → output, inside an environment. Mapped to palindrome: "mom" → palindrome checker → true, environment = stateless guess point.
- Data/behavior/namespace mapped onto the same diagram: data in/out, behavior = the processes, namespace = model name.
- Stateless guess point diagram with the whole model boxed as the subject under test.
- Game example diagram showing all three verifications: result out, game state queried, call to the notification service.
- Application guess point diagram: more complex data shape, external services, more relationships.

## Notable quotes
- "At a first principles level, everything we're dealing with is just data, behavior and namespaces."
- "All we're concerned about is the output data to know that this thing is working correctly."
- "We call the part that we want to test a subject under test."
- "Each guess point requires different forms of subject verification."
- "These relationships are inherent. We can't really do much about this, but these relationships do occur and they look different at each of the guess points."
- "We're going to need much more rigorous verification tools."

## Cross-references
- Lesson 9 (Systems thinking)
- Lesson 20 (Physical Essential: Subject/System Verification)
- Lessons 49–50 (Palindrome reviews, the example used)
- Lesson 52 (FA²STR at the stateless guess point)
- Lesson 73 (Hand-written spies for indirect outputs, i.e. communication verification)
- Lesson 74 (Stateful guess point, state verification)

## Fluff skipped
Greeting and "see you in the next one" sign-off.

## AI-era relevance hint
- AI-generated tests often check the wrong thing, like internals or mocks everywhere. Knowing which verification type fits each layer helps you judge whether a generated test really proves behavior.
- Communication verification (no real network calls) keeps agent-written test suites fast and deterministic.
- Mapping tests to input/model/output makes it quick to review a test's intent.

## Coverage proof
- Lines read: 57 / 57
- Final line (verbatim): "points. So with that being said, I'll leave the video right here. Continue to the next modules. I'll see you in the next one. And as always, it's Master."
