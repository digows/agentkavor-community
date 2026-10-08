---
id: sticky-note
title: "Sticky Note：共有ワーキングメモリ"
description: Sticky Noteを使い、すべてをSpecificationにせず、CodingAgentsと状態、発見、注意点を共有します。
kind: guide
lastReviewedAt: 2026-10-08
canonicalUrl: https://agentkavor.com/ja/docs/sticky-note
---

# Sticky Noteは小さくても、仕事を見える状態に保ちます

Sticky Noteは、人のための付箋として始まります。CodingAgentに接続すると共有ワーキングメモリになり、人と
agentがターン中に重要な情報を記録できます。すぐに埋もれる会話だけに頼る必要はありません。

![Specification、CodingAgent、Sticky NoteがKavor Canvas上で観察を共有する様子](https://media.agentkavor.com/demos/spec-agent-notes/poster.463994b8b377.jpg)

[エージェントがSpecificationとメモを扱う様子を見る →](https://agentkavor.com/ja/videos/spec-agent-notes)

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

すでにあなたの観察があるメモでは、agentが更新してよい部分を指定してください。内容があることは、
依頼せずに整理してよいという意味ではありません。たとえば次のように範囲を限定します。

> 調査中はこのSticky Noteを維持してください。私とReviewerのメモは残し、自分の確認済みの発見だけを追加し、
> 自分の名前が付いた項目だけを更新してください。本文全体の整理には先に私の許可を求めてください。

### 3. 実装とレビューの橋

Builderは変更内容と実行したチェックを記録できます。Reviewerはfindingsとリスクを追加できます。2つのsessionを
探し回らずに両方を追えます。

CodingAgents間のConnectionは自動workflow順序ではありません。参加者を到達可能にし、メッセージ交換を可能に
します。

## 例：作業を再開しやすいメモ

ログインの失敗を調べるとき、すべての観察をアーキテクチャの決定にする必要はありません。発見、証拠、
まだ答えのない質問をメモに残します：

```markdown
## 完了
- セッション期限切れ後の失敗を再現した。
- 新しいセッションでのログインは引き続き動く。

## 作業中
- 期限切れの応答とクライアントの処理を比較している。

## 人の判断が必要
- セッションを更新するか、再ログインを求めるか決める。
- 仮説：retryが古い認証情報でrequestを繰り返している。未確認。

## 証拠
- Terminal Checks：再現コマンドと観察した応答。
- クライアントのFile：retryを開始する箇所。

## 次
- クライアントを編集する前に仮説を確認する。
```

エージェントに依頼します：

> 検証した発見と質問をメモに追加し、私の観察を保ってください。仮説が確認または否定されたら証拠を付けて
> 状態を更新してください。決定が修正の範囲を定めるなら、対応するSpecificationへ移し、ここには短い参照を
> 残してください。

レビュー用の別ブロックには**シナリオ、観察した動作、証拠、次の行動**を記録できます。Builderの結論と
Reviewerが確認した内容を区別できます。

一つの発見なら部分更新か新しいブロックを使います。古い状態がたまったら本文の整理を依頼し、未決事項と
あなたの観察は維持します。すべての会話を読み直さずに作業を再開できることが期待する結果です。

## メモの共有は所有権の移譲ではない

Connectionsの経路によりメモを読み、許可された書き込みができます。しかし、グラフ内の全agentへ自動で報告を
始めるよう依頼したわけではありません。

あなたからの依頼がない場合、自動報告は**そのCodingAgentに直接接続され**、初めて見た時点で空だった
Sticky Noteに限ります。短いリストを使い、各項目に自分の名前を付けます。

```markdown
- [x] Builder — done: reproduced the expired-session failure.
- [ ] Builder — doing: checking the client's retry handling.
- [ ] Builder — will: verify the fix against the Specification.
```

agentは作業状態が有意に変わったとき、自分の項目だけを更新します。あなたや別のagentの項目を完了扱いにしたり、
書き換えたり削除してはいけません。内容があるメモの維持には明示的な依頼が必要です。別の経路や同僚のConnectionは
自主的な報告の許可ではありません。

agentが書いていたメモをあなたが空にしたら、報告の再開を依頼するまで空のままにします。
共有メモリを使っても、Canvasに残す内容の制御はあなたのものです。

これはCodingAgentへの協働指示であり、あらゆる編集を技術的に禁止するものではありません。
Kavor操作による書き込みを禁止するには、直接のConnectionに`sticky_note_read_only`を使います。

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
