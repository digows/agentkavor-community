---
id: sticky-note
title: "Sticky Note：共有ワーキングメモリ"
description: Sticky Noteを使い、すべてをSpecificationにせず、CodingAgentsと状態、発見、注意点を共有します。
kind: guide
lastReviewedAt: 2026-09-08
canonicalUrl: https://agentkavor.com/ja/docs/sticky-note
---

# Sticky Noteは小さくても、仕事を見える状態に保ちます

Sticky Noteは、人のための付箋として始まります。CodingAgentに接続すると共有ワーキングメモリになり、人と
agentがターン中に重要な情報を記録できます。すぐに埋もれる会話だけに頼る必要はありません。

[![Kavor Canvas上で接続されたCodingAgentsとSticky Note](https://agentkavor.com/kavor-connections-demo-poster.jpg)](https://agentkavor.com/ja/videos/connections)

*共有メモは、観察、未決定事項、次の手順をグラフのそばに見える形で保ちます。*

## Sticky Noteでできること

agentがいなくてもSticky Noteは役立ちます。質問、仮説、リマインダー、観察したいことの短いリストを書けます。
内容が同じ仕事のグラフに参加すると、さらに価値が高まります。

CodingAgentとのConnectionがあれば、agentも一緒に読み書きできます。次の用途に使えます。

- **完了 / 進行中 / 次**の短い状態報告
- Specificationを作る途中の未決定事項
- 後で確認したい注意点
- 実装中に見つかった事実
- 独立レビューのfindings
- グラフ参加者間のhandoff checklist

このメモは意図的に非公式です。人はagentが何に気づいたかを確認でき、agentは見える状態に残すべき情報を
保存する明示的な場所を得ます。

## 3つの使い方

### 1. ターンの記憶

開始前に目標と失ってはいけない質問を書きます。作業中は短い事実、リンク、暫定判断を追加します。最後に、
Workspaceへ戻ったときの次の手順を明確にします。

- **状態：** 完了、進行中、次
- **注意：** 人の判断や確認が必要なこと
- **証拠：** メモを裏付けるチェック、File、観察

### 2. CodingAgentのもう一つの手

Sticky Noteをagentに接続し、次の判断に役立つ事実だけを記録するよう依頼します。

> Sticky Noteを短いターン要約として維持してください。変更、証拠、リスク、私の判断が必要な質問を記録し、仮説を最終判断として扱わないでください。

agentは別ブロックを追加でき、全体の整理を頼まれた場合は内容を置き換えられます。人は引き続き編集でき、
すべての変更はメモの最新versionを基準にします。

### 3. 実装とレビューの橋

Builderは変更内容と実行したチェックを記録できます。Reviewerはfindingsとリスクを追加できます。2つのsessionを
探し回らずに両方を追えます。

CodingAgents間のConnectionは自動workflow順序ではありません。参加者を到達可能にし、メッセージ交換を可能に
します。

## Markdown、編集、競合

Sticky Noteは、見出し、リスト、タスク、強調、コードなどの一般的なMarkdownを扱います。生のHTMLは使えません。
1つのメモは最大64,000 Unicode code pointsで、視覚的な分類に4色を使えます。色は内容の権限を変えません。

Kavorは変更を自動保存し、保存前に別の参加者が変更した場合は通知します。競合変更を黙って消さず、解決する
ための状態を表示します。書き込みは新しいブロックの追加、または本文全体の置換です。

## Sticky Noteに置かないもの

- スコープと受け入れ基準を持つ安定した判断は[Specification](./specification.md)へ置きます。
- ソースコードやcanonical artifactは[File](./file.md)へ置きます。
- コマンドと実行証拠は[Terminal](./terminal.md)へ置きます。
- メッセージは参加者を調整しますが、重要な判断の唯一の記録にしません。

よいメモは読み切れるほど短く、次の手順が1つのsessionの記憶に依存しないだけの情報を持ちます。

## Guardrailと到達可能性

CodingAgentは有効な[Connections](./connections.md)の経路を通じてのみSticky Noteを利用できます。Canvas上の
近さやメッセージ内の言及はアクセスを与えません。

agentとメモの直接Connectionにsticky_note_read_only Guardrailを設定できます。agentは読むことはできますが、
Kavor操作で追加や置換はできません。Guardrailはその直接pairだけを制限し、Connectionを作成したり、メモを
Workspace全体のpolicyにしたりしません。

## 次に読む

- [Nodeモデルを理解する](./nodes.md)
- 仕事に必要な[最小のConnectionsを選ぶ](./connections.md)
- Specification、CodingAgents、Terminal、Sticky Noteで[最初のループを完了する](./first-loop.md)
