# Addresses: IP picks the machine, port picks the process

Hari can explain "can't connect" in terms of the three lesson-2 bricks: no process listening on the port, wrong IP (the machine's location), wrong port (which process). They also remembered that `lsof` is the tool to check, but not the full command (`lsof -nP -iTCP:8080 -sTCP:LISTEN`).

**Evidence**: gist answers `maths-l2-ports.md` and `maths-l2-followup.md` (2026-11-13). Recall of lesson 1's two failure reasons (forged app, drifting clocks) was correct too (`maths-l2-recall-1.md`).

**Implications**: lesson 3 can build on `IP:port` freely. Watch: the source-of-truth *mechanism* (the server checks against its own key; a phone's claim is never evidence) is shaky. They answered "it's not handled in the server". Re-check it with retrieval in lesson 3 and later.
