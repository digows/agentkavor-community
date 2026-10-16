---
id: agent-kavor
title: "Agent Kavor：Channels で agents と会話する"
description: WhatsApp を連携し、CodingAgent を選び、Self-chat または Workspace 専用グループから仕事に参加します。
kind: guide
lastReviewedAt: 2026-10-16
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

[リモートの依頼と CodingAgent の完全な返答を見る →](https://agentkavor.com/ja/videos/whatsapp-agent-interaction)

画像、動画、音声、ファイルを、テキスト付きでも単独でも交換できます。解釈できる形式は harness と利用可能なツールに
依存します。Kavor は自動文字起こしや、すべての agent による任意のメディアの理解を保証しません。

管理対象の添付ファイルと一時コピーは、**アップロード成功から七日後**に期限切れになります。読み取りや再試行で期限は
延長されません。期限切れなら再送してください。元のファイルやメッセージ本文は削除されません。

## 4. Workspace グループでプロジェクトを分ける

Self-chat で Workspace を切り替える代わりに、プロジェクト専用の継続的な会話をグループにできます。

1. 連携後、**Workspace groups** で必要な Workspaces を選択してグループ作成を確認します。Workspace 自身の Channels
   タブから関連付けを管理し、既存のグループを選ぶこともできます。
2. 各 Workspace の結果を確認します。新しいグループ名は `Kavor · Workspace の名前` です。
3. グループを開き、`/agents` と `/agent "名前"` で CodingAgent を選ぶか、明示的にメンションします。

グループの Workspace は固定です。そのプロジェクト内で既定の agent は変更できますが、`/workspace` でグループの
プロジェクトは切り替えられません。新しい Workspaces にグループが自動作成されることもありません。

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
  管理の一時ストレージを使います。共有できる内容だけを送ってください。
- **WhatsApp の境界：** 連携済みデバイスを利用し、Meta がホストする WhatsApp Business API ではありません。
  アカウントの規則、制限、停止は引き続き Meta が管理します。

## 次に読む

- [CodingAgent がグラフでできること](./coding-agent.md)。
- [agents 間のメッセージと協業](./coding-agents-and-canvas.md)。
- [Connection の配信モードと Guardrails](./connections.md)。
- [実際の用途とともに次の Channel を提案する](https://github.com/digows/agentkavor-community/discussions/new?category=ideas)。
