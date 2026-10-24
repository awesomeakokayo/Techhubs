# Documentation Rules

## Purpose

Documentation is part of the product's maintenance surface. It should make future work easier, not merely describe what happened in the past.

## What must be documented

Update documentation when a change affects any of the following:

- how another developer runs the project
- where a feature lives
- data models or persistence
- authentication or authorisation
- payments or access control
- external services
- environment configuration
- deployment procedure
- operational troubleshooting
- curriculum structure or content-maintenance workflow

## Where documentation belongs

Prefer the narrowest relevant document:

- system-wide structure → ARCHITECTURE.md
- local development → DEVELOPMENT.md
- environment/configuration → ENVIRONMENT.md
- data → DATABASE.md
- authentication → AUTHENTICATION.md
- payments → PAYMENTS.md
- curriculum → CONTENT.md
- deployment → DEPLOYMENT.md
- incidents/troubleshooting → OPERATIONS.md

Create a new document only when the topic has enough independent material to justify one.

## Never document secrets

Documentation may identify that a credential exists and explain how it is obtained, but it must not store its value.

This applies to:

- API keys
- passwords
- OAuth client secrets
- database URLs containing credentials
- signing secrets
- private tokens
- production environment files

## Keep documentation tied to code

When a function, file, route, or model is renamed, search the docs for the old name and update references in the same change.

When a business rule moves, update the document that says where the rule lives.

## Historical records

Historical implementation notes and audits are valuable. Keep them, but label them as historical when they no longer describe current behaviour.

Do not let a historical document masquerade as the current implementation guide.

## Change records

For substantial architectural or product decisions, record:

- the decision
- the reason
- important alternatives considered
- consequences or trade-offs

A small decision can be recorded in the pull request when a permanent document would add unnecessary overhead.

## Documentation quality standard

A useful document answers the question a future developer is most likely to ask next.

Avoid filler. Prefer concrete file paths, commands, flows, constraints, and examples that can be verified against the repository.

## Review checklist

Before merging a substantial change, ask:

- Does the README still describe the project correctly?
- Can a new developer still start the project from the documented steps?
- Does every changed external integration have current setup notes?
- Are the important business rules still discoverable?
- Did any documentation accidentally include a secret or sensitive production value?
