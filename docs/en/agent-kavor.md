---
id: agent-kavor
title: "Agent Kavor: talk to your agents through Channels"
description: Link WhatsApp, choose a CodingAgent, and participate through Self-chat or a dedicated Workspace group.
kind: guide
lastReviewedAt: 2026-10-16
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

## 3. Participate remotely

Send a clear request to the selected agent. For example:

> Check the test results for the task in progress. Do not change code. Tell me what passed, what failed, and which
> evidence you could inspect.

Follow progress and the response in the same conversation. If the agent needs a decision, answer the corresponding
question using the offered choices or requested format. Submission confirmation is not completion confirmation.

[Watch a remote request and the CodingAgent's complete response →](https://agentkavor.com/en/videos/whatsapp-agent-interaction)

Exchange images, video, audio, and files, with or without text. Interpretation depends on the harness and available
tools; Kavor does not promise automatic transcription or support for every media type in every agent.

Managed attachments and their temporary copies expire **seven days after a successful upload**. Reading or retrying
does not renew that period. Send an expired attachment again; expiration does not delete your original files or message text.

## 4. Separate projects into Workspace groups

Use a group for a persistent project conversation without switching Workspace in Self-chat.

1. After linking, select the desired Workspaces under **Workspace groups** and confirm group creation. You can also
   manage the association in the Workspace's Channels tab and select an existing group.
2. Check each Workspace's result. A new group is named `Kavor · Workspace name`.
3. Open the group and choose a CodingAgent using `/agents` and `/agent "Name"`, or mention one explicitly.

The group has a fixed Workspace. Its default agent can change within that project; `/workspace` cannot switch the
group to another project. New Workspaces do not receive groups automatically.

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
  and attachments use temporary Kavor-managed storage. Send only content you can share.
- **WhatsApp boundaries:** this uses linked devices, not Meta's hosted WhatsApp Business API. Account rules,
  restrictions, and suspensions remain under Meta's control.

## Continue

- Understand [what a CodingAgent can do in the graph](./coding-agent.md).
- Organize [messages and collaboration between agents](./coding-agents-and-canvas.md).
- Check [Connection delivery modes and Guardrails](./connections.md).
- [Suggest another Channel with a real use case](https://github.com/digows/agentkavor-community/discussions/new?category=ideas).
