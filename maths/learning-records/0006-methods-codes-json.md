# Methods, status codes and JSON: mostly there; message length still shaky

Hari picked 409 for a full duel and 200 for success, and wrote the join request with `Content-Type: application/json` and valid JSON (after fixing a missing quote). Request vs response roles are now right ("that's a request"), and they know a Content-Length body leaves the connection open.

**Evidence**: gist `maths-l6-codes.md`, `maths-l6-write.md`, `maths-l6-recall-1.md`, `maths-l6-recall-2.md` (2026-11-13).

**Gaps**:
- Mapped "not found" to 400 (it's 404), and answered "5xx" without naming 500.
- Content-Length of `{"playerId":"p-42"}` given as 17 (it's 19). Byte counting is still loose.
- **Persistent, wrong twice**: (1) a response without a length "hangs infinitely". It ends when the server closes. (2) For a request with no Content-Length, "server won't know" the body size. It's zero.

**Implications**: lesson 7 makes both concrete in code (`?: 0`, the readAllBytes deadlock). If they're still wrong after writing the server, stop and do a live session on just this.
