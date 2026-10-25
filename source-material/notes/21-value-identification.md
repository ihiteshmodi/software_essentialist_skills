# Lesson 21 — Theoretical Essential: Value Identification
- **Source file:** 21) Theoretical Essential Value Identification.txt
- **Category:** essential-theoretical
- **Topics:** value-identification, problem-guess-point, vision, role-goals, capabilities, who-why-what, abstraction-direction, event-storming, prototyping, wireframing, quantitative-analysis, qualitative-analysis, feature-injection, impact-mapping, BDD, DDD, systems-thinking

## Summary
Value identification is the first theoretical essential: before writing code, get clarity on the top of the abstraction stack — the **vision**, the **role goals**, and the **capabilities** (who, why, and what). This is the **problem guess point**; until it's clear, you're at an impasse ("do not pass go"). Techniques include talking to customers, prototyping/wireframing, big-picture event storming on existing products, and — for entrepreneurial developers who act as their own customer — quantitative and qualitative analysis. Feature injection and impact mapping (DDD/BDD communities) are also mentioned. Thinking of the guess point as inputs/outputs constrains the myriad possible activities and tells you when to move on to the solution guess point.

## Core ideas
- All work must be driven through the theoretical side of abstraction.
- Theoretical abstraction stack (top → bottom): **Vision** → **Roles** (and their **goals**) → **Capabilities** (what they'll be enabled to do) → **Features** (entering solution space) → **Stories** (real-world scenarios) → **Acceptance criteria** → **Concrete examples**.
- Value identification targets the top: vision, role-goal, capabilities → the **who** and the **why** (and the what).
- Don't be the developer writing code without clear understanding of why.
- Recalls abstraction lesson: working directionally from code towards the problem produces code-focused work that doesn't matter long-term and can make code more complex.
- Khalil's standard answer to design/tool questions in the community Discord: "Do you have clarity on the theoretical guesses first?" — share examples and user stories to clarify what's actually needed.
- Before the **how** (code), clarify the **who, why, what** — ensures what we build matters and has value for users and customers.
- It's more business/customer-driven, but a Software Essentialist needs clarity.
- Actualizing it requires strategic and design-oriented work: talk to customers/the person you're building for; prototyping; wireframing.
- Joining a company/existing product: gain clarity on what problems are solved and how (and problems such as a messy code base) via **big-picture event storming**, then move to the solution space.
- **Entrepreneurial developer** takes on the customer role → must do strategy work: quantitative and qualitative analysis.
- Unless we pass through the problem guess point (who we help, what they achieve, what they can do, how we help the customer), we're at an impasse.
- Other techniques: **feature injection**, **impact mapping** (popular in DDD and BDD communities) — covered in the guess points.
- Guess points as inputs/outputs (systems thinking) let you constrain what you really need and know when to move forward.

## Named frameworks / mental models
- **Value Identification (theoretical essential)**
  - Purpose: establish who/why/what before how, ensuring value.
  - Components: Vision, Role & Goals, Capabilities; supported by qualitative + quantitative evidence.
  - When to use: before any work — new product, new feature, or joining an existing codebase.
  - Exit criterion: clarity on who we help, how, and what they can do, plus good-enough qualitative & quantitative data that it's worthwhile → proceed to solution guess point.
- **Theoretical abstraction stack** (Abstraction Prism): Vision → Roles/Goals → Capabilities → Features → Stories → Acceptance Criteria → Concrete Examples.
- **Problem guess point → Solution guess point** progression.
- **Who / Why / What before How.**
- **Guess points as input/output systems** — to bound activity and decide when to move on.
- **Quantitative vs qualitative analysis.**

## Definitions
- **Value identification** — getting super clear on the problem guess point: vision, role-goal, capabilities (the who and the why).
- **Vision** — can you even conceive what you want to build / what we're making.
- **Roles** — very clear roles whose goals we're helping.
- **Capabilities** — what roles will be enabled to do.
- **Features** — start of the solution space: what we actually need to build.
- **Stories** — real-world scenarios.
- **Quantitative analysis** — are there people who want this; with a large enough problem; in pain needing benefit; how many — "gaining a number."
- **Qualitative analysis** — a feel for the problem, via talking with users and domain experts and "feeling into their problem."
- **Event storming** (big picture) — technique to clarify the current problem, what the business does, and how it solves it today.

## Rules & heuristics
- Never start with the how; clarify who, why, what first.
- When asking for design help, lead with theoretical clarity: examples and user stories.
- Don't pass the problem guess point without clarity and "a fair amount of confidence" to proceed.
- If you're building your own product, you are the customer — do the market/strategy analysis yourself.
- On an existing product, use big-picture event storming before changing code.

## Anti-patterns / mistakes called out
- Writing code without clearly understanding why.
- Working from code towards the problem (code-first direction) → work that doesn't matter and extra complexity.
- Jumping to tool/design questions ("how do I do XYZ with this tool") before clarifying the theoretical guesses.

## Code discussed
None

## Diagrams / visual models described
- Theoretical abstraction diagram (vertical stack): Vision, Roles/Goals, Capabilities, Features, Stories, Acceptance Criteria, Concrete Examples; value identification highlights top three.
- Guess points image with the **problem guess point** (who/why/what) feeding the **solution guess point**.

## Notable quotes
- "I don't want you to be the developer who's writing code without a very clear understanding of why you're doing what you're doing."
- "Do you have clarity on the theoretical guesses first?"
- "Before we get into the how, before we start talking about code, we want to clarify the who, the why, and the what."
- "If you're a software essentialist, you need clarity. You want to know why you're doing what you're doing."
- "That is a blockage. That is do not pass go."
- "You are a software essentialist, which means you need to get very good at the things that matter."

## Cross-references
- Lesson 14 (Abstraction — direction of work, abstraction prism), Lesson 15 (Feedback Loop / guess points), Lesson 9 (Systems Thinking — inputs/outputs), Lesson 10–11 (value creation, roles & goals).
- Lesson 22 (Domain Discovery — solution guess point), Lesson 23 (Strategic Design).
- Lesson 65+ (theoretical guess points assignments), Lesson 83 (front-loading value for early adopters).
- Techniques: Event Storming (Alberto Brandolini, inferred), Feature Injection, Impact Mapping; DDD & BDD communities.
- Phases: Best Practice First (reorienting Code First build to be more valuable), Pattern First (subdomain mapping/drawing), guess points (deepest, with exercises), optional course project.

## Fluff skipped
Greeting, "if this sounds like a lot, that's okay," sign-off ("[to Monster]" = "to mastery").

## AI-era relevance hint
- When code generation is cheap, the scarce skill is deciding *what's worth building* — the who/why/what gate prevents agents from rapidly producing valueless features.
- Vision → capabilities → stories → concrete examples is essentially a spec pipeline; concrete examples make excellent agent prompts and acceptance tests.

## Coverage proof
- Lines read: 49 / 49
- Final line (verbatim): "this video here and I'll see you in the next one. As always, to Monster. I'll see you again next time. Thank you. Bye bye."
