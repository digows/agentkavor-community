---
id: nodes
title: KavorのNodes
description: CodingAgent、Specification、Sticky Note、Terminal、File、Triggerが単体でできることと、接続によって得られる能力を解説します。
kind: guide
lastReviewedAt: 2026-08-07
canonicalUrl: https://agentkavor.com/ja/docs/nodes
---

# Nodeは単体でも役立つ。グラフは仕事をシステムに変える。

Kavorは、お気に入りのcoding agentを手放したり、ターミナルを隠したり、あらゆる判断を新しいチャットに
変えたりすることを求めません。参加者、ツール、コンテキストを同じCanvasに配置し、誰が、何を使い、
どの制約のもとで作業しているのかを見えるようにします。

このCanvas上の第一級の要素は、すべて**Node**です。CodingAgentはNodeです。Specificationも同じです。
Sticky Note、Terminal、File、Triggerも、それぞれ異なる責任を持って仕事に参加できるため、同じ空間に
置かれます。

Nodeは単体でもすでに有用です。**Connection**を作成すると、その有用性が明示的な能力になります。
複数のConnectionsがグラフを構成すれば、コンテキスト、実行、記憶、協働が、個別のウィンドウや
セッションに散らばったままになりません。

これが基本モデルです。

**Node → Connection → グラフ → 人間の判断**

この並びは、仕事がどのように構造を得るかを示しています。Connectionsは永続化された矢印でも、次の箱を
実行する自動化でもありません。Nodes間の関係を目に見える形で表したものです。

![KavorのCanvas上で接続されたCodingAgents、Specification、Sticky Note、Terminal、File、Trigger](https://agentkavor.com/kavor-nodes-and-connections-article.jpg)

*Canvasでは、参加者やConnectionsを隠すことなく、永続的な意図、共有メモリ、実行、ファイル、予定された
きっかけを組み合わせられます。*

## Connectionが実際に変えるもの

Connectionは、実務的な問いに答えます。**この2つのNodesは、一緒に何ができるのか？**

組み合わせに応じて、CodingAgentはSpecificationを扱い、Sticky Noteに書き込み、Terminalを操作し、Fileを
明示的なスコープとして扱い、別のCodingAgentと会話できるようになります。また、Fileの正規パスをTerminalに
渡したり、指定時刻にアクティブなセッションを持つCodingAgentを起こしたりすることもできます。

同時に、Connectionは境界も定めます。

- Canvas上で近くにあるNodes同士が、自動的にアクセス権を得ることはありません。
- メッセージ内でNodeに言及しても、能力は付与されません。
- Nodesのすべての組み合わせがサポートされているわけではありません。
- Guardrailは、Connectionによって与えられた能力を制限できます。
- グラフはコンテキストを到達可能にしますが、操作を自動承認するものではありません。

結果は、魔法のように見せることより実用性を優先します。作業の前、最中、後に、その構造を確認できます。

## 6つのNodes

### CodingAgent：愛用のハーネスをグラフの参加者にする

CodingAgentは、すでに使っているネイティブproviderを、その固有のターミナルインターフェースで実行する
Nodeです。KavorはClaude Code、Codex、Google Antigravityを汎用チャットに置き換えず、それぞれのハーネスの
体験を保ったままCanvasに配置します。

各CodingAgentには明確な役割を与えられます。ハーネスが対応している場合は、provider、モデル、effortレベル
などのネイティブ設定もそのまま利用できます。質問と判断に集中するSpec Writer、実装を担うBuilder、結果を
検証するReviewerというように、責任を分けられます。

CodingAgents同士を接続すると、非同期にメッセージを交換できます。会話はMessagesパネルに表示され続けるため、
必要なときに介入できます。Specifications、Files、Sticky Notes、Terminalsに接続すれば、その作業にどの
リソースが参加しているかもグラフから明確に分かります。

同じハーネスのまま、コンテキストと能力が見えるようになります。

### Specification：セッションを越えて残る意図

Specificationは、判断、スコープ、制約、受け入れ基準を永続的なMarkdownとして記録します。アーキテクチャの
基盤、連携、ドメインモデリング、機能、モジュール、あるいは範囲を限定した修正計画を記述できます。

手作業で書くことも、CodingAgentと共同で作成することもできます。難しいテーマでは、実装前に利用可能な最善の
推論へ投資する価値があります。ここで深く考えるコストは、後から曖昧さを修正するコストより小さくなることが
少なくありません。

Specificationsにはlifecycleがあります。**Draft**は調査と判断のための段階です。**Ready**は、その契約を
実装できるという合図です。**In progress**、**Blocked**、**Done**によって作業状態を見えるように保ちます。
**Done**は、受け入れ基準を実際に満たしたときにだけ意味を持ちます。

役割の異なるagentsに接続すれば、同じSpecificationが、書く人、実装する人、レビューする人を導けます。
1つの会話の記憶に依存する必要はありません。

### Sticky Note：人間とagentが共有する作業メモリ

Sticky NoteはCanvas上の付箋です。一般的なメモと同じように、質問、仮説、一時的な判断、調査結果、次の手順を
書き留められます。

CodingAgentに接続すると、もう1人の書き手が加わります。Specificationをまとめる途中の未解決事項を整理する、
実装中に人間が確認すべき点を記録する、あるいは「何を終え、今何をして、次に何をするのか」に答える状態を、
チャット履歴に埋もれさせずに一緒に管理できます。

Sticky Notesは、非公式で目に見える作業メモリに適しています。判断が、実装や将来の保守に使う永続的な契約に
なったなら、いつまでもメモに隠さずSpecificationへ昇格させるべきです。

### Terminal：見える状態を保つ実行環境

Terminalは、同じ視覚的なWorkspace内にshellを保ちます。周囲のCanvasを失うことなく、terminals間を移動し、
ログを追い、検証を実行し、リモートマシンへの接続を維持できます。

CodingAgentを接続すると、人間とagentが同じTerminalで作業できます。agentは許可された範囲でoutputを確認し、
コマンドを実行し、対応づけられた実行を追跡し、診断を支援できます。人間の入力が常に優先され、Guardrailに
よってConnectionを読み取り専用にすることもできます。

FilesとSpecificationsは、環境変数を使ってTerminalにパスを渡すこともできます。Triggerは、予定された
コマンドをアクティブなshellセッションへ直接届けられます。

Terminalは、不透明な自動化の背後に実行を隠しません。プロセス、コマンド、結果は見えるままです。

### File：Canvasの仕事に参加するファイル

Fileはファイルです。価値は、その正規のsourceをグラフ上で目に見える明示的なものにする点にあります。

CodingAgentに接続すると、読み取り、レビュー、変更の対象となるファイルを具体的に限定できます。Canvas上に
テキスト、画像、PDFを表示したまま、残りの作業を組み立てることもできます。

Terminalに接続すると、Fileの絶対パスを環境変数として公開できます。ウィンドウ間でパスをコピーせずに、
script、SQLファイル、設定ファイルなどを、視覚的にコマンドの入力として利用できます。

Fileは使い捨てのattachmentにはなりません。filesystem上の実体が、そのまま正規のsourceです。

### Trigger：活動を始める目に見えるきっかけ

Triggerは、時間に基づいて操作を予定します。OSのcronのようにTerminalへコマンドを届けることも、アクティブな
セッションを持つCodingAgentへ明確なpromptを送ることもできます。

対象がすでに他のNodesへ接続されていると、その価値はさらに高まります。Triggerによって、Fileを確認し、
Terminalで検証を行い、Sticky Noteへ報告を書き、別のCodingAgentへ独立レビューを依頼する担当agentを
起こせます。

こうしてカレンダー上の時刻が、小さな自律または半自律システムの起点になります。Triggerが活動を開始し、
グラフがコンテキスト、ツール、メモリ、協働を提供します。

Triggerは、何をすべきかを単独で判断せず、権限を拡張せず、人間が停止したままにしたセッションを開始しません。
また、直接の対象は1つだけで、CodingAgentまたはTerminalのいずれかです。

## Nodesがグラフを構成するとき

Canvasの価値は、それぞれのNodeに責任があり、Connectionsが実際の必要性を表しているときに現れます。
次の3つのグラフが、その発展を示します。

### 意図からレビューまで

**Specification → Builder → Reviewer → 人間の判断**

Specificationが契約を保持します。Builderが実装します。Reviewerが結果を受け入れ基準と照合します。
Sticky Noteは調査結果や作業上の判断を残し、Terminalはテストや検証などの証拠を提供します。

Connectionsがこの順序を自動実行するわけではありません。同じグラフの中で、必要な参加者と能力を到達可能に
するものです。

### 定期メンテナンス

**Trigger → Maintainer**

Maintainerは、入力データを持つFile、検証を実行するTerminal、報告を記録するSticky Note、独立した評価を行う
Reviewerに接続されています。

設定時刻にKavorが動作中で、対象のセッションがアクティブなら、Triggerがpromptを届けます。CodingAgentは、
すでに持っていたコンテキストと制約のもとで作業します。Workspaceへ戻ったときに、結果、メッセージ、証拠を
確認できます。

### 監督下の運用コマンド

**Trigger → Terminal**

SQLやscriptを含むFileが、環境変数を通じてTerminalへパスを提供します。Triggerは予定されたコマンドを
アクティブなセッションへ届けます。Terminalに接続されたCodingAgentは、人間がプロセスを見守るなかで結果の
分析を支援できます。

このグラフは、原因と実行を自動化しますが、システムが成功の意味を単独で理解しているとは装いません。

## Nodesの数ではなく、仕事から始める

Canvasが大きければ自動的に優れているわけではありません。結果を検証可能にする最小の構造から始めましょう。

1. 何を実現する必要があるかを定義します。
2. 判断、スコープ、基準を残す必要があるならSpecificationを追加します。
3. CodingAgentを選び、明確な役割を与えます。
4. 具体的なスコープを明示する必要があるならFileを接続します。
5. タスクに実行や証拠が必要ならTerminalを接続します。
6. 人間とagentが作業メモリを共有する必要があるならSticky Noteを使います。
7. 独立レビューや並行作業が本当に結果を改善する場合に、別のCodingAgentを追加します。
8. 時間が活動の正当な原因である場合に、Triggerを追加します。

目的はCanvasを埋めることではありません。理解できるほど小さく、意図、実行、証拠、判断を保てるほど十分な
システムを作ることです。

## 次に読む

- [サポートされるConnectionsのマトリクス](./connections.md)で、各組み合わせが何を可能にするかを確認します。
- Specification、2つのCodingAgents、Sticky Noteを使って[最初のループを完了](./first-loop.md)します。
- 設計、実装、レビュー、出荷を分けるために、[CodingAgentsと役割の選び方](./agents-and-roles.md)を確認します。
- 製品モデル全体を振り返るには、[Kavorとは？](./what-is-kavor.md)に戻ります。
