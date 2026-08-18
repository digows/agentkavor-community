---
id: connections
title: Kavor 支持的 Connections 矩阵
description: 查看支持的 Node 组合、授予的能力、必需参数及可用 Guardrails。
kind: guide
lastReviewedAt: 2026-08-07
canonicalUrl: https://agentkavor.com/zh/docs/connections
---

# Kavor 支持的 Connections 矩阵

Connection 不只是 Canvas 上画出的一条线。它声明两个 Nodes 参与同一个图，并定义这个组合为工作增加的能力。

并非所有组合都有效。每个受支持的组合都有特定合同：有些 Connections 让上下文可达，有些允许由 Kavor 中介的操作，还有
两种会通过环境变量把规范路径提供给 Terminal。

本页是这些合同的公开权威参考。

## 如何理解 Connection

Connection 有三项不同责任：

1. **存在性：** 把 Nodes 连接到同一个可达图组件中。
2. **参数：** 当组合需要配置时，记录必填参数。
3. **Guardrails：** 从两个 Nodes 通常允许的行为中减去能力。

Connections 是双向关系。Kavor 以规范顺序存储两个 endpoints，但这个顺序不表达流程、控制或优先级。消息仍有发送者和
接收者；Trigger 仍有目标。这些方向属于具体操作，而不属于持久化的 Connection。

## 支持的组合

| Node 组合 | Connection 允许的能力 | 参数 | 可用 Guardrail | 主要示例 |
| --- | --- | --- | --- | --- |
| **CodingAgent + Specification** | 读取元数据和规范 Markdown，使用 lifecycle，并在允许时记录持久 outputs。 | 无 | `specification_read_only` | Spec Writer、Builder 和 Reviewer 共享同一合同。 |
| **CodingAgent + Sticky Note** | 读取和写入带版本控制的非正式 Markdown 记忆；每次写入选择 append 或 replace。 | 无 | `sticky_note_read_only` | 让待定决定、进度、findings 和 handoffs 保持可见。 |
| **CodingAgent + Terminal** | 读取 output、运行命令、跟踪或中断关联执行，并在允许时与 foreground 进程交互。 | 无 | `terminal_read_only` | 诊断、tests、日志或协助受监督的 SSH 会话。 |
| **CodingAgent + File** | 让 filesystem 中的规范来源在图中明确，以便在允许时读取、评审或修改。 | 无 | `file_read_only` | 界定模块、PDF、图片、报告或配置。 |
| **CodingAgent + CodingAgent** | 为异步消息、回复、独立评审和并行工作形成可达图。 | 无 | 无 | Builder 向 Reviewer 请求评审。 |
| **Specification + Terminal** | 把 Specification 的规范绝对路径导出到 Terminal 会话。 | 必填环境变量名 | 无 | 验证、检查或比较 Specification Markdown。 |
| **File + Terminal** | 把 File 的规范绝对路径导出到 Terminal 会话。 | 必填环境变量名 | 无 | 无需在窗口间复制路径即可运行脚本或使用 SQL 文件。 |
| **Trigger + CodingAgent** | 在配置时间向已有活动会话的 CodingAgent 发送 prompt。 | 无 | 无 | 唤醒 Maintainer 分析失败、编写报告并请求评审。 |
| **Trigger + Terminal** | 在配置时间向活动 Terminal 会话发送命令。 | 无 | 无 | 运行 tests、数据库检查或维护脚本。 |

## Guardrails 只限制，不授予访问权

Connection 从该组合已实现的能力开始。Guardrail 在此基础上记录用户选择的限制：

| Guardrail | Connection | 效果 |
| --- | --- | --- |
| `specification_read_only` | CodingAgent + Specification | 保留读取，禁止通过 Kavor 更改 lifecycle 和 outputs；直接编辑 Markdown 也成为明确的只读合同。 |
| `sticky_note_read_only` | CodingAgent + Sticky Note | 保留读取，阻止 append 或 replace 内容。 |
| `terminal_read_only` | CodingAgent + Terminal | 保留 Terminal 检查，阻止改变会话、进程或输入的操作。 |
| `file_read_only` | CodingAgent + File | 声明 agent 不应修改规范来源。 |

Guardrail 属于 CodingAgent 与资源之间的直接 Connection。图中的替代路径不会消除这个直接组合上的限制。

如果 Guardrail 阻止某项由 Kavor 中介的操作，系统会在产生效果前拒绝它。Files 和 Specifications 正文也可能通过 harness
自己的 filesystem 工具访问；此时 Guardrail 是可见、受监控的合同，而不是操作系统 sandbox。

Guardrail 不会创建 Connection、让 Node 可达或增加权限。如果一个资源不应参与图，就不要创建 Connection。

## 带环境变量的 Connections

只有两种组合拥有持久参数：

- **File + Terminal**；
- **Specification + Terminal**。

两种情况都需要选择环境变量名。提供给 Terminal 的值是来源的规范绝对路径，绝不是文件内容。

例如，连接为 `CHECK_SQL` 的 File 可以在 shell 中这样使用：

```sh
sqlite3 app.db < "$CHECK_SQL"
```

Kavor 在 Terminal 会话启动时应用该值。如果 shell 已打开时 Connection 或参数发生变化，界面会提示变量等待会话重启。
`TERM` 和 `COLORTERM` 是保留名称，不能用作这些参数。

## Trigger 的特殊限制

Trigger 最多只有一个直接目标：CodingAgent 或 Terminal。它不能直接连接 Specification、File 或 Sticky Note，也不能把同一
次 firing 分发到多个目标。

图的其余部分可以扩展目标能做的事情，却不会扩大权限。被 Trigger 唤醒的 CodingAgent 可以在相同 Guardrails 和会话限制
下使用已经可达的 Nodes。

要成功送达，Kavor 必须正在运行，目标会话也必须处于活动状态。Trigger 不会启动你关闭的会话，不会决定工作目标，也不
会把外部效果变成 exactly-once 操作。每个 TriggerFiring 都会保存持久结果以供检查。

## 不存在的组合

Kavor 会拒绝矩阵中未列出的任何组合，其中包括：

- Trigger + Specification；
- Trigger + File；
- Trigger + Sticky Note；
- Specification + File；
- Specification + Sticky Note；
- File + Sticky Note；
- File + File；
- Sticky Note + Terminal；
- Sticky Note + Sticky Note；
- Terminal + Terminal。

Node 也不能连接自身。反转相同的两个 endpoints 不会创建另一条 Connection，因为持久关系没有方向。

Canvas 上的距离、消息中的提及或同属一个 Workspace 都不能替代 Connection。如果某个组合未出现在本页，仅仅靠近另一个
Node 不会获得任何能力。

## 选择能解决工作的最小 Connection

连接两个 Nodes 前，先问缺少的是哪项具体能力：

- agent 是否需要持久意图？连接 Specification；
- 人和 agent 是否需要共享工作记忆？连接 Sticky Note；
- agent 是否需要执行或观察进程？连接 Terminal；
- 规范来源是否必须明确？连接 File；
- 另一个视角是否会改善实现或评审？连接另一个 CodingAgent；
- 时间是否真的应该启动活动？最后加入 Trigger。

好的 Connection 让工作更明确。如果你无法说明它增加了什么能力，图很可能不需要它。

## 继续阅读

- 阅读 [Nodes 中央指南](./nodes.md)，了解每个参与者的责任。
- 继续阅读 [CodingAgent](./coding-agent.md)、[Specification](./specification.md) 和
  [Terminal](./terminal.md) 专题指南。
- [闭合你的第一个 loop](./first-loop.md)，串联意图、实现、评审和人的决定。
- 扩展图之前，先了解[如何选择 CodingAgents 和角色](./agents-and-roles.md)。
