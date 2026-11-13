# A connection is a byte stream with no message boundaries

Hari predicted that `56`, a pause, then `57\n` arrive as one run (`3536 3537`; they missed the trailing `0a`). In the teach-back they said that the server listens on `IP:port`, the client connects, bytes flow through the connection, and the sides must agree on where an answer ends "because connection doesn't provide that". They also fixed lesson 1's gap: the server compares the value against its own correct answer and ignores the phone's claim.

**Evidence**: gist `maths-l3-predict.md`, `maths-l3-teachback.md`, `maths-l3-recall-1.md` (2026-11-13).

**Implications**: lesson 4 (protocol) can rest on "no boundaries". Small slips to re-check: they wrote "doesn't travel as text but as bytes" (text *is* bytes, encoded), described flow only client→server (it's two-way), and dropped `-sTCP:LISTEN` from the lsof command.
