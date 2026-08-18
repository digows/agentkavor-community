---
id: agents-and-roles
title: 如何在 Kavor 中选择 CodingAgents 并定义角色
description: 学习如何在 CodingAgents 之间拆分工作、保留共享上下文，并为每项职责选择合适的 provider、模型与 effort。
kind: guide
lastReviewedAt: 2026-08-06
canonicalUrl: https://agentkavor.com/zh/docs/agents-and-roles
---

# 如何在 Kavor 中选择 CodingAgents 并定义角色

选择 CodingAgent，不应从 provider 开始，而应从它要承担的职责开始。

一个会话可以分析问题、编写 Specification、实现、审查并准备发布。参与者更少，看起来似乎更简单，
但不同目标都被集中进同一个上下文窗口。实现阶段背负此前的全部调查，审查阶段继承代码作者的相同
假设，发布准备则与本应已保存在会话之外的决策争夺注意力。

Kavor 允许你把这些职责分配给不同 CodingAgents，同时避免把工作拆成彼此孤立的聊天。参与者围绕
Specifications、Files 和 Sticky Notes 等持久资源形成图。Connections 让上下文与能力保持可见；
消息支持 handoff 与讨论；最终决定仍由你掌控。

[![Spec Writer、Builder、Reviewer 和 Shipper 连接在 Kavor Canvas 上](https://media.agentkavor.com/editorial/agents-and-roles/graph.6c35b0b2fdc5.jpg)](https://agentkavor.com/zh/videos/agents-and-roles)

[观看四个角色组成工作图 →](https://agentkavor.com/zh/videos/agents-and-roles)

## 从工作出发，而不是从 Agent 出发

在 Canvas 中添加 CodingAgent 前，先用一句话说明它为何存在。好的定义应包含：

- 一项主要职责；
- 完成职责所需的上下文；
- 应当产出的结果；
- 应当停止的条件。

“审查代码”仍然过于宽泛。“将实现与 Specification 的标准进行比较，记录 findings，并在修改代码前
停止”才定义了一个可验证的角色。

同一个 provider 可以在不同会话中承担不同角色，不同 providers 也可以承担同一角色。角色属于工作；
provider、模型和 effort 是为了执行这项工作而选择的配置。

## 四个实用角色

并非每项任务都需要下面四个角色。它们是用于划分责任的边界，不是 Agent 数量配额。

| 角色 | 核心问题 | 必要上下文 | 预期结果 |
| --- | --- | --- | --- |
| **Analyst 或 Spec Writer** | 需要改变什么？哪些边界必须保留？ | 问题、约束、决策与现有行为 | 一份范围清晰、标准可验证的 Specification |
| **Implementer** | 如何在契约内完成修改？ | Specification、相关 Files、Terminal 与 Workspace 约定 | 带有检查和证据的实现 |
| **Reviewer** | 哪些地方错误、不完整或有风险？ | Specification、变更与验证结果 | 具体 findings，或未发现阻塞项的审查结论 |
| **Shipper** | 工作是否可以安全交付？ | Specification、审查结果、Git 状态与 release 要求 | 交付准备、剩余风险，以及供人做决定的证据 |

对于小型修复，一个 Implementer 加人工审查可能就足够。对于风险更高的修改，把 Specification、实现、
审查和交付分开，可以降低单一思路控制整个周期的概率。

分离角色并不要求使用不同 providers。同一 provider 的两个会话已经可以隔离目标和上下文。组合不同
providers 可以引入另一种视角，并减少相关的盲点，但不能替代验收标准，也不保证审查一定更好。

## 图就是共享记忆

拆分工作不应意味着把同一个 prompt 复制到多个会话。在 Kavor 中，共同上下文保存在持久 Nodes 里：

- **Specification** 保存意图、范围和标准；
- **Files** 让相关来源留在工作流中；
- **Sticky Note** 记录工作观察与决策；
- **Terminal** 提供执行命令与检查的环境；
- **CodingAgents** 围绕这些资源承担不同职责。

共享记忆不是一段无限增长的统一对话历史，而是一组明确的资源。参与者能否读取和更新它们，由
Connections 与 Guardrails 决定。会话结束后，Specification、Files、笔记与证据仍留在 Workspace 中。

实现、审查与发布的图可以表示为：

~~~text
Specification
    ├── Spec Writer
    ├── Implementer ↔ Reviewer
    └── Shipper

持久上下文：Files · Sticky Note · Terminal · Specification outputs
~~~

这张图表达的是职责划分，而不是 Connections 的方向。Connections 不会自动执行某个顺序；它们让关系、
上下文与能力在 Canvas 上可检查。

## 同时拆分上下文窗口

每个角色需要问题的不同部分。Spec Writer 可能需要探索备选方案与约束；Implementer 需要已接受的契约、
相关文件与代码约定；Reviewer 需要标准、diff 和证据，而不是 Implementer 找到方案前的全部对话。

这种划分提高了有效上下文与总上下文的比例：

- 每个 CodingAgent 都获得更聚焦的目标；
- 公共资源保存在 Workspace 中，不必反复写进 prompts；
- 细节在需要时再读取；
- 审查从契约与结果出发，而不是从作者累积的辩护出发；
- 长会话不再继续携带已经完成的阶段。

减少 token 使用可以是收益，但不是承诺。划分合理的图可以避免重复或无关上下文；Agent 过多、消息
重复、角色模糊的图反而可能消耗更多。目标不是让 CodingAgents 数量最大化，而是让每个 token 的职责
更清晰。

## 在确定角色后选择 provider、模型与 effort

职责明确后，再根据任务配置会话。在 provider 支持时，使用其原生控制选择模型与 effort。

考虑四个因素：

1. **歧义度：**任务需要先发现问题，还是只需执行明确契约？
2. **风险：**失败是局部且可逆的，还是会影响安全、数据、架构或 release？
3. **工具使用：**角色需要探索代码并执行命令，还是主要分析证据？
4. **协调成本：**更强的会话能否减少 handoff，还是确实需要第二种视角？

更高的 effort 通常适合模糊的 Specifications、架构决策和高风险审查。机械且边界清晰的任务可以使用
更快的模型或更低的 effort。实现任务则取决于修改规模，以及浏览和测试代码的需要。

不要把这些建议变成永久分工。“Provider A 永远实现”“Provider B 永远审查”只是用习惯替代工程判断。
应为每个角色重新评估配置，并根据产出证据的质量不断调整。

## 用对话完成 handoff 与并行工作

同一流程中的 CodingAgents 无需沉默工作。当 Agent 需要完成以下事情时，使用 Kavor 消息：

- 将实现交给另一个 Agent 审查；
- 向 Specification 作者请求澄清；
- 在把 finding 记录为阻塞项前先讨论；
- 将修正结果交回再次验证；
- 协调可以并行推进的独立调查。

一条有效消息应说明：

- handoff 的目标；
- 哪些图资源包含上下文；
- 已完成和验证了什么；
- 接收者应执行什么动作；
- 结果需要保存在哪里。

对话是异步且可检查的，但不能替代持久记忆。需要跨越 handoff 的决策，应写回 Specification、Sticky
Note 或其他合适的 output，而不应只隐藏在消息里。

只并行处理那些不会争夺同一决策、也不会修改同一表面的工作。两个 Agent 可以调查不同假设，或审查
彼此独立的方面。两个 Implementers 如果没有明确分工却修改相同文件，通常会带来更多协调，而不是速度。

## 应避免的做法

### 把整个周期集中在一个会话

分析、Specification、实现、审查和 release 面对不同问题，也使用不同标准。一个会话承担全部阶段时，
它的假设、干扰和盲点也会一直被保留。

### 为每个子任务创建 Agent

没有独立职责的拆分只会增加消息、重复上下文和协调成本。如果无法描述不同的结果与停止条件，通常
就不需要另一个 CodingAgent。

### 为了方便始终使用相同配置

模型或 effort 不足会降低模糊、关键任务的质量；过度配置则会在机械工作上浪费时间和 tokens。应根据
角色的风险与性质选择配置。

### 让 Implementer 审查自己的思路

自我审查能发现简单错误，却不能产生独立性。当第二种视角很重要时，应使用另一个会话，提供明确标准
并让它访问可验证结果。

### 让 Agents 彼此隔离

手动在会话间复制消息会破坏来源链并隐藏 handoff。应使用 Kavor 对话完成审查、澄清和并行协调。

### 让决策只存在于消息中

消息用于协调参与者。Specifications、Sticky Notes 与 outputs 才用于保存 Workspace 必须记住的内容。

## 三种起步方案

### 小型修改

使用一份 Specification、一个 Implementer 和一个 Reviewer。把两个 Agent 连接到必要上下文，并在
Sticky Note 或 Specification outputs 中保留实现与审查结果。这是最小的实用结构；本页视频展示了同一
逻辑如何扩展到 Shipper，同时不丢失上下文。

### 高风险修改

分开 Spec Writer、Implementer、Reviewer 和 Shipper。给 Reviewer 明确标准与质疑实现的独立性。
Shipper 负责准备交付证据，但不能替代你决定是否发布。

### 并行调查

使用两个 CodingAgents 探索不同假设或区域，再由第三个角色协调结果。开始前先定义每项发现要记录在
哪里，并用消息处理问题与 handoff。

## 开始前的检查清单

为每个 CodingAgent 确认：

- 我能否用一句话描述它的角色？
- 它是否有可观察结果与停止条件？
- 图是否只提供它需要的上下文与能力？
- provider、模型与 effort 是否匹配歧义度和风险？
- 它需要与谁沟通、为什么沟通，是否明确？
- 决策与证据是否会保存在对话之外？
- 增加这个 CodingAgent 带来的独立性、并行性或质量，是否足以抵消协调成本？

好的 Canvas 并不是 Agent 最多的 Canvas，而是让所有参与者（包括你）都能清楚看到职责、上下文、
handoff、证据与决策的 Canvas。

阅读 [CodingAgent 专题指南](./coding-agent.md)，在[用 Kavor 完成第一个闭环](./first-loop.md)中搭建这个结构，
或在[什么是 Kavor？](./what-is-kavor.md)
中复习相关概念。
