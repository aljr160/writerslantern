---
name: "gsd-cleanup"
description: "Archive accumulated phase directories from completed milestones"
metadata:
  short-description: "Archive accumulated phase directories from completed milestones"
---

<objective>
Archive phase directories from completed milestones into `.planning/milestones/v{X.Y}-phases/`.

Use when `.planning/phases/` has accumulated directories from past milestones.
</objective>

<execution_context>
@/Users/al/.openclaw/workspace-inkkeeper/skills/_gsd/workflows/cleanup.md
</execution_context>

<process>
Follow the cleanup workflow at @/Users/al/.openclaw/workspace-inkkeeper/skills/_gsd/workflows/cleanup.md.
Identify completed milestones, show a dry-run summary, and archive on confirmation.
</process>
