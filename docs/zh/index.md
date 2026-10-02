---
id: docs-home
title: Kavor 文档
description: 在 Kavor 中搭建第一个闭环，查找使用 CodingAgents 编写契约、实现、审查、测试和安排定时工作的指南。
kind: landing
lastReviewedAt: 2026-10-01
canonicalUrl: https://agentkavor.com/zh/docs
---

# 与智能体协作，而不丢失工程本身

任务从一个意图开始。在 Kavor 中，你把所需的智能体、上下文和证据保留在任务周围，逐步形成可供审查的交付结果。
Canvas 让这些工作保持可见；Connections 让 CodingAgents 能够与可达的资源和参与者协作。

![Specifications、CodingAgents、Files、Sticky Notes 和 Terminals 组织在真实的 Kavor Workspace 中](https://media.agentkavor.com/demos/canvas-overview/workspace.8f917eaa5261.jpg)

[观看这个 Workspace 如何运作 →](https://agentkavor.com/zh/videos/overview)

## 从一项小交付开始

如果这是你的第一个 Canvas，请选择一项你知道如何验证的改动：修复一条校验规则、添加一个测试，或实现一个小功能。
教程会搭建一份 Specification、一个 Implementer、一个 Reviewer 和一条 Sticky Note，将意图、实现、审查和决策保留在同一个闭环中。

**[搭建你的第一个闭环 →](./first-loop.md)**

结构随任务需要逐步扩展。你可以从少量 Nodes 开始，再添加用于检查的 Terminal、作为参考的 File，或用于测试应用的
WebBrowser。如果想先理解模型，请阅读[什么是 Kavor？](./what-is-kavor.md)。

## 你想做什么？

| 你的任务 | 从哪里继续 |
| --- | --- |
| 将想法转化为可实现的契约 | [Specification](./specification.md)：问题、范围、标准和证据。 |
| 让不同智能体分别负责实现和审查 | [CodingAgents 与角色](./agents-and-roles.md)：职责、上下文和交接。 |
| 让未决事项和进度保持可见 | [Sticky Note](./sticky-note.md)：共享工作记忆。 |
| 以代码、PDF、图片或其他文件为工作起点 | [File](./file.md)：规范来源、参考和执行输入。 |
| 执行检查或调查进程 | [Terminal](./terminal.md)：在同一个 shell 中运行命令、查看日志并协作。 |
| 复现并修复 Web 应用的问题 | [WebBrowser](./web-browser.md)：实时页面、console、网络和视觉证据。 |
| 在指定时间启动例行工作 | [Schedule](./schedule.md)：提示或命令、周期和结果。 |

## 理解 Canvas 的组成部分

- [Nodes](./nodes.md)介绍每种组成部分的作用及其组合方式。
- [Connections](./connections.md)提供支持的配对、参数和 Guardrails 参考。
- [CodingAgent](./coding-agent.md)说明 harness 会话及其从图谱中获得的能力。
- [CodingAgents 如何查看和构建 Canvas](./coding-agents-and-canvas.md)说明如何请智能体帮助你理解并搭建结构。

## 与社区一起继续

Kavor 免费提供 Windows、macOS 和 Linux 版本。[下载 Kavor](https://download.agentkavor.com/zh)，
查阅[发行说明](./release-notes/index.md)，或到 [Kavor Community](https://github.com/digows/agentkavor-community/discussions)
提出问题并分享真实工作流。
