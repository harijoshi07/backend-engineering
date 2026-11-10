---
title: Reference library
description: Books, courses, blogs, codebases, and primary sources.
---

We read **specific sections** when they're needed, never whole books up front. Each session's notes list the exact pages.

## Books
| Book | Phase | Why |
|---|---|---|
| *Designing Data-Intensive Applications*, Kleppmann | 2, 6, 8 | The single most important backend book |
| *High Performance Browser Networking*, Grigorik (free online) | 1 | TCP/TLS/HTTP from first principles |
| *Computer Networking: A Top-Down Approach*, Kurose & Ross | 1 (selected) | Networking fundamentals |
| *Use The Index, Luke!*, Winand (free online) | 2 | Indexing |
| *PostgreSQL 14 Internals*, Rogov (free PDF) | 2 | MVCC, WAL, locks |
| *Spring Start Here* & *Spring Security in Action*, Spilcă | 3, 4 | The clearest Spring books |
| *Kotlin in Action*, 2nd ed. | All | Idiomatic Kotlin |
| *Unit Testing Principles, Practices, and Patterns*, Khorikov | 3 | What and how to test |
| *Release It!*, Nygard | 7 | Stability patterns |
| *Understanding Distributed Systems*, Vitillo | 8 | Concise distributed systems |
| *Site Reliability Engineering*, Google (free online) | 7 | SLOs, incidents |
| *System Design Interview* 1 & 2, Alex Xu | 8 | Interview framing |
| *Zero To Production In Rust*, Palmieri | Inspiration | How to build a real backend properly |
| *Let's Go Further*, Alex Edwards (Go) | Inspiration | Clean, framework-light API design |

## Video
- **Sriniously, *Backend from First Principles*** ([notes](https://backend-from-first-principle.vercel.app/)), the companion series
- **Hussein Nasser**: *Fundamentals of Backend Engineering*, *Fundamentals of Database Engineering*
- **CMU 15-445 Database Systems** (Andy Pavlo)
- **Martin Kleppmann**: Cambridge *Distributed Systems* lectures
- **MIT 6.5840 Distributed Systems** (selected, for Raft)
- **Spring**: spring.io guides, Spring Academy, Josh Long (*Spring Tips*), Dan Vega, Marco Behler, Sébastien Deleuze (Kotlin + Spring)
- **System design**: ByteByteGo, Arpit Bhayani, Hello Interview
- **Julia Evans** zines (DNS, HTTP, networking)

## Fintech reading
- Brandur Leach: *Implementing Stripe-like Idempotency Keys in Postgres*, *Transactionally Staged Job Drains*
- Stripe engineering blog: idempotency, online migrations at scale
- Modern Treasury: *Accounting for Developers*
- Square: *Books*, an immutable double-entry accounting database
- TigerBeetle docs: debits/credits, two-phase transfers
- Martin Kleppmann: *How to do distributed locking*

## Codebases (any language)
| Repo | Lang | Study |
|---|---|---|
| Apache Fineract | Java/Spring | Open-source core banking domain |
| Formance Ledger, Blnk | Go | Ledger design |
| TigerBeetle | Zig | Financial transactions database |
| Hyperswitch (Juspay) | Rust | Payment orchestration, idempotency |
| Kill Bill | Java | Billing & payments |
| ddd-by-examples/library | Java/Spring | DDD + modular structure |
| Spring Modulith examples, spring-petclinic-kotlin | Kotlin/Java | Idiomatic Spring |
| Ardan Labs `service` | Go | Production service layout |
| Keycloak | Java | Auth server internals |

## Primary sources
Spring Boot / Framework / Security / Data reference docs · Kotlin docs · PostgreSQL docs · Redis, Kafka, OpenTelemetry docs · RFC 9110 (HTTP), 9457 (Problem Details), 6749 & 7636 (OAuth2, PKCE), 7519 (JWT), 6238 (TOTP) · OWASP API Security Top 10 & ASVS
