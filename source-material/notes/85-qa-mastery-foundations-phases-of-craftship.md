# Lesson 85 — Q&A March 31st: Mastery Foundations
- **Source file:** 85) Q&A March 31st Mastery Foundations.txt
- **Category:** qa-live
- **Topics:** mastery-foundations, staying-in-the-game, right-action, quantum-moments, phases-of-craftship, code-first, best-practices-first, pattern-first, ddd-first, responsibility-first, value-first, game-of-value, feedback-loop, observe-evaluate-eliminate-execute, 12-essentials, straight-line-path, oop-prerequisites, guess-points, theoretical-before-physical, value-creation-system, platform-strategy, essentials-mapping, transactions, temporal-decoupling, abstraction-design, event-storming, user-story-mapping, impact-mapping, course-structure, text-first, small-guesses, mob-programming, book-club

## Summary
Khalil previews the upcoming **Mastery Foundations** content: the section after the early "stay in the game" material and before the physical guess-point work. The main idea is **right action**. There are "quantum moments" where a decision sends you down different paths, and what you do in them depends on what you currently value. Developers usually move through **phases of craftship**: code-first → best-practices-first → pattern-first → DDD-first → responsibility-first. At the deepest level you see software development as a **game of value** played with the **feedback loop**. He describes the mastery process (**observe & evaluate → eliminate → execute**) and explains that his own years of observing and eliminating produced the **12 essentials**, which the course teaches as a "straight line". He covers the **value creation system**: artifacts move left to right from the theoretical guess points (problem, solution, architecture) through the physical guess points to delivery. Tools like event storming and impact mapping are placed by the guess point whose inputs and outputs they serve. He shows how any developer question maps to a **metaphysical essential + a physical/theoretical essential**, using transactions as the example. The rest covers course logistics: a text-first MVP, collecting feedback, a Figma cheat sheet, opt-in access to "prod" content, and a community FizzBuzz mob-programming event plus a book club.

## Core ideas
- **Mastery is about staying in the game.** Early content (obstacles, focus techniques) exists so the TDD assignments don't make you lose sight of the goal. Some assignments are tedious, but "you need reference experiences". The context or container around what you're doing matters.
- **Right action** (one of Khalil's favorite recent concepts):
  - During work there are **quantum moments**, decisions that send you down one path or another.
  - Goal 1: become aware of what those moments are. Goal 2: learn what to do next in them.
  - What you do depends on your current "system" for seeing reality: code-first, best-practices-first, DDD-first, first-principles-first or responsibility-driven-first.
  - "Right action really, truly, is based on what you currently value."
  - "Whatever you place your awareness on... is what you're going to achieve." If you value writing code, you'll achieve writing code.
- **Phases of craftship** (natural levels developers go through). Example scenario: "how do I start this project?"
  - **Code-first**: goal is to make things work and solve problems with code. You jump to "databases + APIs + React + CSS modules" in a building-block mindset. Problem → code, anemic domain models. Blocky view: "app + DB".
  - **Best-practices-first**: "what best practices should I use to start a project?" Thinking gets a little more generic ("this does this, that does that").
  - **Pattern-first**: building blocks such as entities, value objects, aggregates, use cases, domain events, repositories, external services.
  - **DDD-first**: goal is to use the DDD patterns. More building blocks, plus the context for when to use them, a focus on the domain first, and a language for creating and organizing patterns. "I'm not even going to write the code first. I need to talk to domain experts first."
  - **Responsibility-first**: "the metaphysical first principles of reality way to look at code", "the deepest level of design you could be at", looking at "the fabric of reality itself". Formulas broken down to atomic parts.
  - Beyond that, you see that the fabric of reality is **value-based**. Starting a project, your first thought becomes "we need to be creating value." That's where "the game of software design... actually begins."
- **Static/linear vs. non-linear.** Earlier phases treat starting a project as static and linear ("big chunky building blocks"). The value game is non-linear, like non-linear dynamics or predicting the weather. That's why "there's no silver bullets."
- **Software development is a game.** For any game you need to know the players, how to win, how to lose, each player's goals, and the assistive and contending elements. You win with the **feedback loop**: making many guesses, guided by principles about guessing.
- **Next course section:** from code-first to DDD-first (and on to responsibility-first). Each time you cross a paradigm you need new skills and knowledge. "The real fun, the real work, the game is actually played over here" (responsibility/value level).
- **Knocking down the big domino** (or "fighting the big duck"): reaching the responsibility-first level answers the long tail of developer questions at once. When to split an abstraction, how to organize code, what talks to what, microservices or not, which library or framework.
- **Why Mastery Foundations is abstract:** it's mindset. Coding comes early in the next modules so people don't go too far without reference experience. Khalil admits "It's extremely abstract."
- **This is a course about thinking,** "in essence, a philosophy and metaphysical course". Design is "about you having awareness of how you think and how you learn," which is why it's hard to teach.
- **The value creation system (left → right):** take artifacts of value from theoretical ("they don't really exist yet and we don't even know if people want this") to "done and in somebody's hands using it", as fast as possible.
  - Contending elements: domain complexity, team size, how many theoretical guesses you've gotten right before.
  - Getting one artifact through is "scoring a point in the soccer net." After that, the goal is to keep doing it faster "without introducing negative value, which is bugs."
  - Rule of the game: go left to right, **theoretical first, then physical**.
- **With zero theoretical guesses** (new product, entrepreneur), should you do double/triple/quadruple-loop TDD at every guess point? "Maybe not." Maybe push one theoretical guess through as fast as possible, then "start playing defense and adding tests at the physical level."
- **Platform strategy:** once you have shared infrastructure (for example a microservice architecture with features on it, deployment, architecture, known services, tested and covered code), you can **skip making guesses at some guess points** and score faster over time.
- **Unlearning is painful but doable.** Luigi started coding a year or two before working with Khalil and now uses RDD in systems-design interviews. "Anytime you have to rewire your brain and let stuff go, it is freaking painful." Structure it with **milestones and checkpoints** so you don't get stuck "in the void."
- **Tools belong to guess points.** "It's less about the tool. It's more about the inputs, outputs of the system of creating value." Processes can change or new ones can appear, but the value creation system "will never change."
- **Any question = metaphysical essential + physical or theoretical essential.** Metaphysical essentials "permeate every single thing that we do."
- **Teaching approach:** the most valued format was the one-on-one call where Khalil worked a problem out loud. He plans more demonstration and discussion modules sourced from Discord questions, and more FA²STR.

## Named frameworks / mental models
- **Right action / quantum moments**
  - Purpose: become aware of decision points and choose better actions.
  - Components: awareness of the moment, your current value system (phase of craftship), the chosen action.
  - When: at every decision point, starting with "how do I start a project?"
- **Phases of craftship**
  - Code-first → best-practices-first → pattern-first → DDD-first → responsibility-first → value-first (the game of value).
  - Purpose: name the levels developers pass through and move past each one.
  - Each transition needs new skills and knowledge. The course's next section goes code-first → DDD-first, then responsibility-first.
- **The game of value**
  - Components: players, win condition, lose condition, each player's goals, assistive elements, contending elements.
  - Win mechanism: the feedback loop (repeated guesses guided by principles).
- **Mastery process: observe & evaluate → eliminate → execute**
  - Observe & evaluate: survey all the topics in the domain (Khalil's Solidbook phase; many books, Twitter, talking to prominent developers) until patterns show.
  - Eliminate: drop what doesn't matter. For Khalil this left the 12 essentials.
  - Execute: learn and apply that subset in a "straight line".
  - Diagnostic use: formulate a concrete goal/question. Developers often "don't even know what they need to know."
- **Straight-line path:** learn only what matters (12 essentials) rather than wandering topic to topic.
- **Value creation system (left → right)**
  - Theoretical guess points: problem, solution, architecture. Then physical guess points. Then delivery.
  - Artifacts move from nonexistent to used by someone. Scoring = shipping value. Negative value = bugs.
  - Strategy: build a platform or shared infrastructure so later features skip guess points.
- **Problem guess point as an input/output system:** input is phenomena you take in from the world. Output is your idea. It covers idea generation and validating that there's a problem. No code or DDD needed.
- **Essentials mapping heuristic:** classify any question as one metaphysical essential plus one physical or theoretical essential.
  - Example: "How do I do transactions in use cases?" It's physical because it's about writing code. Physical essential: **temporal decoupling**. Metaphysical essential: **abstraction design**, because designing transactions into use cases means filling responsibility gaps.
- **Theoretical → text → refinement → video** (course-building process): draw the whole roadmap in text, see where understanding drops off, edit those parts, crystallize them, then turn them into video.
- **Small guesses principle:** make small guesses so you can refine fast. Releasing everything at once conflicts with this, so Khalil settles on opt-in.

## Definitions
- **Right action** — the better action to take at a decision point. What counts as right depends on what you currently value.
- **Quantum moments** — moments during work when a decision can send you down one path or another.
- **Code-first mindset** — goal is to "make things work to solve problems with code". Problem → code, anemic domain models, building-block thinking.
- **Pattern-first** — using named building blocks: entities, value objects, aggregates, use cases, domain events, repositories, external services.
- **Responsibility-first** — the metaphysical/first-principles way of looking at code, the deepest level of design.
- **Negative value** — bugs, or anything that removes value while you create it.
- **Value creation system** — the whole left-to-right flow from theoretical guesses to a delivered artifact of value.
- **Scoring a point** — pushing out a feature that created value for somebody.
- **Reference experiences** — hands-on experience (for example from tedious TDD katas) that later abstract concepts attach to.

## Rules & heuristics
- Know what you value, because it decides what you achieve and what actions you take.
- Recognize the game (players, win/lose, goals, assistive and contending elements) before playing it.
- Theoretical first, then physical. Go left to right.
- With zero validated theoretical guesses, don't over-invest in multi-loop TDD everywhere. Push one guess through fast, then play defense with tests at the physical level.
- Build shared infrastructure or a platform so later features can skip guess points.
- Ask a specific question tied to a goal ("What is your current goal?"). Statements aren't questions.
- To unlearn old paradigms, set milestones and checkpoints.
- Choose tools by the guess point whose inputs and outputs they serve, not by the tool:
  - Big-picture event storming (everyone gathering and getting a sense of the domain) → problem guess point.
  - More tactical event storming (modeling how a solution could work) → solution guess point.
  - Impact mapping and user story mapping → theoretical guess points (user story mapping is explicitly planned for the theoretical section).
- Map any question to one metaphysical and one physical or theoretical essential.
- Prerequisite awareness: OOP basics (abstraction, encapsulation, inheritance, polymorphism).
- For a new or changing product (here, the course): MVP in text first. Videos have too long a feedback loop. Add video when content converges, or for demos, discussions and Q&As.
- Decide on a tool by the responsibility you need. If the responsibility is "collect feedback" and Kajabi comments already do that, you may not need another tool.
- Make small guesses so you can refine quickly. When releasing a lot at once, accept ignoring later feedback for now and focus on earlier sections.

## Anti-patterns / mistakes called out
- **Blocky, static, linear thinking** about starting a project ("DB + API + React + CSS modules").
- **Stopping at DDD-first.** Good progress, but "we need to move past that."
- **Wandering topic to topic** without a goal (Khalil's own early path). The straight line fixes this.
- **Not knowing what you need to know,** so you can't form a question.
- **Getting stuck on "which tool, when?"** Placing tools on guess points removes the confusion.
- **All theory up front with little coding.** Khalil admits it's not fun and may restructure.
- **Full TDD at every guess point with zero theoretical guesses made:** likely wasted effort.
- **Releasing big chunks without structure:** it goes against small guesses, and some people may want a refund from overload.
- **Writing everything in Express route functions** (code-first student example). Refactor toward patterns to see other ways.

## Code discussed
- No code shown. Planned exercise described:
  - Implement a **create user** feature the code-first way using everything you know.
  - Then refactor it (and some of your own code) to the **pattern-first / best-practices** way: entities, value objects, aggregates, use cases, domain events, repositories, external services.
  - This was the first exercise given to an early student who wrote everything in JavaScript functions inside Express.

## Diagrams / visual models described
- **Mastery Foundations outline** (text/Figma): right action, quantum moments, phases of craftship.
- **Phases of craftship drawing:** "app + DB" blocks (code-first) → more generic boxes (best practices) → star/circle building blocks (pattern-first) → more blocks plus context (DDD-first) → fabric of reality (responsibility-first).
- **Topic-space map:** a large area of all software-development topics. Khalil's winding learning path from point A to point B, versus the straight-line path through a small subset (the 12 essentials).
- **Guess points board ("the original"):** theoretical guess points (problem, solution, architecture) on the left, physical ones after, flowing left to right to "done". Drawn as a soccer field where shipping is scoring in the net.
- **Essentials "equation":** metaphysical essential + physical essential (or + theoretical essential). Khalil mentions there are three metaphysical ones but doesn't write them all out.
- **Cheat-sheet idea:** a one-page map like the pattern map near the start of the DDD book ("page two"), showing "the atoms of essentialism" and how everything fits together. Mentioned in passing: an existing drawing someone made, and one Khalil thinks he made.

## Q&A items
- **How much time before I can apply this in code? I'm overwhelmed by the terms.** (L50-L62)
  - Mastery Foundations is mindset and "extremely abstract". Code starts in the next modules (code-first → best practices, refactoring create user) so you get reference experience early.
- **Rohan: confused, what should I do now?** (L63-L100)
  - Khalil asks for a goal-based question: "What is your current goal?" Developers often don't know what they need to know.
  - He explains observe & evaluate → eliminate → execute, his Solidbook/startup learning path, and how the 12 essentials came from elimination. The course is the straight-line path.
- **Comment: understanding modeling principles before code is fundamental; this course teaches how to think.** (L98-L103)
  - Agreed. That's why it's hard, and why good questions matter.
- **Do we need to know OOP and patterns ourselves, or will the course cover them?** (L128-L145)
  - The course will link to material. Earlier content jumped straight to feedback loop level one. You could start TDD knowing nothing, but Khalil wants awareness of the game and context first. Restructuring is likely, because all theory up front isn't fun. Current focus is completeness.
- **Straight-line roadmap reveal / should we TDD everywhere?** (L145-L170)
  - Value creation system left to right. With zero theoretical guesses, push one through fast and add tests later. A platform lets you skip guess points.
- **Tenko: not overwhelmed because DDD-first overlaps with responsibility-first; code-first people would be.** (L170-L180)
  - Agreed. Still doable (Luigi's example), but painful. Use milestones and checkpoints. Rohan: "best way of letting go of old stuff?" Set milestones.
- **Risky Biscuit: models are too high level for good feedback; feed forward something concrete, e.g. a design loop.** (L180-L200)
  - Agreed. Next priority is concrete work. Text-first course MVP. The Mastery Foundations videos were already outdated after three days.
- **Where should feedback go: Help This Book or Kajabi?** (L200-L250)
  - Khalil frames it as a responsibility: collect feedback. Kajabi comments on text are enough for now. Help This Book is likely more useful when the course becomes a book. Consensus: text in Kajabi, comments in Kajabi.
- **Demonstration videos at stage boundaries / more one-on-one problem solving.** (L215-L240)
  - More demonstration and discussion modules from Discord questions. Map each question to its essentials (transactions example). More FA²STR, which Khalil "can't find a problem... this does not work for."
- **Event storming template, user story mapping, impact mapping: where do they go?** (L250-L268)
  - In the theoretical guess points (problem, solution, architecture). Pick a few tools. Knowing which guess point each serves is a "massive simplification."
- **Figma cheat sheet: what should it contain?** (L268-L285)
  - Visual chapter summaries, the "atoms of essentialism" on one page, a DDD-book-style map. People should be able to comment on it to flag areas of confusion.
- **Release everything now, or one module per week?** (L285-L300)
  - Trade-off: small guesses and structured cohort pacing vs. results now. Resolution: **opt-in** access to rough "prod" content (a Discord react role/channel), plus the structured release. "Red pill or blue pill."
- **Community events: FizzBuzz kata mob programming and a book club.** (L300-L330)
  - Manny runs an event on TDD basics, TPP (inferred: Transformation Priority Premise), pair and mob programming. Breakout rooms work on the kata [feedback cata] with live feedback instead of waiting for peer review. Daniel shadows.
  - Book club idea: go through the Kajabi course together, or read a book chapter every two weeks. Consensus leans toward the course.

## Notable quotes
- "Right action really, truly, is based on what you currently value."
- "Whatever you place your awareness on, what you place your focus on is what you're going to achieve."
- "In reality, what's really going on is we're playing a game of value, of creating value and maintaining value."
- "The way that we're going to win the game is utilizing the feedback loop."
- "It really is, like, in essence, a philosophy and metaphysical course. This is just a course about thinking."
- "Without introducing negative value, which is bugs."
- "It's less about the tool. It's more about the inputs, outputs of the system of creating value."
- "Anytime you have to rewire your brain and let stuff go, it is freaking painful."
- "The problem that a lot of developers have is they don't even know what they need to know."

## Cross-references
- Lessons: 3 (four key mindsets), 4 (two biggest obstacles), 5 (clarity strategies), 6 (endless motivation), 9 (systems thinking), 10 (value creation system), 13 (12 essentials), 14 (abstraction), 15 (feedback loop / guess points), 18 (temporal decoupling), 22-23 (domain discovery / strategic design), 27 (FA²STR), 38 (RDD), 82 (code-first to best-practice-first Q&A), 65 (theoretical guess points).
- Concepts: phases of craftship, right action, quantum moments, game of value, negative value, value creation system, guess points, 12 essentials, metaphysical/physical/theoretical essentials, anemic domain model, entities, value objects, aggregates, use cases, domain events, repositories, big-picture vs tactical event storming, impact mapping, user story mapping, TDD feedback loop levels (double/triple/quadruple loop), TPP, mob and pair programming.
- People: Vaughn Vernon, Scott Bellware, [Scott Wastgen] (possibly Scott Wlaschin, inferred), Luigi, Tenko, Rohan, Risky Biscuit, Manny, Daniel.
- Books/tools: Solidbook (Khalil's), Eric Evans' *Domain-Driven Design* (pattern map "page two", inferred from "Demandruff Design book"), Help This Book (feedback tool), Kajabi, Discord, Figma.

## Fluff skipped
Greetings, mic moderation, recording notices, jokes ("handles are made to be gripped", swag store, red/blue pill), and end-of-call personal plans.

## AI-era relevance hint
- "Whatever you place your awareness on is what you achieve": AI makes code-first output cheap, so value-first framing (which artifact actually scores?) matters more than typing speed.
- Mapping tools and prompts to guess points (problem, solution, architecture, physical) keeps AI assistants in the right phase instead of letting them jump straight to code.
- The zero-theoretical-guesses heuristic fits AI prototyping: push one guess through fast, then add tests defensively once value is confirmed.

## Coverage proof
- Lines read: 333 / 333
- Final line (verbatim): "Chinese food and that's my evening so everybody enjoy hopefully you have a equally blessed evening it's 0 0 0 my time all right peace out everyone you"
