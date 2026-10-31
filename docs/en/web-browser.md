---
id: web-browser
title: "WebBrowser: develop and test in front of your agent"
description: Use Kavor's shared WebBrowser to develop web applications, reproduce bugs, debug pages, and prove end-to-end flows.
kind: guide
lastReviewedAt: 2026-10-29
canonicalUrl: https://agentkavor.com/en/docs/web-browser
---

# WebBrowser puts the application in front of you and your agent

WebBrowser is a live Chromium surface inside the Canvas. A connected CodingAgent can observe, interact, wait,
debug, and test the page you are also seeing.

See the [WebBrowser demonstration in Kavor](https://agentkavor.com/en/videos/web-browser-node) in another tab while
you read this guide.

![A CodingAgent connected to the WebBrowser sharing the same visible page with the human](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)

## The browser as a development tool

To develop a web application, a CodingAgent needs more than files. It needs to open the application, interact with
it, wait for real states, and investigate what happened in the browser.

With a CodingAgent + WebBrowser Connection, the agent can use a broad operation surface mediated by Kavor:

- **observe:** read page state, obtain an accessibility snapshot, and capture screenshots;
- **interact:** click, fill fields, insert text, press keys, select options, check controls, scroll, drag, upload
  files, and respond to dialogs;
- **synchronize:** wait for a selector, text, URL, load state, network idle, or a specific condition;
- **debug:** inspect console messages, network requests, and retained response bodies;
- **test:** reproduce a bug, run an E2E flow, and preserve visual evidence of the result;
- **isolate scenarios:** block, continue, or fulfill network responses during a controlled test;
- **organize pages:** open, select, and close tabs, follow downloads, and handle authentication challenges.

The goal is not to hide the browser behind automation. It is to make state and actions verifiable while the agent
works.

## A practical loop for a web application

Start with a WebBrowser and a CodingAgent in the same component. If the application runs locally, connect the
Terminal that starts the server as well. A small loop can be:

```text
File / Specification — CodingAgent — WebBrowser
                              │
                           Terminal
```

Ask the agent to:

1. observe the page before acting;
2. reproduce the failing path;
3. collect console, network, or screenshot evidence;
4. change the code within the defined scope;
5. wait for the new state and repeat the flow;
6. record the result and remaining risks in a [Sticky Note](./sticky-note.md).

A useful starting prompt is:

Open the application in a reachable WebBrowser. Provide the URL and expected behavior; define any implementation scope in the Specification first.

```prompt
Open the connected application in WebBrowser. First observe the page and reproduce the flow without changing code. Then describe the likely cause, propose the smallest change, and validate the complete path with visual and console evidence.
```

**Expected result:** The agent starts with reproduction and evidence, not a presumed change. It must report missing authentication or required human intervention.

## Three examples of development with evidence

### Reproduce a form bug

With the server in the Terminal and the application open in WebBrowser, ask:

Use test data in an application you control, with the server and WebBrowser prepared. Authorize code corrections separately.

```prompt
Reproduce submission with an invalid email and then a valid address. Before editing code, record the fields' state,
displayed message, and whether a request occurred. After the authorized correction, repeat both paths and test
correcting the address without reloading the page.
```

**Expected result:** The review compares invalid, valid and recovery paths using visible state and observed network behavior, not just a success message.

Expect visible behavior together with observed requests. A screenshot of the message alone does not prove submission
was blocked; network evidence helps verify that criterion.

### Find out why the page is blank

Leave the affected page open in the reachable WebBrowser. Paste into the CodingAgent without authorizing code changes for this diagnosis.

```prompt
Observe the page, inspect console errors, and identify the request related to missing content. Distinguish a network
failure, an unexpected response, and a rendering error. Record the relevant URL, status, and available evidence.
If you cannot observe the response body, report that limitation.
```

**Expected result:** The diagnosis distinguishes network, response and rendering issues using retained signals. Discarded or inaccessible content is reported as a limitation.

Expect an investigation using signals that distinguish causes before changing code. Missing content alone does not
establish that the backend failed.

### Verify recovery from a network failure

In a test application you control, request a temporary scenario:

Use only with an application and test environment you control. The Specification must identify the request and expected failure behavior.

```prompt
Simulate an error response only for the loading request defined in the Specification. Verify the failure message
and retry option. Then remove the temporary rule and confirm that the normal flow recovers. Preserve the results
and end the test with network rules cleared.
```

**Expected result:** The test records failure and recovery and removes its temporary rule. Do not let the simulation affect unrelated requests.

Expect coverage of failure and recovery in an isolated scenario. Use test endpoints and data; the simulation must be
specific enough to leave unrelated requests unchanged.

## The same browser for the human

You can also use WebBrowser as an ordinary page inside the Workspace: open documentation, watch a video, or leave
a reference page open while agents work.

YouTube and other common pages are natural uses. Streaming services such as Netflix may require authentication, DRM,
permissions, or system-specific conditions, so Kavor does not promise playback for any particular service.

## A shared surface, not an invisible browser

The agent and the human share the same live page. This has useful consequences:

- you can see the actions and intervene;
- the agent has no private window hiding what it is doing;
- persistent tabs and presented pages belong to Kavor's own browser profile, shared among its WebBrowsers;
- extensions, history, and cookies from your external Chrome are not automatically reused;
- page content is untrusted and cannot redefine the agent's instructions.

WebBrowser is not a remote browser service or a general permission to operate the machine's filesystem.

## Limits and care

### Control lifecycle and audio

In Node settings, **Shutdown** closes running pages; **Start** opens the Browser again. Saved tabs and site data such as sign-ins are preserved; unsent forms and other in-memory state can be lost. Shutting down is not clearing cookies or deleting the Node.

**Mute browser audio** silences every tab and popup of that Browser. Audio choice and explicit open/shutdown intent persist; changing Workspace or remounting the UI must not undo them.

An active page can remain available to the agent beyond the visible Canvas. This does not require keeping every page and process running: use Shutdown to end that session rather than assuming leaving the screen ends it.

### Observe first, then act

Before controlling a page, the agent should read its current state. Snapshot references are temporary and can expire
after navigation or DOM changes. When that happens, take a new snapshot instead of insisting on the old reference.

### Sensitive actions remain human-owned

CAPTCHAs, passkeys, site permissions, certificates, and authentication prompts may require your intervention. The
agent can detect or wait for these situations, but must not pretend that a human action happened.

### Network rules are temporary

Blocks and fulfilled responses apply to the controlled scenario and page generation. Clear the rules when the test
ends; they are not a permanent application configuration.

### The development profile accepts certificates

To reach local servers and development environments, the dedicated profile accepts self-signed, expired, and private
authority certificates. This also reduces protection against a hostile network presenting an invalid certificate. Use
the profile carefully before authenticating with sensitive services.

### A page can remain live off-screen

When you switch Workspaces in the same window, Kavor preserves the presented page. A connected CodingAgent can
continue operating that state even while another Workspace is visible. Closing the tab, deleting the Node, or ending the
session ends that continuity.

### Frames and pages may be partial

An accessibility snapshot may omit cross-origin frame content. A network response may have been discarded once the
bounded history advanced. The agent should report observed evidence, not invent what it could not inspect.

## Connection and Guardrail

The direct CodingAgent + WebBrowser pair places the browser in the agent's reachable component. The graph can include
a Specification, Files, Terminal, Sticky Note, and other CodingAgents through valid paths, but visual proximity or a
message mention does not create access.

WebBrowser does not have its own specific Guardrail today. This does not remove limits from resources in the same
graph: a read-only File remains read-only, a Terminal session keeps its controls, and a Specification still follows its
lifecycle.

## Continue

- Consult the [Connections matrix](./connections.md) for the CodingAgent + WebBrowser contract.
- Read [how CodingAgents see and build the Canvas](./coding-agents-and-canvas.md).
- Combine browser, code, and evidence in [your first loop](./first-loop.md).
- Use a [Specification](./specification.md) to define expected behavior before testing the application.
