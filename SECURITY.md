# Security Policy

## Reporting a vulnerability

Please do not report security vulnerabilities through public GitHub issues or discussions.

Use GitHub's private security advisory flow for this repository when available. Include enough information to reproduce the issue, the affected component or route, and the potential impact.

Please allow reasonable time for the issue to be investigated and fixed before making details public.

## What to report

Examples include authentication bypasses, authorization/access-control flaws, exposed secrets, payment or entitlement vulnerabilities, data leakage, injection vulnerabilities, and other issues that could compromise users or the application.

## Secrets

Never commit API keys, database credentials, authentication secrets, payment keys, private tokens, or production environment files. Local configuration belongs in `.env.local` or another ignored environment file.

## Scope

This policy covers the TechSkillHub source code and infrastructure configuration contained in this repository. Third-party services and resources linked from the application may have separate security and reporting policies.
