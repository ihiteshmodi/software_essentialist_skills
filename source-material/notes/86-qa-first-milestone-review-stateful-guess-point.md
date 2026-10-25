# Lesson 86 — Q&A April 22nd, 2023: The First Milestone Review & Intro to the Stateful Guess Point
- **Source file:** 86) Q&A April 22nd, 2023 The First Milestone Review & Intro to the Stateful Guess Point.txt
- **Category:** qa-live
- **Topics:** fa2str, stateless-guess-point, stateful-guess-point, n-loops, value-creation-system, stacking-theoretical-guesses, strategic-monolith, platform-leverage, organizing-code, developer-use-cases, impact-mapping, role-goal, discoverability, don-norman, alistair-cockburn, readme, state-machines, invariants, transitions, events, encapsulation, fixtures, builder-pattern, programming-by-wishful-thinking, aaa-backwards, thinking-backwards, elevator-assignment, course-structure, milestone-capabilities, planning, estimation, walking-skeleton, tracer-bullets, loom

## Summary
This is a live session held while the course was being restructured. The TDD content from the book has moved into the platform, and Khalil points students to the new FA²STR-at-the-stateless-guess-point videos. He explains that FA²STR is a plain input → output tool you can use at any level of abstraction, from a pure function up to an architectural problem like a job queue. In real work you drill in through **n loops**, not a fixed number of layers. He ties this to the value creation system as a game with a score: stacking theoretical guesses (strong architecture, a platform) lets you make physical guesses faster. His answer on how to organize code starts from the developer's role, goal and use cases (impact mapping) and uses Don Norman's discoverability/understanding to make those use cases visible in the README and module folders. Most of the session introduces the **stateful guess point**. He contrasts stateless data transformation with stateful problems through a hand-washing-clothes state machine, and defines invariants (rules / business logic that block invalid transitions), events, and encapsulation as protection of how the model changes. He then shows fixtures as initial state and a **builder** for setting up complex initial state, using a chess checkmate test. The session ends with course roadmap questions, catching up late, using techniques at work without evangelizing them, and planning ("planning is a lie; you have plans"), plus walking skeleton/tracer bullets. Despite the title, no specific first-milestone backend API code is reviewed.

## Core ideas
- **Course restructure:** the TDD assignment content from the book has moved into the platform as a more cohesive flow. The key new videos are in the stateless guess point ("How to use FA²STR…").
- **FA²STR at the stateless guess point** is no different from the emergent design with TDD they had been doing. The new point is awareness that **upfront work exists**, and it mostly happens **in the mind**.
- FA²STR is an **input → output system** (systems thinking). At simple stateless guess points (a function or stateless class) you probably won't do it on paper.
- **FA²STR works at any level of abstraction.** The same tool applies to a complex architectural problem. Example: student Ryan asked how to design a **job queue**, which is a system-level or higher, very architectural problem.
- **"How TDD works in the real world"** (updated module): you get a problem that might be solved at the stateless, stateful, application or infrastructure/end-to-end level. **It doesn't matter where you start. You always need to drill in with several loops.**
- Lucas's point: it's **"n number of loops" rather than an "nth layer loop"**.
- Drilling-in process: do FA²STR at the highest level → find responsibilities → get examples → discover the system under test and the guess point to write the test at → automate the infrastructure → that starts the first emergent design loop → emergent design calls on more constructs → this kicks off FA²STR again at another level.
- You can **take shortcuts** and skip testing at every level. The course teaches you to test at each guess point, and later the strategic design material covers when double/triple/quadruple TDD makes sense vs one level of end-to-end testing and "call it a day". **It depends on the score of the game you're playing.**
- **Value creation system = a game with a score.** Push value through, avoid negative value, and speed up play by optimizing parts of it.
- **Stack theoretical guesses** so the physical guesses go as fast as possible. An extendable architecture lets you skip the "architect" step for infrastructure. This is why strategic monoliths matter, and why a well-designed microservice architecture lets you build new products on top very fast. A strong platform means you ship new products on it quickly.
- **Organizing code starts from the developer's use cases**, not from folder conventions: find, add, remove, change, extend features, understand features, run a test for a feature, find a point to add code.
- Structuring projects starts from **clarity on the goal**: role → goal → actor → impact → what needs to be done. Most people never sit down to piece together the goal and the context (value-first development) in which it's executed.
- **Every stakeholder shares the same fundamental impact**:
  - Developer: produce value in software in a way that gets **increasingly easy** over time.
  - User: consume value in software.
  - Customer: own value as software in exchange for as little value (time, money) as possible.
- Khalil's confidence in his recommendations comes from having done "observe and evaluate, elimination, execution" himself and seen it reflected in other projects.
- **Course utility split:** The Software Essentialist gives the 80/20. **solidbook** is where you go deeper and do more observe-and-evaluate (humans and code, organizing code).
- **Course design philosophy:** milestone → capabilities → projects → topics → lessons. The first milestone started by writing down what you'd be able to achieve.
- **Stateful guess point, first capability:** be able to design and piece together **state machines**. That teaches **invariants**.
- Stateless FA²STR so far has only been **data transformation** ("feedback level one: stateless"). Example: palindrome "mom" → lowercase, reverse, compare → output.
- **Real-world problems are stateful.** "Problems are stateful." Problems get solved by **introducing state**, but state must be introduced carefully so it changes correctly and at the right time.
- **States and events are two sides of the same coin.** A state is where you are. An event is data saying "we just moved to this state".
- **Programming paradigm doesn't matter.** Transitions feel functional because they are the functional part of the program, whether you write OO or FP.
- **Purpose of encapsulation = protect the way the model changes** (protect invariants).
- **Fixture = initial state** for a test.
- Complex initial state should be **encapsulated with a builder**, not acted out line by line in each test.
- Guess point 2 (stateful) is relatively easy to design assignments for. Guess point 3 (application level) is harder and will likely be split into 3-4 parts.
- **Rite of passage for confidence:** confidence comes when you feel "done taking in information". Either you observe and evaluate everything yourself, or a mentor signs off ("you're good, go out and do stuff"), which ends the mentor-mentee relationship. Certificates of completion and a milestone quiz serve this purpose.
- **Course creation is itself an exercise of the content** (student Daniel's observation): shipping education as value in loops. Khalil's path: high-quality full video (too much) → full text docs (too much, especially philosophy) → "milestone + minimum content required to accomplish it" → ship V1 → check whether the theoretical solution worked → then optimize the physical (better videos/text).
- The **straight line** document (made for mentorship student Daniel): "go do this, come back when you get stuck", discussions and recorded videos. This was the fastest way to learn what content was needed.
- **Estimation is a strategic game:** look at your current puzzle pieces, their state and where you are in the game. There's no blanket formula. Having architecture and process more fleshed out helps you go faster.

## Named frameworks / mental models
- **FA²STR (Find, Architect, Automate…)** as an input → output tool
  - Purpose: decompose, architect and test any problem.
  - Components named here: find (responsibilities), architect, automate (infrastructure), then examples → system under test → emergent design loop.
  - When: at any level of abstraction, from a stateless function to an architectural job queue. On paper for complex problems, in the mind for simple ones.
- **n-loops drill-in (How TDD works in the real world)**
  - Start at any level (stateless / stateful / application / infrastructure / E2E) → FA²STR → emergent design loop → new constructs → FA²STR again one level down → repeat.
  - The number of loops is n, not a fixed layer count. Shortcuts are allowed depending on the "score of the game".
- **Value creation system as a game**
  - Push value through, avoid negative value, optimize parts to speed up play.
  - Principle: **stack theoretical guesses** (architecture, platform, process) so physical guesses are faster.
- **Impact mapping (walked through indirectly; the transcript also says ["Impress"])**
  - Steps: goal → actor(s) → impact → what needs to be done (who / why / what / how).
  - Described as an "Aristotelian" technique because it gets clear on the purpose of everything. It's also thinking backwards.
  - Used here to derive how to organize code from the developer's goal.
- **Role-goal for developer ergonomics**
  - Actor (e.g. Daniel) plays the role of developer → goal → responsibilities/use cases.
  - Multiple actors: users, customers, developers on the team. Everyone is affected by what you do next.
- **Developer use cases (after Alistair Cockburn)**
  - Find / add / remove / change / extend / understand a feature, run a test for a feature, find where to add code.
  - Use them to drive project structure and the README.
- **Discoverability → Understanding (Don Norman, *The Design of Everyday Things*)**
  - Two lanes: discover what you can do → take action in the world → "was that what I wanted?" → understand.
  - Components Khalil uses for code organization: discoverability, understanding, the seven principles of design, use cases.
  - Applied: prompts/constraints in the README so a developer sees "how to find/X a feature" within ~10 seconds, then module folders that reveal modules and their features right away.
- **State machine model (stateful guess point)**
  - Components: initial state, intermediate states, end state, transitions, events, invariants.
  - Example: clothes not washed → gathered clothes → assembled washing materials → clothes washed → clothes dry → clothes clean.
  - Built by **starting from the end** (thinking backwards).
- **Invariant = rule = business logic**
  - Says what you can and cannot do. It blocks invalid transitions (e.g. gathered clothes → clothes clean).
- **Fixture / initial state + Builder pattern**
  - Purpose: move state-changing setup out of the test and give a named initial state.
  - When: complex stateful setup such as a long chess move sequence.
- **Milestone → capabilities → projects → topics → lessons** (course/curriculum design flow).
- **Thinking backwards (daily practice)**
  - Every day: "What do we need to have next? Where do I want to be next? What is the state of the universe I will be in?" This carves out the pieces backwards. It ties back to the mastery foundations content.
- **Walking skeleton / tracer bullets**
  - Get a minimal version of the architecture out as fast as possible to iterate, learn how fast you work, and make better guesses (estimates).

## Definitions
- **Stateless (feedback level one):** data goes in, data comes out. Pure transformation (palindrome).
- **Stateful problem:** a problem with intermediate states. Being at a state is itself a form of data.
- **Transition:** moving from one state to the next. It's the functional part of the program regardless of paradigm.
- **Event:** created on every transition. A piece of data representing "we just moved to this state". Named like the state (e.g. "gathered clothes").
- **Invalid transition:** a jump the rules don't allow (e.g. gathered clothes → clothes clean).
- **Invariant:** a rule. Equivalent to business logic, it says what you can and cannot do.
- **Encapsulation:** exists to protect the way the model changes.
- **Fixture:** the initial state for a test.
- **Builder (pattern):** encapsulates construction of initial state so tests can start from a named, prepared state.
- **Scholar's mate / fool's mate:** quick chess checkmates, used as candidate named game states for test fixtures.
- **Tracer bullets:** equated here with the walking skeleton essential.

## Rules & heuristics
- Use FA²STR at whatever level the problem sits. Expect to drill in several times.
- You don't have to test at every level. Choose based on the "score of the game" (strategic design).
- Stack theoretical guesses (architecture, platform, process) to accelerate physical guesses.
- Start project organization from the **goal** and **use cases** of the developer role, not from folder conventions.
- Make developer use cases visible in the **README within the first ~10 seconds**. Let them constrain everything downstream (module folders → features).
- Guide design thinking with a **concrete example** (e.g. "developer opens the repo, what do they see?"). This takes extreme empathy: project yourself into the situation.
- Model state machines **starting from the end state**, then fill in the intermediate states backwards.
- As soon as you introduce state, guarantee it changes correctly, at the right time, and never at the wrong time.
- If a method like `dryClothes()` is called at the wrong time (e.g. on a new machine with no clothes), the system must **not let that happen**. Harden the concept wherever it's defined.
- Don't act out long state setup line by line in tests. Declare it as setup, name it, and encapsulate it with a builder.
- Use **programming by wishful thinking** and **AAA backwards** to design the API from the assertion (treat code as your paintbrush: "what do I want to happen? We'll figure out how later").
- Naming is a process. Start with a placeholder (`GameStates`) and refine.
- At work, **don't try to get the team to buy into all the named techniques**. Many practitioners use event storming/impact mapping implicitly without naming them. Being value-first is about you making better decisions.
- "Planning is a lie": **you have plans, not a plan**. Be ready to scrap what you've been doing when reality/users say otherwise.
- Personal deadlines shouldn't become external expectations. Give **estimates**, not concrete dates. Everything is a guess.
- Get to value as fast as possible. Delay is negative value.
- Replace some meetings with async recorded video (Khalil uses Loom), but take that with a grain of salt. No blanket advice.

## Anti-patterns / mistakes called out
- Doing work that has no impact because the goal was never made clear.
- A folder structure with no common convention and no README prompt, so developers can't find features.
- Letting a system reach an **invalid state**: examples are having to blow into a Nintendo cartridge, restarting the router, or Uber Eats accidentally purchasing after an interrupting phone call.
- Allowing an invalid transition (gathered clothes → clothes clean). "My mom would beat me."
- Exposing methods that make no sense in the current state (e.g. `dryClothes()` on a new, empty washing machine).
- Long sequences of state-changing moves inlined in every test.
- The design he sketched himself: `GameStates` class "is not the best design… but it works". `end.reason` is "terrible API design" (a rough first pass).
- Course-creation mistakes he admits: too much philosophy up front (the 1-5 summaries took far too long and didn't hook students), and trying for full high-quality video too early.
- Taking three months to ship the next batch of content = negative value for students.

## Code discussed
**No first-milestone backend API code was reviewed** in this session. Artifacts discussed:

1. **Palindrome as stateless I/O (whiteboard):** input "mom" → processes: lowercase everything, reverse, compare → output. Labeled "feedback level one: stateless".

2. **Washing machine (hand-washing) state machine → guarded API.** Before: a naive object exposing methods like `dryClothes()` callable on a brand-new machine. After (intent): state-aware logic that rejects invalid transitions.
```ts
// reconstructed from narration
const washingMachine = new WashingMachine(); // "It's new"
washingMachine.dryClothes(); // invalid: not started, no clothes -> system must not allow this
```

3. **Chess checkmate test, before (acted out line by line):**
```ts
// reconstructed from narration
it('knows that it can detect a checkmate', () => {
  const game = new Game();
  game.move(/* position */);
  game.move(/* position */);
  game.move(/* position */);
  game.move(/* position */); // alternating players, e.g. scholar's/fool's mate sequence

  expect(game.getState()).toBe('ended');
  expect(game.end.reason.type).toBe('checkmate');
  // also: which pieces were affected, why, and whose pieces they were
});
```

4. **Chess checkmate test, after (initial state via builder, programming by wishful thinking):**
```ts
// reconstructed from narration
const game = GameBuilder
  .fromCommonGameState(GameStates.theMostBrutalGameEver)
  .build();

expect(game.getState()).toBe('ended');
expect(game.end.reason.type).toBe('checkmate');
```
   - `GameStates` holds well-known named move sequences (e.g. "the most brutal game ever", scholar's mate) that the team knows. It takes a game, applies the moves, and returns the game.
   - Considered names: "game test util" (rejected: "terrible name"), then `GameStates` "for now". Khalil compares it to a service provider or helper tool.
   - Khalil notes the API shape is a rough first pass.

## Diagrams / visual models described
- **FA²STR image:** an input → output system with the find/architect/automate steps.
- **"How TDD works in the real world":** problem entering at the stateless/stateful/application/infrastructure (E2E) level, with repeated drill-in loops.
- **Value creation system** diagram: a game where value is pushed through, negative value is avoided, and parts can be optimized.
- **Impact map sketch (who / why / what / how):** actors (developer "Daniel", users, customers, team developers) → goals (produce value increasingly easily / consume value / own value cheaply) → developer use cases list.
- **Don Norman's two lanes:** discover → act in the world → "was that what I wanted?" → understand.
- **Washing clothes state diagram** (built live in a shared doc, students contributed "separate colors" and "put in detergent"): input "clothes to be washed" → gathered clothes → assemble washing materials → clothes washed → clothes dry → clothes clean (output). Transitions produce events named after the states. The invalid transition gathered → clean is marked.
- **Chess test layout:** start-of-game state → sequence of moves (act) → end state with checkmate assertions.

## Q&A items
- **VDN: FA²STR looks interesting; will it get clearer?** (approx L64-L69)
  - Yes, with more examples. The approach is to let students "mess up" to get fast feedback, then add the minimum theory needed to succeed. It takes gumption: "a little bit of pain… that's how you get to the game."
- **Is there a particular way to organize code (entry point, where to put modules/files, naming)?** (approx L70-L143)
  - Covered in solidbook ("humans and code"). Start from the developer role's goal (value-first: deliver value), then the actors and impact, then developer use cases (impact mapping, Alistair Cockburn's use cases).
  - Apply Don Norman: the README must immediately show how to find/add/change features, then module folders must reveal modules and features.
  - Khalil plans a course section on how and why to organize code. Students without solidbook can DM him for it.
  - Aside: a student is reading Cockburn to learn ports and adapters. Khalil says Cockburn popularized, if not invented, use cases in software. The book is older and document-heavy, but it changed how he thinks.
- **Are there stateful guess point assignments yet?** (approx L144-L216)
  - They need cleanup and sequencing. The first capability is designing state machines, which teaches invariants.
  - Long walk-through of stateless vs stateful, the washing-clothes state machine, invariants, events and encapsulation. Student Alexandra confirmed it was clear.
  - Upcoming: an **elevator assignment**, and a builder/fixtures assignment.
- **What is a fixture?** (approx L219-L283)
  - The initial state. Shown with the chess checkmate test, then refactored into a `GameBuilder` with named common game states. Watch the "AAA Backwards & Programming by Wishful Thinking" video and do the password validator to practice carving the API backwards.
  - Logistics: the GitHub assignment repo update will put students' clones out of date. A student could record the pull steps (e.g. with Loom).
- **When the course is finished, will all theory and practice be on video?** (approx L290-L300)
  - Yes. What's "iron clad" is the straight line: capabilities in sequence and the topics to learn. What's still being tuned is how much of each topic to show and the assignment clarity. Guess point 2 is easy to carve out. Guess point 3 (application level) is harder and will be split into 3-4 parts. Guess point 2 assignments come first, to get them into the feedback loop.
- **Book / how has *Essentialism* helped you?** (approx L301-L320)
  - A daily thinking-backwards ritual ("what state of the universe will I be in next?") that ties to mastery foundations. Student VDM dials everything back to essentials and first principles "because those never change".
  - Confidence comes from a rite of passage (self-completed observe and evaluate, or a mentor's sign-off). Planned: certificates of completion and a milestone quiz as a sanity check.
- **Just joined; is it too late to catch up?** (approx L320-L340)
  - Not late: early-adopter phase, self-paced. Only the first exercise set is out, and some devs finished it in days. New content (e.g. the "1 to 5 fast track") was added, so follow the **action item checklist** in sequence. Mob programming and pair sessions are planned (Daniel and Manny paired recently).
- **How to fit FA²STR into team upfront design / work with more than one dev / planning and meetings?** (approx L346-L356)
  - Yes, techniques exist. "I don't like meetings. And planning is a lie… You have plans. You don't have a plan." Khalil himself scraps approaches as feedback arrives.
  - Don't push the team to buy in. Practitioners use these techniques implicitly without naming them. Value-first is about you making better decisions.
- **When will V1 be ready?** (approx L356-L385)
  - Personal goal, not an expectation: the physical guess points done this month, even bare-bones. Definitely the stateless part, and possibly some level-3 application content. He'll prioritize assignments so students can run ahead, get stuck and report back, as Daniel did with the straight line doc. More clarity now → faster content production (refinement of the feedback loop). Essential #2 (feedback loop) + essentialism means everything is a guess: estimates, not dates.
- **Daniel: course creation is also an exercise of the content** (approx L385-L395)
  - Agreed, it's meta: the theoretical problem/solution/architecture were clear and the physical delivery format iterated (video → docs → milestone + minimum content). Ship V1, validate the theoretical solution, then optimize the physical.
- **I work at a growing software house (many apps, mobile) with no clear way of working. What topics should I learn?** (approx L395-L415)
  - Bridging-the-gap territory, to be discussed in the course. Thinking backwards and impact mapping are huge. Develop decision-making: what to focus on, when things get done, estimating.
  - **Tracer bullets / walking skeleton:** get a minimal architecture out fast to iterate, learn how fast you work, and make better guesses. Estimation is a strategy game (current pieces, their state, where you are). Having architecture and process fleshed out helps you go faster.
  - Bridging-the-gap projects will double as time management/planning exercises. Khalil uses Loom to avoid many meetings. "Can you give back time and enrich time with meetings?" No blanket advice.

## Notable quotes
- "It doesn't matter where you start. What always tends to happen. Is you need to drill in. With several. Loops."
- "It's going to depend on the score. Of the game we're playing."
- "One of those. Principles of the game. Is to stack theoretical. Guesses."
- "Problems are stateful."
- "Invariance. Equals a rule. Which really equals. Business. Logic. Which is saying what you can and cannot do."
- "What is the purpose of encapsulation? To protect the way the model changes."
- "You don't want to be able to put the system in an invalid state."
- "Initial state is equivalent to fixture."
- "Treating. Your code. As your paintbrush."
- "Planning is a lie. In my opinion. You have plans. You don't have a plan."

## Cross-references
- Lessons: 9 (Systems Thinking), 10 (Value Creation System), 15 (Feedback Loop), 24 (Walking Skeleton), 27 (FA²STR), 42 (First Milestone backend API demo), 49/50 (Palindrome), 51 (AAA Backwards & Programming by Wishful Thinking), 52 (FA²STR at the stateless guess point), 54-57 (Password Validator), 74 (State machines, invariants, transitions, events), 75 (Thinking Backwards), 78 (Fixtures with Builders), 85 (Mastery Foundations Q&A).
- Concepts: stateless/stateful/application guess points, n-loops, strategic monolith, impact mapping, role-goal, use cases, discoverability, state machines, invariants, events, encapsulation, fixtures, builder pattern, tracer bullets, straight line document, milestone → capabilities → projects → topics → lessons.
- Books: Don Norman, *The Design of Everyday Things*. Alistair Cockburn's book on use cases (inferred: *Writing Effective Use Cases*). *Essentialism* (inferred: Greg McKeown). A book on Khalil's shelf about architecture as leverage / platforms ["Writing software. Write. As in. Write it wrong."], which he hasn't fully read. solidbook (Khalil's own, "humans and code", organizing code).
- Tools: Loom, Kajabi (certificates), GitHub (assignment repo), shared Google doc/drafts for live diagramming.
- People: Ryan (job queue question), Lucas (n loops), Alexandra (invariants), Daniel & Manny (pair programming), VDN/VDM, Gang of Four (joke).

## Fluff skipped
Blueberries/Gang of Four banter, waiting for questions ("elevator music"), forgetting the words "checkmate" and "pool", doc-sharing fumbles, pricing/discount/purchasing-power-parity talk, goodbyes and garbled "thank you" tail.

## AI-era relevance hint
- Invariants and state machines are what keep AI-generated code from putting systems into invalid states. Specify states, transitions and forbidden transitions explicitly before letting an agent implement a domain object.
- Named fixtures/builders (e.g. `GameStates.theMostBrutalGameEver`) give AI agents and humans a shared, readable vocabulary for test setup, and shrink the context needed to write new tests.
- README-first developer use cases (discoverability) matter even more when coding agents navigate repos. Clear "how to find/add/test a feature" prompts steer both people and tools.

## Coverage proof
- Lines read: 423 / 423
- Final line (verbatim): "Bye. Bye. Bye. Sbchao. Bye. Not great. Thank you. Thank you. Thank you. Thank you. Thank you."
