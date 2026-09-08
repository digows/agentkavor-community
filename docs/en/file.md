---
id: file
title: "File: context and scope on the Canvas"
description: Use a File to keep a canonical source visible, delimit a CodingAgent's context, and pass its path to a Terminal.
kind: guide
lastReviewedAt: 2026-09-08
canonicalUrl: https://agentkavor.com/en/docs/file
---

# A File is a file — and that is already powerful

A File is not a disposable attachment. It represents a canonical filesystem source on the Canvas, making clear
which material the work should read, review, edit, or use as input.

[![A PDF displayed in a File Node and used by a CodingAgent on the Kavor Canvas](https://agentkavor.com/kavor-pdf-canvas-agent-demo-poster.jpg)](https://agentkavor.com/en/videos/pdf-canvas-agent)

*The File keeps the material visible while you arrange agents, decisions, and execution around it.*

## What a File does

By itself, a File lets you view and work with a Workspace source. Depending on its format, Kavor provides text
editing, search, reading preferences, and rich preview.

Text formats include Plain Text, Markdown, JSON, SQL, TypeScript, JavaScript, YAML, Shell, HTML, and CSS. Images and
PDFs can be viewed on the Canvas; SVG can switch between preview and source.

A File continues to point to the real source. If the file changes outside Kavor, the Node reflects the change and
signals when a local edit must be reconciled. This prevents confusing a context copy with the artifact that will
actually be versioned.

## A File as explicit scope

Connected to a CodingAgent, a File turns a generic intention into a concrete source of work. It can delimit a module,
provide an input contract, keep an image or PDF available for analysis, or identify the configuration that must be
reviewed.

A direct starting request can be:

> Read the connected File as the canonical source for this task. Explain what needs to change, preserve the scope, and edit only after I confirm the plan.

When the agent only needs to consult the material, use the file_read_only Guardrail on the direct Connection. The
agent can still reach the File, but cannot change its source through Kavor-mediated operations.

## A File as Terminal input

A File + Terminal Connection exports the file's canonical absolute path to the session through an environment variable
name chosen by you. The value is the path, not a copy of the content.

For example, a File connected as CHECK_SQL can be used by a shell command that reads that path.

The path is applied when the Terminal session starts. If you change the Connection or parameter while the shell is
already open, the interface tells you that the session must restart to receive the new value.

This is useful for scripts, SQL, configurations, and reports: the File keeps the source explicit on the Canvas and
the Terminal runs the command without copying paths between windows.

## Three ways to use it

### Review an existing source

Connect the File to a CodingAgent and ask for a risk-oriented reading. For a visual review, keep the File, a Sticky
Note for findings, and a Terminal for checks in the same graph.

### Implement with clear scope

Connect a Specification, the File, and the Builder. The Specification explains the result; the File identifies the
concrete source; the CodingAgent makes the change and records evidence in the appropriate places.

### Turn an artifact into executable input

Connect a SQL or script File to a Terminal, name the variable, and run the command from the shell. If an agent is also
connected, it can help interpret the output while you follow the process.

## Limits that matter

- a Connection does not turn the File into generic filesystem access; the Node still represents its configured
  canonical source;
- not every binary format is editable as text;
- the path exported to the Terminal does not contain the file body;
- a direct CodingAgent Connection is needed for a File-specific Guardrail;
- external or concurrent changes must be reconciled before replacing a local edit;
- being near a File on the Canvas does not grant access to its content.

## Continue

- See the [Connections matrix](./connections.md), including File + Terminal and CodingAgent + File.
- Learn how [CodingAgents see the graph](./coding-agents-and-canvas.md).
- Combine a File with a [Sticky Note](./sticky-note.md) to separate canonical source from working memory.
- [Close your first loop](./first-loop.md) with intent, implementation, evidence, and review.
