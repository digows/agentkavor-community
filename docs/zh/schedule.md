---
id: schedule
title: "Kavor Schedule：为你的图谱加上时钟"
description: 在不扩大权限的前提下，通过预览、暂停、Run now 和持久历史来安排周期性提示与命令。
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/zh/docs/schedule
---

# Kavor Schedule：为你的图谱加上时钟

Schedule 是一种可见的活动起因：你决定何时发生、连接一个目标，并让每次尝试都能在 Canvas 中检查。

在 Kavor 领域中，Schedule 是当前可用的 Trigger 来源。它不完成工作，也不判断是否应该行动；它只负责
两件事：**何时触发**以及**交付什么 payload**。

目标决定 payload 的含义：

- 连接 **CodingAgent** 时，payload 是 prompt；
- 连接 **Terminal** 时，payload 是 shell 命令。

其余行为属于目标。Workspace、目录、provider 或 shell、Git mode、权限、Guardrails 和图谱上下文都保持不变。

![一个已完成的 Schedule 连接到收到审查提示的 CodingAgent，并通过 Sticky Note 共享循环意图](https://media.agentkavor.com/releases/1.3.0/schedule-trigger/overview.e6db5dc413e3.jpg)

*Schedule 发起活动；CodingAgent 使用可达上下文执行工作并解释结果。*

## 值得使用 Schedule 的三种场景

### 带着上下文唤醒 Maintainer

Schedule 每天向 CodingAgent 交付 prompt。该 agent 可以到达保存维护契约的 Specification、执行检查的
Terminal、提供输入的 File、记录报告的 Sticky Note，以及进行独立评估的 Reviewer。

Schedule 提供起因；图谱提供意图、工具、记忆与协作。

### 执行可见的运维命令

直接连接 Terminal 的 Schedule 可以交付检查、脚本或维护命令。如果 File 也通过环境变量连接到 Terminal，
命令可以使用其规范路径，无需在窗口之间复制值。

```sh
sqlite3 app.db < "$CHECK_SQL"
```

进程仍在真实 Terminal 中运行。Schedule 历史只记录 Kavor 能观察到的交付结果，不会根据 shell 文本臆测成功。

### 构建小型半自主系统

```text
Schedule — Maintainer — Specification
                      ├─ Terminal
                      ├─ File
                      ├─ Sticky Note
                      └─ Reviewer
```

这些线表示没有持久方向的 Connections。Schedule 只有一个直接目标：`Maintainer`。CodingAgent 使用其余可达组件
完成 prompt，并为人工决策留下证据。

## 先配置，再让时钟运行

新的 Schedule 以未来一次性执行且 **Paused** 的状态开始。你可以先编写 payload、选择周期、连接目标并检查预览，
再授权活动。

安全顺序如下：

1. 向 Canvas 添加 Schedule；
2. 编写具体且可验证的 payload；
3. 选择一次执行或周期执行；
4. 检查 `Next occurrences` 和显示的时区；
5. 直接连接一个 CodingAgent 或 Terminal；
6. 结构准备好后才使用 `Resume`。

Trigger 在配置期间可以没有目标。运行中的 Schedule 若没有目标 Connection，会将该时刻记录为 `Blocked`；
没有目标时执行 `Run now` 会在创建尝试前被拒绝。

## 编写能够结束的 payload

好的 CodingAgent prompt 应说明目标、图谱资源、预期证据和停止条件：

> 分析最近的 CI 失败。只在 Checks Terminal 中执行相关检查，把有证据的摘要写入 Daily report Sticky Note，
> 并请 Reviewer 独立评估。在记录可能原因前不要修改代码；如果修复需要扩大 Specification 范围就停止。

好的 Terminal 命令应明确、非交互，并产生可观察结果：

```sh
pnpm test -- --runInBand
```

payload 不能替代 Connections。仅在文字中提到 Sticky Note、File 或 Specification 不会授予访问权；该 Node 必须属于
CodingAgent 的可达组件。

## 不隐藏日历的周期设置

编辑器提供 `Once`、`Hourly`、`Daily`、`Weekdays`、`Weekly`、`Monthly`，以及用于高级 cron 的 `Custom`。
预设和高级编辑器修改同一个表达式，不存在两套会漂移的计划。最小间隔为一分钟。对于 cron 无法正确表达的周期，
例如“从某天起每两周一次”，不要使用误导性的近似表达式。

Kavor 保存明确的 IANA 时区，并按显示 Canvas 的机器本地时区展示后续发生时间。时区不能在界面中编辑；保存时由
host 写入。使用 `Resume` 前始终检查预览。

夏令时重叠的本地时间只触发一次；向前调钟时不存在的时间会移到第一个有效的本地时刻。月度预设会跳过当月不存在
的日期，例如 31 日不会在二月执行。

## Pause、Resume 与 Run now 不同

- **Pause** 立即停止新发生；暂停期间不会产生尝试或 `Missed` 记录。
- **Resume** 只考虑未来发生，并要求有效 payload；一次性执行也必须仍在未来。
- **Run now** 创建独立的手动尝试，暂停时也可用，且不会移动下一次周期时间。

`Run now` 用于在启动时钟前验证 payload 和目标。它不是自动 retry，也不会改变 Paused 或 Running 状态。
`Once` 执行消耗后回到 Paused；历史和 `Run now` 仍可使用。

## 到点时会发生什么

Kavor 为该时刻保存持久尝试，并与目标已接受的消息一起协调交付。尝试可能先经过 `Pending` 与 `Delivering`。

- **Completed** — Kavor 观察到完成；
- **Needs attention** — CodingAgent 请求介入，之后仍可能完成；
- **Fired** — 已交付，但该路径没有可观察的完成状态；
- **Failed** — 出现可观察失败；
- **Interrupted** — 交付已开始，但没有可靠结果；
- **Blocked** — 目标或 Workspace 在交付时不可用；
- **Missed** — runtime 未能占用该时刻；
- **Coalesced** — 目标唯一的待处理槽位已被另一尝试占用。

计划时间本身不是执行证据。查看 Node 的最新状态并打开历史，检查标称时间、交付、结果与诊断。

## 机器休眠或 Kavor 未运行时

Schedule 依赖本地 runtime：Kavor 必须运行、机器保持唤醒、用户已认证且目标会话处于活动状态。

若停机期间错过多个时刻，Kavor 只为该 Schedule 记录最近一次 `Missed`，不会在长时间离线后创建成千上万条记录，
也不会在恢复时突然执行旧任务。界面会显示 `Missed`，并提供等同于 `Run now` 的明确操作。

不存在自动 catch-up，也不会自动 retry 外部效果。

## 目标已经忙碌时

目标工作期间，Schedule 最多保留一个待处理尝试。槽位被占用时到来的新时刻会记录为 `Coalesced`，之后不会补交。

如果任务可能长于周期，应增加间隔，或让目标以幂等方式协调当前状态。

## 应当假定的限制

- Schedule 最多有一个直接目标，且必须是 CodingAgent 或 Terminal；
- 不会启动你主动关闭的会话；
- 不会扩大目标的图谱、权限或 Guardrails；
- 不替代验收标准，也不判断结果是否正确；
- 每个已记录尝试最多进行一次自动交付；
- 不保证外部效果 exactly-once；
- 不会把所有 `Missed` 或 `Coalesced` 积压到以后执行。

如果工作需要 fan-out、分阶段审批、补偿或事务式编排，请在图谱中明确建模责任，并保留人工决策。

## 使用 Resume 前的检查表

- payload 是否说明目标、证据与停止条件？
- `Next occurrences` 是否符合预期时间？
- 时区是否正确？
- 是否恰好有一条目标 Connection？
- 目标会话是否应在该时刻保持活动？
- 图谱是否只包含必要上下文与能力？
- 若外部效果已发生，重复执行是否安全？
- 你是否知道在哪里查看结果与历史？

## 继续阅读

- 查看[Connections 矩阵](./connections.md)。
- 了解 [CodingAgents 如何查看和构建 Canvas](./coding-agents-and-canvas.md)。
- 使用 [CodingAgents 与角色](./agents-and-roles.md)分离维护、审查与决策。
