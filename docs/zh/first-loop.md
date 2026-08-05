---
id: first-loop
title: 如何在 Kavor 中完成第一个闭环
description: 使用 Specification、Claude Code、Codex 和 Sticky Note 构建一个从意图到人工决策的小型闭环。
kind: tutorial
lastReviewedAt: 2026-08-05
canonicalUrl: https://agentkavor.com/zh/docs/first-loop
---

# 如何在 Kavor 中完成第一个闭环

最适合入门的 Canvas 不是最完整的，而是能把明确意图转化为可审查变更的最小 Canvas。

在本教程中，Claude Code 实现 Specification，Codex 审查结果，二者把证据保存在同一个 Sticky Note 中，
最后由你决定工作何时完成。

[![Canvas 上连接的 Specification、Claude Code、Codex 和 Sticky Note](https://agentkavor.com/kavor-small-loop-demo-poster.jpg)](https://agentkavor.com/zh/videos/small-loop)

[用 1 分 29 秒观看完整闭环 →](https://agentkavor.com/zh/videos/small-loop)

## 开始之前

你需要：

- 已打开 Workspace 的 Kavor；
- 已安装并完成认证的 Claude Code 和 Codex；
- Workspace 目录内一项结果可观察的小任务。

合适的第一项任务可以用一句话描述，并有两到三个客观标准。例如：“添加表单验证，并保持现有测试
继续通过。”不要从大范围重构开始。

## 你将构建的闭环

工作将按以下顺序进行：

`Specification → Claude Code → 消息 → Codex → 人工决策`

Specification 将同时连接两个 CodingAgents。Claude Code 和 Codex 也会彼此连接，并连接到同一个
Sticky Note。

Connections 不是流程箭头，而是 Nodes 之间的关系；上面的顺序描述的是本教程中的工作过程。

## 想让 CodingAgent 帮你搭建吗？

你常用的 CodingAgent 无需额外配置，也可以查阅 Kavor 官方文档，解释 Canvas、回答问题并帮助设计闭环。
在当前 Connections 和权限允许时，CodingAgent 还可以与你一起创建 Nodes 和 Connections。

你可以从下面的请求开始：

> 查阅 Kavor 官方文档，帮我为这项任务搭建第一个闭环。先解释所需结构和 Connections。然后，如果
> 当前 Connections 允许，请创建 Specification、CodingAgents 和 Sticky Note，把它们连接起来，并在
> 开始实现之前停下，让我先检查这个闭环。

文档不会扩大 CodingAgent 的访问权限，不会创建隐式 Connections，也不能用于绕过 Guardrails。
如果文档服务暂时不可用，Kavor 的其他本地工具仍会继续工作。

## 1. 创建一个小型 Specification

1. 右键单击 Canvas 的空白区域，然后选择 `Add Spec…`。
2. 输入一个直接的名称，例如 `Fix form validation`，然后确认。
3. 编辑 Specification，记录：
   - 当前问题；
   - 预期结果；
   - 不在范围内的内容；
   - 两到三个可验证的验收标准。
4. 当契约可以实施时，把状态从 `Draft` 改为 `Ready`。

Specification 是持久的 Markdown。会话结束后，它仍保留在 Workspace 中，使实现、审查和人工决策都
能从同一份契约开始。

## 2. 添加参与者和共享记忆

右键单击 Canvas，然后添加：

- `Add Claude Code`；
- `Add Codex`；
- `Add Sticky Note`。

如果重命名能使职责更清晰，可以把 CodingAgents 命名为 `Implementer` 和 `Reviewer`。为 Sticky Note
使用一个简单标题，例如 `Implementation and review notes`。

创建以下五个 Connections：

1. Specification — Claude Code；
2. Specification — Codex；
3. Claude Code — Codex；
4. Claude Code — Sticky Note；
5. Codex — Sticky Note。

把一个 Node 的圆形连接点拖到另一个 Node 的圆形连接点。第一次创建每种 Connection 时，请先阅读
Kavor 的确认信息。不要在第一个闭环中添加 Guardrails；等到确实有具体限制需要执行时再使用它们。

## 3. 请求可验证的交付

把下面的内容发送给 Claude Code：

> 阅读已连接的 Specification，只实现其中的范围。修改代码前，先确认验收标准。完成后，运行相关
> 检查，在 Specification 上登记持久 outputs，并在 Sticky Note 中总结修改的文件、执行的检查和
> 剩余风险。然后通过 Kavor 向 Codex 发送消息，引用该 Specification，并请它按照验收标准进行审查。

Connection 让获得授权的上下文和能力可用；它不会自行执行任务。请在 CodingAgent 中跟进工作，
不要把“完成”本身当作充分证据。

## 4. 接收审查结果

消息送达后，Codex 可以使用直接连接的 Specification 和 Sticky Note。让它：

- 对照每一项验收标准检查实现；
- 运行相关检查；
- 记录具体发现，或明确说明没有发现阻塞项；
- 把审查结果添加到 Sticky Note；
- 需要修正时回复 Claude Code。

在 Node 上打开 `Messages`，检查消息送达情况和回复。如果有问题，让 Claude Code 修正后再次请求审查。
这条返回路径属于同一个闭环。

## 5. 通过人工决策完成闭环

在把工作标记为完成之前：

1. 重新阅读 Specification 的验收标准；
2. 检查登记的 outputs 和产生的变更；
3. 确认 Sticky Note 包含实现和审查摘要；
4. 解决阻塞性问题；
5. 把 Specification 状态改为 `Done`。

状态不能代替你的决策。你仍然可以接受变更、要求修正、缩小范围或放弃变更。只有当意图、执行、
审查、证据和验收都在 Workspace 中保持可见时，这个闭环才算完成。

## 预期结果

完成后：

- Canvas 显示谁参与了工作以及共享了哪些上下文；
- Specification 保存契约和持久 outputs；
- CodingAgents 之间的消息仍可检查；
- Sticky Note 汇总实现和审查观察；
- 最终决策仍由你作出。

## 如果遇到问题

- **CodingAgent 找不到 Specification 或 Sticky Note：**确认两个 Nodes 之间存在直接 Connection。
  在消息中引用 Node 本身不会授予访问权限。
- **消息没有送达：**确认 CodingAgents 之间存在 Connection，并打开 `Messages` 检查送达情况。
  忙碌的提供方可能稍后才会收到消息。
- **Guardrail 阻止了操作：**打开 Connection 并检查限制；不要要求 CodingAgent 绕过它。
- **缺少证据：**让 CodingAgent 在 Specification 上登记文件、commits 或其他持久 outputs，并补充
  Sticky Note。

接下来可阅读[什么是 Kavor？](https://agentkavor.com/zh/docs/what-is-kavor)和
[发行说明](https://agentkavor.com/zh/docs/release-notes)，或在
[Kavor Community](https://github.com/digows/agentkavor-community/discussions) 分享你的第一个闭环。
