---
id: docs-home
title: Kavor ドキュメント
description: Kavorで最初のループを作り、CodingAgentsとの仕様作成、実装、レビュー、テスト、スケジュール実行のガイドを見つけましょう。
kind: landing
lastReviewedAt: 2026-10-01
canonicalUrl: https://agentkavor.com/ja/docs
---

# エンジニアリングを失わずに Agent と構築する

作業は一つの意図から始まります。Kavorでは、その周りにエージェント、コンテキスト、証拠を配置し、
レビューできる成果へ進めます。Canvasは作業を可視化し、ConnectionsはCodingAgentsが到達可能な
リソースや参加者と協働するための関係を作ります。

![Specifications、CodingAgents、Files、Sticky Notes、Terminalsを整理した実際のKavor Workspace](https://media.agentkavor.com/demos/canvas-overview/workspace.8f917eaa5261.jpg)

[このWorkspaceの動作を見る →](https://agentkavor.com/ja/videos/overview)

## 小さな成果から始める

最初のCanvasでは、検証できる変更を選びましょう。入力検証の修正、テストの追加、小さな機能の実装などです。
チュートリアルではSpecification、Implementer、Reviewer、Sticky Noteを配置し、意図、実装、レビュー、
判断を一つのループに保ちます。

**[最初のループを作る →](./first-loop.md)**

構成は作業に合わせて育てます。少数のNodesから始め、検証用のTerminal、参照用のFile、アプリを
テストするWebBrowserを必要に応じて加えられます。先にモデルを理解したい場合は
[Kavorとは？](./what-is-kavor.md)を読んでください。

## 何をしたいですか？

| やりたいこと | 読むガイド |
| --- | --- |
| アイデアを実装可能な契約にする | [Specification](./specification.md)：質問、範囲、基準、証拠。 |
| 実装とレビューを別のエージェントに任せる | [CodingAgentsと役割](./agents-and-roles.md)：責任、コンテキスト、引き継ぎ。 |
| 未決事項や進捗を見える場所に保つ | [Sticky Note](./sticky-note.md)：共有する作業メモリ。 |
| コード、PDF、画像、その他のファイルから作業する | [File](./file.md)：正規のソース、参照、実行への入力。 |
| 検証を実行したりプロセスを調査する | [Terminal](./terminal.md)：コマンド、ログ、同じshellでの協働。 |
| Webアプリの問題を再現して修正する | [WebBrowser](./web-browser.md)：生きたページ、console、network、視覚的証拠。 |
| 決まった時刻に作業を始める | [Schedule](./schedule.md)：prompt、コマンド、繰り返し、結果。 |

## Canvasの構成要素を理解する

- [Nodes](./nodes.md)では各要素の役割と組み合わせを紹介します。
- [Connections](./connections.md)は対応ペア、パラメーター、Guardrailsのリファレンスです。
- [CodingAgent](./coding-agent.md)ではharnessのセッションとグラフから得られる能力を説明します。
- [CodingAgentsがCanvasを見て構築する仕組み](./coding-agents-and-canvas.md)では、エージェントに
  構成の説明や組み立てを手伝ってもらう方法を説明します。

## コミュニティと続ける

Kavorは無料で、Windows、macOS、Linuxに対応しています。[Kavorをダウンロード](https://download.agentkavor.com/ja)し、
[リリースノート](./release-notes/index.md)を確認するか、質問や実際の作業の流れを
[Kavor Community](https://github.com/digows/agentkavor-community/discussions)に持ち寄ってください。
