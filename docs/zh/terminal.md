---
id: terminal
title: "Kavor 中的 Terminal：让人和 agent 都看得见执行过程"
description: 在 Canvas 上使用真实 shell，通过规范路径连接上下文，并让 CodingAgent 在不失去监督的前提下协助工作。
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/zh/docs/terminal
---

# Kavor 中的 Terminal：让人和 agent 都看得见执行过程

Terminal 是 Canvas 上的真实 shell。你仍然输入命令、跟踪 logs、操作熟悉的工具；Kavor 则在该会话周围
增加上下文、可观察性和协作。

目标不是把执行藏在按钮后面，而是让人和 CodingAgent 在同一个可见环境中工作，并各自受到清晰边界约束。

## Terminal 拥有什么

每个 Terminal 都有自己的会话、shell，以及由 Node 保留的屏幕历史。当职责不同——例如应用、测试、
数据库、logs 或你已经打开的远程机器——多个 Terminals 很有用。

进程仍是 shell 进程。Kavor 不会把显示的文字等同于成功，不会把每条命令变成持久任务，也不会因为工具打印
乐观消息就假定它已经完成。

## 它单独能做什么

即使没有 Connections，Terminal 仍能在 Workspace 内保持 shell，避免切换外部窗口打断工作流。你可以运行
交互命令、观察长期进程，并在同一 Canvas 上保留不同会话。

Connections 在不替换 shell 的情况下加入参与者和规范来源。

## 它从图中获得什么

Terminal 接受四种直接配对：

| Connection | 带来的能力 |
| --- | --- |
| **Terminal + CodingAgent** | Agent 可以执行相关命令、跟踪进程、读取屏幕或历史，并在授权时中断执行。可带有 `terminal_read_only`。 |
| **Terminal + File** | 通过你选择的环境变量导出 File 的规范绝对路径。 |
| **Terminal + Specification** | 通过环境变量导出 Specification Markdown 的规范绝对路径。 |
| **Terminal + Trigger** | 把活动会话选为 Schedule 定时命令的直接目标。 |

如果 CodingAgent 和 Terminal 已在同一可达组件中，就不必直接相连。不过，只有直接 Connection 可以使用
`terminal_read_only` 声明并强制该 agent 只观察。

## 协助，而不是争夺键盘

Terminal 是共享表面，人具有优先权。CodingAgent 不应把命令覆盖到你尚未输入完成的文字上。输入不安全时，
操作会等待或返回需要处理的条件，而不是破坏命令行。

对于 agent 发起的工作，Kavor 会关联命令与观察。Agent 可以等待结果、取消对应执行或查询可见状态。对于
已有会话，它会选择合适视图：当前屏幕、有限 tail 或完整 buffer。

区别很重要。屏幕回答“人现在看到了什么？”，tail 适合近期 logs，完整 buffer 则服务于真正需要历史的调查，
而不会把每次交互变成自动上下文 dump。

## 使用 Files 和 Specifications，而无需复制路径

File 或 Specification 的 Connection 会接收一个环境变量名。它的值始终是源的规范绝对路径，而不是内容。

```sh
node "$IMPORT_SCRIPT" --input "$SOURCE_FILE"
```

```sh
markdownlint "$SPECIFICATION_FILE"
```

变量在 Terminal 会话启动时应用。如果 shell 打开后 Connection 或参数发生变化，新配置会等待该会话重启。
`TERM` 和 `COLORTERM` 由模拟器保留。

使用表达职责的名称，例如 `CHECK_SQL`、`SPECIFICATION_FILE` 或 `IMPORT_SCRIPT`。图变大后，`FILE` 这样的
通用变量会失去含义。

## 三种实用模式

### 带可见证据的实现

连接 Specification、CodingAgent 与 Terminal。Agent 只执行相关检查，保留必要 output，并把结果记录为
output。你观察同一个 shell，随时可以介入。

### 诊断运行中的应用

把应用保留在一个 Terminal，把测试或查询放在另一个。可达的 CodingAgent 查看必要屏幕或 tail，形成假设，
再执行有边界的命令。Logs 对你保持可见，调查不会变成黑箱。

### 受监督的远程操作

你在 Terminal 中打开 SSH 会话。CodingAgent 在授权时帮助解释状态、建议或执行命令。Kavor 不会变成远程
服务：凭据、连接、shell 和监督仍留在你打开的会话中。

## 一个实用图

```text
Specification — Maintainer — Reviewer
                     │
                  Terminal
                     │
              File: check.sql
```

Maintainer 把 Specification 作为契约，把 File 作为明确来源，并用 Terminal 执行检查。Reviewer 评估结果和
证据。File + Terminal Connection 提供 `CHECK_SQL`，shell 无需手动复制路径即可使用。

## 更好的起始请求

> 只使用可达上下文诊断故障。先读取 Terminal 当前屏幕。一次执行一条命令，说明它能区分什么，并保留
> Reviewer 需要的 output。不要中断我启动的进程；在任何破坏性操作或扩大 Specification 范围前停止。

用于监控：

> 只跟踪此 Terminal 必要的 tail。出现新证据时通知我；不要把没有新行视为成功，也不要在调查结束后留下
> 仅为调查启动的 watcher。

## 只读 Guardrail

`terminal_read_only` 保留检查能力，并阻止通过该直接 Connection 修改会话、进程或输入。它适合需要读取证据
但不应执行修复的 Reviewer。

Guardrail 属于这一对。它不会让整个 Terminal 全局只读，也不会替代操作系统权限。

## 重要限制

- Terminal output 不会自动证明外部效果正确发生。
- CodingAgent 不应干扰尚未完成的人类输入。
- 破坏性命令仍需准确范围和适当授权。
- Connection 提供的变量包含路径，不是内容或 secret。
- 这些变量改变后，必须重启 Terminal 会话才能进入环境。
- Schedule 只向活动会话交付，不会自动恢复 Kavor 关闭时错过的命令。
- 仅为调查启动的进程，在不需要继续为人保留时应停止。
- 多个 Terminals 只有在代表真实职责时才有帮助；无目的复制只会分散运行状态。

## 委派命令前

请确认：

- 这是承担该职责的正确 Terminal 吗？
- 是否有人正在输入？
- 命令是否有边界，并在必要时可逆？
- Agent 是否知道什么 output 构成证据？
- 需要屏幕、tail 还是完整历史？
- Files 与 Specifications 是否使用易懂的变量名？
- Reviewer 是否应在 `terminal_read_only` 下观察？
- 何时停止、等待或询问你的决定是否清楚？

当执行保持真实、上下文明确、监督没有消失时，Terminal 才会在图中产生价值。

查阅 [Connections 矩阵](./connections.md)，了解
[CodingAgents 如何查看和构建 Canvas](./coding-agents-and-canvas.md)，或配置
[Schedule 的命令与 prompts](./schedule.md)。
