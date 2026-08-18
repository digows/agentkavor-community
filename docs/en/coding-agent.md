---
id: coding-agent
title: "CodingAgent in Kavor: your favorite harness as part of a graph"
description: Choose a provider, preserve its native experience, and connect the CodingAgent to the right context, tools, and participants.
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/en/docs/coding-agent
---

# CodingAgent in Kavor: your favorite harness as part of a graph

A CodingAgent is your coding agent running through its provider's native interface, now as a visible participant on
the Canvas.

Kavor does not replace each harness with a generic chat. It preserves the provider experience and adds structure
around it: an explicit responsibility, reachable context, tools, other CodingAgents, and boundaries you can inspect.

[![Kavor toolbar provider selector before adding a CodingAgent to the Canvas.](https://media.agentkavor.com/demos/coding-agent-provider-selector/poster.22c2dccb70c5.jpg)](https://agentkavor.com/en/videos/coding-agent-provider-selector)

## What a CodingAgent owns

Each CodingAgent represents a separate session. The Node preserves the configuration and state needed for that role,
including the selected provider and, when the provider exposes them, model, effort level, permissions, and native
session.

The provider is a CodingAgent setting, not a different Node kind. The selector includes:

- Anthropic Claude Code;
- OpenAI Codex;
- Google Antigravity;
- xAI Grok;
- SST OpenCode.

When you add a CodingAgent from the toolbar, you choose the provider first. You then configure that session for the
work. Available options can differ because Kavor preserves the real capabilities of each harness instead of
pretending they all share one contract.

## What it can do on its own

Without any Connection, a CodingAgent is still a provider-native session inside the Workspace. You can talk to it,
use the tools the harness provides, and keep the work bounded by that Workspace root.

The Node already helps separate contexts: one session can investigate while another implements. Without a graph,
however, shared context still depends on what you put into each conversation.

A Connection turns the isolated session into a participant in a system of work.

## What it gains from the graph

A CodingAgent can work with any Node reachable through valid Connections in its component. Not every resource needs
to connect to it directly.

Direct Connections involving a CodingAgent have specific roles:

| Connection | What it adds |
| --- | --- |
| **CodingAgent + Specification** | Places durable intent, scope, and criteria in the graph. The direct Connection may carry `specification_read_only`. |
| **CodingAgent + Sticky Note** | Adds shared informal memory for open decisions, progress, and findings. It may carry `sticky_note_read_only`. |
| **CodingAgent + File** | Makes a canonical filesystem source explicit in the work. It may carry `file_read_only`. |
| **CodingAgent + Terminal** | Allows commands, process observation, and shell evidence. It may carry `terminal_read_only`. |
| **CodingAgent + CodingAgent** | Joins participants in one component. Reachable CodingAgents can exchange asynchronous messages and inspect the context needed to coordinate. |
| **Trigger + CodingAgent** | Selects that active session as the direct target of a scheduled prompt. A Trigger does not start a session you closed. |

Reachability does not erase direct contracts. If the exact Connection between a CodingAgent and a resource has a
Guardrail, that restriction still governs the pair even when another route exists through the graph.

## Three useful patterns

### Implement from a contract

Connect a Specification, a CodingAgent in the Implementer role, and a Terminal. The agent reads the contract at its
source, changes only the necessary scope, runs the checks, and records outputs on the Specification.

This keeps intent outside the conversation history and evidence inside the Workspace.

### Separate implementation from review

Use different sessions for the Implementer and Reviewer. Both can reach the same Specification and evidence, but
each receives a different question.

The Implementer asks, “how do I satisfy the contract?” The Reviewer asks, “does the result actually satisfy the
contract, and what risks remain?” Separation reduces the chance that review automatically inherits the author's
assumptions.

### Combine providers without creating a contest

Different providers can participate in the same graph. Combine them when another interface, model, or reasoning
approach improves a concrete responsibility.

Do not add a provider just to increase the number of agents. Define the role, expected result, and stopping condition
first; then choose the harness that best serves the work.

## A practical graph

```text
Specification — Implementer — Reviewer
                    │            │
                  Terminal    Sticky Note
                    │
                   File
```

The lines represent Connections with no persisted direction. Every Node belongs to the same reachable component.
The Implementer executes the contract, the Reviewer produces an independent assessment, and the Sticky Note keeps
questions or findings visible for the human decision.

This design is not an automatic sequence. Messages coordinate handoffs; Specifications and other resources preserve
what must survive sessions; you decide when the work is accepted.

## A better opening prompt

For an Implementer:

> Implement only the scope defined in the reachable Specification. Before changing code, identify the relevant
> Files and checks. Use the Terminal to produce evidence, record the result as a Specification output, and ask the
> Reviewer for an independent assessment. Stop if a required decision falls outside the contract.

For a Reviewer:

> Compare the implementation and evidence with the Specification criteria. Look for incorrect behavior, missing
> scenarios, regressions, and operational risks. Record concrete findings before suggesting changes, and do not
> approve the work merely because existing tests passed.

## Limits that matter

- A CodingAgent does not receive access from visual proximity; a path of Connections must exist.
- Referencing a Node in a message does not grant access to it.
- A Guardrail restricts the direct pair it belongs to; it is not a global Workspace policy.
- Messages coordinate work, but must not be the only place where a durable decision lives.
- Providers do not necessarily expose the same models, permissions, events, or session operations.
- A Trigger delivers a prompt to an active session; it does not expand permissions or guarantee an external effect
  happens exactly once.
- Allowing Canvas edits does not authorize deleting Nodes or changing Guardrails; those boundaries remain human.

## Before starting the session

Confirm:

- what responsibility this CodingAgent owns;
- what observable result it should produce;
- which Nodes must be reachable;
- which Guardrails should exist on direct Connections;
- whether the provider, model, and effort fit the task's risk;
- where decisions, progress, and evidence will be preserved;
- who it should talk to and when it should stop.

A CodingAgent does not become powerful because it received a longer prompt. It becomes more useful when
responsibility, context, tools, collaboration, and boundaries form a coherent design.

Continue with [How to choose CodingAgents and define roles](./agents-and-roles.md), learn
[how CodingAgents see and build the Canvas](./coding-agents-and-canvas.md), or consult the
[supported Connections matrix](./connections.md).
