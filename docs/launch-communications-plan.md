# TechSkillHUB — Launch Communications Plan

Status: **draft for approval.** No messages have been or will be sent as part of
this task. Prices, dates and grandfathering are **not approved**; where they
appear below they are placeholders in `[BRACKETS]` and must not be published
until approved.

---

## 1. Current notification reality (confirmed)

- **No in-app announcement system exists.** Grep for announcement/banner components
  finds only the milestone celebration and the legacy-progress import prompt, not a
  platform announcement surface.
  **Update (2026-10 wave):** a dismissible, non-blocking in-app announcement now
  exists (`components/commercial/CommercialAnnouncement.tsx`, gated by
  `COMMERCE_ANNOUNCEMENT`), plus a premium notice on selected track pages and a
  `/pricing` FAQ + `docs/commercial-faq.md`. It makes no price or date claims.
- **No learner email sender exists.** `NotificationPreference` and
  `NotificationLog` models exist in the schema, but `NotificationLog` is never
  written and no code sends mail to learners. The only mailer is
  `POST /api/contact`, which emails the site owner from the contact form. So this
  plan requires building a small announcement surface before Stage 1 ships.
- The recommended surface is a **dismissible banner / announcement center**
  (server-controlled copy, dismissible per user), never a blocking popup during a
  lesson.

## 2. Principles

1. **No surprise paywalls.** Learners on paths advertised as free must be able to
   finish them.
2. **No action is taken on the learner's behalf.** A subscription starts only when
   the learner deliberately chooses it.
3. **Separate transactional/service mail from promotional mail** (see §5).
4. **No interruption of active study.** Dismissible, non-blocking.
5. **No unapproved specifics.** No public price, date or grandfathering promise
   until signed off.

## 3. Sequence

| Stage | Trigger | Channel | Goal |
| --- | --- | --- | --- |
| 1. Heads-up | Now / on approval | Dismissible in-app banner + announcement center | Explain changes are being prepared; reassure nothing changes yet |
| 2. Advance notice | Once boundaries, price and date are final | In-app banner + announcement + opted-in email | Give specifics and the effective date |
| 3. Launch day | On go-live | In-app + email | Announce Pro and link to Pricing + FAQ |

---

## 4. Draft copy

### Stage 1 — "We're preparing something new" (non-blocking)

**Banner (dismissible):**
> **We're preparing a Pro option — and free learning stays free.**
> Over the coming weeks we'll share how TechSkillHUB will keep a full free
> experience while adding an optional Pro plan that covers the cost of
> AI-assisted project assessment. Nothing changes for you today, and you won't be
> charged unless you choose a plan yourself. [Learn more →]

**Announcement center (expanded):**
> **An update on where TechSkillHUB is going**
>
> To keep TechSkillHub running and free for as many learners as possible, we're
> preparing an optional **Pro** plan. Pro is for learners who want more
> AI-assisted project assessments and extra depth.
>
> What this means for you right now:
> - Your courses, progress and certificates are exactly as they are.
> - Every currently free learning path stays free.
> - No payment will ever start without you choosing it.
>
> We'll share full details — what stays free, what Pro adds, and when it starts —
> before anything changes. Questions or feedback? [Contact us].

### Stage 2 — Advance notice (specifics final only)

> **Your guide to what's changing on [EFFECTIVE DATE]**
>
> Here's the complete picture ahead of [DATE]:
>
> **What stays free**
> - All [N] learning paths and their lessons, practice and knowledge checks.
> - Progress tracking, your weekly plan, and certificates for courses you complete.
> - A monthly allowance of [FREE_ALLOWANCE] AI project assessments.
>
> **What Pro adds** — [PRICE] per [PERIOD]
> - [PRO_ALLOWANCE] AI project assessments per month.
> - [ADVANCED_MATERIAL].
> - [PORTFOLIO_BENEFITS].
>
> **Why we're doing this.** AI-assisted project assessment is the one part of
> TechSkillHUB that costs money every time it runs. Free allowances keep that
> service available to everyone; Pro covers heavier use.
>
> **Your existing progress.** Everything you've completed is preserved. If you
> have already started a path, [GRANDFATHERING_TERMS — approved policy only]. If
> you have not started a course that becomes Pro, you'll see this clearly before
> you begin.
>
> **No automatic charge.** You will not be subscribed or charged unless you
> choose a plan yourself.
>
> Read the full FAQ at [PRICING_URL]. Questions? [CONTACT].

### Stage 3 — Launch day

> **Pro is here — and free learning is unchanged**
>
> Today we've launched an optional **Pro** plan for learners who want more
> AI-assisted project assessments and [ADVANCED_MATERIAL].
>
> - Free stays free: all paths, progress and certificates.
> - Pro: [PRICE], [PRO_ALLOWANCE] assessments/month, [BENEFITS].
> - Nothing is charged unless you choose it.
>
> See pricing and the FAQ: [PRICING_URL]. Feedback: [CONTACT].

---

## 5. Transactional vs promotional

| Type | Examples | Basis | Rules |
| --- | --- | --- | --- |
| **Service/account** | Subscription confirmation, payment failure, cancellation, security notices | Necessary to deliver the service the user signed up for | Send regardless of marketing consent; keep factual; include account/portal links |
| **Product announcements** (Stages 1–3) | "We're preparing Pro", changes to free/Pro | Relationship + consent | Must be non-blocking; email only to users who opted in or where permitted; include unsubscribe |

Existing `NotificationPreference` (email / in-app / reminder window / quiet hours)
should gate **promotional** sends. It must **not** block critical service messages.

## 6. Compliance questions for review

- **Consent & lawful basis** for the announcement emails in the served
  jurisdictions (GDPR/EU, UK, Nigeria NDPR, South Africa POPIA, US CAN-SPAM).
- **Unsubscribe** mechanism and honoring `NotificationPreference.email=false`.
- **Pricing display** rules for each region, including tax/VAT inclusively or
  exclusively, and currency.
- **Refunds/cancellation** wording if a merchant-of-record provider is used.
- **Minors / students**: whether additional consent is required.

## 7. Rollout requirements

- [ ] Build a dismissible in-app announcement surface (does not exist yet).
- [ ] Approve copy and all `[BRACKETS]` values before any send.
- [ ] Implement announcement + marketing-email send path (there is none today).
- [ ] Confirm consent/unsubscribe handling before any email is sent.
- [ ] Do not interrupt active lessons with blocking modals.

## 8. Not done

No emails sent, no announcement published, no learner contacted. This document is
copy preparation only.
