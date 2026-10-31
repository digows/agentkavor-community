---
id: coding-agent
title: "Kavor の CodingAgent：使い慣れた harness をグラフの一員にする"
description: provider を選び、ネイティブな体験を保ったまま、CodingAgent を適切なコンテキスト、ツール、参加者に接続します。
kind: guide
lastReviewedAt: 2026-10-29
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

## アカウント、使用状況、ローテーション

ヘッダーで providers の使用状況を確認し、**Accounts** パネルからアカウントを追加して、各 Workspace に参加する
アカウントを選び、**Automatic** による選択またはアカウントの固定を使えます。ネイティブログインは引き続き利用でき、
他のアカウントの設定は任意です。provider のアプリのログインを置き換えることもありません。

[CodingAgent Accounts ガイド](./coding-agent-accounts.md)では、利用枠、Workspaces 間の配分、設定の初期コピー、
セッションの継続性を保つ切り替え、provider ごとの制限を説明します。

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

## 実行を開始・再起動・停止する

Node と provider のプロセスは別のものです。実行を停止しても、CodingAgent を Canvas に残しておけます。

- **Start** は選択したディレクトリで停止中のセッションを開始します。実行中のセッションに Start を繰り返しても、別のプロセスは作成しません。
- **Restart** は現在のプロセスを終了し、アカウント、作業ルート、ネイティブセッションを再開する意図を維持したまま代わりのプロセスを起動します。履歴の消去やプロジェクトの変更の取り消しではありません。
- **Shutdown** は Node やネイティブ履歴を削除せずに実行を終了します。再び実行するには Start を使います。

Kavor は準備段階を表示し、provider の準備完了または起動失敗を知らせます。保留中の承認は引き続きあなたが判断します。開始や再起動によって agent が代わりに回答する権限を得ることはありません。

起動に失敗した場合は、繰り返す前にエラーを読んでください。存在しないディレクトリ、インストール、認証など、示された前提条件を修正して **Retry** を使います。新たな試行は以前のセッションそのものでも、タスクが実行された証拠でもありません。

## Git worktrees で作業を分ける

新しい会話はコンテキストを分離します。Git worktree は checkout も分離し、独立したディレクトリ、ファイル、index を持ちます。共有 checkout のブランチを切り替えずに、2 つの CodingAgents が異なるブランチで作業できます。

CodingAgent の **Git** コントロールで次を行います。

1. 基準の参照と worktree 名を選びます。
2. **Create** で `.worktrees/` 配下に管理対象の worktree を作り、その CodingAgent に関連付けます。
3. または既存 worktree の **Use** でそのディレクトリを選びます。
4. 変更や commit を依頼する前に、表示されたルートとブランチを確認します。

**Workspace root → Use** は以前の worktree を削除せず、CodingAgent を Workspace のルートに戻します。agent 用 worktree の作成や選択は、共有 checkout のブランチ、index、ファイルを変更しません。その後の merge と整理は別の判断です。

実行中の CodingAgent の Git 関連付けを変更すると、Kavor は選択したルートでセッションを再起動し、provider が対応する場合に再開できるようネイティブの識別情報を維持します。意図的に停止したセッションは停止したままです。再開に失敗した場合はエラーを表示し、修正と Retry を可能にします。ルートの変更だけでは準備完了の証拠になりません。

worktree はローカル環境の完全なコピーではありません。インストール済み依存関係やローカル設定などの未追跡ファイルがない場合があります。認証情報を自動でコピーせず、プロジェクトが必要とする準備を行ってください。存在しないパスや無効な worktree は起動前に修正する必要があり、別のディレクトリへ黙って置き換えるものではありません。

worktree の削除と Node の削除は異なります。別の CodingAgent が参照している worktree の削除や完了処理は拒否されます。フォルダーが Kavor の外で削除された場合は、Git の状態を確認し、関連付けを復旧してから続けます。

## Fork で別の道を試す

**Fork** は既存セッションのネイティブ履歴から別の CodingAgent を作ります。元のセッションは独立したままで、新しい Node は別のセッション識別子と、Fork の依頼元への Connection を持ちます。

会話をやり直さずに別案を試したり、確立したコンテキストから調査を分けたりするときに使います。その後、新しい CodingAgent の目標と停止条件を定めてください。

対応は provider とインストール済みバージョンに依存します。Claude Code、Codex、Grok、OpenCode は Fork と統合されていますが、Antigravity は Kavor でこの機能を提供しません。分岐可能なネイティブセッションが必要です。履歴が利用できない、または provider が操作を受け付けない場合は、空の会話を Fork として提示せず、失敗を知らせます。

Fork だけでは Git ブランチの作成、依存関係の準備、ファイルの分離は行いません。既定では新しいセッションは元と同じルートを使います。コードも分離する場合は、準備済みの別 worktree を選んでください。Canvas の Node のコピー＆ペーストも Fork の代わりにはなりません。コピーはネイティブセッションの履歴を引き継ぎません。

## Channels で会話する

同じ CodingAgent と Channel から会話することもできます。最初は WhatsApp に対応します。agent は desktop 上で Workspace のコンテキストと制限を使い続け、遠隔の会話で harness を置き換えたり別のクラウド agent を作ったりはしません。[Agent Kavor と Channels](./agent-kavor.md) で会話と宛先の設定を確認してください。

desktop から始めた仕事でも、その Workspace で有効な会話に結果を投稿するよう CodingAgent に依頼できます。
宛先を明示的に選ぶ送信であり、別の CodingAgent へのメッセージや全 Channels への一斉送信ではありません。
人間の依頼への返答は元の会話を保ちます。
[WhatsApp で新しい依頼を送らずに通知を受け取る方法](./agent-kavor.md#whatsapp-で新しい依頼を送らずに通知を受け取る)を確認してください。

同じガイドで、受信音声の自動準備、原本の保持、画像や動画の実際の制限も説明します。すべての provider が任意のメディアを
読めるようになるわけではなく、desktop の承認を回避するものでもありません。

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

実装できる状態の Specification、関連する Files、到達可能な Terminal を用意し、Implementer に貼り付けてください。Reviewer が依頼を受けるには同じグラフにいる必要があります。

```prompt
到達可能な Specification で定義された範囲だけを実装してください。コード変更前に、関連する Files と
検証を特定してください。Terminal で証拠を作り、結果を Specification output として記録し、Reviewer
に独立した評価を依頼してください。必要な判断が契約外にある場合は停止してください。
```

**期待する結果:** スコープ内の成果に実際の変更と検証が記録され、レビュー依頼が送られます。不足するコンテキストや契約上の判断は未解決事項として示されます。

Reviewer 向け：

Implementer が成果を特定し、対象の commit または diff を固定してから Reviewer に貼り付けてください。Specification と証拠を到達可能にします。

```prompt
実装と証拠を Specification の基準と比較してください。誤動作、欠けたシナリオ、回帰、運用リスクを
探してください。変更を提案する前に具体的な findings を記録し、既存テストが通っただけで承認しないで
ください。
```

**期待する結果:** レビューは検証可能な指摘を示すか、調べた基準と阻害要因が見つからなかったことを報告します。既存テストの成功はレビューの代わりになりません。

## 例：Reviewerが検証できる引き継ぎ

登録フォームの修正を考えます。Specificationは、不正なメールアドレスでメッセージを表示し、送信を
止め、有効なアドレスでは従来どおり動くことを求めます。上のグラフでBuilderとReviewerを別のセッションにします。

Builderへの依頼：

Specification を実際のフォームに合わせてから Builder に依頼してください。Terminal と Reviewer を同じグラフに置きます。公開はこの依頼に含まれません。

```prompt
Specificationで定義した入力検証を実装してください。有効な入力の動作を維持し、Terminalで関連テストを
実行して変更ファイル、コマンド、結果を記録してください。その後、Specificationのhandleとレビュー対象の
正確なcommitまたはdiffをReviewerに送ってください。未解決事項を示し、公開前に止まってください。
```

**期待する結果:** Builder は成果を特定し、レビュー用の正本を参照します。実行していない検証を実行済みとは報告しません。

良い引き継ぎは会話全体をコピーする代わりに、成果を特定します：

> 実装はSpecificationのoutputsに記録したcommitにあります。不正、空、有効なメールアドレスのテストは
> Terminal Checksで通りました。このcommitの基準と失敗経路をレビューしてください。ファイル、シナリオ、
> 証拠を付けてfindingsを記録し、完了時に返信してください。このレビューではコードを変更しないでください。

Reviewerへの依頼：

参照する成果が安定してから Reviewer に依頼してください。Specification と Sticky Note を到達可能にし、メモへのレビュー記録を許可します。

```prompt
契約と指定された成果を確認してください。各基準を検証し、関連するシナリオを再現してSticky Noteに
結論を追加してください。実証した欠陥と仮説を区別し、阻害要因があればどの動作が失敗するか説明して
Builderに修正を戻してください。
```

**期待する結果:** 各基準が証拠に基づいて評価されます。指摘は Builder に戻されます。証拠不足は制限であり、承認ではありません。

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
- `Allow workspace editing` が有効な場合、CodingAgent は許可された依頼の範囲でセッションを制御し、到達可能な Nodes を削除できます。ただし Guardrails の変更や人間の承認の回避はできません。[Canvas 編集の境界](./coding-agents-and-canvas.md#allow-workspace-editing)を参照してください。

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
