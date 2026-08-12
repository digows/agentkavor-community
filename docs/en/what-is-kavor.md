---
id: what-is-kavor
title: What is Kavor?
description: Understand Kavor's local-first visual system for coordinating coding agents and durable engineering context.
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/en/docs/what-is-kavor
---

# What is Kavor?

Kavor is a local-first visual system for coordinating coding agents and the engineering work around them. It keeps
context visible on a Canvas instead of burying it in unrelated chats and terminals.

Coding agents made implementation cheaper. They did not remove the need to frame the problem, preserve context,
review evidence, make decisions, and understand who can act on what. Kavor gives that work an explicit structure.

## How Kavor works

A Workspace starts from a directory you choose. On its Canvas, you add Nodes for the resources and participants in
the work: Specifications, Files, Sticky Notes, Terminals, and CodingAgents. Connections form reachable components. A
CodingAgent can work with any Node in its component without a direct Connection. Parameters and Guardrails remain
attached to specific Connections when configuration or a stronger boundary is required.

One CodingAgent can implement a Specification, another can review the result, and a third can prepare the release.
The Specification and evidence remain in the Workspace after any individual agent session ends. You can inspect the
graph, intervene, and decide what is accepted.

[![Kavor Canvas with connected CodingAgents, Specifications, Files, Sticky Notes, and Terminals](https://media.agentkavor.com/demos/canvas-overview/workspace.8f917eaa5261.jpg)](https://agentkavor.com/en/videos/overview)

[Watch a real Kavor Workspace in 38 seconds →](https://agentkavor.com/en/videos/overview)

## Core vocabulary

- **Workspace** — the Kavor environment rooted in a directory you choose.
- **Canvas** — the visual surface where work is organized.
- **Node** — a first-class item on the Canvas, such as a CodingAgent, Specification, File, Terminal, or Sticky Note.
- **Connection** — an explicit, undirected relationship that joins Nodes in a reachable component.
- **CodingAgent** — an agent provider running as a participant in the Workspace.
- **Specification** — a durable Markdown contract for intent, constraints, and acceptance criteria.
- **Guardrail** — a user-owned restriction applied to a Connection.
- **Sticky Note** — shared informal working memory for decisions, observations, and next steps.
- **Trigger** — a visible cause of activity; Schedule is its available source for time-based actions.

## What stays local

Kavor is local-first. Your Workspace, repositories, files, terminals, and provider sessions remain under your control
on your machine. The graph expresses authorization inside Kavor; it is not a reason to copy private Workspace
content into public services.

## A useful first loop

Start small: connect one Specification to one CodingAgent and one Terminal. Ask the CodingAgent to implement the
contract, inspect the evidence, and keep the decision in the Workspace. Add reviewers and richer loops only when the
work benefits from them.

[Follow the complete first-loop tutorial](./first-loop.md) to add implementation, review, shared evidence, and a
human decision.

When you want the CodingAgent to help build the structure, learn [how CodingAgents see and build the
Canvas](./coding-agents-and-canvas.md). To start work on time, learn [Schedule](./schedule.md).

[Download Kavor](https://download.agentkavor.com/en) or read the [release notes](./release-notes/index.md).
