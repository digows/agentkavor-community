---
id: first-loop
title: Kavor で最初のループを完結させる方法
description: Specification、Claude Code、Codex、Sticky Note を使い、意図から人間の判断までをつなぐ小さなループを構築します。
kind: tutorial
lastReviewedAt: 2026-08-05
canonicalUrl: https://agentkavor.com/ja/docs/first-loop
---

# Kavor で最初のループを完結させる方法

最初に作るべき Canvas は、最も充実したものではありません。明確な意図をレビュー可能な変更へ
変換できる、最小の Canvas です。

このチュートリアルでは、Claude Code が Specification を実装し、Codex が結果をレビューします。
両者は証拠を Sticky Note に残し、作業をいつ完了するかはあなたが決めます。

[![Canvas 上で接続された Specification、Claude Code、Codex、Sticky Note](https://media.agentkavor.com/demos/first-loop/canvas.24845dea72ff.jpg)](https://agentkavor.com/ja/videos/small-loop)

[1 分 29 秒でループ全体を見る →](https://agentkavor.com/ja/videos/small-loop)

## 始める前に

必要なもの：

- Workspace を開いた Kavor。
- インストールと認証が完了した Claude Code と Codex。
- Workspace ディレクトリ内にある、結果を確認できる小さなタスク。

最初のタスクは、一文で説明でき、客観的な基準が 2〜3 個あるものが適しています。たとえば、
「フォーム検証を追加し、既存のテストをすべて通す」です。大規模なリファクタリングから始めるのは
避けてください。

## 構築するループ

作業は次の順序で進みます。

`Specification → Claude Code → メッセージ → Codex → 人間の判断`

Specification は 2 つの CodingAgents の両方に接続します。Claude Code と Codex も互いに接続し、
同じ Sticky Note に接続します。

Connections は処理の流れを示す矢印ではありません。Nodes 間の関係です。上の順序は、この
チュートリアルでの作業手順を表しています。

## CodingAgent と一緒に組み立てますか？

普段使っている CodingAgent は、追加設定なしで Kavor の公式ドキュメントを参照し、Canvas の説明、
質問への回答、ループ設計の支援を行えます。現在の Connections と権限で許可されている場合は、
CodingAgent と一緒に Nodes と Connections を作成することもできます。

次の依頼から始められます。

> Kavor の公式ドキュメントを参照し、このタスクの最初のループを組み立てるのを手伝ってください。
> 最初に、必要な構造と Connections を説明してください。その後、現在の Connections で許可されて
> いる場合は、Specification、CodingAgents、Sticky Note を作成して接続し、私がループを確認できる
> よう、実装を始める前に止まってください。

ドキュメントは CodingAgent のアクセス範囲を広げず、暗黙の Connections を作成せず、Guardrails の
回避も許可しません。ドキュメントサービスが利用できない場合でも、Kavor の他のローカルツールは
引き続き動作します。

## 1. 小さな Specification を作成する

1. Canvas の空いている場所を右クリックし、`Add Spec…` を選びます。
2. `Fix form validation` のような直接的な名前を付けて確定します。
3. Specification を編集し、次を記録します。
   - 現在の問題。
   - 期待する結果。
   - スコープ外の内容。
   - 検証可能な 2〜3 個の受け入れ基準。
4. 契約が実装可能になったら、ステータスを `Draft` から `Ready` に変更します。

Specification は永続的な Markdown です。セッション終了後も Workspace に残り、実装、レビュー、
人間の判断を同じ契約から開始できます。

## 2. 参加者と共有メモリを追加する

Canvas を右クリックして、次を追加します。

- `Add Claude Code`
- `Add Codex`
- `Add Sticky Note`

役割が明確になるなら、CodingAgents を `Implementer`、`Reviewer` などに変更してください。Sticky Note
には `Implementation and review notes` のような簡潔な名前を付けます。

次の 5 つの Connections を作成します。

1. Specification — Claude Code
2. Specification — Codex
3. Claude Code — Codex
4. Claude Code — Sticky Note
5. Codex — Sticky Note

一方の Node の丸いハンドルを、もう一方の Node の丸いハンドルまでドラッグします。各種類の Connection
を初めて作るときは、続行前に Kavor の確認を読んでください。この最初のループでは Guardrails を
追加しません。適用すべき具体的な制限ができてから使います。

## 3. 検証可能な成果を依頼する

Claude Code に次を送ります。

> 接続された Specification を読み、そのスコープだけを実装してください。コードを変更する前に、
> 受け入れ基準を確認してください。完了したら、関連するチェックを実行し、永続的な outputs を
> Specification に登録し、変更したファイル、実行したチェック、残っているリスクの概要を Sticky Note
> に追記してください。その後、Specification を参照した Kavor メッセージを Codex に送り、受け入れ
> 基準に対するレビューを依頼してください。

Connection は、許可されたコンテキストと能力を利用可能にします。タスクを自動で実行するものでは
ありません。CodingAgent で作業を追跡し、「完了」という言葉だけを十分な証拠と見なさないでください。

## 4. レビューを受け取る

メッセージが届くと、Codex は直接接続された Specification と Sticky Note を利用できます。次を
依頼してください。

- すべての受け入れ基準と実装を比較する。
- 関連するチェックを実行する。
- 具体的な指摘を記録するか、ブロッカーがないことを明記する。
- レビュー結果を Sticky Note に追加する。
- 修正が必要な場合は Claude Code に返信する。

Node の `Messages` を開き、配信状況と返信を確認します。指摘があれば Claude Code に修正させ、
もう一度レビューを依頼します。この戻りの経路も同じループの一部です。

## 5. 人間の判断でループを閉じる

作業を完了扱いにする前に、次を行います。

1. Specification の基準を読み直す。
2. 登録された outputs と変更内容を確認する。
3. Sticky Note に実装とレビューの概要が残っていることを確認する。
4. ブロッカーとなる指摘を解消する。
5. Specification のステータスを `Done` に変更する。

ステータスはあなたの判断に代わるものではありません。変更を受け入れる、修正を依頼する、スコープを
狭める、破棄する、いずれも選べます。意図、実行、レビュー、証拠、受け入れが Workspace 上で見える
状態に保たれたとき、ループは完結します。

## 期待される結果

完了時には：

- Canvas に参加者と共有されたコンテキストが表示される。
- Specification に契約と永続的な outputs が残る。
- CodingAgents 間のメッセージを引き続き確認できる。
- Sticky Note に実装とレビューの所見がまとまっている。
- 最終判断はあなたに残されている。

## 問題が起きた場合

- **CodingAgent が Specification または Sticky Note を見つけられない：** 2 つの Nodes が直接
  Connection されているか確認してください。メッセージで Node を参照するだけではアクセス権は
  与えられません。
- **メッセージが届かない：** CodingAgents 間の Connection を確認し、`Messages` を開いて配信状況を
  確認してください。プロバイダーが処理中の場合は、後で届くことがあります。
- **Guardrail が操作をブロックする：** Connection を開いて制限を確認してください。CodingAgent に
  回避を依頼しないでください。
- **証拠が不足している：** CodingAgent にファイル、commits、その他の永続的な outputs を Specification
  に登録し、Sticky Note を完成させるよう依頼してください。

次に [Kavor とは？](https://agentkavor.com/ja/docs/what-is-kavor)と
[リリースノート](https://agentkavor.com/ja/docs/release-notes)を読むか、
[Kavor Community](https://github.com/digows/agentkavor-community/discussions)で最初のループを共有してください。
