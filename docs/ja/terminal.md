---
id: terminal
title: "Kavor の Terminal：人と agent に見える実行環境"
description: Canvas 上の本物の shell を使い、正規パスでコンテキストを接続し、監督を失わずに CodingAgent の支援を受けます。
kind: guide
lastReviewedAt: 2026-10-08
canonicalUrl: https://agentkavor.com/ja/docs/terminal
---

# Kavor の Terminal：人と agent に見える実行環境

Terminal は Canvas 上の本物の shell です。使い慣れたコマンドを入力し、logs を追い、ツールを操作し続け
ながら、Kavor がそのセッションにコンテキスト、可観測性、協力を加えます。

目的は実行をボタンの後ろに隠すことではありません。人と CodingAgent が、明確な境界の下で同じ見える環境を
使うことです。

![Terminals、Files、Specifications、CodingAgentsがCanvasの作業グラフでつながる様子](https://media.agentkavor.com/editorial/nodes-and-connections/graph.b499a1b842e8.jpg)

## Terminal が持つもの

各 Terminal は独自のセッション、shell、Node が保持する画面履歴を持ちます。アプリ、テスト、データベース、
logs、あなたが開いたリモートマシンなど責任が異なる場合、複数の Terminals が役立ちます。

プロセスは shell プロセスのままです。Kavor は表示された文字を成功に変換せず、すべてのコマンドを永続
タスクにせず、楽観的なメッセージが出ただけでツールが完了したと仮定しません。

## 単独でできること

Connections がなくても、Terminal は Workspace 内に shell を保ち、外部ウィンドウへの切り替えを減らします。
対話的なコマンド、長時間プロセス、同じ Canvas 上の複数セッションを利用できます。

Connections は shell を置き換えずに参加者と正規ソースを加えます。

## グラフから得るもの

Terminal は四つの直接ペアを受け入れます。

| Connection | 追加されるもの |
| --- | --- |
| **Terminal + CodingAgent** | Agent は関連付けられたコマンドを実行し、プロセスを追跡し、画面や履歴を確認し、許可されたときに実行を中断できます。`terminal_read_only` を設定できます。 |
| **Terminal + File** | File の正規絶対パスを、選んだ環境変数としてエクスポートします。 |
| **Terminal + Specification** | Specification Markdown の正規絶対パスを環境変数としてエクスポートします。 |
| **Terminal + Trigger** | アクティブなセッションを Schedule のコマンドの直接の対象にします。 |

CodingAgent と Terminal が同じ到達可能コンポーネントにあるなら直接接続は不要です。ただし、特定 Agent を
観察だけに制限する `terminal_read_only` は直接 Connection に設定します。

## キーボードを奪わない支援

Terminal は人を優先する共有領域です。CodingAgent は、あなたが入力中の文字にコマンドを重ねてはいけません。
入力が安全でなければ、行を壊さずに待機するか、処理すべき条件を返します。

Agent が開始した作業では、Kavor がコマンドと観察を関連付けます。Agent は結果を待ち、対応する実行を
キャンセルし、見える状態を確認できます。既存セッションでは、現在画面、限定された tail、完全な buffer
から適切な表示を選びます。

画面は「人が今何を見ているか」、tail は最近の logs、完全な buffer は履歴が本当に必要な調査に向きます。
毎回すべての履歴をコンテキストに流す必要はありません。

## Files と Specifications をパスのコピーなしで使う

File または Specification との Connection は環境変数名を受け取ります。値はソースの正規絶対パスであり、
内容ではありません。

```sh
node "$IMPORT_SCRIPT" --input "$SOURCE_FILE"
```

```sh
markdownlint "$SPECIFICATION_FILE"
```

変数は Terminal セッション開始時に適用されます。shell を開いた後に Connection やパラメータが変わると、
新しい設定はセッション再起動後に入ります。`TERM` と `COLORTERM` はエミュレーターが予約しています。

`CHECK_SQL`、`SPECIFICATION_FILE`、`IMPORT_SCRIPT` のように責任を表す名前を使ってください。`FILE` の
ような一般名はグラフが大きくなると意味を失います。

## セッション入力にファイルと画像を貼り付ける

パスを手入力せずにファイルやスクリーンショットを使えます。TerminalやCodingAgentのterminal画面への貼り付けは、
コマンド行にバイナリを入れるのではなく、セッション用に準備したファイル参照を挿入します。

1. OSのファイルマネージャーでファイルをコピーするか、PNG/JPEG画像をクリップボードへコピーします。
2. 開いているTerminalまたはCodingAgentセッションの入力にフォーカスを置きます。
3. コンテキストメニューの`Paste`か、その画面の貼り付けショートカットを使います。
4. 挿入されたパスを確認し、コマンドや依頼を完成させてから送信します。

たとえば、問題のあるフォームのスクリーンショットをCodingAgentの入力へ貼り付けて、次のように依頼します。

> 参照した画像とフォームの実装を比較してください。接続されたWebBrowserで問題を再現し、コードを変える前に
> 観察した差異を説明してください。

Kavorは参照を渡しますが、画像の解釈はproviderの能力に依存します。貼り付けはTerminal内のinline表示ではなく、
harnessが画像を分析した証拠にもなりません。

クリップボードに画像そのものがある場合、Kavorはアプリのローカルプロファイルにコピーを保存し、そのパスを挿入します。
20 MBを超える画像は受け付けません。既存ファイルへの参照ならそのパスを使い、ファイルや画像がなければテキストを
テキストとして貼り付けます。

この操作はCanvasにFileやConnectionを作らず、環境変数も提供しません。グラフに明示して残すリソースには
[File](./file.md)を、Connectionでshellへ渡すパスには前の節の手順を使ってください。
providerへ送る前に機密情報を確認してください。

Terminal、エディター、ページ内のショートカットはその画面のものです。**Nodes**をコピーまたは移動する場合は
Canvasへフォーカスを移し、[グラフの手順](./nodes.md#各nodeを作り直さずにグラフを再利用する)に従ってください。

## 三つの実用的なパターン

### 証拠を伴う実装

Specification、CodingAgent、Terminal を接続します。Agent は関係する検証だけを実行し、必要な output を
残し、結果を output として記録します。あなたは同じ shell を見て介入できます。

### 実行中アプリの診断

アプリを一つの Terminal、テストやクエリを別の Terminal に置きます。到達可能な CodingAgent が必要な画面や
tail を読み、仮説を立て、範囲を限定したコマンドを実行します。Logs は見えるままで、調査はブラックボックスに
なりません。

### 監督されたリモート操作

あなたが Terminal で SSH セッションを開きます。CodingAgent は許可された範囲で状態を解釈し、コマンドを
提案または実行できます。Kavor はリモートサービスにはなりません。認証情報、接続、shell、監督はあなたが
開いたセッションに残ります。

## 実用的なグラフ

```text
Specification — Maintainer — Reviewer
                     │
                  Terminal
                     │
              File: check.sql
```

Maintainer は Specification を契約、File を明示的なソース、Terminal を検証環境として使います。Reviewer
は結果と証拠を評価します。File + Terminal Connection が `CHECK_SQL` を提供するため、手でパスをコピーする
必要はありません。

## より良い開始依頼

> 到達可能なコンテキストだけで障害を診断してください。最初に Terminal の現在画面を読んでください。
> コマンドを一つずつ実行し、何を切り分けるか説明し、Reviewer に必要な output を残してください。私が
> 開始したプロセスを中断せず、破壊的操作や Specification の範囲拡大の前に停止してください。

監視の場合：

> この Terminal の必要な tail だけを追ってください。新しい証拠が出たら知らせ、行が増えないことを成功と
> みなさず、調査専用に開始した watcher を終了後も残さないでください。

## 例：すべてを再起動せずに失敗を調べる

WebアプリがTerminal Appで動いていますが、フォームの送信が完了しません。そのプロセスを開いたままにし、
検証には別のTerminal Checksを使います。CodingAgentを必要なリソースに接続して依頼します：

> Terminal Appの現在の画面を観察し、接続したWebBrowserでエラーを再現してください。操作時刻とlogsを
> 照合し、サーバーを再起動したり私のプロセスを止めたりしないでください。別のコマンドが必要ならTerminal
> Checksを使い、各検証が何を確認し何を除外したか記録してください。

Node.jsプロジェクトなら、Terminal Checksで簡単に環境を確認できます：

```sh
node --version
```

アプリの調査では、scriptsと規約を確認してから実際のプロジェクトのコマンドを選びます。他のstackから
コピーした一般的なコマンドは、その失敗の証拠にはなりません。

期待するのは操作、観察した出力、実証した原因または範囲を限定した仮説の関係です。「requestはサーバーに
届いたが検証エラーが返った」は「サーバーがおかしそう」より役立ちます。許可された修正後に同じ経路を
繰り返して比較します。

### あなたが開始したプロセスを見守る

buildを開始し、関連する出力だけをCodingAgentに追ってもらうこともできます：

> このTerminalのbuildを追ってください。最近の出力を使い、必要なときだけ過去の履歴を確認してください。
> 観察できる結果と結論を支えるメッセージを報告し、実行中にコマンドを送ったりプロセスを終了したり
> しないでください。

依頼は協働を調整します。`terminal_read_only`はKavorの操作を観察に制限できます。あなたがshellを使いながら、
エージェントは見えている状態の解釈を助けます。

## 読み取り専用 Guardrail

`terminal_read_only` は確認を許可したまま、直接 Connection を通じてセッション、プロセス、入力を変える操作を
止めます。証拠を読む必要はあるが修正を実行すべきでない Reviewer に適しています。

Guardrail はそのペアに属します。Terminal 全体をグローバルに読み取り専用にせず、OS の権限も置き換えません。

## 重要な制限

- Terminal output は外部効果が正しく起きたことの自動的な証明ではありません。
- CodingAgent は未完了の人の入力に干渉してはいけません。
- 破壊的コマンドには正確な範囲と適切な許可が必要です。
- Connection の変数にはパスが入り、内容や secret は入りません。
- 変数変更を環境に反映するには Terminal セッションを再起動します。
- Schedule は開いているセッションにだけ届けます。起動時、open のままにする設定で実行中 Trigger の対象になっている
  Terminal は Kavor が復元できますが、application が閉じている間に逃したコマンドは自動回復しません。
- 調査用に開始したプロセスは、人のために残す必要がなければ終了します。
- 複数 Terminals は実際の責任を表すときに役立ち、目的のない複製は運用状態を分散させます。

## コマンドを委任する前に

責任に合う Terminal か、人が入力中ではないか、コマンドが限定され必要なら可逆か、何が証拠かを Agent が
理解しているか、画面・tail・完全履歴のどれが必要か、変数名が理解しやすいか、Reviewer に
`terminal_read_only` が必要か、いつ停止・待機・質問するかが明確かを確認してください。

実行が本物のまま、コンテキストが明示され、監督が失われないとき、Terminal はグラフで価値を持ちます。

[Connections マトリクス](./connections.md)を確認し、
[CodingAgents が Canvas を理解して構築する方法](./coding-agents-and-canvas.md)を学ぶか、
[コマンドと prompts の Schedule](./schedule.md)を設定してください。
