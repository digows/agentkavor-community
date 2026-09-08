---
id: what-is-kavor
title: Kavor とは？
description: Coding Agent と永続的なエンジニアリングコンテキストを調整する、Kavor のローカルファーストな視覚システムを理解します。
kind: guide
lastReviewedAt: 2026-09-08
canonicalUrl: https://agentkavor.com/ja/docs/what-is-kavor
---

# Kavor とは？

Kavor は、Coding Agent とその周囲のエンジニアリング作業を調整するローカルファーストな視覚システム
です。互いに無関係なチャットやターミナルに埋もれさせず、コンテキストを Canvas 上で見える状態に
保ちます。

Coding Agent は実装を安価にしました。しかし、問題を定義し、コンテキストを保ち、証拠をレビューし、
意思決定を行い、誰が何に対して行動できるかを理解する必要性はなくなっていません。Kavor はその作業に
明示的な構造を与えます。

## Kavor の仕組み

Workspace はあなたが選んだディレクトリを起点にします。Canvas には、Specifications、Files、Sticky Notes、
Terminals、WebBrowsers、Triggers、CodingAgents など、作業のリソースと参加者を表す Nodes を追加します。
Connections は到達可能な component を形成します。CodingAgent は直接の Connection がなくても、自分の
component 内の任意の Node と作業できます。設定やより強い境界が必要な場合、parameters と Guardrails は
特定の Connections に結び付いたままです。

1 つの CodingAgent が Specification を実装し、別の Agent が結果をレビューし、さらに別の Agent がリリースを
準備できます。個々の Agent セッションが終わっても、Specification と証拠は Workspace に残ります。グラフを
確認し、介入し、何を受け入れるかを決められます。

[![CodingAgents、Specifications、Files、Sticky Notes、Terminals が接続された Kavor Canvas](https://media.agentkavor.com/demos/canvas-overview/workspace.8f917eaa5261.jpg)](https://agentkavor.com/ja/videos/overview)

[実際の Kavor Workspace を 38 秒で見る →](https://agentkavor.com/ja/videos/overview)

## 中心的な用語

- **Workspace** — あなたが選んだディレクトリをルートとする Kavor 環境。
- **Canvas** — 作業を整理する視覚的な面。
- **Node** — CodingAgent、Specification、Sticky Note、Terminal、File、WebBrowser、Trigger など、Canvas 上の第一級項目。
- **Connection** — Nodes を到達可能な component に統合する、明示的で方向を持たない関係。
- **CodingAgent** — Workspace の参加者として動作する Agent プロバイダー。
- **Specification** — 意図、制約、受け入れ基準を記録する永続的な Markdown 契約。
- **Guardrail** — ユーザーが所有し、Connection に適用する制限。
- **Sticky Note** — 意思決定、観察、次の手順を共有するための非公式な作業メモリ。
- **WebBrowser** — 人と CodingAgent が同じライブ状態で観察し操作できる、実際の Chromium ページ。
- **Trigger** — アクティビティを起こす可視化された原因。Schedule は時間ベースのアクションに使えるソースです。

## Web もグラフに参加する

WebBrowser は実際のページを Canvas 上に保持します。CodingAgent と接続すると、人と Agent が同じタブ、
ナビゲーション、可視状態で作業でき、Web を会話に貼り付けたテキストへ縮小せずに済みます。Workspace を
切り替えてもページを生かしたままにでき、戻ったときに同じ状態を表示できます。

[![同じページを操作する CodingAgent に接続された Kavor WebBrowser](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)](https://agentkavor.com/ja/videos/web-browser-node)

[WebBrowser の動作を見る →](https://agentkavor.com/ja/videos/web-browser-node)

## ローカルに残るもの

Kavor はローカルファーストです。Workspace、リポジトリ、ファイル、ターミナル、プロバイダーセッションは、
あなたのマシン上であなたの管理下に残ります。Connection は Kavor 内の権限を表すものであり、Workspace の
非公開コンテンツを公開サービスへコピーする理由にはなりません。

## 最初の実用的なループ

小さく始めます。1 つの Specification を 1 つの CodingAgent と 1 つの Terminal に接続してください。
CodingAgent に契約を実装させ、証拠を確認し、意思決定を Workspace に残します。レビュー担当や複雑なループは、
作業に価値がある場合にだけ追加します。

[最初のループの完全なチュートリアル](./first-loop.md)に沿って、実装、レビュー、共有された証拠、
人間の判断を追加してください。

CodingAgent 自身に構造づくりを手伝わせたい場合は、[CodingAgents が Canvas を見て構築する仕組み](./coding-agents-and-canvas.md)
を参照してください。時間を起点に作業を始めるには [Schedule](./schedule.md) を学んでください。

## 1 つのアプリケーション、複数の Workspaces

異なる Workspaces を独立したウィンドウで開き、複数のモニターへ配置できます。各ウィンドウは独自の Canvas と
セッションを保持しながら、アプリケーションは 1 つの共有 runtime を使い続けます。

![異なるウィンドウで開かれた複数の Kavor Workspaces](https://media.agentkavor.com/releases/1.3.0/multiple-workspaces/overview.baa20506a993.jpg)

[Kavor をダウンロード](https://download.agentkavor.com/ja)するか、[リリースノート](./release-notes/index.md)をお読みください。
