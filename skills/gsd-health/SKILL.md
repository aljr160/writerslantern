---
name: "gsd-health"
description: "Diagnose planning directory health and optionally repair issues"
metadata:
  short-description: "Diagnose planning directory health and optionally repair issues"
---

<objective>
Validate `.planning/` directory integrity and report actionable issues. Checks for missing files, invalid configurations, inconsistent state, and orphaned plans.
</objective>

<execution_context>
@/Users/al/.openclaw/workspace-inkkeeper/skills/_gsd/workflows/health.md
</execution_context>

<process>
Execute the health workflow from @/Users/al/.openclaw/workspace-inkkeeper/skills/_gsd/workflows/health.md end-to-end.
Parse --repair flag from arguments and pass to workflow.
</process>
