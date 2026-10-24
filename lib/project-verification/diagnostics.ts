/**
 * Machine-readable submission/assessment outcomes.
 *
 * The frontend renders a distinct heading and action per code, so it never has
 * to guess from free text. Codes are stable; learner-facing text lives in the
 * API response (`reason`) and the UI.
 */

export type SubmissionCode =
  // Submission validation failures
  | 'missing_artifact'
  | 'invalid_project_url'
  | 'explanation_too_short'
  | 'secret_detected'
  // Artifact access / content failures (evidence was retrieved or attempted)
  | 'repository_inaccessible'
  | 'artifact_empty'
  | 'artifact_unrelated'
  | 'artifact_unavailable'
  | 'limited_inspection'
  | 'evidence_insufficient'
  // Provider / infrastructure failures (no valid evaluation occurred)
  | 'assessment_invalid_response'
  | 'assessment_service_unavailable'
  | 'assessment_rate_limited'
  | 'assessment_timeout'
  | 'assessment_not_configured'
  // Completed assessment outcomes
  | 'changes_required'
  | 'passed'

export type SubmissionStatusForCode = 'invalid' | 'incomplete' | 'unable_to_verify' | 'changes_required' | 'passed' | 'service_unavailable'

/** True for codes that mean no valid evaluation happened (never a project failure). */
export function isServiceFailureCode(code: SubmissionCode): boolean {
  return (
    code === 'assessment_invalid_response' ||
    code === 'assessment_service_unavailable' ||
    code === 'assessment_rate_limited' ||
    code === 'assessment_timeout' ||
    code === 'assessment_not_configured'
  )
}

/** A short, safe help-center id to attach to a code when no better one is available. */
export const CODE_HELP_GUIDE: Partial<Record<SubmissionCode, string>> = {
  invalid_project_url: 'write-a-project-description',
  missing_artifact: 'prepare-a-portfolio-project',
  explanation_too_short: 'write-a-project-description',
  secret_detected: 'protect-api-keys-and-personal-data',
  repository_inaccessible: 'check-a-github-repository-is-public',
  artifact_empty: 'organise-files-and-write-a-readme',
  artifact_unrelated: 'write-a-project-description',
  artifact_unavailable: 'publish-and-share-a-live-frontend-project',
  evidence_insufficient: 'share-a-document-deliverable',
}
