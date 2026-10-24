# TechSkillHUB: How to use the curriculum research package with DeepSeek in your IDE

## First: which DeepSeek model name?

DeepSeek's current official API documentation says the V4.1 Flash model is served under the API ID `deepseek-flash` (the current documented serving version is DeepSeek-V4.1-Flash-1017). The official DeepSeek/OpenCode integration guide says OpenCode users can run `/connect`, choose the DeepSeek provider, enter their API key, and select the Flash model. If the model already works in your IDE, do not change provider settings just to match a name; the friendly display label can differ from the API ID.

Official references:
- DeepSeek model/API ID: https://api-docs.deepseek.com/quick_start/agent_integrations/
- Official OpenCode setup: https://api-docs.deepseek.com/quick_start/agent_integrations/opencode/
- OpenCode provider/model setup: https://opencode.ai/docs/providers/

Keep API keys in the IDE's secure credential manager. Never paste keys into the curriculum prompt, source files or generated reports.

## What is in the research package?

The input bundle contains 32 tracks and 186 stages, 610 candidate comparisons, a stage-learning specification, 930 draft MCQs, 186 mastery/practice records, 125 phase/capstone project records, resource disposition/evidence logs, 268 open issues and QA reports.

Interpret its statuses correctly:
- The candidate/resource-map file is not an approved-resource list. The choices are provisional.
- 143 stages have only provisional archived-screen candidates; 43 are blocked from that screen.
- The research checkpoint reports 0/186 stage primaries fully live-reverified in that resumed batch and 0 playback/interaction (L4) verification.
- Five questions per stage and 100 points per quiz are mechanical checks, not proof of correctness.
- The 125 phase projects do not include 66 synthetic section-mastery contracts as additional phase projects.
- No track has human sign-off or premium approval.

## Step 1 — Open the correct repository

Open `C:\Tech Skill Hub` in your IDE/OpenCode. Do not open the research ZIP as if it were the application repository. The existing project has a large uncommitted worktree; preserve it.

## Step 2 — Extract the starter pack locally

Save `TechSkillHUB_DeepSeek_IDE_Starter_Pack.zip` to your Downloads folder. In PowerShell, adjust `$repo` and `$zip` if needed:

```powershell
$repo = 'C:\Tech Skill Hub'
$zip = Join-Path $env:USERPROFILE 'Downloads\TechSkillHUB_DeepSeek_IDE_Starter_Pack.zip'
$dest = Join-Path $repo 'local-research\TechSkillHUB-2026-10-21'
if (-not (Test-Path $repo)) { throw "Repository not found: $repo" }
if (-not (Test-Path $zip)) { throw "ZIP not found: $zip" }
Get-FileHash -LiteralPath $zip -Algorithm SHA256
Expand-Archive -LiteralPath $zip -DestinationPath $dest -Force
Get-ChildItem -LiteralPath $dest -Recurse -File | Measure-Object

# Optional but recommended: ignore only this local research-input directory
# in this clone, without changing the tracked .gitignore.
$exclude = (git -C $repo rev-parse --git-path info/exclude).Trim()
if (-not [IO.Path]::IsPathRooted($exclude)) { $exclude = Join-Path $repo $exclude }
$excludeDir = Split-Path $exclude
if (-not (Test-Path $excludeDir)) { New-Item -ItemType Directory -Path $excludeDir -Force | Out-Null }
if (-not (Test-Path $exclude)) { New-Item -ItemType File -Path $exclude -Force | Out-Null }
$existing = Get-Content -LiteralPath $exclude -ErrorAction SilentlyContinue
if ($existing -notcontains '/local-research/') {
  Add-Content -LiteralPath $exclude -Value "`n# Local-only TechSkillHUB research package`n/local-research/"
}
git -C $repo status --short --untracked-files=normal
```

The extracted directory contains the prompts and the research input files. The extracted research files are local inputs, not application source files. Keep them out of commits. Optionally add `/local-research/` to `.git/info/exclude` (the local Git exclude file, not the tracked `.gitignore`) after inspecting the repository layout. Do not run `git clean` to manage these files.

## Step 3 — run read-only preflight first

Open `01_PREFLIGHT_PROMPT.md` from the extracted starter pack and paste its full contents into the IDE agent chat. The agent must inspect actual app types and data sources and create the preflight report without editing app source.

Read `docs/curriculum-import-preflight.md` and JSON before implementation. Check that it identifies the real target files for curriculum, quizzes, answer-key protection, resources, AI mastery, projects and progress compatibility. If the mapping is vague, ask for exact target files and schema field mapping before proceeding.

## Step 4 — run the implementation prompt

Only after reviewing preflight, open `02_IMPLEMENTATION_MASTER_PROMPT.md` and paste it to the IDE agent. Keep the agent in the `C:\Tech Skill Hub` repository root.

The prompt starts with a 20-stage pilot covering four disciplines:
- Frontend: 5 stages.
- UI/UX: 5 stages.
- AI Foundations: 6 stages.
- Cybersecurity: 4 stages.

It requires real test execution before continuing into bounded remaining batches. The pilot is deliberate: it checks programming, design, AI and security formats before the same import approach is applied to every other course. If it exposes a schema mismatch or critical failing test, fix that first rather than making 186-stage changes blindly.

## Step 5 — use the progress ledger

Have the IDE agent keep a durable ledger for every batch: tracks/stages attempted, files changed, current resource evidence, tests run, failures, blockers and the next batch. Do not let it re-read the entire 15 MB package into the conversation. Ask it to process records directly from the JSON/CSV files by track and stable IDs.

After each batch, inspect the diff and test summary. Verify that source answer keys remain server-side and project formats match the discipline. Do not allow resource candidates to become required unless exact content and free-access status are supported. A web-search snippet or archived HTTP 200 is not current access verification.

## Step 6 — final validation

Before considering the code work done, require actual results for unit tests, TypeScript, lint, Prisma validation/schema drift if applicable, disposable PostgreSQL integration/concurrency tests, Playwright E2E and production build. Test both new and returning learners. Require a track-by-track list of unresolved resource, quiz, rubric or schema issues.

## Never allow the agent to do these things

- Commit, push, deploy or reset the dirty working tree.
- Use production/shared databases or execute production migrations.
- Turn on `COMMERCE_CHECKOUT_ENABLED`, `COMMERCE_ENTITLEMENTS_ENFORCED` or `COMMERCE_PRICES_APPROVED`.
- Claim any resource is live-verified or played when it was not actually checked.
- Expose quiz answers or rationales in client bundles or pre-answer API responses.
- Force GitHub evidence for non-code projects.
- Fabricate human approval or mark all tracks premium-approved.
- Add mascot assets or animation during this workstream.

## Practical tip for model context

Do not paste all 930 questions, all 610 candidates or the 8 MB stage specification into the chat. Keep these files on disk. Prompt the coding agent to read one track/batch at a time through scripts and reference stable IDs. Use the persistent ledger so a session can resume without repeating earlier work.
