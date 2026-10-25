# Lesson 77 — Demo: FeedBook — Implementing the PreReaderInvite Domain Object
- **Source file:** 77) Demo FeedBook вЂ” Implementing the PreReaderInvite Domain Object.txt
- **Category:** kata-demo
- **Topics:** fa2str, stateful-guess-point, domain-modeling, state-machine, entity, value-object, domain-events, result-pattern, unions, discriminated-union, guard-pattern, domain-error, validation-error, missing-value-error, static-factory-method, private-constructor, props-pattern, programming-by-wishful-thinking, aaa-backwards, tell-dont-ask, emergent-vs-upfront-design, rule-of-three, uuid-validation, typescript, jest

## Summary
Khalil live-codes the `PreReaderInvite` entity for the FeedBook domain. The goal is to turn the state machine from earlier lessons into a TDD'd domain object. He starts with pre-written `describe` blocks, one per transition (create = initial state, accept invite = intermediate transition), each with success and failure cases. He first wraps the create result in a classful `Result` object. Partway through he drops it as "way too confusing" and uses plain TypeScript unions instead (`PreReaderInvite | DomainError`). Two `Guard` utilities emerge from programming by wishful thinking: one checks that required values are present, the other returns the first `ValidationError`. Both converge on a `GuardResult` API with `hasErrors()` / `getFirstError()` (tell, don't ask). Validation lives in value objects (`PreReaderInviteId`, `AuthorId`, `PreReaderEmail`), not in the entity. Each value object returns either itself or a `ValidationError`. By the end the `create` transition works. The `acceptInvite` transition, including idempotency and exactly one `InviteAccepted` domain event, is described as next steps but not coded.

## Core ideas
- **Goal:** move "from state machine to domain model." Domain objects are "really simple state machines at the class level." They are also "the decision-making objects" in most information systems, at the data and behavior level. Encapsulating them lets you "design out the entire core of how our business works."
- `PreReaderInvite` is a piece of state that represents an invite to become a pre-reader. It has creation rules (required data), a transition to accepted, and other rules.
- At the domain-modeling (stateful) guess point the concerns are **data, rules, relationships, and processes**.
- **FA²STR applied:**
  - **Find** responsibilities (data, behavior, processes, rules). Mostly done already via the state machines.
  - **Architect:** map "doings and knowings" onto abstractions. Instead of the three abstract object stereotypes, Khalil assigns them to the more specific **DDD tactical patterns**: domain events, entities, value objects, domain services. He doesn't use domain services in this demo.
  - **Automate:** Jest is enough here. Given/When/Then and feature files can come later.
- **Test file structure is designed up front.** Each transition is a `describe` block with success and failure cases for the responsibilities in that transition. Create is the initial state. Accept invite is an intermediate transition.
- **Upfront vs emergent API design.** Khalil takes a more upfront approach because he already knows which abstractions he needs (e.g., Result). "Sometimes you could do that. And sometimes you will take a more emergent approach." Even so, much of the design emerged during the demo (Result → unions, Guard → GuardResult).
- **Work backwards (AAA backwards).** Write the input data, then the act (`PreReaderInvite.create(...)`), then the assertions, then make things exist.
- **Input vs state.** `PreReaderInviteInput` is raw input data (strings). `PreReaderInviteState` holds specific types (value objects). Converting input into state is where validation happens.
- **Entity vs value object test:** compare by value → value object. Compare by identity → entity.
  - `PreReaderEmail` → value.
  - IDs are "a little bit of a tricky one," but an ID itself is compared by value → value object.
  - `PreReaderInvite` is compared by its identifier → entity.
- **Props pattern** (also "somewhat like the state pattern"): put all state on a single props/state object instead of separate class properties. Easier to maintain over time and makes immutability easy.
- **Validation order in `create`:**
  1. Ensure all required values are present.
  2. Ensure each value is valid.
  3. Only then create and return the entity.
- **Validation belongs in value objects, not the entity.** The entity builds each value object from input and passes them in.
- **Return errors as types; don't throw.** "Are we just going to throw an error completely? No." Every factory returns a union of success type or error type.
- **Every new abstraction deserves its own tests** (Result, Guard, each value object). "Never just want to be creating stuff and not testing it." Khalil adds a failing `describe('Result')` placeholder as a reminder.
- **Classes play two roles:** a service provider (static factory methods like `create`) and a blueprint for the object (constructor, private properties, instance methods).
- **Private constructors** stop consumers from creating invalid objects with `new`. The only way in is through the validating `create`.
- **Naming is a process.** Names change as understanding improves: `Result` responsibilities, `InvalidProperty` → `ValidationError`, `keysMissing` → `firstKeyMissing`, `isSuccess`/`success` → `hasErrors`, `validateUUID` → `validateIdentifier`, `GuardResult` → `NullOrUndefinedGuardResult`.
- **Feedback-loop levels:** the stateful entity is a **level two** construct. The Guard utility is a **level one** construct.
- **End-looping [original: "end flooping"]:** start at the outermost object (the entity), drop into new inner abstractions (value objects, Guard, GuardResult) and test-drive them, then come back out. "We just end looped all the way in." The exact term is uncertain (speech-to-text); the process described is working inward from the entity and back.
- **Encapsulation takes a lot of typing.** "If this feels like a lot of typing, it is a lot of typing. But this is what is required in order to encapsulate and protect the ways state can change in your app."
- **Sit in the awkwardness.** The API gets cleaner if you stay with slightly awkward code a bit longer ("Takes just sitting in like a little bit awkwardness for it to get cleaner").
- **Harden after create works.** Add many more examples, and test each value object in detail. Khalil admits he "barely wrote any" value-object tests in the demo and says you must in practice.

## Named frameworks / mental models
- **FA²STR (Find, Architect, Automate, …) at the stateful guess point**
  - Purpose: turn discovered responsibilities into tested domain objects.
  - Steps shown:
    - Find responsibilities (data, behavior, processes, rules).
    - Architect: assign doings/knowings to DDD tactical patterns (entity, value object, domain event, domain service).
    - Automate: set up the test harness (Jest; later Given/When/Then or feature files).
    - Then TDD each transition.
  - When: modeling stateful domain objects (level two constructs).
- **Transition-based test layout**
  - Components: one `describe` per state transition (create/initial, accept invite/intermediate). Each has success cases and failure cases.
  - When: specifying any class-level state machine.
- **Result pattern** (classful; later abandoned in this demo)
  - Purpose: model an operation that can succeed or fail without throwing.
  - Components: `Result.ok(value)`, `Result.fail(...)`, `isSuccess`, `isFailure`, `getValue()`.
  - Can be done classfully, functionally, or as a simple type. Khalil calls it defining "monads or unions": "when you're expecting more than one return type."
  - When: abandoned here as "way too confusing, especially if you're just starting out" in favor of plain unions.
- **Union return types / discriminated unions**
  - Purpose: express "this OR that" returns strictly so TypeScript can narrow.
  - Components: `PreReaderInvite | DomainError`, `PreReaderInviteId | ValidationError`, `GuardResult = SuccessResult | FailureResult` discriminated on `success: true | false`.
  - When: any factory or validation that can fail.
- **Guard pattern**
  - Purpose: reusable precondition checks that return results instead of throwing.
  - Components:
    - `Guard.againstNullOrUndefined(data, keys)` → first missing key.
    - `Guard.againstValidationErrors(items)` → first `ValidationError`.
    - Both return a result exposing `hasErrors()` / `getFirstError()`.
  - When: validating entity creation input.
- **Programming by wishful thinking / abstraction design ("what first, how later")**
  - Steps: write the API call you wish existed in near-English (`Guard.againstNullOrUndefined(...)`, alternative `Guard.ensures(data).containsProperties(...)`), then "make it real."
- **Domain error hierarchy**
  - Components:
    - Abstract `DomainError` with state `{ type, message }`.
    - Concrete subclasses `MissingValueError` and `ValidationError` (formerly "InvalidProperty").
    - Abstract classes can't be instantiated, so a concrete subclass must "play this role."
- **Tell, Don't Ask**
  - Applied to Guard results: `getFirstError()` instead of reaching into `data.firstMissingKey`, and `hasErrors()` instead of checking `success`.
- **Entity vs Value Object identification**
  - Rule: compare by value → value object. Compare by identity → entity.
- **Props / state pattern**
  - All state lives on one `props` (`PreReaderInviteState`) object, which enables immutability and easier maintenance.
- **Rule of three:** "When you see things three times, it's a good chance to refactor." Applied to the duplicated UUID validation across ID value objects (acknowledged, deferred).

## Definitions
- **PreReaderInvite** — a piece of state representing an invite to become a pre-reader. It has creation rules, an initial status, and an accept transition. It is an entity.
- **Pre-reader invite input** — raw input data. All strings.
- **Pre-reader invite state** — the entity's internal props. Specific types (value objects) plus status.
- **Entity** — an object compared by identity/identifier.
- **Value object** — an object compared by value. IDs and emails are value objects even though IDs identify things.
- **Result** — an abstraction that returns a value for a given type, marked as success or failure. "It's when you're expecting more than one return type."
- **Union** — TypeScript "or" type: "this is how you say or."
- **Guard** — a utility that checks preconditions (null/undefined, validation errors) and returns a result describing the first problem.
- **GuardResult** — the object returned by guards. It can "explain if it has errors or not" (`hasErrors()`) and give the first error (`getFirstError()`).
- **DomainError** — abstract base error with a type and message. Returned, not thrown.
- **MissingValueError** — `DomainError` subtype for a required value that wasn't provided (type "MissingValue").
- **ValidationError** — `DomainError` subtype for a provided value that is invalid (e.g., a non-UUID ID). Renamed from "invalid property."
- **Static factory method** — a static `create` on the class. It is the class's "service provider" role.
- **Level one / level two construct** — feedback-loop levels. A stateless utility such as Guard is level one. A stateful object such as the entity is level two.

## Rules & heuristics
- Structure tests by transition, with success and failure cases for each.
- Only pass in what isn't part of the initial state. Status is set internally to `Invited`, so `create` needs just 3 inputs (invite ID, author ID, pre-reader email).
- Work backwards: input → act → assert → make it exist.
- Make failures fail for a "more sensible" reason before implementing (e.g., fix type/compile issues first).
- In `create`: check presence, then validity, then construct. Return early with the first error.
- Return errors as union types. Don't throw.
- Put validation logic in value objects. The entity composes them.
- Make constructors private and expose `create`.
- Give each new abstraction (utility, value object) at least one test immediately, and more examples later. A placeholder failing spec is an acceptable reminder.
- Name failure tests by reason: "fails to create when value missing." Prefer "missing value" over "missing property" because these are values (entities and values).
- Failure outputs should say *which* property failed, via the error message or type.
- Model result types strictly (discriminated unions) so TypeScript can narrow. Avoid optional fields that are really variant-specific.
- Prefer APIs that tell rather than ask (`hasErrors()`, `getFirstError()`). Make related utilities share the same API.
- Prefer a validation package over hand-rolled UUID code. Regex "can be pretty expensive."
- Keep a known-valid sample (e.g., a sample UUID) for tests.
- When you see duplicated logic three times, refactor. It's OK to defer for time, but note where it belongs (UUID validation should move out of the ID value objects).
- Getting the raw primitive from a value object requires `.getValue()`, e.g., `invite.getId().getValue()`.
- Next tests for accept: accepting works. Accepting again returns an error ("you can't go from accepted to accepted"). Exactly one `InviteAccepted` event is recorded.

## Anti-patterns / mistakes called out
- Creating an abstraction and not testing it ("Never just want to be creating stuff and not testing it").
- Putting validation logic inside the entity instead of value objects.
- Throwing errors for expected domain failures instead of returning typed errors.
- Allowing `new PreReaderInvite(...)` from outside (public constructor), which bypasses validation.
- Over-engineering early with a full Result class: "This could have just been so much simpler… It just gets way too complex using the result." Plain unions were enough.
- Loose types with optional fields that stop TypeScript narrowing (fixed with a discriminated union).
- Silencing a type error (inferred: `@ts-ignore` or similar). Khalil does it once, relying on unit tests for correctness: "It's not the best."
- Placeholder IDs like "123" that aren't valid UUIDs. They caused confusing `ValidationError` failures in the entity tests.
- Forgetting to unwrap value objects (`getId()` vs `getId().getValue()`) in assertions.
- Copy-pasting the UUID validation logic into multiple ID value objects. Called out as a rule-of-three refactor candidate.
- Writing barely any value-object tests. Khalil admits he did this in the demo and says you shouldn't in practice.
- Self-admitted: "not going to go too overboard with committing" in this demo. It was a shortcut, not a recommendation. He plans to re-record it properly.

## Code discussed
**Setup:** Existing Jest test file with commented-out `describe` blocks per transition and a notes/responsibilities list. Folder structure created during the demo: `modules/feedbook/domain/` for domain objects. Utility files: `result.ts` + `result.spec.ts` (later abandoned), `guard.ts` + `guard.spec.ts`, and a separate file for `GuardResult`.

**Sequence of tests / steps (in order):**
1. **Create, success (first test).** Input: `preReaderInviteId: '123'`, `authorId` (placeholder), `preReaderEmail` (placeholder). Act: `PreReaderInvite.create(input)`. Initially asserted `result.isSuccess` and `getValue().getId()`. It first failed because `PreReaderInvite` didn't exist → created the class with static `create` → strict input type → `getId` → returned the result.
2. **Result utility extracted.** `Result` moved to its own file and exported. `result.spec.ts` got a failing `describe('Result')` placeholder as a reminder. Responsibilities listed: mark as success, mark as failure, get value. Tests:
   - `Result.ok(anyValue).isSuccess` → `true`.
   - `Result.fail(...)`: he first expected a falsy check and got confused, then realized `isFailure` is truthy ("it is successfully a failure").
3. **Input vs state types.** Created value-object types for the state and made the `PreReaderInvite` constructor private. Each value object got at least one basic test plus validation logic (this narration is partly garbled). "Good place to commit… I'm now on green." The props type was renamed `PreReaderInviteState` and moved into the pre-reader-invite file. The now-unused separate types were deleted.
4. **More success examples** (another valid invite ID etc.).
5. **Initial state knowing:** expect `invite.getInviteStatus()` to equal `'Invited'`. Implemented by setting `inviteStatus: 'Invited'` inside `create`. The test was renamed to roughly "successfully created a pre-reader invite with … initially invited" (exact wording inferred).
6. **Create, failure.** First drafted as "failed to create a pre-reader invite for reason X." Reasons enumerated: *missing* property, *invalid* property. Table of inputs: one missing `preReaderInviteId`, one missing `authorId`. Renamed "fails to create when value missing." Assert `result.isFailure` truthy. Draft API: `result.getFailureType()` → `'MissingValue'`, `getFailureValue()`. Later: `getValue().getType()` / `getMessage()` with the message naming the missing property.
7. **Guard (null/undefined).** Wishful-thinking API. Return type evolved:
   - boolean
   - a result
   - `{ success, data?: { keysMissing } }`
   - `firstKeyMissing`
   - discriminated union

   Test: guard result `success` → `false`, and `data` contains key `'id'` (later `firstKeyMissing`).
8. **Result dropped for unions.** `create` returns `PreReaderInvite | DomainError`. `DomainError` is abstract, so `MissingValueError extends DomainError` is created.
9. **Value objects with validation.** `PreReaderInviteId.create(value)` returns `PreReaderInviteId | ValidationError`. It uses UUID validation "without regex" (code found online). The method is `private static validateUUID`, renamed `validateIdentifier`. Tests: an invalid ID → `toBeInstanceOf(ValidationError)`. Changing the expectation to `toBeInstanceOf(PreReaderInviteId)` fails, confirming the check. Test named "knows when id is valid." The same pattern was applied to `AuthorId` and `PreReaderEmail`.
10. **Guard (validation errors).** Test: "returns first validation error from a list of potential validation errors." The input array mixes `new ValidationError('x')` with a plain object. Assert `result.hasErrors()` truthy, `getFirstError()` instance of `ValidationError`, and the property `'x'` found via the message. Both guards consolidated onto `hasErrors()` / `getFirstError()`. The first guard's result was renamed `NullOrUndefinedGuardResult`. `GuardResult` was extracted to its own file.
11. **Guard tests cleaned up.** The null/undefined guard `hasErrors()` → truthy. `getFirstError()` → `MissingValueError`. Error type fixed from `'id'` to `'MissingValue'`, and the validation error type to the validation error type. Implementation: push missing keys into a `missingValues` array. Filter items that are `ValidationError`s.
12. **Back to entity tests.** They failed with `ValidationError` because `'123'` isn't a UUID. Replaced with the saved sample UUID. Assertion fixed to `getId().getValue()`. `AuthorId` logic wasn't built yet, so it was copied from `PreReaderInviteId`. At three copies he flagged "refactor" and deferred it. `PreReaderEmail` validation was missing, so it was added. Result: "Create is done. Now all we need to do is harden it."
13. **Not implemented (described):** accept-invite transition tests (see last snippet).

```ts
// reconstructed from narration
// Early classful Result (later abandoned for unions)
export class Result<T> {
  private constructor(
    private readonly success: boolean,
    private readonly value?: T,
  ) {}

  public static ok<T>(value: T): Result<T> {
    return new Result<T>(true, value);
  }

  public static fail<T>(value?: any): Result<T> {
    return new Result<T>(false, value);
  }

  get isSuccess() { return this.success; }
  get isFailure() { return !this.success; }
  getValue(): T { return this.value as T; }
}

// result.spec.ts
describe('Result', () => {
  it('can mark a result as a success', () => {
    expect(Result.ok<any>({}).isSuccess).toBe(true);
  });
  it('can mark a result as a failure', () => {
    expect(Result.fail<any>().isFailure).toBeTruthy();
  });
});
```

```ts
// reconstructed from narration
// Error hierarchy: returned, never thrown
type DomainErrorState = { type: string; message: string };

export abstract class DomainError {
  constructor(private readonly state: DomainErrorState) {}
  getType() { return this.state.type; }
  getMessage() { return this.state.message; }
}

export class MissingValueError extends DomainError {
  constructor(property: string) {
    super({ type: 'MissingValue', message: `Couldn't find a value for ${property}` });
  }
}

export class ValidationError extends DomainError {
  constructor(property: string) {
    super({ type: 'ValidationError', message: `Invalid value for ${property}` });
  }
}
```

```ts
// reconstructed from narration
// Guard: first version with a discriminated union (before the hasErrors/getFirstError consolidation)
type SuccessGuardResult = { success: true };
type FailureGuardResult = { success: false; data: { firstMissingKey: string } };
export type NullOrUndefinedGuardResult = SuccessGuardResult | FailureGuardResult;

export class Guard {
  public static againstNullOrUndefined(data: any, keys: string[]): NullOrUndefinedGuardResult {
    const missingValues: string[] = [];
    for (const key of keys) {
      if (data[key] === null || data[key] === undefined) missingValues.push(key);
    }
    return missingValues.length
      ? { success: false, data: { firstMissingKey: missingValues[0] } }
      : { success: true };
  }
}
```

```ts
// reconstructed from narration
// Consolidated API (tell, don't ask): both guards return a GuardResult
export class GuardResult {
  constructor(private readonly errors: DomainError[]) {}
  hasErrors() { return this.errors.length > 0; }
  getFirstError() { return this.errors[0]; }
}

// in Guard
public static againstValidationErrors(items: (ValidationError | unknown)[]): GuardResult {
  return new GuardResult(items.filter((i): i is ValidationError => i instanceof ValidationError));
}

// guard.spec.ts
it('returns first validation error from a list of potential validation errors', () => {
  const result = Guard.againstValidationErrors([{}, new ValidationError('x')]);
  expect(result.hasErrors()).toBeTruthy();
  expect(result.getFirstError()).toBeInstanceOf(ValidationError);
  expect(result.getFirstError().getMessage()).toContain('x');
});
```

```ts
// reconstructed from narration
// Value object: private constructor, validating factory, union return
export class PreReaderInviteId {
  private constructor(private readonly props: { value: string }) {}

  public static create(value: string): PreReaderInviteId | ValidationError {
    if (!this.validateIdentifier(value)) {
      return new ValidationError('preReaderInviteId');
    }
    return new PreReaderInviteId({ value });
  }

  // non-regex UUID check found online; not cohesive here, should move (shared with AuthorId)
  private static validateIdentifier(value: string): boolean { /* ... */ return true; }

  getValue() { return this.props.value; }
}

// spec
it('knows when id is valid', () => {
  expect(PreReaderInviteId.create('123')).toBeInstanceOf(ValidationError);
});
```

```ts
// reconstructed from narration
// Entity: props/state pattern, private constructor, create = presence -> validity -> construct
type PreReaderInviteInput = { preReaderInviteId: string; authorId: string; preReaderEmail: string };

type PreReaderInviteState = {
  preReaderInviteId: PreReaderInviteId;
  authorId: AuthorId;
  preReaderEmail: PreReaderEmail;
  inviteStatus: 'Invited'; // further statuses (e.g. accepted) come with the accept transition (inferred)
};

export class PreReaderInvite {
  private constructor(private readonly props: PreReaderInviteState) {}

  public static create(input: PreReaderInviteInput): PreReaderInvite | DomainError {
    const presence = Guard.againstNullOrUndefined(input, ['preReaderInviteId', 'authorId', 'preReaderEmail']);
    if (presence.hasErrors()) return presence.getFirstError();

    const preReaderInviteId = PreReaderInviteId.create(input.preReaderInviteId);
    const authorId = AuthorId.create(input.authorId);
    const preReaderEmail = PreReaderEmail.create(input.preReaderEmail);

    const validity = Guard.againstValidationErrors([preReaderInviteId, authorId, preReaderEmail]);
    if (validity.hasErrors()) return validity.getFirstError();

    return new PreReaderInvite({
      preReaderInviteId: preReaderInviteId as PreReaderInviteId,
      authorId: authorId as AuthorId,
      preReaderEmail: preReaderEmail as PreReaderEmail,
      inviteStatus: 'Invited',
    });
  }

  getId() { return this.props.preReaderInviteId; }
  getInviteStatus() { return this.props.inviteStatus; }
}
```

```ts
// reconstructed from narration
describe('PreReaderInvite', () => {
  describe('create', () => {
    it('successfully creates a pre-reader invite, initially invited', () => {
      const input = { preReaderInviteId: SAMPLE_UUID, authorId: SAMPLE_UUID, preReaderEmail: 'reader@example.com' };
      const invite = PreReaderInvite.create(input) as PreReaderInvite;
      expect(invite.getId().getValue()).toEqual(SAMPLE_UUID);
      expect(invite.getInviteStatus()).toEqual('Invited');
    });

    it.each([
      [{ authorId: SAMPLE_UUID, preReaderEmail: 'reader@example.com' }, 'preReaderInviteId'],
      [{ preReaderInviteId: SAMPLE_UUID, preReaderEmail: 'reader@example.com' }, 'authorId'],
    ])('fails to create when value missing', (input, property) => {
      const error = PreReaderInvite.create(input as any) as DomainError;
      expect(error).toBeInstanceOf(MissingValueError);
      expect(error.getMessage()).toContain(property);
    });
  });
});
```

```ts
// reconstructed from narration
// NOT implemented in the lesson; described as next tests
describe('acceptInvite', () => {
  it('accepts the invite', () => { /* invite.acceptInvite(); assert accepted */ });
  it('returns an error when accepting an already-accepted invite', () => { /* accepted -> accepted is invalid */ });
  it('records exactly one InviteAccepted event', () => { /* call multiple times; only one event */ });
});
```

## Diagrams / visual models described
- Implicit state machine for `PreReaderInvite`: **create → `Invited`** (initial state), then **accept invite → accepted** (intermediate transition). Accepted → accepted is invalid and returns an error. A successful accept produces one `InviteAccepted` domain event.
- Test file laid out as a tree: `describe(transition)` → success cases / failure cases.
- Folder layout: `modules/feedbook/domain/`.

## Notable quotes
- "These are just really simple state machines at the class level, but these are the decision-making objects that happen in most information systems."
- "Never just want to be creating stuff and not testing it."
- "Naming is a process as well."
- "This could have just been so much simpler… It just gets way too complex using the result."
- "If this feels like a lot of typing, it is a lot of typing. But this is what is required in order to encapsulate and protect the ways state can change in your app."
- "This is telling it instead of asking. Tell don't ask. This is much nicer of an API."
- "Takes just sitting in like a little bit awkwardness for it to get cleaner."
- "When you see things three times, it's a good chance to refactor."

## Cross-references
- [27-fa2str-design-method.md](27-fa2str-design-method.md): Find/Architect/Automate steps used here.
- [52-fa2str-stateless-guess-point.md](52-fa2str-stateless-guess-point.md): the stateless counterpart. This lesson is the stateful/domain-modeling guess point.
- [51-aaa-backwards-wishful-thinking.md](51-aaa-backwards-wishful-thinking.md): working backwards and programming by wishful thinking (Guard API).
- [15-essential-feedback-loop.md](15-essential-feedback-loop.md): level one vs level two constructs.
- [14-essential-abstraction.md](14-essential-abstraction.md): "what first, how later."
- [45-demo-fizzbuzz.md](45-demo-fizzbuzz.md): rule of three, red-green-refactor, commit on green.
- [22-domain-discovery.md](22-domain-discovery.md), [23-strategic-design.md](23-strategic-design.md): upstream discovery that produces the state machines.
- [36-faq-how-much-oop.md](36-faq-how-much-oop.md): object stereotypes and classes' two roles.
- Earlier FeedBook state-machine lessons (not in notes range): the source of the transitions and responsibilities list.

## Q&A items
None (no viewer questions answered; viewers are told to pause and ask on Discord).

## Fluff skipped
Channel intro, "not going to teach much / will re-record" caveats, lateness/rustiness remarks, sign-off, and garbled speech-to-text passages (unrelated multilingual words during the first `create`/Result setup and during value-object test creation) with no recoverable content.

## AI-era relevance hint
- AI agents readily generate entities with public constructors, thrown exceptions, and validation in the wrong place. The judgment shown here keeps generated domain code honest: presence → validity → construct, value objects own validation, errors returned as union types, private constructors.
- Khalil backed out of the Result class when it proved more complex than needed. Deciding when an abstraction is over-engineered is a human call that prompts rarely make for you.
- Transition-based `describe` layouts with success/failure cases make a precise spec to hand to an agent. The "accepted → accepted must error, exactly one event" style of invariant is where you should direct agent-written tests.

## Coverage proof
- Lines read: 348 / 348
- Final line (verbatim): "one. One. But this is a foundational one. So. Take this. Do your homework. Do the assignments. As always. It's mastery. To be continued."
