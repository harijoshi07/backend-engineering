# Mission: build "maths", a two-player maths duel game, end to end

## Why
Hari is an Android engineer moving to backend. Wordle was their first backend, built with AI doing much of the thinking, and they aren't confident in the concepts yet. Building **maths** from absolute basics, by their own hand, is meant to turn "I've seen this" into "I can build this", and to give them a game they actually enjoy playing with friends.

## Success looks like
- They can explain, with a drawing, what happens between two phones and the server during a duel.
- They have written the **maths** server themselves in Kotlin + Spring Boot. Both modes are duels:
  - **Live Duel**: two players get the same questions in the same order, play 60 seconds, and the most correct answers wins.
  - **Cross Math Duel**: two players get the same grid of equations, and the first correct solve wins.
- Opponents' progress reaches each phone live (WebSocket), and retries never double-count.
- They play a real duel on two phones against a friend.
- They can rebuild the core (HTTP API, game state, push, locking) without looking.

## Constraints
- Taught from absolute basics, as if they know nothing. Real-world analogies, drawings, examples, small steps.
- They write the backend code themselves. AI can build the client app.
- No automated tests for now (their call); checks are done by hand with curl and the app.
- Lessons are published on the course site (GitHub Pages).
- Built before the 100-session course resumes.

## Out of scope (for now)
- Databases, accounts and logins, deployment, scaling to many servers.
- Other game modes (daily challenge, flash anzan, leaderboards, ratings).
