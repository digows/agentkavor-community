---
id: nodes
title: Kavor Nodes
description: 了解 CodingAgent、Specification、Sticky Note、Terminal、File 和 Trigger 各自的作用，以及它们连接后获得的能力。
kind: guide
lastReviewedAt: 2026-08-07
canonicalUrl: https://agentkavor.com/zh/docs/nodes
---

# 单个 Node 已经有用；图让工作成为系统。

Kavor 不要求你放弃喜欢的 coding agent、隐藏终端，或把每个决定都变成新的聊天。它把参与者、工具和上下文放在同一个
Canvas 上，让你看清谁在工作、使用什么资源，以及受哪些边界约束。

Canvas 上的每个一等元素都是 **Node**。CodingAgent 是 Node，Specification 也是。Sticky Note、Terminal、File 和
Trigger 共享同一空间，因为它们都能参与工作，只是各自承担不同责任。

Node 单独存在时已经有价值。创建 **Connection** 后，这种价值会成为明确的能力。多条 Connections 形成图后，上下文、
执行、记忆和协作便不再散落在相互隔离的窗口与会话中。

模型如下：

**Node → Connection → 图 → 人的决定**

这个顺序描述工作如何获得结构。Connections 不是持久化的箭头，也不是自动执行下一个方框的流程；它们是 Nodes 之间
可见的关系。

![Kavor Canvas 上相互连接的 CodingAgents、Specification、Sticky Note、Terminal、File 和 Trigger](https://agentkavor.com/kavor-nodes-and-connections-article.jpg)

*一个 Canvas 可以同时承载持久意图、共享记忆、执行、文件和定时触发原因，并保持参与者及其 Connections 清晰可见。*

## Connection 真正改变了什么

Connection 回答一个实际问题：**这两个 Nodes 能一起做什么？**

根据组合不同，它可以让 CodingAgent 使用 Specification、写入 Sticky Note、操作 Terminal、把 File 作为明确范围，或与
另一个 CodingAgent 对话。它也可以把 File 的规范路径提供给 Terminal，或在指定时间唤醒已有活动会话的 CodingAgent。

同时，Connection 也建立边界：

- Canvas 上相邻的 Nodes 不会因此互相获得访问权；
- 在消息中提到一个 Node 不会授予能力；
- 并非所有 Node 组合都受支持；
- Guardrail 可以限制 Connection 已授予的能力；
- 图让上下文可达，但不会自动批准操作。

结果少了“魔法”，却更加实用：你能在工作前、工作中和工作后检查结构。

## 六种 Nodes

### CodingAgent：让你喜欢的 harness 成为图中的参与者

CodingAgent 是你已经使用的原生 provider，运行在它自己的终端界面中。Kavor 不用通用聊天替代 Claude Code、Codex 或
Google Antigravity，而是保留各 harness 的原生体验，并把它放到 Canvas 上。

每个 CodingAgent 都可以有清晰角色。只要 harness 支持，它就保留原生的 provider、模型和 effort 选项。你可以让 Spec
Writer 专注问题和决策，让 Builder 专注实现，让 Reviewer 负责质疑结果。

相连的 CodingAgents 可以交换异步消息。你仍能在 Messages 面板查看对话并在需要时介入。把它们连接到 Specifications、
Files、Sticky Notes 和 Terminals 后，图会明确展示哪些资源参与了这项工作。

还是同一个 harness，只是上下文和能力变得可见。

### Specification：跨越会话的意图

Specification 用持久 Markdown 记录决策、范围、限制和验收标准。它可以描述架构基础、集成、领域建模、feature、模块，
或一组边界明确的修复。

你可以手动编写，也可以与 CodingAgent 共同完成。面对困难主题，在实现前投入最好的推理能力通常值得：此时深入思考，
往往比后来消除歧义更便宜。

Specifications 具有 lifecycle。**Draft** 用于调查和决策；**Ready** 表示合同可以实现；**In progress**、**Blocked** 和
**Done** 让工作状态保持可见。只有真正满足验收标准后，**Done** 才有意义。

把同一 Specification 连接到承担不同角色的 agents，就能分别指导编写、实现和评审，而不依赖某一次对话的记忆。

### Sticky Note：共享工作记忆

Sticky Note 是 Canvas 上的便利贴。你可以像使用普通速记一样记录问题、假设、临时决定、findings 和后续步骤。

连接 CodingAgent 后，它多了一双手。Agent 可以与你共同维护内容：在形成 Specification 时汇总待定决定；在实现过程中
记录需要你关注的事项；或回答“已经做了什么、正在做什么、接下来做什么”，而不把状态埋进聊天历史。

Sticky Notes 适合作为非正式、可见的记忆。当一项决定成为实现和未来维护所需的持久合同，应把它提升为 Specification，
而不是永远留在便签里。

### Terminal：始终可见的执行

Terminal 把 shell 保留在同一个可视 Workspace 中。你可以在多个终端之间切换、观察日志、运行检查，或保持与远程机器的
连接，而不离开周围的 Canvas。

连接 CodingAgent 后，你们可以在同一个 Terminal 中工作。Agent 能检查 output、在允许时运行命令、跟踪关联执行并协助
诊断。人的输入始终优先，Guardrail 也可以让 Connection 保持只读。

Files 和 Specifications 还能通过环境变量把路径提供给 Terminal。Trigger 可以把定时命令直接送到活动的 shell 会话。

Terminal 不会把执行藏在不透明的自动化背后；进程、命令和结果始终可见。

### File：参与 Canvas 的文件

File 就是文件。价值在于让它的规范来源在图中变得可见而明确。

连接 CodingAgent 后，它可以界定要读取、评审或修改的文件。在 Canvas 上，你也可以保持文本、图片或 PDF 可见，同时组织
其他工作。

连接 Terminal 后，File 的绝对路径可以通过环境变量暴露。这样就能直观地把脚本、SQL 文件、配置或其他材料作为命令输入，
无需在窗口之间复制路径。

File 不会变成一次性 attachment；它仍是 filesystem 中的真实来源。

### Trigger：可见的活动起因

Trigger 在时间上安排一个操作。它可以像操作系统 cron 一样把命令交给 Terminal，也可以向已有活动会话的 CodingAgent
发送清晰 prompt。

当目标已连接其他 Nodes 时，Trigger 的价值更大。它可以唤醒一个 agent：检查 File、在 Terminal 中运行验证、把报告写入
Sticky Note，并请求另一个 CodingAgent 做独立评审。

这样，一个日历时刻就能启动小型自治或半自治系统。Trigger 发起活动；图提供上下文、工具、记忆和协作。

Trigger 不会自行决定什么值得做，不会扩大权限，也不会启动你关闭的会话。它只有一个直接目标：CodingAgent 或 Terminal。

## 当 Nodes 形成图

当每个 Node 都有明确责任，每条 Connection 都表达真实需求时，Canvas 的价值才会显现。下面三个图展示这种递进。

### 从意图到评审

**Specification → Builder → Reviewer → 人的决定**

Specification 保存合同，Builder 实现，Reviewer 按验收标准核对结果。Sticky Note 保存 findings 和工作决定；Terminal 提供
tests 和检查等证据。

Connections 不会自动执行这个顺序。它们让所需参与者和能力在同一个图中可达。

### 定时维护

**Trigger → Maintainer**

Maintainer 连接到包含输入数据的 File、用于检查的 Terminal、记录报告的 Sticky Note，以及提供独立判断的 Reviewer。

Kavor 运行且目标会话处于活动状态时，Trigger 会在配置时间送达 prompt。CodingAgent 使用原有上下文和边界工作。你回到
Workspace 后可以查看结果、消息和证据。

### 受监督的运维命令

**Trigger → Terminal**

包含 SQL 或脚本的 File 通过环境变量把路径提供给 Terminal。Trigger 把定时命令送到活动会话。连接 Terminal 的
CodingAgent 可以协助分析结果，而你始终能看到整个过程。

这个图自动化的是“原因”和“执行”，不会假装系统能自行理解成功的含义。

## 从工作出发，而不是追求 Node 数量

更大的 Canvas 不一定更好。先建立能让结果可验证的最小结构：

1. 定义必须发生的事情；
2. 当决策、范围或标准需要长期保留时，加入 Specification；
3. 选择 CodingAgent 并赋予清晰角色；
4. 当具体范围必须明确时，连接 File；
5. 当任务需要执行或证据时，连接 Terminal；
6. 当人和 agent 需要共享工作记忆时，使用 Sticky Note；
7. 当独立评审或并行工作确实改善结果时，加入另一个 CodingAgent；
8. 当时间确实是活动起因时，最后加入 Trigger。

目标不是填满 Canvas，而是建立一个足够小、易于理解，同时足够完整、能保留意图、执行、证据和决定的系统。

## 继续阅读

- 查看[受支持的 Connections 矩阵](./connections.md)，了解每种组合的精确合同。
- 使用 Specification、两个 CodingAgents 和一个 Sticky Note [闭合你的第一个 loop](./first-loop.md)。
- 阅读[如何选择 CodingAgents 和角色](./agents-and-roles.md)，分离构思、实现、评审和交付。
- 返回[什么是 Kavor？](./what-is-kavor.md)，复习完整产品模型。
