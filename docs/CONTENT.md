# Content System

## Where learning content lives

The learning experience is driven largely by structured TypeScript content in lib/ rather than a separate CMS.

Important files include:

- lib/tracks.ts — tracks, stages, lessons/resources, and related learning metadata
- lib/roadmaps.ts — roadmap and career-path definitions
- lib/guided-path.ts — sequencing and guided-path behaviour
- lib/quiz-data.ts — generated/structured quiz data
- lib/site-content.ts — supporting public educational content
- lib/seo/ — search-intent and SEO content logic

Because these files can be large, changes should be targeted. Do not reformat an entire content file just to change one resource.

## Content hierarchy

Conceptually, the learner experience follows:

~~~text
Track
  |
  +--> Stage(s)
         |
         +--> Learning items/resources
         |
         +--> Practice / projects
         |
         +--> Assessment
         |
         +--> Completion / certificate
~~~

The exact data structure is defined by the current TypeScript types and should be checked before adding new fields.

## Adding or changing a resource

When adding a resource:

1. Confirm the URL works.
2. Confirm the resource teaches what the surrounding stage says it teaches.
3. Prefer first-party or authoritative material where practical.
4. Avoid duplicate resources that do the same job without a learner benefit.
5. Keep titles and descriptions clear for beginners.
6. Run the resource/content validation scripts.
7. Update any related audit or documentation record if the change is significant.

## Content quality

TechSkillHub is intended to help learners move from learning to practical ability. A resource should therefore have a reason to exist in the sequence.

For important curriculum changes, check:

- prerequisite order
- practical outcome
- beginner accessibility
- source quality
- duplication
- assessment alignment
- whether the project can actually be completed with the listed knowledge

## AI-related content

AI learning material should explain both capability and limitations. Avoid presenting AI output as inherently correct.

When AI-generated resources or structure are introduced, a human should verify the final material before merging.

## Generated quiz data

generate-quiz-data.mjs produces quiz data from source inputs. Treat generated output as derived data.

If changing the generation process, understand which source file is authoritative and regenerate output consistently rather than editing generated content manually without documenting why.

## Validation tools

Useful repository scripts include:

~~~bash
node scripts/content-health.mjs
node scripts/seo-audit.mjs
python scripts/verify-resources.py
~~~

Check each script before running it in production-like environments because some validation utilities are intended for local maintenance.

## Content versus code

Curriculum changes are product changes. A seemingly small resource edit can alter a learner's path, expected skill level, or assessment readiness.

For that reason, content pull requests should explain the learner-facing reason for the change, not only the file that changed.
