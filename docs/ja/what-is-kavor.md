---
id: what-is-kavor
title: Kavor とは？
description: Coding Agent と永続的なエンジニアリングコンテキストを調整する、Kavor のローカルファーストな視覚システムを理解します。
kind: guide
lastReviewedAt: 2026-08-05
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
Terminals、CodingAgents など、作業のリソースと参加者を表す Nodes を追加します。Nodes 間の Connections は
コンテキストを運び、見える形で能力を付与します。より強い境界が必要な場合は Guardrails がその能力を
制限します。

1 つの CodingAgent が Specification を実装し、別の Agent が結果をレビューし、さらに別の Agent がリリースを
準備できます。個々の Agent セッションが終わっても、Specification と証拠は Workspace に残ります。グラフを
確認し、介入し、何を受け入れるかを決められます。

[![CodingAgents、Specifications、Files、Sticky Notes、Terminals が接続された Kavor Canvas](https://agentkavor.com/kavor-working-demo-poster.jpg)](https://agentkavor.com/ja/videos/overview)

[実際の Kavor Workspace を 38 秒で見る →](https://agentkavor.com/ja/videos/overview)

## 中心的な用語

- **Workspace** — あなたが選んだディレクトリをルートとする Kavor 環境。
- **Canvas** — 作業を整理する視覚的な面。
- **Node** — CodingAgent、Specification、File、Terminal、Sticky Note など、Canvas 上の第一級項目。
- **Connection** — Nodes 間でコンテキストを共有したり能力を付与したりする明示的な関係。
- **CodingAgent** — Workspace の参加者として動作する Agent プロバイダー。
- **Specification** — 意図、制約、受け入れ基準を記録する永続的な Markdown 契約。
- **Guardrail** — ユーザーが所有し、Connection に適用する制限。
- **Sticky Note** — 意思決定、観察、次の手順を共有するための非公式な作業メモリ。

## ローカルに残るもの

Kavor はローカルファーストです。Workspace、リポジトリ、ファイル、ターミナル、プロバイダーセッションは、
あなたのマシン上であなたの管理下に残ります。Connection は Kavor 内の権限を表すものであり、Workspace の
非公開コンテンツを公開サービスへコピーする理由にはなりません。

## 最初の実用的なループ

小さく始めます。1 つの Specification を 1 つの CodingAgent と 1 つの Terminal に接続してください。
CodingAgent に契約を実装させ、証拠を確認し、意思決定を Workspace に残します。レビュー担当や複雑なループは、
作業に価値がある場合にだけ追加します。

[Kavor をダウンロード](https://download.agentkavor.com/ja)するか、[リリースノート](./release-notes/index.md)をお読みください。
