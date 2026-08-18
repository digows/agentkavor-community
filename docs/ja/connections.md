---
id: connections
title: KavorでサポートされるConnectionsのマトリクス
description: サポートされるNodesの組み合わせ、付与される能力、必要なパラメーター、利用可能なGuardrailsを確認できます。
kind: guide
lastReviewedAt: 2026-08-07
canonicalUrl: https://agentkavor.com/ja/docs/connections
---

# KavorでサポートされるConnectionsのマトリクス

Connectionは、Canvas上に描かれた単なる線ではありません。2つのNodesが同じグラフに参加することを宣言し、
その組み合わせが仕事にどのような能力を加えるかを定義します。

すべての組み合わせが有効なわけではありません。サポートされる各ペアには固有の契約があります。コンテキストを
到達可能にするConnections、Kavorを介した操作を可能にするConnections、環境変数を使ってTerminalへ正規パスを
提供する2つのConnectionsがあります。

このページは、それらの契約に関する公開リファレンスです。

## Connectionの読み方

Connectionには3つの異なる責任があります。

1. **存在：** Nodesを、グラフ内の同じ到達可能なコンポーネントへ接続します。
2. **パラメーター：** そのペアで必要となる必須設定を記録します。
3. **Guardrails：** 2つのNodes間で通常許可される振る舞いから、能力を差し引きます。

Connectionsは双方向の関係です。Kavorは2つのendpointsを正規順序で保存しますが、その順序はフロー、制御、
優先順位を表しません。メッセージには送信者と受信者があり、Triggerには対象があります。これらの方向は、
永続化されたConnectionではなく、実行される操作に属します。

## サポートされる組み合わせ

| Nodesのペア | Connectionが可能にすること | パラメーター | 利用可能なGuardrail | 主な例 |
| --- | --- | --- | --- | --- |
| **CodingAgent + Specification** | メタデータと正規のMarkdownを読み、許可されている場合はlifecycleを操作して永続的なoutputsを記録する。 | なし | `specification_read_only` | Spec Writer、Builder、Reviewerが同じ契約を共有する。 |
| **CodingAgent + Sticky Note** | バージョン管理された非公式のMarkdownメモリを読み書きする。書き込みごとにappendまたはreplaceを選ぶ。 | なし | `sticky_note_read_only` | 未解決の判断、進捗、調査結果、handoffsを見える形で残す。 |
| **CodingAgent + Terminal** | 許可されている場合に、outputの読み取り、コマンド実行、対応づけられた実行の追跡や中断、foregroundプロセスとの対話を行う。 | なし | `terminal_read_only` | 診断、テスト、ログ確認、または監督下のSSHセッション支援。 |
| **CodingAgent + File** | filesystem上の正規sourceをグラフ内で明示し、許可されている場合に読み取り、レビュー、変更する。 | なし | `file_read_only` | モジュール、PDF、画像、報告書、設定を具体的な対象にする。 |
| **CodingAgent + CodingAgent** | 非同期メッセージ、返信、独立レビュー、並行作業のための到達可能なグラフを構成する。 | なし | なし | BuilderがReviewerにレビューを依頼する。 |
| **Specification + Terminal** | Specificationの正規絶対パスをTerminalセッションへ公開する。 | 環境変数名が必須 | なし | SpecificationのMarkdownを検証、確認、比較する。 |
| **File + Terminal** | Fileの正規絶対パスをTerminalセッションへ公開する。 | 環境変数名が必須 | なし | ウィンドウ間でパスをコピーせずにscriptやSQLファイルを使う。 |
| **Trigger + CodingAgent** | 設定した時刻に、アクティブなセッションを持つCodingAgentへpromptを届ける。 | なし | なし | Maintainerを起こして障害を分析し、報告を書き、レビューを依頼する。 |
| **Trigger + Terminal** | 設定した時刻に、Terminalのアクティブなセッションへコマンドを届ける。 | なし | なし | テスト、データベース検証、メンテナンスscriptを実行する。 |

## Guardrailsは制限する。アクセスを付与するものではない

Connectionは、そのペアに実装された能力を基本として始まります。Guardrailは、その基本動作に対してユーザーが
選んだ制限を記録します。

| Guardrail | Connection | 効果 |
| --- | --- | --- |
| `specification_read_only` | CodingAgent + Specification | 読み取りは維持し、Kavorを介したlifecycleとoutputsの変更を禁止する。Markdownの直接編集も明示的な読み取り専用契約となる。 |
| `sticky_note_read_only` | CodingAgent + Sticky Note | 読み取りは維持し、内容のappendまたはreplaceを禁止する。 |
| `terminal_read_only` | CodingAgent + Terminal | Terminalの確認は維持し、セッション、プロセス、入力を変更する操作を禁止する。 |
| `file_read_only` | CodingAgent + File | agentが正規sourceを変更してはならないことを宣言する。 |

Guardrailsは、CodingAgentとリソース間の直接のConnectionに属します。グラフ内に別の経路があっても、その直接ペアに
存在する制限は消えません。

Guardrailが操作を禁止している場合、Kavorを介した操作は効果を生む前に拒否されます。FilesやSpecificationsの
本文は、ハーネス自身のfilesystemツールからアクセスできる場合もあります。その場合、Guardrailは目に見える
監視対象の契約であり、OSのsandboxではありません。

GuardrailはConnectionを作成せず、Nodeを到達可能にせず、権限を増やしません。リソースをグラフに参加させたく
ない場合は、Connectionを作成しないでください。

## 環境変数を持つConnections

永続化されたパラメーターを持つペアは2つだけです。

- **File + Terminal**
- **Specification + Terminal**

どちらの場合も、環境変数の名前を選びます。Terminalへ渡される値はsourceの正規絶対パスであり、ファイルの内容
ではありません。

たとえば、`CHECK_SQL`として接続されたFileは、shellで次のように利用できます。

```sh
sqlite3 app.db < "$CHECK_SQL"
```

KavorはTerminalセッションの開始時に値を適用します。shellが開いている間にConnectionまたはパラメーターが
変更された場合、変数の反映にはセッションの再起動が必要であることをUIが示します。`TERM`と`COLORTERM`は
予約名であり、これらのパラメーターには使用できません。

## Trigger固有の制限

Triggerが直接持てる対象は最大1つで、CodingAgentまたはTerminalのいずれかです。Specification、File、
Sticky Noteへ直接接続することはなく、1回の発火を複数の対象へ配信することもありません。

グラフの残りの部分は、対象の権限を広げることなく、対象ができることを増やせます。Triggerによって起こされた
CodingAgentは、同じGuardrailsとセッション制限のもとで、すでに到達可能なNodesと作業できます。

配信にはKavorが実行中で、対象のセッションがアクティブであることが必要です。Triggerは、人間が停止したままに
したセッションを開始せず、仕事の目的を判断せず、外部への作用をexactly-once操作に変えません。各
TriggerFiringは、確認可能な永続的結果を保持します。

## 存在しない組み合わせ

Kavorは、マトリクスにないすべてのペアを拒否します。たとえば次の組み合わせです。

- Trigger + Specification
- Trigger + File
- Trigger + Sticky Note
- Specification + File
- Specification + Sticky Note
- File + Sticky Note
- File + File
- Sticky Note + Terminal
- Sticky Note + Sticky Note
- Terminal + Terminal

Nodeを自分自身に接続することもできません。同じ2つのendpointsを逆にしても、関係には永続化された方向がないため、
別のConnectionにはなりません。

Canvas上の近さ、メッセージ内での言及、同じWorkspaceへの参加は、Connectionの代わりになりません。このページに
ない組み合わせは、別のNodeの近くに見えているだけでは能力を付与しません。

## 仕事を解決する最小のConnectionを選ぶ

2つのNodesを接続する前に、どの具体的な能力が不足しているかを考えてください。

- agentに永続的な意図が必要ですか？Specificationを接続します。
- 人間とagentが作業メモリを共有する必要がありますか？Sticky Noteを接続します。
- agentがプロセスを実行または監視する必要がありますか？Terminalを接続します。
- 正規sourceを明示する必要がありますか？Fileを接続します。
- 別の視点が実装やレビューを改善しますか？別のCodingAgentを接続します。
- 時間が本当に活動を始めるべきですか？Triggerは最後に追加します。

良いConnectionは仕事をより明示的にします。何の能力を加えるのか説明できないなら、そのグラフにはおそらく
不要です。

## 次に読む

- 各参加者の責任を理解するには、[Nodesの中心ガイド](./nodes.md)を読んでください。
- [CodingAgent](./coding-agent.md)、[Specification](./specification.md)、
  [Terminal](./terminal.md)の専用ガイドで詳しく学んでください。
- 意図、実装、レビュー、人間の判断を含む[最初のループを完了](./first-loop.md)してください。
- グラフを広げる前に、[CodingAgentsと役割の選び方](./agents-and-roles.md)を確認してください。
