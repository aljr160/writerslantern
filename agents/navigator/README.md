# Navigator Agent Kit

Files included:
- `IDENTITY.md`  name/vibe/emoji/avatar cue.
- `SOUL.md`  mission, principles, workflow.
- `AGENTS.md`  responsibilities + routing map.

## Wiring steps
1. Point the `navigator` agent entry in `~/.openclaw/openclaw.json` to this workspace (`.../workspace-inkkeeper/agents/navigator`).
2. Restart the OpenClaw gateway so the new identity loads.
3. Clear the existing Navigator session (`~/.openclaw/agents/navigator/sessions/`) so the next Discord message boots with the updated persona.
4. Smoke-test in <#1481568833155235900> by asking "which agent are you?"—should answer as Navigator with the summary above.

Optional polish: set Discord avatar to the compass/story-map graphic mentioned in `IDENTITY.md` and add any ops notes to `TOOLS.md` once the role stabilizes.