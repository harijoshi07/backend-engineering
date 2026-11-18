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
- Learner fixed `correct` (bea6b12).
- **Lesson 13** (errors you design, S8) written 2026-11-16, built on the learner's real names (AnswerResponse, DuelRequest/DuelResponse): `@ResponseStatus(CREATED)` on POST /duels; stand-in rule "only K7QM exists" until lesson 15; RuntimeException → 500 + real stack trace read top/your-line/bottom; `@ResponseStatus(NOT_FOUND)` exception → 404 with no log line, same body as /nope; `@RestControllerAdvice` + `ErrorResponse(error, message)` for DuelNotFound (404) and HttpMessageNotReadable (400, logs e.message since Spring's WARN disappears); exercise: 415 handler (loses the Accept header). 409 deferred to lesson 15 (needs state). Aside: RFC 9457 ProblemDetail via spring.mvc.problemdetails.enabled.
- **Lesson 13 done** 2026-11-17 (commits 08284f4…aaf96d6). Code works; their 415 handler uses the right HttpMediaTypeNotSupportedException, but the gist answer and a leftover unused import name WebFlux's UnsupportedMediaTypeStatusException (org.springframework.web.server), which MVC never throws. predict-500 guessed 4xx + message (real: 500, message hidden). trace answer: half (missed the first dev.hari.maths line = where). teachback: missing the throw → handler → ResponseEntity → Jackson chain.
- **Lesson 14** (layers + DI, S9/S10) written 2026-11-17: domain `Duel(code, playerName, correctAnswer)`; returning Duel leaks correctAnswer (real); DuelStore (K7QM stand-in moved there, `find` → Duel?) + DuelService (`create`, `checkAnswer` throws DuelNotFound) built by hand, then `@Repository`/`@Service` + constructor injection; init printlns show creation on [main] once; same `DuelService@hex` on 3 threads (sets up lesson 19); two hand-built controllers = two stores (real); missing @Service → APPLICATION FAILED TO START (real). Hilt mapping table.
- **Lesson 14 done** 2026-11-17 (79842b0, b9ded70; then renamed DuelStore → DuelRepository, uncommitted at check time; service param still called `store`). Answers good; place ✅ all five; teachback mentions IoC but not the Activity/ViewModel/Repository mapping.
- **Lesson 15** (state in memory, G1) written 2026-11-17 using the learner's names (DuelRepository, `store`): private mutableMapOf, save/find with log of map size; service `create` with `newCode()` loop (check-then-act, flagged for lesson 20), `get` (find or 404), checkAnswer uses get; `GET /duels/{code}`; K7QM now 404; `jcmd PID GC.class_histogram` shows 4 Duel objects + 1 of each bean (real); restart → 404 + no Duel objects. Exercise: case-insensitive codes in service (`code.uppercase()`), real run; answer echoes lowercase path code.
- **Lesson 15 done** 2026-11-17. Learner renamed the service param to `repository`; GET mapping is `"duels/{code}"` (no leading slash, works); both GET and POST functions are named `duel` (overloads). Git: they pushed 54dce34 with a `{code` typo, then amended locally to 9533e3d → local/remote diverged; told them `git push --force-with-lease` (not done by me). Answers: loop answer vague (missed: a repeat silently replaces a duel), lowercase only named the layer, predict answered the wrong question (K7QM → 404), recall-2 conflated listening with being a process.
- **Lesson 16** (state machine, G2) written 2026-11-17: `DuelStatus` enum + Duel(status=WAITING, opponentName, winner) defaults; `Duel.toResponse()` extension; `join` (read → check → write with copy), `DuelConflictException(error, reason)` → 409 handler; AnswerRequest gains playerName; `AnswerOutcome(correct, duel)`; full real game transcript BRSL (409 ×4, 400 for old body); state × action table; caution: concurrent joins (lesson 19). Exercise: stranger Zen wins (real) → NotInDuelException → 403 NOT_IN_DUEL (real); authentication gap named. MediaPlayer state diagram as the Android example.
- **Lesson 16 done** 2026-11-18 (12f9515, 9ba2ee6, 09b0351; also 50b279f fixed the `{code` typo with a new commit instead of force-pushing, so local = origin). Committed code **doesn't compile**: the controller still calls `duelService.checkAnswer(...)` (removed from the service) on the line before `duelService.answer(...)`; told them to delete it. With that line removed, the full game works (verified). Stranger exercise not done in code. Answers: predict-game 7/8 (thought joining a FINISHED duel → 200 "it still exists"; real 409 DUEL_NOT_WAITING), recall-1 said a repeated code "throws an exception" (it silently replaces), stranger: right layer, but suggested "not authenticated" (401) instead of a membership check → 403, and didn't say Zen wins today; teachback good.
- **Lesson 17** (seeds, G3) written 2026-11-18: `Questions.kt` (`Question(a,b)` with computed text/answer, `QUESTIONS_PER_DUEL = 5`, `questionsFor(seed)` makes a new `Random(seed)` each call); Duel `correctAnswer` → `seed: Long` + `questions` property; create uses `Random.nextLong()` and logs the seed; replay script rebuilds UZUH's questions from the logged seed (real); `GET /duels/{code}/questions` → `QuestionDto(index, text)`, no answers; "don't send the seed" Think with the original Wordle answers-in-JS story; Duel `answers: Map<String, List<Int>>` (default `mapOf(playerName to emptyList())`) + `score()` via zip; join adds opponent; `NotInDuelException` → 403 introduced as part of step 4; answer checks PLAYING (409) → member (403) → NO_QUESTIONS_LEFT (409) → WRONG_QUESTION (409); finish when both answered 5, higher score wins, tie → winner null; DuelResponse gets `scores`. Full real game UZUH (Sita 5, Hari 4). Foreshadows: resend → WRONG_QUESTION (lesson 21), duel waits forever if a player stops (lesson 18). Exercise: no repeated questions via generateSequence/distinct/take (real: 786/10,000 seeds had a repeat; seed 2 before/after).
- **Lesson 17 done** 2026-11-18 (b06d371, a027d1a, 296b24f, 3c37651; c24cf78 removed the stale checkAnswer call). Code verified by running: questions, 403, WRONG_QUESTION, NO_QUESTIONS_LEFT, finish + winner all work. Their names: `QUESTION_PER_DUEL` (singular), text uses `"$a x $b"` (ASCII x), AnswerResponse field order differs, 403 handler message uses `e.message`. Answers: predict (2) said "4xx" (409 WRONG_QUESTION) and (3) said 200 (real 409 WRONG_QUESTION: Hari is on question 0); repeats exercise not solved (guessed `.unique()`); **teachback misconception: thinks the server sends the seed over the network instead of the questions** — corrected: the seed stays on the server, the phone gets text. recall-1 gave 409 without the "why not 400".
- **Lesson 18** (server's clock, G4) written 2026-11-18: phone clock can be changed in Settings (the one Android example; SystemClock docs quoted); `Instant`/`Duration` script (Kathmandu vs New York, same instant); Duel `startedAt: Instant?` set in join, derived `endsAt`, `isTimeUp(now)` (now passed in by the service); `DUEL_LENGTH = 60 s`; lazy finish inside `get()` (nothing runs at the deadline; reuses `finish`, late answer → existing 409 DUEL_NOT_PLAYING); `secondsLeft` in DuelResponse instead of endsAt. Real 61-second duel SNYQ (Hari wins 2–1, Sita's correct late answer → 409, log shows "time is up" on exec-6). Caution: get() now writes (lesson 19). Exercise: `createdAt` + `JOIN_WINDOW = 2 min` → 409 DUEL_EXPIRED in join (real 2-minute run NJTC); expired duels are refused, not removed.
- **Waiting on the learner:** Lesson 18.
- **Next to write:** Lesson 19, race conditions (C1): two threads join the same WAITING duel at the same instant and both get in (lost update); make it happen on purpose (e.g. a short Thread.sleep between check and write, two concurrent curls), show the log, and explain why a plain mutableMapOf is not safe across Tomcat threads. Fixes are lesson 20.

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
