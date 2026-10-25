# Lesson 84 — Q&A March 14th 2023: FDD (Figma-Driven Design)
- **Source file:** 84) Q&A March 14th 2023 FDD (Figma-Driven Design).txt
- **Category:** qa-live
- **Topics:** microservices-vs-modular-monolith, theoretical-guesses, negative-value, complexity-as-more-guesses, serverless, vertical-slicing, horizontal-decoupling, layered-architecture, core-vs-infrastructure-code, system-clock, anemic-domain-model, end-to-end-tests, result-verification, state-verification, communication-verification, programming-by-wishful-thinking, thinking-backwards, essentialism, phronimos, use-case, dependency-inversion, contracts, repository, adapter-layer, ports-and-adapters, abstract-vs-concrete-spectrum, abstract-class, rule-of-three, yagni, test-doubles, actor-role, gherkin, feedback-loop-levels, cohesion, naming, legacy-code, characterization-tests, external-services, bounded-contexts, aggregates, course-structure

## Summary
This is an early live Q&A, on the first day of the early-adopter cohort. Khalil draws everything in Figma and writes TypeScript right on the canvas. He jokes that this is "Figma-driven design", the "original FDD". **There is no formal Figma-Driven Design method in this session.** The title refers to the joke and to the practice of sketching architecture and code as diagrams. It opens with a tech lead planning to rewrite an MVP as microservices with two backend devs. Khalil frames that choice as a theoretical architecture guess that explodes into many more physical guesses (observability, messaging), so it must be "solidly justified" against potential negative value. He suggests a modular monolith plus vertical slicing and horizontal decoupling. From there he covers core vs infrastructure code ("it's not about where it comes from, it's about what it touches"), the anemic domain model and why black-box E2E tests only allow result verification, and the three verification types: result (palindrome), state (checkers, found with programming by wishful thinking), and communication (use cases with injected contracts). He takes a detour into thinking backwards and the three steps of Greg McKeown's *Essentialism* (explore/evaluate → eliminate → execute). He then designs a `CreateUser` use case that depends on a `UserRepo` interface in the adapter layer, which `FirebaseUserRepo`/`SequelizeUserRepo` actors implement. He explains the abstract-to-concrete spectrum, the rule of three and YAGNI, and shows a Gherkin-driven "application level 3" use-case test that runs as fast core code. The closing Q&A covers navigating interface-heavy code, legacy projects, TS/Node prerequisites, repository-like patterns, external services, aggregates, and microservices coverage.

## Core ideas
- **Architecture choices are theoretical guesses that multiply physical guesses.** Choosing microservices up front means deciding the architecture before you understand the problem. Every choice at the architectural level "has exploded into more guesses for you to make": observability/telemetry across deployable units, messaging infrastructure, and so on.
- **Justify potential negative value.** A term Khalil says he now uses a lot. Complexity you introduce has to be "solidly justified" against the value it brings.
- **Fewer components → fewer guesses.** That's why serverless is popular: "the least amount of components you have to manage means the least amount of guesses you have to make". This frees you to focus on the guesses you want to make.
- **Clarity enables better guesses.** Khalil positions *solidbook* as the clarity resource and the course as acting on that clarity: "we cannot begin to act pragmatically and strategically unless we have clarity."
- **Extensibility comes from first principles, not microservices.** A maintainable, extensible codebase comes from essentials like **vertical slicing** and **horizontal decoupling** (he says "horizontal slicing" here). Every feature is cut both vertically and horizontally, and "that is what is going to make features extensible."
- **Layers** (should become "like breathing"): infra → adapter → application → domain. For the application layer to talk to infra, it has to go through the adapter layer. Layers are theoretical and "doesn't really need to map to folders".
- **Core code vs infrastructure code.**
  - Infrastructure code is code you don't own and that touches the real world: DB, file system, network, "system in general" (system clock, random number generator).
  - Core code is code you write that doesn't touch infra: the domain, application and adapter layers.
  - "It's not about where it comes from, it's about what it touches." An npm library that only returns the string "dealies" is core. Express is infra because it opens a port and touches the network.
  - Why it matters: infra slows tests down and makes test setup more complicated.
- **`new Date()` / `Math.random()` are infra.** They talk to the system clock or the random generator. To test time, put a **contract (interface) for a clock** in between so tests can control and travel time. Khalil says passing the value into the constructor directly is not great.
- **Everything in the Express controller = anemic domain model.** Parsing, the "already created?" check, SQL writes all happen in one layer with no horizontal decoupling. There's no place where the rules live.
- **Domain model** = "anything tasked with representing your data, your rules, your processes and your relationships."
- **Without decoupling you can only black-box test.** That's an end-to-end test: input → whole system → output. E2E tests are good and wanted, but they only allow **result verification**. Edge cases like deactivate-without-delete then rejoin → "welcome back" are nearly impossible to cover through the black box.
- **Choose tests strategically.** You can't have every kind of test all the time ("everybody has lives"). The goal is to feel comfortable continually adding value without adding negative value.
- **Stateful problems need state verification.** "All problems that are relatively complex enough that matter are stateful ones." The app around your features is stateful.
- **Communication verification** is "my favorite one, it's the hardest one but it's the one that's going to lead to the tests that are the most valuable." It introduces dependency inversion/injection.
- **Use cases can be pure core code** if they depend on contracts (interfaces) instead of the DB/ORM. Then you can write fast tests that "exhaust the core business logic" with test doubles.
- **The adapter layer defines ports.** It describes how outside-world things can integrate with core code. The repository interface *is* the adapter: a **role**. Concrete implementations are **actors** that play it.
- **Milestone: knowing how to deal with contracts.** "When I realized how to do this and I got really good at it everything changed."
- **Rule of three + YAGNI** fight the human tendency to wander off track (the same tendency as a day that derails). Starting with the guess or the test is how you write the minimal code.
- Khalil sometimes knowingly adds things he doesn't need yet, using "metacognition and kind of the foresight", but calls it "breaking my own rule" and rare. "This game is really just fighting your own self."
- **Gherkin as training wheels** for application-level-3 (use case) tests. Setting up the "state of the world" is complex, so a rigorous format keeps you on track. Drop it once you can tell when you're going off course.
- **Test each feedback-loop level in isolation.** You still need to validate infrastructure later, but not in the use-case test.
- **You can skip feedback loop levels/guess points**, but writing code there without a test first makes it more likely you "veer off into a weird land". Khalil doesn't always test-drive when he needs things up fast. Switch to test-first when the potential negative value is greater than the cost of building a bit slower.
- **External services** (Stripe, PayPal, mail) are collaborators. The minimum integration code is wrapped in a **service**. If you buy rather than build billing, "the external service becomes pretty much that bounded context."
- **Don't lead with "aggregate".** Talk about the required data and behavior per feature. That exposes what an aggregate is and isn't.
- **Course goal:** "for everyone to become their own coach to make myself redundant."

## Named frameworks / mental models
- **Systems thinking / value chain**: value → marketing → sales → operations, with dev a "little sliver". The output of one system is the input to the next, and each crossing is a guess.
- **Theoretical vs physical guesses / feedback loop**: architecture decisions are theoretical guesses that shape physical implementation and testing. "At least 11 maybe more different guesses... from the theoretical to the physical."
- **Layered architecture** (a.k.a. hexagonal, ports and adapters, clean architecture, "the Rick Morty", "9000 different names"): domain, application, adapter, infra. Purpose: horizontal decoupling so core logic is testable without infra.
- **Vertical slicing + horizontal decoupling**: each feature (e.g., Create User) cuts vertically through all layers and is split horizontally by layer.
- **Three types of verification** (the Subject/System Verification essential):
  1. **Result verification**: input → output, check the output (palindrome). The only kind possible in black-box E2E.
  2. **State verification**: reach into the model's state after a sequence of inputs (checkers turn alternation).
  3. **Communication verification**: verify how objects talk to collaborators (use case ↔ repo/services). Needs dependency inversion. The most valuable.
- **Programming by wishful thinking**: think backwards and project into state B, imagining success. Write the assertion first with the API you wish existed (`getCurrentPlayer()`), then work backwards to the setup.
- **Thinking backwards / discrete state changes**: from the end state (got hired), ask what had to happen just before (interview, offer accepted...). This yields events and the essential state changes between them. Khalil calls this what event storming, impact mapping and BDD really do.
- **Essentialism three-step process** (from Greg McKeown's *Essentialism*, as Khalil presents it):
  0. Define a goal/purpose.
  1. **Explore and evaluate**: study the phronimos (developers who did it well), then experiment for yourself to reach their conclusions "but myself", through emotional experiences.
  2. **Eliminate**: remove what doesn't matter. Khalil did this across many books until topics repeated, which left the macro-level 12 essentials. Serverless and microservices fit into those essentials.
  3. **Execute**: thinking done, go, and "feel good about going."
- **Phronimos** (Aristotle): the practically wise practitioners you learn from by observing and then experimenting.
- **Actor–role model**: an interface is a role (like one in a play). Concrete classes are actors that can play it. The use case only cares that *someone* plays the role of `UserRepo`.
- **Abstract ↔ concrete spectrum**: interface/type (pure concept, contract, role) → abstract class (partial implementation with abstract methods, both concept and real, not exactly in the middle) → concrete class/object ("real, it exists").
- **Rule of three**: see duplication twice, leave it. The third time, at the green/refactor step, extract a new abstraction. Also useful for designing aggregates: add only the minimal data and behavior each new feature needs.
- **YAGNI**: the flip side. Don't add things you feel you'll need.
- **Feedback loop levels (application)**: application level 2 = simple unit tests (e.g., is the email valid; "no state of the world"); application level 3 = use case/feature tests with complex state-of-the-world setup, written in Gherkin.
- **Three-part answer to interface navigation pain**: (1) slice features into feature folders, (2) cohesive folder structure and naming, (3) follow layered-architecture rules so you know what to expect (use cases always refer to interfaces).
- **Core / supporting / generic → build vs buy**: decide the core domain. Generic or supporting things (payments, mail) can be bought and integrated through a service.

## Definitions
- **Infrastructure code**: code you don't own that touches real things: databases, file system, network, system clock, random number generator. It lives in the infra layer. Examples: Express, React (per Khalil), ORMs such as Sequelize, Firebase.
- **Core code**: code that doesn't touch infrastructure. It lives in the domain, application and adapter layers and can be tested fast.
- **Domain model**: "anything tasked with representing your data, your rules, your processes and your relationships."
- **Anemic domain model**: here, all logic (parsing, rules, persistence) crammed into an infra controller. There's effectively no domain model.
- **End-to-end test**: testing "the entirety of the system", a black box, input to output.
- **Result verification**: checking only the output of an input→output model.
- **State verification**: checking the model's internal state after inputs that produce no output.
- **Communication verification**: checking interactions between the subject and its collaborators.
- **Use case**: a developer-level object (the "controller" object stereotype in RDD) that takes input, talks to collaborators such as a repo, performs behavior, and saves. It represents a feature.
- **Responsibilities**: the jobs a feature needs done (parse request, check duplicate, save, send email, validate email/first/last name). Each belongs to a particular layer.
- **Repository**: a contract (role) for persisting and retrieving, e.g., `UserRepo` with `save(user)`. It is the adapter/port.
- **Adapter layer**: "describing how outside world stuff can integrate with our core code". It defines ports.
- **Abstract class**: a partial implementation with abstract methods subclasses must define. Example: the React `Component` class, where you must implement `render` while other methods exist behind the scenes.
- **Test double**: the umbrella term for fakes, mocks and stubs ("it's just something that's fake, it's not real"). Khalil recommends using it instead of arguing the distinctions.
- **Rule of three**: refactor duplication into a new abstraction on the third occurrence.
- **Service (external)**: minimal code encapsulating integration with an external API (Stripe, PayPal, mail). A key pattern role.
- **Negative value**: harm introduced by changes or complexity, e.g., bugs, or complexity that isn't justified.
- **Characterization tests**: tests used to "pin" legacy code in place before carving into it, like tailor's pins on a shirt.

## Rules & heuristics
- Critically evaluate microservices. Know which guesses you force on yourself (observability, messaging, deployment) before choosing them. Consider a modular monolith first.
- Make sure every architectural complication is solidly justified against potential negative value.
- Minimize the number of components you manage so you minimize the guesses you have to make.
- Classify code by **what it touches**, not where it comes from.
- Wrap the system clock and randomness behind contracts so tests can control them.
- Don't put all feature logic in an Express controller. Decouple horizontally into layers.
- Don't rely only on E2E tests for feature rules. They only give result verification.
- To verify stateful behavior, use programming by wishful thinking: write the expectation first with the API you wish you had.
- Start at state B and work backwards to find the discrete steps and state changes.
- Use cases should depend on **interfaces** (roles), not concrete DB/ORM classes. Inject concretions via the constructor.
- Start with the most abstract thing, an interface or type. Only move to an abstract class when the rule of three shows a real need to share implementation.
- Say "test double" rather than getting stuck on mock vs stub vs fake.
- For unit tests, create classes that implement the interfaces, such as in-memory repos (confirmed in chat).
- Lead with the guess. Write the feature in Gherkin first for use-case-level tests, as training wheels until you can tell when you're going off track.
- Test the core business logic at the use-case level without infra. Validate infrastructure separately at its own feedback-loop level.
- Organize code in feature slices and "swim lanes" so common dev tasks (add, edit or delete a feature, add a follow-up effect) have a discoverable code path.
- Name things with Aristotelian category clarity. A name says what something is and what it is *not*. Example: merge a stray `fake` folder into `testing utils`.
- Switch to test-driving when the potential negative value outweighs the cost of building a little slower.
- Put repository-like responsibilities where they fit best. With event sourcing, the repo can return events and let aggregates hydrate themselves.
- Even when buying a capability (payments), write the minimum integration code and wrap it in a service. That service effectively becomes the bounded context.
- Discuss required data and behavior per feature instead of "is X an aggregate?"
- Prerequisites: be able to build an Express API that talks to a database and deploy it (e.g., Heroku). Know the difference between types and interfaces in TS.

## Anti-patterns / mistakes called out
- **Rewriting an MVP straight into microservices** with a tiny team without understanding the guesses and complexity it creates.
- **Jumping straight from problem to architecture** (theoretical guess) without exploring first.
- **Calling `new Date()` inside a domain constructor**: an untestable hidden dependency on the system clock. The same goes for `Math.random()`.
- **All logic inside the Express controller**: no layers, anemic domain model, testable only as a black box.
- **Relying solely on E2E/black-box tests** for rule-heavy features. Edge cases become "quite impossible to test".
- **Injecting a concrete database/ORM into the use case**: the use case becomes infra-dependent and slow to test.
- **Reaching for abstract classes first** instead of interfaces.
- **Premature abstraction / YAGNI violations**: adding things you "feel you're going to need", the coding version of a derailed day.
- **Skipping test-first at guess points**: likely to "veer off into a weird land".
- **Poor cohesion in folder naming**: e.g., separate `fake` and `testing utils` folders for the same concept.
- **Getting lost in mock/stub/fake taxonomy**.
- **Over-focusing on "aggregate"**: "a concept that gets really confusing really fast."

## Code discussed
All code was typed into Figma frames ("Figma-driven design"), apart from a brief look at a VS Code assignment repo. The VS Code part showed a `register student` spec (Gherkin feature + Jest test at application level 3, all core code). No code from it was read aloud in detail.

Hidden system-clock dependency:
```ts
// reconstructed from narration
class User {
  createdAt: Date;
  constructor() {
    this.createdAt = new Date(); // talks to the system clock -> infra, hard to test
  }
}
```

Clock contract idea (shape inferred; Khalil only said "some sort of contract interface for a clock"):
```ts
// reconstructed from narration
interface Clock { now(): Date } // (inferred) method name
```

Anemic Express controller doing everything (Create User):
```ts
// reconstructed from narration
app.post('/users', async (req, res) => {
  // parse request, check user wasn't already created (a rule!), write with SQL
  // no adapter / application / domain layers -> only black-box E2E testable
});
```

Result verification (palindrome):
```ts
// reconstructed from narration
expect(palindrome('mom')).toBeTruthy();
// or
const input = 'mom';
expect(palindrome(input)).toBe(true);
```

State verification by wishful thinking (checkers; Khalil: "this is not a good API by the way"):
```ts
// reconstructed from narration
game.move(/* coords */); // player 1
game.move(/* coords */); // player 2
expect(game.getCurrentPlayer()).toBe(1);
```

Use case depending on a contract (communication verification setup):
```ts
// reconstructed from narration
interface UserRepo {
  save(user: any): Promise<void>; // "the mean thing" of loose typing for now
}

class CreateUser {
  constructor(private userRepo: UserRepo) {}
  // execute: validate, check existing, userRepo.save(user) ...
}

class FirebaseUserRepo implements UserRepo {
  // setup: Firebase infrastructure config
  async save(user: any) { /* ... */ }
}
// class SequelizeUserRepo implements UserRepo { ... }

const firebaseUserRepo = new FirebaseUserRepo();
const createUser = new CreateUser(firebaseUserRepo);
// new UserRepo() is impossible: an interface is not a concretion
```
- Without `save`, the compiler would complain ("yo where's the save freaking thing").
- Unit tests pass an in-memory or mock `UserRepo` test double instead.

## Diagrams / visual models described
- **Systems-thinking value chain** (from an existing image): value → marketing → sales → operations, dev as a sliver. Each boundary is an input/output guess.
- **Theoretical → physical feedback loop**: problem → (jumping to) architecture decision → influences physical implementation and testing.
- **Layer diagram**: infra, adapter, application, domain. The feature "Create User" cuts across all of them (vertical slice).
- **Anemic flow**: Express → [parse, check existing, SQL write], all inside infra.
- **Black box**: a circle around the whole system with in/out arrows = E2E, result verification only.
- **Result verification model**: `mom` → [palindrome] → `true`.
- **State verification model**: player 1 moves, player 2 moves... → [checkers model] with no output, only a state change. You reach into the model.
- **Wandering path vs direct path**: A → B day plan derailed by distractions. It motivates thinking backwards and the essentialism steps.
- **Job-app backwards chain**: hired ← interview/accepted ← offer extended... These are events, with state changes between them.
- **Use case wiring (evolving)**: Express → CreateUser (use case) → Database. The database is marked infra, which makes the use case infra-dependent ("not good"). Refactored to CreateUser → `UserRepo` (interface, adapter layer) ← `SequelizeUserRepo` / `FirebaseUserRepo` (infra).
- **Abstract ↔ concrete spectrum**: interface (concept/contract/role) … abstract class (partial, near the middle) … concrete object (real).
- **Humans and code image** (referenced from solidbook): two swim lanes, feedback and feed-forward, discoverability and understanding.

## Q&A items
- **Experience level / where to start with testing; team rewriting MVP as microservices with DDD + TDD (2 BE, 2 FE, mobile)** (L4-L25)
  - Khalil asks about the modular monolith. The student describes it as decoupled modules that ease a future migration to microservices.
- **Is microservices a good decision for our team size?** (L25-L68)
  - It's a theoretical architecture guess that multiplies physical guesses: observability/telemetry across deployable units, messaging infrastructure.
  - It must be solidly justified against potential negative value. You may not be aware of the guesses you're forcing on yourself.
  - Fewer components → fewer guesses (why serverless is popular).
  - Clarity (solidbook) → better guesses.
- **We chose microservices for maintainability and extensibility. Is that possible with a modular monolith?** (L68-L90)
  - Yes. Vaughn Vernon's *Strategic Monoliths*. First principles (vertical slicing, horizontal decoupling) give extensibility.
- **What is core vs infra code? Is `new Date()` core?** (L91-L125)
  - Infra touches DB, file system, network or system. `new Date()` and `Math.random()` touch the system, so wrap them in a clock contract.
  - Classify by what it touches, not where it comes from.
- **Would it be fair to say infra code = packages you install?** (L100-L102, L117-L121)
  - "Not completely fair". The print-"dealies" npm library is core. Express is infra (network, port).
- **How else can I test a feature without going through Express?** (L121-L150)
  - The common pattern is everything in the controller, which is an anemic domain model and E2E-only.
  - That pushes you into result verification. Introduces the three verification types.
- **(Student answer) Testing the whole system = end-to-end test** (L135-L137)
  - Confirmed. E2E tests are good, but choose your tests strategically.
- **How to verify checkers alternates players?** (L155-L193)
  - State verification via programming by wishful thinking (`getCurrentPlayer`), working backwards.
- **Detour: thinking backwards and the Essentialism process** (L193-L235)
  - Explore/evaluate (phronimos, experiment) → eliminate → execute. The course is the distilled philosophy of many developers: the 12 essentials.
- **Communication verification / use cases** (L235-L275)
  - The use case depends on a DB → infra → slow tests. Fix with dependency inversion via contracts.
- **"Couldn't it be an abstract class?"** (L275-L282)
  - Yes, but start with interfaces. Move to an abstract class after the rule of three. React `Component` is an abstract-class example.
- **"What is the rule of three for?"** (L282-L300)
  - Extract an abstraction on the third duplication. It helps design aggregates minimally. Pairs with YAGNI.
- **Could you create a mock repo?** (L313-L319)
  - Yes. Use mocks/test doubles to run the use case through edge cases without complex setup. Say "test double".
- **Does the repository belong in the adapter layer, or is the repository the adapter?** (L319-L330)
  - The repository *is* the adapter. It's a role, and Firebase/Sequelize repos are actors.
  - Layers don't need to map to folders. Organizing artifacts will be covered later.
- **"Does Figma integrate with TypeScript?"** (L353-L355)
  - Joke: "we just might break the universe."
- **To unit test, do we create classes implementing the interfaces, like in-memory?** (L364-L366)
  - "Exactly correct."
- **How to jump ahead on contracts?** (L358-L364)
  - Read the dependency inversion article, learn layered/hexagonal/ports-and-adapters/clean architecture.
- **Navigating interfaces is painful (can't ctrl-click to implementations). Easier way?** (L373-L397)
  - Discoverability (Don Norman). The three-part answer: feature slices, cohesive naming and folders, and following the layered-architecture rules so use cases predictably reference interfaces.
- **How do use-case tests look?** (L397-L420)
  - Lead with the guess. Gherkin feature + Jest at application level 3, all core code, super fast. Gherkin is mandatory training wheels until the final projects.
- **Can you extend the discount?** (L421-L427): skipped (marketing).
- **Will we learn to add tests to a project without a decoupled core?** (L428-L440)
  - Yes. A "legacy project" section with characterization tests (tailor's pins), plus a theoretical module on carving out the core domain, bounded contexts and subdomains, coupling and cohesion.
- **What TS/Node concepts are needed?** (L441-L456)
  - Be able to build an Express API that talks to a DB (MVC-level comfort), deploy (e.g., Heroku), and know types vs interfaces.
  - The key mindsets are the first two essentials (software essentialism, the feedback loop).
- **Other repo-like patterns beyond storage reads/writes?** (L456-L463)
  - Reading from event streams. With event sourcing, replay events to hydrate aggregates. The repo can return events and aggregates hydrate themselves.
- **Is a service (mail service) a pattern role too?** (L463-L477)
  - Yes. External services (Stripe, PayPal, mail) are collaborators. Wrap the minimum integration code in a service. A bought billing capability becomes the billing bounded context.
- **Is a user an aggregate?** (L483-L489)
  - "Depends". Prefer discussing the required data and behavior per feature. Essentialism means defining something by eliminating what it's not.
- **Will we learn to correctly implement microservices?** (L489-L494)
  - Not in depth. The course covers the foundations: temporal decoupling, vertical slicing, horizontal decoupling, deployment. Possible bonus modules later.

## Notable quotes
- "Any architecture you choose at the theoretical level is going to influence the way that you implement it at the physical level."
- "The least amount of components you have to manage means the least amount of guesses you have to make."
- "It's not about where it comes from it's about what it touches."
- "All problems that are relatively complex enough that matter are stateful ones."
- "It's the hardest one but it's the one that's going to lead to the tests that are the most valuable." (communication verification)
- "The repository is the adapter... it is a role to be played."
- "We're doing Figma-driven design right now... that's the original FDD."
- "This game is really just fighting your own self."
- "Every time you name something you're saying what it is not as well."
- "My goal here is for everyone to become their own coach to make myself redundant."

## Cross-references
- **Lessons:** 9 (Systems Thinking), 14 (Essential Abstraction), 15 (Feedback Loop / guess points), 16 (Vertical Slicing), 17 (Horizontal Decoupling), 18 (Temporal Decoupling), 20 & 53 (Subject/System Verification: result/state/communication), 25 (Deployment), 37 (Clean/Layered Architecture), 38 (RDD), 51 (Programming by Wishful Thinking / AAA backwards), 64 (integration testing), 73 (hand-written spies), 75 (Thinking Backwards), 79 (Abstraction & Levels of Realness: interfaces, abstract classes, concretions), 22–23 (Domain Discovery, Strategic Design: core/supporting/generic).
- **Books:** *Strategic Monoliths and Microservices* (Vaughn Vernon; also *Implementing Domain-Driven Design*), *Essentialism* (Greg McKeown), *The Design of Everyday Things* (Don Norman), *solidbook* (Khalil; chapter "Humans and Code").
- **Concepts:** modular monolith, microservices, serverless, observability/telemetry, anemic domain model, dependency inversion/injection, ports and adapters / hexagonal / clean architecture, repository, test doubles, rule of three, YAGNI, Gherkin/BDD, event storming, impact mapping, event sourcing, aggregates, bounded contexts, subdomains, characterization tests, phronimos (Aristotle), Aristotelian category theory, cohesion/coupling, object stereotypes (controller).
- **Tools:** Figma, Express, Sequelize (transcribed "SQLize"), Firebase, React, Jest, Gherkin, VS Code, Discord, Heroku, Stripe, PayPal.
- **Blog articles referenced:** core code vs infrastructure code, dependency injection / inversion (khalilstemmler.com).

## Fluff skipped
Screen-share setup, Figma color fiddling, network drops, Discord chat-location help (Nokia joke), video-editor delays, discount extension requests, live-session scheduling, and the sign-off.

## AI-era relevance hint
- Contract-first design (interfaces/roles plus injected actors) gives AI coding assistants clear seams. You can generate in-memory test doubles and swap infrastructure without touching core logic.
- "Fewer components → fewer guesses" matters even more when AI makes it cheap to generate sprawling microservice scaffolding. The cost of operational guesses doesn't shrink.
- Programming by wishful thinking and Gherkin-first specs make good prompts: state B as an executable spec that AI output must satisfy.

## Coverage proof
- Lines read: 498 / 498
- Final line (verbatim): "in my kitchen talking to my computer screen some kinds of having been doing this hasn't enough to myself su an su other and bye"
