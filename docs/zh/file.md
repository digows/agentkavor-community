---
id: file
title: "File：Canvas 上的上下文与范围"
description: 使用 File 保持规范来源可见、限定 CodingAgent 的上下文，并将它的路径传给 Terminal。
kind: guide
lastReviewedAt: 2026-10-01
canonicalUrl: https://agentkavor.com/zh/docs/file
---

# File 就是文件——而这已经很有力量

File 不是一次性的附件。它代表 Canvas 上的规范 filesystem 来源，让人清楚工作应该读取、评审、修改或作为
输入使用哪些材料。

![Kavor Canvas 上显示的 PDF File Node 及使用它的 CodingAgent](https://media.agentkavor.com/demos/pdf-canvas-agent/poster.7306bdccc7f5.jpg)

[观看 PDF 如何参与 Canvas 中的工作 →](https://agentkavor.com/zh/videos/pdf-canvas-agent)

*File 让材料保持可见，同时你在它周围组织 agents、决定和执行。*

## File 能做什么

File 自身允许你查看并使用 Workspace 来源。根据格式，Kavor 提供文本编辑、搜索、阅读偏好和丰富预览。

文本格式包括 Plain Text、Markdown、JSON、SQL、TypeScript、JavaScript、YAML、Shell、HTML 和 CSS。图片和 PDF
可以在 Canvas 上查看；SVG 可以在预览和 source 之间切换。

File 仍然指向真实来源。如果文件在 Kavor 外部发生变化，Node 会反映该变化，并在本地编辑需要协调时发出
提示。这样可以避免把上下文副本误认为最终要版本控制的工件。

## File 作为明确范围

连接 CodingAgent 后，File 会把一般意图变成具体工作来源。它可以限定一个模块，提供输入契约，保留图片或
PDF 供分析，或指出需要评审的配置。

可以这样开始：

> 将连接的 File 作为这项任务的规范来源。说明需要改变什么，保持范围，并在我确认计划后再编辑。

如果 agent 只需要查看材料，可以在直接 Connection 上使用 file_read_only Guardrail。agent 仍可到达 File，但不能
通过 Kavor 的中介操作修改其来源。

## File 作为 Terminal 输入

File + Terminal Connection 会通过你选择的环境变量名，把文件的规范绝对路径导出到 session。变量值是路径，
不是内容副本。

路径会在 Terminal session 启动时应用。如果 shell 已经打开时修改 Connection 或参数，界面会提示你重启
session 才能获得新值。

这对脚本、SQL、配置和报告很有用：File 让来源在 Canvas 上保持明确，Terminal 可以执行命令，而不必在窗口
之间复制路径。

## 三种使用方式

### 评审已有来源

将 File 连接到 CodingAgent，并要求它按风险进行阅读。进行视觉评审时，可让 File、用于记录 findings 的
Sticky Note 和用于检查的 Terminal 位于同一图中。

### 在明确范围内实现

连接 Specification、File 和 Builder。Specification 说明结果，File 标出具体来源，CodingAgent 进行修改并在
合适的位置记录证据。

### 将工件变成可执行输入

将 SQL 或脚本 File 连接到 Terminal，为变量命名，并从 shell 执行命令。如果也连接了 agent，它可以帮助解释
输出，而你仍能跟随过程。

## 示例：同一种组成部分，三种输入

### 以代码为审查焦点

将 HTTP 客户端文件添加为 File，连接 Reviewer，并让记录 findings 的 Sticky Note 保持可达。请求：

> 审查 HTTP 客户端的 File，重点关注 timeout、retry 和错误处理。以它为分析焦点。如果某项结论依赖其他文件，
> 请在扩大调查前明确该依赖。只记录有代码或复现支持的 findings，不要实施修复。

预期结果是范围集中的审查，包含场景及相关代码片段的引用。File 明确了焦点，但不会为 harness 的原生工具提供 sandbox。
请在请求中界定范围，并为 Kavor 操作使用适当的 Guardrail。

### 以 PDF 或图片为参考

将需求 PDF 或参考图片与 Specification 和 CodingAgent 放在同一张图中：

> 将 File 中的材料与 Specification 比较。区分明确要求、解释和疑问。对每一处差异，注明观察到的页码或元素，
> 并把问题记录到 Sticky Note。不要编造无法读取的内容。

你需要的是可验证的比较，而不只是摘要。解释材料的能力取决于格式和 harness 中可用的工具；Kavor 的 preview 让参考材料
对你保持可见。

### 以脚本为 Terminal 输入

为一个小型 Node.js 脚本创建 File，并将它与 Terminal 的 Connection 配置为变量名 `CHECK_SCRIPT`：

```javascript
console.log('Canvas file connection is working');
```

配置 Connection 后启动 Terminal 会话，并执行：

```sh
test -n "$CHECK_SCRIPT" && node "$CHECK_SCRIPT"
```

预期输出为 `Canvas file connection is working`。变量中保存的是脚本路径。如果为空，请检查 Connection 上的名称，
并重启会话以接收配置。这个例子使用 POSIX shell，且要求安装 Node.js；在 PowerShell 中，请用 `$env:CHECK_SCRIPT`
读取变量，并执行 `node $env:CHECK_SCRIPT`。

## 重要限制

- Connection 不会把 File 变成通用 filesystem 访问；Node 仍只代表配置好的规范来源；
- 并非所有二进制格式都能作为文本编辑；
- 导出到 Terminal 的路径不包含文件正文；
- File 专属 Guardrail 需要与 CodingAgent 的直接 Connection；
- 外部或并发变更必须在替换本地编辑前完成协调；
- 在 Canvas 上靠近 File 不会授予内容访问权。

## 继续阅读

- 查看 [Connections 矩阵](./connections.md)，包括 File + Terminal 和 CodingAgent + File。
- 了解 [CodingAgents 如何查看图](./coding-agents-and-canvas.md)。
- 将 File 与 [Sticky Note](./sticky-note.md) 组合，分开规范来源和工作记忆。
- 使用 [第一个 loop](./first-loop.md) 串联意图、实现、证据和评审。
