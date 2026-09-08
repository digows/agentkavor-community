---
id: web-browser
title: "WebBrowser：在 agent 面前开发和测试"
description: 使用 Kavor 共享的 WebBrowser 开发 Web 应用、复现 bug、调试页面并验证 E2E 流程。
kind: guide
lastReviewedAt: 2026-09-08
canonicalUrl: https://agentkavor.com/zh/docs/web-browser
---

# WebBrowser 让应用同时出现在你和 agent 面前

WebBrowser 是 Canvas 中的实时 Chromium 表面。连接的 CodingAgent 可以观察、交互、等待、调试并测试你正在
查看的页面。

阅读本指南时，可以在另一个标签页打开 [Kavor 的 WebBrowser 演示](https://agentkavor.com/zh/videos/web-browser-node)。

## 把 browser 当作开发工具

开发 Web 应用不只是修改文件。CodingAgent 还需要打开应用、与它交互、等待真实状态，并调查 browser 中发生
了什么。

通过 CodingAgent + WebBrowser Connection，agent 可以使用由 Kavor 中介的一组操作：

- **观察：** 读取页面状态、获取可访问性 snapshot、截取 screenshot；
- **交互：** 点击、填写字段、插入文本、按键、选择选项、勾选控件、滚动、拖动、上传文件和响应对话框；
- **同步：** 等待 selector、文本、URL、加载状态、网络空闲或特定条件；
- **调试：** 查看 console 消息、网络请求和保留的响应正文；
- **测试：** 复现 bug、运行 E2E 流程并保留视觉证据；
- **隔离场景：** 在受控测试中阻止、继续或模拟网络响应；
- **管理页面：** 打开、选择和关闭标签页，跟踪下载并处理身份验证挑战。

目标不是把 browser 隐藏在自动化之后，而是让 agent 工作时的状态和动作可验证。

## Web 应用的实用 loop

先让 WebBrowser 和 CodingAgent 位于同一组件。如果应用在本地运行，也连接启动服务器的 Terminal。

要求 agent 先观察页面再行动，复现失败路径，收集 console、网络或 screenshot 证据，在明确范围内修改代码，
然后等待新状态并重新验证完整流程。把结果和剩余风险记录到 [Sticky Note](./sticky-note.md)。

可以从这样的提示开始：

> 打开连接的应用。先观察页面并在不修改代码的情况下复现流程。然后说明可能原因，提出最小修改，并用视觉和 console 证据验证完整路径。

## 也给人使用的 browser

你也可以把 WebBrowser 当作 Workspace 中的普通页面：打开文档、观看视频，或在 agents 工作时保留参考页面。

YouTube 和其他常见页面是自然用法。Netflix 等流媒体服务可能需要身份验证、DRM、权限或特定系统条件，
因此 Kavor 不保证任何特定服务的播放。

## 共享表面，而不是隐形 browser

agent 和人共享同一个实时页面。你可以看到动作并介入；agent 没有隐藏行为的私有窗口；持久化标签页属于
Kavor 自己的 browser profile，并在其 WebBrowsers 之间共享；外部 Chrome 的扩展、历史和 cookie 不会自动复用。

页面内容是不可信的。WebBrowser 也不是远程 browser 服务，更不是操作机器 filesystem 的通用权限。

## 限制与注意事项

CAPTCHA、passkey、网站权限、证书和身份验证提示可能需要你介入。snapshot 引用会在导航或 DOM 变化后过期，
所以应该重新获取 snapshot。网络规则是临时的，测试结束后必须清除。开发 profile 接受自签名、过期和私有
机构签发的证书，这会降低它对恶意网络的防护；在敏感服务中登录前要谨慎。

snapshot 可能省略 cross-origin frame，console 和网络历史也有界限；agent 应报告观察到的证据，而不是编造
无法检查的内容。

在同一窗口切换 Workspace 时，Kavor 会保留当前页面。即使另一个 Workspace 可见，连接的 CodingAgent 也可以
继续操作该页面。关闭标签页、删除 Node 或结束 session 会终止这种连续性。

## Connection 与 Guardrail

直接的 CodingAgent + WebBrowser pair 会把 browser 放入 agent 可达的组件。图中还可以通过有效路径包含
Specification、Files、Terminal、Sticky Note 和其他 CodingAgents；视觉接近或消息提及都不会创建访问权。

WebBrowser 目前没有自己的专用 Guardrail。这不影响图中其他资源的限制：read-only File 仍然只读，Terminal 保持
自身控制，Specification 继续遵守其 lifecycle。

## 继续阅读

- 查看 [Connections 矩阵](./connections.md) 中 CodingAgent + WebBrowser 的契约。
- 阅读 [CodingAgents 如何查看和构建 Canvas](./coding-agents-and-canvas.md)。
- 在[第一个 loop](./first-loop.md)中组合 browser、代码和证据。
- 使用 [Specification](./specification.md) 在测试应用前定义预期行为。
