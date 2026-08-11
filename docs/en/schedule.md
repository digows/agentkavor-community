---
id: schedule
title: "Schedule in Kavor: give your graph a clock"
description: Schedule recurring prompts and commands with preview, pause, Run now, and durable history without expanding permissions.
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/en/docs/schedule
---

# Schedule in Kavor: give your graph a clock

Schedule is a visible cause of activity: you choose when something should happen, connect one target, and keep every
attempt inspectable on the Canvas.

In Kavor's domain, Schedule is the available Trigger source. It does not do the work or decide whether acting is
appropriate. It has only two responsibilities: **when to fire** and **which payload to deliver**.

The target gives the payload meaning:

- connected to a **CodingAgent**, the payload is a prompt;
- connected to a **Terminal**, the payload is a shell command.

Everything else belongs to the target. Workspace, directory, provider or shell, Git mode, permissions, Guardrails,
and graph context remain exactly as they were.

![A completed Schedule connected to a CodingAgent that received a review prompt, with a Sticky Note sharing the loop's intent](https://agentkavor.com/kavor-schedule-trigger-demo.jpg)

*A Schedule starts the activity; the CodingAgent uses reachable context to execute and explain the result.*

## Three uses that justify a Schedule

### Wake a Maintainer with context

A Schedule delivers a daily prompt to a CodingAgent. That agent can reach a Specification with the maintenance
contract, a Terminal for checks, a File with input data, a Sticky Note for the report, and a Reviewer for independent
evaluation.

The Schedule starts a cause. The graph provides intent, tools, memory, and collaboration.

### Run a visible operational command

A Schedule connected directly to a Terminal can deliver a check, script, or maintenance command. If a File is also
connected to the Terminal through an environment variable, the command can consume its canonical path without
copying values between windows.

```sh
sqlite3 app.db < "$CHECK_SQL"
```

The process remains in the real Terminal. Schedule history records what Kavor could observe about delivery without
inventing success from text shown by the shell.

### Build a small semi-autonomous system

```text
Schedule — Maintainer — Specification
                      ├─ Terminal
                      ├─ File
                      ├─ Sticky Note
                      └─ Reviewer
```

The lines represent Connections without persisted direction. The Schedule has one direct target: `Maintainer`. The
CodingAgent uses the rest of the reachable component to fulfill the prompt and leave evidence for a human decision.

## Configure first, release the clock later

A new Schedule starts **Paused** as a future one-time execution. This lets you write the payload, choose recurrence,
connect the target, and review the preview before authorizing activity.

A safe configuration follows this order:

1. add a Schedule to the Canvas;
2. write a specific, verifiable payload;
3. choose one-time execution or recurrence;
4. inspect `Next occurrences` and the displayed time zone;
5. connect one CodingAgent or Terminal directly;
6. use `Resume` only when the structure is ready.

A Trigger may exist without a target while being configured. Do not treat that as complete: a running Schedule with
no target Connection records the occurrence as `Blocked`, and `Run now` without a target is rejected before creating
an attempt.

## Write a payload that can finish

A good CodingAgent prompt states the objective, graph resources, expected evidence, and stopping condition:

> Analyze recent CI failures. Run only the relevant checks in the Checks Terminal, record an evidence-backed summary
> in the Daily report Sticky Note, and ask the Reviewer for an independent evaluation. Do not change code before
> recording the likely cause, and stop if the fix requires expanding the Specification scope.

A good Terminal command is explicit, non-interactive, and leaves an observable result:

```sh
pnpm test -- --runInBand
```

The payload does not replace Connections. Naming a Sticky Note, File, or Specification does not grant access unless
the Node belongs to the CodingAgent's reachable component.

## Recurrence without hiding the calendar

The editor provides presets for common cases:

- `Once`;
- `Hourly`;
- `Daily`;
- `Weekdays`;
- `Weekly`;
- `Monthly`;
- `Custom` for an advanced cron expression.

Presets and the advanced editor change the same expression; there are not two parallel schedules that can drift.
The minimum interval is one minute. Do not approximate a recurrence cron cannot represent correctly, such as “every
two weeks from this date,” with a misleading expression.

Kavor saves an explicit IANA time zone and shows upcoming occurrences in the local zone of the machine displaying
the Canvas. The zone is not editable in the interface; it is stamped from the host when configuration is saved.
Always inspect the preview before using `Resume`.

During daylight-saving transitions, an overlapping local time fires once. A nonexistent time during a forward clock
change moves to the first valid local instant instead of silently disappearing. In the monthly preset, a day absent
from that month is skipped; day 31, for example, does not run in February.

## Pause, Resume, and Run now are different

- **Pause** stops new occurrences immediately. Paused time creates no attempts or `Missed` records.
- **Resume** considers only future occurrences. It requires a valid payload; a one-time execution must also remain in
  the future.
- **Run now** creates an independent manual attempt. It works while paused and does not shift the next recurrence.

`Run now` is useful for validating the payload and target before releasing the clock. It is not an automatic retry
of a previous attempt and does not change the Paused or Running state.

A `Once` execution returns to Paused after its instant is consumed. History remains and `Run now` stays available.

## What happens when the time arrives

Kavor stores a durable attempt for the occurrence and arbitrates delivery with messages already accepted by the
target. The attempt may pass through `Pending` and `Delivering` before an observed result.

History distinguishes different outcomes:

- **Completed** — Kavor observed completion;
- **Needs attention** — the CodingAgent requested intervention and may still finish later;
- **Fired** — delivery occurred, but that path offers no observable completion;
- **Failed** — an observable failure occurred;
- **Interrupted** — delivery started but ended without a reliable result;
- **Blocked** — the target or Workspace was unavailable at delivery time;
- **Missed** — the instant passed while the runtime could not claim it;
- **Coalesced** — another attempt already occupied the target's single pending slot.

A scheduled time is not evidence of execution. Check the latest presentation on the Node and open history for the
nominal time, delivery, result, and available diagnostic.

## When the machine sleeps or Kavor is closed

Schedules depend on the local runtime. Kavor must be running, the machine awake, the user authenticated, and the
target session active.

If one or more occurrences pass during downtime, Kavor records only the most recent missed occurrence for that
Schedule instead of creating thousands of rows after a long absence. It does not unexpectedly run old work on
return. The interface shows `Missed` and offers an explicit action equivalent to `Run now`.

There is no automatic catch-up or retry of external effects. This prevents an old command from running out of context
without your knowledge.

## When the target is already busy

Schedule keeps at most one pending attempt while the target is working. New occurrences arriving with that slot
occupied are recorded as `Coalesced` and are not delivered later.

This prevents an agent or Terminal from waking up to process an uncontrolled backlog. If the task can outlast its
recurrence, increase the interval or make the target reconcile current state idempotently.

## Limits you should assume

- a Schedule has at most one direct target;
- the target must be a CodingAgent or Terminal;
- Schedule does not start a session you deliberately closed;
- it does not expand the target's graph, permissions, or Guardrails;
- it does not replace acceptance criteria or decide whether the result is correct;
- it makes at most one automatic delivery attempt per recorded attempt;
- it does not promise exactly-once external effects;
- it does not queue every missed or coalesced occurrence for later execution.

If the work requires fan-out, staged approval, compensation, or transactional orchestration, do not hide that inside
a Schedule. Model responsibilities in the graph and keep the human decision explicit.

## Checklist before using Resume

- does the payload state the objective, evidence, and stopping condition?
- does `Next occurrences` match the expected time?
- is the displayed zone correct for this machine?
- is there exactly one target Connection?
- should the target session remain active at that time?
- does the graph contain only the necessary context and capabilities?
- is repeating the work safe if an external effect already happened?
- do you know where to inspect the result and history?

## Continue

- Review the [Connection matrix](./connections.md) for the target contract.
- Understand [how CodingAgents see and build the Canvas](./coding-agents-and-canvas.md).
- Use [CodingAgents and roles](./agents-and-roles.md) to separate maintenance, review, and decision.
