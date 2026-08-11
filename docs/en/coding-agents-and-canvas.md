---
id: coding-agents-and-canvas
title: How CodingAgents see and build the Canvas
description: Understand reachable context, agent messages, and atomic Canvas editing within limits you control.
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/en/docs/coding-agents-and-canvas
---

# How CodingAgents see and build the Canvas

The Canvas is not only a picture for you. To a CodingAgent, it is live context, a capability map, and—when you allow
it—a surface the agent can organize.

These are two different capabilities:

1. **understand the reachable graph** to work with Nodes, resources, and other CodingAgents;
2. **edit Canvas structure** through immediate, atomic changes.

Keeping them separate avoids a dangerous conclusion: seeing a Node's position does not mean reading its content, and
working with a resource does not mean being able to remove anything in the Workspace.

## The graph is shared context

On each new interaction, Kavor gives the CodingAgent the current state of its reachable component: Nodes,
Connections, Guardrails, and the facts required to understand the work.

The agent can operate any Node connected by a path of valid Connections, at any distance. For example:

```text
Specification — Builder — Reviewer — Sticky Note
```

The Builder reaches the Sticky Note through the Reviewer. The Reviewer reaches the Specification through the
Builder. Both CodingAgents can exchange messages, even though access does not require every resource to be directly
connected to each agent.

This keeps the Canvas readable and avoids repeating the same context in every session. Topology remains explicit:
removing a Connection may split the component and change what is reachable on the next interaction.

## What arrives inline and what stays on demand

Kavor favors useful context, not a permanent Workspace dump.

- small textual information may arrive with graph state;
- Specifications provide lifecycle, path, and recent outputs while canonical Markdown remains in the Workspace;
- Terminals provide state and foreground command, while output is read when needed;
- Files provide their canonical source, whose content remains in the filesystem;
- CodingAgents provide state and work facts; earlier messages are read when useful.

Large or live content is not continuously copied into the context window. The agent receives a clear reference to
consult it. This preserves reasoning space and keeps Files, Specifications, and Terminals at their real sources.

## Messages also follow the graph

Any reachable CodingAgent may message another CodingAgent in the component. A direct Connection between them is not
required.

Messages are durable and inspectable in the `Messages` panel. Use them to:

- hand an implementation to a Reviewer;
- ask the author of a Specification for clarification;
- split independent investigations;
- return findings and request another verification.

A message coordinates participants, but should not be the only home of a durable decision. Preserve contracts in the
Specification, working memory in a Sticky Note, and results in the appropriate outputs.

## Guardrails remain attached to the direct pair

Reachability is the access rule. A Guardrail is a restriction rule.

If a direct Connection between a CodingAgent and a Specification carries `specification_read_only`, that Guardrail
still governs the pair even if another route also reaches the Specification. A restriction on another CodingAgent's
Connection does not become a global policy for the resource.

Visual proximity, labels, and message references do not grant access. A real path of Connections is required.

## The agent also sees layout—with less authority

To help organize the Workspace, a CodingAgent may inspect labels, kinds, and geometry for every Node on the Canvas.
That layout view does not include configuration, content, or Connections outside its own graph.

It can therefore align or move a Node outside its component without gaining access to that Node's content. Layout is
Workspace-wide; context and structural changes are not.

## Allow workspace editing

Each CodingAgent has an `Allow workspace editing` option in advanced settings. It controls structural changes
initiated by that agent and takes effect immediately without restarting the session.

When enabled, the CodingAgent can, within its scope:

- create active Nodes, including CodingAgent, Specification, Sticky Note, Terminal, File, and Schedule;
- create a canonical Specification and materialize it on the Canvas;
- add supported Connections;
- change Terminal Connection parameters;
- remove Connections;
- rename reachable Nodes and Specifications;
- configure a reachable Schedule;
- move, resize, and reveal Nodes.

When disabled, structural changes are rejected. The agent should report that the setting is off and not insist.
Layout remains available because moving a Node does not expand authority or alter content.

## Structure follows the graph, not the entire Workspace

A CodingAgent may structurally change:

- Nodes and Connections in its reachable component;
- Nodes it created earlier in the same atomic change.

This lets an agent create a Node and connect it immediately without leaving debris on the Canvas. It also lets an
isolated agent create new resources and connect itself in the same batch.

The first link to a preexisting Node outside the graph remains yours to make. The agent cannot use Workspace layout
visibility to attach itself to a resource you never made reachable.

## Changes are atomic

When a CodingAgent builds a structure, Kavor validates the complete set and applies changes in order as one unit. If
one step fails, no earlier structural change from the batch remains.

Creating a Terminal and connecting it to the agent therefore produces both or neither. The Canvas is not left with
an orphan Node because the final Connection was invalid.

The result returned to the agent contains the actual persisted form. The agent should read it rather than assuming
defaults, geometry, or canonical paths stayed identical to the request.

## What remains human

`Allow workspace editing` does not grant unrestricted control. A CodingAgent cannot:

- delete Nodes;
- create, remove, or relax Guardrails;
- arbitrarily reconfigure other Node kinds;
- change the human control that holds incoming messages for approval;
- use a reference or Canvas position to expand its own graph.

An agent can remove a reachable Connection, so your request should be explicit when that action may remove context or
interrupt another CodingAgent. Kavor instructs agents to touch peer Connections only when you asked or when necessary
for already delegated work.

## Docs MCP helps the agent teach Kavor

CodingAgents in Kavor can consult official documentation through the local Docs MCP. You can ask for help without
memorizing Node names, supported combinations, or Schedule details.

Documentation guides; it does not grant authority. Docs MCP does not create Connections, disable Guardrails, or turn
a suggestion into a Canvas change.

## Three prompts for collaborating with the agent

### Explain before changing anything

> Consult Kavor's official documentation and the current graph. Explain the smallest structure that solves this task,
> which Nodes will be reachable, and which limits remain. Do not change the Canvas yet.

### Build a reviewable loop

> Build a small loop for this task with a Specification, a Builder, a Reviewer, and a Sticky Note. Use the fewest
> Connections required, create and connect the new Nodes in one atomic change, and stop before implementation so I
> can review the Canvas.

### Organize without expanding access

> Organize this Canvas visually so intent, implementation, review, and evidence are easy to read. Do not create or
> remove Connections, do not change Guardrails, and do not assume access to Nodes outside your graph.

## Checklist before authorizing an edit

- did the agent explain the expected structural result?
- does every new Node have a concrete function?
- will each created Node be connected in the same batch, or is it intentionally human-only?
- does the change stay inside the reachable component?
- could a removed Connection split the graph or interrupt another agent?
- is a direct Guardrail needed before providing the resource?
- is the point where the agent must stop for your review clear?

Use the CodingAgent as a Canvas collaborator, not its invisible owner. The value is being able to inspect the
structure it received, the structure that changed, and the limits that remained under your control.

## Continue

- [Close your first loop](./first-loop.md) with a minimal topology.
- Check the [Connection matrix](./connections.md) before expanding the graph.
- Learn [how to choose CodingAgents and roles](./agents-and-roles.md).
- Configure [Schedule](./schedule.md) without expanding permissions.
