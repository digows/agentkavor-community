---
id: connections
title: Supported Connections matrix in Kavor
description: Consult directly connectable Node pairs, structural roles, parameters, Guardrails, and limits.
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/en/docs/connections
---

# Supported Connections matrix in Kavor

A Connection is not a workflow arrow. It is an explicit, undirected relationship that places two Nodes in the same
reachable Canvas component.

The whole graph matters to a CodingAgent: it can work with any Node reachable through valid Connections, even when the
resource is not directly connected. A direct Connection still matters when it selects a Schedule target, carries a
parameter, or holds a Guardrail between one CodingAgent and one resource.

This page is the public reference for pairs Kavor allows you to connect directly and for each pair's special contract.

## Four rules for reading the graph

1. **Connections have no persisted direction.** Endpoint order does not express flow, control, or precedence.
2. **Reachability is transitive.** A CodingAgent and every Node on a valid path share one context and capability graph.
3. **Some rules remain direct.** A Guardrail belongs to its exact Connection, Terminal parameters belong to their
   pair, and a Trigger selects its single target through a direct Connection.
4. **Unsupported pair means no direct Connection.** Both Nodes may still share a component through supported pairs.

A message still has a sender and recipient. A Schedule still delivers to a target. Those directions belong to the
operation, not to the Connection drawn on the Canvas.

## Supported combinations

| Node pair | Role of the direct Connection | Parameters | Available Guardrail | Primary example |
| --- | --- | --- | --- | --- |
| **CodingAgent + Specification** | Places durable intent in the graph and provides the direct point for restricting that agent. | None | `specification_read_only` | Spec Writer, Builder, and Reviewer working with one reachable contract. |
| **CodingAgent + Sticky Note** | Places informal memory in the graph and provides the direct restriction point. | None | `sticky_note_read_only` | Visible open decisions, progress, findings, and handoffs. |
| **CodingAgent + Terminal** | Places the shell in reach and provides the direct restriction point. | None | `terminal_read_only` | Diagnostics, tests, logs, or a supervised SSH session. |
| **CodingAgent + File** | Places a canonical filesystem source in the graph and provides the direct restriction point. | None | `file_read_only` | Delimit a module, PDF, image, report, or configuration. |
| **CodingAgent + CodingAgent** | Joins participants in one component. Any reachable CodingAgent may message another. | None | None | A Builder requesting review from a Reviewer. |
| **Specification + Terminal** | Exports the Specification's canonical absolute path to the Terminal session. | Required environment variable name | None | Validate or compare Specification Markdown. |
| **File + Terminal** | Exports the File's canonical absolute path to the Terminal session. | Required environment variable name | None | Run a script or SQL file without copying its path. |
| **Trigger + CodingAgent** | Selects a CodingAgent with an active session as the target of the Schedule prompt. | None | None | Wake a Maintainer to analyze failures and request review. |
| **Trigger + Terminal** | Selects an active Terminal session as the target of the Schedule command. | None | None | Run tests, a database check, or maintenance script. |

The four CodingAgent-resource Connections are not the only way to reach a resource. They are the clearest way to put
it in that agent's graph and the only surface that can carry a Guardrail specific to that pair.

## Guardrails restrict one direct pair

Reachable Nodes are open by default. A Guardrail records a user-owned restriction on the direct Connection between a
CodingAgent and a resource:

| Guardrail | Connection | Effect |
| --- | --- | --- |
| `specification_read_only` | CodingAgent + Specification | Preserves reading and blocks lifecycle, output, and Markdown changes by that agent. |
| `sticky_note_read_only` | CodingAgent + Sticky Note | Preserves reading and blocks appending or replacing content. |
| `terminal_read_only` | CodingAgent + Terminal | Preserves inspection and blocks operations that change the session, process, or input. |
| `file_read_only` | CodingAgent + File | Declares that the agent must not change the canonical source. |

Another route does not erase a Guardrail on the direct pair. A restriction on another agent's Connection also does
not become a global resource policy.

Kavor-mediated operations are rejected before effects when blocked. Files and Specification bodies may also be
reachable through the harness filesystem tools; there the Guardrail is a visible, monitored contract, not an OS
sandbox. A Guardrail does not create a Connection, expand permissions, or apply merely because a Node is nearby.

## Connections with environment variables

Only **File + Terminal** and **Specification + Terminal** have persisted parameters. You choose an environment
variable name, and the value supplied to the Terminal is the canonical absolute path, never the file contents.

```sh
sqlite3 app.db < "$CHECK_SQL"
```

Kavor applies the value when the Terminal session starts. If the Connection or parameter changes while the shell is
open, the UI reports that the variable awaits a session restart. `TERM` and `COLORTERM` are reserved.

## The special limit of a Schedule

Schedule is the Trigger source available in the product. Each Trigger has at most one direct target: a CodingAgent or
Terminal. The Connection selects the target; the target id is not duplicated in Schedule configuration.

An awakened CodingAgent works with every Node in its reachable component under the same limits and Guardrails it
already had. Schedule adds time and a payload, not permissions.

Kavor must be running, the machine awake, and the target session active. Schedule does not start a deliberately
closed session, fan out to several targets, or promise exactly-once external effects. Removing the target Connection
pauses the Trigger and records the reason.

Read [Schedule: give your graph a clock](./schedule.md) for recurrence, `Run now`, and durable history.

## Combinations that do not exist directly

Kavor rejects every pair absent from the matrix, including Trigger + Specification, Trigger + File, Trigger + Sticky
Note, Specification + File, Specification + Sticky Note, File + Sticky Note, File + File, Sticky Note + Terminal,
Sticky Note + Sticky Note, and Terminal + Terminal.

A Node cannot connect to itself, and reversing endpoints does not create another Connection. These limits do not
prevent useful compositions: a Specification and Sticky Note can share a graph through supported CodingAgent pairs.
What does not exist is a direct Connection between them.

Canvas proximity, a message mention, or Workspace membership does not replace a Connection path.

## Choose the smallest structure that solves the work

Before creating a Connection, ask what the component lacks:

- durable intent: add a Specification;
- shared working memory: add a Sticky Note;
- execution or evidence: add a Terminal;
- an explicit canonical source: add a File;
- another perspective: add a CodingAgent;
- time as a legitimate cause: add Schedule last.

Do not connect every CodingAgent directly to every resource by reflex. Build the smallest topology that keeps the
right context reachable, then add a direct Connection when it improves readability, carries a parameter, or needs its
own Guardrail.

## Continue

- Read the [central Nodes guide](./nodes.md).
- Go deeper with the dedicated [CodingAgent](./coding-agent.md), [Specification](./specification.md), and
  [Terminal](./terminal.md) guides.
- [Close your first loop](./first-loop.md) with intent, implementation, review, and human decision.
- See [how CodingAgents see and build the Canvas](./coding-agents-and-canvas.md).
