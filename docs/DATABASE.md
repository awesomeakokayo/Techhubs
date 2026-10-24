# Database

## Database engine

The application uses PostgreSQL through Prisma.

The Prisma datasource is defined in prisma/schema.prisma and reads DATABASE_URL from the environment.

## Main data domains

| Model | Purpose |
| --- | --- |
| User | Core learner/account record |
| Account | OAuth provider account data used by NextAuth |
| Session | Authentication session data |
| VerificationToken | Authentication verification tokens |
| Subscription | Subscription state associated with a user |
| UserProgress | Item-level learning progress |
| UserTrackProgress | Track-level progress data stored as JSON |
| GuidedPathEnrollment | Guided learning state and current step |
| TrackAccess | Paid or grandfathered access to a track |
| PaymentOrder | Internal record of a checkout attempt/order |
| CourseCompletion | Track completion record |

## Important relationships

- A User can have many progress records, track-progress records, guided-path enrollments, access grants, and payment orders.
- A User has at most one Subscription.
- A User can have many OAuth Account records.
- A User can have many authentication Sessions.
- Access is unique per user + track.
- Track completion is unique per user + track.
- PaymentOrder.reference is globally unique and is the key used during Paystack verification.

## Learning progress

UserProgress represents individual learning items and can store an item type, track, optional stage, optional resource, status, and completion time.

UserTrackProgress stores broader per-track state in a JSON column. Code that reads this JSON should remain defensive because the stored shape can evolve over time.

GuidedPathEnrollment stores the current position in a guided path for a user and track.

## Paid access

TrackAccess is the application-level entitlement record. A successful payment ultimately produces or updates this record.

The unique user + track constraint is important because fulfilment can be reached from multiple request paths and must not create duplicate entitlements.

## Payment records

PaymentOrder is the audit trail for checkout and verification. It stores the pricing context, currency, amount, reference, payment status, and verification/risk metadata.

Amounts are stored as integers in provider minor units. Do not introduce floating-point currency calculations into payment logic.

## Schema changes

When changing the schema:

1. understand which application code reads or writes the affected model
2. update Prisma schema
3. use the appropriate migration workflow for the environment
4. regenerate Prisma Client
5. update tests
6. update documentation
7. verify existing data compatibility

Never delete or rename production data fields casually. A schema change can affect historical payments, learner progress, or access entitlements.

## Safe inspection

For local development, use Prisma's tooling against a local/development database rather than inspecting production data casually.

Useful command:

~~~bash
npx prisma generate
~~~

Do not paste production database connection strings into issues, documentation, pull requests, or chat.
