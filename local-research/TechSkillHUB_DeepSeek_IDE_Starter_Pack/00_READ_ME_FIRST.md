# TechSkillHUB DeepSeek IDE Starter Pack

## What this pack is

This pack contains the 19-file curriculum research deliverables package, its original ZIP for provenance, a preflight-only prompt, a staged implementation prompt, and a short operator guide. Use it with the local TechSkillHUB repository, not as a replacement repository.

## Important status

These are implementation proposals and research drafts, not approved production curriculum. The source package says:

- 32 tracks and 186 stages.
- 930 draft quiz questions, five per stage, totalling 100 points per stage.
- 186 stage mastery/practice records.
- 125 normalized phase projects; 66 synthetic section-mastery contracts are not additional phase projects.
- 610 candidate comparison rows.
- 143 provisional archive-screen candidate stages and 43 stages blocked by that archive-only screen.
- 0/186 stages fully reverified live in the resumed research checkpoint; 0 playback verifications (L4); 0 human-approved courses.
- QA: 29 PASS, 3 WARN, 0 FAIL. WARN items are real live-resource, SME and current-free-access blockers.

The file `04_APPROVED_RESOURCE_MAP.csv` is misleadingly named for workflow convenience. Its resource decisions are **provisional**. Do not treat it as authority to publish or require a resource.

## Recommended order

1. Extract this pack into the repository's **local-research** directory as described in `TechSkillHUB_DeepSeek_IDE_Guide.docx`.
2. Run `01_PREFLIGHT_PROMPT.md` first. It is read-only; no application changes yet.
3. Review the preflight report for schema mismatches and dangerous assumptions.
4. Then run `02_IMPLEMENTATION_MASTER_PROMPT.md`. It implements in batches, pilots a mix of disciplines, tests, then continues only where validation passes.
5. Review the final report and remaining blockers. Do not deploy or activate commercial gates.

## Model name

If using the official DeepSeek API provider in OpenCode, the current API model ID documented by DeepSeek is `deepseek-flash`, served by DeepSeek-V4.1-Flash-1017. The OpenCode UI may show a friendlier model label. Do not change a working provider configuration just to match this wording. Official references are in the guide.
