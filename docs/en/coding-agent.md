---
id: coding-agent
title: "CodingAgent in Kavor: your favorite harness as part of a graph"
description: Choose a provider, preserve its native experience, and connect the CodingAgent to the right context, tools, and participants.
kind: guide
lastReviewedAt: 2026-10-29
canonicalUrl: https://agentkavor.com/en/docs/coding-agent
---

# CodingAgent in Kavor: your favorite harness as part of a graph

A CodingAgent is your coding agent running through its provider's native interface, now as a visible participant on
the Canvas.

Kavor does not replace each harness with a generic chat. It preserves the provider experience and adds structure
around it: an explicit responsibility, reachable context, tools, other CodingAgents, and boundaries you can inspect.

![Kavor toolbar provider selector before adding a CodingAgent to the Canvas](https://media.agentkavor.com/demos/coding-agent-provider-selector/poster.22c2dccb70c5.jpg)

[See how to select a CodingAgent provider →](https://agentkavor.com/en/videos/coding-agent-provider-selector)

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

## Accounts, usage, and rotation

You can monitor provider usage in the header and open the **Accounts** panel to add accounts, choose which ones
participate in each Workspace, and use **Automatic** selection or a fixed account. Your native login remains
available; setting up other accounts is optional and does not replace the login used by the provider's own apps.

The [CodingAgent Accounts guide](./coding-agent-accounts.md) explains usage windows, distribution across Workspaces,
the initial copy of preferences, switching accounts with session continuity, and each provider's limits.

## What it can do on its own

Without any Connection, a CodingAgent is still a provider-native session inside the Workspace. You can talk to it,
use the tools the harness provides, and choose its working directory. That directory may be outside the Workspace
root when the role needs another repository or worktree; its association remains explicit in the session.

The Node already helps separate contexts: one session can investigate while another implements. Without a graph,
however, shared context still depends on what you put into each conversation.

A Connection turns the isolated session into a participant in a system of work.

### Provide a file or screenshot in the input

In an open session, you can paste operating-system clipboard files or PNG/JPEG images. Kavor inserts a file reference
without creating a File or Connection on the Canvas. Check the path and write your request before submitting it;
interpreting the image still depends on the harness.

The [Terminal guide](./terminal.md#paste-files-and-images-into-session-input) explains the procedure, limits, and
difference between a pasted reference and a resource kept in the graph.

## Start, restart, or shut down execution

The Node and the provider process are different things. A CodingAgent can remain on the Canvas while its execution is stopped.

- **Start** opens a stopped session in the selected directory. Repeating Start on a running session does not create another process.
- **Restart** closes the current process and starts its replacement, keeping the account, working root and intent to resume the native session. It neither clears history nor undoes project changes.
- **Shutdown** ends execution without deleting the Node or native history. Use Start when you want to run it again.

Kavor shows preparation stages and reports when the provider is ready or startup has failed. Pending approval remains yours: starting or restarting does not authorize an agent to answer it for you.

If startup fails, read the error before repeating it. Fix the missing directory, installation, authentication or other reported requirement, then use **Retry**. A new attempt is not the previous session or confirmation that the task ran.

## Separate work with Git worktrees

A new conversation separates context. A Git worktree also separates the checkout, with its own directory, files and index. Two CodingAgents can work on different branches without switching the shared checkout's branch.

In the CodingAgent's **Git** control:

1. Select a base reference and a worktree name.
2. Use **Create** to create a managed worktree under `.worktrees/` and associate it with that CodingAgent.
3. Or select **Use** on an existing worktree to choose its directory.
4. Check the displayed root and branch before requesting edits or commits.

**Workspace root → Use** returns the CodingAgent to the Workspace root without removing the previous worktree. Creating or selecting an agent worktree does not change the shared checkout's branch, index or files. Later merge and cleanup operations are separate decisions.

When a running CodingAgent's Git association changes, Kavor relaunches it in the selected root, preserving the native identity for resumption where the provider supports it. A deliberately stopped session stays stopped. If resumption fails, the error remains visible for correction and Retry; changing roots is not proof of readiness.

A worktree is not a complete copy of the local environment. Installed dependencies and untracked files, such as local configuration, may be absent. Prepare what the project requires without automatically copying credentials. A missing path or invalid worktree must be repaired before startup, not silently replaced with another directory.

Removing a worktree is different from removing its Node. Kavor refuses to remove or finish a worktree still referenced by another CodingAgent. If its folder was removed outside Kavor, inspect Git state and recover the association before continuing.

## Continue along another path with Fork

**Fork** creates another CodingAgent from an existing session's native history. The source remains independent; the new Node receives a different session identity and a Connection to whoever requested the Fork.

Use it to explore an alternative without restarting the conversation, or branch an investigation from established context. Then define the new CodingAgent's objective and stopping condition.

Support depends on the provider and installed version. Claude Code, Codex, Grok and OpenCode have Fork integrations; Antigravity does not offer this capability in Kavor. A forkable native session must exist. If history is unavailable or the provider rejects the operation, Kavor reports failure rather than presenting an empty conversation as a Fork.

Fork does not create a Git branch, prepare dependencies or isolate files by itself. By default, the new session uses the source root; select a separate, prepared worktree when the alternative also needs code isolation. Copying and pasting a Canvas Node is not a replacement for Fork either: a copy does not carry native session history.

## Talk through Channels

You can also talk to this same CodingAgent through a Channel, starting with WhatsApp. The agent stays on your desktop with its Workspace context and limits; remote conversation neither replaces the harness nor creates another cloud agent. See [Agent Kavor and Channels](./agent-kavor.md) to set up the conversation and select its recipient.

You can ask the CodingAgent to publish a result to an enabled conversation in that Workspace, even when work began
on the desktop. This selects an explicit destination; it is neither a message to another CodingAgent nor a broadcast
to every Channel. A reply to a human request, meanwhile, keeps the original conversation.
See [how to receive updates without starting another WhatsApp request](./agent-kavor.md#receive-updates-without-starting-another-whatsapp-request).

The same guide explains automatic preparation of incoming audio, preservation of the original, and the real limits
of images and videos. These features do not make every provider a universal media reader or bypass desktop approvals.

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
| **CodingAgent + WebBrowser** | Allows the agent to observe and operate that WebBrowser's real pages in the same state visible to the human. |
| **CodingAgent + CodingAgent** | Joins participants in one component. Reachable CodingAgents can exchange asynchronous messages and inspect the context needed to coordinate. |
| **Trigger + CodingAgent** | Selects that active session as the direct target of a scheduled prompt. A Trigger does not start a session you closed. |

Reachability does not erase direct contracts. If the exact Connection between a CodingAgent and a resource has a
Guardrail, that restriction still governs the pair even when another route exists through the graph.

## Useful patterns

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

### Work with a live page

Connect a WebBrowser when the task depends on a real web interface. You keep seeing and using the same tabs while the
CodingAgent can navigate, interact, wait for changes, and capture evidence without reconstructing the page from text
pasted into chat.

The WebBrowser can stay alive when you switch Workspaces and return in the same state. This lets the agent continue
already authorized work without reloading the page at every visual context switch.

![CodingAgent and WebBrowser connected on the Canvas](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)

[See a CodingAgent working with WebBrowser →](https://agentkavor.com/en/videos/web-browser-node)

### Inspect another CodingAgent's current session

A reachable CodingAgent can passively page through completed turns from another CodingAgent's current provider-native
session. This recovers reasoning, evidence, and context that has not yet become a message or durable output.

The read does not send provider input, activate the inspected session, or replace a message when the other agent
needs to act, decide, or answer. If that session changes during pagination, the old continuation is rejected; the
reader must start again instead of mixing different histories.

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

Paste into the Implementer with a Specification ready for implementation, relevant Files and a reachable Terminal. The Reviewer must share the graph to receive the request.

```prompt
Implement only the scope defined in the reachable Specification. Before changing code, identify the relevant
Files and checks. Use the Terminal to produce evidence, record the result as a Specification output, and ask the
Reviewer for an independent assessment. Stop if a required decision falls outside the contract.
```

**Expected result:** A scoped delivery records actual changes and checks, followed by a review request. Missing context or contract decisions are reported as pending.

For a Reviewer:

Paste into the Reviewer after the Implementer identifies the delivery and stabilizes the commit or diff. Make the Specification and evidence reachable.

```prompt
Compare the implementation and evidence with the Specification criteria. Look for incorrect behavior, missing
scenarios, regressions, and operational risks. Record concrete findings before suggesting changes, and do not
approve the work merely because existing tests passed.
```

**Expected result:** The review reports verifiable findings or the criteria examined without identified blockers. Passing existing tests does not replace review.

## Example: a handoff the Reviewer can verify

Imagine a fix to a registration form. The Specification requires an invalid email address to show a message,
submission to be blocked, and a valid email address to keep working. Use the graph above and keep Builder and Reviewer
in separate sessions.

Request to the Builder:

Use with the Builder after adapting the Specification to the real form. Keep the Terminal and Reviewer in the same graph; publication is outside this request.

```prompt
Implement the validation defined in the Specification. Preserve the valid path's behavior. Run the relevant tests
in the Terminal and record changed files, commands, and results. Then send the Reviewer the Specification handle
and the exact commit or diff to review. Report outstanding items and stop before publishing.
```

**Expected result:** The Builder identifies the delivery and references canonical review context, without claiming checks it did not execute.

A useful handoff identifies the deliverable instead of copying the entire conversation:

> The implementation is in the commit referenced in the Specification outputs. The invalid, empty, and valid email
> tests passed in Terminal Checks. Review the criteria and failure paths in that commit. Record findings with the
> file, scenario, and evidence; reply when finished. Do not change code during this review.

Request to the Reviewer:

Use with the Reviewer when the referenced delivery is stable. Make the Specification and Sticky Note reachable and authorize recording the review in the note.

```prompt
Read the contract and examine the referenced deliverable. Verify each criterion, reproduce the relevant scenarios,
and add your conclusions to the Sticky Note. Distinguish a demonstrated defect from a hypothesis. If you find a
blocker, explain which behavior fails and send it back to the Builder for correction.
```

**Expected result:** Criteria receive an evidence-based assessment. Findings return to the Builder; missing evidence is a limitation, not approval.

The expected result is an identifiable change, an independent review, and your evidence-based decision. If the
Builder is still changing the deliverable, wait for it to stabilize or explicitly define what is ready for review.
Two agents looking at different code revisions are not assessing the same deliverable.

## Limits that matter

- A CodingAgent does not receive access from visual proximity; a path of Connections must exist.
- Referencing a Node in a message does not grant access to it.
- Passively reading another CodingAgent's session does not activate it or transfer a durable decision into the
  Specification.
- A Guardrail restricts the direct pair it belongs to; it is not a global Workspace policy.
- Messages coordinate work, but must not be the only place where a durable decision lives.
- Providers do not necessarily expose the same models, permissions, events, or session operations.
- A Trigger delivers a prompt to an active session; it does not expand permissions or guarantee an external effect
  happens exactly once.
- With `Allow workspace editing`, a CodingAgent can control sessions and remove reachable Nodes within the authorized request. This does not permit changing Guardrails or bypassing human approvals. See the [Canvas editing boundaries](./coding-agents-and-canvas.md#allow-workspace-editing).

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
