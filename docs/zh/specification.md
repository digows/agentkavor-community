---
id: specification
title: "Kavor 中的 Specification：认真思考一次，更好地实现"
description: 用持久 Markdown 组织意图、决策和标准，管理多个 roots，并引导 Specification lifecycle。
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/zh/docs/specification
---

# Kavor 中的 Specification：认真思考一次，更好地实现

Specification 把意图转化为持久契约，让人和 CodingAgents 都能阅读、讨论、实现和审查，而不依赖某一次
对话的记忆。

它可以定义架构、集成、领域建模、feature、模块或一组有边界的修复。篇幅可以变化，职责不变：说明在工作
被视为完成之前，哪些条件必须成立。

![Kavor Workspace Settings，其中配置了四个 Specification roots。](https://media.agentkavor.com/releases/1.4.0/multiple-specification-roots/article.7d42383e3a37.jpg)

## 真相来源是一份文件

Specification 的内容以 Markdown 存放在 Workspace 中。文件属于你：可以在 Kavor 打开、用其他工具编辑、
在 Git 中版本化，也可以让 CodingAgents 直接读取。

Kavor 只在源文件周围维护身份、状态和 outputs 等运行元数据。Frontmatter 保存身份，使 Specification 的文件
移动或重命名后仍能被跟踪。

不要手动编辑 frontmatter 中由 Kavor 控制的字段。契约写在正文中，身份和 lifecycle 交给产品操作更新。

## 自己写，或与 CodingAgent 合写

你可以手动开始，也可以与 CodingAgent 共同编写。对于困难主题，在实现前使用专注规划的会话并投入更多推理
能力通常值得。

一个好的起点是：

> 围绕主题 X 采访我，以便编写 Specification Y。区分已验证事实、决策、假设、non-goals、失败场景和
> 可观察的验收标准。在仍有会改变解决方案的决策未完成时，不要把文档视为 Ready。

这里更好的思考可以减少返工、浪费的上下文和含糊实现。但它不保证成本更低：糟糕的 Specification 不会因为
更长或由昂贵模型编写而变好。

## 能指导工作的最小契约

有用的 Specification 通常包括：

- 背景与当前问题；
- 目标与成功定义；
- 限定范围的 non-goals；
- 决策与约束；
- 已确定时的预期方案；
- 可观察的验收标准；
- 相关失败场景和风险；
- 尚未解决的问题；
- 指向代码、ADRs、issues 或其他 Specifications 的引用。

如果 Workspace 已有更好的约定，文档无需遵循固定仪式。但它必须区分决策和假设，并让其他人无需重建原始
对话就能评估结果。

## Lifecycle 是指引，不是装饰

Kavor 使用五种状态：

| 状态 | 实际含义 |
| --- | --- |
| **Draft** | 问题仍在调查、讨论或决策。 |
| **Ready** | 契约已有足够信息，可以安全开始实现。 |
| **In progress** | Specification 授权的工作正在进行。 |
| **Blocked** | 某个具体条件阻止了有意义的推进。 |
| **Done** | 目标已经达成，契约要求的工作没有剩余。 |

状态刻意只提供建议。Kavor 不会把 Markdown checkboxes 变成专有系统，也不会自行证明所有标准已经满足。
把工作标为 Done 仍然需要证据和判断。

把撰写、实现与审查分开是一种稳健做法。协助撰写的 CodingAgent 可以解释契约；另一个负责实现；独立
Reviewer 对照结果与标准。

## 管理多个 Specification roots

一个 Workspace 可以把 Specifications 放在多个文件夹中。当项目已经按产品、工程、运维或模块拆分决策，
或者单一 root 已难以浏览时，这很有用。

打开 Workspace Settings，使用 **Specification roots** 添加、移除或重排文件夹。Roots 必须：

- 相对于 Workspace 目录；
- 有顺序；
- 唯一且互不重叠；
- 每个 Workspace 最多 32 个。

第一个 root 是 **Primary**，新 Specifications 默认进入这里。重排会改变默认目标，但不会移动已有文件。
移除 root 也不会删除文件。配置 roots 之外的 Specifications 会离开活动列表，再次添加该 root 后可以恢复。

存在多个 roots 时，Specifications 面板先按 root、再按实际 filesystem 文件夹分组。Canvas 不会创建平行
分类法；组织方式仍是你拥有的文件结构。

### 一个简单的 roots 布局

```text
docs/         产品的一般决策与契约
specs/        正在实现的 features 与集成
marketing/    活动与编辑实验
operations/   维护与运维变更
```

不要只为缩短列表而创建 roots。只有当每个文件夹代表人和 agents 都能理解的持久边界时才使用它们。

## Specification 从图中获得什么

Specification 接受两种直接 Connections：

- **Specification + CodingAgent** 让 agent 可达契约，并支持 lifecycle 与 outputs。Connection 可带有
  `specification_read_only`。
- **Specification + Terminal** 通过 Connection 上配置的环境变量，导出 Markdown 文件的规范绝对路径。

同一组件中的其他 CodingAgents 也可沿有效路径访问 Specification。除非有助于理解拓扑，或某个配对需要
特定 Guardrail，否则无需为每个参与者重复直接 Connection。

## 三种值得使用 Specification 的场景

### 架构基础

记录不变量、允许的依赖、安全边界、迁移策略与可验证标准。后续 features 可以遵循它，而不必让每个 agent
重新发现基础。

### 独立实现与审查的 feature

Spec Writer 穷尽决策并把契约移到 Ready。Implementer 依约工作。Reviewer 检查行为、失败和证据。Outputs
把 commits 或其他结果与工作关联起来。

### 一组有边界的修复

当多个缺陷共享原因或表面时，Specification 可以定义预期行为、准确修复集合和回归测试。如果它变成没有
共同边界的无限 bug 清单，就失去了契约作用。

## 一个实用图

```text
Spec Writer — Specification — Implementer — Reviewer
                        │
                     Terminal
```

Spec Writer 记录决策。Implementer 只执行 Ready 契约。Reviewer 对照结果与标准。Terminal 提供证据。是否
把工作视为 Done 仍由人决定。

## 应避免什么

- 仅因文字很长就离开 Draft，却未解决会改变方案的决策。
- 为方便而把分析、Specification、实现和审查放进同一会话。
- 写下“正确工作”或“性能良好”之类没有可观察结果的标准。
- 把 Kavor 控制的 frontmatter 当普通内容编辑。
- 把状态视为质量或完成的自动证明。
- 创建重叠 roots，或在没有持久边界时使用多个 roots。
- 把唯一的重要决策留在下一位参与者找不到的对话或消息中。

## 移到 Ready 之前

请确认：

- 问题、目标和 non-goals 是否清楚？
- 事实、决策和假设是否分开？
- 是否处理了相关失败场景？
- 验收标准是否可验证？
- Implementer 是否知道哪些内容可以和不可以修改？
- Reviewer 是否能在不继承作者推理的情况下评估结果？
- 会改变解决方案的问题是否已有答案？

好的 Specification 不试图预测每一行代码。它消除足够多的歧义，使执行与审查可以独立、可验证且可恢复。

继续阅读[在 Kavor 中闭合你的第一个 loop](./first-loop.md)，在
[CodingAgents 与角色](./agents-and-roles.md)中选择参与者，或查看
[Connections 矩阵](./connections.md)。
