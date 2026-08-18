---
id: specification
title: "Specification in Kavor: think carefully once, implement better"
description: Structure intent, decisions, and criteria in durable Markdown, organize multiple roots, and guide the Specification lifecycle.
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/en/docs/specification
---

# Specification in Kavor: think carefully once, implement better

A Specification turns intent into a durable contract that humans and CodingAgents can read, discuss, implement,
and review without depending on the memory of a single conversation.

It can define architecture, an integration, domain modeling, a feature, a module, or a bounded set of fixes. Its size
can vary; its responsibility does not: explain what must be true before the work is considered complete.

![Kavor Workspace Settings with four configured Specification roots.](https://media.agentkavor.com/releases/1.4.0/multiple-specification-roots/article.7d42383e3a37.jpg)

## The source of truth is a file

A Specification's content lives in Markdown inside your Workspace. The file is yours: open it in Kavor, edit it with
other tools, version it in Git, and let CodingAgents read it directly.

Kavor keeps only operational metadata around that source, such as identity, status, and outputs. Frontmatter
preserves the identity used to follow a Specification when its file is moved or renamed.

Do not manually edit fields controlled by Kavor in the frontmatter. Write the contract in the body; let product
operations update identity and lifecycle.

## Write it yourself or with a CodingAgent

You can start manually or co-author it with a CodingAgent. For a difficult subject, a planning-focused session and
more reasoning capacity before implementation may be worthwhile.

A good starting point is:

> Interview me about subject X so we can write Specification Y. Separate verified facts, decisions, assumptions,
> non-goals, failure scenarios, and observable acceptance criteria. Do not treat the document as Ready while any
> unresolved decision could change the solution.

Better thinking here can reduce rework, wasted context, and ambiguous implementation. It does not guarantee lower
cost: a bad Specification remains bad even when it is long or written by an expensive model.

## A minimum contract that can guide work

A useful Specification normally includes:

- context and the current problem;
- objective and definition of success;
- non-goals that bound scope;
- decisions and constraints;
- the intended approach when already decided;
- observable acceptance criteria;
- relevant failure scenarios and risks;
- open questions;
- references to code, ADRs, issues, or other Specifications.

The document does not need a fixed ritual when the Workspace has a better convention. It must, however, distinguish
decisions from hypotheses and let someone assess the result without reconstructing the original conversation.

## Lifecycle is guidance, not decoration

Kavor uses five states:

| State | Practical meaning |
| --- | --- |
| **Draft** | The problem is still being investigated, discussed, or decided. |
| **Ready** | The contract has enough information to start implementation safely. |
| **In progress** | Work authorized by the Specification is under way. |
| **Blocked** | A concrete condition prevents meaningful progress. |
| **Done** | The objective has been achieved and no work required by the contract remains. |

Status is deliberately advisory. Kavor does not turn Markdown checkboxes into a proprietary system or prove by
itself that every criterion was satisfied. Treating work as Done still requires evidence and judgment.

A strong practice is to separate authorship, implementation, and review. The CodingAgent that helped write the
contract can clarify it; another implements; an independent Reviewer compares the result with its criteria.

## Organize more than one Specification root

A Workspace can keep Specifications in more than one folder. This helps when one project already separates product,
engineering, operations, or module decisions—or when a single root has become difficult to navigate.

Open Workspace Settings and use **Specification roots** to add, remove, or reorder folders. Roots are:

- relative to the Workspace directory;
- ordered;
- unique and non-overlapping;
- limited to 32 per Workspace.

The first root is **Primary** and receives new Specifications by default. Reordering changes that default destination;
it does not move existing files. Removing a root does not delete its files either. Specifications outside configured
roots leave the active listing and can return when the root is added again.

When more than one root exists, the Specifications panel groups first by root and then by actual filesystem folders.
The Canvas does not create a parallel taxonomy: organization remains the file structure you already own.

### A simple root layout

```text
docs/         general product decisions and contracts
specs/        features and integrations being implemented
marketing/    campaigns and editorial experiments
operations/   maintenance and operational changes
```

Do not create roots only to shorten a list. Use them when each folder represents a durable boundary that humans and
agents can understand.

## What a Specification gains from the graph

A Specification accepts two direct Connections:

- **Specification + CodingAgent** puts the contract within the agent's reach and enables lifecycle and outputs. The
  Connection may carry `specification_read_only`.
- **Specification + Terminal** exports the Markdown file's canonical absolute path through an environment variable
  configured on the Connection.

Other CodingAgents in the same component can also reach the Specification through valid paths. You do not need to
repeat a direct Connection for every participant unless it improves topology readability or needs a Guardrail for
that specific pair.

## Three uses that justify a Specification

### Architectural foundation

Record invariants, allowed dependencies, security boundaries, migration strategy, and verifiable criteria. The
document can guide later features without requiring every agent to rediscover the foundation.

### Feature with independent implementation and review

A Spec Writer exhausts decisions and moves the contract to Ready. An Implementer works from it. A Reviewer checks
behavior, failures, and evidence. Outputs keep commits or other results attached to the work.

### A bounded series of fixes

When several defects share a cause or surface, a Specification can define expected behavior, the exact correction
set, and regression tests. If it becomes an endless bug list with no shared boundary, it has lost its role as a
contract.

## A practical graph

```text
Spec Writer — Specification — Implementer — Reviewer
                        │
                     Terminal
```

The Spec Writer records decisions. The Implementer executes only a Ready contract. The Reviewer compares results
and criteria. The Terminal provides evidence. The decision to treat the work as Done remains human.

## What to avoid

- Leaving Draft because the text looks long, without resolving decisions that change the solution.
- Keeping analysis, Specification, implementation, and review in the same session for convenience.
- Writing criteria such as “works correctly” or “has good performance” without an observable result.
- Editing Kavor-controlled frontmatter as ordinary content.
- Treating status as automatic proof of quality or completion.
- Creating overlapping roots or multiple roots without a durable editorial boundary.
- Keeping the only relevant decision in a conversation or message the next participant will not find.

## Before moving to Ready

Confirm:

- are the problem, objective, and non-goals clear?
- are facts, decisions, and hypotheses separated?
- have relevant failure scenarios been addressed?
- can acceptance criteria be verified?
- will the Implementer know what may and may not change?
- can the Reviewer assess the result without inheriting the author's reasoning?
- have questions that could change the solution been answered?

A good Specification does not try to predict every line of code. It removes enough ambiguity for execution and
review to be independent, verifiable, and recoverable.

Continue with [Close your first loop in Kavor](./first-loop.md), choose participants in
[CodingAgents and roles](./agents-and-roles.md), or review the [Connections matrix](./connections.md).
