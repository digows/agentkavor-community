---
id: connections
title: Supported Connections matrix in Kavor
description: Consult supported Node pairs, granted capabilities, required parameters, and available Guardrails.
kind: guide
lastReviewedAt: 2026-08-07
canonicalUrl: https://agentkavor.com/en/docs/connections
---

# Supported Connections matrix in Kavor

A Connection is not merely a line on the Canvas. It declares that two Nodes participate in the same graph and defines
the capabilities that pair adds to the work.

Not every pair is valid. Each supported combination has a specific contract: some Connections make context reachable,
others allow operations mediated by Kavor, and two supply canonical paths to a Terminal through environment variables.

This page is the public reference for those contracts.

## How to read a Connection

A Connection has three distinct responsibilities:

1. **Existence:** connects the Nodes in the same reachable graph component.
2. **Parameters:** records required configuration when the pair needs it.
3. **Guardrails:** subtracts capabilities from the behavior normally allowed between the two Nodes.

Connections are bidirectional relationships. Kavor stores both endpoints in canonical order, but that order does not
express flow, control, or precedence. A message still has a sender and recipient; a Trigger still has a target. Those
directions belong to the operation, not to the persisted Connection.

## Supported combinations

| Node pair | What the Connection allows | Parameters | Available Guardrail | Primary example |
| --- | --- | --- | --- | --- |
| **CodingAgent + Specification** | Read metadata and canonical Markdown, work with the lifecycle, and record durable outputs when allowed. | None | `specification_read_only` | Spec Writer, Builder, and Reviewer sharing one contract. |
| **CodingAgent + Sticky Note** | Read and write informal Markdown memory with version control; every write chooses append or replace. | None | `sticky_note_read_only` | Visible open decisions, progress, findings, and handoffs. |
| **CodingAgent + Terminal** | Read output, run commands, follow or interrupt correlated execution, and interact with the foreground process when allowed. | None | `terminal_read_only` | Diagnostics, tests, logs, or help in a supervised SSH session. |
| **CodingAgent + File** | Make a canonical filesystem source explicit in the graph for reading, review, or modification when allowed. | None | `file_read_only` | Delimit a module, PDF, image, report, or configuration. |
| **CodingAgent + CodingAgent** | Form a reachable graph for asynchronous messages, replies, independent review, and parallel work. | None | None | A Builder requesting review from a Reviewer. |
| **Specification + Terminal** | Export the Specification's canonical absolute path to the Terminal session. | Required environment variable name | None | Validate, inspect, or compare Specification Markdown. |
| **File + Terminal** | Export the File's canonical absolute path to the Terminal session. | Required environment variable name | None | Run a script or use a SQL file without copying its path between windows. |
| **Trigger + CodingAgent** | Deliver a prompt at a configured time to a CodingAgent with an active session. | None | None | Wake a Maintainer to analyze failures, write a report, and request review. |
| **Trigger + Terminal** | Deliver a command at a configured time to an active Terminal session. | None | None | Run tests, a database check, or a maintenance script. |

## Guardrails restrict; they do not grant access

A Connection starts with the capabilities implemented for that pair. A Guardrail records a restriction chosen by the
user over that base:

| Guardrail | Connection | Effect |
| --- | --- | --- |
| `specification_read_only` | CodingAgent + Specification | Preserves reading and prohibits lifecycle and output changes through Kavor. Direct Markdown editing becomes an explicit read-only contract. |
| `sticky_note_read_only` | CodingAgent + Sticky Note | Preserves reading and blocks appending or replacing content. |
| `terminal_read_only` | CodingAgent + Terminal | Preserves Terminal inspection and blocks operations that would change the session, process, or its input. |
| `file_read_only` | CodingAgent + File | Declares that the canonical source must not be modified by the agent. |

Guardrails belong to the direct Connection between a CodingAgent and a resource. Another route through the graph does
not erase a restriction on that direct pair.

Kavor-mediated operations are rejected before producing effects when a Guardrail blocks them. Files and Specification
bodies may also be reachable through the harness's own filesystem tools; there, the Guardrail is a visible, monitored
contract rather than an operating-system sandbox.

A Guardrail does not create a Connection, make a Node reachable, or increase permissions. If a resource should not
participate in the graph, do not create the Connection.

## Connections with environment variables

Only two pairs have persisted parameters:

- **File + Terminal**;
- **Specification + Terminal**.

In both cases, you choose an environment variable name. The value supplied to the Terminal is the source's canonical
absolute path—never the file contents.

For example, a File connected as `CHECK_SQL` can be used in the shell like this:

```sh
sqlite3 app.db < "$CHECK_SQL"
```

Kavor applies the value when the Terminal session starts. If the Connection or parameter changes while the shell is
open, the interface signals that the variable is waiting for a session restart. `TERM` and `COLORTERM` are reserved
and cannot be used for these parameters.

## The special limit of a Trigger

A Trigger has at most one direct target: a CodingAgent or a Terminal. It cannot connect directly to a Specification,
File, or Sticky Note and cannot distribute the same firing to multiple targets.

The rest of the graph can expand what the target can do without expanding its permissions. A CodingAgent awakened by
a Trigger can work with Nodes already reachable under the same Guardrails and session limits.

Kavor must be running and the target session active for delivery to occur. A Trigger does not start a session you left
off, decide the work objective, or turn external effects into exactly-once operations. Every TriggerFiring preserves
its durable result for inspection.

## Combinations that do not exist

Kavor rejects every pair absent from the matrix. This includes, among others:

- Trigger + Specification;
- Trigger + File;
- Trigger + Sticky Note;
- Specification + File;
- Specification + Sticky Note;
- File + Sticky Note;
- File + File;
- Sticky Note + Terminal;
- Sticky Note + Sticky Note;
- Terminal + Terminal.

A Node cannot connect to itself. Reversing the same two endpoints does not create another Connection because the
persisted relationship has no direction.

Canvas proximity, a mention in a message, or membership in the same Workspace does not replace a Connection. If a
pair is absent from this page, being visually close to another Node grants it no capabilities.

## Choose the smallest Connection that solves the work

Before connecting two Nodes, ask which concrete capability is missing:

- does the agent need durable intent? Connect a Specification;
- do human and agent need shared working memory? Connect a Sticky Note;
- does the agent need to run or observe a process? Connect a Terminal;
- must a canonical source be explicit? Connect a File;
- would another perspective improve implementation or review? Connect another CodingAgent;
- should time genuinely start the activity? Add a Trigger last.

A good Connection makes the work more explicit. If you cannot name the capability it adds, the graph probably does
not need it.

## Continue

- Read the [central Nodes guide](./nodes.md) to understand each participant's responsibility.
- [Close your first loop](./first-loop.md) with intent, implementation, review, and human decision.
- Learn [how to choose CodingAgents and roles](./agents-and-roles.md) before expanding the graph.
