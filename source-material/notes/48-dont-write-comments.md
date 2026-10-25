# Lesson 48 — Don't Write Comments (Except To Explain "Why")
- **Source file:** 48) Don_t Write Comments (Except To Explain _Why_).txt
- **Category:** testing-practice
- **Topics:** comments, readability, expressive-code, code-review

## Summary
Khalil's stance: code should express **what** happens, and comments should only express **why** you chose to do it. If code can't communicate what it does, fix the code first by making it more readable. Comments are a last resort, and their only real purpose is explaining "why", since code has no way to express intent or rationale.

## Core ideas
- Code expresses *what*. Comments express *why*.
- If the code doesn't communicate what it does, that's a code problem. Make the readability change first.
- Use comments only as a last resort, and that last resort is almost always explaining *why*.
- Review advice to the student: remove your comments.

## Named frameworks / mental models
- **What vs Why split**: purpose is deciding whether a comment is justified. What → refactor the code to be expressive. Why → a comment is allowed.

## Definitions
- **Purpose of comments** — to express why you've chosen to do what you're doing.

## Rules & heuristics
- Make code expressive enough that it says what it does.
- Readability refactor first, comment last.
- Only comment rationale ("why").

## Anti-patterns / mistakes called out
- Comments that restate what the code does.
- Using comments to patch over code that isn't expressive.

## Code discussed
None (general feedback on a submission that had comments. No specific code shown in narration).

## Diagrams / visual models described
None

## Notable quotes
- "Your code should always express what happens. Comments should express why you've chosen to do what you're doing."
- "If your code's not able to adequately communicate what it is doing, then there's a problem."
- "Always make that readability change first. And at a last resort, use comments."
- "That is really, truly the purpose of comments is to express why."

## Cross-references
- Lesson 50 (Palindrome review #2: "that comment is unnecessary")

## Fluff skipped
None

## AI-era relevance hint
- AI agents add lots of "what" comments. Pruning them and keeping only "why" comments preserves signal for reviewers.
- "Why" comments carry intent that neither agents nor humans can recover from code later.

## Coverage proof
- Lines read: 7 / 7
- Final line (verbatim): "your comments."
