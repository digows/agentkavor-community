---
id: diagrams
title: "Diagrams in Kavor: from idea to drawing, without leaving the graph"
description: Create diagrams with CodingAgents, edit source or an Excalidraw drawing, and check the result on the Canvas, with examples for each format.
kind: guide
lastReviewedAt: 2026-11-02
canonicalUrl: https://agentkavor.com/en/docs/diagrams
---

# Diagrams: turn an explanation into something you can see

An architecture, state machine, or data model is easier to discuss when human and agent look at the same drawing.
A **Diagram** keeps that drawing's source in a file and its presentation on the Canvas. You can ask for a proposal,
edit the source, see the result, and review the decision without switching context.

The drawing does not replace the Specification: it can reveal ambiguity, explain a decision, or give shape to an
alternative. The contract stays where it belongs.

[![A Mermaid Diagram connected to a CodingAgent on the Canvas, alongside a Sticky Note with the demonstration context.](https://media.agentkavor.com/editorial/diagrams/overview/image.ffa637039fea.jpg)](https://media.agentkavor.com/editorial/diagrams/overview/native.e719329c8ac6.png)

The drawing participates in the same working graph as the CodingAgent and Sticky Note. Its source remains in a file.

## Create or add a Diagram

### Through the interface

1. Click **Diagram** in the Canvas toolbar or open the **Diagrams** panel, immediately after **Specs**, and use **New diagram**.
2. Select the format and enter a name. Mermaid is the default.
3. Check the displayed path and extension before creating. `Enter` confirms; `Escape` cancels.
4. Write in **Source**, or start drawing if you chose Excalidraw.

You can also drag **Diagram** from the toolbar to the desired point on the Canvas. The form opens in the panel and
preserves that point until confirmation; clicking the toolbar creates in the visible area.

The form has no separate folder field. The toolbar or general **New diagram** action uses the destination configured
in the Workspace. A folder's **New Diagram…** menu uses that folder. Check the displayed path before confirming.
Name collisions and failures remain in the form without overwriting files. draw.io is not among the creation formats
because its editor is external.

[![The Diagrams panel with the New diagram form open and the list of formats available for creation.](https://media.agentkavor.com/editorial/diagrams/panel-create/image.5cafbedbecc9.jpg)](https://media.agentkavor.com/editorial/diagrams/panel-create/native.fcf3ecd7562d.png)

Choose a format to create through the panel. draw.io opens from an existing file, so it does not appear in this creation list.

### Choose the folder for new diagrams

Open **Workspace Settings → Documentation roots**. Specifications and Diagrams share these roots; there is no separate
list of Diagram roots.

The **Diagrams folder** field is relative to the **first Documentation root**. The default is `diagrams`: with the
`docs` root, the result is `docs/diagrams/`. You can enter a nested folder, such as `architecture/diagrams`, and check
the calculated destination before saving. Use `.` to create directly in the first root, without a subfolder.

Changing this field or reordering roots only changes the destination for future creations. Existing files and Nodes
are not moved. The panel discovers diagrams within Documentation roots; a file outside them can still be opened on
the Canvas by its explicit path. Discovery settings are not new filesystem permissions.

### From an existing file

Use **Add to Canvas** in the Diagrams panel or [drag a file onto the Canvas](./adding-content.md). The extension
selects the format, including compound extensions such as `.vl.json`. The source stays in its original location;
changes on disk update the Node.

**SVG is an explicit choice:** opening or dragging a `.svg` normally creates a File, not a Diagram. When asking a
CodingAgent to add it, say you want a Diagram. If a File already represents the same source, this operation converts
the Node while preserving its identity, position, size, and Connections, without modifying the file.

Each source has at most one Node per Workspace. Renaming a Diagram renames its source; removing the Node does not
delete the file.

## Work with a CodingAgent

Describe what you want to communicate, not just the format. “Show the decision and failure paths in this flow” gives
more context than “make a nice diagram.” Use small examples and check that the drawing matches the system.

The prompts below are starting points with fictional data. Paste them into the responsible CodingAgent and adjust
names and paths before sending. Creating the Node requires `Allow workspace editing`; existing resources must be
reachable, and their Guardrails still apply. Without structural authorization, ask only for source or guidance.

Without a supplied path, the CodingAgent reads the Workspace's **Documentation roots** and **Diagrams folder** and
uses the same destination as the interface — `docs/diagrams/` with default settings. An explicit path in the prompt
takes precedence. The examples use explicit paths in `docs/diagrams/`; adapt them if you want to keep files within
another configured root and find them through the panel.

### Check the drawing, not just the syntax

A CodingAgent can write source, add its Diagram to the Canvas, and query the current render result:
`rendered`, `failed`, or `not_rendered`. On failure, it receives the engine error and a line number when available.

Source that looks valid does not prove it rendered. `not_rendered` means there is no valid observation for the current
file on disk; open or reveal the Diagram so it is displayed. Results from another file revision, unsaved previews, and
observations from before a restart do not count as current success.

If the Diagram is reachable with `diagram_read_only` on the direct Connection, the agent must preserve the source and
cannot rename or delete the Node. Do not use a prompt or filesystem tools to bypass this restriction.

### From a request to a drawing on the Canvas

[Watch a CodingAgent create a CRM entity diagram on the Canvas](https://agentkavor.com/en/videos/creating-diagram).

A practical demonstration starts with a CodingAgent and a context Sticky Note. The user requests a basic CRM entity
diagram; the agent uses Excalidraw, writes the source, and adds a Diagram connected to itself on the Canvas. As in the
examples below, creating the Node depends on Workspace editing permission.

The result includes **Account**, **Contact**, **Lead**, **Opportunity**, and **Activity**, with fictional fields and
relationships. Check the drawing before using it as your project's model: it illustrates a proposal, not an analysis
of your real schema. The demonstration follows creation through to the visual result; editing, exporting, and folder
organization have their own procedures in this guide.

The recording is silent and in English. Typing and waiting segments are accelerated; the final result appears at
normal speed. The text above lets you follow the demonstration without relying on the video.

## Choose a format for what you need to explain

All examples request source and a check on the Canvas, not execution of your application's code. The initial download
of required resources may need network access; see [downloads and offline use](#downloads-privacy-and-offline-use).

[![Diagram Nodes displaying D2, WaveDrom, draw.io, Mermaid, and PlantUML examples on the same Canvas.](https://media.agentkavor.com/editorial/diagrams/formats/image.a4d2d23386fa.jpg)](https://media.agentkavor.com/editorial/diagrams/formats/native.6ceae5434ad2.png)

Different formats can coexist on the Canvas. These are illustrative examples; formats and limits are detailed below.

### Mermaid — `.mmd`, `.mermaid`

A good starting point for flows, sequences, and states. It uses the types available in Kavor's integrated engine; do
not assume newly added Mermaid syntax is already included. Paste into the CodingAgent to create a small fictional flow.

```prompt
Create docs/diagrams/checkout.mmd in Mermaid: cart → payment → confirmation, with a declined-payment path.
Add it as a Diagram to my graph and check the current render result.
Correct reported errors; do not change the application or claim success without observing the result.
```

**Expected result:** a flow with a readable failure path and a reported render result. If no valid observation exists
yet, the agent reports `not_rendered`, not presumed success.

### PlantUML — `.puml`, `.plantuml`

For UML, sequences, Gantt charts, mind maps, and wireframes. The JavaScript engine does not require Java installation.
Standard libraries, including C4, are fetched on demand; the first use of C4 may require an additional download.
Paste into the CodingAgent.

```prompt
Create docs/diagrams/checkout-context.puml using the C4 library: customer, store, and external payment provider.
Label the relationships, add the file as a Diagram, and query the current result.
If a library is missing or an error occurs, report the reason before claiming the drawing is ready.
```

**Expected result:** a simple C4 context with an explicit external dependency. Missing network access or a missing
library must not be confused with validation of the drawing.

### Graphviz — `.dot`, `.gv`

For graphs where vertex placement helps explain dependencies. Layouts are those included in the integrated engine.
Paste into the CodingAgent; these example dependencies are fictional, not inferred from your repository.

```prompt
Create docs/diagrams/dependencies.dot: web depends on api; api depends on billing and catalog; both depend on storage.
Arrange the graph from left to right, add it as a Diagram, and check the current render.
Do not invent dependencies for the real project; this is only the example described.
```

**Expected result:** a labeled dependency graph, without turning an illustration into a project diagnosis.

### D2 — `.d2`

For architecture and relationships between components. Kavor offers **Dagre and ELK** layouts; **TALA is not supported**.
Paste into the CodingAgent and keep the layout choice explicit when it matters.

```prompt
Create docs/diagrams/order-service.d2 with Dagre layout: client, API, queue, and worker, showing an order's path.
Add it as a Diagram and check the current render. Use only features compatible with Dagre or ELK, without TALA.
Report any error and do not change real infrastructure.
```

**Expected result:** a readable architecture drawing that neither depends on TALA nor creates the illustrated services.

### SVG — `.svg`

For vector drawings where you want direct control over shapes, labels, and composition. Rendering is built in. Paste
into the CodingAgent and explicitly request a **Diagram**, preserving the distinction from an ordinary File.

```prompt
Create docs/diagrams/review-cycle.svg: three boxes, Builder, Reviewer, and human decision, connected in that order.
Use self-contained SVG without scripts or remote resources, and explicitly add it as a Diagram, not a File.
Check the current render and report the result without modifying other Nodes.
```

**Expected result:** a vector drawing presented as a Diagram. The `.svg` extension alone does not change a File's type.

### Excalidraw — `.excalidraw`

For an exploratory drawing you want to keep manipulating visually. The file contains the Excalidraw scene; this is
the format with a visual editor in Kavor. Paste into the CodingAgent to prepare a simple scene.

```prompt
Create docs/diagrams/review-workshop.excalidraw with a valid scene: idea, implementation, and review, with arrows and labels.
Add it as a Diagram and check the render. Keep the drawing simple so I can continue with Edit drawing.
Do not replace an existing file or claim my review is complete.
```

**Expected result:** a scene you can open in `Edit drawing`. Generating a scene does not by itself resolve the quality
of the flow it represents; review it before using it as a decision.

### draw.io — `.drawio`

For viewing diagrams in this format, including pages and layers. **View only**: Kavor has neither a visual editor nor
XML editing in Source. Produce or edit the file with an external tool, including the CodingAgent through the
filesystem when authorized. Paste into the agent to generate a new example, not overwrite your document.

```prompt
Create docs/diagrams/order-overview.drawio as a valid draw.io file with one page: client → API → database.
Add the existing file as a Diagram and check the current render.
Do not use New diagram for draw.io or promise visual editing inside Kavor.
```

**Expected result:** a page you can view in the Node. To change the drawing afterward, use the external application or
an authorized source edit; Kavor follows the file change.

### Vega-Lite / Vega — `.vl.json`, `.vg.json`

For data charts. `.vl.json` selects Vega-Lite; `.vg.json` selects Vega. They are different grammars; changing the
extension is not enough. For an example without a network dependency, paste into the CodingAgent and request inline data.

```prompt
Create docs/diagrams/build-times.vl.json in Vega-Lite: bars for fictional build times of 12, 18, and 9 seconds.
Include the data in the JSON itself, label the axes, and do not fetch external datasets.
Add it as a Diagram and check the current render.
```

**Expected result:** a chart with comparable values and clear units. To work in Vega, explicitly request that grammar
and a `.vg.json` path. A remote dataset still needs network access, even with the engine cached.

### WaveDrom — `.wavedrom`

For digital signal timing. Kavor uses valid JSON source, not a JavaScript script. Paste into the CodingAgent to
visualize a simple handshake.

```prompt
Create docs/diagrams/handshake.wavedrom in valid JSON with clock, request, and acknowledge over eight cycles.
Make it clear when acknowledge responds to request; do not execute any script.
Add it as a Diagram and query the current result, correcting errors reported by the engine.
```

**Expected result:** signals aligned in time. The drawing explains the example; it does not prove a hardware measurement.

### nomnoml — `.nomnoml`, `.noml`

For concise UML sketches. nomnoml has its own syntax, not interchangeable with PlantUML. Paste into the CodingAgent.

```prompt
Create docs/diagrams/order-model.nomnoml with Order, OrderItem, and Product, showing relationships and a few attributes.
Use nomnoml syntax, add it as a Diagram, and check the current render.
Keep the model fictional; do not change project classes or schema.
```

**Expected result:** an entity sketch for discussion, without turning the drawing into automatic implementation.

### Pikchr — `.pikchr`

For technical compositions in a PIC-style drawing language. It uses Pikchr grammar, not an arbitrary PIC program.
Paste into the CodingAgent for a small processing drawing.

```prompt
Create docs/diagrams/processing.pikchr with input, transformation, and output, using labeled boxes and arrows.
Use Pikchr syntax, add it as a Diagram, and check the current render.
If the engine rejects the source, correct the observed error before reporting the result.
```

**Expected result:** a simple vector composition. Visually plausible syntax does not replace observing the engine's result.

### Svgbob — `.bob`

For turning an ASCII sketch into a vector drawing. Text alignment is part of the source. Paste into the CodingAgent
and preserve alignment in the file.

```prompt
Create docs/diagrams/request-path.bob in ASCII: two boxes labeled Client and Server, connected by an arrow.
Preserve alignment, add it as a Diagram, and check the current render.
Do not just paste an image: keep the text sketch as editable source.
```

**Expected result:** a drawing generated from the text sketch. Changes to spaces can change the geometry.

### DBML — `.dbml`

For discussing tables, columns, and relationships. The source is DBML, not SQL; rendering neither creates tables nor
runs a migration. Paste into the CodingAgent using a fictional model.

```prompt
Create docs/diagrams/shop-schema.dbml with customers, orders, and order_items, indicating keys and relationships.
Add it as a Diagram and check the current render.
Do not connect to a real database, generate migrations, or treat the example as my project's schema.
```

**Expected result:** a data model you can review. To represent the real schema later, provide authorized sources and
keep findings, assumptions, and decisions separate.

## Switch between drawing and source

- **Diagram:** prioritizes the visual result. Existing files open in this view.
- **Source:** shows the source. Editable formats use the Files editor and saving workflow.
- **Split:** source on the left and preview on the right, useful for adjusting and comparing without switching context.

New source-format diagrams open in Source. For Excalidraw, use **Edit drawing** to enter the visual editor and
**Finish editing** to return to the drawing. Changes use the same file and saving workflow; there is no second,
separate Save for the drawing. Visual editing and source editing are not active at the same time.

draw.io keeps Source read-only. Use **Open with default app** to work in an external editor.

In Diagram view, right-button dragging pans the internal view; pinch or `Ctrl`/`⌘` + scroll wheel adjusts zoom without
dragging the Canvas. Use zoom controls and **Fit** to frame the drawing. The header remains the area for moving the
Node. The Excalidraw editor retains its own controls.

[![PlantUML in Split, with source on the left and rendering on the right, and another Diagram open in the Excalidraw visual editor.](https://media.agentkavor.com/editorial/diagrams/source-editing/image.71cde50ac832.jpg)](https://media.agentkavor.com/editorial/diagrams/source-editing/native.57f2690ef912.png)

For source formats, Split brings code and result together. Excalidraw also offers visual editing of the drawing itself.

### When the preview becomes stale

If an edit fails to render, the last successful result may remain visible with **Preview out of date** and the engine
error. It belongs to the previous source and does not prove the new source succeeded. When a real line number is
reported, you can open it in Source; a file that has never rendered shows the source and failure.

Correct the syntax, save, and check the current result. Saving problems and conflicts differ from render failures;
do not discard a local edit just because a drawing is still on screen.

### Export to share

The **Export** action offers SVG and PNG of the complete drawing, not a cropped capture of what fits inside the Node.
For draw.io, it exports the active page and its layers. If the preview is stale, export uses the last successful
render and reports this. Without any rendered result, export is unavailable.

## Use the Diagrams panel without filling the Canvas

The panel finds diagram files recursively within **Documentation roots**, respects `.gitignore`, and lets you search
by name or path and filter by format in **All formats**. It does not search all Workspace files.

The listing mirrors the actual folder hierarchy on disk. Without a search or format filter, it includes empty folders;
expand and collapse directories to navigate. With multiple roots, the tree is grouped by root.

Specs and Diagrams show the same **Documentation roots**. A folder created in one panel appears in the other: it is
the same folder on disk, not a copy. This neither turns a Specification into a diagram nor changes its lifecycle.

- **Preview:** opens a read-only view without adding a Node. Hovering over or selecting a row does not open it.
  There is one preview at a time; `Escape` closes it and returns focus to the action.
- **Add to Canvas:** adds the source; if a Node already exists, the action locates it.
- **New diagram:** creates through the inline form, with format and name.
- **Show in File Manager:** locates the file or folder in the system file manager.

A preview may need to download the engine for its format. Closing it does not turn a late result into a valid render
of another file.

[![The Diagrams panel with an Excalidraw file preview open outside the Canvas and another file's Add to Canvas menu.](https://media.agentkavor.com/editorial/diagrams/panel-preview/image.b05789ae15d3.jpg)](https://media.agentkavor.com/editorial/diagrams/panel-preview/native.1e11695f5729.png)

Preview lets you inspect the drawing without creating a Node. Add to Canvas is a separate action.

### Create and organize folders

Open a folder's context menu in the tree:

- **New Diagram…:** opens the inline form to create inside that folder, even if it is not the default destination in
  **Diagrams folder**. Choose the format, enter the name, and check the path.
- **New Folder…:** creates a real subfolder; it can remain empty until you need a diagram there.
- **Rename Folder…:** changes the folder name without choosing a different parent directory. Affected Diagram Nodes
  follow the new path.
- **Show in File Manager:** opens the location in the system file manager.

Configured Documentation roots cannot be renamed or deleted through these actions. To change discovery roots or the
default destination for new creations, use Workspace settings rather than deleting a folder.

### Rename, move, and version the file

In a diagram's context menu, **Rename Diagram…** changes the filename while preserving its extension, including
compound extensions such as `.vl.json`. To move the file, drag its row to another folder or root in the tree. If it
is already tracked by Git, the move uses `git mv`; an untracked file can also be moved.

The Diagram Node follows the path after renaming the file, renaming its folder, or moving the diagram. You do not
need to add it again: the Node's identity and Connections are preserved.

In a Git repository, **Commit Diagram** creates a commit containing only that file's path and shows the resulting
hash. It does not include changes at other paths already staged. The action works even without a Node on the Canvas;
it versions the file, not a capture of the drawing.

If there is an unsaved local edit, resolve the presented choice before changing the source or committing. If the
operation fails, read the panel message and correct the cause; do not consider a move or commit complete just because
you started the action.

### Delete without confusing files and Nodes

**Delete Diagram**, in the file menu and after confirmation, deletes the source and removes its Diagram Nodes. This
differs from removing only a Canvas Node, which keeps the file.

**Delete Folder and Contents** requires confirmation and only deletes a subtree containing recognized diagram files
and real directories. If it encounters a Specification, another file type, a hidden entry, or a symbolic link, the
panel refuses the operation before changing anything and directs you to **Files** to handle mixed content. This check
is specific to Diagrams; it does not change the Specs panel's deletion rules.

When deleting an individual tracked diagram, Kavor uses Git's deletion workflow. If Git refuses the operation, for
example because of local changes, resolve the reported state before trying again; confirmation does not authorize
forcibly discarding those changes.

## Bring the source into the graph

A reachable Diagram provides source and visual results for a CodingAgent's work. You do not need to connect every
agent directly to it; a direct Connection matters when you want `diagram_read_only` to apply to that pair.

A **Diagram + Terminal** Connection provides the source's absolute path through an environment variable you choose,
as with File + Terminal. The value is the path, not the rendered SVG or PNG. Configure it before starting the session
or restart the session to receive a parameter change. See the [Connections matrix](./connections.md).

## Downloads, privacy, and offline use

The drawing renders inside Kavor; it is not sent to an external rendering service. Engines, fonts, and supporting
resources are downloaded on demand, verified, and stored in the application's data cache. Opening Kavor or a
Workspace does not download every format. SVG uses built-in presentation.

After first use, resources already fetched can be reused offline. The Excalidraw editor is downloaded only when you
enter editing; PlantUML libraries such as C4 and draw.io resources may also need a first download. A Kavor update that
replaces these resources may require another download on next use.

On a first attempt offline or a download failure, the Node shows the reason and **Retry**. Source for editable formats
remains available; try again when the resources can be fetched.

**A cached engine does not mean no network access at all.** The content itself may reference images, datasets, or
other remote resources. Local includes resolve from the diagram's folder, and changes to them may update the drawing.
Review unfamiliar sources before opening them; for offline use, prefer self-contained content and prepare all
necessary resources beforehand.

The diagram surface is isolated from the application's privileged interface. This does not make the drawing's
references trustworthy sources. If you ask a CodingAgent to produce or analyze content, provider participation follows
the chosen harness's conditions; do not confuse local rendering with local model processing.

## Continue

- [Add content to the Canvas](./adding-content.md) without unnecessarily copying its sources.
- Keep decisions in the [Specification](./specification.md) and use the drawing to explain them.
- Check [supported Connections](./connections.md) and [CodingAgent context limits](./coding-agents-and-canvas.md).
