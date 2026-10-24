# Curriculum Package Adapter Validation

Generated from the package at `local-research/TechSkillHUB_DeepSeek_IDE_Starter_Pack/research_package/TechSkillHUB_Curriculum_Research_Deliverables`.

- Package hash: `ec2ff32e9f7c805cc9c6db1972426fdbe412a31ec3487ace1993867ae3cf6266`
- Validation status: **validated_needs_human_review**
- Human review: **pending**; premium approval: **no**

## Counts

| Item | Count |
|---|---:|
| Canonical tracks | 32 |
| Canonical stages | 186 |
| Stage specs | 186 |
| Quiz rows | 930 |
| Mastery records | 186 |
| Phase projects | 125 |
| Synthetic mastery contracts (not projects) | 66 |
| Resource candidates | 610 |
| Resource-map rows | 584 |
| Verification-log rows | 1021 |
| Open issues | 268 |
| Pilot stages | 20 |
| Pilot project overrides | 16 |

## Findings

- No structural findings.

## Resource gate

- Blocked package primaries: 39
- Provisional package primaries: 103
- Freshly verified package primaries: 44
- Stages with a selected, freshly checked resource: 141
- Selected package primary: 44
- Selected verified alternative: 97

Verified means the exact URL passed a fresh public destination, content,
free-access and objective-overlap check. It is not human approval and does not
claim video playback or interactive completion. A stage may use a verified
alternative while its package primary remains blocked or provisional. Product Management stages 5-7 resolve through verified alternatives while their package primaries remain blocked; stage 8 remains unresolved because the portfolio article does not cover interview preparation. Unresolved stages stay optional-only and are not premium-ready.

## Quiz field mapping

| Source | Target | Transformation |
|---|---|---|
| `questionId` | `QuizQuestion.id` | preserved |
| `trackId/stageId` | `canonical track/stage` | validated against lib/tracks.ts |
| `question` | `QuizQuestion.question` | preserved |
| `options` | `QuizQuestion.options` | preserved |
| `correctIndex` | `QuizQuestion.correctIndex` | server-only; never serialized before submission |
| `answerRationale` | `QuizQuestion.explanation` | server-only until feedback policy allows release |
| `feedbackOnIncorrect` | `QuizQuestion.feedbackOnIncorrect` | preserved as remediation metadata; not returned on a failed attempt |
| `points` | `QuizQuestion.points` | preserved; stage total must be 100 |
| `critical` | `QuizQuestion.critical` | preserved; a missed critical question fails the attempt |
| `learningObjectiveId/learningObjective` | `QuizQuestion.objective` | preserved for audit/remediation |
| `difficulty/difficultyRationale` | `QuizQuestion.difficulty` | difficulty preserved; rationale retained in staging provenance |
| `correctAnswer` | `validation only` | checked against options[correctIndex]; not a runtime field |
| `distractorMisconception/distractorAnalysis` | `staging provenance` | preserved in validation report; not exposed before submission |
| `rationaleSourceKeys` | `QuizQuestion.provenance` | preserved |
| `assessmentSourceStatus` | `QuizQuestion.reviewStatus` | needshuman_review |
| `type` | `validation only` | must be mcq |

## Stage/mastery field mapping

| Source | Target | Transformation |
|---|---|---|
| `currentObjective` | `StageLearningPlan.objective / pilot objective` | preserved |
| `targetOutcomes` | `success criteria` | preserved |
| `prerequisites` | `stage prerequisites` | preserved |
| `topics` | `stage topics` | preserved |
| `misconceptions/commonMistakes` | `commonMistakes` | preserved |
| `authoredInstruction.lessonOutline` | `staging only` | not imported: outline, not complete lesson prose |
| `authoredInstruction.workedExample` | `concept worked example` | preserved as an additional example |
| `practice` | `StageLearningPlan.exercise` | preserved when the existing authored exercise does not already cover it |
| `aiMastery` | `section/project contract criteria` | preserved as objective-anchored criteria |
| `phaseProjectRef/phaseProjectChanges` | `staging provenance` | project mapping resolved from canonical project registry |
| `readiness/humanReviewItems` | `review ledger` | preserved; never treated as approval |

## Project field mapping

| Source | Target | Transformation |
|---|---|---|
| `brief` | `ProjectBrief` | preserved/merged |
| `acceptanceCriteria` | `contract.acceptanceCriteria + rubric` | preserved |
| `effectiveRubric.criterion/weight/mandatory` | `RubricCriterion` | preserved for pilot project overrides |
| `effectiveRubric.scoringGuide` | `staging provenance` | not sent to the model as a separate requirement |
| `criticalGates` | `mandatory criterion/gate note` | preserved as mandatory gate |
| `evaluationRoute.requiredArtifacts.kind` | `ArtifactKind` | mapped explicitly; unknown kinds are rejected |
| `evaluationRoute.optionalArtifacts` | `optionalArtifacts` | mapped explicitly |
| `deliverables` | `writtenExplanation prompts/artifact labels` | preserved in labels |
| `rubricVersion` | `provenance only` | runtime hash remains authoritative |

## Resource field mapping

| Source | Target | Transformation |
|---|---|---|
| `url/title/publisher/type` | `staging resource metadata` | preserved in validation report |
| `current_role/new_selected_role/decision` | `disposition` | package-primary status; archive evidence never promotes itself to required |
| `free_access_status/account_requirement` | `review evidence` | archive-era only; current access is a separate fresh check |
| `verification_level/archive_http_status` | `review evidence` | not current verification |
| `exact_portion/duration/segment` | `staging provenance` | not a verified playback/required segment; fresh content evidence is recorded separately |
