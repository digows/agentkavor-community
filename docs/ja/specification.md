---
id: specification
title: "Kavor の Specification：一度丁寧に考え、より良く実装する"
description: 意図、決定、基準を永続的な Markdown にまとめ、複数の roots を整理し、Specification の lifecycle を導きます。
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/ja/docs/specification
---

# Kavor の Specification：一度丁寧に考え、より良く実装する

Specification は意図を永続的な契約に変えます。人と CodingAgents は、一つの会話の記憶に依存せず、
それを読み、議論し、実装し、レビューできます。

アーキテクチャ、連携、ドメインモデリング、feature、モジュール、または範囲を限定した修正群を定義できます。
長さは変わっても、責任は同じです。作業を完了とみなす前に、何が真であるべきかを説明します。

![四つの Specification roots が設定された Kavor Workspace Settings。](https://media.agentkavor.com/releases/1.4.0/multiple-specification-roots/article.7d42383e3a37.jpg)

## 信頼できる情報源はファイル

Specification の内容は Workspace 内の Markdown にあります。ファイルはあなたのものです。Kavor で開き、
他のツールで編集し、Git で version 管理し、CodingAgents に直接読ませられます。

Kavor がソースの周囲に保持するのは、identity、status、outputs などの運用メタデータだけです。
Frontmatter の identity により、ファイルを移動または名前変更しても Specification を追跡できます。

Kavor が管理する frontmatter のフィールドを手で編集しないでください。契約は本文に書き、identity と
lifecycle は製品の操作で更新します。

## 自分で書く、または CodingAgent と共同執筆する

手動で始めても、CodingAgent と共同執筆しても構いません。難しいテーマでは、実装前に計画中心の
セッションとより多くの推論能力を使う価値があります。

良い出発点は次の prompt です。

> テーマ X について私にインタビューし、Specification Y を書いてください。確認済みの事実、決定、前提、
> non-goals、失敗シナリオ、観察可能な受け入れ基準を分けてください。解決策を変え得る判断が残る間は、
> 文書を Ready と扱わないでください。

ここでよく考えることで、手戻り、無駄なコンテキスト、曖昧な実装を減らせます。ただし低コストの保証では
ありません。悪い Specification は長くても、高価なモデルが書いても悪いままです。

## 作業を導ける最小限の契約

有用な Specification には通常、次が含まれます。

- コンテキストと現在の問題
- 目標と成功の定義
- 範囲を限定する non-goals
- 決定と制約
- 決定済みの場合の意図したアプローチ
- 観察可能な受け入れ基準
- 関連する失敗シナリオとリスク
- 未解決の質問
- コード、ADRs、issues、他の Specifications への参照

Workspace により良い規約があるなら、固定された儀式は不要です。ただし決定と仮説を区別し、元の会話を
再構築しなくても別の人が結果を評価できる必要があります。

## Lifecycle は指針であり装飾ではない

Kavor は五つの状態を使います。

| 状態 | 実際の意味 |
| --- | --- |
| **Draft** | 問題をまだ調査、議論、決定している。 |
| **Ready** | 安全に実装を始めるための情報が契約にそろっている。 |
| **In progress** | Specification が承認した作業を実行している。 |
| **Blocked** | 具体的な条件が意味のある進捗を妨げている。 |
| **Done** | 目標を達成し、契約が要求する作業が残っていない。 |

Status は意図的に advisory です。Kavor は Markdown の checkboxes を独自システムに変えず、すべての基準を
満たしたことを自動で証明しません。Done にするには、今でも証拠と判断が必要です。

執筆、実装、レビューを分けるのが堅実です。共同執筆した CodingAgent が契約を説明し、別の Agent が
実装し、独立した Reviewer が結果と基準を比較できます。

## 複数の Specification roots を整理する

一つの Workspace は複数のフォルダーに Specifications を保持できます。製品、エンジニアリング、運用、
モジュールごとに判断を分けるプロジェクトや、一つの root が探しにくくなった場合に役立ちます。

Workspace Settings の **Specification roots** でフォルダーを追加、削除、並べ替えます。Roots は：

- Workspace ディレクトリからの相対パス
- 順序付き
- 一意で重複しない
- Workspace ごとに最大 32

最初の root は **Primary** で、新しい Specifications の既定先です。並べ替えると既定先は変わりますが、
既存ファイルは移動しません。root を削除してもファイルは消えません。設定された roots の外にある
Specifications はアクティブ一覧から外れ、その root を再追加すると戻せます。

複数 roots がある場合、Specifications パネルは root、次に実際の filesystem フォルダーでグループ化します。
Canvas は別の分類体系を作りません。整理はあなたが所有するファイル構造のままです。

### シンプルな roots の構成

```text
docs/         製品全体の決定と契約
specs/        実装中の features と連携
marketing/    キャンペーンと編集実験
operations/   保守と運用変更
```

一覧を短くするだけのために roots を作らないでください。各フォルダーが人と agents に理解できる永続的な
境界を持つ場合に使います。

## Specification がグラフから得るもの

Specification は二つの直接 Connections を受け入れます。

- **Specification + CodingAgent** は契約を Agent の到達範囲に置き、lifecycle と outputs を可能にします。
  `specification_read_only` を設定できます。
- **Specification + Terminal** は、Connection で設定した環境変数から Markdown の正規絶対パスを
  エクスポートします。

同じコンポーネントの他の CodingAgents も有効な経路で Specification に到達できます。トポロジーが読みやすく
なる場合や、そのペアに固有の Guardrail が必要な場合を除き、全参加者に直接 Connection は不要です。

## Specification が有効な三つの用途

### アーキテクチャの基盤

不変条件、許可する依存関係、セキュリティ境界、移行戦略、検証可能な基準を記録します。後続 features は、
各 Agent が基盤を再発見せずにその文書を指針にできます。

### 実装とレビューを独立させる feature

Spec Writer が判断を尽くして契約を Ready にし、Implementer がそれに従い、Reviewer が動作、失敗、証拠を
確認します。Outputs は commits や他の結果を作業に結び付けます。

### 範囲を限定した修正群

複数の欠陥が原因や対象領域を共有するとき、期待動作、正確な修正範囲、回帰テストを Specification で定義
できます。共通境界のない無限の bug 一覧になれば、契約としての役割を失っています。

## 実用的なグラフ

```text
Spec Writer — Specification — Implementer — Reviewer
                        │
                     Terminal
```

Spec Writer が決定を記録し、Implementer は Ready の契約だけを実行します。Reviewer は結果と基準を比較し、
Terminal が証拠を提供します。Done とみなす判断は人に残ります。

## 避けること

- 解決策を変える判断を解決せず、文章が長いという理由で Draft を終える。
- 便利だからと分析、Specification、実装、レビューを一つのセッションに集める。
- 観察可能な結果なしに「正しく動く」「性能が良い」と書く。
- Kavor が管理する frontmatter を通常の本文として編集する。
- Status を品質や完了の自動証明とみなす。
- 重複 roots や、永続的な境界のない複数 roots を作る。
- 次の参加者が見つけられない会話やメッセージだけに重要な決定を残す。

## Ready にする前に

問題、目標、non-goals は明確か。事実、決定、仮説は分かれているか。関連する失敗シナリオを扱ったか。
受け入れ基準は検証できるか。Implementer は変更できる範囲を理解できるか。Reviewer は作者の推論を
引き継がず評価できるか。解決策を変える質問には回答したか。確認してください。

良い Specification はすべてのコード行を予測しません。実行とレビューを独立させ、検証可能かつ回復可能に
するだけの曖昧さを取り除きます。

[Kavor で最初の loop を閉じる](./first-loop.md)へ進み、
[CodingAgents と役割](./agents-and-roles.md)で参加者を選ぶか、
[Connections マトリクス](./connections.md)を確認してください。
