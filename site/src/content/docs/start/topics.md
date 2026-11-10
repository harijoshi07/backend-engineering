---
title: Everything we will touch
description: The full inventory of topics and tools across the 100 sessions.
sidebar:
  order: 2
---

| Area | Topics & tools |
|---|---|
| **OS & Linux** | Processes, threads, memory, file descriptors, signals (SIGTERM/SIGKILL), env vars · shell fluency · `ps`, `lsof`, `ss`, `top`, `journalctl` · systemd · SSH, users, firewall (ufw) |
| **Networking** | IP, TCP vs UDP, ports, sockets, 3-way handshake · DNS · TLS & certificates, mTLS · proxies, reverse proxies, load balancers · `nc`, `curl`, `dig`, `openssl`, Wireshark/tcpdump |
| **HTTP & APIs** | HTTP/1.1 wire format, HTTP/2 & /3 · methods, safety, **idempotency**, status codes, headers · caching (Cache-Control, ETag) · CORS · cookies · REST resource design · PUT vs PATCH · pagination (offset vs cursor) · versioning & evolution · RFC 9457 Problem Details · **OpenAPI** · webhooks (HMAC) · **gRPC + Protobuf** · **WebSockets / SSE** |
| **Serialization & validation** | JSON, Jackson vs kotlinx.serialization, Protobuf, text vs binary · validation at the boundary, transformations, DTO vs domain model |
| **JVM & Kotlin on the server** | JVM memory, GC, JIT basics · threads, executors, **virtual threads**, coroutines on the server · race conditions, locks, atomics · JFR, async-profiler, flame graphs |
| **Spring** | Boot 4 auto-configuration & starters · IoC/DI, bean lifecycle, scopes, profiles · proxies & AOP · `@ConfigurationProperties` · MVC lifecycle, filters, interceptors, `@RestControllerAdvice` · Bean Validation · `JdbcClient`, Spring Data JDBC, JPA/Hibernate · transactions · `RestClient` · Security · Actuator · Modulith · Cache · Kafka · Scheduling + ShedLock · gRPC |
| **Databases** | Why DBs exist (we build a KV store) · LSM vs B-tree · **PostgreSQL**: SQL (joins, CTEs, window functions), schema design, constraints as invariants, indexes, `EXPLAIN ANALYZE`, ACID, **isolation levels & anomalies**, MVCC, row locks, `SKIP LOCKED`, deadlocks, WAL, replication, partitioning, triggers · Flyway, expand/contract · HikariCP, PgBouncer · `pg_stat_statements` |
| **Caching** | Cache layers (client → CDN → HTTP → app → DB) · cache-aside / write-through / write-behind · invalidation, TTLs, stampede · **Redis/Valkey** · distributed locks & fencing tokens |
| **Search** | Why `ILIKE '%x%'` can't use an index · inverted index, BM25, fuzzy matching · **Postgres FTS** vs **Elasticsearch/OpenSearch** |
| **Async & messaging** | Background jobs, retries, backoff + jitter, visibility timeouts, DLQs · **transactional outbox / inbox**, idempotent consumers · **Kafka**: log, partitions, consumer groups, offsets, delivery semantics, retention, schema evolution, CDC · scheduled jobs |
| **Files** | Object storage (S3 API via **MinIO**) · presigned URLs · streaming large files |
| **Security** | Threat modeling (STRIDE-lite) · argon2/bcrypt, salt/pepper · sessions vs tokens, **JWT** · **OAuth 2.0 / OIDC / PKCE**, Keycloak · refresh rotation, device sessions · RBAC/ABAC, **BOLA/BFLA** · OWASP API Top 10 · injection, SSRF, XSS, CSRF · security headers · **rate limiting** · **TOTP 2FA**, MPIN, step-up · secrets, PII encryption · audit logs |
| **Fintech domain** | Money (never `Double`) · **double-entry bookkeeping** · idempotency keys · state machines, holds, reversals, refunds · KYC tiers & limits · fees, commissions, cashback · merchant QR · bill pay / top-up via aggregators · **unknown-state handling** · **reconciliation & settlement** · fraud/velocity checks · statements |
| **Testing** | Test pyramid, test doubles · JUnit 5, MockK, Kotest · **Testcontainers** · WireMock · slice tests · concurrency tests · contract tests · **k6** · flaky tests |
| **Architecture** | Controllers / services / repositories · hexagonal ports & adapters, anti-corruption layers · DDD-lite · **modular monolith** vs microservices · ADRs · 12-factor · config management |
| **Production & DevOps** | **Docker** (namespaces, cgroups, layers, multi-stage, JVM memory) · Compose · **Linux VPS** + Caddy + Let's Encrypt · **GitHub Actions** · **Kubernetes** (k3d) · graceful shutdown · probes · zero-downtime deploys & migrations · feature flags |
| **Observability** | Structured logs, correlation IDs, MDC · Micrometer, RED/USE · **Prometheus + Grafana + Loki** · **OpenTelemetry** (Tempo) · SLIs/SLOs/error budgets · alerting · postmortems |
| **Reliability & performance** | Latency percentiles, Little's Law, tail latency · profiling · N+1 · timeouts, retries, circuit breakers, bulkheads (Resilience4j) · load shedding, backpressure |
| **Distributed systems** | Stateless scaling · read replicas & lag · sharding, consistent hashing · CAP/PACELC, consistency models · 2PC vs **sagas** · clocks & ordering · Raft intuition · system design |
| **Dev tooling** | IntelliJ IDEA · Gradle Kotlin DSL · Git · HTTPie/Bruno · `psql` · detekt/ktlint · OrbStack |

## Pinned stack
Kotlin 2.2+/2.3 · Spring Boot 4.x · JDK 25 · Gradle Kotlin DSL · PostgreSQL 17/18 · Flyway · Redis/Valkey · Kafka (KRaft) · MinIO · Keycloak · JUnit 5 / MockK / Kotest / Testcontainers / WireMock / k6 · Docker (OrbStack) · Caddy · GitHub Actions · k3d · Prometheus / Grafana / Loki / Tempo / OpenTelemetry · Resilience4j
