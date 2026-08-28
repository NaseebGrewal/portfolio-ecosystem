---
description: "Implement features, bug fixes, or optimizations with zero errors, followed by Docker-only testing and browser validation"
name: "implement"
argument-hint: "Describe the feature, optimization, or fix to implement..."
agent: "Portfolio Ecosystem Architect"
tools: [read, edit, search, execute, web, todo]
---
Implement the requested feature or fix with zero defects following the strict mandatory lifecycle:
1. FIRST present a bullet-point action plan and ask: *"Do you approve of this plan?"* with options: `[Yes, approve and proceed]` and `[Custom input from user]`. Wait for approval before editing files.
2. Break down steps into `manage_todo_list` (mark 1 in-progress at a time).
3. Implement clean, typed code adhering to repository conventions.
4. Run tests exclusively inside Docker containers via `docker compose up -d` and containerized pytest / vitest suites (`./scripts/docker-test-all.sh`).
5. Perform visual and functional inspection using local browser tools (`http://localhost:3000`).
6. Present a bulleted summary and prompt for user approval with explicit options: `[Yes, approve and finalize]` or `[Custom input from user]`.
