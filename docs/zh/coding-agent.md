---
id: coding-agent
title: "Kavor 中的 CodingAgent：让你熟悉的 harness 成为图的一部分"
description: 选择 provider，保留原生体验，并把 CodingAgent 连接到正确的上下文、工具与参与者。
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/zh/docs/coding-agent
---

# Kavor 中的 CodingAgent：让你熟悉的 harness 成为图的一部分

CodingAgent 是运行在 provider 原生界面中的编程 agent，如今它也成为 Canvas 上可见的参与者。

Kavor 不会用通用聊天界面替换每一种 harness。它保留 provider 的原生体验，并在其周围增加清晰结构：
明确的职责、可达的上下文、工具、其他 CodingAgents，以及你可以检查的边界。

[![在 Canvas 中添加 CodingAgent 前，Kavor toolbar 中的 provider 选择器。](https://media.agentkavor.com/demos/coding-agent-provider-selector/poster.22c2dccb70c5.jpg)](https://agentkavor.com/zh/videos/coding-agent-provider-selector)

## CodingAgent 拥有什么

每个 CodingAgent 都代表一个独立会话。Node 会保存承担该角色所需的配置与状态，包括所选 provider；
当 provider 提供相应能力时，还包括模型、effort 级别、权限和原生会话。

Provider 是 CodingAgent 的配置，不是另一种 Node 类型。选择器包括：

- Anthropic Claude Code；
- OpenAI Codex；
- Google Antigravity；
- xAI Grok；
- SST OpenCode。

从 toolbar 添加 CodingAgent 时，你先选择 provider，再按工作需要配置会话。可用选项可能不同，因为
Kavor 保留每种 harness 的真实能力，而不会假装它们拥有完全相同的契约。

## 它单独能做什么

即使没有任何 Connection，CodingAgent 仍是 Workspace 内的 provider-native 会话。你可以与它对话、使用
harness 提供的工具，并让工作受该 Workspace 根目录约束。

Node 已经可以帮助拆分上下文：一个会话调查问题，另一个会话负责实现。不过，没有图时，共享上下文仍
取决于你在每段对话中提供什么。

Connection 会把孤立会话变成工作系统中的参与者。

## 它从图中获得什么

CodingAgent 可以使用其组件中通过有效 Connections 可达的任何 Node。并非每个资源都必须直接连接到它。

涉及 CodingAgent 的直接 Connections 各有明确作用：

| Connection | 带来的能力 |
| --- | --- |
| **CodingAgent + Specification** | 把持久的意图、范围和标准放入图中。直接 Connection 可带有 `specification_read_only`。 |
| **CodingAgent + Sticky Note** | 增加共享的非正式记忆，用于未决事项、进度和 findings。可带有 `sticky_note_read_only`。 |
| **CodingAgent + File** | 让 filesystem 中的规范来源在工作中变得明确。可带有 `file_read_only`。 |
| **CodingAgent + Terminal** | 允许执行命令、观察进程和读取 shell 证据。可带有 `terminal_read_only`。 |
| **CodingAgent + CodingAgent** | 让参与者进入同一组件。可达的 CodingAgents 可以交换异步消息，并读取协调所需的上下文。 |
| **Trigger + CodingAgent** | 把该活动会话选为定时 prompt 的直接目标。Trigger 不会启动已经关闭的会话。 |

可达性不会覆盖直接契约。如果 CodingAgent 与资源之间的那条直接 Connection 带有 Guardrail，即使图中存在
另一条路径，该限制仍然约束这一对。

## 三种实用模式

### 按契约实现

连接一份 Specification、一个承担 Implementer 角色的 CodingAgent 和一个 Terminal。Agent 从源文件读取
契约，只修改必要范围，执行检查，并把 outputs 记录到 Specification。

这样，意图不会埋在对话历史中，证据也会留在 Workspace 内。

### 分离实现与审查

为 Implementer 和 Reviewer 使用不同会话。两者都能访问同一份 Specification 和证据，但各自回答不同问题。

Implementer 问“如何满足契约？”，Reviewer 问“结果是否真正满足契约，还有哪些风险？”。这种分离可以减少
审查者自动继承作者假设的可能性。

### 组合 providers，而不是让它们竞赛

不同 providers 可以参与同一张图。当另一种界面、模型或推理方式能改善某项具体职责时再进行组合。

不要只为增加 agent 数量而加入 provider。先定义角色、预期结果和停止条件，再选择最适合工作的 harness。

## 一个实用图

```text
Specification — Implementer — Reviewer
                    │            │
                  Terminal    Sticky Note
                    │
                   File
```

这些线表示没有持久方向的 Connections。所有 Nodes 都在同一个可达组件中。Implementer 执行契约，Reviewer
给出独立评估，Sticky Note 则让问题和 findings 对人的决策保持可见。

这不是自动执行序列。消息用于协调 handoffs；Specifications 和其他资源保存需要跨会话延续的内容；是否接受
工作由你决定。

## 更好的起始 prompt

给 Implementer：

> 只实现可达 Specification 定义的范围。修改代码前，先找出相关 Files 和检查项。使用 Terminal 产生证据，
> 将结果记录为 Specification output，并请 Reviewer 独立评估。如果必要决策超出契约，请停止。

给 Reviewer：

> 将实现和证据与 Specification 标准比较。寻找错误行为、遗漏场景、回归和运行风险。提出修改前先记录具体
> findings，不要仅因为现有测试通过就批准工作。

## 重要限制

- CodingAgent 不会因视觉上靠近某个 Node 而获得访问；必须存在 Connection 路径。
- 在消息中引用 Node 不会授予访问权限。
- Guardrail 只限制它所属的直接配对，不是 Workspace 全局策略。
- 消息负责协调，但不应成为持久决策的唯一保存位置。
- Providers 不一定提供相同的模型、权限、事件或会话操作。
- Trigger 把 prompt 交给活动会话；它不会扩大权限，也不保证外部效果恰好发生一次。
- 允许编辑 Canvas 不等于允许删除 Nodes 或更改 Guardrails；这些边界仍由人掌控。

## 启动会话前

请确认：

- 这个 CodingAgent 负责什么；
- 它应产生什么可观察结果；
- 哪些 Nodes 必须可达；
- 直接 Connections 上需要哪些 Guardrails；
- provider、模型和 effort 是否符合任务风险；
- 决策、进度和证据保存在哪里；
- 它应与谁沟通，以及何时停止。

CodingAgent 不会因为收到更长的 prompt 就变强。职责、上下文、工具、协作与边界形成一致设计时，它才会
更有用。

继续阅读[如何选择 CodingAgents 并定义角色](./agents-and-roles.md)，了解
[CodingAgents 如何查看和构建 Canvas](./coding-agents-and-canvas.md)，或查阅
[支持的 Connections 矩阵](./connections.md)。
