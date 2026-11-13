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
- Concept map, the source of lesson order: `site/src/content/docs/maths/map.mdx` (45 concepts, 31 lessons).
- Published:
  - **Lesson 1**: Why the game needs a server (source of truth; client/server)
  - **Lesson 2**: Processes, IP addresses, ports
  - **Lesson 3**: A connection is a pipe of bytes (bytes & text, connection, client vs server precisely)
  - **Lesson 4**: Protocols, and the HTTP request (H1, H2)
  - **Lesson 5**: The response, and where a message ends (H3, H4)
- **Graded (2026-11-13):** L1–L4 understood (records 0002–0004). Re-check later: they phrase the protocol question as "when does a new line start" (it's "where does a message end"); they wrote a Retrofit `{code}` placeholder and a trailing space in a request line (L5 recall 1).
- **Waiting on the learner:** all Lesson 5 Think boxes (in the gist).
- **Next to write:** Lesson 6, methods + status codes + JSON bodies (H5, H6, H7); the draft's status-code table and the `{"playerId":"p-42"}` exercise fit there. Then the draft can be deleted. Grade L5 first.
- `maths/drafts/http-byte-by-byte.mdx` is an over-packed HTTP draft. Split it into Lessons 4–6 once their prerequisites are taught.

## Where the learner's answers are
Every question in a lesson is a `Think` box. Answers sync to the learner's **secret gist "backend-engineering answers"** (`<think-id>.md`), from the site on any device once they've pasted a gist-scoped token, and from chat (Claude writes them there). Fetch from the gist before grading: `gh gist list | grep 'backend-engineering answers'`.

## Hard rules for teaching (from the learner)
1. **Brick by brick.** Never use a concept before the lesson that teaches it. Allowed givens: Kotlin, Android apps, JSON data classes, Retrofit usage. Check every lesson against `map.mdx`.
2. **Real substance, few analogies.** Use at most ONE familiar example per lesson, ideally from their Android/Wordle world. Run every command and show its true output.
3. Short lessons, one tangible win each, recall questions at the start, primary source cited.
4. Quiz options must be the same word count, and the correct answer's position should vary.
5. **The learner writes the server code**; the teacher explains, asks, and reviews. AI may build the phone client.
6. No automated tests for now (the learner's choice).
7. Goal: by the end they can **build and own** this backend.

## The game ("maths")
- Both modes are **duels**, in-memory, Kotlin + Spring Boot (JDK 25):
  - **Live Duel**: same questions, same order, 60 seconds, most correct answers wins, opponent's score shown live.
  - **Cross Math Duel**: same grid of equations, first correct solve wins.
- The code will live in a separate **private** repo the learner creates (planned name: `maths`). It doesn't exist yet.

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
