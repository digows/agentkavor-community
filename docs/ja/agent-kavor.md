---
id: agent-kavor
title: "Agent Kavor：Channels で agents と会話する"
description: WhatsApp を連携し、CodingAgent を選び、Self-chat または Workspace 専用グループから仕事に参加します。
kind: guide
lastReviewedAt: 2026-10-17
canonicalUrl: https://agentkavor.com/ja/docs/agent-kavor
---

# Agent Kavor：会話を持ち歩く

CodingAgent に仕事を任せてコンピューターを離れても、連絡を続けられます。Agent Kavor は **Channels** を通じて
依頼を送り、返答を確認し、判断に参加する体験です。最初に利用できる Channel は **WhatsApp** です。

Agent Kavor は別のモデルでも、CodingAgents を置き換えるホスト型 agent でもありません。仕事を Kavor の Workspaces に
残したまま、Channels から会話します。Channel は Node や Canvas の Connection でもありません。会話を運ぶのが Channel、
agent のコンテキストと能力を定めるのがグラフです。

## 始める前に

- desktop で Kavor を起動し、サインインした状態でネットワークに接続してください。コンピューターはスリープさせないでください。
- Workspace と CodingAgent を用意し、harness とその認証も設定してください。
- デバイスとして連携できる WhatsApp アカウントを使ってください。最短の始め方は Self-chat です。

依頼には CodingAgent の設定、provider の制限、人の操作権限が引き続き適用されます。電話からのメッセージで
desktop の承認待ちを回避することはできません。

## 1. desktop でアカウントを連携する

1. Kavor 上部バーの **Channels** を開きます。
2. WhatsApp の連携を開始します。QR code を読み取るか **Link with a code** を選び、該当する WhatsApp アカウントで
   確認します。連携コードは SMS ログインではありません。
3. 接続の確認を待ちます。明示的に開始した連携が成功すると、Channel が有効になります。
4. **Personal chat** で **Self-chat** を選びます。別のアカウントを連携する場合は、個人の宛先として
   **Another number** も設定できます。設定は自動保存されます。

![desktop の Channels 設定。WhatsApp が接続済みで Self-chat が選択され、Workspace グループ設定が表示されている](https://media.agentkavor.com/releases/2.0.0/whatsapp/setup/master.2552b26a5322.png)

送信テストは表示された個人の宛先だけを使います。CodingAgent の仕事を開始したり、すべてのグループへ配信したりは
しません。実行前に宛先を確認してください。

## 2. Self-chat で Workspace と agent を選ぶ

WhatsApp の個人用会話を開きます。オンボーディングで Workspace、次に CodingAgent を選択します。
選択に回答し、最初の依頼を送る前に確認されたコンテキストを確かめてください。

![WhatsApp のオンボーディングで Workspace と CodingAgent を選択し、会話のコンテキストが確認された状態](https://media.agentkavor.com/releases/2.0.0/whatsapp/onboarding/poster-framed.7636ed112536.png)

[WhatsApp で Workspace と agent を選ぶデモを見る →](https://agentkavor.com/ja/videos/whatsapp-onboarding)

個人の会話は選択を保持します。再連携せずにコンテキストを確認・変更できます。

| やりたいこと | コマンド |
| --- | --- |
| 選択中の Workspace と agent を確認する | `/context` |
| Workspaces を一覧表示する | `/workspaces` |
| 個人の会話で Workspace を切り替える | `/workspace "私のプロジェクト"` |
| Workspace の agents を一覧表示する | `/agents` |
| 既定の agent を選ぶ | `/agent "Reviewer"` |
| 分析を依頼せず実行状態を確認する | `/status` |
| 利用可能なコマンドと例を見る | `/help` |

Kavor が実際に表示する名前を使ってください。`@Reviewer` のような明示的なメンションで、既定を変えずに別の agent に
依頼できます。状態表示は実行状態であり、実装がテストやレビューに合格した証拠ではありません。

## 3. 離れた場所から仕事に参加する

選択した agent に明確な依頼を送ります。例：

> 進行中のタスクのテスト結果を確認してください。コードは変更しないでください。成功と失敗、実際に確認できた証拠を教えてください。

同じ会話で進捗と返答を確認できます。判断が必要な場合は、該当する質問の選択肢や指定形式で回答します。
送信確認は作業完了の確認ではありません。

短い状態通知は、書式を保ちながらコンテキストと本文を同じ行にまとめます。狭い画面では自然に折り返されます。
完全な返答、質問、長い内容は、それぞれのレイアウトを保ちます。

[リモートの依頼と CodingAgent の完全な返答を見る →](https://agentkavor.com/ja/videos/whatsapp-agent-interaction)

### WhatsApp で新しい依頼を送らずに通知を受け取る

desktop のセッションからでも、設定済みの会話に結果を投稿するよう CodingAgent に依頼できます。例：

> このレビューが終わったら、この Workspace の WhatsApp グループに要約を送ってください。他の会話には投稿しないでください。

agent は自分の Workspace で有効な会話を調べ、宛先を明示的に選びます。一つの Channel に複数の会話があっても、
全グループへの一斉送信や、agent のターミナル全体の自動転送にはなりません。

この通知には、先行する WhatsApp メッセージは必要ありません。一方、受信した依頼への返答は元の会話に戻ります。
後から Workspace や既定の agent を変更しても変わりません。既知の CodingAgent の返答を引用すると、新しい依頼は
その返答の作成者に向かい、会話の既定の agent は変更されません。

### 元の録音を保ったまま音声を送る

録音は単独でもテキスト付きでも送れます。宛先のどの CodingAgent に依頼を渡すよりも前に、Kavor が自動で文字起こしを
準備し、音声から生成されたテキストとして示します。キャプション、元ファイル、宛先の選択は保たれます。
文字起こしには誤りが含まれる場合があり、録音そのものを置き換えません。

同じ依頼を受け取る agents は同じ結果を使います。同一の依頼の再送やコンテキストの復旧では、その音声の参照を再利用し、
agent ごとに別の文字起こしを要求しません。文字起こしの上限は**音声一件あたり 25 MB（25,000,000 バイト）**で、
元の添付ファイルの保存上限とは別です。

`/shutdown` などを口にしても Kavor の制御は直接動きません。文字起こしは依頼の内容であり、コマンド解析器への入力では
ありません。制御するには対応するコマンドを文字で入力してください。

準備に失敗した場合、元の会話に通知が届き、待機中の agents にはその依頼が渡されません。通知に従うか、文字で依頼を
送ってください。読み取れない録音や発話のない録音は別の音声に、大きすぎる録音は短い録音に変える必要があります。
サービス障害や利用上限は、CodingAgent が作業を始めたことを意味しません。結果が確認できない場合、成功や自動再試行を
前提にしないでください。

文字起こしは認証付きのクラウドサービスを使うためネットワークが必要で、完全なオフライン処理ではありません。
CodingAgents は引き続きあなたのコンピューターで動き、元の音声のアクセス期間と有効期限は変わりません。

### 画像、動画、その他のファイル

画像、動画、ファイルもテキスト付きまたは単独で交換できます。画像には、選んだ harness とモデルに対応するネイティブ入力か
読み取りツールが必要です。動画は元ファイルを可能な範囲で渡すもので、すべての agent による解釈を保証しません。
Kavor が自動で動画を変換したりフレームを抽出したりすることはありません。

管理対象の添付ファイルと一時コピーは、**アップロード成功から七日後**に期限切れになります。読み取り、再試行、文字起こしで
期限は延長されません。期限切れなら再送してください。元のファイルやメッセージ本文は削除されません。

## 4. Workspace グループでプロジェクトを分ける

Self-chat で Workspace を切り替える代わりに、プロジェクト専用の継続的な会話をグループにできます。

1. 連携後、**Workspace groups** で必要な Workspaces を選択してグループ作成を確認します。Workspace 自身の Channels
   タブから関連付けを管理し、既存のグループを選ぶこともできます。
2. 各 Workspace の結果を確認します。新しいグループ名は `Kavor · Workspace の名前` です。
3. グループを開き、`/agents` と `/agent "名前"` で CodingAgent を選ぶか、明示的にメンションします。

グループの Workspace は固定です。そのプロジェクト内で既定の agent は変更できますが、`/workspace` でグループの
プロジェクトは切り替えられません。新しい Workspaces にグループが自動作成されることもありません。

Workspace の Channels にある **Check group** は、連携アカウントからグループにまだアクセスできるかを確認します。
そのアカウントから利用できないことは、グループが削除されたことを必ずしも意味しません。一時的な接続障害でも、
関連付けは自動的に解除されません。

関連付けを変えるには **Remove group link** を使って確認します。解除されるのはその Workspace の関連付けだけで、
WhatsApp グループ、電話の連携、受理済みの履歴、他の Workspaces は保たれます。その後、別のグループを選ぶか新しく
作成できます。作成結果が未確認なら、操作を繰り返す前に結果を確認してください。

[Workspace 専用グループの作成とオープンを見る →](https://agentkavor.com/ja/videos/whatsapp-workspace-group)

**参加者は慎重に選んでください。** 既定の **All messages** では参加者が依頼を送り、質問に回答できます。
**Mentions & replies** は連携アカウントへのメンション、`@kavor`、または Kavor のメッセージを引用した返信を必要とします。
これは起動条件のフィルターであり、個人別の権限管理ではありません。参加者の追加は agents の仕事へのアクセス委任になり得ます。

## 接続、プライバシー、復旧

- **コンピューターが利用できない：** WhatsApp は Kavor をホスト型サービスにはしません。desktop を復旧し、すでに効果が
  発生した可能性のある操作を再送する前に実際の状態を確認してください。
- **agent が返答しない：** `/context` と `/status`、続いて desktop の認証、ダイアログ、承認待ちを確認してください。
  無応答は成功でも、破壊的な依頼を繰り返す許可でもありません。
- **接続が切れた：** Channels の再接続操作を使います。停止は連携を保持し、連携解除とは異なります。
  自動再接続で明示的な停止や無効化を取り消してはいけません。
- **質問や選択が古い：** コンテキストを確認して新しい選択肢を求めてください。古い選択が同じ対象を指すと仮定しないでください。
- **プライバシーの境界：** 実行と連携認証情報はコンピューターに残りますが、メッセージは WhatsApp、添付ファイルは Kavor
  管理の一時ストレージを使います。受信音声の文字起こしにはクラウドも使います。共有できる内容だけを送ってください。
- **WhatsApp の境界：** 連携済みデバイスを利用し、Meta がホストする WhatsApp Business API ではありません。
  アカウントの規則、制限、停止は引き続き Meta が管理します。

## 次に読む

- [CodingAgent がグラフでできること](./coding-agent.md)。
- [agents 間のメッセージと協業](./coding-agents-and-canvas.md)。
- [Connection の配信モードと Guardrails](./connections.md)。
- [実際の用途とともに次の Channel を提案する](https://github.com/digows/agentkavor-community/discussions/new?category=ideas)。
