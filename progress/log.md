# Progress log

| Session | Date | Topic | Recall score | Notes |
|---|---|---|---|---|
| S0 | 2026-11-10 | Prologue: the retry problem | n/a | Plan locked at v1.0. R3.1 ✅ (heuristic fails both ways). R3.2 ❌ said key is made per HTTP attempt; correct is one key per user intent, persisted and reused. R3.3 ❌ said 409; correct is replaying the stored 201 (409 = in-flight, 422 = same key, different body). |
