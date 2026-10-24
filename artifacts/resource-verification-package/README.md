# TechSkillHub — external resource-verification package

Generated: 2026-10-20T17:11:49.852Z
Source commit: `8c1a1154a45c735c3d418b2fa9b8cc7d385a6641` (branch `feat/retention-v3`)
Package: `techskillhub-resource-verification`

This package is a **read-only export** of the current catalogue, mapped learning
resources, verification evidence, learning material and audit results. It is
prepared for **independent** review. It contains **no approvals** and **no
learner records**. Every track remains awaiting human sign-off.

## Headline counts

| Item | Count |
| --- | ---: |
| Tracks | **32** |
| Stages | **186** |
| Mapped resource entries | **398** |
| Unique canonical URLs | **326** |
| Probed URLs | **326** |
| Probe-reachable URLs | **322** |
| Probe content-inspected URLs | **242** |
| Currently unresolved URLs | **4** |
| Projects (with brief + contract) | **191** |
| Knowledge-check questions | **638** |

## Verification-level definitions

| Level | Meaning | Evidence required | Entries at this level |
| ---: | --- | --- | ---: |
| 0 | No evidence | — | 0 |
| 1 | URL discovered | a URL exists; destination unverified | 0 |
| 2 | Destination + identity verified | HTTP reachable and the right page — a title/HTTP 200 is not enough | 104 |
| 3 | Content verified | the actual main content was extracted and compared with the objective (contentEvidence) | 294 |
| 4 | Playback/interaction verified | the video/interactive experience was actually used | 0 |

**Level 4 is 0.** No video or interactive resource was actually played in this
environment. No transcript, runtime or playback claim is made for any resource.
HTTP 200 and a page title prove only that the destination resolved to the right
page — **they are not content verification** and never approval.

## Package structure

```
resource-verification-package/
  README.md                     this file
  MANIFEST.json                 every file with bytes + sha256
  integrity.json                reconciliation and integrity checks
  resources.json                complete mapped-resource inventory (machine-readable)
  resources.csv                 the same inventory for sorting/filtering
  learning-material.json        186 stage records: instruction, examples,
                                knowledge checks + answer keys, rubrics, projects
  learning-material/             the same material, one Markdown file per track
  verification/
    resource-probe.json         raw probe evidence (status, final URL, excerpt, hash)
    current-unresolved-resources.json   derived: status not 2xx, with mapped entries
    probe-vs-report-delta.json  explains the report/probe timestamp difference
  audit/
    curriculum-quality-report.json
    curriculum-quality-audit.md
    curriculum-stage-evidence.md
    reviewer-packets-index.json
    project-coverage.json       derived project/contract/evidence coverage
  reviewer-packets/             the 32 human-review packets + index
  tools/generate.mjs            reproducible exporter (read-only on the repo)
```

## Known limitations (read before judging)

- **Playback is unverified** for every video; level 4 is 0.
- **Level-2 resources** are reachable and correctly identified but their content
  could not be extracted (video/JS shell). 104 entries are level 2;
  104 of them are required.
- **Unresolved URLs** (current probe): `https://tryhackme.com/paths` [429], `https://www.canva.com/design-school/courses` [403], `https://www.canva.com/designschool` [403], `https://www.pexels.com` [403].
  These are supplementary/bot-blocked pages; every stage still has at least one
  content-inspected required resource. See `verification/current-unresolved-resources.json`.
- The **curriculum-quality report predates the latest probe re-run**. Its
  `gapReconciliation.unresolvedUrls` is stale; `verification/probe-vs-report-delta.json`
  records exactly which URLs changed. The probe is the current evidence.
- URL sets reconcile only after **trailing-slash normalisation** (67 probe keys
  differ from the mapped URL by a trailing slash). No URL was dropped.
- Ownership, licensing and long-term availability of third-party resources are
  not asserted. Excerpts are short and recorded solely as verification evidence.

## Integrity

`integrity.json` records: 32 tracks / 186 stages, every stage represented, every
mapping pointing to a real track/stage, 398 entries reconciling with
the report, 326 unique URLs reconciling with the probe, no
duplicate entry ids, and a clean secret/PII scan. Archive readability is verified
after zipping (see the adjacent `.sha256` file).

## What this package does *not* prove

It does not approve any track, does not certify factual accuracy, pedagogy,
accessibility, licence fitness or playback, and does not replace an independent
human reviewer. It is evidence for that reviewer, not a substitute for them.
