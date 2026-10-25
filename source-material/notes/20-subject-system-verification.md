# Lesson 20 — Physical Essential: Subject/System Verification
- **Source file:** 20) Physical Essential SubjectSystem Verification.txt
- **Category:** essential-physical
- **Topics:** testing, subject-under-test, result-verification, state-verification, communication-verification, indirect-inputs, indirect-outputs, test-doubles, mocks, stubs, fakes, spies, high-value-unit-tests, high-value-integration-tests, E2E, acceptance-tests, outside-in, feedback-loop, deployment-pipeline

## Summary
Subject/system verification is the essential of using tests to place a boundary around the thing you want to verify and check whether it helps achieve a goal. It follows from the metaphysical essential that everything is a guess (the feedback loop). Khalil treats the application as nested input/output systems, decomposed via vertical slicing and horizontal layers, so you can isolate specific parts to test. He presents three types of verification — result, state, and communication — with increasing complexity. The most valuable thing to test is features (customer value); high-value unit and integration tests let you test features strategically (fast vs slow tests in a pipeline). Roadmap spans manual testing in Code First to outside-in, test-driven work with FA²STR in Value First.

## Core ideas
- The application is a set of input/output systems — the vertical-slice diagram turned on its side, decomposed into horizontal layers/levels of abstraction that correspond to concerns (infrastructure, application, domain...).
- Even at Code First, adopt this language/classification — it enables decomposing problems and placing boundaries to isolate parts to test. Hence the name *system or subject* verification.
- **Why write tests: everything we're doing is a guess** (metaphysical essential — the feedback loop). You can have a clear theoretical picture but still must physically make it happen; like pursuing goals in life, you hit challenges, setbacks, problems.
- The essential = placing a boundary around the thing to verify, to tell whether it helps achieve a goal.
- Testing is huge (many test types, techniques, tools); developers struggle because it's treated as an afterthought instead of foundational.
- Three verification types (see framework below).
- Result and state verification are often combined, even in the same test — "completely fine."
- Composition → tree/Russian-doll/onion of abstractions → input/output systems have dependencies → **indirect inputs and indirect outputs**.
- Choosing the boundary defines the subject: to verify "send welcome email" after `createUser`, the subject must include the infrastructure to save the event, communicate `UserCreated` to the mailing module/service, and a spy/observation that the mail service does its work in response.
- **Most valuable thing to test = what's most valuable to the customer = features.**
- Test types: unit, E2E (familiar); integration (confusing but good). Course introduces **high-value unit tests** and **high-value integration tests** to test features strategically.
- Strategy: in a deployment pipeline some tests must run very fast, some can be slower — but the fast ones should also be incredibly valuable.
- Guess points: verification is primarily physical; you can test any physical system "all the way up to stateless" in various configurations.
  - Example A: back-end API with mobile, front-end, and desktop clients — to ensure API stability so changes don't break clients, test at the **incoming adapter**.
  - Example B: "a job posting cannot be edited after it's been alive for 48 hours" — verify deeper, in the **domain layer** (domain modeling layer).
- Integration tests ≈ tests that exercise some infrastructure plus parts of application and domain together (exact definition widely debated).
- "If we do it, we know it" (Khalil's old network engineering professor) — hence hands-on practice.
- Goal by Value First: drive work from the outside in using tests — "perhaps one of the most valuable things I can teach you in this course."

## Named frameworks / mental models
- **Subject/System Verification (physical essential)**
  - Purpose: bound and verify a chosen subject to get feedback on guesses.
  - Steps: (1) view app as I/O systems via slicing + layers; (2) choose boundary (subject under test); (3) pick verification type; (4) prioritize features/customer value; (5) balance fast vs slow tests strategically.
  - When to use: continuously — tests are foundational, not an afterthought.
- **3 Types of Verification**:
  1. **Result verification** — test inputs → outputs; environment unchanged. Simplest.
  2. **State verification** — load a model/system; no direct data-in/data-out, so inquire into the subject's internal state after acting.
  3. **Communication verification** — most complex (stubbing, mocking, faking); verify the subject properly communicates with its dependencies: indirect inputs (incoming data) and indirect outputs.
- **Boundary placement**: the subject under test = specific abstractions/components you include inside the boundary.
- **Fast vs valuable test strategy** in a deployment pipeline.
- **Outside-in, test-driven development via FA²STR** (Value First).

## Definitions
- **Subject/system verification** — using tests to place a boundary around the thing we want to verify to tell if it helps achieve a goal.
- **Result verification** — testing inputs and outputs only.
- **State verification** — acting on a loaded model/system and checking its internal state.
- **Communication verification** — verifying proper communication with indirect inputs and indirect outputs.
- **Indirect input** — data the subject gets from a dependency rather than directly (e.g. fetching the user from the database via a repo in `createUser`).
- **Indirect output** — effects the subject sends to dependencies (e.g. saving the user via the user repo; mail service).
- **Integration test** — (Khalil's working view) tests a little infrastructure plus parts of application and domain together; definition widely debated.
- **High-value unit tests / high-value integration tests** — tests that let us test features in strategic ways (detailed later).

## Rules & heuristics
- Test the features — what's most valuable to the customer — first.
- Choose the layer to test by the question: API stability for many clients → incoming adapter; business rule → domain layer.
- Fast tests should also be high-value tests.
- Combining result + state verification in one test is fine.
- With temporal decoupling, remove side-effects like mail sending from a use case's direct dependencies; if you still want to verify them, widen the boundary to include event infrastructure and spy on the mail service.
- Know testing basics before test infrastructure: think backwards, arrange-act-assert, manage complexity.

## Anti-patterns / mistakes called out
- Treating testing as an afterthought rather than foundational.
- Only being able to test via E2E (implied from previous lessons).
- Mail service as a direct dependency of create user (Khalil corrects his own diagram in light of temporal decoupling).

## Code discussed
- **Result verification**: function `isAPalindrome` ("is a palindrome"), testing that `"mom"` is a palindrome.
```ts
// reconstructed from narration
it('knows that "mom" is a palindrome', () => {
  expect(isAPalindrome('mom')).toBe(true);
});
```
- **State verification**: a simple `Student` class — load the model, act, then check internal state (specific members not narrated).
- **Communication verification**: `createUser` use case (function/class) with dependencies: user repo (indirect input: fetch user from DB; indirect output: save user on success) and mail service (send welcome email) — Khalil says he'd remove the mail service from this diagram due to temporal decoupling.
```ts
// reconstructed from narration (shape only; exact API not narrated)
// Subject: CreateUser
// Indirect input: userRepo fetch -> stubbed
// Indirect outputs: userRepo.save(user) -> verify called; 
//   (optionally) welcome email after UserCreated event -> spy on mail service
```

## Diagrams / visual models described
- Vertical-slice diagram turned on its side, showing input/output systems decomposed into horizontal abstraction layers.
- Large map of testing types/techniques/tools ("stuff I haven't even drawn here").
- Three verification diagrams: result (in → out), state (in → system internal state), communication (subject with "divots/gaps/sub-steps" where it talks to dependencies: indirect inputs & outputs).
- Boundary drawn around the subject under test (e.g. `createUser` + event infra + mail service).
- Guess points diagram: physical systems (incoming adapter, … up to stateless) testable in various configurations.

## Notable quotes
- "The reason why we write tests is because everything we're doing is a guess."
- "It's us placing a boundary around the thing we want to verify to be able to tell if it's going to help us achieve a goal."
- "A large reason why I think developers struggle with testing is because it's treated as more of an afterthought rather than something that is just foundational."
- "We want the tests that run really fast to be tests that are also incredibly valuable."
- "If we do it, we know it."
- "Drive our work from the outside in using tests."

## Cross-references
- Lesson 15 (Feedback Loop — guesses & guess points).
- Lessons 16–19 (Vertical Slicing, Horizontal Decoupling, Temporal Decoupling, Composition).
- Lesson 53 (3 Types of Verification: Result, State, Communication), Lesson 51 (Arrange-Act-Assert backwards / thinking backwards), Lesson 73 (hand-written spies), Lesson 64 (value-first integration testing).
- Lesson 25 (Deployment & Delivery — pipeline test speed), Lesson 27 (FA²STR).
- Phases: Code First (manual testing), Best Practice First (test infrastructure, E2E, acceptance tests front & back end from the UI [UOT] to the database), Pattern First (patterns + decoupling for most valuable tests), Responsibility First (pragmatic when-to-test), Value First ([nth looping] in FA²STR, outside-in).

## Fluff skipped
Greeting, rhetorical pause ("I'll let you think about it"), sign-off.

## AI-era relevance hint
- When agents write the code, tests are the human's primary verification instrument — choosing *what boundary* to verify is the judgment that matters.
- Communication verification (indirect outputs, side-effects) catches agent code that "returns the right thing" but fails to save/emit/notify.
- Fast + high-value tests make tight agent iteration loops safe.

## Coverage proof
- Lines read: 76 / 76
- Final line (verbatim): "leave the video right here. Let's go ahead and jump into the next one. And as always, to Mastery."
