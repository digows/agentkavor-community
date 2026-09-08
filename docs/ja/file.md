---
id: file
title: "File：Canvas上のコンテキストとスコープ"
description: Fileでcanonical sourceを見える形にし、CodingAgentのコンテキストを限定し、そのパスをTerminalへ渡します。
kind: guide
lastReviewedAt: 2026-09-08
canonicalUrl: https://agentkavor.com/ja/docs/file
---

# Fileはファイルです。それだけですでに強力です

Fileは使い捨ての添付ではありません。Canvas上でcanonicalなfilesystem sourceを表し、仕事が読む、レビューする、
編集する、入力として使う対象を明確にします。

[![Kavor Canvas上でPDFを表示するFile Nodeと、それを使うCodingAgent](https://agentkavor.com/kavor-pdf-canvas-agent-demo-poster.jpg)](https://agentkavor.com/ja/videos/pdf-canvas-agent)

*Fileを見える状態に保ちながら、その周りにagents、判断、実行を配置できます。*

## Fileでできること

File単体でもWorkspaceのsourceを表示して扱えます。形式に応じて、Kavorはテキスト編集、検索、読み方の設定、
リッチpreviewを提供します。

テキスト形式にはPlain Text、Markdown、JSON、SQL、TypeScript、JavaScript、YAML、Shell、HTML、CSSがあります。
画像とPDFはCanvasで表示でき、SVGはpreviewとsourceを切り替えられます。

Fileは実際のsourceを指し続けます。Kavor外でファイルが変更されるとNodeにも反映され、ローカル編集との調整が
必要な場合は通知されます。コンテキストのコピーと、実際にversion管理されるartifactを混同しません。

## 明示的なスコープとしてのFile

CodingAgentに接続すると、Fileは一般的な意図を具体的な仕事のsourceに変えます。moduleを限定し、入力contractを
示し、画像やPDFを分析用に置き、レビュー対象の設定を明示できます。

最初の依頼は簡潔でかまいません。

> 接続されたFileをこのタスクのcanonical sourceとして読んでください。必要な変更を説明し、スコープを保ち、私が計画を確認してから編集してください。

agentが読むだけなら、直接Connectionにfile_read_only Guardrailを使います。agentはFileへ到達できますが、
Kavorが仲介する操作でsourceを変更できません。

## Terminal入力としてのFile

File + Terminal Connectionは、あなたが選ぶ環境変数名を通じてファイルのcanonical absolute pathをsessionへ
渡します。値はパスであり、内容のコピーではありません。

パスはTerminal session開始時に適用されます。shellが開いた後でConnectionやparameterを変更すると、新しい値を
受け取るにはsessionの再起動が必要だとUIが示します。

script、SQL、設定、reportに便利です。FileがCanvas上でsourceを明示し、Terminalはwindow間でパスをコピーせずに
コマンドを実行できます。

## 3つの使い方

### 既存sourceをレビューする

FileをCodingAgentに接続し、リスクを中心に読むよう依頼します。視覚的なレビューでは、File、findings用の
Sticky Note、チェック用のTerminalを同じグラフに置きます。

### 明確なスコープで実装する

Specification、File、Builderを接続します。Specificationが結果を説明し、Fileが具体的なsourceを示し、
CodingAgentが変更と適切な場所への証拠記録を行います。

### artifactを実行可能な入力にする

SQLやscriptのFileをTerminalに接続し、変数名を決め、shellから実行します。agentも接続されていれば、人が
プロセスを見ながら出力の解釈を手伝えます。

## 重要な制限

- ConnectionはFileをfilesystem全体へのアクセスにはしません。Nodeは設定されたcanonical sourceを表します。
- すべてのbinary形式をテキストとして編集できるわけではありません。
- Terminalへ渡すパスにファイル本文は含まれません。
- File固有のGuardrailにはCodingAgentとの直接Connectionが必要です。
- 外部または並行変更はローカル編集を置き換える前に調整します。
- Canvas上でFileの近くにあっても内容へのアクセスは得られません。

## 次に読む

- File + TerminalとCodingAgent + Fileを含む[Connections matrix](./connections.md)
- [CodingAgentsがグラフを見る方法](./coding-agents-and-canvas.md)
- Fileと[Sticky Note](./sticky-note.md)を組み合わせ、canonical sourceとworking memoryを分ける
- 意図、実装、証拠、レビューを含む[最初のループ](./first-loop.md)
