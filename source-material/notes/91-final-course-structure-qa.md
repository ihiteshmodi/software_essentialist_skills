# Lesson 91 — Aug 22nd, 2023 - Final Course Structure Q&A
- **Source file:** 91) Aug 22nd, 2023 - Final Course Structure Q&A.txt
- **Category:** qa-live
- **Topics:** course-structure, phases-of-craftship, topic-map, abstraction-prism, first-principles-effect, two-mental-models, abstraction, feedback-loop, 12-essentials, sagas, state-machines, composition, levels-of-realness, horizontal-decoupling, vertical-slicing, cqs, it-depends, systems-thinking, rdd-three-step, testing-in-real-jobs, fast-good-cheap, professional-responsibility, contract-testing, communication-verification, observer, loading-state, unit-of-work, doings-and-knowings, fa2str, ideal-developer-workflow, bridging-the-gaps, project-structure, coworking, community

## Summary
Khalil shows a new **topic map**, a tool built on the abstraction prism. He's using it as the North Star for re-recording the early course modules. It covers the intro (first principles effect, why software, four pillars, the two mental models, the guess points, the 12 essentials, the essentialist mindset) and then the **phases of craftship**. He argues that every one of the 12 essentials stems from the two metaphysical mental models, **abstraction** and the **feedback loop**. He demonstrates this by deriving sagas, composition and horizontal decoupling from them. He also argues there's "no more room for *it depends*": systems thinking tells you what it depends on. One student said their team doesn't write tests because of deadlines. Khalil's answer was about strategy and professional responsibility. Fast/good/cheap is a trade-off. Having a capability isn't the same as choosing to use it. Developers must tell customers the consequences, and customers make the business decision. Answering a request for "watching someone reason through designing and implementing a system", he walks the full planned course structure: Code First → Best Practice First → Pattern First → Responsibility First → Value First (FA²STR, guess points, design problems) → Bridging the Gaps (long live-coded front-end/back-end builds). It closes with community plans: a community calendar, weekly Q&As, and open coworking sessions.

## Core ideas
- **Topic map tool.** Based on the abstraction prism: goals → capabilities → features → acceptance criteria → deeper. Khalil lists the topics he wants to teach and links them. The links work "almost like a context" (a DDD idea). The map lets him see "exactly what it is I'm trying to tell you". It's his North Star and "in and of itself is like the walking skeleton". It means less rework.
- **Why the re-structure:** shipping the best-practice material first didn't work. Learners need awareness of the 12 essentials to frame the demos, or the demos are "quite confusing". Khalil also said his filming and teaching skills weren't ready when the course started.
- **Main value of the course**, stated as the guess-points lesson title: "How to use systems thinking, stereotypical architecture, FA²STR and the ideal developer workflow to work consistently and confidently decompose any design problem", at any level.
- The course sits at a **higher level of abstraction** than specific topics like DDD, testing or FP. It gives mental models so that "when you're ready to go deeper on those things, you know what to look for". That's what principles are for. The 12 essentials are the sub-principles, and above them sit the two mental models.
- **Hierarchy of relation:** many industry topics are connected (builder pattern → open-closed principle → …). The highest level of relation is the 12 essentials. Above that are the two mental models (abstraction and the feedback loop).
- **Visualizing connections** helps because the industry has many terms for the same concept (student comment Khalil endorsed). Concept maps only get you to conceptual understanding. Lessons, examples and demos are what make it "ingrained".
- **Abstraction explained:** software solves problems by getting from one place to another. Abstraction is "your highest level of understanding of what the problem is" plus the concrete, discrete steps to get there. You can describe those steps as past-tense events, states, or steps. Behind them are smaller, lower-level steps "abstracted away from us".
- **Feedback loop explained:** from here to there, you feed forward, get feedback, learn, and make the next attempt faster and better. Refine one system before moving to the next.
- **Sagas derived from these models:** every app can be seen as states. Signing up to Facebook takes you from not existing to a "just signed up" state (a command → state in the DB). Sagas chain a sequence of events and state machines. Example: Amazon's "place order" kicks off many other events. Sagas come in properly at the **stateful domain modelling guess point**, built on the mental-model foundation.
- **Each of the 12 essentials stems from at least one metaphysical essential.** Composition, for example:
  - Abstraction: composition is "inherently the art of abstraction", composing things to build up layers.
  - Feedback loop: encapsulation makes it evident what you can and can't do. That constraint makes feed-forward easier.
  - Composition has several uses: as a design tool (readability), an OO tool, a functional tool, and a strategic developer-experience tool.
- **Levels of realness** (interfaces/types are least real, concretions most real) is "a really key concept". Khalil dislikes OOP being taught as "here's a class that does this". He wants tools learned for a purpose, here writing scalable code, and traced back to that purpose.
- **Essentials are skills you can rank** as you move through the phases of craftship. At code-first you can connect a frontend to a backend or an API to a DB, so horizontal decoupling might be ~2/10. You probably can't connect an endpoint to acceptance criteria, goals or roles. You're still only in the "code levels" of the abstraction prism and thinking mostly physically.
- **By Value First, all the physical essentials should be solid.** Only then do you take on challenges and use FA²STR to decompose problems through the guess points.
- The path took Khalil "six, seven years". He estimates the course at roughly **8–12 weeks** once consolidated, with some content possibly cut later.
- **"No more room for *it depends*."** Take the scenario into systems thinking: theoretical, then physical, then which guesses to make, then time available. Short on time? Do E2E tests on the main things, then high-value unit tests if there's time. The Stripe API is weird? Add more outgoing tests. That's what it depends on.
- **Scheduling example (Ryan's old question):** get clear on the theoretical first. Find a concrete real-world example: how it's experienced and who's involved. That happens at the architecture guess point. Then run the three-step RDD process, then find tools that implement those roles (RabbitMQ, [Mondodini]).
- Compared with hexagonal architecture (student comment Khalil agreed with): hexagonal covers the technical isolation from infrastructure. This course adds **what drives development**: BDD, DDD, impact mapping, value, pain and benefit.
- **Vocabulary matters:** "We need to make sure we're all talking about the same stuff." At a consultancy, Khalil often found people meant the same thing: "Dan Abramov just said it a little differently."
- **Why only 12:** horizontal decoupling alone pulls in hexagonal, onion, ports and adapters, stereotypical, core vs infra, levels of abstraction, separation of concerns, [roots]… "It destroys the mind." Learn the 12, then map new things onto them. Example: CQS is about read paths and write paths, so it belongs to vertical slicing.
- **Capability vs choice:** "There's a difference between not being able to do something and not doing something." The course aims to give you the ability to know the right thing and to decide correctly, not to force best practice everywhere.
- **Learning path = "straight lines":** Khalil reverse-engineered his own path so you learn topics *when you need them* to solve problems. The alternative is "five months on domain-driven design" or on railway-oriented programming. "Topics for problems."
- **Pattern-first code is deliberately "perfect":** you're learning skills and moving toward the ideal. You won't reach the ideal in real work, but you'll use aspects of it.
- **Abstraction design** (building custom abstractions) is "probably the hardest part of software design in general" but "also the most important". Understanding **doings and knowings**, and where they go, lets you design anything.
- FA²STR was introduced too early before, and learners "were just not quite there yet". You need the same experience Khalil went through: reach Responsibility First, then learn systems thinking.

## Named frameworks / mental models
- **Topic map (abstraction-prism based)**
  - Purpose: map everything to teach and how it links. It's the North Star for course production.
  - Components: topic bubbles linked like contexts. Red stickies mark work still to do. The bubbles become videos.
  - When: planning any large body of work or content. It acts as a walking skeleton for the curriculum (inferred generalization).
- **First principles effect**
  - Purpose: get to the depths of things so you're confident you've "seen it". Then stop diverging (taking in more information) and start converging ("do the right things").
- **Two mental models (metaphysical essentials): abstraction + feedback loop**
  - Every other essential derives from at least one of them.
- **Phases of craftship** (final course structure). Each phase follows the pattern: problem → solution → what to do.
  1. **Code First:** just build something simple and make it work, with a couple of endpoints.
  2. **Best Practice First:** manual testing is bad, so write E2E tests (the most valuable ones). Set up the four-layer E2E testing infrastructure. Use a three-tier backend (controller, a persistence-encapsulating layer, application code). Move from MVC with JSON on the backend to MVC with a real frontend as the view. Deploy the walking skeleton to remove uncertainty. Main theme: **encapsulation** of infrastructure. Includes E2E plus integration testing (start/stop the DB and server). Composition is the prerequisite because the code starts as "a big clumpy mess". Ends with a **deployed front end + back end**. Also covers project structure.
  3. **Pattern First:** starts from a frontend with E2E tests that deploys and a backend with E2E tests to the DB. Goal: learn to write **high-value unit tests**, which requires patterns from DDD, hexagonal architecture and general enterprise patterns. Sequence: decouple from infrastructure (hexagonal, dependency inversion, "the many patterns"), backend first then frontend. Next come high-value unit tests with **result verification**, then **communication/behavior verification**, then **contract tests**. Last, state machines, state changes and sagas: listen for events and chain business logic.
  4. **Responsibility First:** the problem is needing something that doesn't exist as a pattern, library or framework. Teaches object design from scratch: roles, responsibilities, collaborations, stereotypical architecture. Custom abstractions include a loading state, a custom router, and a unit of work (transactions).
  5. **Value First:** "put it all together". FA²STR, systems thinking, the guess points revisited, the ideal developer workflow. Unique design challenges ("how would you design this aggregate to do this thing?") broken down from theoretical to physical. The guess-points section works mostly as reference with optional exercises: inputs → processes → outputs, piped to the next guess point.
  6. **Bridging the Gaps:** long live-coded builds (maybe ~2 hours each), top to bottom, a couple of features, pragmatic thinking, theoretical → physical, including technical challenges. The original scope (front end, back end, desktop, Chrome extension, custom integration) was cut to **front end and back end**.
  7. **Where to go next.**
- **Lesson format (skills phases):** slideshow lesson (Khalil talking), then a demo, then an assignment. You can either do the assignment or apply it to your own project with provided next steps.
- **Three-step RDD process**, as stated: (1) list all the responsibilities you can, (2) assign them to roles and identify what those roles are, (3) define how the roles collaborate. Then find existing tools that implement those roles.
- **Ideal developer workflow**, as restated: theoretical guesses → drop into the physical → deploy the walking skeleton → high-value tests.
- **Resolving "it depends" via systems thinking:** scenario → theoretical → physical → which guesses → time budget → testing and architecture choices.
- **Fast / good / cheap (pick two):** the testing trade-off is a strategy decision. Shipping without tests trades quality for time.
- **Doings and knowings:** the RDD lens for placing responsibilities. Know where the doings and knowings go and you can design anything.

## Definitions
- **Abstraction** — the highest-level understanding of a problem (getting from here to there) plus the concrete, discrete steps (events/states/steps). Lower-level steps are hidden from view.
- **Feedback loop** — feed forward, then get feedback, then learn, then a faster and better next attempt. Refine one system before moving on.
- **Saga** — state machines and events linked together to form a sequence. Chaining business steps, e.g. place order → subsequent events.
- **First principles effect** — reaching enough depth that you can stop diverging and converge on doing the right things.
- **Communication (behavior) verification** — "validating that state changes happen when they should" (as phrased in the session).
- **Result verification** — validating the result returned by the subject.
- **Contract testing** — introducing contracts so production code and test code follow the same path. Without contracts, mocks create "two divergent code paths".
- **CQS** — Khalil puts it under vertical slicing: read paths vs write paths.
- **Topic map** — Khalil's abstraction-prism-based diagram of linked course topics.

## Rules & heuristics
- Learn the 12 essentials first, then classify new jargon against them instead of chasing every term.
- Learn topics *for a purpose*, when a problem needs them ("topics for problems").
- Always work **outside-in**: start from the conceptual flow (the presenter loads posts, shows loading, has loaded posts), then design the abstractions.
- Before implementing a hard feature (e.g. scheduling), get a concrete real-world example and identify who's involved first.
- For a new project, the first thing is to **remove as much uncertainty as possible**: deploy the walking skeleton.
- Drive project-structure decisions through the theoretical and the physical, not anxiety. Related ideas: package by feature, discoverability, coupling and cohesion, use cases, sharing dependencies between front end and back end.
- Chain business logic via events/observer instead of piling if-statements at the end of API calls.
- To make mocks meaningful, use contract tests so test and production paths don't diverge.
- Practice new techniques on your own time, and apply proven professional skills at work (tire-change analogy).
- Customers make business decisions, developers make development decisions. **Know your role.**
- You have a professional responsibility to inform stakeholders about the consequences of the current way of working, ideally ahead of time.
- If missing tests start hurting your ability to keep users and customers "in benefit", raise it explicitly.
- Don't do something just because a craftsperson "should". Do what helps the customer succeed and keeps users happy.
- When applying course material at work, roll it out on the next feature, or on an existing feature in a new branch, and make it part of your infrastructure.
- Flaky E2E tests are usually a symptom of not having the four-layer structure.

## Anti-patterns / mistakes called out
- Answering design questions with "it depends" without saying what it depends on.
- Seniors and leads handing juniors "thick books" and saying "be better" (student remark Khalil echoed).
- Learning OOP as disconnected class examples with no purpose.
- Spending months studying one topic (DDD, railway-oriented programming) detached from problems.
- Shipping best-practice demos before learners have the essentials to frame them. Khalil made this mistake himself and it led to confusing demos.
- Introducing FA²STR before learners had the prerequisite skills.
- The **"I don't have time" limiting belief**: it's a value and strategy choice, so name it as one.
- Experimenting with unfamiliar techniques on paid client work.
- Using mocks without contracts, which gives divergent production and test code paths.
- Putting all loading logic directly in the presenter instead of extracting an abstraction.
- Stacking if-statements at the end of API calls to chain business logic.
- Code-first "clumpy mess" with no composition, which blocks testing and decoupling.

## Code discussed
- **Loading state (Responsibility First example).** Khalil recently designed this with a "responsibility first mindset": list all the responsibilities, then work outside-in.
  - Conceptual flow first: "presenter loads posts" → "show loading" → "presenter has loaded posts".
  - Before: the loading logic could have lived inside the presenter.
  - After: a separate **LoadingState** abstraction. He said this is "one way"; you could also use abstract classes.
  ```ts
  // reconstructed from narration
  class LoadingState {
    private loading = false;
    start() { this.loading = true; }
    stop() { this.loading = false; }
    isLoading() { return this.loading; }
  }

  class PostsPresenter {
    constructor(private postsRepo: PostsRepository, private loadingState: LoadingState) {}

    async loadPosts() {
      this.loadingState.start();                 // "show loading"
      const posts = await this.postsRepo.getPosts();
      this.loadingState.stop();                  // "presenter has loaded posts"
      return posts;
    }
  }
  ```
  (The method names and repository are inferred. The narration only specifies the presenter, the posts flow, and an extracted loading-state abstraction.)
- **Other planned custom abstractions:** custom router, unit of work (proper transaction handling).
- **Sign-up command sketch:** a `SignUp` command writes state to the DB. The user goes from nonexistent to a "just signed up" state. Used to explain state machines and sagas. No code shown.
- **Pattern First end state (described):** frontend with the right patterns, app/domain logic tested with high-value unit tests, infrastructure tested with contract tests (front end and back end). Backend business logic chained via an **observer**. Messaging infrastructure may be used, depth TBD.

## Diagrams / visual models described
- **Topic map** (in Figma per the session): purple bubbles for the metaphysical essentials, other essentials linked to them, red stickies for to-do items. The composition node links to OOP, FP and encapsulation/polymorphism/inheritance. The horizontal-decoupling node lists the many synonyms.
- **Intro slide:** first principles effect, why software, four pillars, two mental models, guess points, 12 essentials, essentialist mindset.
- **Abstraction drawing (iPad):** start point → end point with discrete steps (events/states) between them. Lower-level steps are hidden below.
- **Sign-up state diagram:** command "sign up" → DB below → new state "just signed up".
- **Vertical slice drawing:** layers labelled domain, app, infrastructure. Vertical = up and down through the layers. Horizontal = the pieces within the layers.
- **Abstraction prism with code-first shading:** code-first developers operate only at the lower code levels, not goals, roles or acceptance criteria.
- **Phases of craftship board:** each phase with problem → solution → what to do, and its start state and end state ("state of the universe").
- **Guess points as a pipeline:** inputs → process → outputs, piped to the next guess point.

## Q&A items
- **Is the topic-summary visualization useful?** (L50-L58) Yes (student comment). The industry has many terms for the same concept, so seeing connections helps. Khalil: the map gets you to conceptual understanding, and examples and demos make it solid.
- **How do the mental models explain advanced topics like sagas?** (L64-L95) Abstraction gives states and steps, and the feedback loop gives iteration. Apps are state machines, and sagas chain events and state machines (Amazon place order). They're taught at the stateful domain modelling guess point.
- **How does an essential (composition) relate to the metaphysical ones?** (L105-L119) See Core ideas: layering (abstraction) and encapsulation as a constraint that aids feed-forward (feedback loop).
- **How are essentials developed across the phases?** (L120-L134) They're ranked skills. Code-first horizontal decoupling is ~2/10. Best practice adds four layers, E2E infrastructure and three-tier. By Value First the physical essentials are in place, and FA²STR comes next.
- **"Most seniors just hand you thick books"; "it depends"** (L137-L146) Systems thinking is how you figure out what it depends on. Examples: time budget → which tests, weird Stripe API → outgoing tests, scheduling → concrete example, architecture guess point, three-step RDD, find tools.
- **Hexagonal architecture as supplemental reading?** (L143-L145) Yes for technical isolation from infrastructure. The course also covers BDD/DDD/impact mapping and value, pain and benefit.
- **Mental models caused imposter syndrome** (L146-L154) There are just two mental models, and every essential derives from them. The session then derives the vertical/horizontal layers and lists the horizontal-decoupling synonyms. CQS maps to vertical slicing.
- **How far into the phases should we apply things to a project?** (L175-L191) Khalil proposes concrete per-section next steps, e.g. after E2E: flaky tests → implement the four layers on the next feature or in a new branch. Either Khalil provides something to build or you build your own. Community matchmaking for group projects is possible.
- **Our managers say no time for tests. How do we apply this at work?** (L191-L240) You can apply much of it immediately. Time will always be the constraint, and culture matters. Car-tire analogy: the customer cares about the outcome and wouldn't want experiments, so practice on your own time. No tests = trading time for quality (Daniel). "I don't have time" is a limiting belief, and it's really a value and strategy decision (fast/good/cheap). All-manual testing scores 1 on subject/system verification, and that's acceptable sometimes. Capability ≠ usage. Don't test only for craftsmanship's sake. Inform customers of the repercussions, ideally in advance. Customers own business decisions and devs own dev decisions. "Know your role" goes into the mindset training.
- **I learn best by watching someone reason aloud while designing and implementing a system; pair coding would help** (L243-L262; answered L262-L386) Khalil walks the full phase plan (see Frameworks). The skills phases use "straight lines": lesson, demo, assignment or apply to your project. Value First adds design-problem breakdowns. **Bridging the Gaps** delivers exactly this: live coding top to bottom, a couple of features, strategic decisions (test types, how much horizontal decoupling, DB choice), technical challenges crowdsourced from the community front-end/back-end threads, maybe ~2 hours each.
- **Project structure anxiety** (L292-L300) Drive it through the theoretical and the physical. Related topics: abstraction prism, package by feature, discoverability, organizing, coupling and cohesion, use cases, sharing dependencies between front end and back end. It's in the Best Practice phase.
- **Pair programming / coworking** (L386-L431) Khalil can't run it himself and wants a community organizer. Ideas: a community calendar using Discord events, weekly Q&A cadence, open coworking where you announce your 2-hour goal and work (as in the healthy gamer community, Wednesdays 2 p.m. CST), open to the whole community. Delegation is a skill Khalil is learning.

## Notable quotes
- "We could stop trying to diverge and take in more information. Now it's time to converge and just do the right things."
- "It's designed to just give you the mental models so that when you're ready to go deeper on those things, you know what to look for."
- "There's no more room for it depends now."
- "So this is all just a process of figuring out what it depends on."
- "There's a difference between not being able to do something and not doing something."
- "Customers supposed to make business decisions and developers make development decisions."
- "What you want is your production code and your test code to be the exact same."
- "If you understand the doings and knowings, you could design anything."
- "Topics for problems."
- "It's hard to balance productivity with community."

## Cross-references
- Lessons: 1 (Fast Summary), 3 (Four Key Mindsets), 9 (Systems Thinking), 12 (Four Pillars), 13 (12 Essentials), 14 (Abstraction / abstraction prism), 15 (Feedback Loop), 16 (Vertical Slicing), 17 (Horizontal Decoupling), 19 (Composition), 20 & 53 (Subject/System Verification, 3 types), 24 (Walking Skeleton), 26 (Ideal Developer Workflow), 27 (FA²STR), 38 (RDD), 73 (hand-written spies), 74 & 76 (State machines), 79 (Levels of Realness), 90 & 92 (Frontend Architecture Q&As), 93 (Introducing the 12 Essentials).
- Concepts: sagas, state machines, CQS, hexagonal / onion / ports and adapters, stereotypical architecture, dependency inversion, contract testing, observer, unit of work, three-tier architecture, MVC, package by feature, coupling and cohesion, impact mapping, BDD, DDD, railway-oriented programming, builder pattern, open-closed principle.
- People: Dan Abramov (vocabulary example). Community members: Daniel/Danny, Osman, Yale, Ryan, Wes, Alex.
- Tools: Figma (topic map), Discord (threads, events), RabbitMQ, [Mondodini], Stripe API.
- Other: fast/good/cheap triangle; software craftsmanship.

## Fluff skipped
Greetings, name pronunciation, a Curb Your Enthusiasm swan tangent, audio/mic issues, Discord thread-link hunting, scheduling logistics and small talk.

## AI-era relevance hint
- "It depends → systems thinking" works directly as prompt structure: give an AI the scenario, the constraints (time, weird APIs) and the guess point, and you get far better architecture and testing advice than from an open-ended question.
- Contract tests and high-value unit tests make AI-generated adapters and infrastructure code safe to swap, because the tests pin the behavior rather than the implementation.
- Abstraction design (doings and knowings, custom abstractions like LoadingState or UnitOfWork) is still the human bottleneck. AI speeds up code-first building but doesn't decide where responsibilities belong.

## Coverage proof
- Lines read: 431 / 431
- Final line (verbatim): "care of yourself? Yeah."
