---
id: sticky-note
title: "Sticky Note：共享工作记忆"
description: 使用 Sticky Note 与 CodingAgents 记录状态、发现和注意事项，而不必把每条工作笔记都变成 Specification。
kind: guide
lastReviewedAt: 2026-09-08
canonicalUrl: https://agentkavor.com/zh/docs/sticky-note
---

# Sticky Note 很小，却能让工作始终可见

Sticky Note 最初只是给人使用的便利贴。连接 CodingAgent 后，它会成为共享工作记忆：你和 agent 可以在工作
过程中记录重要信息，不必依赖很快就会被埋没的对话。

[![Kavor Canvas 上连接的 CodingAgents 和 Sticky Note](https://agentkavor.com/kavor-connections-demo-poster.jpg)](https://agentkavor.com/zh/videos/connections)

*共享笔记让观察、开放决定和下一步始终显示在图旁边。*

## Sticky Note 能做什么

即使没有 agent，Sticky Note 也有用。你可以写下问题、假设、提醒，或想要观察的短清单。当内容成为同一
工作图的一部分时，它的价值会进一步提高。

通过与 CodingAgent 的 Connection，agent 可以和你一起读取并更新笔记。你可以用它保存：

- **已完成 / 进行中 / 下一步**摘要；
- 编写 Specification 时尚未决定的问题；
- 需要稍后检查的注意事项；
- 实现过程中发现的事实；
- 独立评审的 findings；
- 图中参与者共享的交接清单。

这类笔记有意保持非正式。它让工作在两个方向上都透明：你能看到 agent 注意到了什么，agent 也拥有一个明确
的位置来保留仍然需要可见的信息。

## 三种使用方式

### 1. 记录这一次工作的记忆

开始前写下目标和不能丢失的问题。工作中加入简短事实、链接或临时决定。结束时留下清晰的下一步，方便你
回到 Workspace 后继续。

一个简单格式就够了：

- **状态：** 已完成、进行中、下一步。
- **注意：** 需要你决定或检查的事情。
- **证据：** 支持这条笔记的检查、文件或观察。

### 2. 成为 CodingAgent 的第二只手

将 Sticky Note 连接到 agent，并要求它只记录有助于你下一次决定的事实：

> 保持 Sticky Note 为简短的工作摘要。记录变更、证据、风险以及需要我决定的问题。不要把假设写成最终决定。

当你要求完整整理时，agent 可以追加独立区块或替换整个内容。人仍然可以编辑内容，每一次变更都必须基于
笔记的最新版本。

### 3. 连接实现与评审

Builder 可以记录改动和执行过的检查。Reviewer 可以加入 findings 和风险。你无需在两个不同的 session 中
寻找这些信息。

CodingAgents 之间的 Connection 不是自动 workflow 顺序；它让参与者可达，并允许交换消息。

## Markdown、编辑与冲突

Sticky Note 支持标题、列表、任务、强调、代码等常见工作笔记 Markdown。它不接受原始 HTML。每条笔记最多
包含 64,000 个 Unicode code points，并提供四种颜色来进行视觉分组；颜色不会改变内容的权威性。

Kavor 会自动保存改动，并在其他参与者于你保存前改动了笔记时发出提示。界面不会静默丢弃并发改动，而是让你
解决冲突。写入可以追加新区块，也可以替换整个正文。

## 它不应该是什么

不要把 Sticky Note 当成所有内容的替代品：

- 稳定的决定、范围和验收标准属于 [Specification](./specification.md)；
- 源代码及其他规范工件属于 [File](./file.md)；
- 命令和执行证据属于 [Terminal](./terminal.md)；
- 消息用于协调参与者，但不应成为重要决定的唯一记录。

好的笔记足够短，能够被读完；也足够丰富，使下一步不依赖某个 session 的记忆。

## Guardrail 与可达范围

CodingAgent 只能通过有效的 [Connections](./connections.md) 路径访问 Sticky Note。在 Canvas 上靠得近，或在
消息中提到该 Node，都不会授予访问权。

你可以在 agent 与笔记的直接 Connection 上设置 sticky_note_read_only Guardrail。这样 agent 仍可读取笔记，
但不能通过 Kavor 操作追加或替换内容。Guardrail 只限制这个直接 pair；它不会创建 Connection，也不会把笔记
变成 Workspace 范围的策略。

## 继续阅读

- [理解 Node 模型](./nodes.md)。
- 为工作[选择最小的 Connections 集合](./connections.md)。
- 使用 Specification、CodingAgents、Terminal 和 Sticky Note [闭合你的第一个 loop](./first-loop.md)。
