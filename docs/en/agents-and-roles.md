---
id: agents-and-roles
title: How to choose CodingAgents and define roles in Kavor
description: Learn how to split work across CodingAgents, preserve shared context, and choose provider, model, and effort for each responsibility.
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/en/docs/agents-and-roles
---

# How to choose CodingAgents and define roles in Kavor

Choosing a CodingAgent does not begin with the provider. It begins with the responsibility the agent should own.

One session can analyze the problem, write the Specification, implement the change, review it, and prepare the
release. That can look simpler because fewer participants are involved, but it concentrates different goals in the
same context window. Implementation carries the entire investigation that came before it, review inherits the
assumptions of the author, and release preparation competes for attention with decisions that should already live
outside the session.

Kavor lets you divide those responsibilities across CodingAgents without turning the work into isolated chats. The
participants form a graph around durable resources such as Specifications, Files, and Sticky Notes. Connections form
reachable context: any CodingAgent can work with Nodes in its component and message other reachable CodingAgents.
Messages support handoffs and discussion, and the final decision remains yours.

[![Spec Writer, Builder, Reviewer, and Shipper connected on a Kavor Canvas](https://media.agentkavor.com/editorial/agents-and-roles/graph.6c35b0b2fdc5.jpg)](https://agentkavor.com/en/videos/agents-and-roles)

[See four roles form a working graph →](https://agentkavor.com/en/videos/agents-and-roles)

## Start with the work, not the agent

Before adding a CodingAgent to the Canvas, write one sentence explaining why it exists. A useful definition contains:

- one primary responsibility;
- the context needed to fulfill it;
- the result it should produce;
- the condition under which it should stop.

“Review the code” is still broad. “Compare the implementation with the Specification criteria, record findings, and
stop before changing the code” defines a verifiable role.

The same provider can fill different roles in separate sessions. Different providers can also fill the same role.
The role belongs to the work; provider, model, and effort are settings chosen to execute it.

## Four useful roles

Not every task needs all four roles below. They are boundaries for reasoning about the work, not an agent quota.

| Role | Main question | Essential context | Expected result |
| --- | --- | --- | --- |
| **Analyst or Spec Writer** | What must change, and which boundaries must remain? | Problem, constraints, decisions, and existing behavior | A clear Specification with scope and verifiable criteria |
| **Implementer** | How do we produce the change within the contract? | Specification, relevant Files, Terminal, and Workspace conventions | Implementation with checks and evidence |
| **Reviewer** | What is incorrect, incomplete, or risky? | Specification, changes, and verification results | Concrete findings or a review with no identified blockers |
| **Shipper** | Is the work ready to be delivered safely? | Specification, review, Git state, and release requirements | Release preparation, remaining risks, and evidence for the human decision |

For a small fix, one Implementer and human review may be enough. For a higher-risk change, separating Specification,
implementation, review, and delivery reduces the chance that one line of reasoning controls the entire cycle.

Separating roles does not require different providers. Two sessions from the same provider already isolate goals and
contexts. Combining providers can add another perspective and reduce correlated blind spots, but it does not replace
acceptance criteria or guarantee a better review.

## The graph is shared memory

Splitting work should not require copying the same prompt into several sessions. In Kavor, common context lives in
durable Nodes:

- the **Specification** preserves intent, scope, and criteria;
- **Files** keep relevant sources in the workflow;
- the **Sticky Note** records working observations and decisions;
- the **Terminal** provides the environment where commands and checks run;
- **CodingAgents** own distinct responsibilities around those resources.

This shared memory is not one conversation history growing forever. It is an explicit set of resources participants
can read and update through Connection paths. A direct Guardrail still governs its exact CodingAgent-resource pair
even when another route exists. When a session ends, the Specification, Files, notes, and evidence remain.

An implementation, review, and release graph can be pictured like this:

~~~text
Specification
    ├── Spec Writer
    ├── Implementer ↔ Reviewer
    └── Shipper

Durable context: Files · Sticky Note · Terminal · Specification outputs
~~~

This diagram shows responsibility boundaries, not Connection direction. Connections do not execute a sequence
automatically; they form a reachable component and make relationships, limits, and capabilities inspectable. Every
agent does not need a direct Connection to every resource.

## Split the context window too

Each role needs a different part of the problem. The Spec Writer may need to explore alternatives and constraints.
The Implementer needs the accepted contract, relevant files, and code conventions. The Reviewer needs the criteria,
the diff, and the evidence—not every conversation that led the Implementer to the solution.

This separation improves the ratio of useful context to total context:

- each CodingAgent receives a narrower goal;
- common resources stay in the Workspace instead of being repeated in prompts;
- details are retrieved when needed;
- review starts from the contract and the result, not the author’s accumulated justification;
- a long session stops carrying stages that are already complete.

Lower token usage can be a bonus, not a promise. A well-divided graph avoids repeated or irrelevant context; a graph
with too many agents, redundant messages, and vague roles can consume more. The goal is not to maximize the number of
CodingAgents. It is to give each token a clearer responsibility.

## Choose provider, model, and effort after the role

Once the responsibility is defined, configure the session for the task. Use the provider’s native controls to choose
model and effort when available.

Consider four factors:

1. **Ambiguity:** must the task discover the problem, or execute a clear contract?
2. **Risk:** would a failure be local and reversible, or affect security, data, architecture, or release?
3. **Tool use:** must the role explore code and run commands, or mainly analyze evidence?
4. **Coordination cost:** can a stronger session complete the role with fewer handoffs, or is a second perspective
   necessary?

Higher effort often makes sense for ambiguous Specifications, architecture decisions, and high-risk reviews.
Mechanical, well-bounded tasks can work with faster models or lower effort. Implementation varies with the size of the
change and the need to navigate and test the code.

Do not turn these guidelines into permanent assignments. “Provider A always implements” and “Provider B always
reviews” replace an engineering decision with habit. Re-evaluate the settings for each role and learn from the
quality of the evidence it produces.

## Use conversations for handoffs and parallel work

CodingAgents in the same graph do not need to work in silence or have a direct Connection. Any reachable pair can
exchange messages. Use Kavor messages when an agent needs to:

- hand an implementation over for review;
- ask the Specification author for clarification;
- discuss a finding before recording it as a blocker;
- return a correction for another verification;
- coordinate independent investigations that can run in parallel.

A useful message states:

- the goal of the handoff;
- which graph resources contain the context;
- what has already been done and verified;
- which action the recipient should take;
- where the result should be preserved.

Conversations are asynchronous and inspectable. They do not replace durable memory. A decision that must survive the
handoff should return to the Specification, a Sticky Note, or another suitable output; it should not remain hidden
only in messages.

Parallelize only work that can move forward without competing for the same decision or changing the same surface.
Two agents can investigate different hypotheses or review independent concerns. Two Implementers changing the same
files without an explicit split usually create more reconciliation than speed.

## What to avoid

### Concentrating the entire cycle in one session

Analysis, Specification, implementation, review, and release ask different questions and use different criteria.
Reusing one session for all of them also preserves its assumptions, distractions, and blind spots.

### Creating an agent for every subtask

Separation without independent responsibility adds messages, duplicated context, and coordination cost. If you
cannot describe a distinct result and stopping condition, you probably do not need another CodingAgent.

### Reusing the same settings for convenience

Insufficient model and effort settings degrade ambiguous or critical tasks. Excessive settings waste time and tokens
on mechanical work. Choose the configuration from the role’s risk and nature.

### Asking the Implementer to review its own reasoning

Self-review can find simple mistakes, but it does not create independence. When a second perspective matters, use
another session with explicit criteria and access to verifiable results.

### Keeping agents isolated

Manually copying messages between sessions fragments provenance and hides the handoff. Use Kavor conversations for
reviews, clarification, and parallel-work coordination.

### Leaving decisions only in messages

Messages coordinate participants. Specifications, Sticky Notes, and outputs preserve what the Workspace must
remember.

## Three designs to start with

### Small change

Use a Specification, one Implementer, and one Reviewer. Connect both agents to the necessary context and preserve
implementation and review in a Sticky Note or in Specification outputs. This is the smallest useful design; the video
on this page shows how the same logic grows through the Shipper without losing context.

### High-risk change

Separate Spec Writer, Implementer, Reviewer, and Shipper. Give the Reviewer explicit criteria and the independence to
challenge the implementation. The Shipper prepares delivery evidence but does not replace your decision to publish.

### Parallel investigation

Use two CodingAgents to explore different hypotheses or areas, with a third role responsible for reconciling their
results. Decide where each discovery will be recorded before starting, and use messages for questions and handoffs.

## Checklist before starting

For every CodingAgent, confirm:

- can I describe its role in one sentence?
- does it have an observable result and a stopping condition?
- does the reachable component provide the context and capabilities it needs without accidental resources?
- do provider, model, and effort match the ambiguity and risk?
- is it clear whom the agent should contact and why?
- will decisions and evidence be preserved outside the conversation?
- does adding this CodingAgent improve independence, parallelism, or quality enough to justify coordination?

A good Canvas is not the one with the most agents. It is the one that makes responsibility, context, handoffs,
evidence, and decisions clear to every participant—including you.

Read the dedicated [CodingAgent guide](./coding-agent.md), build this structure in
[Close your first loop in Kavor](./first-loop.md), learn [how CodingAgents see and build the Canvas](./coding-agents-and-canvas.md), or review the concepts in
[What is Kavor?](./what-is-kavor.md).
