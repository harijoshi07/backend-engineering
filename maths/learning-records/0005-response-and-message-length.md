# The response shape is solid; message length is half-understood

Hari wrote a byte-perfect response (`HTTP/1.1 200 OK`, `Content-Length: 16` counted correctly, empty line, body), and fixed both mistakes in their own lesson-4 request line (placeholder, trailing space). They know the empty line ends the headers and that the body's end was the open question.

**Evidence**: gist `maths-l5-write.md`, `maths-l5-recall-1.md`, `maths-l5-recall-2.md` (2026-11-13).

**Misconceptions** (from `maths-l5-teachback.md`):
- "With Content-Length it reads the body and immediately closes the connection". Backwards: with a length the connection stays open for reuse; closing is the fallback when there's *no* length.
- "If not mentioned, it waits forever". For a response it waits until the server closes. For a request, no length means no body.
- They described the server checking "the http response contract" on bytes it *received*. Request and response roles got blurred.

**Implications**: both re-asked as lesson 6 recall. Re-check again at lesson 20 (timeouts), which depends on knowing when a reader stops waiting.
