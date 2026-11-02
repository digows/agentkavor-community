---
id: adding-content
title: 向 Canvas 添加内容
description: 拖入文件，粘贴图片、链接和文本，复用 Node 组合，同时清楚掌握它们的来源与会话。
kind: guide
lastReviewedAt: 2026-10-30
canonicalUrl: https://agentkavor.com/zh/docs/adding-content
---

# 向 Canvas 添加内容

参考 PDF、问题截图、应用链接和调查笔记，都可以参与同一项工作。你不必先手动创建每个 Node：可以从系统拖入文件，或直接把内容粘贴到 Canvas。

结果取决于内容以及粘贴的位置。在 Canvas 上，粘贴会创建或定位 Nodes；在编辑器、Terminal、CodingAgent 或 WebBrowser 页面内，粘贴仍按该环境自身的方式处理。

## 从系统拖入文件

1. 打开目标 Workspace。
2. 从 Finder、Explorer 或其他文件管理器中，将一个或多个文件拖到 Canvas 的某个区域。
3. 在希望放置的位置松开。多个文件会按网格排列，并一起被选中。
4. 检查结果摘要：新增的 Nodes、已存在的来源，以及被忽略的项目。

文件**仍留在原处**。Kavor 不会导入、复制或移动它们。每个来源在一个 Workspace 中最多对应一个 Node：重复拖入会选中并显示已有 Node，不会复制它，也不会改变它的位置。

类型由来源决定：

- 属于该 Workspace 的 Specification 会显示为 Specification；
- 图表格式的文件会显示为 [Diagram](./diagrams.md)，但 SVG 除外；
- 其余文件显示为 [File](./file.md)。普通 `.svg` 仍是 File；如果希望按图表处理，需明确请求创建 Diagram。

文件夹不会被添加。如果同时拖入文件夹和文件，Kavor 会报告被忽略的文件夹，仍会添加有效文件。无法读取的文件也会在摘要中列出原因。

拖到 Terminal 或 CodingAgent 的输入区时，仍会向该会话插入路径，不会在 Canvas 创建 Node。Files 和 Specs 面板保留各自的拖动行为。

### Workspace 之外的文件

你可以引用文件，而不必把它放进项目文件夹。Node 会显示绝对路径和 `Outside this Workspace` 标记。Workspace 内的文件显示相对于根目录的路径。

外部文件发生变化时，显示内容会实时更新；来源被删除时，Node 会标明不可用。无需每次修改后都使用 Reload。若有尚未保存的本地编辑，替换内容前仍需处理冲突。

外部引用不会让文件成为仓库的一部分。共享项目或换一台机器时，请确认来源在预期路径仍然存在。

## 粘贴文件、图片、链接和文本

焦点位于 Canvas 时，在 macOS 使用 `⌘V`，Windows/Linux 使用 `Ctrl+V`。上下文菜单也提供 Paste，粘贴位置就是菜单打开的位置。键盘粘贴使用 Canvas 内的指针位置，或可见区域中心；重复粘贴会稍作偏移。

剪贴板提供多种表示形式时，Kavor 按以下顺序使用第一个适用项：

| 复制的内容 | Canvas 上的结果 |
| --- | --- |
| 在 Kavor 中复制或剪切的 Node 图谱 | 按下文规则粘贴选区。 |
| 在文件管理器中复制的文件 | 像拖放一样引用文件。 |
| 图片数据，例如没有源文件的截图 | 在 Workspace 中保存 PNG，并创建其 File Node。 |
| 单独一个 URL | 创建 WebBrowser 并打开该地址。 |
| 文本 | 创建 Sticky Note，保留原始文本，不将其解释为 Markdown。 |

如果希望向会话提供输入，而不是创建 Nodes，请在会话内部粘贴。将文件和图片粘贴到 harness 输入区的操作见 [Terminal 粘贴指南](./terminal.md#把文件和图像粘贴到会话输入中)。

### 粘贴的图片保存在哪里

图片数据是“只引用、不复制”规则的例外，因为它还没有可供 Canvas 使用的文件。Kavor 会在**第一项 Documentation root** 的 `assets/` 文件夹中写入 PNG。例如，使用默认根目录 `docs/` 时：

```text
docs/assets/pasted-image-20261030-093000.png
```

名称使用日期和时间；如已存在，会添加数字后缀，不覆盖任何已有文件。只有文件和 Node 都已创建，反馈才会显示实际保存路径。

剪贴板图片数据的上限为 **20 MB**。保存失败会作为图片失败报告，不会悄悄改为 Sticky Note。此上限不能替代下文的预览限制。

## 复制、剪切和粘贴 Nodes

可以用它复用已有效运作的组合，例如 Specification、Builder、Reviewer 和 Sticky Note。

1. 将焦点移出编辑器和会话，选择所有应一起转移的 Nodes。
2. 使用 `⌘C` / `Ctrl+C` 复制，或 `⌘X` / `Ctrl+X` 剪切。上下文菜单也提供这些操作。
3. 留在同一 Canvas，或打开目标 Workspace；也可以使用另一个 Kavor 窗口。
4. 放好指针并粘贴。继续工作前，检查参与者和 Connections。

只有**两个端点都被选中**的 Connections 才会被捕获。单独选择 Connection 不会带上 Nodes；连接到选区外参与者的关系不会复制。

复制会创建新身份，并保留相对布局。同一份复制内容可以多次粘贴。在同一 Canvas 内剪切只会重新放置组合，保留身份和会话。跨 Workspace 剪切会移动 Nodes 及内部 Connections，移除源端的边界 Connections；成功后剪切内容即被消耗。粘贴前，在源 Canvas 按 `Esc` 可取消剪切。

### 每种 Node 会带走什么

| Node | 保留的内容，以及不会克隆的内容 |
| --- | --- |
| Sticky Note | 内容和颜色。 |
| File 和 Diagram | 引用同一来源，不复制字节。若已有该来源的 Node，则复用它。 |
| Specification | 在所属 Workspace 中复用；在其他 Workspace 中显示为 File。生命周期仍归原 Workspace 所有。 |
| Terminal | shell 配置和打开意图，不包含缓冲区或历史。跨 Workspace 移动时，源会话会关闭。 |
| CodingAgent | provider、模型和偏好配置，不包含对话、消息或隔离 worktree。移动时源会话会关闭；请检查目标中的根目录和配置。 |
| Trigger | 复制后初始为暂停状态，不带触发历史。剪切会保留配置，但尚有未完成触发时不能移动。 |
| WebBrowser | 标签页，不包含弹出窗口、下载或观察记录。页面会在目标位置重新创建。 |

Connections 的 Guardrails 和参数按配对规则随组合转移。当 Specification 在另一个 Workspace 中变为 File 时，其只读限制会调整为 `file_read_only`；Diagram 保留 `diagram_read_only`。开始新任务前，请检查目标中的限制。

图谱剪贴板只属于当前运行的 Kavor。用其他复制内容替换它，或重启应用，都会使捕获失效；这绝不会删除待粘贴剪切的源内容。它不是备份，也不是跨机器导出格式。

一次捕获最多支持 **512 个 Nodes、2,048 条 Connections 和 16 MiB**。如果剪切选区在粘贴前发生变化，或来源不再存在，操作会被拒绝，不会部分粘贴。请检查源端并重新捕获。

## 理解文件预览

即使没有丰富预览，Node 仍代表真实来源：

- **UTF-8 文本：** 编辑器、可用时的预览、保存和冲突处理。
- **图片：** PNG、JPEG、GIF、WebP、BMP、ICO、AVIF 和 SVG。File 中的 SVG 作为图片显示，不作为应用界面的标记代码执行。
- **PDF：** 可在 Canvas 上查看页面，不提供表单编辑或批注，也不执行 PDF 中的 JavaScript。
- **图表：** 专门的显示和编辑方式见 [Diagram 指南](./diagrams.md)。
- **其他格式：** 卡片显示系统可提供的图标或缩略图、名称、类型、大小、修改日期和路径。音频和视频也使用此卡片，不提供内嵌播放。

图片和 PDF 的上限为**每个文件 32 MiB**；图片另有 **16 百万像素**上限。不支持的格式、超出限制或预览失败，不会把仍存在的来源标为文件缺失：卡片会解释情况，并保留可用操作。只有重试可能有效时才显示 `Retry`；重试不会解除大小或格式限制。

用 **Open** 在默认应用中打开，**Reveal in Finder** 或系统对应操作定位来源，**Copy path** 复制路径。缩略图取决于系统：macOS 和 Windows 可能提供；没有缩略图时，仍会显示文件图标。

## 撤销时区分 Nodes 和文件

每次添加内容或粘贴图谱，都会在 Canvas 历史中生成一条记录。Undo 撤销该操作创建的 Nodes，不会删除仅被引用的来源或原已存在的 Node。Redo 会恢复结果。

粘贴图片数据时由 Kavor 自行保存的图片不同：Undo 也会删除该 PNG，Redo 会恢复它。如果之后修改了图片，或创建了冲突引用，Kavor 可能拒绝撤销，以免删除后续工作。请检查原因，不要把 Undo 当作无条件删除文件。

跨 Workspace 剪切时，Undo 需要恢复两端。后续冲突变更也可能阻止操作，而不会只恢复半张图。

## 与 CodingAgent 一起使用内容

拖放、粘贴和图谱剪贴板是人的操作。CodingAgent 通过路径添加来源，不操作你的剪贴板。添加材料后，只连接应参与工作的内容。

首次阅读时，向 CodingAgent 指出刚添加的 Nodes，并使它们可达。不要包含凭据，也不要隐含授权修改。

```prompt
检查我在可达图谱中指出的 Nodes。
区分规范来源、视觉参考、实时页面和工作笔记。
解释这些材料如何帮助完成我描述的任务，并指出无法读取的内容。
不要修改文件、执行命令或创建 Connections；先说明你的理解。
```

**预期结果：** 简要列出实际查阅的材料，并明确缺口。预览不保证 harness 能理解所有格式，添加 Node 也不授权访问图谱外的内容。

## 继续阅读

- 使用 [File 作为上下文与范围](./file.md)，不把引用变成一次性副本。
- 与 CodingAgent 一起创建和评审 [Diagram](./diagrams.md)。
- 连接资源前查看 [Connections 矩阵](./connections.md)。
- 了解 [agents 能在 Canvas 上看到什么](./coding-agents-and-canvas.md)。
