# A protocol gives bytes meaning; HTTP's request shape

Hari explained, unprompted and at length, the chain from lesson 2 to lesson 4: IP:port, then a connection carrying raw bytes with no boundaries, then a protocol so both sides agree on meaning, and HTTP as the shared one (client first, `\r\n` lines, start line + headers + empty line + optional body). They wrote a correct minimal GET request with `Host`. They also correctly separated LISTEN from ESTABLISHED in lsof.

**Evidence**: gist `maths-l4-teachback.md`, `maths-l4-write.md`, `maths-l4-recall-2.md` (2026-11-13).

**Implications**: ready for the response and message length (lesson 5). Misconceptions to correct:
- They framed the protocol's second question as "when does a new line start". It's "where does a *message* end"; lines are only HTTP's mechanism for the headers.
- They guessed `Content-Length` exists "to check the length". It's how the reader knows where the body *ends*. Lesson 5 addresses this.
- In the hand-written request they kept Retrofit's `{code}` placeholder and put a space before `\r\n`. Bytes must be exact.
- They think both devices need a known IP:port. Only the server's matters; the client's port is OS-assigned (lesson 3).
