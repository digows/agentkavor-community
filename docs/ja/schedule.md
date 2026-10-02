---
id: schedule
title: "Kavor の Schedule：グラフに時計を与える"
description: 権限を広げず、プレビュー、Pause、Run now、永続履歴を使って繰り返しのプロンプトやコマンドを予約します。
kind: guide
lastReviewedAt: 2026-10-01
canonicalUrl: https://agentkavor.com/ja/docs/schedule
---

# Kavor の Schedule：グラフに時計を与える

Schedule は、活動の原因を見える形にします。いつ何を起こすかを決め、ターゲットを 1 つ接続し、各試行を Canvas 上で
確認できます。

Kavor のドメインでは、Schedule が現在利用できる Trigger の source です。Schedule 自身は作業を実行せず、行動すべきかも
判断しません。責務は **いつ発火するか** と **どの payload を届けるか** の 2 つだけです。

payload の意味はターゲットが決めます。

- **CodingAgent** に接続した場合は prompt。
- **Terminal** に接続した場合は shell command。

それ以外はターゲット側の責務です。Workspace、directory、provider または shell、Git mode、permissions、Guardrails、
graph context は変わりません。

![レビュー用 prompt を受け取った CodingAgent に完了済み Schedule が接続され、Sticky Note で loop の意図を共有している状態](https://media.agentkavor.com/releases/1.3.0/schedule-trigger/overview.e6db5dc413e3.jpg)

*Schedule が活動を始め、CodingAgent は到達可能な context を使って実行し、結果を説明します。*

## Schedule が役立つ 3 つの用途

### context とともに Maintainer を起こす

Schedule は毎日 CodingAgent に prompt を届けます。その agent は、保守契約を持つ Specification、検証用 Terminal、入力用
File、報告用 Sticky Note、独立評価用 Reviewer に到達できます。

Schedule は原因を作り、graph は意図、道具、記憶、協働を提供します。

### 見える運用コマンドを実行する

Terminal に直接接続した Schedule は、検証、script、保守 command を届けられます。File も environment variable 付きで
Terminal に接続されていれば、window 間で値をコピーせず canonical path を使えます。

```sh
sqlite3 app.db < "$CHECK_SQL"
```

process は実際の Terminal で動き続けます。Schedule history は Kavor が観測できた delivery を記録し、shell の表示から成功を
推測しません。

### 小さな半自律システムを作る

```text
Schedule — Maintainer — Specification
                      ├─ Terminal
                      ├─ File
                      ├─ Sticky Note
                      └─ Reviewer
```

線は永続的な向きを持たない Connections です。Schedule の直接ターゲットは `Maintainer` 1 つです。CodingAgent は到達可能な
component の残りを使い、prompt を実行して人の判断に必要な証拠を残します。

## 先に設定し、あとで時計を動かす

新しい Schedule は、未来の 1 回実行として **Paused** で始まります。payload を書き、recurrence を選び、ターゲットを接続し、
preview を確認してから活動を許可できます。

安全な順序：

1. Canvas に Schedule を追加する。
2. 具体的で検証可能な payload を書く。
3. 1 回実行または recurrence を選ぶ。
4. `Next occurrences` と表示 zone を確認する。
5. CodingAgent または Terminal を 1 つ直接接続する。
6. 構造が準備できてから `Resume` を使う。

設定中の Trigger はターゲットなしでも存在できます。ただし Running の Schedule に target Connection がなければ、その時刻は
`Blocked` として記録されます。ターゲットなしの `Run now` は試行作成前に拒否されます。

## 終了できる payload を書く

良い CodingAgent prompt は、目的、graph resources、期待する証拠、停止条件を示します。

> 最近の CI failure を分析してください。Checks Terminal で必要な検証だけを実行し、証拠付きの要約を Daily report Sticky Note
> に記録し、Reviewer に独立評価を依頼してください。原因候補を記録する前に code を変更せず、修正が Specification の scope
> 拡大を必要とする場合は停止してください。

良い Terminal command は明示的、非対話的で、観測可能な結果を残します。

```sh
pnpm test -- --runInBand
```

payload は Connections の代わりにはなりません。Sticky Note、File、Specification の名前を書くだけではアクセスは付与されず、
その Node が CodingAgent の到達可能 component に属している必要があります。

## 完全な例：毎日の検証とレポート

失敗を早く見つけ、プロジェクトを開くと有用な要約があるようにしたいとします。ScheduleをMaintainerに
接続し、グラフには作業範囲を定めるSpecification、Terminal Checks、Sticky Note Daily reportを置きます。
別の評価が本当に必要ならReviewerを追加します。

Specificationに検証内容と失敗時の対応を定義します。診断とレポートから始め、原因と範囲が明確になってから
修正を別途許可します。

payloadの例：

> Specificationで許可された検証をTerminal Checksで実行してください。プロジェクトのscriptsを読み、
> 適切なコマンドを選んでください。Sticky Note Daily reportに時刻、コマンド、結果、未解決事項を記録し、
> コードの変更や公開はしないでください。検証できない場合は理由を残し、具体的な次の行動を書いて止まってください。

`Daily`を設定し、マシンが起きている時刻を選び、`Next occurrences`を確認します。`Resume`の前に
Scheduleを停止したまま`Run now`を使い、次を確認します：

1. 正しいMaintainerにpromptが届いた。
2. 想定したTerminalで検証が実行された。
3. メモで成功、失敗、未実行を区別している。
4. 履歴に試行の観察結果が表示されている。

説明用のレポート：

```markdown
## 毎日の検証
- テスト：成功。Terminal Checksにコマンドと要約を記録した。
- Build：失敗。指定ファイルでimportエラーを確認した。
- 次の行動：修正を許可する前にimportをレビューする。
- コード変更：なし。
```

テスト後に`Resume`を使います。次の時刻にマシンが停止していたら`Missed`を確認し、手動実行する時期を
決めます。過去の実行が自動的に取り戻されるとは考えないでください。処理が間隔より長いなら、無制限の
キューを期待せず繰り返し設定を見直します。

## calendar を隠さない recurrence

editor には `Once`、`Hourly`、`Daily`、`Weekdays`、`Weekly`、`Monthly` と、高度な cron 用の `Custom` があります。
preset と advanced editor は同じ expression を変更するため、ずれる 2 つの schedule は存在しません。最小 interval は 1 分です。
「この日から 2 週間ごと」のように cron で正確に表せない recurrence を、誤解を招く expression で近似しないでください。

Kavor は明示的な IANA zone を保存し、Canvas を表示する machine の local zone で次回時刻を表示します。zone は UI では編集できず、
保存時に host から設定されます。`Resume` の前に必ず preview を確認してください。

daylight-saving の重複時刻は 1 回だけ発火します。時計が進むときの存在しない時刻は、最初の有効な local instant に移動します。
monthly preset では存在しない日を skip するため、31 日は 2 月に実行されません。

## Pause、Resume、Run now は別の操作

- **Pause** は新しい occurrence を直ちに止めます。pause 中は attempt も `Missed` も作りません。
- **Resume** は未来の occurrence だけを対象にし、有効な payload が必要です。1 回実行も未来でなければなりません。
- **Run now** は独立した手動 attempt を作り、Paused 中でも動作し、次回 recurrence をずらしません。

`Run now` は時計を動かす前の payload とターゲット検証に使います。自動 retry ではなく、Paused / Running 状態も変えません。
`Once` は時刻を消費すると Paused に戻り、history と `Run now` は残ります。

## 時刻が来たとき

Kavor は occurrence の永続 attempt を保存し、ターゲットが受理済みの message と delivery を調停します。観測結果の前に
`Pending` と `Delivering` を通る場合があります。

- **Completed** — 完了を観測した。
- **Needs attention** — CodingAgent が介入を求め、後で完了する可能性がある。
- **Fired** — delivery したが、その経路では完了を観測できない。
- **Failed** — 観測可能な failure が発生した。
- **Interrupted** — delivery 開始後、信頼できる結果なしに中断した。
- **Blocked** — delivery 時にターゲットまたは Workspace が利用できなかった。
- **Missed** — runtime がその時刻を claim できなかった。
- **Coalesced** — ターゲットの 1 つだけの pending slot を別 attempt が使用中だった。

予定時刻は実行証拠ではありません。Node の最新表示と history で nominal time、delivery、result、diagnostic を確認してください。

## machine が sleep 中、または Kavor が閉じている場合

Schedule は local runtime に依存します。Kavor が起動し、machine が awake、user が authenticated、target session が open である
必要があります。

application startup では、open のままにする設定で、実行中の Triggers の target になっている sessions を Kavor が復元します。
対象は visible な Workspace だけでなく、user の他の Workspaces も含みます。paused Triggers は復元を行わず、意図的に閉じた session は
閉じたままです。

停止中に複数 occurrence が過ぎても、その Schedule の直近の missed occurrence だけを記録します。長時間後に大量の行を作らず、
復帰時に古い作業を突然実行しません。UI は `Missed` と、`Run now` 相当の明示操作を表示します。

自動 catch-up や external effect の retry はありません。

## ターゲットがすでに busy の場合

ターゲットの作業中、Schedule は pending attempt を最大 1 つ保持します。その slot が埋まった状態で来た occurrence は
`Coalesced` と記録され、後から delivery されません。

task が recurrence より長い可能性があるなら interval を広げるか、ターゲットが current state を idempotent に reconcile するよう
設計してください。

## 前提にすべき制限

- Schedule の直接ターゲットは最大 1 つで、CodingAgent または Terminal。
- 意図的に閉じた session は開始しない。
- startup で復元するのは open のままにする設定の target だけで、実行中の Triggers に限る。
- ターゲットの graph、permissions、Guardrails を広げない。
- acceptance criteria の代わりにならず、結果の正しさを判断しない。
- 記録された attempt ごとの自動 delivery は最大 1 回。
- external effect の exactly-once を保証しない。
- `Missed` や `Coalesced` をすべて後で実行する queue にしない。

fan-out、段階的承認、compensation、transactional orchestration が必要なら Schedule の中に隠さず、graph に責務を表現し、人の判断を
明示してください。

## Resume 前の checklist

- payload に目的、証拠、停止条件があるか。
- `Next occurrences` は期待時刻か。
- 表示 zone は正しいか。
- target Connection は正確に 1 つか。
- その時刻に target session が open のままになる設定か。
- graph は必要な context と capability だけを含むか。
- external effect 済みでも繰り返しは安全か。
- result と history の確認場所が分かるか。

## 次に読む

- [Connections matrix](./connections.md) でターゲットの契約を確認する。
- [CodingAgents が Canvas を見て構築する仕組み](./coding-agents-and-canvas.md)を理解する。
- [CodingAgents と role](./agents-and-roles.md)で保守、review、判断を分ける。
