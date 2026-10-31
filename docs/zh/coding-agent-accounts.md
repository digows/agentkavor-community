---
id: coding-agent-accounts
title: "CodingAgent Accounts：你的账户、使用情况与轮换"
description: 查看 provider 的使用限制，添加自己的账户，并选择 CodingAgents 如何在 Workspaces 之间共享容量，而不替换原生登录。
kind: guide
lastReviewedAt: 2026-10-29
canonicalUrl: https://agentkavor.com/zh/docs/coding-agent-accounts
---

# CodingAgent Accounts：你的账户、使用情况与轮换

## 概览

一份 Specification 可以由 Builder 和 Reviewer 同时处理，另一个 Workspace 还可能运行第三个会话。
这些会话不必在你不知情的情况下争用同一个登录：**CodingAgent Accounts** 显示你的账户容量，
并让你选择 CodingAgents 如何使用它。

账户池属于你，在你的 Workspaces 之间共享。它不是与他人共享账户的功能。配置其他账户是可选的：
只有 provider 的原生登录时，你仍然可以像以前一样工作。

电脑上已有的登录就是主账户 **Main**。当 provider 返回邮箱地址时，Kavor 只用该邮箱作为显示名称；
无法获取身份时则显示 **Main**。在 Kavor 中添加账户不会替换这个登录，也不会让使用它的 provider 应用退出登录。

从 Workspace 顶部栏的 **Accounts** 分组开始。将指针悬停在 provider 上可查看摘要，点击可打开面板。
使用情况、账户、Workspace 的选择和偏好设置都在这个面板中；Settings 中没有另一个账户管理器。

## 使用情况

**百分比表示剩余容量，不是 agent 数量。** 多个 CodingAgents 可以使用同一个账户，同时消耗它的使用窗口额度。

![Accounts 界面示意图，展示 Claude Code、Codex、Antigravity 和 Grok 的用量指示。](https://media.agentkavor.com/product/2.1.0/coding-agent-accounts/header.118710635e3f.png)

此界面示意图使用参考截图中记录的数值，并非新读取的服务商用量。

### 阅读顶部栏摘要

- 每个指示器使用对应 provider 的颜色，最多显示账户的两个通用使用窗口，从最短窗口开始，接着显示下一个。
  同时有五小时窗口和每周窗口的账户会显示这两个；只有月度窗口的账户不会凭空多出五小时窗口。
  不同账户的百分比不会相加。
- 当该 Workspace 中有多个账户正在使用时，摘要代表的是这些账户中某个窗口剩余容量最少的账户。
  悬停信息会列出正在使用的账户及各自的窗口。
- 没有 CodingAgents 使用该 provider 时，指示器会淡显，并显示该 Workspace 的 Automatic 可选账户中，
  已知可用情况最好的账户。这不表示它已经被选中。
- **+N** 表示该 Workspace 的自动选择还可使用多少个容量已知的其他账户，不是独占预留。
  同时被其他 CodingAgents 使用的账户也可能计入。**+N?** 表示还有未知读数；只有一个账户的 provider 不显示储备数。
- 某个窗口达到轮换阈值时会变为琥珀色。当该 Workspace 的 Automatic 可用的所有账户都已确认达到或超过配置的阈值时，
  整个指示器会变为浅红色。这是容量信息，不会阻止工作。

### 查看窗口与读数

在面板中，每个窗口都会显示剩余容量和下次重置时间。特定模型的窗口位于账户详情中，不在通用指示器中。
打开 **More** 可查看 **Read** 时间、套餐、credits、累积的 resets，以及 provider 实际返回的其他数据。

可见读数会定期更新。更新期间，最后一次有效读数及其真实时间仍然可见；关闭后重新打开面板不会把旧数据变成新观测。
查询失败时会显示不可用状态或登录指引，不会用编造的数值替换最后有效的百分比。
使用 provider 选择器旁的 **Refresh** 可以请求更新。

**Unavailable** 或 **—** 不表示 0% 或 100%。未知读数既不能确认账户容量耗尽，也不能确认登录已过期。
请检查错误和时间，尝试刷新，或在有相应提示时重新登录。使用情况查询失败不会隐藏添加账户或重新登录的操作。

| Provider | 可能显示的信息 |
| --- | --- |
| **Codex** | 主要和次要窗口、各自的时段与 resets、按模型划分的适用范围，以及返回时可见的 credits 和累积 resets。时段因账户而异。 |
| **Claude Code** | 从原生使用情况结果中识别的窗口，例如会话窗口和每周窗口，以及百分比和 resets。本地 token 或费用统计不会被当作配额。 |
| **Grok** | credits 使用情况、时段与续期时间，以及返回时可见的套餐和预付余额。 |
| **Antigravity** | CLI 返回的组或 buckets 的剩余容量与 resets。 |
| **OpenCode** | 不参与这里的监测；使用情况取决于 harness 中配置的 provider。 |

查询通过 provider 的原生渠道进行，不会要求模型执行工作。查询余额不等于授权花费余额。

## 账户

### 添加账户并完成身份验证

1. 打开支持账户管理的 provider 面板：**Codex**、**Claude Code** 或 **Grok**。
2. 使用 **Add account**，输入易于识别的名称，例如 `Trabalho`，然后确认 **Add account and sign in**。
3. 在 provider 页面完成原生登录，需要时使用显示的代码。对于你发起的这次流程，授权地址只打开一次；
   如果 provider 的 CLI 会自行打开浏览器，Kavor 不会再打开第二个标签页。
4. 检查身份验证状态和使用读数。**浏览器打开不代表登录已经完成。**
5. 如果希望自动选择使用这个新账户，请在目标 Workspace 中启用其参与资格。
   新添加的账户最初在所有 Workspaces 中都不参与 Automatic；全局账户池不会自行启用它。

Kavor 会为添加的账户准备隔离配置环境。凭据保存在该账户的 CLI 所用的存储中，不在 Kavor 数据库中。
Main 的原生登录仍留在原来的位置。

登录过期时，使用 **Sign in again**。对于受管理账户，即使无法确定身份验证状态，面板也会提供此操作；
这不表示未知读数已被确认为登录过期。每次点击发起登录，包括重试，都会在授权地址可用时将其打开一次。
如果打开失败，请手动使用 **Continue provider sign-in**。重新打开面板或恢复待处理操作不会自行打开标签页。

### Main 不是登录副本

Main 直接使用 provider 在原位置保存的原生登录。面板不提供 Main 的登录、退出或移除操作；
请使用 provider 自己的工具管理。你在 Kavor 外更换原生账户后，Main 就代表新的登录，不会提供恢复先前账户的选项。

没有身份或使用数据的原生登录，例如 Codex API key，仍然可以像以前一样工作，但不参与自动轮换。
Kavor 不会读取凭据来尝试推断身份。

### 退出与移除不同

**Sign out** 会把账户留在列表中，供你再次登录。**Remove account** 会从列表中移除账户，
并删除 Kavor 管理的隔离配置环境；不会删除 Main 登录或共享的会话历史。

如果有 CodingAgents 正在使用该账户，Kavor 会显示受影响者并要求确认。更改会等待轮次之间的安全边界和旧进程释放。
固定使用该账户的选择会回到 Automatic；如果它是某个 Workspace 的默认账户，该默认值会回到 Main。
没有其他账户时，执行路径会使用原生登录。

## 个人配置副本

添加账户时，你会收到 provider 原生环境中个人配置的**初始副本**，避免为每个账户重新配置偏好、skills 和 MCPs。
复制哪些内容取决于 provider 以及源位置实际存在的内容：

| Provider | 复制的内容 |
| --- | --- |
| **Codex** | `config.toml`，包括偏好、profiles、个人 MCPs 和自定义 providers；`hooks.json` 中的个人 hooks；`AGENTS.md` 以及 `skills`、`plugins`、`rules`、`prompts` 目录。不复制 `forced_chatgpt_workspace_id`。 |
| **Claude Code** | `settings.json`，包括个人 statusline 和 hooks；`keybindings.json`；`CLAUDE.md`；`skills`、`plugins`、`rules`、`agents`、`commands` 目录。对于 `.claude.json`，只复制个人 MCPs，而不是整个文件。 |
| **Grok** | `config.toml`，包括偏好和个人 MCPs；`AGENTS.md` 以及 `skills`、`plugins`、`rules`、`hooks` 目录。 |

**嵌入这些配置中的秘密值也会被复制。** 这包括 MCP 环境变量值、静态 HTTP headers，以及写在这些文件中的自定义
provider 密钥。文件保留其权限；这些值不会写入日志或 Kavor 数据库。

**原生登录、身份验证文件、Keychain 项和账户身份绝不会被复制。** 添加的账户必须单独登录。
属于 Kavor 的集成条目也不会继承：Kavor 会为该账户准备自己的集成。

这是复制，不是同步。以后在 Main 中添加的 MCP，也需要在打算使用它的其他账户中配置。
修改添加的账户不会影响 Main；重复登录也不会再次复制偏好设置。

如果准备过程中报告配置错误，请先检查提示的个人 TOML 或 JSON，再重试。
不要通过复制身份验证文件或删除整个原生配置环境来尝试修复。

## 切换账户

### 选择每个 Workspace 的行为

CodingAgent 设置中的 **Manual** 选择会为该 Node 固定一个账户，优先于 Workspace 策略。
处于 **Auto (Automatic)** 的 CodingAgent 会遵循其 Workspace 对该 provider 的选择。

当实际生效的模式是 **Manual**，无论在 Node 上设置还是继承自 Workspace，完成一个轮次都不会触发用于轮换的容量查询。
这不会停用可见的用量读数或 **Refresh**。

在 Workspace 的 Accounts 面板中：

- 开启 **Auto Rotate** 时，参与开关决定 Automatic 可以使用哪些账户。即使使用同一个账户池，每个 Workspace
  也有自己的选择。不参与的账户仍然可见，可以在 CodingAgent 中手动选择，也可以在其他 Workspace 中使用。
- 只有一个参与账户时，即使达到阈值，Automatic 也会留在该账户上。没有参与账户时，会使用 Main 原生登录，
  该 Workspace 不进行自动轮换。
- 关闭 **Auto Rotate** 时，单选按钮决定 Automatic 模式下 CodingAgents 的默认账户。关闭时，默认账户会变为 Main，
  不会恢复以前的选择。参与设置会保留，以便再次开启 Auto Rotate 时使用。

保存 Auto Rotate 或参与设置会立即生效，**不会重启或重新分配正在运行的 agents**。
参与设置会在下一次实际自动选择时应用，例如打开会话或因阈值触发轮换时。相反，明确选择另一个默认账户或另一个 Manual
账户，可以在轮次之间的安全边界移动受影响的 CodingAgents。实际账户没有变化的 agent 不会重启。

![Codex 的 Accounts 面板，Auto Rotate 已开启，显示账户参与开关、剩余容量和轮换偏好；账户身份信息已遮盖。](https://media.agentkavor.com/product/2.1.0/coding-agent-accounts/panel.2cf397f707ee.png)

账户是否参与自动选择，在各 Workspace 的 Accounts 面板中设置。剩余容量和续期时间取自参考截图，并非实时查询 provider 的结果。账户身份信息已遮盖。

### Automatic 如何选择另一个账户

默认阈值为**已使用 95%**，可在 **Global rotation preferences** 中的 **Rotate at used capacity (%)** 调整。
Kavor 会考虑身份验证、套餐资格、所选模型、Workspace 参与设置和所有已返回的窗口。
它不会为了让某个账户符合选择条件而切换模型。

Automatic 的决策可以在你的 Workspaces 之间共享同一账户的有效读数，从原始查询起最多 **30 秒**。
复用不会延长这个期限。期限届满、用量窗口重置，或确认的认证或配额故障都要求重新评估；不可用数据不会被当作合格容量。
轮换仍在配置的阈值处预防性进行，无需等待某个轮次失败。

当前账户仍然有效时会保留它。需要从所有窗口都低于阈值的合格账户中选择时，Kavor 按以下顺序优先选择：

1. 已被该 Workspace 的 CodingAgents 使用的账户。
2. 没有被任何其他 Workspace 使用的账户。
3. 与最少其他 Workspaces 共享的账户。

候选条件相同时，优先选择容量最早重置的账户。四个 Workspaces 和四个可用合格账户可以因此实现每个 Workspace
使用一个账户。这不是独占预留：必要时账户可以共享。打开或关闭 Workspace 不会触发全面重新分配。

切换会在**轮次之间**用另一个账户重启 harness，恢复同一个原生会话及其历史。Node 会显示实际的等待、选择、重启和恢复阶段。
等待提示不会阻止仍可使用的终端；CLI 重启期间，终端会关闭，并在会话准备好后恢复。
切换成功不会触发系统通知；系统通知只用于真实故障，并标明 Workspace 和 CodingAgent。

### 容量耗尽与轮次失败

**仅仅是容量不足或耗尽，不会暂停 CodingAgent、阻止消息或禁用终端输入。** 没有容量可用的替代账户时，
它会留在当前账户上。Automatic 首次打开会话时，如果没有容量可用的合格账户，就使用 Main 并说明这一情况。
轮次的实际限制和计费仍由 provider 执行。

已确认登录过期的账户会被自动选择忽略；网络故障或未知读数不能确认登录过期。这也不会覆盖 Manual 选择。

对于 **Codex 和 Claude Code**，如果 provider 确认轮次失败是由账户配额造成的，可以在满足相同 Automatic 规则且可安全重发时，
换到另一个账户继续。交付不确定、身份验证、rate limit、总体过载或原因未知，都不构成重复请求的授权。
**失败的 Grok 轮次不会自动重发**，因为其原生信号无法区分配额与 rate limit；按使用阈值轮换仍然可用。

### Credits 与累积 resets

**Allow spending credits** 和 **Allow spending banked resets** 是两个独立权限，默认关闭。
它们控制 Kavor 的账户选择和轮换；看到余额不会启用其中任何一个。关闭 credits 时，达到配置阈值的账户不会因为仍有余额
而重新获得自动选择资格。这不会中断已经运行的会话，也不会更改你的 Manual 选择。

**这些选项不会阻止轮次内的原生计费。** 请在 provider 自己的设置中控制账户支出限额和付费消耗。
Kavor 不会购买 credits，也不会更改该登录的计费设置。

只有 provider 返回时，才会显示累积 resets 及其到期时间。累积 reset 的实际消耗尚未经过验证；
不能因为有余额或偏好选项，就认为消耗操作一定能够完成。

## CodingAgents 工具

CodingAgent 可以查询你的账户，而不获得凭据：

- `kavor_coding_agent_account_list_usage` 分页查询全局账户池和原生登录，包括窗口、resets、资格和观测时间；
  可以按 provider 筛选。
- `kavor_coding_agent_account_request_change` 为发起调用的 CodingAgent 请求在轮次结束时切换**自己的账户**，
  并遵守 Automatic 以及该 Workspace 允许使用的账户范围。

Manual 模式会拒绝切换请求；提出请求也不保证存在合格替代账户。这些工具不能切换其他 CodingAgent 的账户、登录、
移除账户、更改支出权限或访问 tokens。

例如：

将请求粘贴到 Workspace 的 CodingAgent。provider 必须提供本指南所述的用量数据；不要在 prompt 中包含凭据。

```prompt
比较我的账户的窗口与重置时间，不要更改任何选择。如果建议为你自己的会话切换账户，请解释哪些读数支持这个建议，
并尊重我的 Manual 选择。
```

**预期结果:** 比较基于实际可用的用量窗口、时间戳和限制。读取用量不会更改你的选择，也不授权产生费用。

## Agent Kavor 命令

在 **Agent Kavor** 对话中，包括通过已启用的 Channel，命令会操作选定的 Workspace，
无需模型轮次来解释控制意图。请使用 Kavor 实际显示的名称：

```text
/accounts
/accounts codex
/account
@Reviewer /account "Trabalho"
@Reviewer /account auto
/autorotate codex off
/autorotate codex on
/status
```

- `/accounts [provider]` 显示 Workspace 的使用摘要、重置时间和账户储备。它不是所有账户的完整导出：
  当结果更多或读数未知时，会说明限制并引导你打开面板。
- `/account [@Nome]` 查询选定或指定 agent 的账户与模式。附加账户名称或邮箱可将其固定；使用 `auto` 可回到 Automatic。
  含空格的名称需要引号。
- `/autorotate [provider] on|off` 在该 Workspace 中启用或关闭 Auto Rotate，不会移动正在运行的 agents。
  不指定 provider 时，使用默认 CodingAgent 的 provider；没有默认 agent 时，必须指定 provider。
- `/status` 包含账户和通用窗口；`/help` 显示可用的控制和示例。

固定到另一个账户时，仍遵循 desktop 的相同校验、安全边界和反馈。命令回复不能证明恢复已经完成。
添加账户、登录、退出、移除、更改参与设置和选择 Workspace 默认账户，仍然是在 desktop 面板中进行的操作。
Channel 的授权规则不变。

操作这些控制前，请参阅 [Agent Kavor 与 Channels](./agent-kavor.md)，选择 Workspace 和接收者。

## 各 provider 的支持情况与限制

- **Codex、Claude Code 和 Grok** 支持受管理账户，以及保留会话连续性的账户切换。账户套餐和模型必须支持执行。
  隔离配置不会把不符合资格的套餐变成受支持的套餐。
- **Grok** 不返回原生账户身份。Main 会保留这个中性名称；不会用套餐或余额来推断邮箱。
  轮次重发的例外已在上文说明。
- **Antigravity** 支持监测本机账户，不支持账户池、账户切换，也不支持本指南描述的配置复制。
- **OpenCode** 不参与这里的监测与账户管理；其限制取决于 harness 自身配置的 provider。
- 没有返回身份或使用情况的登录，仍然可通过原生路径使用；不会编造配额或开启自动轮换。
  可用信息和窗口可能因账户及身份验证模式而异。
- 缺失数据不等于余额为零。原生格式变化可能导致观测不可用；在认定配额耗尽前，请检查时间、消息和登录。

要使用这些账户组织工作，请继续阅读 [CodingAgent 指南](./coding-agent.md)和
[如何分配 agents 与角色](./agents-and-roles.md)。
