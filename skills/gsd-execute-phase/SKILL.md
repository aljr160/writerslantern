---
name: "gsd-execute-phase"
description: "Execute all plans in a phase with wave-based parallelization"
metadata:
  short-description: "Execute all plans in a phase with wave-based parallelization"
---

<objective>
Execute all plans in a phase using wave-based parallel execution.

Orchestrator stays lean: discover plans, analyze dependencies, group into waves, spawn subagents, collect results. Each subagent loads the full execute-plan context and handles its own plan.

Context budget: ~15% orchestrator, 100% fresh per subagent.
</objective>

<execution_context>
@/Users/al/.openclaw/workspace-inkkeeper/skills/_gsd/workflows/execute-phase.md
@/Users/al/.openclaw/workspace-inkkeeper/skills/_gsd/references/ui-brand.md
</execution_context>

<context>
Phase: {{GSD_ARGS}}

**Flags:**
- `--gaps-only` — Execute only gap closure plans (plans with `gap_closure: true` in frontmatter). Use after verify-work creates fix plans.

Context files are resolved inside the workflow via `gsd-tools init execute-phase` and per-subagent `<files_to_read>` blocks.
</context>

<process>
Execute the execute-phase workflow from @/Users/al/.openclaw/workspace-inkkeeper/skills/_gsd/workflows/execute-phase.md end-to-end.
Preserve all workflow gates (wave execution, checkpoint handling, verification, state updates, routing).
</process>
