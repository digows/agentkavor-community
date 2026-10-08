---
id: coding-agent
title: "Kavor の CodingAgent：使い慣れた harness をグラフの一員にする"
description: provider を選び、ネイティブな体験を保ったまま、CodingAgent を適切なコンテキスト、ツール、参加者に接続します。
kind: guide
lastReviewedAt: 2026-10-08
canonicalUrl: https://agentkavor.com/ja/docs/coding-agent
---

# Kavor の CodingAgent：使い慣れた harness をグラフの一員にする

CodingAgent は、provider 本来のインターフェースで動くコーディング agent であり、Canvas 上に見える
参加者でもあります。

Kavor は各 harness を汎用チャットに置き換えません。provider の体験を保ち、その周囲に明示的な責任、
到達可能なコンテキスト、ツール、他の CodingAgents、確認できる境界を加えます。

![CodingAgent を Canvas に追加する前に Kavor toolbar で provider を選択する画面。](https://media.agentkavor.com/demos/coding-agent-provider-selector/poster.22c2dccb70c5.jpg)

[デモを見る →](https://agentkavor.com/ja/videos/coding-agent-provider-selector)

## CodingAgent が持つもの

各 CodingAgent は別々のセッションです。Node は、選択した provider と、その provider が提供する場合は
モデル、effort レベル、権限、ネイティブセッションなど、役割の実行に必要な設定と状態を保持します。

Provider は CodingAgent の設定であり、別の Node 種別ではありません。セレクターには次が含まれます。

- Anthropic Claude Code
- OpenAI Codex
- Google Antigravity
- xAI Grok
- SST OpenCode

toolbar から CodingAgent を追加するときは、最初に provider を選び、その後で作業に合わせてセッションを
設定します。Kavor はすべての harness が同じ契約を持つとは仮定せず、各 harness の実際の能力を保つため、
利用できる選択肢は異なることがあります。

## 単独でできること

Connection がなくても、CodingAgent は Workspace 内の provider-native セッションです。対話し、harness
のツールを使い、作業ディレクトリを選べます。役割に別のリポジトリや worktree が必要な場合、そのディレクトリは
Workspace root の外部でもかまいません。セッションとの関連付けは明示されたままです。

Node はすでにコンテキストの分離に役立ちます。一つのセッションが調査し、別のセッションが実装できます。
ただしグラフがなければ、共有コンテキストは各会話に何を渡すかに依存します。

Connection によって、孤立したセッションが作業システムの参加者になります。

### 入力にファイルやスクリーンショットを渡す

開いているセッションでは、OSクリップボードのファイルやPNG/JPEG画像を貼り付けられます。Kavorはファイル参照を
挿入し、CanvasにFileやConnectionを作りません。パスを確認し、依頼を書いてから送信してください。
画像の解釈は引き続きharnessの能力に依存します。

手順、制限、貼り付けた参照とグラフ上のリソースの違いは
[Terminalガイド](./terminal.md#セッション入力にファイルと画像を貼り付ける)にあります。

## グラフから得るもの

CodingAgent は、そのコンポーネント内で有効な Connections の経路を通じて到達できるすべての Node と
作業できます。各リソースを直接つなぐ必要はありません。

CodingAgent を含む直接 Connections には固有の役割があります。

| Connection | 追加されるもの |
| --- | --- |
| **CodingAgent + Specification** | 永続的な意図、範囲、基準をグラフに置きます。直接 Connection には `specification_read_only` を設定できます。 |
| **CodingAgent + Sticky Note** | 未決事項、進捗、findings のための共有された非公式メモリを加えます。`sticky_note_read_only` を設定できます。 |
| **CodingAgent + File** | filesystem 上の正規ソースを明示します。`file_read_only` を設定できます。 |
| **CodingAgent + Terminal** | コマンド実行、プロセス観察、shell の証拠確認を可能にします。`terminal_read_only` を設定できます。 |
| **CodingAgent + WebBrowser** | 人間に見えているものと同じ状態で、その WebBrowser の実際のページを観察し操作できます。 |
| **CodingAgent + CodingAgent** | 参加者を同じコンポーネントに結びます。到達可能な CodingAgents は非同期メッセージを交換し、調整に必要なコンテキストを確認できます。 |
| **Trigger + CodingAgent** | そのアクティブなセッションを、スケジュールされた prompt の直接の対象にします。Trigger は閉じたセッションを起動しません。 |

到達可能性は直接契約を消しません。CodingAgent とリソースの正確な Connection に Guardrail がある場合、
別の経路が存在しても、その制限はそのペアに適用され続けます。

## 実用的なパターン

### 契約から実装する

Specification、Implementer 役の CodingAgent、Terminal を接続します。Agent はソースから契約を読み、
必要な範囲だけを変更し、検証を実行して outputs を Specification に記録します。

意図は会話履歴の外に、証拠は Workspace 内に残ります。

### 実装とレビューを分ける

Implementer と Reviewer には別のセッションを使います。両者は同じ Specification と証拠に到達できますが、
それぞれ異なる問いを受け取ります。

Implementer は「契約をどう満たすか」を問い、Reviewer は「結果は本当に契約を満たし、どのリスクが残るか」
を問います。分離により、レビューが作者の前提を自動的に引き継ぐ可能性を減らせます。

### 競争ではなく役割のために providers を組み合わせる

異なる providers を同じグラフに参加させられます。別のインターフェース、モデル、思考方法が具体的な責任を
改善するときに組み合わせてください。

Agent の数を増やすためだけに provider を追加しないでください。まず役割、期待する結果、停止条件を決め、
その作業に最適な harness を選びます。

### ライブページで作業する

タスクが実際の Web インターフェースに依存する場合は WebBrowser を接続します。人間は同じタブを見て使い続け、
CodingAgent は chat に貼られたテキストからページを再構築せずに、移動、操作、変化の待機、証拠取得を行えます。

Workspace を切り替えても WebBrowser は動作を続け、戻ったときに同じ状態を表示できます。Agent は視覚的な
コンテキスト切り替えのたびにページを再読み込みせず、すでに許可された作業を継続できます。

![Canvas 上で接続された CodingAgent と WebBrowser](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)

[デモを見る →](https://agentkavor.com/ja/videos/web-browser-node)

### 別の CodingAgent の現在のセッションを確認する

到達可能な CodingAgent は、別の CodingAgent の現在の provider-native セッションで完了した turns を、受動的に
ページングして確認できます。メッセージや永続的な output になっていない推論、証拠、コンテキストを取得できます。

この読み取りは provider へ入力を送らず、対象セッションを起動しません。相手が行動、判断、回答する必要がある場合の
メッセージの代わりにもなりません。ページング中にセッションが変わると古い continuation は拒否されるため、異なる
履歴を混ぜずに最初から読み直します。

## 実用的なグラフ

```text
Specification — Implementer — Reviewer
                    │            │
                  Terminal    Sticky Note
                    │
                   File
```

線は永続的な方向を持たない Connections です。すべての Nodes は同じ到達可能コンポーネントに属します。
Implementer は契約を実行し、Reviewer は独立した評価を行い、Sticky Note は人の判断に必要な質問や findings
を見える状態に保ちます。

これは自動シーケンスではありません。メッセージが handoffs を調整し、Specifications などのリソースが
セッションを越えて残すべきものを保持します。作業をいつ受け入れるかはあなたが決めます。

## より良い開始 prompt

Implementer 向け：

> 到達可能な Specification で定義された範囲だけを実装してください。コード変更前に、関連する Files と
> 検証を特定してください。Terminal で証拠を作り、結果を Specification output として記録し、Reviewer
> に独立した評価を依頼してください。必要な判断が契約外にある場合は停止してください。

Reviewer 向け：

> 実装と証拠を Specification の基準と比較してください。誤動作、欠けたシナリオ、回帰、運用リスクを
> 探してください。変更を提案する前に具体的な findings を記録し、既存テストが通っただけで承認しないで
> ください。

## 例：Reviewerが検証できる引き継ぎ

登録フォームの修正を考えます。Specificationは、不正なメールアドレスでメッセージを表示し、送信を
止め、有効なアドレスでは従来どおり動くことを求めます。上のグラフでBuilderとReviewerを別のセッションにします。

Builderへの依頼：

> Specificationで定義した入力検証を実装してください。有効な入力の動作を維持し、Terminalで関連テストを
> 実行して変更ファイル、コマンド、結果を記録してください。その後、Specificationのhandleとレビュー対象の
> 正確なcommitまたはdiffをReviewerに送ってください。未解決事項を示し、公開前に止まってください。

良い引き継ぎは会話全体をコピーする代わりに、成果を特定します：

> 実装はSpecificationのoutputsに記録したcommitにあります。不正、空、有効なメールアドレスのテストは
> Terminal Checksで通りました。このcommitの基準と失敗経路をレビューしてください。ファイル、シナリオ、
> 証拠を付けてfindingsを記録し、完了時に返信してください。このレビューではコードを変更しないでください。

Reviewerへの依頼：

> 契約と指定された成果を確認してください。各基準を検証し、関連するシナリオを再現してSticky Noteに
> 結論を追加してください。実証した欠陥と仮説を区別し、阻害要因があればどの動作が失敗するか説明して
> Builderに修正を戻してください。

期待する成果は、特定できる変更、独立したレビュー、証拠に基づくあなたの判断です。Builderがまだ変更中なら、
安定した成果を待つか、レビューできる範囲を明示してください。別のコードrevisionを見る二人は同じ成果を
評価していません。

## 重要な制限

- CodingAgent は視覚的に近いだけではアクセスを得ません。Connections の経路が必要です。
- メッセージで Node を参照してもアクセスは付与されません。
- 別の CodingAgent のセッションを受動的に読んでも、その Agent は起動せず、永続的な決定は Specification へ移りません。
- Guardrail は所属する直接ペアを制限し、Workspace 全体のポリシーにはなりません。
- メッセージは作業を調整しますが、永続的な決定の唯一の保存先にしてはいけません。
- Providers が同じモデル、権限、イベント、セッション操作を提供するとは限りません。
- Trigger はアクティブなセッションへ prompt を届けますが、権限を広げたり、外部効果が正確に一度だけ
  起きることを保証したりしません。
- Canvas の編集許可は Nodes の削除や Guardrails の変更を許可しません。これらの境界は人が管理します。

## セッションを始める前に

次を確認します。

- この CodingAgent の責任
- 生成すべき観察可能な結果
- 到達可能であるべき Nodes
- 直接 Connections に必要な Guardrails
- provider、モデル、effort がタスクのリスクに合うか
- 決定、進捗、証拠を保存する場所
- 誰と対話し、いつ停止するか

CodingAgent は長い prompt を受け取るだけでは強力になりません。責任、コンテキスト、ツール、協力、境界が
一貫した設計になるとき、より役立ちます。

次に[ CodingAgents の選び方と役割の定義](./agents-and-roles.md)を読み、
[CodingAgents が Canvas を理解して構築する方法](./coding-agents-and-canvas.md)を学ぶか、
[サポートされる Connections のマトリクス](./connections.md)を確認してください。
