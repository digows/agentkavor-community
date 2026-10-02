---
id: file
title: "File: context and scope on the Canvas"
description: Use a File to keep a canonical source visible, delimit a CodingAgent's context, and pass its path to a Terminal.
kind: guide
lastReviewedAt: 2026-10-01
canonicalUrl: https://agentkavor.com/en/docs/file
---

# A File is a file — and that is already powerful

A File is not a disposable attachment. It represents a canonical filesystem source on the Canvas, making clear
which material the work should read, review, edit, or use as input.

![A PDF displayed in a File Node and used by a CodingAgent on the Kavor Canvas](https://media.agentkavor.com/demos/pdf-canvas-agent/poster.7306bdccc7f5.jpg)

[Watch a PDF participate in Canvas work →](https://agentkavor.com/en/videos/pdf-canvas-agent)

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

## Examples: one Node, three kinds of input

### Code as the focus of a review

Add the HTTP client source as a File, connect a Reviewer, and keep a Sticky Note reachable for findings. Ask:

> Review the HTTP client File, especially timeouts, retries, and error handling. Use it as the focus of the analysis.
> If a conclusion depends on another file, identify that dependency before expanding the investigation. Record only
> findings supported by code or reproduction, and do not implement corrections.

Expect a focused review with a scenario and reference to the relevant code. The File makes the focus explicit; it is
not a sandbox for the harness's native tools. Bound the scope in your request and use the appropriate Guardrail for
Kavor operations.

### A PDF or image as a reference

Keep a requirements PDF or reference image in the same graph as the Specification and CodingAgent:

> Compare the File material with the Specification. Separate explicit requirements, interpretations, and questions.
> For each discrepancy, identify the page or element you observed and record the question in the Sticky Note. Do not
> invent content you cannot read.

Expect a verifiable comparison, not just a summary. Interpretation depends on the format and tools available in the
harness; Kavor's preview keeps the reference visible to you.

### A script as Terminal input

Create a File for a small Node.js script and configure its Connection to the Terminal with the name `CHECK_SCRIPT`:

```javascript
console.log('Canvas file connection is working');
```

Start the Terminal session after configuring the Connection and run:

```sh
test -n "$CHECK_SCRIPT" && node "$CHECK_SCRIPT"
```

Expect `Canvas file connection is working`. The variable holds the script's path. If it is empty, check the name on
the Connection and restart the session to receive the configuration. This example uses a POSIX shell and requires
Node.js; in PowerShell, read `$env:CHECK_SCRIPT` and run `node $env:CHECK_SCRIPT`.

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
