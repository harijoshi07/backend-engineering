# Handoff: read this first in a new session (written 2026-11-13)

This repo is a self-taught backend course: a public GitHub Pages site plus a teaching workspace. The learner is an Android engineer (~1.5–2 yrs Kotlin, mobile banking) moving to backend. They have no backend foundations yet.

## What we're doing right now
**Building the "maths" duel game backend end to end, taught lesson by lesson.** The 100-session course is **paused at S1** until maths is done.

- Teaching method: Matt Pocock's `teach` skill (github.com/mattpocock/skills → skills/productivity/teach).
- Workspace: `maths/`, which holds:
  - `MISSION.md`
  - `RESOURCES.md`
  - `NOTES.md` (**hard rules are here**)
  - `GLOSSARY.md`
  - `learning-records/`
  - `drafts/`
- Lessons are MDX pages: `site/src/content/docs/maths/NNNN-*.mdx`.
- Concept map, the source of lesson order: `site/src/content/docs/maths/map.mdx` (45 concepts, 32 lessons).
- Published:
  - **Lesson 1**: Why the game needs a server (source of truth; client/server)
  - **Lesson 2**: Processes, IP addresses, ports
  - **Lesson 3**: A connection is a pipe of bytes (bytes & text, connection, client vs server precisely)
  - **Lesson 4**: Protocols, and the HTTP request (H1, H2)
  - **Lesson 5**: The response, and where a message ends (H3, H4)
  - **Lesson 6**: Methods, status codes, JSON (H5, H6, H7). HTTP layer complete.
  - **Lessons 7–9** (rewritten 2026-11-16): building the server, step by step, mirroring the learner's own commits in `maths` (A–B lesson 7; C lesson 8; D–F lesson 9). Uses the `ByteStrip` component, mermaid diagrams and an attributed MDN image. Routing (S4) is now covered in lesson 9, so lessons from 10 on shifted (threads = 10, Spring + Gradle = 11, … own-it = 32).
- **How the server got built (2026-11-16):** in a separate claude.ai chat, the learner wrote `handmade/Server.kt` themselves, one step and one commit at a time (e10dcbf → 31a9db1), with names, comments and a commit message per step. They said this depth of back-and-forth is how the course should go. Don't flaw-hunt their learning code.
- **Lesson 10** (threads, S3), written 2026-11-16 after doing steps 0–1 in chat. The learner did step 0 (slow-client experiment) and step 1 (`thread { handleClient(socket) }`, commit b58b21e). Claude added the log tags at their request (ba0ca81). **Step 2 (fixed thread pool, `pool.execute`) is next for them**, from the lesson.
- **Process going forward:** write the lesson FIRST (Matt Pocock style, with diagrams and real outputs), then the chat supports it with step-by-step questions. The learner asked why lesson 10 was being done only in chat.
- **Lesson 10 done** by the learner (step 2 pool in `Server.kt`, uncommitted as of 2026-11-16 15:30). L10 cost answer was 1k/3k threads (it's ~20k: a thread per *request*), re-asked as L11 recall 1.
- **Lesson 11** (Spring Boot + Gradle, S5/S6) written 2026-11-16: generate `maths/app/` from start.spring.io (Boot 4.1.2, Kotlin, Gradle-Kotlin, Java 25, Spring Web → `spring-boot-starter-webmvc`), read the build file, rebuild `/health` with `@RestController`, compare the 4 curls (no reason phrase, auto 404/405 with `Allow`, chunked errors, `curl -d` form trap → `hello=`), Tomcat Acceptor/exec/Poller threads via jstack.
- **Lesson 11 done** (2026-11-16): `maths/app/` Spring Boot app with `HealthController` (GET/POST /health) and their own `QuestionController` (GET /question), verified running. L11 answers good; they attribute everything except routing to Tomcat (Spring MVC also writes the body from the return value and does the 404/405).
- **Lesson 12** (controllers & DTOs, S7) written 2026-11-16: QuestionResponse JSON, `@PathVariable {code}`, `AnswerRequest`/`AnswerResult` DTOs on `POST /duels/{code}/answers` (correct = answer == 56, no state yet), six broken inputs with real Spring 4.1.2 results (400 ×3, 415, unknown field ignored, "56" coerced).
- **Lesson 12 done** 2026-11-16 (commits 4a51d8a, d197864 + uncommitted POST /duels). Answers in gist: recall/break/create good; skipped (d) (415); design answer named the class DuelRequest and left out the response DTO. Their `answer()` hard-codes `correct = true` (65 comes back correct); pointed out the `request.answer == 56` line, they'll fix it themselves.
- **Waiting on the learner:** fixing `correct`, then go-ahead for Lesson 13.
- **Next to write:** Lesson 13, errors you design (S8): ResponseEntity/@ResponseStatus, 201, 404/409 via exceptions + @RestControllerAdvice, a custom error DTO, reading WARN lines and stack traces.

## Where the learner's answers are
Every question in a lesson is a `Think` box. Answers sync to the learner's **secret gist "backend-engineering answers"** (`<think-id>.md`), from the site on any device once they've pasted a gist-scoped token, and from chat (Claude writes them there). Fetch from the gist before grading: `gh gist list | grep 'backend-engineering answers'`.

## Hard rules for teaching (from the learner)
1. **Brick by brick.** Never use a concept before the lesson that teaches it. Allowed givens: Kotlin, Android apps, JSON data classes, Retrofit usage. Check every lesson against `map.mdx`.
2. **Real substance, few analogies.** Use at most ONE familiar example per lesson, ideally from their Android/Wordle world. Run every command and show its true output.
3. Short lessons, one tangible win each, recall questions at the start, primary source cited.
4. Quiz options must be the same word count, and the correct answer's position should vary.
5. ~~The learner writes the server code~~ **Changed 2026-11-16:** Claude writes the server code and teaches it, then gives the learner small changes to make (see `maths/NOTES.md`). AI may build the phone client.
6. No automated tests for now (the learner's choice).
7. Goal: by the end they can **build and own** this backend.

## The game ("maths")
- Both modes are **duels**, in-memory, Kotlin + Spring Boot (JDK 25):
  - **Live Duel**: same questions, same order, 60 seconds, most correct answers wins, opponent's score shown live.
  - **Cross Math Duel**: same grid of equations, first correct solve wins.
- The code lives in the learner's **private** repo `harijoshi07/maths`, cloned at `~/code/personal/maths` on the work Mac. `handmade/Server.kt` (lessons 7–9) holds the finished L7 server (written by Claude at the learner's request, 2026-11-16). A minimal Gradle build (Kotlin 2.4.21, JDK 25 toolchain, `srcDir("handmade")`, `./gradlew -q run`) was added early (2026-11-16) because IntelliJ gave no hover docs on a loose .kt file; lesson 10 must still *teach* Gradle.

## Site
- Astro 7 + Starlight 0.42, in `site/`.
- A push to `main` that touches `site/**` deploys to https://harijoshi07.github.io/backend-engineering/.
- Run locally: `cd site && npm install && npm run dev`.
- Components you can reuse in lessons: `Quiz`, `Think`, `Stepper`, `Tracker` (in `site/src/components/`).
- `PageTitle.astro` override: inline "On this page" list plus the sidebar toggle. The right-hand table of contents is disabled.
- Mermaid diagrams are supported in code fences.

## Other context
- **Wordle** (`harijoshi07/wordle`, private) was the learner's first backend: Spring Boot + WebSocket, built with heavy AI help. A review on 2026-11-12 found:
  - Good concurrency and retry design.
  - Gaps: tests, a rate limit, a README, and one bug. `SessionLimitExceededException` (a RuntimeException) isn't caught in `GameSocketHandler.onGameChanged`, so a slow opponent can turn a stored guess into a 500.
- **Games Lab (proposed, not yet written into the plan):**
  1. Wordle rebuilt from memory
  2. maths (now in progress)
  3. Mind Meld (both players converge on the same word; after Phase 4)
  4. Draw & Guess (after Phase 7)

  When to write it down as plan v1.1 is still open.
- **100-session course:** plan v1.0 is locked (`site/src/data/sessions.ts`). S0 is done. S1 was started but not finished; the recall and diagnostic questions R1–R3, A1–A7 and W1–W4 are still unanswered. Weak spots are in `progress/weak-spots.md`.
- Repo visibility: only `backend-engineering` is public. `wordle` and `carpediem` stay private.

## Work Mac setup
```bash
gh repo clone harijoshi07/backend-engineering && cd backend-engineering
brew install kotlin                 # lessons run Kotlin locally (kotlinc)
java -version                       # needs JDK 25 (brew install --cask temurin@25)
cd site && npm install              # only if editing/previewing the site (Node 24)
```
`nc`, `curl`, `lsof` and `python3` ship with macOS. The lessons use them.
