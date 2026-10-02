---
id: file
title: "File：Canvas上のコンテキストとスコープ"
description: Fileでcanonical sourceを見える形にし、CodingAgentのコンテキストを限定し、そのパスをTerminalへ渡します。
kind: guide
lastReviewedAt: 2026-10-01
canonicalUrl: https://agentkavor.com/ja/docs/file
---

# Fileはファイルです。それだけですでに強力です

Fileは使い捨ての添付ではありません。Canvas上でcanonicalなfilesystem sourceを表し、仕事が読む、レビューする、
編集する、入力として使う対象を明確にします。

![PDFを表示したFile NodeとCodingAgentがKavor Canvasでつながる様子](https://media.agentkavor.com/demos/pdf-canvas-agent/poster.7306bdccc7f5.jpg)

[PDFがCanvasの作業に参加する様子を見る →](https://agentkavor.com/ja/videos/pdf-canvas-agent)

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

## 例：一つのNode、三種類の入力

### コードをレビューの焦点にする

HTTPクライアントをFileとして追加し、Reviewerを接続してfindings用のSticky Noteを到達可能にします：

> HTTPクライアントのFileを、特にtimeout、retry、エラー処理についてレビューしてください。分析の焦点として
> 使い、結論が他のファイルに依存するなら調査を広げる前に依存先を示してください。コードや再現で裏付けた
> findingsだけを記録し、修正は実装しないでください。

期待するのはシナリオと該当コードへの参照を持つ範囲の明確なレビューです。Fileは焦点を示しますが、harnessの
ネイティブツールに対するsandboxではありません。依頼で範囲を定め、Kavorの操作には適切なGuardrailを使います。

### PDFや画像を参照にする

要件のPDFや参考画像をSpecification、CodingAgentと同じグラフに置きます：

> Fileの資料とSpecificationを比較してください。明示された要件、解釈、質問を分け、相違ごとにページや
> 観察した要素を示してSticky Noteに質問を残してください。読めない内容は作らないでください。

期待するのは要約だけでなく検証できる比較です。解釈できる範囲は形式とharnessのツールに依存します。
Kavorのpreviewはあなたが資料を見続けられるようにします。

### スクリプトをTerminalの入力にする

小さなNode.jsスクリプト用のFileを作り、TerminalへのConnectionを`CHECK_SCRIPT`という名前に設定します：

```javascript
console.log('Canvas file connection is working');
```

Connection設定後にTerminalのセッションを開始して実行します：

```sh
test -n "$CHECK_SCRIPT" && node "$CHECK_SCRIPT"
```

期待する出力は`Canvas file connection is working`です。変数はスクリプトのパスを持ちます。空ならConnectionの
名前を確認し、セッションを再起動して設定を受け取ります。この例はPOSIX shellとNode.jsを必要とします。
PowerShellでは`$env:CHECK_SCRIPT`で変数を読み、`node $env:CHECK_SCRIPT`を実行してください。

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
