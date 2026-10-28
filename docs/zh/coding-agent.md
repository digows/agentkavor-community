---
id: coding-agent
title: "Kavor 中的 CodingAgent：让你熟悉的 harness 成为图的一部分"
description: 选择 provider，保留原生体验，并把 CodingAgent 连接到正确的上下文、工具与参与者。
kind: guide
lastReviewedAt: 2026-10-28
canonicalUrl: https://agentkavor.com/zh/docs/coding-agent
---

# Kavor 中的 CodingAgent：让你熟悉的 harness 成为图的一部分

CodingAgent 是运行在 provider 原生界面中的编程 agent，如今它也成为 Canvas 上可见的参与者。

Kavor 不会用通用聊天界面替换每一种 harness。它保留 provider 的原生体验，并在其周围增加清晰结构：
明确的职责、可达的上下文、工具、其他 CodingAgents，以及你可以检查的边界。

![在 Canvas 中添加 CodingAgent 前，Kavor toolbar 中的 provider 选择器](https://media.agentkavor.com/demos/coding-agent-provider-selector/poster.22c2dccb70c5.jpg)

[观看如何选择 CodingAgent 的 provider →](https://agentkavor.com/zh/videos/coding-agent-provider-selector)

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

## 账户、使用情况与轮换

你可以在顶部栏查看 providers 的使用情况，并打开 **Accounts** 面板添加账户、选择各 Workspace 的参与账户，
以及使用 **Automatic** 选择或固定账户。原生登录仍然可用；配置其他账户是可选的，不会替换 provider 应用的登录。

[CodingAgent Accounts 指南](./coding-agent-accounts.md)说明使用窗口、Workspaces 之间的分配、偏好的初始复制、
保留会话连续性的切换，以及各 provider 的限制。

## 它单独能做什么

即使没有任何 Connection，CodingAgent 仍是 Workspace 内的 provider-native 会话。你可以与它对话、使用
harness 提供的工具，并选择其工作目录。当某个角色需要其他仓库或 worktree 时，该目录可以位于 Workspace 根目录
之外；它与会话的关联仍然明确。

Node 已经可以帮助拆分上下文：一个会话调查问题，另一个会话负责实现。不过，没有图时，共享上下文仍
取决于你在每段对话中提供什么。

Connection 会把孤立会话变成工作系统中的参与者。

### 在输入中提供文件或截图

在已打开的会话中，可以粘贴操作系统剪贴板里的文件或 PNG/JPEG 图像。Kavor 插入文件引用，
不会在 Canvas 中创建 File 或 Connection。请检查路径，写好请求后再发送；图像理解仍取决于 harness 的能力。

[Terminal 指南](./terminal.md#把文件和图像粘贴到会话输入中)说明步骤、限制，
以及粘贴的引用与长期保留在图中的资源之间的区别。

## 启动、重启或停止执行

Node 和 provider 进程不是一回事。即使执行已停止，CodingAgent 仍可保留在 Canvas 上。

- **Start** 在选定目录中启动已停止的会话。对运行中的会话重复使用 Start，不会创建另一个进程。
- **Restart** 关闭当前进程并启动替代进程，保留账户、工作根目录和恢复原生会话的意图。它不会清空历史，也不会撤销项目改动。
- **Shutdown** 停止执行，但不删除 Node 或原生历史。需要再次运行时使用 Start。

Kavor 会显示准备阶段，并报告 provider 已就绪或启动失败。待审批事项仍由你决定：启动或重启并不授权 agent 代你回答。

启动失败时，先阅读错误，再决定是否重试。修复缺失目录、安装、认证或提示的其他前置条件后，使用 **Retry**。新的尝试不等于之前的会话，也不能证明任务已经执行。

## 用 Git worktrees 分离工作

新对话可以分离上下文。Git worktree 还会分离 checkout，拥有自己的目录、文件和 index。两个 CodingAgents 可以在不同分支工作，而不切换共享 checkout 的分支。

在 CodingAgent 的 **Git** 控件中：

1. 选择基准引用和 worktree 名称。
2. 使用 **Create** 在 `.worktrees/` 下创建受管理的 worktree，并将其关联到该 CodingAgent。
3. 或对现有 worktree 使用 **Use**，选择其目录。
4. 请求修改或提交前，检查界面显示的根目录和分支。

选择 **Workspace root → Use** 会将 CodingAgent 返回 Workspace 根目录，但不会删除之前的 worktree。为 agent 创建或选择 worktree，不会更改共享 checkout 的分支、index 或文件。后续合并和清理是独立的决定。

运行中的 CodingAgent 更改 Git 关联时，Kavor 会在选定根目录重新启动它，并保留原生身份，以便在 provider 支持时恢复会话。明确停止的会话仍保持停止。恢复失败时，错误会保留，供修复和 Retry；更换根目录不等于会话已就绪。

worktree 不是本地环境的完整副本。已安装依赖和未跟踪文件（例如本地配置）可能不存在。按项目要求准备环境，不要自动复制凭据。不存在的路径或无效 worktree 必须在启动前修复，不能静默换成另一个目录。

删除 worktree 不等于删除它的 Node。Kavor 会拒绝删除或完成仍被其他 CodingAgent 引用的 worktree。如果文件夹在 Kavor 之外被删除，请先检查 Git 状态并恢复关联，再继续工作。

## 用 Fork 探索另一条路径

**Fork** 从现有会话的原生历史创建另一个 CodingAgent。源会话保持独立；新 Node 拥有不同的会话身份，并与 Fork 请求方建立一条 Connection。

可用它在不重开对话的情况下探索替代方案，或从已有上下文分出一项调查。之后，为新 CodingAgent 定义目标和停止条件。

是否支持取决于 provider 和已安装版本。Claude Code、Codex、Grok 和 OpenCode 集成了 Fork；Antigravity 在 Kavor 中不提供此能力。必须存在可分叉的原生会话。如果历史不可用或 provider 拒绝操作，Kavor 会报告失败，而不会把空白对话冒充成 Fork。

Fork 本身不会创建 Git 分支、准备依赖或隔离文件。默认情况下，新会话使用源会话的根目录；如果还需要代码隔离，请选择一个已经准备好的独立 worktree。复制粘贴 Canvas Node 也不能替代 Fork：复制不会携带原生会话历史。

## 通过 Channels 对话

你也可以通过 Channel 与同一个 CodingAgent 对话，首先支持 WhatsApp。agent 仍在 desktop 上运行，使用 Workspace 的上下文与限制；远程对话不会替换 harness，也不会创建另一个云端 agent。参阅 [Agent Kavor 与 Channels](./agent-kavor.md) 配置对话并选择接收者。

你可以要求 CodingAgent 将结果发布到该 Workspace 中已启用的对话，即使工作是在 desktop 开始的。这种发送会明确选择
一个目标，不是给另一个 CodingAgent 发消息，也不是向所有 Channels 广播。对人类请求的回复则保持原始对话。
参阅[无需在 WhatsApp 发起新请求也能收到通知](./agent-kavor.md#无需在-whatsapp-发起新请求也能收到通知)。

同一指南还说明收到音频后的自动准备、原件保留和图片、视频的实际限制。这些功能不会让所有 providers 都能读取任意媒体，
也不会绕过 desktop 上的审批。

## 它从图中获得什么

CodingAgent 可以使用其组件中通过有效 Connections 可达的任何 Node。并非每个资源都必须直接连接到它。

涉及 CodingAgent 的直接 Connections 各有明确作用：

| Connection | 带来的能力 |
| --- | --- |
| **CodingAgent + Specification** | 把持久的意图、范围和标准放入图中。直接 Connection 可带有 `specification_read_only`。 |
| **CodingAgent + Sticky Note** | 增加共享的非正式记忆，用于未决事项、进度和 findings。可带有 `sticky_note_read_only`。 |
| **CodingAgent + File** | 让 filesystem 中的规范来源在工作中变得明确。可带有 `file_read_only`。 |
| **CodingAgent + Terminal** | 允许执行命令、观察进程和读取 shell 证据。可带有 `terminal_read_only`。 |
| **CodingAgent + WebBrowser** | 允许智能体在与人所见相同的状态中观察和操作该 WebBrowser 的真实页面。 |
| **CodingAgent + CodingAgent** | 让参与者进入同一组件。可达的 CodingAgents 可以交换异步消息，并读取协调所需的上下文。 |
| **Trigger + CodingAgent** | 把该活动会话选为定时 prompt 的直接目标。Trigger 不会启动已经关闭的会话。 |

可达性不会覆盖直接契约。如果 CodingAgent 与资源之间的那条直接 Connection 带有 Guardrail，即使图中存在
另一条路径，该限制仍然约束这一对。

## 实用模式

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

### 使用实时页面

当任务依赖真实 Web 界面时，连接 WebBrowser。你继续查看和使用同一组标签页；CodingAgent 可以导航、交互、
等待变化并捕获证据，而不必从粘贴到 chat 的文本中重建页面。

切换 Workspaces 时，WebBrowser 可以保持活动，并在返回时恢复同一状态。这样，智能体无需在每次视觉上下文切换时
重新加载页面，即可继续已经授权的工作。

![CodingAgent 与 WebBrowser 连接在 Canvas 上](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)

[观看 CodingAgent 与 WebBrowser 如何协作 →](https://agentkavor.com/zh/videos/web-browser-node)

### 查看另一个 CodingAgent 的当前会话

可达的 CodingAgent 可以被动、分页地读取另一个 CodingAgent 当前 provider-native 会话中已完成的 turns。这能恢复
尚未成为消息或持久 output 的推理、证据和上下文。

读取不会向 provider 发送输入，不会激活被查看的会话；当另一个智能体需要行动、决定或回答时，它也不能替代消息。
如果会话在分页期间发生变化，旧 continuation 会被拒绝；读取者必须重新开始，避免混合不同历史。

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

## 示例：Reviewer 能够验证的交接

假设要修复一个注册表单。Specification 要求无效邮箱地址显示提示并阻止提交，同时有效地址的流程仍能正常工作。
使用上面的图，让 Builder 和 Reviewer 保持在独立会话中。

给 Builder 的请求：

> 实现 Specification 定义的校验。保持有效地址流程的行为。在 Terminal 中执行相关测试，记录修改的文件、命令和结果。
> 然后将 Specification 的 handle 以及用于审查的确切 commit 或 diff 发给 Reviewer。说明未完成事项，并在发布前停止。

有用的交接应标明交付结果，而不是复制整段对话：

> 实现位于 Specification outputs 中标明的 commit。无效、空值和有效邮箱地址的测试已在 Terminal Checks 中通过。
> 请审查该 commit 的标准和失败路径。记录 findings，并注明文件、场景和证据；完成后回复。本次审查不要修改代码。

给 Reviewer 的请求：

> 阅读契约并检查所引用的交付结果。验证每条标准，复现相关场景，并把结论加入 Sticky Note。区分已证实的缺陷和假设。
> 如果发现阻塞，说明哪个行为失败，并交回 Builder 修复。

预期结果是一项可明确识别的改动、一次独立审查，以及你基于证据作出的决定。如果 Builder 仍在修改交付内容，
请等结果稳定，或明确界定哪些内容已准备好供审查。两个智能体查看不同版本的代码，就不是在评估同一份交付。

## 重要限制

- CodingAgent 不会因视觉上靠近某个 Node 而获得访问；必须存在 Connection 路径。
- 在消息中引用 Node 不会授予访问权限。
- 被动读取另一个 CodingAgent 的会话不会激活它，也不会把持久决策转移到 Specification。
- Guardrail 只限制它所属的直接配对，不是 Workspace 全局策略。
- 消息负责协调，但不应成为持久决策的唯一保存位置。
- Providers 不一定提供相同的模型、权限、事件或会话操作。
- Trigger 把 prompt 交给活动会话；它不会扩大权限，也不保证外部效果恰好发生一次。
- 启用 `Allow workspace editing` 后，CodingAgent 可以在获授权的请求范围内控制会话并删除可达 Nodes，但不能修改 Guardrails 或绕过人工审批。参见 [Canvas 编辑边界](./coding-agents-and-canvas.md#allow-workspace-editing)。

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
