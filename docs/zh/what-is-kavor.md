---
id: what-is-kavor
title: 什么是 Kavor？
description: 了解 Kavor 用于协调编码智能体和持久工程上下文的本地优先可视化系统。
kind: guide
lastReviewedAt: 2026-09-08
canonicalUrl: https://agentkavor.com/zh/docs/what-is-kavor
---

# 什么是 Kavor？

Kavor 是一个本地优先的可视化系统，用于协调编码智能体及其周围的工程工作。它让上下文在 Canvas
上保持可见，而不是被埋在彼此无关的聊天和终端中。

编码智能体降低了实现成本，但并未消除界定问题、保留上下文、审查证据、作出决策以及理解谁能对
什么采取行动的必要性。Kavor 为这些工作提供明确的结构。

## Kavor 如何工作

Workspace 从你选择的目录开始。在 Canvas 上，你可以为工作中的资源和参与者添加 Nodes：Specifications、
Files、Sticky Notes、Terminals、WebBrowsers、Triggers 和 CodingAgents。Connections 会形成可达组件。
CodingAgent 无需直接 Connection，也可以处理其组件中的任何 Node。当配置或更严格的边界有需要时，
参数与 Guardrails 仍附着在特定 Connections 上。

一个 CodingAgent 可以实现 Specification，另一个可以审查结果，第三个可以准备发布。即使单个智能体
会话结束，Specification 和证据仍留在 Workspace 中。你可以检查整个图、进行干预并决定接受什么。

[![Kavor Canvas，其中连接了 CodingAgents、Specifications、Files、Sticky Notes 和 Terminals](https://media.agentkavor.com/demos/canvas-overview/workspace.8f917eaa5261.jpg)](https://agentkavor.com/zh/videos/overview)

[用 38 秒观看真实的 Kavor Workspace →](https://agentkavor.com/zh/videos/overview)

## 核心术语

- **Workspace** — 以你选择的目录为根目录的 Kavor 环境。
- **Canvas** — 组织工作的可视化表面。
- **Node** — Canvas 上的一等项目，例如 CodingAgent、Specification、Sticky Note、Terminal、File、
  WebBrowser 或 Trigger。
- **Connection** — 将 Nodes 纳入一个可达组件的显式、无方向关系。
- **CodingAgent** — 作为 Workspace 参与者运行的智能体提供方。
- **Specification** — 用于记录意图、约束和验收标准的持久 Markdown 契约。
- **Guardrail** — 由用户掌控并应用于 Connection 的限制。
- **Sticky Note** — 用于决策、观察和后续步骤的共享非正式工作记忆。
- **WebBrowser** — 人与 CodingAgent 可在同一实时状态中观察和操作的真实 Chromium 页面。
- **Trigger** — 可见的活动起因；Schedule 是其当前可用的定时动作来源。

## Web 也参与图谱

WebBrowser 在 Canvas 中保留真实页面。连接到 CodingAgent 后，人与智能体可以使用相同的标签页、导航和
可见状态，而不必把 Web 简化为粘贴进对话的文本。切换 Workspace 时，页面可以继续保持活动，并在返回时
恢复到相同状态。

[![Kavor WebBrowser 连接到操作同一页面的 CodingAgent](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)](https://agentkavor.com/zh/videos/web-browser-node)

[查看 WebBrowser 的实际运行 →](https://agentkavor.com/zh/videos/web-browser-node)

## 哪些内容保留在本地

Kavor 采用本地优先设计。你的 Workspace、代码仓库、文件、终端和提供方会话都在你的机器上由你掌控。
Connection 表达的是 Kavor 内部的授权；它并不意味着应将 Workspace 的私有内容复制到公共服务中。

## 一个实用的起步闭环

从小处开始：把一个 Specification 连接到一个 CodingAgent 和一个 Terminal。让 CodingAgent 实现契约，
检查证据，并把决策保留在 Workspace 中。只有在工作确实需要时，再加入审查者和更复杂的闭环。

[按照完整的第一个闭环教程操作](./first-loop.md)，加入实现、审查、共享证据和人工决策。

如果希望 CodingAgent 帮助搭建结构，请参阅 [CodingAgents 如何查看和构建 Canvas](./coding-agents-and-canvas.md)。
要按时间启动工作，请学习使用 [Schedule](./schedule.md)。

## 一个应用，多个 Workspaces

你可以在独立窗口中打开不同 Workspaces，并把它们分布到多个显示器。每个窗口保留自己的 Canvas 与会话，
而应用继续使用一个共享 runtime。

![多个 Kavor Workspaces 在不同窗口中打开](https://media.agentkavor.com/releases/1.3.0/multiple-workspaces/overview.baa20506a993.jpg)

[下载 Kavor](https://download.agentkavor.com/zh)，或阅读[发行说明](./release-notes/index.md)。
