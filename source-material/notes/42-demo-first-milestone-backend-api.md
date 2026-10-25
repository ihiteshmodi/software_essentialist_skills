# Lesson 42 — Demo: First Milestone — Building the Backend API
- **Source file:** 42) Demo First Milestone - Building the Backend API.txt
- **Category:** kata-demo
- **Topics:** code first, DDD Forum, RESTful API, Express.js, TypeScript, Prisma, Postgres, Homebrew, ChatGPT, curl, grading checklist, MVC, service layer, idempotency, Docker (foreshadowed)

## Summary
Khalil demonstrates the first assignment the **Code First** way: build three user use cases for **DDD Forum** as a RESTful API with Express.js + TypeScript + Postgres + Prisma, with ChatGPT generating most of the code. The point is to "just make it work", with the tools guiding the thinking, and to show that writing code is not the hard part. The hard parts are design, testing, architecture and strategy. The demo is deliberately messy: blindly pasted code, type errors, a redundant model file, and a long Postgres connection struggle solved with `createdb`, `psql` and `npx prisma db push`. It ends with curl requests that create, edit and fetch a user. The result is simple functions acting as the whole service layer, wired directly into Express controllers. Best practices (Docker, idempotency) are deferred to later phases.

## Core ideas
- **Code First phase** = focus on the code and the tools. "The tools are really what is guiding the way you think about the problem." Everyone starts here.
- **Writing code is not the hard part.** Design, testing, architecture and strategy are. With AI you mainly need to **specify the "what" accurately**.
- Language background doesn't matter (Python, C#, etc.). AI tools get you up to speed; you focus on specifying what you need, which is "seeking clarity".
- Code First reality: lots of time debugging and digging around, because you're unaware of better ways to work.
- This demo intentionally **breaks best practices** (e.g., installing Postgres directly on the machine).

## Named frameworks / mental models
- **Phases of craftship: Code First**. Purpose: get it working at all. Identifies the baseline everyone starts at.
- **Specify the "what" for AI**: paste the requirements (grading checklist) into the prompt and let AI generate the "how".

## Definitions
- **Code First approach** — just make it work, thinking only about the code and tools. The tools shape how you think about the problem.
- **ORM benefit (as shown)** — types/client generated from the schema give type completion (e.g., `prisma.user.create` knows `firstName`, `lastName`, `email`).

## Rules & heuristics
- Always check the **grading checklist** in the course platform. It defines "done".
- When stuck on an error, paste it into ChatGPT and ask why. Wrap failing code in try/catch to surface the real error.
- If TypeScript can't find a package's types, install `@types/<pkg>` as a dev dependency.
- Don't duplicate the model. If the Prisma schema defines it, the generated client already provides types.
- MongoDB would "probably have been a little bit less of a headache" than local Postgres.
- Goal of the milestone: be able to **create data in the DB and pull ("yank") data out**.

## Anti-patterns / mistakes called out
- Blindly copying generated code ("pretty brainless on my part"). This leads to wrong folder placement, redundant model definitions and type errors.
- Installing the DB directly on the local machine rather than a container. Called a best-practice violation; Docker and **idempotency** come later.
- Code-First level overall: much time spent fixing bugs because better ways are unknown.

## Code discussed
**Grading checklist (assignment requirements):**
1. Three API routes. The first is `POST /users/new`; the other two, per the curl commands, are edit user and get user by email (exact paths not stated).
2. Database: relational, or NoSQL such as MongoDB.
3. Optional ORM: TypeORM or Prisma.
4. Manually test/verify endpoints with **Postman or curl**.

**Khalil's stack:** Express.js + TypeScript RESTful (MVC) API, Postgres, Prisma.

**Step-by-step build:**
1. Clone the Software Essentialist repo → project folder `code first` → `assignment` folder (students) / `demo` folder (Khalil). `npm install`.
2. Starting point: a blank `index.ts` and a test file (unused for now). `npm run start dev` starts the project (see the scripts).
3. ChatGPT prompt: "Can you help me generate the code needed to build an MVC RESTful API with Express.js, Prisma, TypeScript, and Postgres, with the following API endpoints: POST /users/new, …". The grading checklist was pasted in.
4. Follow its steps: install dependencies (skip "create new project"), create folders/files: **user controller**, **user model**, **prisma** folder. Paste the code.
5. Fix missing Express types: `npm i --save-dev @types/express` (and for other packages).
6. Red squiggles on the "model definition" in the user model → ask ChatGPT why.
7. Run the Prisma command: "no models defined in schema.prisma, nothing generated". The schema had been created at `prisma/schema.prisma`, and the folder had been put in the wrong place.
8. Delete the generated `app.ts`. Keep everything in `index.ts`, because the start script targets it.
9. Edit the Prisma `User` model fields: `id`, `email`, `name` → **`firstName`**, add **`lastName`**, add **`username`**. Remove `?` (optional) because they're required.
10. `npx prisma generate` → generates the Prisma client into `node_modules`.
11. ChatGPT confirms the `User` model in `models/user.ts` is redundant, so it's removed. Prisma client gives type completion: `prisma.user.create({ data: { firstName, lastName, email } })`.
12. Fix type error: "type string is not assignable to type number" in edit user (the id param needed converting to a number, inferred).
13. Ask ChatGPT: "Given the following Prisma schema file, can you show me how to use curl to make at least one request to each of the API endpoints?" → curl commands for create, edit and get.
14. Install Postgres with Homebrew: `brew update`, `brew doctor`, `brew install postgresql@14`, `brew services start postgresql` (Homebrew from brew.sh).
15. Server runs on port 3000. The create curl returns "failed to create user". Wrap a **try/catch** to log the error: "User John Doe was denied access to the database mydb.public".
16. Connection issue lies in the `DATABASE_URL` env var. Ask ChatGPT how to connect Prisma to local Postgres. macOS Postgres creates a default DB named after the OS username. Error: "database [cold stambler] does not exist" (likely Khalil's username, inferred). ChatGPT suggests running Postgres in Docker, which Khalil notes is the Best Practice First step.
17. Fix: run `createdb` so `psql` can connect. Adjust the data source URL (username@localhost:port, database, schema `public`).
18. `npx prisma db pull` (introspects the DB) now connects but wants existing tables.
19. `npx prisma db push` → "Postgres database ddd forum created at schema public".
20. Verify with curl:
    - create user (email `example@example.com`, first name John)
    - edit user: first name John → **Jonathan**
    - get user by email `example@example.com` → returns the updated first/last name.

**Resulting structure:** basic functions serving as "pretty much the entire service layer", connected directly to Express controllers.

```prisma
// reconstructed from narration (id type/default inferred)
model User {
  id        Int    @id @default(autoincrement())
  email     String @unique
  firstName String
  lastName  String
  username  String
}
```

```ts
// reconstructed from narration
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/users/new', async (req, res) => {
  try {
    const { email, firstName, lastName, username } = req.body;
    const user = await prisma.user.create({ data: { email, firstName, lastName, username } });
    res.json(user);
  } catch (err) {
    // try/catch added during demo to surface the DB access error
    console.log(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// edit user and get user by email endpoints followed the same pattern (paths not stated)

app.listen(3000, () => console.log('Server is running on port 3000'));
```

## Diagrams / visual models described
- (inferred) Architecture: curl/Postman → Express controllers → functions acting as the service layer → Prisma client → Postgres (local). No separate layers.

## Notable quotes
- "At the code first level, all you're really thinking about is to just make things work."
- "The tools are really what is guiding the way you think about the problem."
- "Writing code is not the hard part. It is all of the other aspects of writing code, the design, testing, architecture, and strategy parts."
- "All I have to do is make sure I specify the what really accurately."
- "You don't really need to know the implementation details. You just need to focus on specifying what it is you need to know. It's just seeking clarity."
- "This is not like a clean demo. It's real life."
- "When you're at the code [first level] yourself, you're just not aware of them."

## Cross-references
- Phases of craftship: Code First → Best Practice First (Docker, production-like env, idempotency)
- Lesson 39 (Getting better at backend), Lesson 40 (walking skeleton / acceptance testing UI→DB)
- Lesson 86 (Q&A: First Milestone Review)
- Tools: Express.js, TypeScript, Prisma, TypeORM, Postgres, MongoDB, Homebrew, Postman, curl, ChatGPT

## Fluff skipped
Greeting, "figuring this out live" chatter, sign-off.

## AI-era relevance hint
- This lesson already models the AI era: the AI writes the code and the developer's job is to specify the "what" precisely and debug integration and environment issues.
- Blind copy-paste produced redundant models and misplaced folders. Reviewing AI output still requires understanding the tools (e.g., the ORM schema as the single source of truth).
- Code First output (controllers wired straight to the DB, no tests, local DB) is exactly what agents produce by default. The later phases supply the judgment needed to move beyond it.

## Coverage proof
- Lines read: 120 / 120
- Final line (verbatim): "leave a video right there. And as always to mastery. And I'll see you in the next one."
