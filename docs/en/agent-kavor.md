---
id: agent-kavor
title: "Agent Kavor: talk to your agents through Channels"
description: Link WhatsApp, choose a CodingAgent, and participate through Self-chat or a dedicated Workspace group.
kind: guide
lastReviewedAt: 2026-10-24
canonicalUrl: https://agentkavor.com/en/docs/agent-kavor
---

# Agent Kavor: take the conversation with you

Leave a CodingAgent working and step away from your computer without losing touch. Agent Kavor lets you send
requests, follow responses, and participate in decisions through **Channels**. **WhatsApp** is the first available Channel.

Agent Kavor is not another model or a hosted agent replacing your CodingAgents. It is the experience of talking to
them through Channels while work stays in Kavor Workspaces. A Channel is not a Node or a Canvas Connection: it carries
the conversation; the graph still defines the agent's context and capabilities.

## Before you start

- Keep Kavor running and signed in on the desktop, with network access. The computer must remain awake.
- Have a Workspace and a configured CodingAgent, including its harness and authentication.
- Use a WhatsApp account you can link as a device. Self-chat is the shortest path to getting started.

Requests remain subject to CodingAgent configuration, provider limits, and human controls. A message on your phone
does not bypass an approval waiting on the desktop.

## 1. Link your account on the desktop

1. Open **Channels** in Kavor's header.
2. Start linking WhatsApp. Scan the QR code or choose **Link with a code**, then confirm the link in the corresponding
   WhatsApp account. The linking code is not SMS sign-in.
3. Wait for connection confirmation. A successful explicit linking attempt enables the Channel.
4. Under **Personal chat**, choose **Self-chat**. When linking another account, you can also configure **Another number**
   as the personal destination. Settings save automatically.

![Desktop Channels setup with WhatsApp connected, Self-chat selected, and Workspace group configuration](https://media.agentkavor.com/releases/2.0.0/whatsapp/setup/master.2552b26a5322.png)

The setup test sends to the displayed personal destination; it neither starts CodingAgent work nor broadcasts to
every group. Check the destination before using it.

## 2. Choose the Workspace and agent in Self-chat

Open your personal WhatsApp conversation. Onboarding offers a Workspace selection followed by a CodingAgent
selection. Answer those choices and check the confirmed context before sending your first request.

![WhatsApp onboarding with a selected Workspace and CodingAgent and confirmation of the conversation context](https://media.agentkavor.com/releases/2.0.0/whatsapp/onboarding/poster-framed.7636ed112536.png)

[Watch Workspace and agent selection in WhatsApp →](https://agentkavor.com/en/videos/whatsapp-onboarding)

The personal conversation retains its selection. Check or change context without linking again:

| Your goal | Command |
| --- | --- |
| Check the selected Workspace and agent | `/context` |
| List Workspaces | `/workspaces` |
| Switch Workspace in the personal conversation | `/workspace "My project"` |
| List that Workspace's agents | `/agents` |
| Choose the default agent | `/agent "Reviewer"` |
| Read runtime state without requesting analysis | `/status` |
| See available commands and examples | `/help` |

Use the real names displayed by Kavor. Address another agent without changing the default with an explicit mention
such as `@Reviewer`. Status reports runtime state; it does not prove an implementation passed tests or review.

### Check and choose the CodingAgent's account

In the selected Workspace, `/accounts` shows usage, renewals, and reserve accounts by provider. `/account` reports
the selected CodingAgent's account and mode; `/status` also includes this information.

To pin an existing account or return to automatic selection, use the account's real name:

```text
@Reviewer /account "Trabalho"
@Reviewer /account auto
/autorotate codex off
```

The last command turns off **Auto Rotate** for Codex in that Workspace; it does not move running agents. These are
structured Kavor controls, not requests for model analysis. Choosing another account follows the same validation
and safe turn boundary as the desktop; a command response does not prove the switch has finished.

Adding accounts, signing in, signing out, removing accounts, and choosing participation or the Workspace's default
account remain actions in the desktop Accounts panel. See [CodingAgent Accounts](./coding-agent-accounts.md#agent-kavor-commands)
for the full syntax, examples, and the effect of each choice. The rules governing who can send commands through the
Channel remain unchanged.

## 3. Participate remotely

Send a clear request to the selected agent. For example:

> Check the test results for the task in progress. Do not change code. Tell me what passed, what failed, and which
> evidence you could inspect.

Follow progress and the response in the same conversation. If the agent needs a decision, answer the corresponding
question using the offered choices or requested format. Submission confirmation is not completion confirmation.

Short status notices keep their context and text on the same line without stripping formatting. That line can wrap
naturally on a narrow screen. Full responses, questions, and long content retain their own layout.

[Watch a remote request and the CodingAgent's complete response →](https://agentkavor.com/en/videos/whatsapp-agent-interaction)

### Receive updates without starting another WhatsApp request

You can ask the CodingAgent, including from its desktop session, to publish a result to an already configured
conversation. For example:

> When you finish this review, send the summary to this Workspace's WhatsApp group. Do not publish to other conversations.

The agent discovers enabled conversations in its Workspace and explicitly selects a destination. A Channel can have
several conversations: this is neither a broadcast to every group nor an automatic mirror of the agent's terminal.

This notice does not need to reply to an earlier WhatsApp message. A response to an incoming request, however, returns
to its original conversation even if you later change the Workspace or default agent. Quoting a known CodingAgent
response directs the new request to that response's author without changing the conversation's default agent.

### Send audio while keeping the original

You can send a recording on its own or with text. Before delivering that request to any recipient CodingAgent,
Kavor automatically prepares a transcript and labels it as text generated from audio. The caption, original file,
and recipient selection are preserved; the transcript may contain errors and does not replace the recording.

Agents receiving the same request use the same result. Resending the exact request or recovering its context reuses
that audio's reference rather than requesting a different transcript for each agent. The transcription limit is
**25 MB per audio file (25,000,000 bytes)**, separate from original attachment storage.

Speaking a command such as `/shutdown` does not activate Kavor's control: transcribed speech is request content, not
command-parser input. Use the corresponding written command to operate a control.

If preparation fails, you receive a notice in the original conversation and waiting agents do not receive that request.
Follow the notice or send the request as text. An unreadable recording or one without speech may need another audio
file; an oversized recording can be replaced with a shorter one. A service failure or usage limit does not mean the
CodingAgent started working. If the result is unconfirmed, do not assume success or an automatic retry.

Transcription uses an authenticated cloud service and requires a network connection; it is not fully offline.
Your computer still runs your CodingAgents, and the original audio keeps the same access and expiry period.

### Images, videos, and other files

You can also exchange images, videos, and files, with or without text. Images require native input or a reading tool
compatible with the selected harness and model. Videos are provided as original files on a best-effort basis, without
promising that every agent can interpret them. Kavor does not automatically convert videos or extract frames.

Managed attachments and their temporary copies expire **seven days after a successful upload**. Reading, retrying,
and transcription do not extend that period. Send an expired attachment again; expiration does not delete your
original files or message text.

## 4. Separate projects into Workspace groups

Use a group for a persistent project conversation without switching Workspace in Self-chat.

1. After linking, select the desired Workspaces under **Workspace groups** and confirm group creation. You can also
   manage the association in the Workspace's Channels tab and select an existing group.
2. Check each Workspace's result. A new group is named `Kavor · Workspace name`.
3. Open the group and choose a CodingAgent using `/agents` and `/agent "Name"`, or mention one explicitly.

The group has a fixed Workspace. Its default agent can change within that project; `/workspace` cannot switch the
group to another project. New Workspaces do not receive groups automatically.

In the Workspace's Channels tab, **Check group** checks whether the linked account can still access the group.
A group unavailable to that account is not necessarily deleted. A temporary connection failure does not
automatically remove its association either.

To change the association, use **Remove group link** and confirm. This unlinks only that Workspace, preserving the
WhatsApp group, phone pairing, accepted history, and other Workspaces. You can then choose another group or create
one. If creation has not been confirmed, check its outcome before repeating the action.

[Watch a dedicated Workspace group being created and opened →](https://agentkavor.com/en/videos/whatsapp-workspace-group)

**Choose participants carefully.** By default, **All messages** lets participants send requests and answer questions.
**Mentions & replies** requires a mention of the linked account, the `@kavor` marker, or a reply quoting a Kavor
message. This filters activation; it is not a per-person permission system. Adding people can delegate access to
your agents' work.

## Connection, privacy, and recovery

- **Computer unavailable:** WhatsApp does not turn Kavor into a hosted service. Restore the desktop and check actual
  state before resending an action that may already have produced effects.
- **No agent response:** check `/context` and `/status`, then look for authentication, dialogs, or pending approvals
  on the desktop. Silence is neither success nor permission to repeat a destructive request.
- **Connection interrupted:** use Channels' reconnect controls. Stopping preserves the saved link; unlinking is a
  different action. Automatic reconnection must not undo an explicit stop or disable choice.
- **Outdated question or selection:** check context and request a fresh selection. Do not assume an old option still
  identifies the same target.
- **Privacy boundaries:** execution and linking credentials stay on the computer, but messages use WhatsApp services
  and attachments use temporary Kavor-managed storage. Incoming audio also uses cloud transcription. Send only
  content you can share.
- **WhatsApp boundaries:** this uses linked devices, not Meta's hosted WhatsApp Business API. Account rules,
  restrictions, and suspensions remain under Meta's control.

## Continue

- Understand [what a CodingAgent can do in the graph](./coding-agent.md).
- Organize [messages and collaboration between agents](./coding-agents-and-canvas.md).
- Check [Connection delivery modes and Guardrails](./connections.md).
- [Suggest another Channel with a real use case](https://github.com/digows/agentkavor-community/discussions/new?category=ideas).
