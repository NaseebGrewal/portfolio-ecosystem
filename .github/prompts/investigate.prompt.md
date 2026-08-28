---
description: "Investigate architecture, dependencies, and code flows across the portfolio ecosystem without making modifications"
name: "investigate"
argument-hint: "What component, workflow, or dependency to investigate?"
agent: "Portfolio Ecosystem Architect"
tools: [read, search, web, todo]
---
Perform a thorough investigation of the specified component, service, or workflow in the portfolio ecosystem monorepo:
1. FIRST present a bullet-point investigation plan and ask: *"Do you approve of this plan?"* with options: `[Yes, approve and proceed]` and `[Custom input from user]`.
2. Map out the relevant files, data schemas, API contracts, and dependencies.
3. Initialize and structure a to-do list using `manage_todo_list`.
4. Highlight potential edge cases, latency bottlenecks, or architectural gaps without making code changes.
5. Present findings and ask for final sign-off with `[Yes, approve and finalize]` or `[Custom input from user]`.
