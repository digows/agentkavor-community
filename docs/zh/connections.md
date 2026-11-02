---
id: connections
title: Kavor 支持的 Connections 矩阵
description: 查看可直接连接的 Node 配对、结构作用、参数、Guardrails 与限制。
kind: guide
lastReviewedAt: 2026-10-30
canonicalUrl: https://agentkavor.com/zh/docs/connections
---

# Kavor 支持的 Connections 矩阵

Connection 不是工作流箭头，而是一种明确、无方向的关系，让两个 Nodes 进入 Canvas 的同一可达组件。

对 CodingAgent 来说，整张图都很重要：它可以使用沿有效 Connections 路径可达的任意 Node，即使资源没有直接连接到它。
直接 Connection 在选择 Schedule 目标、承载参数，或维护 CodingAgent 与资源之间的专属 Guardrail 时，仍然重要。

本页是 Kavor 允许直接连接的配对及其特殊契约的公开参考。

## 理解图谱的四条规则

1. **Connections 没有持久化方向。** 端点顺序不表达流程、控制或优先级。
2. **可达性具有传递性。** CodingAgent 与另一个 Node 之间存在有效路径时，两者属于同一上下文与能力图谱。
3. **有些规则仍然只作用于直接配对。** Guardrail 属于承载它的具体 Connection；Terminal 参数属于相应配对；Trigger 通过直接 Connection 选择唯一目标。
4. **不支持某个配对，意味着不能直接连接。** 两个 Nodes 仍可通过其他受支持配对参与同一组件。

消息仍有发送者和接收者，Schedule 仍向目标投递。这些方向属于具体操作，而不是 Canvas 上的 Connection。

## 支持的组合

| Node 组合 | 直接 Connection 的作用 | 参数 | 可用 Guardrail | 主要示例 |
| --- | --- | --- | --- | --- |
| **CodingAgent + Specification** | 将持久意图纳入图谱，并提供限制该 agent 的直接配对位置。 | 无 | `specification_read_only` | Spec Writer、Builder 和 Reviewer 使用同一份可达契约。 |
| **CodingAgent + Sticky Note** | 将非正式记忆纳入图谱，并提供限制该 agent 的直接配对位置。 | 无 | `sticky_note_read_only` | 让待定决定、进度、findings 和 handoffs 保持可见。 |
| **CodingAgent + Terminal** | 使 shell 对图谱可达，并提供限制该 agent 的直接配对位置。 | 无 | `terminal_read_only` | 诊断、tests、日志或协助受监督的 SSH 会话。 |
| **CodingAgent + File** | 将 filesystem 中的规范来源纳入图谱，并提供限制该 agent 的直接配对位置。 | 无 | `file_read_only` | 界定模块、PDF、图片、报告或配置。 |
| **CodingAgent + Diagram** | 使图表源文件与渲染结果对图谱可达。 | 无 | `diagram_read_only` | 生成可视方案，检查当前源文件的错误。 |
| **CodingAgent + WebBrowser** | 让智能体通过受控操作访问该 WebBrowser 的实时页面。 | 无 | 无 | 人与智能体在同一可见状态中导航、填写、验证并捕获证据。 |
| **CodingAgent + CodingAgent** | 将参与者纳入同一组件。任何可达 CodingAgent 都能与另一个交换消息。 | 默认投递模式 | 阻止 After turn、Native input 或 Send now | Builder 向 Reviewer 请求评审。 |
| **Specification + Terminal** | 把 Specification 的规范绝对路径导出到 Terminal 会话。 | 必填环境变量名 | 无 | 验证、检查或比较 Specification Markdown。 |
| **File + Terminal** | 把 File 的规范绝对路径导出到 Terminal 会话。 | 必填环境变量名 | 无 | 无需在窗口间复制路径即可运行脚本或使用 SQL 文件。 |
| **Diagram + Terminal** | 把 Diagram 源文件的规范绝对路径导出到会话。 | 必填环境变量名 | 无 | 将图表源文件作为项目工具的输入。 |
| **Trigger + CodingAgent** | 选择具有活动会话的 CodingAgent 作为 Schedule 提示词的目标。 | 无 | 无 | 唤醒 Maintainer 分析失败、编写报告并请求评审。 |
| **Trigger + Terminal** | 选择活动 Terminal 会话作为 Schedule 命令的目标。 | 无 | 无 | 运行 tests、数据库检查或维护脚本。 |

CodingAgent 与资源之间的直接 Connection 不是到达资源的唯一方式。它是将资源纳入该 agent 图谱最明确的方式，
也是放置该配对专属 Guardrail 的唯一位置。

CodingAgent + WebBrowser 有独立契约：Connection 通过受控操作提供该 Node 的真实页面，用于导航、交互、等待和
捕获。它不会继承通用 Guardrail，也不会绕过身份验证、网站权限或人的决定。专用浏览器 profile 接受无效的开发
证书；这是明确的浏览器行为，而不是 Connection 创建的权限。

## Guardrails 限制直接配对

图谱默认向可达 Nodes 开放。Guardrail 在 CodingAgent 与资源的直接 Connection 上记录用户选择的限制：

| Guardrail | Connection | 效果 |
| --- | --- | --- |
| `specification_read_only` | CodingAgent + Specification | 保留读取，禁止通过 Kavor 更改 lifecycle 和 outputs；直接编辑 Markdown 也成为明确的只读合同。 |
| `sticky_note_read_only` | CodingAgent + Sticky Note | 保留读取，阻止 append 或 replace 内容。 |
| `terminal_read_only` | CodingAgent + Terminal | 保留 Terminal 检查，阻止改变会话、进程或输入的操作。 |
| `file_read_only` | CodingAgent + File | 声明 agent 不应修改规范来源。 |
| `diagram_read_only` | CodingAgent + Diagram | 保留读取和结果查询；禁止写入源文件，并阻止重命名或删除 Node。 |
| `coding_agent_message_after_turn_blocked` | CodingAgent + CodingAgent | 阻止该配对间的 After turn 投递。 |
| `coding_agent_message_native_blocked` | CodingAgent + CodingAgent | 阻止该配对间的 Native input 投递。 |
| `coding_agent_message_immediate_blocked` | CodingAgent + CodingAgent | 阻止该配对间的 Send now 与 steering。 |

图中的替代路径不会消除 CodingAgent 与资源直接 Connection 上仍然存在的 Guardrail。
另一个 agent 的 Connection 上的限制，也不会变成该 Node 的全局策略。

如果 Guardrail 阻止某项由 Kavor 中介的操作，系统会在产生效果前拒绝它。Files、Diagrams 和 Specifications 正文也可能通过 harness
自己的 filesystem 工具访问；此时 Guardrail 是可见、受监控的合同，而不是操作系统 sandbox。

Guardrail 不会创建 Connection 或增加权限，也不会仅因 Node 在 Canvas 上靠近它就生效。

## CodingAgents 之间的投递

直接 Connection 为未指定模式的消息选择默认值。未配置时，默认是 **Native input**。Guardrails 允许时，agents 可以逐条请求其他模式。

- **After turn：** 等待接收者完成回合并可用。
- **Native input：** 使用 provider 的正常输入行为；根据能力和设置，可能接纳、排队、调整方向或中断。不保证无中断投递。
- **Send now：** 请求立即输入，可能中断工作。需要 provider 支持，不会撤销已经产生的修改、命令或其他效果。

![CodingAgent Connection 设置，包含 After turn、Native input、Send now 与投递 Guardrails](https://media.agentkavor.com/releases/2.0.0/agent-communication/delivery/master.cda7ab810311.png)

即使图中存在其他路径，直接 Connection 上的 Guardrail 仍然适用。这些模式都不能绕过人的草稿、审批或暂扣投递。接受与送达不代表任务完成。

## 带环境变量的 Connections

三种配对通过环境变量提供路径：

- **File + Terminal**；
- **Diagram + Terminal**；
- **Specification + Terminal**。

三种情况都需要选择环境变量名。提供给 Terminal 的值是来源的规范绝对路径，绝不是文件内容。

例如，连接为 `CHECK_SQL` 的 File 可以在 shell 中这样使用：

```sh
sqlite3 app.db < "$CHECK_SQL"
```

Kavor 在 Terminal 会话启动时应用该值。如果 shell 已打开时 Connection 或参数发生变化，界面会提示变量等待会话重启。
`TERM` 和 `COLORTERM` 是保留名称，不能用作这些参数。

## Schedule 的特殊限制

Schedule 是产品中可用的 Trigger 来源。每个 Trigger 最多只有一个直接目标：CodingAgent 或 Terminal。
Connection 选择该目标；配置中不重复保存目标 ID。

被 Schedule 唤醒的 CodingAgent 可以使用其组件内所有可达 Nodes，仍受原有边界和 Guardrails 约束。
Schedule 增加的是时间和 payload，不是新权限。

要成功送达，Kavor 必须正在运行、机器保持唤醒且目标会话处于打开状态。启动时，Kavor 会恢复被标记为保持打开、
同时作为运行中 Triggers 目标的会话，包括用户其他 Workspaces 中的目标。Schedule 不会启动被明确关闭的会话，不会把一次触发分发给多个目标，
也不承诺外部效果恰好发生一次。移除目标 Connection 会暂停 Trigger 并记录原因。

阅读 [Schedule：为图谱加上时钟](./schedule.md)，配置重复执行、使用 `Run now` 并理解持久历史。

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
- WebBrowser + Specification；
- WebBrowser + Sticky Note；
- WebBrowser + Terminal；
- WebBrowser + File；
- WebBrowser + Trigger；
- WebBrowser + WebBrowser；
- Terminal + Terminal。

Node 也不能连接自身。反转相同的两个 endpoints 不会创建另一条 Connection，因为持久关系没有方向。

这些限制不妨碍有用的组合。例如，Specification 和 Sticky Note 都通过受支持配对连接到 CodingAgents 时，可以参与同一张图；
不存在的只是它们之间的直接 Connection。

Canvas 上的距离、消息中的提及或同属一个 Workspace 都不能替代 Connections 路径。

## 选择能解决工作的最小结构

创建 Connection 前，先问组件缺少什么：

- 持久意图：添加 Specification；
- 人和 agent 之间的工作记忆：添加 Sticky Note；
- 执行或证据：添加 Terminal；
- 明确的规范来源：添加 File；
- 源内容可编辑的视觉解释：添加 [Diagram](./diagrams.md)；
- 人与 agent 共用的实时页面：添加 WebBrowser；
- 另一个视角：添加 CodingAgent；
- 时间确实是活动起因：最后添加 Schedule。

不要习惯性地让每个 CodingAgent 直接连接每个资源。建立让所有内容保持可达的最小拓扑；
只有在改善 Canvas 可读性、承载参数或需要专属 Guardrail 时，才增加直接 Connection。

## 复制 prompt 来检查 Connections

在要检查的组件内向 CodingAgent 提出请求，并说明它的任务。此请求不授权连接图谱外的既有 Nodes，也不授权修改 Guardrails。

```prompt
查阅 Connections 官方文档，并检查我的可达组件。
解释拓扑已经使哪些资源可达，以及哪些配对带有直接参数或 Guardrails。
针对我描述的任务，只有存在具体理由时才指出冗余或缺失的 Connections。
不要修改 Canvas。在我决定前，先说明提案及每项变更的影响。
```

**预期结果:** 区分传递可达性与直接契约的检查结果。建议不会创建访问权限、移除 Guardrail，也不会把 Connections 变成执行箭头。

## 继续阅读

- 阅读 [Nodes 中央指南](./nodes.md)，了解每个参与者的责任。
- 继续阅读 [CodingAgent](./coding-agent.md)、[Specification](./specification.md) 和
  [Terminal](./terminal.md)、[Sticky Note](./sticky-note.md)、[File](./file.md)、[WebBrowser](./web-browser.md) 和 [Diagram](./diagrams.md)
  专题指南。
- [闭合你的第一个 loop](./first-loop.md)，串联意图、实现、评审和人的决定。
- 了解 [CodingAgents 如何查看和构建 Canvas](./coding-agents-and-canvas.md)。
