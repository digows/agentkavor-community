---
id: sticky-note
title: "Sticky Note: shared working memory"
description: Use a Sticky Note to record status, findings, and attention points with your CodingAgents without turning every working note into a Specification.
kind: guide
lastReviewedAt: 2026-10-08
canonicalUrl: https://agentkavor.com/en/docs/sticky-note
---

# A Sticky Note is small, but it keeps the work visible

A Sticky Note starts as a post-it for humans. Connected to a CodingAgent, it becomes shared working memory: you
and the agent can record what matters during a turn without depending on a conversation that will soon be buried.

![A Specification, a CodingAgent, and a Sticky Note sharing observations on the Kavor Canvas](https://media.agentkavor.com/demos/spec-agent-notes/poster.463994b8b377.jpg)

[See the agent working with the Specification and notes →](https://agentkavor.com/en/videos/spec-agent-notes)

*Shared notes keep observations, open decisions, and next steps visible beside the graph.*

## What a Sticky Note does

A Sticky Note is useful even without an agent. Write a question, hypothesis, reminder, or short list of things you
want to watch. Its value grows when the content becomes part of the same graph of work.

With a Connection to a CodingAgent, the agent can read and update the note with you. Use it to keep:

- a **done / doing / next** summary;
- an open decision while forming a Specification;
- an attention point you want to review later;
- findings discovered during implementation;
- findings from an independent review;
- a handoff checklist shared by graph participants.

The note is deliberately informal. It makes work transparent in both directions: you see what the agent noticed,
and the agent gets an explicit surface for preserving what should remain visible.

## Three ways to use it

### 1. Memory for your turn

Before you start, write the goal and the questions that cannot disappear. During the work, add short facts, links,
or provisional decisions. At the end, leave the next steps clear for when you return to the Workspace.

A simple format works well:

- **Status:** done, doing, next.
- **Attention:** what needs your decision or inspection.
- **Evidence:** the check, file, or observation that supports the note.

### 2. A second hand for the CodingAgent

Connect the Sticky Note to the agent and ask it to record only facts that will help with your next decision:

> Keep the Sticky Note as a short turn summary. Record changes, evidence, risks, and questions that need my decision. Do not turn hypotheses into final decisions.

The agent can append separate blocks or replace the content when you ask for a complete reorganization. The content
remains editable by the human, and every change must respect the note's latest version.

If the note already contains your observations, specify what the agent may update. A populated note is not an
invitation to reorganize it unprompted. A more bounded instruction is:

> Maintain this Sticky Note during the investigation. Preserve my notes and the Reviewer's entries. Add only your
> verified findings and update only items identified with your name. Ask my permission before reorganizing the body.

### 3. A bridge between implementation and review

A Builder can record what changed and which checks ran. A Reviewer can add findings and risks. You can follow both
without searching through two separate sessions.

```text
Specification — Builder — Reviewer
                         │
                    Sticky Note
```

The drawing above represents Nodes in the same graph. A Connection between CodingAgents is not an automatic workflow
sequence; it makes participants reachable and enables message exchange.

## Example: a note that helps you resume work

When investigating a login failure, you do not need to turn every observation into an architectural decision. Use a
note to preserve the finding, the evidence, and the question that remains open:

```markdown
## Done
- Reproduced the failure after the session expired.
- Login with a new session still works.

## Doing
- Comparing the expired-session response with the client's handling.

## Human attention
- Decide whether the client should renew the session or ask for a new login.
- Hypothesis: the retry repeats the request with the old credential. Not yet confirmed.

## Evidence
- Terminal Checks: reproduction command and observed response.
- Client File: the point where the retry starts.

## Next
- Confirm the hypothesis before editing the client.
```

Ask the agent:

> Add verified findings and questions to the note. Preserve my observations. When a hypothesis is confirmed or
> ruled out, update its status with the evidence. If the decision defines the scope of a fix, take it to the
> corresponding Specification and leave a short reference here.

For a review, a separate block can record **scenario, observed behavior, evidence, and next step**. This distinguishes
what the Builder completed from what the Reviewer verified.

Use a targeted update or a new block when there is only one finding. Ask for the body to be reorganized when old
statuses accumulate; preserve open decisions and your observations. The result should let you resume the turn without
rereading every conversation.

## Sharing a note does not mean taking ownership

A path of Connections makes the note reachable for reading and authorized writes. It does not ask every agent in
the graph to start reporting there automatically.

Without your request, automatic reporting is limited to a Sticky Note **directly connected to that CodingAgent**
that was empty when it first encountered it. The agent uses a short list, identifying each entry with its name:

```markdown
- [x] Builder — done: reproduced the expired-session failure.
- [ ] Builder — doing: checking the client's retry handling.
- [ ] Builder — will: verify the fix against the Specification.
```

The agent updates only its own entries at meaningful work boundaries. It must not complete, rewrite, or remove
your entries or a peer's. A populated note requires an explicit maintenance request; reachability through another
route or a colleague's Connection does not authorize proactive reporting.

If you clear a note the agent was already writing to, it should leave it empty until you ask it to resume.
Shared memory must not take away your control over what stays on the Canvas.

These are collaboration instructions, not a technical block on every possible edit. To prevent writes through
Kavor operations, use `sticky_note_read_only` on the direct Connection.

## Markdown, editing, and conflicts

A Sticky Note accepts Markdown for headings, lists, tasks, emphasis, code, and other common working-note elements.
Raw HTML is not accepted. A note holds up to 64,000 Unicode code points and offers four colors for visual grouping;
color does not change the authority of the content.

Kavor saves changes automatically and signals when another participant changed the note before your save. Instead of
silently discarding the concurrent change, the interface lets you resolve the conflict. A write can append a new
block or replace the complete body.

## What it should not be

Do not use a Sticky Note as a substitute for everything:

- a stable decision with scope and acceptance criteria belongs in a [Specification](./specification.md);
- source code and other canonical artifacts belong in a [File](./file.md);
- commands and execution evidence belong in the [Terminal](./terminal.md);
- a message coordinates participants, but should not be the only record of an important decision.

The best note is short enough to read and rich enough that the next step does not depend on one session's memory.

## Guardrail and reachability

A Sticky Note is available to a CodingAgent only through a valid path of [Connections](./connections.md). Visual
proximity on the Canvas or mentioning the Node in a message does not grant access.

You can place the sticky_note_read_only Guardrail on the direct Connection between the agent and the note. The agent
can still consult it, but cannot append or replace it through Kavor operations. The Guardrail restricts that direct pair;
it does not create a Connection or turn the note into a Workspace-wide policy.

## Continue

- [Understand the Node model](./nodes.md).
- [Choose the smallest set of Connections](./connections.md) for the work.
- [Close your first loop](./first-loop.md) with a Specification, CodingAgents, Terminal, and Sticky Note.
