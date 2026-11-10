// Single source of truth for the 100-session roadmap.
// Drives both /roadmap (tables) and /progress (tracker).
// Inline formatting supported in `work`: `code`, **bold**.

export type Session = {
  n: number;
  title: string;
  work: string;
  /** Matching chapter numbers in the Sriniously notes site. */
  ch?: number[];
  review?: boolean;
  milestone?: boolean;
};

export type Phase = {
  id: number;
  title: string;
  goal: string;
  sessions: Session[];
  gate?: string;
};

export const NOTES_BASE = 'https://backend-from-first-principle.vercel.app';

export const phases: Phase[] = [
  {
    id: 1,
    title: 'How machines talk',
    goal: 'Understand what a "backend" physically is, below any framework.',
    gate: 'Explain, from memory, everything between `call.execute()` and your handler running. NanoHTTP serves routed JSON through middleware.',
    sessions: [
      { n: 1, title: 'Kickoff + diagnostic', work: 'Calibration quiz. Install OrbStack, psql, IntelliJ, HTTPie/Bruno, k6, Wireshark. 🧠 Trace a wallet login from tap → DNS → TLS → LB → app → DB and back, drawn in ASCII.' },
      { n: 2, title: 'OS for backend engineers', work: '🧠 Processes, threads, memory, file descriptors, signals. 🧪 A Linux shell inside a container: `ps`, `lsof`, `ss`. Kotlin threads under `jstack`.' },
      { n: 3, title: 'IP, TCP/UDP, sockets', work: '🧪 Watch a `curl` in Wireshark. ✍️ TCP echo server with `ServerSocket`.' },
      { n: 4, title: 'DNS, TLS, "type a URL"', work: '🧪 `dig`, `openssl s_client`. 🧠 Chain of trust: certificate pinning seen from the server side.' },
      { n: 5, title: 'HTTP/1.1 on the wire', ch: [1], work: '🧪 Send a raw request with `nc`. ✍️ Parse the request line, headers and body.' },
      { n: 6, title: 'NanoHTTP: a raw HTTP server', work: '🔨 Responses, keep-alive, thread-per-connection, JSON. 🧪 Load test until it falls over.' },
      { n: 7, title: 'Review #1', review: true, work: '🔁 Cumulative quiz, redo a hand-written exercise, teach-back, retro.' },
      { n: 8, title: 'HTTP semantics', ch: [1], work: '🧠 Methods, **safety vs idempotency**, status codes, headers, RFC 9110.' },
      { n: 9, title: 'Routing', ch: [2], work: '✍️🔨 Build a router: static/dynamic routes, path/query params, trie vs regex, versioning.' },
      { n: 10, title: 'Middleware & request context', ch: [6], work: '🔨 Middleware chain (request-id, logging, timing, auth stub), compared with OkHttp interceptors.' },
      { n: 11, title: 'Serialization & validation', ch: [3, 5], work: '🧠 Text vs binary, JSON in depth, Protobuf. Validation as the gate in front of business logic.' },
      { n: 12, title: 'Concurrency models', ch: [20], work: '🧠 IO- vs CPU-bound work. Thread-per-request, event loop, virtual threads, coroutines. 🧪 Run NanoHTTP on virtual threads and load test again.' },
      { n: 13, title: 'Advanced HTTP + REST', ch: [1, 7], work: '🧠 Caching/ETag, CORS, cookies, HTTP/2 & /3, REST, PUT vs PATCH. 📝 Design the wallet API on paper. Finish NanoHTTP.' },
      { n: 14, title: 'Review #2', review: true, work: '🔁 Review. 📝 **Blog #1:** an HTTP server from raw sockets in Kotlin.' },
    ],
  },
  {
    id: 2,
    title: 'Data, from storage to correctness',
    goal: 'Make the database your strongest skill. In fintech, the database is the product.',
    gate: 'Run 1,000 concurrent random transfers and the ledger still sums to exactly 0. Reproduce every isolation anomaly from memory.',
    sessions: [
      { n: 15, title: 'Why databases exist', ch: [8], work: '🔨 File-backed KV store (append-only log + hash index). Crash it. 🧠 What `fsync` is for.' },
      { n: 16, title: 'Storage engines', work: '🧠 LSM vs B-tree. Postgres pages, heap, WAL. 🎛 B-tree visualizer.' },
      { n: 17, title: 'Relational model + Postgres', work: '🔨 Postgres in Docker, `psql` fluency. ✍️ SQL I: joins on a wallet dataset.' },
      { n: 18, title: 'SQL II', work: '✍️ Aggregates, CTEs, **window functions** (a running balance).' },
      { n: 19, title: 'Schema design', work: '🧠 Normalization, keys (UUIDv7 vs bigint), **constraints as invariants**, money types (never `Double`).' },
      { n: 20, title: 'Indexes', ch: [8], work: '🧪 B-tree, composite, covering and partial indexes. `EXPLAIN ANALYZE` on 1M rows. Triggers.' },
      { n: 21, title: 'Review #3', review: true, work: '🔁 Cumulative quiz, teach-back, retro.' },
      { n: 22, title: 'Transactions & ACID', work: '🔨 A naive transfer hit by 100 concurrent threads: **watch money vanish**.' },
      { n: 23, title: 'Isolation & MVCC', work: '🧪 Reproduce every anomaly (including **write skew**) in two `psql` sessions. 🎛 Isolation simulator.' },
      { n: 24, title: 'Locking strategies', work: '🔨 Fix the transfer three ways (`FOR UPDATE` + lock ordering, optimistic version, `SERIALIZABLE` + retry) and benchmark them.' },
      { n: 25, title: 'Double-entry bookkeeping', work: '🧠 Accounts, journal entries, postings, derived vs cached balances. ✍️ Ledger schema. 🎛 Posting explorer.' },
      { n: 26, title: 'JDBC by hand', work: '✍️ `PreparedStatement` (with a SQL-injection demo), manual transactions. 🧠 HikariCP pool sizing. Flyway.' },
      { n: 27, title: 'ledger-core-raw', work: '🔨 JDK `HttpServer` + your router + JDBC, no framework. 📝 Write a "pain list" of everything that hurt.' },
      { n: 28, title: 'Review #4', review: true, work: '🔁 Review. 📝 **Blog #2:** why your transfer endpoint loses money.' },
    ],
  },
  {
    id: 3,
    title: 'Spring, earned, plus the wallet core',
    goal: 'Spring stops being magic. Then the flagship begins.',
    gate: 'The same transfer retried 50 times with one idempotency key moves money exactly once. Explain how `@Transactional` works without the docs open.',
    sessions: [
      { n: 29, title: 'DI from first principles', work: '✍️🔨 A reflection-based DI container. 🧠 Hilt (compile time) vs Spring (runtime).' },
      { n: 30, title: 'Spring IoC', work: '🧠 Context, beans, scopes, lifecycle, profiles, the `kotlin-spring` all-open plugin.' },
      { n: 31, title: 'Proxies & AOP', work: '✍️ A transactional proxy by hand, then `@Transactional`. 🧪 The self-invocation trap.' },
      { n: 32, title: 'How Boot works', ch: [14], work: '🧠 Auto-configuration, `@Conditional*`, starters. 🔨 Write your own starter. Config properties, profiles, 12-factor config.' },
      { n: 33, title: 'MVC request lifecycle', ch: [6], work: '🧠 `DispatcherServlet` mapped onto NanoHTTP. 🔨 Port ledger-core to Spring and strike items off the pain list.' },
      { n: 34, title: 'Validation + errors', ch: [5, 12], work: '🧠 `@field:` use-site targets, `@RestControllerAdvice`, **Problem Details**, five classes of error.' },
      { n: 35, title: 'Review #5', review: true, work: '🔁 Cumulative quiz, teach-back, retro.' },
      { n: 36, title: 'Data access options', work: '🧪 `JdbcClient` vs Spring Data JDBC vs JPA (**N+1**, lazy loading). 📝 **ADR-001**.' },
      { n: 37, title: 'Spring transactions', work: '🧠 Propagation, isolation, rollback rules (the Kotlin checked-exception gotcha), no external calls inside a transaction.' },
      { n: 38, title: 'Testing I', ch: [22], work: '🧠 Test pyramid, test doubles. 🔨 JUnit 5 + MockK/Kotest on the domain logic.' },
      { n: 39, title: 'Testing II', ch: [22], work: '🔨 Testcontainers, slice tests, concurrency tests, WireMock.' },
      { n: 40, title: 'Wallet kickoff', work: '🧠 Event storming: Identity, KYC, Ledger, Payments, Merchants, Billpay, Notify. Spring Modulith. 📝 **ADR-002**.' },
      { n: 41, title: 'Ledger module', work: '🔨 Chart of accounts, atomic journal posting, balances, invariants enforced in the DB and in code.' },
      { n: 42, title: 'Review #6', review: true, work: '🔁 Cumulative quiz, teach-back, retro.' },
      { n: 43, title: 'API design + OpenAPI', ch: [7, 25], work: '🧠 Resources, filtering, the error contract, versioning. Design-first spec, springdoc, keeping spec and code in sync.' },
      { n: 44, title: 'Idempotency keys', work: '🔨 Idempotent `POST /transfers` with atomic phases and recovery points (the Stripe/Brandur approach).' },
      { n: 45, title: 'Transfer state machine', work: '🔨 PENDING → POSTED → FAILED/REVERSED. Holds. Reversals instead of deletes.' },
      { n: 46, title: 'Pagination', work: '🧪 Offset vs **cursor** pagination over 1M transactions.' },
      { n: 47, title: 'Audit, time, KYC limits', work: '🔨 Append-only audit, `Instant` and time zones, per-tier limits enforced under concurrency.' },
      { n: 48, title: 'Milestone M1', milestone: true, work: '🏁 Staff-level PR review, then fixes. README + architecture diagram.' },
      { n: 49, title: 'Review #7', review: true, work: '🔁 Review. 📝 **Blog #3:** idempotency keys, the part mobile engineers never see.' },
    ],
  },
  {
    id: 4,
    title: 'Security, the fintech way',
    goal: 'Think like an attacker, then build like a bank.',
    sessions: [
      { n: 50, title: 'Threat modeling', ch: [17], work: '🧠 STRIDE-lite on the wallet. OWASP API Top 10. Authentication vs authorization.' },
      { n: 51, title: 'Passwords & MPIN', ch: [4, 17], work: '✍️ argon2/bcrypt, salt/pepper, timing attacks. 🔨 Login *without* Spring Security first.' },
      { n: 52, title: 'Sessions vs tokens', ch: [4], work: '✍️ Build and verify a JWT by hand (HMAC, then asymmetric). Cookie attributes. Pitfalls.' },
      { n: 53, title: 'Spring Security architecture', work: '🧠 Filter chain, `AuthenticationManager`, `SecurityContext`, mapped onto the S10 middleware.' },
      { n: 54, title: 'Refresh tokens & devices', work: '🔨 Rotation, reuse detection, logout, **device binding**, hashed storage.' },
      { n: 55, title: 'OAuth2 + OIDC', ch: [4], work: '🧠 Authorization Code + PKCE from the server side. Keycloak in Docker, resource server. 📝 **ADR-003**.' },
      { n: 56, title: 'Review #8', review: true, work: '🔁 Cumulative quiz, teach-back, retro.' },
      { n: 57, title: 'Authorization', ch: [4, 17], work: '🧠 RBAC/ABAC. 🧪 **Exploit BOLA/BFLA in your own API**, then fix it. Admin roles.' },
      { n: 58, title: 'Attack your API', ch: [17], work: '🧪 Injection, mass assignment, SSRF, XSS/CSRF/CORS, security headers.' },
      { n: 59, title: 'Rate limiting', ch: [17], work: '✍️🔨 Token bucket. Protection against brute force and OTP abuse. 🎛 Token-bucket playground.' },
      { n: 60, title: '2FA & step-up', work: '✍️ TOTP (RFC 6238) by hand. Step-up auth for high-value transfers.' },
      { n: 61, title: 'Data protection', work: '🧠 Secrets, envelope encryption for PII, keeping PII and tokens out of logs, TLS everywhere, PCI awareness.' },
      { n: 62, title: 'Fraud & risk basics', work: '🔨 Velocity checks, anomaly flags, account freeze, audit trail for admin actions.' },
      { n: 63, title: 'Review #9', review: true, work: '🔁 Review. 📝 **Blog #4**.' },
    ],
  },
  {
    id: 5,
    title: 'Wallet features & external partners',
    goal: 'Real money moves through systems you do not control.',
    sessions: [
      { n: 64, title: 'Calling other services', work: '🧠 `RestClient`/HTTP interfaces, timeouts, anti-corruption layer. 🔨 Build a **mock bank partner** that is flaky on purpose.' },
      { n: 65, title: 'Load from / withdraw to bank', work: '🔨 Pending → callback → posted. **The unknown-status problem**: status-inquiry jobs, and why you never "just retry".' },
      { n: 66, title: 'Merchant QR payments', work: '🔨 QR payloads, merchant accounts, **fees & commissions as multi-leg postings**.' },
      { n: 67, title: 'Bill pay & top-up', work: '🔨 Mock aggregator, async fulfilment, reversals & refunds.' },
      { n: 68, title: 'Statements & search', ch: [11], work: '🧠 Inverted index, BM25. 🔨 Postgres full-text search over transactions. 🧪 Compare with Elasticsearch. Statement generation.' },
      { n: 69, title: 'Milestone M2', milestone: true, work: '🏁 Wallet feature-complete. End-to-end demo with Bruno/HTTPie scripts, then a review.' },
      { n: 70, title: 'Review #10', review: true, work: '🔁 Cumulative quiz, teach-back, retro.' },
    ],
  },
  {
    id: 6,
    title: 'Performance, caching, async',
    goal: 'Measure first, then make it fast, then make it asynchronous without losing a rupee.',
    gate: 'A before/after load-test report. Kill the consumer mid-stream: no event lost, no notification or cashback duplicated.',
    sessions: [
      { n: 71, title: 'Performance first principles', ch: [18], work: '🧠 Latency numbers, Little\'s Law, p50/p99. 🧪 **k6 baseline**.' },
      { n: 72, title: 'Profiling', ch: [18], work: '🧪 JFR, async-profiler, flame graphs, `pg_stat_statements`. Fix one real bottleneck.' },
      { n: 73, title: 'Caching theory + Redis', ch: [9], work: '🧠 Cache layers, strategies, invalidation, stampedes. Redis internals.' },
      { n: 74, title: 'Redis in practice', ch: [9], work: '🔨 Spring Cache + Redis, why balances are **not** cached naively, a distributed rate limiter in Lua.' },
      { n: 75, title: 'Distributed locks', work: '🧠 Kleppmann vs Redlock, fencing tokens, and why DB constraints usually win.' },
      { n: 76, title: 'JVM server concurrency', ch: [20], work: '🧠 Thread pools, virtual threads in Boot, coroutines, WebFlux trade-offs. 📝 **ADR-004**.' },
      { n: 77, title: 'Review #11', review: true, work: '🔁 Cumulative quiz, teach-back, retro.' },
      { n: 78, title: 'Background jobs', ch: [10], work: '✍️🔨 Postgres job queue with `SKIP LOCKED`, visibility timeouts, retries + jitter. ShedLock.' },
      { n: 79, title: 'Outbox & idempotent consumers', ch: [10, 23], work: '🔨 Transactional outbox + relay, inbox-based dedup.' },
      { n: 80, title: 'Kafka fundamentals', ch: [23], work: '🧠 Log, partitions, consumer groups, offsets, delivery semantics. 🎛 Partition visualizer. 🔨 Kafka (KRaft) + Spring Kafka.' },
      { n: 81, title: 'Events in the wallet', ch: [23], work: '🔨 `TransferPosted` → notifications + cashback, DLQ, schema evolution. 🧠 Event sourcing (concept only).' },
      { n: 82, title: 'Webhooks', work: '🔨 Merchant webhooks: HMAC signatures, backoff + jitter, replay protection.' },
      { n: 83, title: 'Real-time + files', ch: [24], work: '🔨 Live notifications over WebSocket/SSE, pub/sub backplane. KYC upload to MinIO with presigned URLs.' },
      { n: 84, title: 'Review #12', review: true, work: '🔁 Review. 📝 **Blog #5**.' },
    ],
  },
  {
    id: 7,
    title: 'Production engineering',
    goal: 'Run it on a real server, see inside it, and survive failure.',
    sessions: [
      { n: 85, title: 'Linux server from zero', work: '🔨 Provision a VPS: SSH keys, users, ufw, systemd, journald, Caddy + Let\'s Encrypt, a domain.' },
      { n: 86, title: 'Containers from first principles', ch: [21], work: '🧠 Namespaces, cgroups. 🔨 Multi-stage Dockerfile, layered jars, JVM memory in containers, full-stack Compose.' },
      { n: 87, title: 'Observability I', ch: [15], work: '🔨 Structured logs, MDC trace IDs, Micrometer, RED/USE, Prometheus + Grafana + Loki.' },
      { n: 88, title: 'Observability II', ch: [15], work: '🔨 OpenTelemetry tracing (Tempo). 🧠 SLIs/SLOs/error budgets, alerting.' },
      { n: 89, title: 'Resilience', ch: [12], work: '🔨 Timeouts, retries, circuit breakers and bulkheads against the flaky partners. Deep health checks.' },
      { n: 90, title: 'CI/CD + deploy', ch: [21], milestone: true, work: '🔨 GitHub Actions: tests, detekt, image build, deploy to the VPS. 🏁 **Milestone M3: live.**' },
      { n: 91, title: 'Review #13 + incident drill', review: true, work: '🔁 I break production; you debug from the dashboards and write a postmortem.' },
      { n: 92, title: 'Operating safely', ch: [16, 14], work: '🔨 **Graceful shutdown**, probes, expand/contract migrations, feature flags, secrets in production.' },
      { n: 93, title: 'Kubernetes fundamentals', ch: [21], work: '🔨 k3d: pods, deployments, services, probes, HPA, rolling updates. Run the wallet on it.' },
      { n: 94, title: 'Scaling out', ch: [19], work: '🧠 Stateless instances, LB algorithms, read replicas & lag, PgBouncer, sharding, CDNs, CAP/PACELC.' },
    ],
  },
  {
    id: 8,
    title: 'Distribution & system design',
    goal: 'Reason about systems bigger than one box, and defend your design under questioning.',
    sessions: [
      { n: 95, title: 'Distributed transactions & reconciliation', work: '🧠 2PC vs sagas, clocks & ordering. 🔨 **Daily reconciliation against the bank partner\'s settlement file.**' },
      { n: 96, title: 'Services & gRPC', ch: [13], work: '📝 **ADR-005:** extract Notifications as a service, or argue against it. 🔨 gRPC + Protobuf, deadlines, interceptors.' },
      { n: 97, title: 'System design practice', ch: [27], work: 'Timed mock designs: a payment system and a URL shortener (ID generation, hot keys).' },
      { n: 98, title: 'Review #14: cumulative exam', review: true, work: '🔁 The big exam.' },
      { n: 99, title: 'Capstone polish', milestone: true, work: 'Architecture doc, ADR index, README, diagrams, demo video, perf and security reports.' },
      { n: 100, title: 'Final mock interview', milestone: true, work: '🏁 Project deep dive + system design. Retro. Post-100 roadmap. 📝 **Blog #6**.' },
    ],
  },
];

export const allSessions = phases.flatMap((p) => p.sessions.map((s) => ({ ...s, phase: p.id })));

/** Minimal, safe inline formatter: escapes HTML, then `code` and **bold**. */
export function inline(text: string): string {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
}
