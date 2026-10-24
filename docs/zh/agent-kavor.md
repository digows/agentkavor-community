---
id: agent-kavor
title: 通过 Channels 与 Agent Kavor 对话
description: 关联 WhatsApp，选择 CodingAgent，通过 Self-chat 或 Workspace 专属群组参与工作。
kind: guide
lastReviewedAt: 2026-10-24
canonicalUrl: https://agentkavor.com/zh/docs/agent-kavor
---

# Agent Kavor：让对话随你同行

让 CodingAgent 继续工作，自己离开电脑，也能保持联系。Agent Kavor 让你通过 **Channels** 发送请求、查看回复并
参与决策。首个可用的 Channel 是 **WhatsApp**。

Agent Kavor 不是另一个模型，也不是替代 CodingAgents 的托管 agent，而是通过 Channels 与它们沟通的体验。
工作仍在 Kavor 的 Workspaces 中进行。Channel 也不是 Node 或 Canvas Connection：它传递对话，图谱仍决定 agent
的上下文与能力。

## 开始之前

- 保持 desktop 上的 Kavor 正在运行、已登录且能联网。电脑不能进入睡眠。
- 准备好 Workspace 和已配置的 CodingAgent，包括 harness 及其身份验证。
- 使用你有权关联为设备的 WhatsApp 账户。Self-chat 是最简单的起点。

请求仍受 CodingAgent 配置、provider 限制和人工控制约束。手机上的消息不能绕过 desktop 上等待中的审批。

## 1. 在 desktop 关联账户

1. 在 Kavor 顶部栏打开 **Channels**。
2. 开始关联 WhatsApp。扫描 QR code，或选择 **Link with a code**，然后在对应的 WhatsApp 账户中确认。
   关联代码不是短信登录。
3. 等待连接确认。一次明确发起且成功完成的关联会启用 Channel。
4. 在 **Personal chat** 中选择 **Self-chat**。如果关联的是另一个账户，也可以将 **Another number** 配置为
   个人收件目标。设置自动保存。

![desktop 上的 Channels 设置：WhatsApp 已连接，Self-chat 已选中，并显示 Workspace 群组设置](https://media.agentkavor.com/releases/2.0.0/whatsapp/setup/master.2552b26a5322.png)

设置中的发送测试只使用显示的个人目标，不会启动 CodingAgent 工作，也不会向所有群组广播。使用前请确认目标。

## 2. 在 Self-chat 选择 Workspace 和 agent

打开 WhatsApp 中的个人对话。引导会先让你选择 Workspace，再选择 CodingAgent。回答这些选择，并在发送第一个请求前
检查上下文确认信息。

![WhatsApp 引导中已选择 Workspace 与 CodingAgent，并确认对话上下文](https://media.agentkavor.com/releases/2.0.0/whatsapp/onboarding/poster-framed.7636ed112536.png)

[观看 WhatsApp 中选择 Workspace 和 agent 的演示 →](https://agentkavor.com/zh/videos/whatsapp-onboarding)

个人对话会保留选择。无需重新关联即可查看或切换上下文：

| 你的目标 | 命令 |
| --- | --- |
| 查看已选 Workspace 和 agent | `/context` |
| 列出 Workspaces | `/workspaces` |
| 在个人对话中切换 Workspace | `/workspace "我的项目"` |
| 列出 Workspace 中的 agents | `/agents` |
| 选择默认 agent | `/agent "Reviewer"` |
| 查看运行状态而非请求分析 | `/status` |
| 查看可用命令和示例 | `/help` |

请使用 Kavor 实际显示的名称。使用 `@Reviewer` 这样的明确提及，可以向另一个 agent 发请求而不改变默认选择。
状态查询显示运行状态，不证明实现已通过测试或评审。

### 查询并选择 CodingAgent 的账户

在选定的 Workspace 中，`/accounts` 显示各 provider 的使用情况、重置时间和账户储备。`/account` 显示所选 CodingAgent
的账户与模式；`/status` 也包含这些信息。

要固定使用某个已有账户或恢复自动选择，请使用账户的实际名称：

```text
@Reviewer /account "Trabalho"
@Reviewer /account auto
/autorotate codex off
```

最后一条命令会关闭该 Workspace 的 Codex **Auto Rotate**，不会移动正在运行的 agents。这些是 Kavor 的结构化控制，
不是向模型请求分析。选择另一个账户时，仍遵循 desktop 的相同校验和轮次之间的安全边界；命令回复不能证明切换已经完成。

添加账户、登录、退出、移除，以及选择参与账户或 Workspace 默认账户，仍然在 desktop 的 Accounts 面板中操作。
完整语法、示例与各项选择的效果，请参阅 [CodingAgent Accounts](./coding-agent-accounts.md#agent-kavor-命令)。
谁可以通过 Channel 发送命令的规则保持不变。

## 3. 远程参与工作

向已选 agent 发送明确请求，例如：

> 检查当前任务的测试结果，不要修改代码。告诉我哪些通过、哪些失败，以及你实际查阅了什么证据。

在同一对话中跟进进度和回复。如果 agent 需要决策，请使用对应问题提供的选项或要求的格式回答。
发送确认不等于完成确认。

简短状态通知将上下文和文字放在同一行，并保留格式。窄屏上仍会自然换行。完整回复、问题和长内容保留各自的排版。

[观看远程请求及 CodingAgent 完整回复 →](https://agentkavor.com/zh/videos/whatsapp-agent-interaction)

### 无需在 WhatsApp 发起新请求也能收到通知

你可以要求 CodingAgent 将结果发布到已配置的对话，即使任务是在 desktop 会话中开始的。例如：

> 完成这次评审后，请把摘要发送到这个 Workspace 的 WhatsApp 群组。不要发布到其他对话。

agent 会查找其 Workspace 中已启用的对话，并明确选择一个目标。一个 Channel 可以包含多个对话；这不是向所有群组
广播，也不会自动转发 agent 终端中的全部内容。

这种通知不需要回复之前的 WhatsApp 消息。相反，对收到的请求作出的回复始终返回原始对话，即使之后切换了 Workspace
或默认 agent。引用一条已知的 CodingAgent 回复，会把新请求交给该回复的作者，而不会改变对话的默认 agent。

### 发送音频，同时保留原件

你可以单独发送录音，也可以附带文字。在把请求交给任何目标 CodingAgent 之前，Kavor 会自动准备转录，并将其标记为
由音频生成的文字。说明文字、原始文件和接收者选择都会保留；转录可能有误，不会替代录音。

收到同一请求的 agents 使用同一个结果。精确重发同一请求或恢复其上下文时，会复用该音频的引用，而不是为每个 agent
请求不同的转录。转录限制为**每段音频 25 MB（25,000,000 字节）**，与原始附件存储限制不同。

说出 `/shutdown` 之类的命令不会直接触发 Kavor 控制：转录文字属于请求内容，不是命令解析器的输入。
需要操作控制时，请输入相应的文字命令。

如果准备失败，你会在原始对话中收到通知，等待中的 agents 不会收到该请求。请按通知操作，或改发文字请求。
无法读取或没有语音的录音可能需要替换；过大的录音可以换成更短的一段。服务故障或使用额度限制不代表 CodingAgent
已经开始工作。结果未确认时，不要假定成功，也不要假定系统会自动重试。

转录使用经过身份验证的云端服务，需要网络，并非完全离线。CodingAgents 仍在你的电脑上运行，原始音频的访问期限与
过期规则不变。

### 图片、视频和其他文件

你也可以交换图片、视频和文件，可带文字也可不带。图片需要所选 harness 和模型支持原生输入，或提供兼容的读取工具。
视频以原始文件形式尽力交付，不保证所有 agent 都能理解。Kavor 不会自动转换视频或提取视频帧。

受管理的附件及其临时副本会在**成功上传七天后**过期。读取、重试和转录都不会延长期限。附件过期后请重新发送；
过期不会删除你的原始文件或消息文字。

## 4. 用 Workspace 群组区分项目

如果需要持续绑定项目的对话，而不想在 Self-chat 中切换 Workspace，可以使用群组。

1. 关联后，在 **Workspace groups** 选择所需 Workspaces 并确认创建群组。也可以在 Workspace 的 Channels 标签中
   管理关联并选择已有群组。
2. 检查每个 Workspace 的结果。新群组名为 `Kavor · Workspace 名称`。
3. 打开群组，通过 `/agents` 和 `/agent "名称"` 选择 CodingAgent，或明确提及一个 agent。

群组的 Workspace 固定不变。你可以在该项目内切换默认 agent，但 `/workspace` 不能更换群组的项目。
新增 Workspaces 不会自动获得群组。

在 Workspace 的 Channels 中，**Check group** 会检查关联账户是否仍能访问群组。该账户无法访问不一定说明群组已被
删除。临时连接失败也不会自动移除关联。

要更换关联，请使用 **Remove group link** 并确认。它只解除这个 Workspace 的关联，保留 WhatsApp 群组、手机配对、
已接受的历史记录和其他 Workspaces。之后可以选择其他群组或创建新群组。如果创建结果尚未确认，请先检查，再考虑重试。

[观看 Workspace 专属群组的创建与打开过程 →](https://agentkavor.com/zh/videos/whatsapp-workspace-group)

**谨慎选择参与者。** 默认的 **All messages** 允许参与者发送请求并回答问题。**Mentions & replies** 要求提及关联账户、
使用 `@kavor` 标记，或引用 Kavor 消息进行回复。这是在过滤激活条件，不是逐人权限系统。添加成员可能意味着将操作
你的 agents 工作的权限委托给他们。

## 连接、隐私与恢复

- **电脑不可用：** WhatsApp 不会把 Kavor 变成托管服务。恢复 desktop 后先检查真实状态，再考虑重发可能已产生效果的操作。
- **agent 未回复：** 查看 `/context` 和 `/status`，再检查 desktop 上的登录、对话框或待审批事项。
  沉默不代表成功，也不授权重复破坏性请求。
- **连接中断：** 使用 Channels 中的重连控件。停止会保留关联；取消关联是另一项操作。
  自动重连不得撤销明确的停止或禁用选择。
- **问题或选择已过期：** 检查上下文并请求最新选择，不要假定旧选项仍指向同一目标。
- **隐私边界：** 执行与关联凭据留在电脑上，但消息经过 WhatsApp 服务，附件使用 Kavor 管理的临时存储，收到的音频
  还会使用云端转录。只发送你有权共享的内容。
- **WhatsApp 边界：** 集成使用关联设备，而不是 Meta 托管的 WhatsApp Business API。账户规则、限制和封禁仍由 Meta 控制。

## 继续阅读

- 了解 [CodingAgent 在图谱中能做什么](./coding-agent.md)。
- 组织 [agents 之间的消息与协作](./coding-agents-and-canvas.md)。
- 查阅 [Connection 投递模式与 Guardrails](./connections.md)。
- [结合真实场景建议下一个 Channel](https://github.com/digows/agentkavor-community/discussions/new?category=ideas)。
