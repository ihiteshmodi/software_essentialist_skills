# Lesson 54 — Demo: Password Validator, Part 1 (Upfront Design)
- **Source file:** 54) Demo Password Validator - Part 1 (Upfront Design).txt
- **Category:** kata-demo
- **Topics:** fa2str, upfront-design, find-architect-automate, concrete-examples, program-by-wishful-thinking, think-backwards, api-design, system-under-test, stateless-guess-point, password-validator

## Summary
Khalil demonstrates the upfront half of FA²STR (Find, Architect, Automate) on the Password Validator kata. He frames FA²STR as a metacognitive design method: it makes you aware of both the upfront design that usually happens unconsciously and the emergent part (Specify, Test, Refine). In Find, he reads the problem and writes success and failure examples for each criterion in a "find" file. He then uses program-by-wishful-thinking upfront to sketch the return object for the input `"s"`. Architect at the stateless level just means getting clear on the system under test: string in, object out, via a stateless class/static method or function. Automate is only Jest setup.

## Core ideas
- FA²STR has two halves. Upfront: **Find, Architect, Automate**. Emergent: **Specify, Test, Refine**. Being aware of both lets you use them together and move through problems fast.
- The two foundational tools at the stateless guess point are **thinking backwards** (arrange-act-assert backwards) and **program by wishful thinking**.
- He says this demo also needs "the other form of system verification, which is called state verification." (The Part 2 demo in fact only asserts on the returned object.)
- Find: the input to the Find system is getting clear on the problem.
- Problem statement: write a function or stateless class that validates passwords. Criteria:
  - between 5 and 15 characters
  - contains at least one digit
  - contains at least one uppercase letter
  - returns an object with a boolean `result` and an `errors` key that, for an invalid password, contains an error message or type for **every** error that occurs (there can be several at once)
- The problem is very specific: it asks you to **design an API / the shape of an object** and make sure the return value matches it.
- Concrete examples can go on paper, in a tool, a notepad, a markdown file, or just in your head. He writes them in a dedicated "find" file with success and failure cases per criterion.
- Program by wishful thinking can be done **upfront** (in the find file) or **emergently** (in code). You can also skip it and just jump in, but some later assignments (e.g., Boolean Calculator) may need upfront work.
- Architect at the stateless level is "extremely simple": an input/output system. The goal is to get clear on the **system under test**: what you're testing, how it works, and how you interact with it (string in, object out, stateless class with a static method or a function).
- Automate: set up the test infrastructure. At the stateless level that is just Jest. No complex setup.
- All this upfront work could happen in your mind "in a millisecond." Writing it down makes the metacognitive process visible.

## Named frameworks / mental models
- **FA²STR (upfront half: Find → Architect → Automate)**
  - Find: understand the problem, then write concrete examples (success and failure per criterion), optionally sketch the output shape.
  - Architect: define the system under test and its input/output. At the stateless level: string → object, via function or stateless class.
  - Automate: set up test infrastructure. At the stateless level: Jest only.
  - When: before emergent TDD, especially on harder problems.
- **Program by wishful thinking (upfront variant)**: write the API/output shape you wish you had before writing code.
- **Think backwards / Arrange-Act-Assert backwards**: start from the expected output.
- **Upfront vs emergent design**: both are valid. Awareness of both makes you effective.

## Definitions
- **System under test** — what you're testing, how it will work, and how you'll interact with it (its inputs and outputs).
- **Metacognitive tool** — FA²STR, described as a design method that makes you aware of the unconscious upfront part and the on-the-fly emergent part of problem solving.

## Rules & heuristics
- Start by getting clear on the problem. That is the input to Find.
- Write both success and failure examples for each criterion.
- For multi-error requirements, make `errors` an array so it can express several failure reasons.
- Pick an example that fails every rule (e.g., `"s"`) to discover the full error shape.
- If you get stuck on harder katas, come back and do more upfront design.
- At the stateless level, keep Architect and Automate minimal.

## Anti-patterns / mistakes called out
- Jumping straight in on complex problems (e.g., Boolean Calculator) without upfront design can leave you stuck. Framed as a risk, not a rule.

## Code discussed
**Find file** (examples per criterion, success/failure). Specific example strings are not stated except `"s"`.

Upfront wishful-thinking sketch of the response for input `"s"`: it fails every rule because it's too short, has no digit and has no uppercase letter.
- `result: false`
- `errors`: an array. He considered error messages vs types and chose types, with three named: invalid length, no digit included, missing uppercase.

```ts
// reconstructed from narration
// input: "s"
const expected = {
  result: false,
  errors: ["InvalidLength", "NoDigitIncluded", "MissingUppercase"], // exact identifiers (inferred)
};
```

**Architect:** `PasswordValidator` as a stateless class with a static method (or a function). Input: `string`. Output: the object above.

**Automate:** Jest, no extra setup.

## Diagrams / visual models described
- Simplified FA²STR diagram: problem as input to Find, then Architect, then Automate (upfront), feeding into Specify, Test, Refine (emergent).
- Input/output system: string → `PasswordValidator` model → result object.

## Notable quotes
- "This is a metacognitive tool. It's a design method."
- "You could do upfront or you can do emergent."
- "This is asking for us to design out the API or the shape of an object and make sure that what comes back is going to conform to this shape."
- "Architect step, especially at the stateless level, is extremely simple."
- "This is a metacognitive process, this upfront design part. And we're spilling it out onto paper."

## Cross-references
- Lesson 27 (FA²STR design method)
- Lesson 51 (AAA backwards and program by wishful thinking)
- Lesson 52 (FA²STR upfront + emergent at the stateless guess point)
- Lesson 53 (subject verification)
- Lesson 55 (Part 2, emergent design)
- Lessons 62–63 (Boolean Calculator, mentioned as needing upfront design)

## Fluff skipped
Intro greeting and sign-off.

## AI-era relevance hint
- Upfront API/output-shape design is exactly what you should hand an AI agent. A precise return contract and example table limits the solution space.
- A "find file" of success and failure examples works as a ready-made prompt and acceptance spec for generated code.
- Metacognition (knowing which phase you're in) helps you decide when to let the agent run and when to think first.

## Coverage proof
- Lines read: 48 / 48
- Final line (verbatim): "going to leave the video right here. And then we'll jump into the emergent part of solving the problem next. All right, I'll see you in the next video."
