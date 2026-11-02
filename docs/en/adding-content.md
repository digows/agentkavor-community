---
id: adding-content
title: Add content to the Canvas
description: Drag files, paste images, links, and text, and reuse groups of Nodes while keeping track of their sources and sessions.
kind: guide
lastReviewedAt: 2026-10-30
canonicalUrl: https://agentkavor.com/en/docs/adding-content
---

# Add content to the Canvas

A reference PDF, a screenshot of a problem, a link to the application, and an investigation note can all participate
in the same work. You do not need to start by creating every Node manually: drag files from your system or paste
content directly onto the Canvas.

The result depends on the content and where you paste it. On the Canvas, pasting creates or locates Nodes. Inside an
editor, Terminal, CodingAgent, or WebBrowser page, it remains that environment's paste operation.

## Drag files from your system

1. Open the destination Workspace.
2. Drag one or more files from Finder, Explorer, or another file manager onto an area of the Canvas.
3. Drop them where the group should appear. Multiple files are arranged in a grid and selected together.
4. Check the summary: Nodes added, sources already present, and skipped items.

The files **stay where they are**. Kavor does not import, copy, or move them. Each source has at most one Node per
Workspace: repeating the gesture selects and reveals the existing Node without duplicating it or changing its position.

The source determines the type:

- a Specification belonging to the Workspace appears as a Specification;
- a diagram-format file appears as a [Diagram](./diagrams.md), with the exception of SVG;
- everything else appears as a [File](./file.md). An ordinary `.svg` remains a File; explicitly request a Diagram
  when you want to treat it that way.

Folders are not added. If you drag a folder along with files, Kavor reports the skipped item and still adds the valid
files. A file that cannot be read also appears in the summary with the reason.

Dragging onto Terminal or CodingAgent input still inserts the path into that session; it does not create a Canvas
Node. The Files and Specs panels retain their own drag gestures.

### Files outside the Workspace

You can reference a file without placing it inside the project folder. The Node shows its absolute path and the
`Outside this Workspace` marker. Inside the Workspace, the displayed path is relative to the root.

Changes to an external file update its presentation live; if the source is removed, the Node marks it as unavailable.
You do not need to use Reload after every change. An unsaved local edit requires attention to conflicts before
replacing the content.

An external reference does not make the file part of the repository. If you share the project or switch machines,
check that the source will still exist at the expected path.

## Paste files, images, links, and text

With focus on the Canvas, use `⌘V` on macOS or `Ctrl+V` on Windows/Linux. The context menu also offers Paste at the
point where it opened. Keyboard paste uses the pointer location inside the Canvas or the center of the visible area;
repeated pastes receive a small offset.

When the clipboard offers more than one representation, Kavor uses the first applicable one in this order:

| Copied content | Result on the Canvas |
| --- | --- |
| A graph of Nodes copied or cut in Kavor | Pastes the selection, following the rules below. |
| Files copied in the file manager | References the files, as with drag and drop. |
| Image data, such as a screenshot without a source file | Saves a PNG in the Workspace and creates its File Node. |
| A single URL | Creates a WebBrowser open at that address. |
| Text | Creates a Sticky Note with the literal text, without interpreting it as Markdown. |

Paste inside a session when you want to provide input to it rather than create Nodes. For files and images in harness
input, see [pasting into the Terminal](./terminal.md#paste-files-and-images-into-session-input).

### Where a pasted image is saved

Image data is the exception to the reference-only rule: it does not yet have a file for the Canvas to use. Kavor writes
a PNG to the `assets/` folder of the **first Documentation root**. With the default `docs/` root, for example:

```text
docs/assets/pasted-image-20261030-093000.png
```

The name uses the date and time; if it already exists, a numeric suffix is added. No existing file is overwritten.
Feedback shows the actual saved path only after both the file and Node exist.

The clipboard image-data limit is **20 MB**. A save failure is reported as an image failure, not silently converted
into a Sticky Note. This limit does not replace the preview limits below.

## Copy, cut, and paste Nodes

Use this to reuse a working loop, such as a Specification, Builder, Reviewer, and Sticky Note.

1. Select the Nodes that should travel together, with focus outside editors and sessions.
2. Use `⌘C` / `Ctrl+C` to copy or `⌘X` / `Ctrl+X` to cut. The context menu offers the same actions.
3. Stay on the same Canvas or open the destination Workspace, including in another Kavor window.
4. Position the pointer and paste. Check the participants and Connections before resuming work.

Only Connections with **both endpoints selected** are captured. A selected Connection alone does not bring its Nodes,
and links to participants outside the selection are not copied.

Copying creates new identities and preserves relative placement. The same copy can be pasted more than once.
Cutting within the same Canvas only repositions the group, preserving its identities and sessions. Between Workspaces,
it moves the Nodes and internal Connections and removes boundary Connections at the source; the cut is consumed after
success. Before pasting, `Esc` on the source Canvas cancels the cut.

### What travels with each Node

| Node | What remains — and what is not cloned |
| --- | --- |
| Sticky Note | Content and color. |
| File and Diagram | A reference to the same source, not a copy of its bytes. An existing Node for the source is reused. |
| Specification | Reused in its owning Workspace; appears as a File in another Workspace. Its lifecycle remains with the original owner. |
| Terminal | Shell configuration and intent to open, not its buffer or history. Moving between Workspaces closes the source session. |
| CodingAgent | Provider, model, and preference settings, not its conversation, messages, or isolated worktree. Moving closes the source session; check the root and settings at the destination. |
| Trigger | A copy starts paused, without firing history. A cut preserves configuration but cannot move an unfinished firing. |
| WebBrowser | Tabs, not popups, downloads, or observations. Pages are recreated at the destination. |

Connection Guardrails and parameters travel with the group according to the pair's rules. When a Specification
becomes a File in another Workspace, its read-only restriction adapts to `file_read_only`; a Diagram retains
`diagram_read_only`. Review restrictions at the destination before starting a new task.

The graph clipboard belongs to the current Kavor run. Replacing it with another copy or restarting the application
invalidates the capture; this never deletes the source of a pending cut. It is neither a backup nor an export between
machines.

A capture accepts up to **512 Nodes, 2,048 Connections, and 16 MiB**. If a cut selection changes before pasting, or a
source disappears, the operation is rejected without a partial paste. Check the source and capture again.

## Understand a file's preview

The Node still represents the real source, even when it has no rich preview:

- **UTF-8 text:** editor, preview when available, saving, and conflict handling.
- **Images:** PNG, JPEG, GIF, WebP, BMP, ICO, AVIF, and SVG. SVG in a File is displayed as an image, not as application
  interface markup.
- **PDF:** pages viewable on the Canvas, without a form or annotation editor and without executing PDF JavaScript.
- **Diagrams:** format-specific presentation and editing in the [Diagrams guide](./diagrams.md).
- **Other formats:** a card with an icon or system-provided thumbnail, name, type, size, modification date, and path.
  Audio and video appear on this card; there is no embedded playback.

Images and PDFs have a limit of **32 MiB per file**; images also have a **16-megapixel** limit. Unsupported formats,
exceeded limits, or preview failures do not turn an existing source into a missing file: the card explains the situation
and keeps actions available. `Retry` appears when another attempt may help, not to remove a size or format limit.

Use **Open** to open the source in the default application, **Reveal in Finder** or the system equivalent to locate it,
and **Copy path** to copy its path. Thumbnails depend on the system: macOS and Windows may provide them; when none is
available, the icon still identifies the file.

## Undo without confusing Nodes and files

Each add-content or graph-paste gesture creates a Canvas history entry. Undo removes the Nodes created by that operation
without deleting a merely referenced source or a preexisting Node. Redo restores the result.

An image Kavor writes when pasting image data is different: Undo also removes that PNG, and Redo restores it. If you
modify the image or create a conflicting reference afterward, Kavor may refuse the undo instead of deleting later
work. Check the reason; do not treat Undo as unconditional file deletion.

For a cut between Workspaces, Undo must restore both sides. A later conflicting change may also prevent the operation,
without restoring only half a graph.

## Use the content with a CodingAgent

Drop, paste, and the graph clipboard are human gestures. A CodingAgent adds sources by path; it does not operate your
clipboard. After adding material, connect only what should participate in the work.

For an initial reading, tell the CodingAgent which Nodes you just added and make them reachable. Do not include
credentials or implicitly authorize changes.

```prompt
Examine the Nodes I identified in my reachable graph.
Distinguish canonical sources, visual references, live pages, and working notes.
Explain how this material helps with the task I described and identify anything you could not read.
Do not change files, run commands, or create Connections; present your reading first.
```

**Expected result:** a short map of the material actually consulted, with explicit gaps. A preview does not guarantee
that the harness can interpret every format, and adding a Node does not authorize access to content outside the graph.

## Continue

- Use a [File as context and scope](./file.md) without turning a reference into a disposable copy.
- Create and review [Diagrams](./diagrams.md) with a CodingAgent.
- Consult the [Connections matrix](./connections.md) before connecting resources.
- Understand [what agents see on the Canvas](./coding-agents-and-canvas.md).
