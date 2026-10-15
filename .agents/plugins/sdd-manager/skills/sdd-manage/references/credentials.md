# Hosting credentials and shell recovery

**sdd-manage** owns accepting, discovering, saving, and supplying tokens and recovering shell authentication. Apply **sdd-conventions**' **Hosting tokens** rules. **sdd-forge** and its active backend own provider-specific access requirements; implementation/steering and coordinated persistence retain their Git push ownership. Ordinary local work requires no hosting token.

## Existing authentication first

Assume the shell is authenticated and attempt the authorized push to its established destination. Do not search for tokens, probe authentication, or request a credential before every push. An API operation may likewise use its available authenticated client; Git transport success does not establish API access.

On a 403 or another explicit missing/invalid-credential failure, receive sanitized provider/repository, destination or endpoint, attempted operation, client/transport, and indicated cause. Classify rate limits, policy restrictions, and transport failures before choosing a remedy. Credential recovery must not bypass implementation's outstanding-push prerequisite or change its destination.

## Find, request, and save

1. Resolve the eligible repository root and active backend. Prefer its conventional file beside the root `.gitignore`: `gh.tkn` for GitHub. Check other suitable `*.tkn` candidates only within this repository, excluding nested Git worktrees and unrelated repositories. Resolve ambiguous suitability rather than guessing; file presence does not prove identity or access.
2. Ensure `*.tkn` is in the root `.gitignore`, preserving existing rules. Create it if missing. Check effective exclusion and untracked status for the selected path before reading for reuse or saving. Correct a conflicting ignore rule within the authorized credential scope; already tracked credentials require explicit remediation. Preserve unrelated staging and work; persist only owned ignore-rule changes through the ordinary scoped commit/push workflow.
3. If a suitable token exists, use it for the affected client's authentication. If none exists or the selected token is unsuitable, ask the user for a suitable replacement, identifying the target repository, operation, and backend-required permission profile. Prefer fine-grained repository-scoped tokens when available; the GitHub profile is defined by its backend.
4. Save the accepted credential in the selected conventional file beside `.gitignore`, after the exclusion checks. Restrict file access using supported permissions or ACLs. Replace only the selected credential when the provided token is intended as its replacement; preserve unrelated files. Do not record its value in ordinary project files, handoffs, evidence, diagnostics, history, arguments, or URLs.

If storage, effective Git exclusion, or supported protected credential transfer is unavailable, report the concrete blocker and retained operation state. Do not claim persistence/authentication happened or silently select another repository. The ignored token file is durable credential input; an external helper may hold a session copy but is not the required source of continuity.

## Authenticate and resume

- **Git shell:** Use an available credential helper, secure process input, or another supported credential facility for the relevant host/repository. For HTTPS Git, feed username/password fields through protected process input to the helper; never embed the token in a command argument or remote URL. Scope the helper appropriately for the repository and existing configuration. HTTPS tokens do not authenticate an SSH transport; preserve the established transport/destination and report a required transport decision rather than rewriting it implicitly.
- **API client:** Supply a suitable token to the selected backend using its supported protected mechanism, separately from normal handoff text. Do not assume a connector supports token replacement or that Git authentication updates it; report an unsupported client mechanism precisely.
- **Retry:** Retry the affected authorized operation after recovery and confirm its actual result. Use the project's bound or at most three recovery retries; stop on repeated unchanged denial or a restriction requiring a different remedy. A replacement token proves no permission until the operation succeeds.
- **Publication:** The push owner verifies remote containment before further dependent work. Preserve local commits and report pending publication if recovery fails. Authentication does not authorize new operations, another destination, force-pushing, or repository-policy bypass.

A direct **sdd-forge** caller may supply a token without a manager handoff. Follow the same convention when persistence is requested; otherwise consume it transiently through the protected client mechanism. Coordinate durable storage with sdd-manage rather than implying a directly supplied token was saved.

## Non-credential failures

Do not request replacement credentials for rate limits, outages, invalid input, or policy restrictions a token cannot remedy. Use provider timing and bounded retry guidance, preserving successful independent results and pending/unknown effects. After an uncertain hosted write, the backend re-reads affected identities/state before replay; after an uncertain push, inspect the established remote before declaring publication or retrying. Report sanitized causes and limits without exposing credentials.

## Scope through recovery

Keep the existing request scope, destination and payload through credential recovery; recovering authentication does not require a new publication grant. Recover access only for an observed authentication failure. Preserve/report a host denial through [Git recovery](git-workflows.md#platform-authorization-rejection); replacing credentials cannot resolve a policy restriction.
