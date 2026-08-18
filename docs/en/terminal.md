---
id: terminal
title: "Terminal in Kavor: visible execution for human and agent"
description: Use a real shell on the Canvas, connect context through canonical paths, and let a CodingAgent assist without losing supervision.
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/en/docs/terminal
---

# Terminal in Kavor: visible execution for human and agent

A Terminal is a real shell on the Canvas. You keep typing commands, following logs, and operating familiar tools;
Kavor adds context, observability, and collaboration around that session.

The goal is not to hide execution behind a button. It is to let a human and a CodingAgent work in the same visible
environment, each under clear boundaries.

## What a Terminal owns

Each Terminal has its own session, shell, and screen history retained by the Node. More than one Terminal is useful
when responsibilities differ: application, tests, database, logs, or a remote machine you already opened.

The process remains a shell process. Kavor does not turn displayed text into success, convert every command into a
persisted task, or assume a tool finished merely because it printed an optimistic message.

## What it can do on its own

Without Connections, the Terminal already keeps a shell inside the Workspace and avoids breaking flow to switch to
external windows. You can run interactive commands, observe long-lived processes, and keep separate sessions on the
same Canvas.

Connections add participants and canonical sources without replacing the shell.

## What it gains from the graph

The Terminal accepts four direct pairs:

| Connection | What it adds |
| --- | --- |
| **Terminal + CodingAgent** | The agent can run correlated commands, follow the process, inspect screen or history, and interrupt an execution when authorized. It may carry `terminal_read_only`. |
| **Terminal + File** | Exports the File's canonical absolute path through an environment variable you choose. |
| **Terminal + Specification** | Exports the Specification Markdown's canonical absolute path through an environment variable. |
| **Terminal + Trigger** | Selects the active session as the direct target of a command scheduled by Schedule. |

A CodingAgent does not need a direct link to the Terminal when both already belong to the same reachable component.
The direct Connection, however, is where `terminal_read_only` can declare and enforce that the agent may only observe.

## Assistance without fighting over the keyboard

The Terminal is a shared surface with priority for the human. A CodingAgent must not dump a command over text you
are still typing. When input is unsafe, the operation waits or returns a condition to handle instead of corrupting
your line.

For agent-initiated work, Kavor correlates the command with its observation. The agent can wait for that result,
cancel the corresponding execution, or inspect visible state. For an existing session, it chooses the appropriate
view: current screen, bounded tail, or full buffer.

That distinction matters. The screen answers, “what does the human see now?” A tail helps with recent logs. The full
buffer serves an investigation that truly needs history without turning every interaction into an automatic context
dump.

## Use Files and Specifications without copying paths

Connections to a File or Specification take an environment-variable name. Its value is the source's canonical
absolute path, never its content.

Examples:

```sh
node "$IMPORT_SCRIPT" --input "$SOURCE_FILE"
```

```sh
markdownlint "$SPECIFICATION_FILE"
```

Variables apply when the Terminal session starts. If a Connection or its parameter changes while the shell is open,
the new configuration waits for that session to restart. `TERM` and `COLORTERM` are reserved by the emulator.

Use names that express responsibility, such as `CHECK_SQL`, `SPECIFICATION_FILE`, or `IMPORT_SCRIPT`. A generic
variable such as `FILE` loses meaning as the graph grows.

## Three useful patterns

### Implementation with visible evidence

Connect a Specification, CodingAgent, and Terminal. The agent runs only relevant checks, preserves the necessary
output, and records the result as an output. You observe the same shell and can intervene.

### Diagnose a running application

Keep the application in one Terminal and tests or queries in another. A reachable CodingAgent inspects the screen or
needed tail, forms a hypothesis, and runs a bounded command. Logs remain visible to you; the investigation does not
become a black box.

### Supervised remote operation

You open an SSH session in the Terminal. A CodingAgent can help interpret state and suggest or run commands when
authorized. Kavor does not become a remote service: credentials, connection, shell, and supervision remain in the
session you opened.

## A practical graph

```text
Specification — Maintainer — Reviewer
                     │
                  Terminal
                     │
              File: check.sql
```

The Maintainer uses the Specification as a contract, the File as an explicit source, and the Terminal to run the
check. The Reviewer assesses results and evidence. The File + Terminal Connection provides `CHECK_SQL`, so the shell
can use it without manually copying a path.

## A better opening request

> Diagnose the failure using only reachable context. Read the Terminal's current screen first. Run one command at a
> time, explain what it discriminates, and preserve the output needed by the Reviewer. Do not interrupt a process I
> started, and stop before any destructive action or expansion of the Specification scope.

For monitoring:

> Follow only the necessary tail from this Terminal. Notify me when new evidence appears; do not treat a lack of new
> lines as success, and do not leave a watcher started only for your investigation running after you finish.

## Read-only Guardrail

`terminal_read_only` keeps inspection available and blocks operations that would alter the session, process, or input
through that direct Connection. It is useful for a Reviewer who needs evidence but should not execute corrections.

The Guardrail belongs to the pair. It does not turn the whole Terminal into a globally read-only surface or replace
operating-system permissions.

## Limits that matter

- Terminal output is not automatic proof that an external effect happened correctly.
- A CodingAgent must not interfere with unfinished human input.
- Destructive commands still require exact scope and appropriate authorization.
- A variable supplied by a Connection contains a path, not content or a secret.
- Changes to those variables require restarting the Terminal session before they enter the environment.
- Schedule delivers only to an active session and does not automatically recover commands missed while Kavor was
  closed.
- A process started for an investigation should be stopped when it does not need to remain for the human.
- Multiple Terminals help when they represent real responsibilities; duplicating them without purpose only
  fragments operational state.

## Before delegating a command

Confirm:

- is this the correct Terminal for the responsibility?
- is human input in progress?
- is the command bounded and reversible when necessary?
- does the agent know what output counts as evidence?
- does it need the screen, a tail, or full history?
- do Files and Specifications use understandable variable names?
- should the Reviewer observe under `terminal_read_only`?
- is it clear when to stop, wait, or ask for your decision?

A Terminal gains value in the graph when execution remains real, context is explicit, and supervision does not
disappear.

Consult the [Connections matrix](./connections.md), learn
[how CodingAgents see and build the Canvas](./coding-agents-and-canvas.md), or configure
[Schedule for commands and prompts](./schedule.md).
