# Weak spots (spaced-repetition queue)

| Concept | First missed | Review at | Notes |
|---|---|---|---|
| ACID vs duplicate intent | S0 | S1, S3 | Atomicity protects one transaction; it can't detect two transactions with the same intent. |
| Idempotency key lifecycle | S0 | S1, S3, S7 | One key per *intent*, created when the user confirms, persisted, reused on every retry. |
| Replay vs 409/422 | S0 | S1, S3, S7 | Completed → replay original response; in-flight → 409; same key + different body → 422. |
