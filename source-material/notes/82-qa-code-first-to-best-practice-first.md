# Lesson 82 — Q&A: From Code-First to Best-Practice First (July 4th, 2023)
- **Source file:** 82) Q&A From Code-First to Best-Practice First (July 4th, 2023).txt
- **Category:** qa-live
- **Topics:** phases-of-craftship, code-first, best-practice-first, course-structure, metaphysical-essentials, abstraction, feedback-loop, what-vs-how, role-goal, impact-mapping, feature-injection, concrete-examples, acceptance-tests, given-when-then, protocol-driver, page-object, walking-skeleton, test-categories, unit-tests, infrastructure-tests, composition-root, docker, deployment-pipeline, commit-phase, release-candidate, four-tier-architecture, service-layer, application-layer, high-value-unit-tests, monorepo, shared-folder, frontend-mvc, presenters, bdd, philosophy, systems-thinking

## Summary
This live Q&A explains the course restructure around the **phases of craftship** (code-first → best-practice → pattern → responsibility → value-first) and walks through what the **best-practice-first** phase will cover. Khalil explains why the course is built incrementally: he'd rather add foundational theory at the top only when it's needed than write thousands of pages upfront. He repeats that the two **metaphysical essentials**, abstraction (decoupling what from how) and the feedback loop, underpin everything. He shows the **role → goal → features → concrete example → acceptance test** chain with a DDD Forum reframing: helping a conference organizer build an audience of DDD-curious developers to sell tickets to. Q&A covers: acceptance tests as shared front/back-end executable specs, the three test categories (acceptance, unit, infrastructure), Given/When/Then tense, artifacts for product-minded devs (role-goal/impact mapping/feature injection, process modeling, user story/example mapping), and BDD books. He then previews the rest of the phase: composition root, Dockerized dev infrastructure, a front-to-back walking skeleton, a minimal deployment pipeline (commit phase → release candidate → acceptance phase → deploy), four-tier architecture with slim controllers, and a pure application/domain core for high-value unit tests. He closes with a monorepo layout (frontend/backend/shared), frontend MVC with presenters, and philosophy reading recommendations.

## Core ideas
- **Course restructured into phases of craftship:** code-first, best-practice-first, pattern-first, responsibility-first, value-first (L1-L6).
  - First half = "the ramping up", "really is the essentials", the beginner part.
  - Second half = the guess points. Guess points, FA²STR and the **ideal developer workflow** only make sense once you've climbed the phases and have clarity on everything you need to know. After that it's "just about arranging the way that you're gonna work so that you just do the things that have the most value at the right time" (L24-L31).
- **Why the course is incremental:** Khalil first tried putting all theory upfront and "started writing thousands and thousands of pages of theory." Now he identifies when foundational theory is needed and "chuck[s] it up towards the top" (L38-L42). The intro shrank from nine modules to an introduction plus mindset training, then straight into code-first (L46-L49).
- **In hindsight, get demonstrations out faster.** Seeing everything lets you "eliminate down" to what you don't know and act only on that. That's what makes you a confident crafter (L11-L17).
- A student noted the knowledge is naturally interlinked (e.g., interface segregation at many levels). Small parts revisited over time build the big picture (L17-L21).
- **Recommended order after the code-first assignment:** emergent design, then stateless testing assignments, then best-practice-first assignments starting with acceptance testing a feature (L49-L62).
- **Main problem with code-first:** manual testing (curl), thinking in **endpoints instead of features**, and a DB installed on the local machine, which makes environment setup hard for you on a new machine and for teammates (L66-L75).
- **Metaphysical essentials** (abstraction design + feedback loop) "encompass everything you do." Metaphysics is about cause and effect, "all conceptual in your mind." You then descend a level to make things real (L76-L88).
- **Debugging-loop advice:** if you keep changing something and it keeps failing, stop. You're "too deep into the how." Zoom out, draw it upfront, get clarity on what needs to happen and the responsibilities, then descend a level (L79-L86). Example: Khalil and Jatin changing Dockerfile lines with a 30-second feedback cycle (L88-L91).
- Khalil says he spends "very, very little time debugging" because he always starts by asking: Do I know what I'm doing? Why? Who is it for? At what level does this need to happen? (L91-L93)
- **Feedback loop:** never go too far without knowing whether the abstractions you just made work. That's why testing comes right after code-first (L93-L97).
- "You can have anything you want in life if you know how it works"; the challenge is the knowing how (L101-L103). All of this "stems from BDD" (L103-L104).
- **Role → goal → features → concrete examples → acceptance tests** is a 1-2-3 chain that drives all work (L106-L112).
- Why DDD Forum had weak motivation: it was built to teach, and "just build these endpoints" pushes you into the technical. Reframed: a conference organizer's goal is to "obtain an audience of devs curious about DDD to sell tickets to" (L116-L128).
- Real-world code usually exists to help a customer **make or save money** (L120-L123).
- From the "how" brainstorm (marketing drives traffic to DDD Forum, a "built with DDD" page, conference promo, sign up), features emerge: register, buy tickets, view ticket advertisement, ask questions about DDD. Driving traffic is out of scope (L128-L137).
- This gives you **who, why, what**. Adding concrete examples moves into **how**. There are "several levels of abstraction" before code, where usually devs skip the concrete example and just write code (L137-L146).
- **Temporal decoupling foreshadowed:** "places an order" rather than billing plus emailing in one step, because the work should be temporally decoupled. That comes in pattern-first (L133-L137).
- **Three roles and goals:** customer → make money. User → save or enrich time. Developer → make code discoverable and understandable (design). Check yourself against these three as you write code (L142-L147).
- **Four things that matter** "whether there's AI, whether there's not AI": architecture, testing, design, strategy. They serve the three goals. The 12 essentials are smaller, implementable micro-pieces of these (L160-L170).
- The walking skeleton is architectural, strategic, sets up design, and gives the testing foundation all at once (L167-L170).
- **Essentials are skills you level up**, like Fallout/Skyrim (starting at "level 12 out of 100"). Assessments and quizzes will let you self-track. Not expected to be 10/10 in best-practice-first (L239-L246).
- By the end of the phases of craftship you should feel good about each essential. The guess points are "advanced practice", possibly partly removable if students are already "a hundred out of a hundred" (L253-L257).
- **Deploy early:** the worst case is building for weeks or months and then finding none of it can be deployed. "Make sure that we can actually score this thing through the goalpost" (L279-L284).
- **Frontend complexity today** means each frontend usually needs its own MVC, not just server-side templating. Decoupling from infra and extracting service/application/domain layers applies to both frontend and backend, though not always needed for simple display sites (L331-L341).
- **Systems thinking for learning anything fast:** everything is a system (inputs, outputs, environments, processes). Isolate inputs and outputs, start with role and goal, go as deep as you can to something foundational (money, value), then climb back up connecting the pieces (L360-L368).

## Named frameworks / mental models
- **Phases of craftship**
  - Purpose: progression model and course spine.
  - Components: code-first → best-practice-first → pattern-first → responsibility-first → value-first.
  - When to use: to self-assess where you are and pick the next content.
- **Metaphysical essentials: abstraction + feedback loop**
  - Abstraction design = decouple what from how, set a clear goal. Feedback loop = verify progress toward it.
  - "Everything else kind of stems from these two." Goal-setting plus progress-tracking works for any goal in life (L230-L235).
- **Theoretical vs physical territory** (whiteboard visual)
  - Abstraction is "the pillar of everything". What vs how. "Idea land" (theoretical) vs venturing out into the physical, where the first thing you hit is "is this working?", hence the feedback loop (L205-L215).
- **Role-goal (≈ impact mapping / feature injection)**
  - Steps: role (who) → goal (why) → features/capabilities (what) → concrete examples (how) → acceptance tests.
  - "Never start a project without these four words clearly understood" (who, why, what, how) (L220-L223).
  - Origin: Khalil derived it from metaphysics (Aristotle, Sartre's existentialism) and later found it already existed as impact mapping and feature injection (L209-L219).
- **Acceptance-test architecture (four layers)**
  - Concrete example (Given/When/Then) → test runner → test code → **protocol driver** (an abstraction acting as the user talking to the system) → system tested end to end (L147-L151, L276-L277).
  - Frontend variant: the protocol driver is a **page object** that hits the UI, which touches the backend as in production (L151-L153).
- **Walking skeleton**
  - Start every project with an end-to-end test cutting across all components (frontend, backend, infra). Step one: deploy it to the deployment pipeline. Then drive work with acceptance tests (L153-L157).
  - "A minimal slice of functionality through all of the main architectural components" (L278-L279).
- **Three test categories**
  - Acceptance: "does this do what the customer wants?"
  - Unit: "does this, as a developer, do what I think it should?" Covers domain and application logic. About 80% of the work.
  - Infrastructure: "does this infrastructure do what I want it to do?" (start/stop DB, connect to DB, start/stop web server) (L181-L191, L318-L320).
- **Minimal deployment pipeline** (after Dave Farley)
  1. Commit to source control (e.g., GitHub).
  2. **Commit phase:** build and run unit tests (later: all high-value application-level unit tests).
  3. Create a deployable **release candidate** (zip, Docker image, etc.): the new version that goes to prod if it works.
  4. **Acceptance test phase** in a production-like environment.
  5. Infrastructure tests (before or after acceptance, "doesn't really matter").
  6. Deploy (L285-L296, L310-L320).
- **Architecture progression**
  - View → controller → database (code-first) → carve out a **service layer** = **four-tier architecture** → carve out a pure **application + domain layer** with infrastructure on the outside behind contracts (L296-L306).
- **Monorepo layout:** `frontend/`, `backend/`, `shared/`. Shared holds acceptance tests, later shared models and DTOs (a pattern, covered in pattern-first) (L324-L328).
- **Systems thinking learning method:** role → goal → inputs → go deep to foundations (money/value) → back up (L362-L368).

## Definitions
- **Metaphysical (essential)** — conceptual, about cause and effect, "not real… all conceptual in your mind". Encompasses everything you do (L81-L87).
- **Acceptance test** — a concrete example (Given/When/Then) put straight into the code base to drive work on frontend or backend. A **shared executable specification** between frontend and backend (L137-L142, L147-L150).
- **Protocol driver** — "an abstraction that is going to act almost as if it is the user talking to the system" (L147-L149).
- **Page object** — a frontend protocol driver that exercises the UI (L151-L153).
- **Walking skeleton** — an end-to-end test/slice across all components, deployed first (L153-L157, L278-L279).
- **Idempotent tests** — can be run "over and over" and still work (L250-L252).
- **Commit phase** — build plus unit tests after commit (Dave Farley) (L287-L289).
- **Release candidate** — a deployable artifact created after the commit phase that becomes production if later stages pass (L289-L291).
- **Four-tier architecture** — view / controller / service layer / database, after carving a service layer out of fat controllers (L297-L300).
- **High-value unit tests** — fast tests at the application level against a pure core (no DB/web server). About 80% of tests. They cover edge cases of each acceptance scenario (L302-L313).
- **Vertical slicing** — can you identify the feature? E.g., a `create user` folder containing what you'd expect. About design, understanding, discoverability (L221-L226).
- **Horizontal decoupling** — decoupling between the successive layers you descend through from the "what" down to the database, "like a gradient getting more and more technical" (L226-L231).
- **Subject/system verification** — drawing a boundary around what you want to test and verifying it works (L218-L221).

## Rules & heuristics
- Go through the course top to bottom. Action-item checklist order is top-down (L33-L37).
- After code-first: emergent design → stateless tests → best-practice-first acceptance testing (L49-L62).
- Stuck in a change-fail debugging loop? Stop, zoom out, draw it, clarify responsibilities, then descend (L79-L86).
- Before coding, ask: what, why, who, at what level? (L91-L93)
- Always have a purpose (who/why/what) behind code (L135-L138).
- Write acceptance tests so they can run on either frontend or backend (L148-L150).
- Start every project with a deployed walking skeleton, then drive with acceptance tests (L153-L157).
- Given/When/Then "then" clauses: past tense usually fits (order *placed*, email *sent*), but present tense ("I should now be logged in") is fine for UI experience. The only hard rule: it must "describe the system in the way that the user is interacting with it" (L191-L201).
- Advanced practice: skip mandatory document types and go through the problem, solution and architecture guess points. Artifacts are "a side effect of the shared understanding" (L205-L209).
- Artifacts go out of date quickly depending on the work (L212).
- Make tests idempotent (L250-L252).
- Make composition explicit via a **composition root**. Stop importing things "willy nilly" in Express controllers (L268-L272).
- Encapsulate dev infrastructure provisioning in the code base (Docker instead of a local DB) (L272-L275).
- Deploy as early as possible (L279-L284).
- Keep controllers slim: pull data out of the request and pass it to a service layer (L298-L300).
- Keep application and domain logic pure so they can be tested without DB or web server (L302-L306).
- For each end-to-end acceptance test (e.g., create-user success), write ~10-12 application-level scenarios for failure and edge cases (L311-L314).
- Unit tests passing in the commit phase should give ~80-90% confidence before the release candidate (L315-L318).
- Each non-trivial frontend needs its own MVC. Use controllers and presenters on the frontend for larger apps (L334-L341).

## Anti-patterns / mistakes called out
- Manually testing APIs with curl (L66-L68).
- Thinking in endpoints instead of features (L67-L68).
- Running the DB directly on your local machine, which is non-reproducible for you and teammates (L69-L72).
- Fiddling in the "how" (e.g., repeatedly editing a Dockerfile with a 30s loop) instead of zooming out (L79-L91).
- Building features with no purpose ("just build these endpoints") (L124-L126).
- Skipping concrete examples and writing code directly (L143-L145).
- Writing all tests as end-to-end acceptance tests, which are slow and need the full app plus DB plus server (L300-L302).
- Fat controllers doing "way too many things" ("almost everybody's solution") (L298-L299).
- Importing dependencies "willy nilly" in Express controllers, hiding the object collaborations (L269-L271).
- Building for weeks or months before trying to deploy (L279-L281).
- Writing thousands of pages of theory upfront (Khalil's own course mistake) (L38-L40).

## Code discussed
No code shown. Design artifacts discussed:

**Role-goal board (FigJam), DDD Forum reframed:**
- Role: conference organizer (or Khalil helping one) for a DDD conference.
- Goal: obtain an audience of devs curious about DDD to sell tickets to.
- How (brainstorm): marketing drives traffic to DDD Forum; page says "built with DDD principles, peek around, conference coming up, put your email in."
- Features (what): register, buy tickets, view ticket advertisement, ask questions about DDD. (Driving traffic is out of scope.)

**Concrete example → acceptance test (buy tickets):**
```gherkin
# reconstructed from narration
Feature: Buy tickets
  Scenario: James buys three tickets for his company
    Given James has three tickets in cart
    When James purchases tickets
    Then an order should have been placed
    And an email is sent
```
- Discussion: it was first framed as "he is billed / emailed access," then shrunk to "places an order" because the work must be temporally decoupled (pattern-first). A student pointed out past tense for "then" clauses (L131-L137, L191-L196).

**Planned code-first → best-practice refactors:** composition root, Docker for the dev DB, a walking skeleton front→back→DB, a minimal deployment pipeline, service-layer extraction (four-tier), a pure application/domain core, and high-value unit tests in the commit phase (L265-L320).

## Diagrams / visual models described
- **Code-first state:** endpoints, manual curl testing, local DB (L64-L72).
- **Role → goal → features (what) → code (how)** board in FigJam (L110-L116).
- **Acceptance test flow:** acceptance test → layer of code ×3 → frontend; same on backend → layer ×3 → backend (L139-L142).
- **Four-layer acceptance test stack:** concrete example → test runner → test code → protocol driver → system (L147-L151).
- **Three roles and goals** (customer/user/developer) (L142-L147).
- **Abstraction pillar:** what from how, theoretical "idea land" vs physical "how territory", with the feedback loop at the border (L205-L215).
- **Essentials as levelled skills** (game-style levels) (L239-L244).
- **Minimal deployment pipeline:** commit → commit phase (build + unit) → release candidate → acceptance phase (prod-like) → infra tests → deploy (L285-L296, L318-L320).
- **Layering evolution:** view-controller-DB → + service layer (four-tier) → pure application/domain core with infrastructure outside, API as contract (L296-L306).
- Whiteboard sketches being redrawn as course images ("seeing into the sausage factory") (L262-L264).

## Q&A items
- **Where are you in the phases of craftship? (student progress)** (L1-L32)
  - One student is behind but read *solidbook*, which covers similar material as a digest.
  - Khalil: in an online course, demos should come out faster so learners can see the whole and act on gaps. The student notes the knowledge is inherently interlinked and revisited.
- **What order should I study the action-item checklist in?** (L32-L62)
  - Top to bottom. Some content is still missing. Foundational theory gets added to the top as identified.
  - After the code-first assignment (user repo + three endpoints): emergent design, then stateless tests, then best-practice-first (acceptance testing a feature). Testing comes first because best-practice-first starts by fixing manual testing.
- **Does an acceptance test cover the whole app, or do you write separate ones for frontend and backend?** (L147-L175)
  - Write it so it can run on either side. It's a shared executable spec.
  - Option 1: backend acceptance test. Option 2: end to end from the frontend with a page-object protocol driver.
  - Required anyway via the walking skeleton. Team setup (full-stack vs separate FE/BE teams) makes it a strategy question.
- **What other tests are needed?** (L175-L191)
  - Acceptance, unit (~80%, domain and application logic), infrastructure (start/stop DB and web server). Scripts are needed; encapsulation too.
- **Should "Then" be in past tense (like an event)?** (L191-L201)
  - Generally yes: "order should have been placed," "email sent."
  - Present tense is acceptable for UI experience ("I should now be logged in"). The hard rule is to describe the system as the user interacts with it.
- **Team of three devs with strong product ownership: which artifacts, conventions, books?** (L201-L225)
  - Role-goal (≈ impact mapping, feature injection: role/why/what/how), process modeling, user story mapping, example mapping.
  - Advanced stance: go through the problem, solution and architecture guess points. Documents are a side effect of shared understanding and go stale.
  - Books: *BDD in Action* or *Specification by Example*.
- **(Implicit) Overview of the essentials and how they relate** (L203-L257): abstraction and feedback loop at the root. The walking skeleton, subject/system verification, vertical slicing and horizontal decoupling stem from them. Self-assessment questions include: can you test a feature at the application level on the frontend? Should you test Redux, and what type of test is that? Can an acceptance test reach the DB from the frontend? Are your tests idempotent?
- **Monorepo vs separate repos: are controllers/layers/infra shared between front and back?** (L322-L342)
  - Monorepo with `frontend/`, `backend/`, `shared/`. Shared holds acceptance tests, later shared models and DTOs (pattern-first).
  - Setup varies (Next.js/SSR, backend-served frontend, Netlify + Heroku). This is covered in the architecture guess point module.
  - Each side gets its own MVC. Learn to extract service/application/domain layers on both. Use controllers and presenters on the frontend. Not always needed on simple sites.
- **What is the walking skeleton? (joke about a walking-skeleton video)** (L343-L349): joke that your code must literally walk like the skeleton or it's a refund. No substance beyond that.
- **Any philosophy reading to recommend?** (L349-L370)
  - Aristotle's metaphysics (first principles, cause and effect). A book on *Applied Metaphysics* ([title as spoken]). *Nicomachean Ethics*.
  - Ayn Rand's objectivism (on value; controversial). Khalil links it to RDD. Summaries are fine since the books are "flowery" and huge.
  - Sartre's existentialism ("first you exist and then you decide your essence"), which he maps to RDD roles, responsibilities and collaborations.
  - Camus, *The Fall* (absurdism).
  - A systems thinking book (title and author not recalled; inferred: possibly *Thinking in Systems* by Donella Meadows, unconfirmed).

## Notable quotes
- "You're just so too deep into the how. What you need to do is stop, zoom out, draw it up front." (L82-L84)
- "When I'm coding, I actually spend very, very little time debugging because I always make sure I start with the question, do I know what I'm doing?" (L91-L92)
- "You can have anything you want in life if you know how it works. It's the challenge is the knowing how." (L101-L102)
- "The only things that actually matter as a software developer are architecture, testing, design, and strategy." (L162-L163)
- "Never start a project without these four words clearly understood." (L222-L223)
- "The artifacts, of course, they are a side effect of the shared understanding." (L208-L209)
- "Abstraction is the root principle of all design. It's what from how." (L204-L205)
- "Apps are all made from objects that talk to each other." (L271-L272)
- "Make sure that we can actually score this thing through the goalpost. It'll actually fit through the door." (L283-L284)

## Cross-references
- Lessons 3 (mindsets), 9 (systems thinking), 11 (three roles and goals), 12 (four pillars), 13 (12 essentials)
- Lesson 14 (abstraction), 15 (feedback loop), 16 (vertical slicing), 17 (horizontal decoupling), 18 (temporal decoupling), 19 (composition), 20 (subject/system verification), 24 (walking skeleton), 25 (deployment and delivery)
- Lesson 26 (ideal developer workflow), 27 (FA²STR), 38 (RDD), 42 (first milestone backend API), 52 (emergent design / stateless guess point), 64 (value-first integration testing), 65/71 (theoretical and architecture guess points), 81 (walking skeleton Q&A)
- Concepts: BDD, Given/When/Then, protocol driver, page object, impact mapping, feature injection, user story mapping, example mapping, process modeling/event storming, composition root, four-tier architecture, MVC, presenters, DTOs
- Books: *BDD in Action*, *Specification by Example*, *solidbook* (Khalil's), *Nicomachean Ethics*, Camus's *The Fall*, an Applied Metaphysics book, a systems thinking book (unnamed)
- People: Dave Farley (commit phase / deployment pipeline), Aristotle, Jean-Paul Sartre, Ayn Rand, Albert Camus, Jatin (collaborator)
- Tools: curl, Express, Docker, GitHub, FigJam, Redux, Next.js, Netlify, Heroku

## Fluff skipped
Missed-Q&A apology, calendar mishap, screen-share and chat checks, streaming lag, farewells, garbled walking-skeleton video aside (L345-L347), and the refund joke.

## AI-era relevance hint
- Role → goal → features → concrete examples → acceptance tests gives an agent an executable target. It stops agents from producing "just endpoints" with no purpose.
- Khalil's "stop fiddling in the how" advice applies directly to AI-assisted debugging loops. Re-prompting through changes that keep failing is the Dockerfile loop at machine speed. Zoom out and restate the what.
- A pure application core with fast high-value unit tests, plus a pipeline with commit and acceptance phases, is the safety net that makes accepting agent-generated code viable.

## Coverage proof
- Lines read: 370 / 370
- Final line (verbatim): "you got it, man. Systems thinking in general. What's the name of the book? Let me look it up. I'm going to stop."
