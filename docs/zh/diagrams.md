---
id: diagrams
title: "Kavor 中的 Diagram：从想法到图形，全程留在图谱中"
description: 与 CodingAgent 一起创建图表，编辑源文件或 Excalidraw 绘图，并在 Canvas 上检查结果；附各格式的实用示例。
kind: guide
lastReviewedAt: 2026-11-02
canonicalUrl: https://agentkavor.com/zh/docs/diagrams
---

# Diagram：把解释变成看得见的图形

讨论架构、状态机或数据模型时，让人和 agent 看着同一张图会更容易。**Diagram** 将图形源内容保留在文件中，并在 Canvas 上显示。你可以请求方案、编辑源内容、查看结果并评审决策，而不必切换上下文。

图形不能替代 Specification：它可以揭示歧义、解释决策或呈现备选方案，契约仍应保留在合适的位置。

[![Canvas 上的 Mermaid Diagram 连接到 CodingAgent，旁边的 Sticky Note 提供演示上下文。](https://media.agentkavor.com/editorial/diagrams/overview/image.ffa637039fea.jpg)](https://media.agentkavor.com/editorial/diagrams/overview/native.e719329c8ac6.png)

图形与 CodingAgent、Sticky Note 参与同一张工作图谱。源内容仍保存在文件中。

## 创建或添加 Diagram

### 通过界面创建

1. 点击 Canvas 工具栏中的 **Diagram**，或打开紧接 **Specs** 的 **Diagrams** 面板，使用 **New diagram**。
2. 选择格式并输入名称。默认为 Mermaid。
3. 创建前检查显示的路径和扩展名。`Enter` 确认，`Escape` 取消。
4. 在 **Source** 中编写；如果使用 Excalidraw，则可开始绘图。

你也可以将工具栏中的 **Diagram** 拖到 Canvas 的目标位置。表单会在面板中打开，并在确认前保留该位置；直接点击工具栏时，则在可见区域创建。

表单没有单独的文件夹字段。从工具栏或通用 **New diagram** 操作创建时，使用 Workspace 配置的目标位置；从文件夹菜单的 **New Diagram…** 创建时，使用该文件夹。确认前请检查显示路径。重名和失败会留在表单中提示，不覆盖文件。draw.io 使用外部编辑器，因此不在创建格式列表中。

[![Diagrams 面板打开了 New diagram 表单，列出可创建的格式。](https://media.agentkavor.com/editorial/diagrams/panel-create/image.5cafbedbecc9.jpg)](https://media.agentkavor.com/editorial/diagrams/panel-create/native.fcf3ecd7562d.png)

在面板中选择要创建的格式。draw.io 从已有文件打开，因此不出现在此创建列表中。

### 选择新图表的文件夹

打开 **Workspace Settings → Documentation roots**。Specifications 和 Diagrams 共享这些根目录；不存在单独的 Diagram 根目录列表。

**Diagrams folder** 相对于**第一项 Documentation root**。默认值为 `diagrams`：根目录为 `docs` 时，结果是 `docs/diagrams/`。也可输入 `architecture/diagrams` 之类的嵌套文件夹，并在保存前检查计算出的目标位置。使用 `.` 可直接在第一项根目录中创建，不使用子文件夹。

修改此字段或重排 roots，只会改变之后创建文件的目标位置，不会移动已有文件或 Nodes。面板在 Documentation roots 内发现图表；根目录外的文件仍可通过明确路径在 Canvas 打开。发现配置不是新的文件系统权限。

### 从已有文件添加

在 Diagrams 面板使用 **Add to Canvas**，或[将文件拖到 Canvas](./adding-content.md)。扩展名决定格式，包括 `.vl.json` 这样的复合扩展名。来源仍留在原处，磁盘上的变更会更新 Node。

**SVG 需要明确选择：** 打开或拖入 `.svg` 通常创建 File，而不是 Diagram。让 CodingAgent 添加时，请明确要求 Diagram。如果同一文件已由 File 表示，此操作会转换 Node，并保留身份、位置、大小和 Connections，不修改文件。

每个来源在一个 Workspace 中最多对应一个 Node。重命名 Diagram 会重命名其源文件；移除 Node 不会删除文件。

## 与 CodingAgent 协作

说明你想传达什么，而不只是格式。“展示这个流程的决策和失败路径”比“画一张漂亮的图”提供的上下文更多。使用小型示例，并确认图形与系统相符。

下文提示词使用虚构数据，供你起步。粘贴到负责的 CodingAgent，发送前调整名称和路径。创建 Node 需要启用 `Allow workspace editing`；已有资源必须可达，Guardrails 仍然适用。没有结构编辑授权时，只请求源内容或指导。

没有指定路径时，CodingAgent 会查询 Workspace 的 **Documentation roots** 和 **Diagrams folder**，使用与界面相同的目标位置——默认配置下为 `docs/diagrams/`。提示词中的明确路径优先。示例都明确使用 `docs/diagrams/`；若要保存在另一项已配置根目录内并通过面板找到它们，请相应调整路径。

### 检查图形，而不只是语法

CodingAgent 可以编写源文件、将 Diagram 添加到 Canvas，并查询当前渲染结果：`rendered`、`failed` 或 `not_rendered`。失败时会收到引擎错误，以及可用时的行号。

源内容看起来有效，不证明已经渲染。`not_rendered` 表示没有针对磁盘上当前文件的有效观察结果；请打开或定位显示 Diagram，让它实际呈现。其他文件修订的结果、尚未保存的预览，以及重启前的观察，都不能证明当前渲染成功。

如果可达 Diagram 与 agent 的直接 Connection 带有 `diagram_read_only`，agent 必须保留源内容，不能重命名或删除 Node。不要用提示词或文件系统工具绕过该限制。

### 从请求到 Canvas 上的图形

[观看 CodingAgent 在 Canvas 上创建 CRM 实体图](https://agentkavor.com/zh/videos/creating-diagram)。

演示从一个 CodingAgent 和一张提供上下文的 Sticky Note 开始。用户请求基本的 CRM 实体图；agent 使用 Excalidraw 编写源文件，并在 Canvas 添加与自身连接的 Diagram。与下方示例一样，创建 Node 需要 Workspace 编辑权限。

结果包含 **Account**、**Contact**、**Lead**、**Opportunity** 和 **Activity**，字段和关系均为虚构。将它用作项目模型前，请先检查图形：它展示的是一项提案，不是对你真实数据库结构的分析。演示覆盖从创建到可视结果的过程；编辑、导出和文件夹整理在本指南中各有操作说明。

录像无声，界面和输入内容为英语。部分输入和等待片段已加速；最终结果以正常速度呈现。以上文字提供了完整的演示说明，无需依赖视频也能理解过程。

## 按要解释的内容选择格式

所有示例都要求生成源文件并在 Canvas 上检查，不要求执行应用代码。首次下载所需资源可能需要网络；参见[下载、隐私与离线使用](#下载隐私与离线使用)。

[![同一 Canvas 上的 Diagram Nodes 展示 D2、WaveDrom、draw.io、Mermaid 和 PlantUML 示例。](https://media.agentkavor.com/editorial/diagrams/formats/image.a4d2d23386fa.jpg)](https://media.agentkavor.com/editorial/diagrams/formats/native.6ceae5434ad2.png)

不同格式可以共存于 Canvas。这些图形仅供示意；下文逐一说明格式与限制。

### Mermaid — `.mmd`, `.mermaid`

适合从流程、时序和状态图开始。可用类型取决于 Kavor 集成的引擎；不要假设 Mermaid 刚增加的语法已经可用。粘贴到 CodingAgent，创建一个小型虚构流程。

```prompt
用 Mermaid 创建 docs/diagrams/checkout.mmd：购物车 → 支付 → 确认，并包含支付被拒的分支。
将它作为 Diagram 添加到我的图谱，并检查当前渲染结果。
修复报告的错误；不要修改应用，也不要在未观察结果时宣称成功。
```

**预期结果：** 一张失败路径清晰可读的流程图，以及渲染结果报告。没有有效观察时，agent 应报告 `not_rendered`，而不是推定成功。

### PlantUML — `.puml`, `.plantuml`

适用于 UML、时序图、甘特图、思维导图和线框图。JavaScript 引擎无需安装 Java。包括 C4 在内的标准库按需获取；首次使用 C4 可能需要额外下载。将提示词粘贴到 CodingAgent。

```prompt
使用 C4 库创建 docs/diagrams/checkout-context.puml：客户、商店和外部支付服务商。
标明关系，将文件添加为 Diagram，并查询当前结果。
如果缺少库或出现错误，先报告原因，不要直接声称图形已就绪。
```

**预期结果：** 一张明确显示外部依赖的简单 C4 上下文图。缺少网络或库，不应被当作图形已验证。

### Graphviz — `.dot`, `.gv`

适合通过顶点布局解释依赖的图。可用布局为集成引擎所包含的布局。将提示词粘贴到 CodingAgent；此处依赖均为虚构，不是从仓库推断的。

```prompt
创建 docs/diagrams/dependencies.dot：web 依赖 api；api 依赖 billing 和 catalog；后两者都依赖 storage。
从左到右排列图形，添加为 Diagram，并检查当前渲染。
不要编造真实项目的依赖；这里只绘制上述示例。
```

**预期结果：** 带标签的依赖图，不把示意图变成对项目的诊断。

### D2 — `.d2`

适合架构和组件关系。Kavor 提供 **Dagre 和 ELK** 布局；**不支持 TALA**。粘贴到 CodingAgent；布局选择有影响时，请明确指定。

```prompt
创建 docs/diagrams/order-service.d2，使用 Dagre 布局：客户端、API、队列和 worker，展示订单路径。
添加为 Diagram 并检查当前渲染。仅使用与 Dagre 或 ELK 兼容的功能，不用 TALA。
报告所有错误，不要修改真实基础设施。
```

**预期结果：** 清晰可读的架构图，不依赖 TALA，也不创建图中展示的服务。

### SVG — `.svg`

适合需要直接控制形状、标签和构图的矢量图。使用内置渲染。粘贴到 CodingAgent，并明确要求 **Diagram**，与普通 File 区分。

```prompt
创建 docs/diagrams/review-cycle.svg：Builder、Reviewer 和人工决策三个方框，依次连接。
使用自包含 SVG，不含脚本或远程资源，明确添加为 Diagram，而不是 File。
检查当前渲染并报告结果，不修改其他 Nodes。
```

**预期结果：** 以 Diagram 呈现的矢量图。仅有 `.svg` 扩展名，不会改变 File 的类型。

### Excalidraw — `.excalidraw`

适合希望继续以可视方式调整的探索性绘图。文件包含 Excalidraw 场景；这是 Kavor 中提供可视编辑器的格式。粘贴到 CodingAgent，准备一个简单场景。

```prompt
创建 docs/diagrams/review-workshop.excalidraw，包含有效场景：想法、实现和评审，并添加箭头和标签。
添加为 Diagram 并检查渲染。保持绘图简单，方便我通过 Edit drawing 继续编辑。
不要替换已有文件，也不要声称我已经完成评审。
```

**预期结果：** 可以通过 `Edit drawing` 打开的场景。生成场景本身并不证明所示流程合理；将其用于决策前，请先评审。

### draw.io — `.drawio`

用于查看该格式的图表，包括页面和图层。**View only**：Kavor 不提供可视编辑器，也不能在 Source 中编辑 XML。请用外部工具生成或编辑文件；获得授权时，CodingAgent 也可通过文件系统操作。粘贴到 agent，生成新示例，不要覆盖自己的已有文档。

```prompt
创建 docs/diagrams/order-overview.drawio，作为有效的 draw.io 文件，包含一页：客户端 → API → 数据库。
将已存在的文件添加为 Diagram，并检查当前渲染。
不要用 New diagram 创建 draw.io，也不要承诺能在 Kavor 内可视编辑。
```

**预期结果：** 可在 Node 中查看的页面。之后修改时，请使用外部应用或获授权的源文件编辑；Kavor 会跟随文件变更。

### Vega-Lite / Vega — `.vl.json`, `.vg.json`

用于数据图表。`.vl.json` 选择 Vega-Lite，`.vg.json` 选择 Vega。两者语法不同，不能仅替换扩展名。要制作不依赖网络的示例，请粘贴到 CodingAgent 并要求内嵌数据。

```prompt
用 Vega-Lite 创建 docs/diagrams/build-times.vl.json：柱状图显示虚构的构建耗时，分别为 12、18 和 9 秒。
将数据嵌入 JSON，标注坐标轴，不获取外部数据集。
添加为 Diagram 并检查当前渲染。
```

**预期结果：** 可进行比较、单位明确的图表。如需使用 Vega，请明确要求该语法及 `.vg.json` 路径。即使引擎已缓存，远程数据集仍需要网络。

### WaveDrom — `.wavedrom`

用于数字信号时序。Kavor 使用的源内容必须是有效 JSON，而不是 JavaScript 脚本。粘贴到 CodingAgent，展示一个简单握手过程。

```prompt
创建 docs/diagrams/handshake.wavedrom，使用有效 JSON，展示八个周期中的 clock、request 和 acknowledge。
明确 acknowledge 在何时响应 request；不要执行任何脚本。
添加为 Diagram 并查询当前结果，修复引擎报告的错误。
```

**预期结果：** 时间对齐的信号图。图形解释的是示例，不证明任何硬件实测结果。

### nomnoml — `.nomnoml`, `.noml`

用于简洁的 UML 草图。它有自己的语法，不能与 PlantUML 互换。将提示词粘贴到 CodingAgent。

```prompt
创建 docs/diagrams/order-model.nomnoml，包含 Order、OrderItem 和 Product，展示关系和少量属性。
使用 nomnoml 语法，添加为 Diagram，并检查当前渲染。
保持模型为虚构示例；不要修改项目的类或数据库结构。
```

**预期结果：** 用于讨论的实体草图，不把绘图自动转为实现。

### Pikchr — `.pikchr`

用于 PIC 风格绘图语言的技术构图。使用 Pikchr 语法，不是任意 PIC 程序。粘贴到 CodingAgent，绘制小型处理流程。

```prompt
创建 docs/diagrams/processing.pikchr，用带标签的方框和箭头表示输入、转换和输出。
使用 Pikchr 语法，添加为 Diagram，并检查当前渲染。
如果引擎拒绝源内容，先修复实际观察到的错误，再报告结果。
```

**预期结果：** 简单的矢量构图。看似合理的语法不能替代对引擎结果的观察。

### Svgbob — `.bob`

用于将 ASCII 草图转为矢量图。文本对齐是源内容的一部分。粘贴到 CodingAgent，并在文件中保留对齐。

```prompt
创建 docs/diagrams/request-path.bob，使用 ASCII：两个分别标为 Client 和 Server 的方框，以箭头连接。
保留对齐，添加为 Diagram，并检查当前渲染。
不要只粘贴图片：保留可编辑的文本草图作为源内容。
```

**预期结果：** 由文本草图生成的图形。空格变化可能改变几何形状。

### DBML — `.dbml`

用于讨论表、列和关系。源内容是 DBML，不是 SQL；渲染不会创建表或执行迁移。粘贴到 CodingAgent，并使用虚构模型。

```prompt
创建 docs/diagrams/shop-schema.dbml，包含 customers、orders 和 order_items，标明键和关系。
添加为 Diagram 并检查当前渲染。
不要连接真实数据库，不生成迁移，也不要把示例当作我项目的数据库结构。
```

**预期结果：** 可供评审的数据模型。以后若要呈现真实数据库结构，请提供获授权的来源，并将发现、假设和决策分开。

## 在图形和源内容之间切换

- **Diagram：** 优先显示可视结果。已有文件会在此视图打开。
- **Source：** 显示源内容。可编辑格式使用 Files 的编辑器和保存流程。
- **Split：** 左侧源内容，右侧预览，方便调整和比较，无需反复切换。

新建的源文本格式在 Source 中打开。Excalidraw 使用 **Edit drawing** 进入可视编辑器，**Finish editing** 返回图形。变更使用同一文件和保存流程，不存在单独的第二个 Save。可视编辑和源内容编辑不会同时处于活动状态。

draw.io 的 Source 保持只读。用 **Open with default app** 在外部编辑器中处理。

在 Diagram 视图中，按住右键拖动可移动内部视图；双指缩放或 `Ctrl`/`⌘` + 滚轮可调整缩放，不会拖动 Canvas。使用缩放控件和 **Fit** 调整取景。标题栏仍是移动 Node 的区域。Excalidraw 编辑器使用自身的控件。

[![PlantUML 使用 Split，左侧为源内容、右侧为渲染，另一个 Diagram 在 Excalidraw 可视编辑器中打开。](https://media.agentkavor.com/editorial/diagrams/source-editing/image.71cde50ac832.jpg)](https://media.agentkavor.com/editorial/diagrams/source-editing/native.57f2690ef912.png)

源文本格式可用 Split 同时查看代码和结果。Excalidraw 还提供对绘图本身的可视编辑。

### 预览过期时

如果某次编辑无法渲染，最后一次成功结果可能仍然可见，同时显示 **Preview out of date** 和引擎错误。它属于之前的源内容，不证明新内容成功。若引擎报告了真实行号，可在 Source 中打开该行；从未渲染成功的文件会显示源内容和失败信息。

修复语法、保存并检查当前结果。保存问题和冲突不同于渲染失败；不要因为屏幕上仍有图形就丢弃本地编辑。

### 导出以便分享

**Export** 提供完整图形的 SVG 和 PNG，不是截取 Node 可见范围。draw.io 导出活动页面及其图层。预览过期时，导出使用最后一次成功渲染，并明确提示。没有任何已渲染结果时，导出不可用。

## 不填满 Canvas 也能使用 Diagrams 面板

面板在 **Documentation roots** 内递归查找图表文件，遵循 `.gitignore`，支持按名称或路径搜索，并用 **All formats** 按格式筛选。它不会对 Workspace 中所有文件进行全局搜索。

列表映射磁盘上的真实文件夹层级。没有搜索或格式筛选时，也会包含空文件夹；可展开、折叠目录来导航。有多项 roots 时，树按根目录分组。

Specs 和 Diagrams 显示相同的 **Documentation roots**。在一个面板创建的文件夹也会出现在另一个面板：这是磁盘上的同一文件夹，不是副本。这不会把 Specification 变成图表，也不改变其生命周期。

- **Preview：** 打开只读预览，不添加 Node。悬停或选中行不会打开预览。一次仅有一个预览；`Escape` 关闭并将焦点返回该操作。
- **Add to Canvas：** 添加来源；若已有 Node，则定位已有项。
- **New diagram：** 通过内联表单选择格式和名称并创建。
- **Show in File Manager：** 在系统文件管理器中定位文件或文件夹。

预览可能需要下载该格式的引擎。关闭预览后，迟到的结果不会被当作另一个文件的有效渲染。

[![Diagrams 面板在 Canvas 外预览 Excalidraw 文件，同时显示另一个文件的 Add to Canvas 菜单。](https://media.agentkavor.com/editorial/diagrams/panel-preview/image.b05789ae15d3.jpg)](https://media.agentkavor.com/editorial/diagrams/panel-preview/native.1e11695f5729.png)

Preview 可查看图形而不创建 Node。Add to Canvas 是独立操作。

### 创建和整理文件夹

打开树中文件夹的上下文菜单：

- **New Diagram…：** 打开内联表单，在该文件夹内创建，即使它不是 **Diagrams folder** 中的默认目标。选择格式，输入名称并检查路径。
- **New Folder…：** 创建真实子文件夹；在需要图表前，可以保持为空。
- **Rename Folder…：** 修改文件夹名称，不改变其父目录。受影响的 Diagram Nodes 会跟随新路径。
- **Show in File Manager：** 在系统文件管理器中打开所在位置。

这些操作不能重命名或删除已配置的 Documentation roots。要修改发现根目录或新建文件的默认目标，请使用 Workspace 设置，而不是删除文件夹。

### 重命名、移动和版本化文件

图表上下文菜单中的 **Rename Diagram…** 修改文件名，但保留扩展名，包括 `.vl.json` 这样的复合扩展名。移动文件时，将该行拖到树中的其他文件夹或根目录。如果已被 Git 跟踪，移动使用 `git mv`；未跟踪文件也可以移动。

重命名文件、重命名其文件夹或移动图表后，Diagram Node 会跟随路径。无需重新添加：Node 身份和 Connections 都会保留。

在 Git 仓库中，**Commit Diagram** 只提交该文件路径，并显示生成的提交哈希。不包含其他路径已暂存的变更。即使 Canvas 上没有 Node，也可以使用；版本化的是文件，不是图形快照。

若有尚未保存的本地编辑，请在改变来源或提交前处理界面要求的决定。操作失败时，读取面板信息并修复原因；不能仅因操作已发起，就认为移动或提交已完成。

### 删除时区分文件和 Node

在文件菜单选择 **Delete Diagram** 并确认后，会删除源文件及其 Diagram Nodes。这不同于仅从 Canvas 移除 Node，后者会保留文件。

**Delete Folder and Contents** 需要确认，并且只允许删除仅含受识别图表文件和真实目录的子树。若发现 Specification、其他类型文件、隐藏项或符号链接，面板会在作出任何变更前拒绝操作，并提示用 **Files** 处理混合内容。此检查仅适用于 Diagrams，**不改变 Specs 面板的删除规则**。

删除单个已跟踪图表时，Kavor 使用 Git 删除流程。如果 Git 因本地变更等原因拒绝，请先处理提示的状态再重试；确认删除不授权强行丢弃这些变更。

## 将源文件带入图谱

可达 Diagram 为 CodingAgent 的工作提供源内容和可视结果。不必让每个 agent 都直接连接它；若要对该配对应用 `diagram_read_only`，才需要直接 Connection。

与 File + Terminal 一样，**Diagram + Terminal** Connection 通过你选择的环境变量提供源文件绝对路径。变量值是路径，不是渲染后的 SVG 或 PNG。请在启动会话前配置，或重启会话以接收参数变更。参见 [Connections 矩阵](./connections.md)。

## 下载、隐私与离线使用

图形在 Kavor 内部渲染，不发送到外部渲染服务。引擎、字体和辅助资源按需下载、验证并保存在应用数据缓存中。打开 Kavor 或 Workspace 不会下载所有格式。SVG 使用内置显示功能。

首次使用后，已获取的资源可在离线时复用。Excalidraw 编辑器只有进入编辑时才下载；PlantUML 库（如 C4）和 draw.io 资源也可能需要首次下载。Kavor 更新若替换这些资源，下次使用可能需要重新下载。

首次离线尝试或下载失败时，Node 会显示原因和 **Retry**。可编辑格式的源内容仍然可用；能够获取资源后再重试。

**引擎已缓存不等于完全不使用网络。** 内容本身可以引用图片、数据集或其他远程资源。本地 includes 相对于图表所在文件夹解析，其变更也可能更新图形。打开不熟悉的源文件前请先审查；离线使用时，优先选择自包含内容，并提前准备所有所需资源。

图表显示区域与应用的特权界面隔离，但这不会让图表中的引用变成可信来源。如果让 CodingAgent 生成或分析内容，provider 的参与仍遵循所选 harness 的条件；不要把本地渲染与模型在本地处理混为一谈。

## 继续阅读

- [向 Canvas 添加内容](./adding-content.md)，无需多余地复制来源。
- 将决策保留在 [Specification](./specification.md)，用图形来解释。
- 查看[受支持的 Connections](./connections.md) 和 [CodingAgents 的上下文边界](./coding-agents-and-canvas.md)。
