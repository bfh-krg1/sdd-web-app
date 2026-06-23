---
name: vision
description: >
  Socratic interview wizard that writes docs/vision.md for a new project.
  Use when the user starts a new project or says "let's define the vision",
  "what should we build", "help me articulate the product", or "run the vision wizard".
---

# Vision Wizard

## Instructions

Run a Socratic interview with the user to capture the product vision, then write `docs/vision.md`.
Ask questions one at a time and wait for the answer before proceeding.

## DO NOT

- Ask all questions at once
- Write `docs/vision.md` before all answers are collected
- Invent answers — ask for clarification if the answer is vague
- Proceed with fewer than 5 answered questions

## Interview Questions

Ask these six questions in order, one at a time:

1. **Problem + Audience**: What problem does this solve, and for whom? (1-3 sentences)
2. **User Roles**: Who are the primary user roles? (name 2-4 roles with a one-line description each)
3. **Core Capabilities**: What are the 5-8 core things users will *do* in this system? (focus on actions, not implementation)
4. **Out of Scope**: What is explicitly out of scope for v1? (at least 2-3 items)
5. **Tech Constraints**: Any constraints beyond the defaults? (existing DB, required APIs, compliance requirements, target cloud — or "none")
6. **Success Criteria**: What does success look like in 3 months? (2-3 measurable outcomes)

## Output Format

After collecting all answers, create `docs/` directory if absent and write `docs/vision.md`:

```markdown
# Vision

## Mission
<one sentence: we build X for Y so that Z>

## Target Users

| Role | Description |
|------|-------------|
| <Role 1> | <description> |
| <Role 2> | <description> |

## Goals
1. <goal derived from capabilities>
2. <goal>
...

## Scope In
- <capability 1>
- <capability 2>
...

## Scope Out
- <item 1>
- <item 2>
...

## Tech Constraints
- <constraint or "None beyond defaults">

## Success Criteria (3-month horizon)
- <measurable outcome 1>
- <measurable outcome 2>
```

## Workflow

1. Greet the user and explain this is a 6-question interview
2. Ask question 1; wait for answer
3. Ask question 2; wait for answer
4. Ask question 3; wait for answer
5. Ask question 4; wait for answer
6. Ask question 5; wait for answer
7. Ask question 6; wait for answer
8. Summarize all answers and ask "Does this look right, or anything to adjust?"
9. After confirmation, write `docs/vision.md`
10. Confirm the file is written and suggest next step: `/requirements`
