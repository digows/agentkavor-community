---
id: coding-agent-accounts
title: "CodingAgent Accounts: your accounts, usage, and rotation"
description: Monitor provider limits, add your accounts, and choose how CodingAgents share capacity across Workspaces without replacing your native login.
kind: guide
lastReviewedAt: 2026-10-29
canonicalUrl: https://agentkavor.com/en/docs/coding-agent-accounts
---

# CodingAgent Accounts: your accounts, usage, and rotation

## Overview

A Specification can have a Builder and a Reviewer working at the same time while another Workspace uses a third
session. These sessions do not have to compete for the same login without your knowledge: **CodingAgent Accounts**
shows your accounts' capacity and lets you choose how CodingAgents use it.

The pool belongs to you and is shared across your Workspaces. It is not a way to share accounts with other people.
Setup is optional: with only the provider's native login, you can keep working as before.

The login already on your computer is the main account, **Main**. When the provider reports your email address,
Kavor uses that address alone as the display name; when the identity is unavailable, it shows **Main**. Adding an
account in Kavor does not replace this login or sign out the provider's apps that use it.

Start with the **Accounts** group in the Workspace header. Hover over a provider to see its summary and click it to
open the panel. This panel brings together usage, accounts, Workspace choices, and preferences; there is no separate
account manager in Settings.

## Usage

**Percentages show remaining capacity, not the number of agents.** Several CodingAgents can use the same account
and consume its usage windows at the same time.

![Interface illustration of Accounts indicators for Claude Code, Codex, Antigravity and Grok.](https://media.agentkavor.com/product/2.1.0/coding-agent-accounts/header.118710635e3f.png)

Interface illustration rendered with recorded reference values; it is not a fresh provider usage reading.

### Read the header summary

- Each indicator uses its provider's color and shows up to two account-wide windows, from the shortest to the next.
  An account with five-hour and weekly windows shows both; a monthly-only account does not get an invented five-hour
  window. Percentages from different accounts are not added together.
- When more than one account is in use in that Workspace, the summary represents the one with the least remaining
  capacity in any of those windows. Hovering identifies the accounts in use and each account's windows.
- With no CodingAgents using that provider, the indicator is dimmed and shows the best known available account among
  those the Workspace can choose in Automatic. This does not mean that account has already been selected.
- **+N** is the reserve of other accounts with known capacity for that Workspace's automatic selection, not an
  exclusive reserve. Accounts also in use by other CodingAgents can count. **+N?** indicates readings that are still
  unknown; a provider with only one account shows no reserve.
- A window turns amber when it reaches the rotation threshold. The entire indicator turns light red when all
  accounts Automatic can use in that Workspace are confirmed at or beyond the configured threshold. This is capacity
  information, not a block on work.

### Check the windows and the reading

In the panel, each window shows its remaining capacity and next renewal. Model-specific windows appear in the account
details, not in the general indicator. Open **More** to check the **Read** time, plan, credits, banked resets, and
other data the provider actually reported.

Visible readings refresh periodically. During an update, the last valid reading stays visible with its actual
timestamp; closing and reopening the panel does not turn old data into a new observation. A failure shows
unavailability or sign-in guidance without replacing the last valid percentages with invented values. Use
**Refresh**, next to the provider selector, to request an update.

**Unavailable** or **—** does not mean 0% or 100%. An unknown reading does not confirm that the account has run out
of capacity or that its login has expired. Check the error and timestamp; try refreshing, or sign in again when
instructed. A usage-query failure does not hide the actions for adding an account or signing in again.

| Provider | What can be shown |
| --- | --- |
| **Codex** | Primary and secondary windows, their periods and resets, model scope, credits, and banked resets when reported. Periods vary by account. |
| **Claude Code** | Windows recognized in native usage output, such as session and week, with percentages and resets. Local token or cost statistics are not treated as quota. |
| **Grok** | Credit usage, period, and renewal; plan and prepaid balance when reported. |
| **Antigravity** | Remaining capacity and resets for the groups or buckets reported by the CLI. |
| **OpenCode** | Not included in this monitoring; usage depends on the provider configured in the harness. |

Queries use the provider's native channel without asking a model to do work. Checking a balance does not authorize
spending it.

## Accounts

### Add and authenticate an account

1. Open the panel for a supported provider: **Codex**, **Claude Code**, or **Grok**.
2. Use **Add account**, give it a recognizable name such as `Trabalho`, and confirm **Add account and sign in**.
3. Complete native sign-in on the provider's page and use the displayed code when required. The authorization URL
   opens once for the flow you initiated; when the provider's CLI opens its own browser, Kavor does not open a second tab.
4. Check authentication status and the usage reading. **Opening the browser does not mean sign-in is complete.**
5. To include this new account in automatic selection, enable its participation in the desired Workspace. A newly
   added account starts outside Automatic in every Workspace; the global pool does not enable it on its own.

Kavor prepares an isolated profile for the added account. Credentials stay in the storage used by that account's
CLI, not in Kavor's database. The native Main login stays where it already was.

For an expired login, use **Sign in again**. For managed accounts, the panel also offers this action when
authentication status could not be determined; this does not turn an unknown reading into confirmed expiration.
Each click that starts sign-in, including a retry, opens the authorization URL once when it becomes available.
If opening it fails, use **Continue provider sign-in** manually. Reopening the panel or restoring a pending
operation does not open tabs on its own.

### Main is not a copy of your login

Main uses the native login in the location where the provider keeps it. The panel offers no sign-in, sign-out, or
removal for Main; manage that login with the provider's tools. When you change the native account outside Kavor,
Main represents that login, with no offer to recover the previous account.

A native login without identity or usage data, such as a Codex API key, keeps working as before but does not
participate in automatic rotation. Kavor does not read credentials to try to infer an identity.

### Signing out is different from removing

**Sign out** keeps the account in the list so you can sign in again. **Remove account** removes it from the list
and deletes its isolated Kavor-managed profile; it does not delete the Main login or shared session history.

If CodingAgents are using the account, Kavor shows the affected agents and asks for confirmation. The change waits
for a safe turn boundary and for the old process to be released. A fixed choice of that account returns to
Automatic; if it was a Workspace's default account, the default returns to Main. With no other account, execution
uses the native login.

## Copying personal configuration

When you add an account, you receive **an initial copy** of the provider's personal configuration from the native
environment. This avoids setting up preferences, skills, and MCPs again for each account. The content depends on
the provider and what exists at the source:

| Provider | What is copied |
| --- | --- |
| **Codex** | `config.toml`, with preferences, profiles, personal MCPs, and custom providers; personal hooks from `hooks.json`; `AGENTS.md` and the `skills`, `plugins`, `rules`, and `prompts` directories. `forced_chatgpt_workspace_id` is not copied. |
| **Claude Code** | `settings.json`, including statusline and personal hooks; `keybindings.json`; `CLAUDE.md`; the `skills`, `plugins`, `rules`, `agents`, and `commands` directories. From `.claude.json`, only personal MCPs, not the entire file. |
| **Grok** | `config.toml`, with preferences and personal MCPs; `AGENTS.md` and the `skills`, `plugins`, `rules`, and `hooks` directories. |

**Secrets embedded in these configurations are also copied.** This includes MCP environment values, static HTTP
headers, and custom-provider keys saved in those files. The files retain their permissions; these values are not
logged or stored in Kavor's database.

**The native login, authentication files, Keychain items, and account identity are never copied.** The added account
needs its own sign-in. Kavor-owned integration entries are not inherited either: Kavor prepares its integration for
that account.

This is a copy, not synchronization. An MCP you add to Main later must also be configured in the accounts where you
want to use it. Changing an added account does not change Main; signing in again does not recopy preferences.

If preparation reports a configuration error, check the indicated personal TOML or JSON before trying again.
Do not copy authentication files or delete the entire native profile as a repair attempt.

## Switching accounts

### Choose each Workspace's behavior

A **Manual** choice in the CodingAgent settings pins an account to that Node and overrides the Workspace policy.
A CodingAgent in **Auto (Automatic)** follows its Workspace's choices for that provider.

When the effective mode is **Manual**, set on the Node or inherited from the Workspace, completing a turn does
not trigger a capacity query for rotation. This does not disable visible usage readings or **Refresh**.

In the Workspace's Accounts panel:

- With **Auto Rotate** on, participation toggles define which accounts Automatic can use. Each Workspace has its
  own selection even though it uses the same pool. An account outside that selection stays visible and can be
  chosen manually in the CodingAgent or used in another Workspace.
- With only one participating account, Automatic stays on it even at the threshold. With no participants, it uses
  the native Main login, with no automatic rotation in that Workspace.
- With **Auto Rotate** off, single-choice buttons define the default account for CodingAgents in Automatic. Turning
  it off makes Main the default; it does not restore an old choice. Participation choices are saved for when you
  turn Auto Rotate on again.

Saving Auto Rotate or a participation choice takes effect immediately and **does not restart or redistribute
running agents**. Participation applies at the next actual automatic selection, such as opening a session or
threshold-based rotation. Explicitly choosing a different default account or Manual account can move affected
CodingAgents at a safe turn boundary. An agent whose effective account has not changed is not restarted.

![Codex Accounts panel with Auto Rotate enabled, account participation, remaining capacity and rotation preferences; account identities concealed.](https://media.agentkavor.com/product/2.1.0/coding-agent-accounts/panel.2cf397f707ee.png)

Account participation is configured in each Workspace’s Accounts panel. Remaining-capacity values and renewal times come from the reference capture, not a live provider query. Account identities have been concealed.

### How Automatic chooses another account

The default threshold is **95% usage**, adjustable in **Rotate at used capacity (%)**, under
**Global rotation preferences**. Kavor considers authentication, plan eligibility, the selected model, Workspace participation, and
all reported windows. It does not change the model to make an account fit the selection.

Automatic decisions can share a valid reading for the same account across your Workspaces for up to
**30 seconds** from the original query. Reusing the reading does not extend that period. Expiry, a usage-window
renewal, or a confirmed authentication or quota failure requires reevaluation; unavailable data does not become
eligible capacity. Rotation remains preventive at the configured threshold, without waiting for a turn to fail.

A valid current account is retained. When Kavor needs to choose among eligible accounts below the threshold in all
windows, it prefers, in this order:

1. An account already used by CodingAgents in that Workspace.
2. An account no other Workspace is using.
3. The account shared with the fewest other Workspaces.

Among equivalent candidates, it prefers the one whose capacity renews sooner. With four Workspaces and four eligible
accounts available, this allows one account per Workspace. It is not an exclusive reservation: accounts can be shared
when necessary. Opening or closing a Workspace does not trigger a general redistribution.

Switching restarts the harness on the other account **between turns**, resuming the same native session and its
history. The Node shows the actual waiting, selection, restart, and resumption stages. A waiting indication does not
block a terminal that is still usable; during the CLI restart, the terminal closes and returns when the session is
ready. A successful switch does not generate an operating-system notification; notifications are reserved for real
failures, identifying the Workspace and CodingAgent.

### Exhausted capacity and failed turns

**Low or exhausted capacity alone does not pause the CodingAgent, block a message, or disable terminal input.**
Without an alternative with capacity, it stays on the current account. An initial Automatic session opening with
no eligible account with capacity uses Main and reports that condition. The provider still applies actual limits
and turn billing.

A login confirmed as expired is excluded from automatic choices; a network failure or an unknown reading does not
confirm expiration. This does not override a Manual choice.

In **Codex and Claude Code**, a turn that failed because of account quota confirmed by the provider can be resumed
on another account, under the same Automatic rules and when resending is safe. Uncertain delivery, authentication,
rate limits, general overload, and unknown causes do not authorize repeating a request. **A failed Grok turn is not
automatically re-sent**, because its native signal does not distinguish quota from rate limits; usage-threshold
rotation remains available.

### Credits and banked resets

**Allow spending credits** and **Allow spending banked resets** are separate permissions, off by default. They
govern selection and rotation performed by Kavor; seeing a balance does not enable either one. With credits off,
an account at the configured threshold does not gain automatic eligibility just because it still has a balance.
This does not interrupt a running session or change your Manual choice.

**These options do not block native billing within a turn.** Control spending limits and paid account usage in the
provider itself. Kavor does not buy credits or change your login's billing settings.

Banked resets and their expiration dates appear only when reported. Spending a banked reset has not been verified;
the presence of a balance or preference must not be interpreted as a guaranteed spending operation.

## Tools for CodingAgents

A CodingAgent can query your accounts without receiving credentials:

- `kavor_coding_agent_account_list_usage` queries the global pool and native logins, with pagination, windows,
  resets, eligibility, and observation time; it can filter by provider.
- `kavor_coding_agent_account_request_change` requests a change of the **calling CodingAgent's own account** at the
  end of the turn, respecting Automatic and the accounts allowed in that Workspace.

The request is refused in Manual and does not guarantee an eligible alternative exists. These tools cannot change
another CodingAgent's account, sign in, remove accounts, change spending permissions, or access tokens.

For example:

Paste into a Workspace CodingAgent. The provider must offer the usage data described in this guide; do not include credentials in the prompt.

```prompt
Compare my accounts' windows and renewal times without changing any selection. If you recommend a switch for
your own session, explain which readings support the suggestion and respect my Manual choice.
```

**Expected result:** The comparison uses the windows, timestamps and limitations actually available. Reading usage does not change your selection or authorize spending.

## Agent Kavor commands

In the **Agent Kavor** conversation, including through an enabled Channel, commands operate in the selected
Workspace without a model turn to interpret the control. Use the actual names displayed by Kavor:

```text
/accounts
/accounts codex
/account
@Reviewer /account "Trabalho"
@Reviewer /account auto
/autorotate codex off
/autorotate codex on
/status
```

- `/accounts [provider]` shows the Workspace's usage summary, renewals, and reserve. It is not a complete export of
  every account: when there are more results or unknown readings, it indicates the limits and points to the panel.
- `/account [@Nome]` checks the selected or named agent's account and mode. Add an account's name or email to pin it;
  use `auto` to return to Automatic. Names with spaces need quotation marks.
- `/autorotate [provider] on|off` turns Auto Rotate on or off in that Workspace without moving running agents.
  Without a provider, it uses the default CodingAgent's provider; without a default agent, you must specify the provider.
- `/status` includes the account and its account-wide windows; `/help` presents the available controls and examples.

Pinning another account follows the same validation, safe boundary, and feedback as the desktop. A command response
does not prove resumption is complete. Adding accounts, signing in, signing out, removing accounts, changing
participation, and choosing the Workspace's default account remain actions in the desktop panel. Channel
authorization rules do not change.

See [Agent Kavor and Channels](./agent-kavor.md) to select the Workspace and recipient before operating the controls.

## Provider support and limitations

- **Codex, Claude Code, and Grok** offer managed accounts and switching with session continuity. The account's plan
  and the model must allow execution. An isolated configuration does not turn an ineligible plan into an accepted one.
- **Grok** does not report native account identity. Main keeps that neutral name; plan and balance are not used to
  infer an email address. The exception for resending turns is described above.
- **Antigravity** offers monitoring of the machine's account, without a pool, account switching, or the configuration
  copying described in this guide.
- **OpenCode** is outside the monitoring and account management described here; its limits depend on the provider
  configured in the harness itself.
- Logins without reported identity or usage remain available through the native path, without invented quota or
  automatic rotation. Available information and windows can vary between accounts and authentication modes.
- Missing data is not a zero balance. Changes in native formats can make an observation unavailable; check the
  timestamp, message, and login before concluding that quota has run out.

To organize work with these accounts, continue with the [CodingAgent guide](./coding-agent.md) and
[how to choose agents and define roles](./agents-and-roles.md).
