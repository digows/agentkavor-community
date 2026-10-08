---
id: sticky-note
title: "Sticky Note：共享工作记忆"
description: 使用 Sticky Note 与 CodingAgents 记录状态、发现和注意事项，而不必把每条工作笔记都变成 Specification。
kind: guide
lastReviewedAt: 2026-10-08
canonicalUrl: https://agentkavor.com/zh/docs/sticky-note
---

# Sticky Note 很小，却能让工作始终可见

Sticky Note 最初只是给人使用的便利贴。连接 CodingAgent 后，它会成为共享工作记忆：你和 agent 可以在工作
过程中记录重要信息，不必依赖很快就会被埋没的对话。

![Specification、CodingAgent 和 Sticky Note 在 Kavor Canvas 上共享观察记录](https://media.agentkavor.com/demos/spec-agent-notes/poster.463994b8b377.jpg)

[观看智能体如何与 Specification 和笔记协作 →](https://agentkavor.com/zh/videos/spec-agent-notes)

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

如果便签已有你的观察，请明确智能体可以更新哪些内容。有内容的便签不是让它主动重新整理的邀请。
更明确的指令可以是：

> 调查期间维护这张 Sticky Note。保留我和 Reviewer 的笔记。只添加你已经验证的发现，只更新带有你名字的条目。
> 整理整个正文前，先征求我的许可。

### 3. 连接实现与评审

Builder 可以记录改动和执行过的检查。Reviewer 可以加入 findings 和风险。你无需在两个不同的 session 中
寻找这些信息。

CodingAgents 之间的 Connection 不是自动 workflow 顺序；它让参与者可达，并允许交换消息。

## 示例：帮助你恢复工作的笔记

调查登录失败时，无需把每条观察都变成架构决策。用一条笔记保留发现、证据和尚未解决的问题：

```markdown
## 已完成
- 已复现会话过期后的失败。
- 新会话中的登录仍能正常工作。

## 进行中
- 正在比较会话过期的响应与客户端的处理方式。

## 需要人来处理
- 决定客户端应续期会话，还是要求重新登录。
- 假设：retry 使用旧凭据重复发起请求。尚未确认。

## 证据
- Terminal Checks：复现命令和观察到的响应。
- 客户端 File：发起 retry 的位置。

## 下一步
- 在编辑客户端前确认假设。
```

请智能体：

> 将已验证的发现和问题加入笔记。保留我的观察记录。假设得到确认或被排除后，用证据更新其状态。
> 如果某项决定定义了修复范围，将其移入对应的 Specification，并在这里留下一条简短引用。

审查时，可以用独立区块记录**场景、观察到的行为、证据和下一步**，以区分 Builder 的结论与 Reviewer 验证过的内容。

只有一项新发现时，局部更新或新增一个区块即可。笔记积累了过时状态后，再要求整理正文；保留仍未解决的决策和你的观察。
整理后的结果应让你无需重读所有对话就能继续工作。

## 共享便签不代表转移所有权

Connections 路径允许读取便签和进行已授权的写入，但不代表要求图中的所有智能体自动开始在此报告工作。

没有你的请求时，自动报告仅限于**直接连接到该 CodingAgent**、且它第一次遇到时为空的 Sticky Note。
智能体使用简短列表，并在每项中标明自己的名字：

```markdown
- [x] Builder — done: reproduced the expired-session failure.
- [ ] Builder — doing: checking the client's retry handling.
- [ ] Builder — will: verify the fix against the Specification.
```

智能体只在有意义的工作状态变化时更新自己的条目，不应完成、改写或删除你或其他智能体的条目。
维护已有内容的便签需要明确请求；通过其他路径可达，或连接到同事，都不授权主动报告。

如果你清空了智能体正在写的便签，它应保持为空，直到你请求恢复报告。
共享工作记忆不应让你失去对 Canvas 上保留内容的控制。

这是给 CodingAgent 的协作指引，不是对所有可能编辑的技术性封锁。
要阻止通过 Kavor 操作写入，请在直接 Connection 上使用 `sticky_note_read_only`。

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
