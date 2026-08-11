---
id: coding-agents-and-canvas
title: CodingAgents 如何查看和构建 Canvas
description: 了解可达上下文、agent 消息，以及在你控制的边界内进行 Canvas 原子编辑。
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/zh/docs/coding-agents-and-canvas
---

# CodingAgents 如何查看和构建 Canvas

Canvas 不只是给人看的图。对 CodingAgent 来说，它是实时上下文、能力地图；在你允许时，也是 agent 可以整理的工作面。

这是两种不同能力：

1. **理解可达图谱**，以便使用 Nodes、资源和其他 CodingAgents；
2. **编辑 Canvas 结构**，通过立即且原子的变更完成。

看到 Node 的位置不代表能读取其内容；能够使用资源也不代表能删除 Workspace 中的任意内容。

## 图谱就是共享上下文

每次新交互时，Kavor 都会向 CodingAgent 提供其可达组件的当前状态：Nodes、Connections、Guardrails 和理解工作所需事实。

agent 可以操作任何由有效 Connections 路径连接的 Node，无论距离多远：

```text
Specification — Builder — Reviewer — Sticky Note
```

Builder 通过 Reviewer 到达 Sticky Note；Reviewer 通过 Builder 到达 Specification。两者可以交换消息，而不需要每个资源都
与每个 agent 直接连接。

这能减少 Canvas 上的线条，同时保持拓扑明确：删除 Connection 可能拆分组件，并改变下一次交互的可达范围。

## 哪些内容直接到达，哪些按需读取

Kavor 优先提供有用上下文，而不是永久复制整个 Workspace。

- 小型文本信息可以随图谱状态提供；
- Specifications 提供 lifecycle、路径和近期 outputs，规范 Markdown 仍留在 Workspace；
- Terminals 提供状态和 foreground 命令，output 按需读取；
- Files 提供规范来源，内容仍在 filesystem；
- CodingAgents 提供状态与工作事实，旧消息按需读取。

大型或持续变化的内容不会不断复制进 context window。agent 得到清晰引用，从而保留推理空间并维护真实信息源。

## 消息也遵循图谱

任何可达 CodingAgent 都可以向组件内另一个 CodingAgent 发消息，不需要直接 Connection。消息持久化并可在 `Messages`
面板检查，可用于把实现交给 Reviewer、向 Specification 作者提问、拆分独立调查或返回 findings 并请求复核。

持久决策不应只存在于消息中。契约放在 Specification，工作记忆放在 Sticky Note，结果放在适当 outputs。

## Guardrails 仍绑定直接配对

Reachability 定义访问，Guardrail 定义限制。若 CodingAgent 与 Specification 的直接 Connection 带有
`specification_read_only`，即使存在另一条路径，该限制仍作用于这一对。另一个 CodingAgent 的限制不会成为资源的全局策略。

视觉距离、labels 和消息引用不会授权；必须存在真实的 Connections 路径。

## agent 也能看到 layout，但权限更少

为了整理 Workspace，CodingAgent 可以查看 Canvas 上所有 Nodes 的 labels、类型和几何信息。这种 layout 视图不包含其图谱之外
的配置、内容或 Connections。

因此它能对齐或移动组件外的 Node，却不会获得其内容访问权。layout 是 Workspace-wide；上下文与结构变更不是。

## Allow workspace editing

每个 CodingAgent 的高级设置中都有 `Allow workspace editing`。它控制 agent 发起的结构变更，并立即生效，无需重启会话。

启用后，agent 可以在其范围内：

- 创建活动 Nodes，包括 CodingAgent、Specification、Sticky Note、Terminal、File 和 Schedule；
- 创建规范 Specification 并将其呈现在 Canvas；
- 添加受支持 Connections，修改 Terminal Connection 参数；
- 删除 Connections；
- 重命名可达 Nodes 与 Specifications；
- 配置可达 Schedule；
- 移动、调整大小和显示 Nodes。

禁用后，结构变更会被拒绝；agent 应报告设置关闭并停止坚持。layout 仍可用，因为移动 Node 不扩大权限也不改变内容。

## 结构遵循图谱，而不是整个 Workspace

CodingAgent 可以结构性修改其可达组件中的 Nodes 与 Connections，以及同一原子变更中先前创建的 Nodes。因此它可以创建并
立即连接 Node，不在 Canvas 留下垃圾；孤立 agent 也可在一个批次中创建资源并连接自己。

与图谱外已有 Node 建立第一条链接仍由你决定。agent 不能利用 Workspace layout 视图附着到你从未使其可达的资源。

## 变更是原子的

Kavor 验证完整变更集合，并按顺序作为一个单元应用。任何一步失败，批次中先前的结构变更都不会保留。

创建 Terminal 并连接 agent，要么两者都成功，要么都不发生；Canvas 不会因最终 Connection 无效而留下孤立 Node。
返回结果是实际持久化形式，agent 应读取它，而不是假设 defaults、几何或规范路径与请求完全相同。

## 仍由人控制的部分

`Allow workspace editing` 不授予无限控制。CodingAgent 不能：

- 删除 Nodes；
- 创建、删除或放宽 Guardrails；
- 任意重配其他 Node 类型；
- 更改将入站消息保留给人工批准的控制；
- 利用引用或 Canvas 位置扩大自己的图谱。

agent 可以删除可达 Connection，因此若此操作可能移除上下文或中断其他 CodingAgent，你的请求必须明确。Kavor 要求 agent
仅在你提出要求或已委派工作确有需要时修改 peers 的 Connections。

## Docs MCP 帮助 agent 教你使用 Kavor

Kavor 中的 CodingAgents 可以通过本地 Docs MCP 查询官方文档。你无需记住 Node 名称、受支持组合或 Schedule 细节就能求助。

文档只提供指导，不授予权限。Docs MCP 不会创建 Connections、关闭 Guardrails，也不会把建议自动变成 Canvas 变更。

## 与 agent 协作的三个 prompts

### 修改前先解释

> 查询 Kavor 官方文档和当前图谱。解释解决此任务所需的最小结构、哪些 Nodes 将可达，以及哪些限制保持不变。先不要修改 Canvas。

### 构建可审查的 loop

> 为此任务创建一个包含 Specification、Builder、Reviewer 和 Sticky Note 的小 loop。使用最少 Connections，在一个原子变更中
> 创建并连接新 Nodes，然后在实现前停止，让我检查 Canvas。

### 整理但不扩大访问

> 整理 Canvas，让意图、实现、审查和证据清晰可读。不要创建或删除 Connections，不要修改 Guardrails，也不要假设能访问
> 图谱外的 Nodes。

## 授权编辑前的检查表

- agent 是否解释了预期结构结果？
- 每个新 Node 是否有具体作用？
- 每个 Node 是否会在同一批次连接，或明确只供人工阅读？
- 变更是否留在可达组件内？
- 删除 Connection 是否可能拆分图谱或中断其他 agent？
- 提供资源前是否需要直接 Guardrail？
- agent 应在何处停止等待审查，是否明确？

把 CodingAgent 当作 Canvas 合作者，而不是隐形所有者。价值在于你能检查它收到的结构、发生的变化，以及仍由你控制的边界。

## 继续阅读

- 用最小拓扑[闭合第一个 loop](./first-loop.md)。
- 扩展图谱前查看 [Connections 矩阵](./connections.md)。
- 了解[如何选择 CodingAgents 与角色](./agents-and-roles.md)。
- 在不扩大权限的情况下配置 [Schedule](./schedule.md)。
