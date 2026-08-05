---
id: what-is-kavor
title: What is Kavor?
description: Understand Kavor's local-first visual system for coordinating coding agents and durable engineering context.
kind: guide
lastReviewedAt: 2026-08-05
canonicalUrl: https://agentkavor.com/en/docs/what-is-kavor
---

# What is Kavor?

Kavor is a local-first visual system for coordinating coding agents and the engineering work around them. It keeps
context visible on a Canvas instead of burying it in unrelated chats and terminals.

Coding agents made implementation cheaper. They did not remove the need to frame the problem, preserve context,
review evidence, make decisions, and understand who can act on what. Kavor gives that work an explicit structure.

## How Kavor works

A Workspace starts from a directory you choose. On its Canvas, you add Nodes for the resources and participants in
the work: Specifications, Files, Sticky Notes, Terminals, and CodingAgents. Connections between Nodes carry context
and grant visible capabilities. Guardrails narrow those capabilities when the work needs a stronger boundary.

One CodingAgent can implement a Specification, another can review the result, and a third can prepare the release.
The Specification and evidence remain in the Workspace after any individual agent session ends. You can inspect the
graph, intervene, and decide what is accepted.

[![Kavor Canvas with connected CodingAgents, Specifications, Files, Sticky Notes, and Terminals](https://agentkavor.com/kavor-working-demo-poster.jpg)](https://agentkavor.com/en/videos/overview)

[Watch a real Kavor Workspace in 38 seconds →](https://agentkavor.com/en/videos/overview)

## Core vocabulary

- **Workspace** — the Kavor environment rooted in a directory you choose.
- **Canvas** — the visual surface where work is organized.
- **Node** — a first-class item on the Canvas, such as a CodingAgent, Specification, File, Terminal, or Sticky Note.
- **Connection** — an explicit relationship that shares context or grants a capability between Nodes.
- **CodingAgent** — an agent provider running as a participant in the Workspace.
- **Specification** — a durable Markdown contract for intent, constraints, and acceptance criteria.
- **Guardrail** — a user-owned restriction applied to a Connection.
- **Sticky Note** — shared informal working memory for decisions, observations, and next steps.

## What stays local

Kavor is local-first. Your Workspace, repositories, files, terminals, and provider sessions remain under your control
on your machine. A Connection expresses authorization inside Kavor; it is not a reason to copy private Workspace
content into public services.

## A useful first loop

Start small: connect one Specification to one CodingAgent and one Terminal. Ask the CodingAgent to implement the
contract, inspect the evidence, and keep the decision in the Workspace. Add reviewers and richer loops only when the
work benefits from them.

[Download Kavor](https://download.agentkavor.com/en) or read the [release notes](./release-notes/index.md).
