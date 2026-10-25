# Lesson 73 — Action: Use Hand-Written Spies to Verify Indirect Outputs (Side-Effects)
- **Source file:** 73) Action Use Hand-Written Spies to Verify Indirect Outputs (Side-Effects).txt
- **Category:** testing-practice
- **Topics:** test-doubles, spies, fakes, mocking-libraries, hand-written-spy, indirect-outputs, side-effects, communication-verification, contracts, interfaces, rule-of-three

## Summary
Addendum to an assignment (step 5) after a student (Tony) felt something was off when using a mocking library to spy on a collaborator. Khalil clarifies there are two ways to implement test doubles — via a mocking library or hand-written — and updates the assignment to require a hand-written spy. He recommends just calling all of them "fakes" or "test doubles" because the spy/stub/mock taxonomy is confusing. A hand-written spy (e.g. a fake email service) plays two roles: it implements the real collaborator's contract and adds spy behavior (recording calls) for assertions.

## Core ideas
- Test doubles are confusing; a **test double is anything that stands in for the real one**.
- Two ways to implement test doubles:
  1. Using a mocking library (what the student did — "excellent").
  2. **Hand-written** — you write them yourself, implementing a contract.
- Assignment step 5 updated with "hand-written spy"; redo the library version as a hand-written spy "because I think you need to learn that. And we all need to learn that."
- Naming: stop arguing whether something is a spy or stub ("the category theory around whether it's a spy or stub") — call them **fakes** or **test doubles**; that's the common-denominator abstraction across implementations.
- Expected assertion style: `fakeEmailService.getTimesCalled(...)` passing a method name (he says e.g. the `save` method), or richer `getCallsTo(...)` to inspect calls.
- The fake must:
  - implement the **email service contract** (so it can stand in), and
  - add logic implementing the **spy behavior** (intercept/record calls).
- The fake plays **two roles**: the spy and the email service itself.
- There should be an **interface** for the email service.
- You could extract the spy behavior into its own contract, but wait — follow the **rule of three** first.

## Named frameworks / mental models
- **Hand-written spy = contract implementation + call recording**
  - Purpose: verify indirect outputs (side-effects) without a mocking library.
  - Components: collaborator interface; fake class implementing it; recording state; query methods (`getTimesCalled`, `getCallsTo`).
  - When: communication verification of side-effects (e.g. email sent).
- **Actor playing two roles** (RDD lens): fake = spy role + email-service role.
- **Rule of three** — don't abstract (e.g. a generic spy contract) until the third repetition.

## Definitions
- **Test double** — anything that stands in for the real one.
- **Hand-written spy** — a test double you write yourself, implementing the collaborator's contract plus logic to observe calls.
- **Fake** — Khalil's preferred umbrella name for test doubles regardless of spy/stub/mock flavor.

## Rules & heuristics
- Learn to write spies by hand, even if a mocking library works.
- Name doubles `fake...` (e.g. `fakeEmailService`) rather than agonizing over spy vs stub.
- Give the real collaborator an interface so the fake can implement it.
- Apply rule of three before extracting a shared spy contract.

## Anti-patterns / mistakes called out
- Relying only on mocking libraries without understanding what a spy is.
- Getting stuck on test-double taxonomy.

## Code discussed
- Student's version: mocking library used to spy on a collaborator (details not narrated).
- Expected hand-written version and assertion:
```ts
// reconstructed from narration (method names of EmailService inferred)
interface EmailService {
  sendEmail(to: string, body: string): Promise<void>; // (inferred)
}

class FakeEmailService implements EmailService {
  private calls: Record<string, unknown[][]> = {};

  async sendEmail(to: string, body: string): Promise<void> {
    this.record('sendEmail', [to, body]);
  }

  getTimesCalled(method: string): number {
    return (this.calls[method] ?? []).length;
  }

  getCallsTo(method: string): unknown[][] {
    return this.calls[method] ?? [];
  }

  private record(method: string, args: unknown[]) {
    (this.calls[method] ??= []).push(args);
  }
}

// assertion style narrated ("pass in a method like the save method")
expect(fakeEmailService.getTimesCalled('save')).toBe(1);
```

## Diagrams / visual models described
None (brief attempt to pull up a text file/code; not described).

## Notable quotes
- "A test double is just anything that stands in for the real one."
- "Just start calling these things fakes I would recommend or test doubles."
- "This fake email service is playing two roles."
- "You should have an interface for this."
- "I would follow the rule of three before you go and do that."

## Cross-references
- Lesson 20 (Subject/System Verification — indirect outputs, communication verification).
- Lesson 53 (3 Types of Verification: Result, State, Communication).
- Lesson 79 (Interfaces, contracts, actors playing roles).
- Lesson 18 (Temporal Decoupling — email as side-effect).

## Fluff skipped
Aborted "basic text file" demo; repeated "go ahead and execute that" outro.

## AI-era relevance hint
- Agents default to heavy mocking-library usage; hand-written fakes yield readable, refactor-resistant tests you can review.
- Knowing the fake must honor the real contract helps catch agent-written doubles that drift from production interfaces.

## Coverage proof
- Lines read: 23 / 23
- Final line (verbatim): "quick addendum to this. So let's go ahead and execute that. That's the quick addendum to this. Go ahead and execute that."
