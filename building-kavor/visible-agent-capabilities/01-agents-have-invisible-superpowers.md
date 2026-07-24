# 01 — Agents Have Invisible Superpowers

[Building Kavor](../README.md) /
[Visible Agent Capabilities](README.md) /
Agents Have Invisible Superpowers

Ask a coding agent what it can do and the honest answer is usually: “it depends.”

It depends on which instructions were discovered, which plugin was installed, which MCP servers were configured,
which credentials are available, which tools the host exposed, and which permissions were accepted earlier.

That flexibility is powerful. Its invisibility is not.

## The configuration archaeology problem

When an agent succeeds, it can be difficult to explain which capability made the result possible. When it fails,
the user starts an archaeological dig:

- Was the workflow instruction missing?
- Was the tool unavailable?
- Was the MCP server disconnected?
- Did the provider ignore a local Skill?
- Did a permission block the operation?
- Did the agent have access to the wrong resource?

Adding another settings page does not solve this. It merely gives the archaeology one more site.

## The Kavor hypothesis

Kavor already represents agents, work, and authorization on a Canvas. A CodingAgent can be connected to a
Specification, Terminal, File, or another CodingAgent. Those Connections are visible and can carry Guardrails.

Our hypothesis is that capabilities should become equally legible:

> If an agent can do something meaningful, the user should be able to see where that capability came from, what it
> can touch, and how to revoke it.

This does not mean exposing every prompt token or provider implementation detail. It means giving the user an
accurate operational model.

## Instructions are not access

The first distinction looks obvious until products erase it:

- A **Skill** teaches a workflow.
- A **Connector** provides executable access.
- Authentication identifies the external account.
- A **Connection** establishes the relevant Kavor relationship.
- A **Guardrail** restricts what is allowed through that relationship.

For example, an n8n Skill might teach an agent how to diagnose a failed workflow. An n8n Connector would provide
the API operations. Credentials would select the n8n instance. Kavor authorization would determine whether that
agent may inspect executions, change a workflow, or activate it.

Bundling these pieces may improve installation. Pretending they are the same thing would weaken control.

## The first experiment

The first design experiment will use the existing sidecar relationship between a CodingAgent Node and its Messages
surface as a starting point.

The new surface should answer five questions quickly:

1. What can this agent do?
2. Why is that capability available?
3. What can it access or change?
4. Is it ready to use?
5. How do I disable or remove it?

We will test the model against a real integration rather than designing a generic marketplace in isolation.

## What would prove the idea wrong?

The experiment fails if:

- the capability list is merely a prettier settings screen;
- users still need provider configuration to understand effective access;
- Skill, tool, credential, and authorization boundaries become less clear;
- changing capabilities silently changes active agent behavior;
- the UI cannot explain what happened after a capability was used;
- supporting multiple providers requires provider names throughout Kavor's domain.

Those failure conditions matter more than making the first prototype look complete.

## Your turn

Think about the most capable coding-agent setup you currently use:

- Which capabilities would another developer fail to discover?
- Which access would you be uncomfortable granting silently?
- Which integration would best test whether this model is honest?

Continue the conversation in [Kavor Discussions](https://github.com/digows/agentkavor-community/discussions).
