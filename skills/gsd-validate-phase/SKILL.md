---
name: "gsd-validate-phase"
description: "Retroactively audit and fill Nyquist validation gaps for a completed phase"
metadata:
  short-description: "Retroactively audit and fill Nyquist validation gaps for a completed phase"
---

<objective>
Audit Nyquist validation coverage for a completed phase. Three states:
- (A) VALIDATION.md exists — audit and fill gaps
- (B) No VALIDATION.md, SUMMARY.md exists — reconstruct from artifacts
- (C) Phase not executed — exit with guidance

Output: updated VALIDATION.md + generated test files.
</objective>

<execution_context>
@/Users/al/.openclaw/workspace-inkkeeper/skills/_gsd/workflows/validate-phase.md
</execution_context>

<context>
Phase: {{GSD_ARGS}} — optional, defaults to last completed phase.
</context>

<process>
Execute @/Users/al/.openclaw/workspace-inkkeeper/skills/_gsd/workflows/validate-phase.md.
Preserve all workflow gates.
</process>
