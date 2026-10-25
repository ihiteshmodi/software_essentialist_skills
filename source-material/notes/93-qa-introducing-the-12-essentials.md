# Lesson 93 — Q&A - November 7th, 2023 - Introducing the 12 Essentials
- **Source file:** 93) Q&A - November 7th, 2023 - Introducing the 12 Essentials.txt
- **Category:** qa-live
- **Topics:** 12-essentials, abstraction, feedback-loop, value-identification, domain-discovery, strategic-design, vertical-slicing, horizontal-decoupling, temporal-decoupling, composition, subject-system-verification, walking-skeleton, deployment-delivery, phases-of-craftship, ideal-developer-workflow, event-storming, process-modeling, coordinator, composition-root, dependency-injection, continuous-delivery, bdd

## Summary
First live Q&A after a months-long break. Khalil walks the FigJam overview of all 12 essentials (the "ubiquitous language" of software essentialism), reading a short abstract for each and adding examples. Abstraction is the number-one essential. It is about direction: work from the top (role, goal, value) down to code. Working from code up "always results in a mess." Abstraction and the feedback loop are metaphysical and show up in every other essential. Value identification, domain discovery and strategic design cover the theoretical side. Vertical slicing, horizontal decoupling, temporal decoupling, composition, subject/system verification, the walking skeleton and deployment & delivery cover the physical side. The essentials are skills, or "stats" like in Fallout. They sit one level below the four pillars, and you need all of them. For ordering, use the ideal developer workflow and FA²STR. The session ends with a student's slot-booking system that notifies about 7 services, walked through the guess points. It also covers a code review of Eric's modular composition routes: build the DB connection once at bootstrap and inject it, instead of per request. Mark Seemann's DI book comes up for the question of when to switch from a composition root to a DI container.

## Core ideas
- **Course status (Nov 2023):** the final outline exists. The course took ~7 months of refining ideas taken from studying experts and noticing patterns ("when I don't do these things my code turns into... a spaghetti mess"). Early adopters helped piece it together.
- **Value delivery is universal:** the same process applies to books, clothes and software. Someone plays a role, needs to achieve a goal, and we get them to *experience* something of value. Software is "just what you plug in the middle."
- **Abstraction prism / directionality:** people struggle with any new skill because they ignore the abstraction prism. Coding from the bottom (code) up toward the vision always ends in a mess. Always start from the top and go down. "The major big learning."
- **Why the essentials are presented up front:** they come after the general mental models (systems thinking, what software is, the value creation system, 3 roles, working against features). They prime your subconscious (the "red Audi" effect) so you notice violations while going through the phases of craftship.
- **Why 12 essentials exist:** all 3 roles (customer, developer, user) must win at the same time. That limits what we can do, and this is what gives the 12 essentials their meaning and reason.
- **Phases of craftship refine the essentials:** best-practice first, then pattern first (heavy on horizontal decoupling and composition, both frontend and backend), then value first. At value first, "the question now is not how do I do things... [but] what do I want to do": which companies, which problems, what personal vision.
- **Final course part = "the guess points":** puts everything into a systematic process using the FA²STR design method (Khalil notes the structure may change).
- **Fallout character stats metaphor:** each essential is a stat you build up through the phases of craftship.
- **Abstraction:** theoretical vs physical = high level vs low level = contract vs concretion = abstract vs real = type vs implementation = declarative vs imperative. It is hard to grasp because it is everywhere. It is "the fabric of how we achieve goals."
- **Developer's job = problem decomposition.** Abstraction is used to decompose problems so solutions are easier to understand and reason about.
- **Top-down sequence:** who (roles), why (goals), what (features) → stories → acceptance criteria → concrete examples → validated → *then* write code (physical). Result: less code, "start with the end in mind," impact.
- **Thinking forwards = reacting:** acting without clarity on why. Project into the future, then bridge the gap with code. That is what TDD is: declaring the value you're about to realize. A test is "a flag post in the future," and it tells you when you're done.
- **Self-check at any moment while coding:** "what is the actual value of me doing this thing... how can I connect this to a role's goal?" If you can't answer, you're thinking forwards.
- **Value depends on context/roles:** DDD Forum (a Hacker News–like forum) was written only to practice DDD. That is value for Khalil as learner/educator, not for real customers. Through the phases the reason gets refined, e.g. conference organizers who need forum software as part of their conference.
- **Clarity on roles, goals and capabilities before any code** is itself essential. Without it the other essentials can't be done properly.
- **DDD without value:** learning DDD on a project with no real value leads to learning only the patterns. You skip the important part: crunching and refining a domain model and abstracting what matters into code.
- **All essentials are interconnected and "bleed into each other".**
- **Feedback loop:** every step toward a goal will hit problems, confusion and mistakes. Everything in software development is a guess. The first guess is theoretical ("does anyone even care?"), e.g. an anime debate app. Validate it with the first theoretical essential, value identification.
- **No known alternative:** you can't reach a goal without splitting it into high and low level (abstraction) and trying, failing, learning and retrying (feedback loop). "Someone else comes up with a different way... let me know."
- **Highest theoretical abstraction in code = the acceptance test / feature file.** Include stories and acceptance criteria, plus a concrete-examples table. If someone can read it and see exactly what the software should do, you have the top-level abstraction. The rest is going deeper into implementations.
- **A personal problem solved = a domain model:** Khalil tracks life problems in Notion. Solving one produces systems, knowledge, language, processes and symbols, which is a domain model and could become a domain model implementation in code.
- **Software Essentialist is itself a domain model:** it is Khalil's answer to "how did I spend ~$40K on a degree and still not know how to build software / what matters?" The same applies outside code (e.g. social/emotional skills as a domain).
- **Rabbit-hole abstraction:** reading a book from chapter 1 to 8 vs getting stuck in 1.1 → 1.2.3 → 1.3.1. In code: the goal is a frontend app, but you go deep into Webpack, its nuances, then plugins. Stop when the problem is solved.
- **Mental models are "good enough," not perfect.** They let people get the idea fast and communicate. "All abstractions are mental models."
- **Vertical slicing heuristic:** "If you can't see your features from the folder structure alone, there's a good chance maintainability is under pressure." It is ongoing "deepening, ripening" of the code.
- **Two types of vertical slices:** (1) the high-level module / bounded context / capability; (2) the operation, meaning an API call, a thinner input→output slice. Features/workflows sit between them (Khalil corrects himself live: capabilities ≈ modules, features ≈ workflows).
- **Cohesion = how thick to cut:** more or fewer modules is a judgment call ("feel into" it). Vaughn Vernon: domains → bounded contexts → sub-bounded contexts (sub-modules). A feature might become a folder, a file, or just a feature file in tests.
- **Discoverability and understanding** decide coupling/cohesion all the way through: "Can you find your features? Can you find what you need to change...?"
- **Ideal codebase entry path:** README says "go to the tests" → tests folder broken down by capability → a feature file per feature → stories → acceptance criteria/scenarios with concrete examples → then into code.
- **Horizontal decoupling has 2 parts:** (1) know what your abstractions are, their purpose, how they talk to and coordinate with each other, and so where each line of code belongs; (2) practice decoupling them so you gain control, which enables subject verification and a testing strategy.
- **Code-first devs write code "until the thing works."** Organization matters once you want to test specific parts (e.g. only app/business logic). "You haven't been bit yet," and once you are, horizontal decoupling is the first step.
- **Learning testing is hard** because "it means learning 18 other things at the same time."
- **Horizontal decoupling = breaking a vertical slice into parts.** This gives control over the testing strategy, e.g. fast tests for CI instead of running E2E tests right away.
- **Temporal decoupling:** requirements get added after an operation (post job → notify admins, update recommendation service, analytics...). The natural tendency is to append awaited calls. If the first fails, the rest don't run. Reality is temporal and event-based, so design an event-based architecture from day one.
- **Temporal coupling is hard to fix later.** It is "only solvable... from the very start" (a student called it "one of the most stressful code smells"; each fix added complexity).
- **Coordinator object stereotype:** its one purpose is to take in events and let other parts of the codebase know, so they can act. Frontend: often simple (like Redux subscriptions). Backend: persistence, exactly-once events, "[box patterns]" (outbox pattern, inferred), messaging. It is explored at varying complexity in the phases.
- **Unidirectional flow is the key** to temporal decoupling: event → bus → command → command handler, cycling one way (Redux, a student's editor/form architecture).
- **Action today:** if code is littered with "after this / before that / only when this happens," invert it with event-based architecture. Kick off simply with a coordinator (basically event listeners), then make it more robust later.
- **Composition (abstract read aloud):** software is made of many parts, but many devs wire them "without much thought." That creates coupled code that is hard to use, understand, test and maintain. Composition = consciously creating a network of collaborating abstractions. Done well, the app is configurable from one location and dynamic runtime behavior is easy.
- **Environment `if`s are a smell:** code littered with `if env === 'prod'` means it must run dynamically but components aren't swappable. Test → fake DB; prod → MySQL.
- **Composition depends on horizontal decoupling:** without concerns in buckets there's "nothing to swap"; it's "jiggly puff type code." Steps: (1) use concrete abstractions that make sense and talk properly; (2) link them correctly via a **composition root**. This is how you get into dependency inversion, DI and containers (deep topic, deferred).
- **VS Code analogy:** plugins and themes dynamically change how the app looks and runs. Aim for an app that is "polymorphic in general," with an architectural component that allows this.
- **Subject/system verification:** you must be able to place a boundary around what you want to test (e.g. only app logic). Often you can't, which means you need more horizontal decoupling, vertical slicing or composition. "It all builds on each other."
- **Choosing the subject under test is a guess:** e.g. do API/GraphQL calls route to the right use cases, do contracts still hold? That needs a boundary from the outside world to the use-case entry = a **contract test**. Test type depends on the guess being validated.
- **Three verification techniques:** result, state and communication verification (covered in depth in the course).
- **Walking skeleton:** the start of any project is when things are most likely to go wrong, so expose those guesses ASAP. Deploy a minimal slice of functionality end to end. Includes: drawing the architecture, test infrastructure, foundation, choosing patterns, structure (monolith/monorepo), scripting, test deploy, and E2E from UI to DB. "Make sure we could score." Then make it better.
- **Strategic design (Khalil's broader take):** DDD's version (Vernon's "red book") is deciding which components to build, outsource, or build anyway, i.e. core/supporting/generic subdomains. Example: should the core of your business depend on Notion's API, which may change? Khalil's version also includes clarity on subdomains/contexts, the tools, and four abilities (see frameworks).
- **Many devs struggle piecing together an architecture** because they don't know what stereotypical concerns do and where they belong (e.g. where React Query goes).
- **Glue code → RDD:** when no out-of-the-box integration exists, you write glue code. This is responsibility-driven design and object design, Khalil's "favorite topic right now."
- **Deployment & delivery:** intentionally simplified. Goal: make it very hard to ship *negative value* to users. Testing investment pays off here (ROI).
- **Pipeline:** commit phase (fast unit tests) → acceptance phase (deploy to a production-like env such as staging, run acceptance tests that mirror real user experiences) → deploy (manual or automated). Add phases for security and performance. Some developers' entire job is making this pipeline fast. The source is the Continuous Delivery / DevOps movements ("I'm not the brainiac that invented this").
- **Essentials vs 4 pillars:** "The only things that actually really matter are architecture, testing, design, and strategy." Education fails because they're a "tangled maze." The 12 essentials are a lower level of abstraction built on the pillars that can be practiced as skills, then applied to use cases.
- **You need all 12.** You don't pick them per use case. You can be "2 out of 10" on horizontal decoupling and still follow the ideal developer workflow.
- **Order comes from the ideal developer workflow** (a checklist for starting a new project/feature, beginning with clarifying the theoretical guesses) and FA²STR (a mnemonic for "[floop]"-ing through problems from a systems-thinking view). The ideal developer workflow is "fundamentally a good enough tool."
- **Psychic entropy:** without a consistent process, problem decomposition feels overwhelming. Knowing which guess point you're at tells you whether you can move forward yet.
- **Connection per request is questionable:** too many handshakes, and slow with serverless cold starts. Typical approach: one connection at bootstrap, repos built in the composition root, repos use the connection when needed.
- **Masters forget their habits:** Khalil abstracts the DB connection automatically and had forgotten he does it. It was probably learned from a past problem.

## Named frameworks / mental models
- **The 12 Essentials** (as presented in this session, in presentation order):

| # | Essential | Category | Core idea (this session) | Examples / tools mentioned |
|---|---|---|---|---|
| 1 | Abstraction | Metaphysical | #1 essential. Work top-down from value (role→goal→features→stories→examples) to code; theoretical vs physical; problem decomposition | Abstraction prism; feature file / acceptance test; book-chapters rabbit hole; Webpack |
| 2 | Feedback Loop | Metaphysical | Everything is a guess. Try, fail, learn, retry at every step | Guess points; anime debate app's first theoretical guess |
| 3 | Value Identification | Theoretical ("first theoretical essential") | Get clear on what is valuable: who, impact, capabilities | Impact mapping; DDD Forum → conference organizers |
| 4 | Domain Discovery | Theoretical ("next theoretical essential") | Get clear on the language and shared understanding of the domain (DDD techniques) | Big-picture event storming; process modeling; Notion problem log |
| 5 | Vertical Slicing | Physical | Features visible from folder structure. Two slice types: module/bounded context vs operation (API call) | Claims workflow event storm; Facebook user capabilities; tests-by-capability layout |
| 6 | Horizontal Decoupling | Physical | (1) Know abstractions and where code belongs; (2) decouple them to gain control and testability | `this.repo.save(post)` → application service/use case; DDD "10–15 named buckets" |
| 7 | Temporal Decoupling | Physical | Reality is temporal/event-based. Event-based architecture day one; unidirectional flow | Post-job side effects; coordinator; Redux; event→command bus drawing |
| 8 | Composition | Physical | Consciously wire collaborating abstractions; configurable from one place; swappable components | `if env === prod` smell; fake DB vs MySQL; composition root; DI; VS Code plugins/themes |
| 9 | Subject/System Verification | Physical | Place a boundary around the subject under test to validate a specific guess | Contract test; result/state/communication verification |
| 10 | Walking Skeleton | Physical (inferred from course file names) | Deploy a minimal end-to-end slice first to expose early guesses | Architecture drawing, test infra, monolith/monorepo, E2E UI→DB |
| 11 | Strategic Design | Theoretical (inferred from course file names; not labeled in session) | Decide/stereotype/build/integrate/prioritize architectural components | Core/supporting/generic subdomains; Notion API risk; React Query placement; glue code/RDD |
| 12 | Deployment & Delivery | Physical ("this physical essential") | Make shipping negative value very hard; CD pipeline | Commit phase → acceptance phase (staging) → deploy; GitHub Actions |

- **Metaphysical essentials** (abstraction + feedback loop): they refer to the nature of reality. Solving problems needs theoretical + physical work and charting a path from start to goal. They show up in every other essential.
- **Abstraction prism:** the visual of high (vision/value) vs low (code). Directionality is always top → down.
- **Phases of craftship:** code first → best-practice first → pattern first → value first (with responsibility first mentioned as a phase in the DI discussion). Each phase refines the essentials. After value first comes the "guess points" part with FA²STR.
- **Fallout stats model:** the essentials are character stats you level up.
- **Guess points (as walked for the slot-booking student):** problem clarity (value identification: impact mapping, who/what/impact/capabilities) → solution clarity (domain discovery: big-picture event storming → process modeling one story end-to-end) → problem-decomposition guess point (experience, screens, data in/out, speed needs such as WebSockets) → architecture guess point (tools, tests, CI tests, architecture, event-based day one?) → walking skeleton.
- **Two levels of event storming:** *big-picture* gets an organization (manual or long-running) onto the same language. *Process modeling* picks one user story, "walk[s] the path," and finds the exact input/output data from pain to benefit.
- **Strategic design, 4 abilities (Khalil's version):** (1) stereotype architectural components quickly (what does it do, where does it belong); (2) build components yourself when none exist; (3) integrate existing components, writing glue code when no integration exists (RDD/object design); (4) prioritize components: core / supporting / generic, i.e. build, buy off the shelf, or avoid depending on.
- **Coordinator (object stereotype):** takes in events and notifies interested parts. Used to start temporal decoupling.
- **Composition root:** the single place where abstractions are wired, the entry to DI/containers. Poor Man's DI [transcript: "screwed poor man's deal"] vs DI container, per Seemann's effort-vs-messiness graph.
- **Deployment pipeline (from CD/DevOps):** commit phase → acceptance phase → deploy, extensible with security and performance phases.
- **Ideal developer workflow:** the checklist for starting a new project or feature. Gives the ordering. Builds on the 12 essentials.

## Definitions
- **Abstraction:** the fabric of how we achieve goals. Splitting into high level (theoretical, contract, type, declarative) and low level (physical, concretion, implementation, imperative).
- **Theoretical:** clarity on what we're trying to do/solve. **Physical:** writing the code and turning it into software.
- **Problem decomposer:** Khalil's definition of the developer's task.
- **Feedback loop:** recognizing every action is a guess and iterating on validation.
- **Value identification:** "the practice... the act of getting clear on what is valuable."
- **Domain model:** the set of systems, knowledge, language, processes and symbols used to solve a problem.
- **Domain discovery:** getting very clear on the language used and making sure everyone else understands it.
- **Ubiquitous language (of software essentialism):** the 12 essentials themselves.
- **Feature / workflow:** a main thing someone needs to do, made of several operations (e.g. submit claim → check documentation → check insurance → accept claim → perform payment → notify customer).
- **Operation:** an API call. A thin input→output vertical slice.
- **Capability:** a high-level thing a role can do (profile management, friending, settings, stories), which maps to modules.
- **Responsibility (for doing or knowing):** a line of code's job, which decides where it belongs.
- **Temporal coupling:** chained "after X do Y" logic that breaks when earlier steps fail.
- **Composition:** consciously creating a network of collaborating abstractions.
- **Contract test:** verifies API requests route to the right use cases and contracts still work.
- **Subject/system verification:** choosing which part of the system is the subject under test, based on the guess being validated.
- **Walking skeleton:** a minimal useful slice of functionality, built and deployed end to end at project start.
- **Strategic design (DDD):** deciding core/supporting/generic subdomains and what to build, outsource or build anyway.
- **Psychic entropy:** the overwhelm felt without a consistent process.

## Rules & heuristics
- Always start top-down, from value to code. Never code up toward the vision.
- Have clarity on roles, goals and capabilities before writing any code.
- While coding, be able to link what you're doing to a role's goal at any moment.
- Write the test first as a "flag post" of the value to be realized. It also defines done.
- Put the highest-level abstraction in code as feature files with stories, acceptance criteria and concrete-example tables.
- Stop going deeper into abstraction once the problem is solved. Don't get stuck in chapter 1.2.3.
- Features should be visible from the folder structure.
- Let discoverability and understanding decide module granularity (coupling/cohesion).
- Organize tests by capability → feature file → stories → scenarios/examples. README should point newcomers to the tests.
- Learn the named "buckets" (repository, use case, etc.) and know where each line belongs.
- Horizontally decouple so you have fast tests for CI. Don't rely only on E2E in CI.
- If "after this / before that" code piles up, invert it with events. Start with a coordinator.
- Design event-based architecture from day one when workflows have side effects.
- Replace `if env === ...` branches with swappable components wired in a composition root.
- Start with a composition root (poor man's DI). Move to a DI container only when code gets messy (Seemann).
- Prefer one DB connection at bootstrap, injected into thin repositories via a `DbConnection` abstraction. Don't open connections per request unless a real need exists.
- Build and deploy a walking skeleton first. Make sure you "could score" before improving.
- Don't build your business's core on volatile third-party APIs (e.g. Notion).
- Make shipping negative value hard: fast tests in the commit phase, acceptance tests on staging, then deploy.
- Use the ideal developer workflow for ordering. Don't move forward past a guess point without its clarity.
- Ask questions even if you think you know the answer; others might not.

## Anti-patterns / mistakes called out
- Coding from the bottom up toward the vision ("always going to result in a mess").
- Thinking forwards: acting reactively without clarity on why.
- Building software with no real value (e.g. a practice-only DDD Forum), or learning DDD on a valueless project, so you only learn patterns.
- Rabbit-holing into tooling (Webpack → nuances → plugins) instead of reaching the goal.
- API-first / code-level-first design (a student's approach). Khalil calls it extremely common and recommends *BDD in Action*.
- Writing code "until the thing works" with no thought to where things belong ("anarchy").
- Putting `this.repo.save(...)` in a controller instead of an application service/use case.
- Appending a growing list of awaited side-effect calls after an operation (temporal coupling).
- Wiring parts "without much thought." Environment `if`s scattered through the codebase. "Jiggly puff" clumpy code with no boundaries.
- Not being able to put a boundary around the code you want to test.
- Skipping the walking skeleton and discovering deployment/infra problems late.
- Opening a DB connection per request without need (handshake overhead, cold starts).
- Async build methods that callers might forget to `await` (Khalil's concern with `UserRepository.build`).

## Code discussed
- **Registration feature file / acceptance test** in the reference repo (ddd-forum, `packages/backend/tests` and shared `tests/e2e`): stories such as successful registration, failed registration, returning to a deactivated account. It has acceptance criteria and could hold a concrete-examples table. Backend `tests/registration` is the first code-level abstraction of the "successful registration" story.
- **Horizontal decoupling quiz line** (posted in chat). Answer: application service / use case, i.e. application-layer logic or high-level persistence logic.
```ts
// reconstructed from narration
await this.repo.save(post);
```
- **Temporal coupling example (post job):**
```ts
// reconstructed from narration
async function jobPosted(job: Job) {
  // ...post the job
  await afterJobPosted(job);
}

async function afterJobPosted(job: Job) {
  await notifyAdmins(job);             // if this fails...
  await updateRecommendations(job);    // ...these never run
  await trackAnalytics(job);
}
```
Fix: event-based architecture with a coordinator (event listeners), which becomes more robust later (backend: persistence, exactly-once, outbox).
- **Composition smell:**
```ts
// reconstructed from narration
if (env === 'prod') {
  analytics = new NodeAnalyticsService();
}
```
Fix: swappable components (fake DB in test, MySQL in prod) wired in a composition root.
- **Student architecture drawing (Excalidraw [transcript: "Excalibur"], inferred):** events (mouse clicked, key pressed) → handlers → bus → commands → command handlers, with a unidirectional cycle like Redux.
- **Eric's modular composition routes** (Hono backend, an Express alternative; MikroORM [transcript: "Micro ORM"]): a main bootstrap module bootstraps each module (user module: create/edit/get user, assignments). `UserRepository.build()` is async and reads config, inits the ORM with entities and sets up the DB connection. Eric deferred building the repo to request time to avoid a long-lived connection. Khalil: clean and easy to understand, but callers might forget `await`. Osman: separate the connection, and let the repo handle it when a CRUD method is called. Consensus: create a `DbConnection` abstraction once at bootstrap and inject it into thin repositories via the composition root.
```ts
// reconstructed from narration
const dbConnection = await DbConnection.create(config);
const userRepo = new UserRepository(dbConnection); // thin: uses connection only for data access
```
- **Kirill:** tested a composition root for simple cases. The bigger the app, the more a DI container is needed.

## Diagrams / visual models described
- **FigJam "12 essentials" board / current course outline** (exported and shared with attendees): each essential with a short abstract and "cute little stickies" of tools/practices.
- **Abstraction prism:** vision/value at top, code at bottom. The arrow must go top → down.
- **Systems thinking + guess points image:** problem → solution → physical aspects.
- **Book chapters image:** chapter 1→8 as the goal path vs going deep into 1.1, 1.2.3, etc.
- **Vertical slicing drawing:** green boxes = features/workflows. Inside are operations (API calls) with input at the top and output coming back out.
- **Claims event storm:** submit claim → check documentation → check insurance → accept claim → perform payment → notify customer.
- **Live Facebook capability sketch:** user → profile management, friending, list profile, settings, stories.
- **Fallout character-creation stats image** (in the training) with "discoverability and understanding."
- **Four pillars image** with the tangled set of things needed to learn testing (subject verification).
- **Deployment pipeline:** commit phase → acceptance phase (staging) → deploy.
- **Student's event → bus → command → handler architecture** with unidirectional flow.

## Q&A items
- **Will we go deeper into each essential in later lessons? (L27-L58)**
  - Yes. The metaphysics comes first (systems thinking, value creation system, 3 roles), then the essentials at a high level to prime you.
  - The phases of craftship refine them: pattern first uses horizontal decoupling and composition heavily. At value first the question becomes "what do I want to do."
  - The final part, "the guess points," turns everything into a process with FA²STR. The essentials are like Fallout stats.
- **Can you share the FigJam/picture of the 12 essentials? (L60-L66)**
  - Exported (~2 MB) and uploaded to the chat.
- **Show a simple example of abstraction using the reference repo domain. (L86-L141)**
  - Highest level: impact mapping (who, what impact). That is value identification.
  - DDD Forum had no real value until reframed for conference organizers.
  - Then the feedback loop (first guess: does anyone care?), then stories → acceptance criteria → examples in the registration feature file, which is the top abstraction in code.
- **Comment: "Clarity means less guesses... A robust domain can only come from trying to build something of value." (L140-L141)**
  - Khalil agrees ("awesome summarization"). This leads into domain discovery via his Notion problem log.
- **"Eventually you see the light at the end of the rabbit hole?" (L165-L176)**
  - Stop once the problem is solved. Book-chapter analogy; Webpack example.
- **Comment: event storming is a pathway to a ubiquitous language? (L192-L203)**
  - Yes. Big-picture event storming aligns an organization's language. Process modeling walks one user story to find exact inputs and outputs. It is problem decomposition.
- **Comment: things make sense quickly for some aspects (Hesh). (L203-L210)**
  - That's the point of mental models: good enough to get the idea fast. The 12 essentials are the ubiquitous language of this domain.
- **Comment: vertical slices = modules = bounded contexts? (L230-L246)**
  - A good start. Khalil splits it into two types: high-level module/bounded context and the thin operation (API call).
  - Cohesion decides how thick to cut. Vernon's sub-bounded contexts are optional.
- **"Am I doing it wrong? I make abstracted APIs on top of the vertical hierarchy..." (L258-L270)**
  - This is an API-first approach, starting at code level. Extremely common.
  - Read *BDD in Action*. It is foundational and points where value first leads. Testing is hard to learn immediately, which is why the phases exist.
- **Horizontal decoupling quiz: where does `await this.repo.save(post)` belong? (L276-L289)**
  - Eric: application service / use case, application layer, high-level persistence logic. Correct.
- **Eric: DDD provides ~10-15 named buckets; memorizing them was uphill, now I know where code goes. (L289-L294)**
  - "That's fundamentally the task here."
- **Hesh: temporal coupling is one of the most stressful code smells; each fix adds complexity. (L296-L325)**
  - Only solvable from the start with event-based architecture.
  - Reviewed a student's event/command-bus drawing. Unidirectional flow is key. Start with a coordinator.
- **Strategic design, are you familiar? (L383-L391)**
  - Attendees: "It's a mystery"; "read the blue book, don't remember much."
  - Khalil gives the DDD version (core/supporting/generic) plus his 4 abilities.
- **Kirill: GitHub Actions are dope. (L426-L428)**
  - Agreed. Kirill has shown Khalil much about pipelines.
- **Is there an order to the 12 essentials when starting or working on a project? (L436-L448)**
  - No particular order: they are skills and mental models.
  - For ordering, use the ideal developer workflow (checklist, starting with clarifying theoretical guesses) and FA²STR (mnemonic). You can be "2/10" on an essential and still follow the workflow.
- **Can we pick any of the essentials based on the use case? (L446-L458)**
  - No. You need all of them.
  - Only architecture, testing, design and strategy really matter. The essentials are a lower-level, practicable abstraction of the pillars, applied as skills to use cases.
- **Student's slot-booking system notifying ~7 services after booking; still planning. (L458-L497)**
  - They're in the theoretical phase, which is fine.
  - Problem clarity: value identification / impact mapping. Solution clarity: domain discovery, first big-picture event storming, then process modeling of one story.
  - Next, the problem-decomposition guess point: screens, data flow, speed (maybe WebSockets). Then the architecture guess point: tools, tests, CI, event-based day one. Then the walking skeleton.
  - Everything is in the ideal developer workflow video. The student decided to build their own solution because third-party options didn't meet requirements. A user survey was finished.
- **Eric: review modular composition routes and deferred dependency building (repo built at request time for DB connection optimization). (L497-L520)**
  - Clean. Watch for a forgotten `await` on the async build.
  - Osman and Khalil: per-request connections cost handshakes and cold starts. Use one connection at bootstrap wrapped in a `DbConnection` abstraction, injected into thin repos via the composition root. Eric: "quite clever."
- **Kirill: a composition root works for simple cases, but bigger apps need a DI container. (L520-L525)**
  - Recommends Mark Seemann's *Dependency Injection* book: pragmatic, with a graph of effort vs messiness. Past the cutoff, switch to a container. Start with a composition root.
  - Covered in the course in responsibility first or pattern first.

## Notable quotes
- "We always need to start from the top and go downwards."
- "The software is just what you plug in the middle of that to make it happen."
- "You are supposed to just be a problem decomposer and you use abstraction to decompose problems."
- "Writing tests is just setting a flag post in the future to explain what we are about to realize."
- "Every single thing we're doing in software development is a guess."
- "If you can't see your features from the folder structure alone, there's a good chance maintainability is under pressure."
- "Learning testing... means learning 18 other things at the same time."
- "The nature of reality is... temporal. We solve problems in a temporal way. It's event based."
- "We make it very hard to ship negative value to our users."
- "The question now is not how do I do things. The question is what do I want to do."

## Cross-references
- Lesson 7-12 (metaphysics, systems thinking, value creation system, 3 roles, 4 pillars); Lesson 13 (intro to 12 essentials).
- Lessons 14-25 (each essential): 14 abstraction, 15 feedback loop, 16 vertical slicing, 17 horizontal decoupling, 18 temporal decoupling, 19 composition, 20 subject/system verification, 21 value identification, 22 domain discovery, 23 strategic design, 24 walking skeleton, 25 deployment & delivery.
- Lesson 26 (ideal developer workflow), Lesson 27 (FA²STR).
- Lesson 53 (result/state/communication verification); Lesson 64 (value-first integration testing).
- Lessons 66-72 (FeedBook event storming, process modeling, architecture guess point).
- Lesson 38 (RDD); Lesson 84 (Figma-driven design, referenced jokingly); Lessons 90/92 (frontend architecture).
- Books: *BDD in Action*; Mark Seemann, *Dependency Injection*; Vaughn Vernon's "red book" (*Implementing DDD*); Evans' "blue book" (*Domain-Driven Design*); *Continuous Delivery* / DevOps movement; *Solid Book* (mug "handles are made to be gripped" anecdote).

## Fluff skipped
Greetings, Mario/Wario banter, FigJam zoom/export fiddling, mug emoji and Theo Von tangent, Peaky Blinders accent, garbled lines ~L297-L300, and the wrap-up about scheduling.

## AI-era relevance hint
- Top-down directionality and feature files with concrete examples make good specs for AI agents. Code generated "forwards" without a linked role/goal repeats the code-first mess faster.
- Strategic design's "stereotype components quickly / know where they belong" becomes more important when AI suggests libraries on demand. Judging core vs generic and API volatility stays with humans.
- Composition roots, horizontal decoupling and subject boundaries make AI-generated code swappable and verifiable. The deployment pipeline is the guardrail against shipping negative value.

## Coverage proof
- Lines read: 529 / 529
- Final line (verbatim): "now."
