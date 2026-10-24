# Authentication

## Current setup

Authentication is implemented with NextAuth/Auth.js using the Prisma adapter and Google as the configured OAuth provider.

The main configuration lives in auth.ts.

## Sign-in flow

1. The learner opens the login page.
2. The application sends the user through Google OAuth.
3. NextAuth validates the OAuth callback.
4. Prisma persists or retrieves the user and provider account.
5. Application subscription state is initialised when a user first signs in.
6. A JWT-backed session is made available to the application.

## Session behaviour

The application currently uses a JWT session strategy.

The session exposes the user's application id and a derived subscription flag. Treat this flag as convenience information for the UI, not as an independent payment authority. Server-side access checks should use authoritative application data.

## Protected areas

middleware.ts checks authentication for selected learner areas. Route-level code should still enforce the appropriate authorisation rules for sensitive operations.

A user being signed in does not automatically mean that the user owns every track or has an active paid entitlement.

## Google OAuth configuration

The Google provider reads:

- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET

These values belong in environment configuration. Never commit them.

The redirect configuration in the Google Cloud project must match the deployed application.

## Account creation side effects

During sign-in, the application creates a Subscription record with NONE status when one does not already exist for the user.

This behaviour is application-specific and should be preserved when changing authentication callbacks.

## Changing authentication

Before changing auth.ts or middleware.ts, check:

- login and logout behaviour
- existing users
- session persistence
- callback URLs
- protected routes
- subscription/session state
- OAuth configuration

Run the full validation suite after authentication changes.

## Security rules

Never:

- put secrets in client-side code
- trust a client-provided user id for authorisation
- treat a session flag as proof of payment
- log OAuth secrets or tokens
- copy production OAuth credentials into documentation
