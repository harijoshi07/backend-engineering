# Notes (teacher's scratchpad)

## How Hari wants to be taught
- Matt Pocock's `teach` method: short lessons, one tangible win each, cited sources, quizzes, retrieval practice.
- Start from **absolute basics**; assume nothing. Use examples, drawings (ASCII + mermaid), real-world analogies.
- Mentor posture: enable them to do things themselves; don't do them for them.
- Lessons live on the course site: `site/src/content/docs/maths/NNNN-*.mdx` (this is the `./lessons/` folder of the teach method; the site's Quiz/Think/Stepper components are the `./assets/`).
- Reference sheets live in `site/src/content/docs/maths/reference/`.
- No automated tests for now (their decision, 2026-11-13). Verify by hand with curl.
- Both game modes are duels (no solo mode).
- Quizzes: options the same length, correct answer position varied.

## Hard rules (from the learner, 2026-11-13)
- **Brick by brick.** The learner knows nothing about backend. Build the knowledge graph from foundations up; never use a concept before its own lesson (exceptions: Kotlin, Android apps, JSON data classes, Retrofit usage). The graph lives in `site/src/content/docs/maths/map.mdx`; follow it and update it.
- **Real substance, few analogies.** At most ONE familiar example per lesson (preferably from their own Android/Wordle world), used to explain real mechanics, not side stories. Show real commands and their real output (run them first).
- **Goal is ownership:** by the end they can build and own this backend themselves.

## Context
- They built `wordle` (Spring Boot + WebSocket) with heavy AI help; client fully AI. Code was good; their confidence is low.
- Android background: relate to Retrofit/OkHttp, ViewModel, Room where it helps.
- The 100-session course is paused at S1 while maths is built.

## Working notes
- Code for the game lives in a separate repo they create themselves (planned: `harijoshi07/maths`, private).
