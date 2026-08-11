---
id: coding-agents-and-canvas
title: CodingAgents が Canvas を見て構築する仕組み
description: 到達可能な context、agent 間 message、人が制御する境界内での Canvas の atomic editing を理解します。
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/ja/docs/coding-agents-and-canvas
---

# CodingAgents が Canvas を見て構築する仕組み

Canvas は人だけの図ではありません。CodingAgent にとっては live context、capability map、そして許可された場合は agent 自身が
整理できる作業面です。

次の 2 つは異なる capability です。

1. Nodes、resources、他の CodingAgents と働くために **到達可能 graph を理解する**。
2. 即時かつ atomic な変更で **Canvas structure を編集する**。

Node の位置が見えても内容を読めるとは限らず、resource と働けても Workspace の何でも削除できるわけではありません。

## graph が共有 context になる

新しい interaction ごとに Kavor は、CodingAgent の到達可能 component の現在状態を渡します。Nodes、Connections、Guardrails と、
作業理解に必要な facts が含まれます。

agent は、有効な Connections path でつながる Node を距離に関係なく操作できます。

```text
Specification — Builder — Reviewer — Sticky Note
```

Builder は Reviewer 経由で Sticky Note に、Reviewer は Builder 経由で Specification に到達します。すべての resource を両 agent に
直接接続しなくても、2 つの CodingAgents は message を交換できます。

これにより Canvas の線を減らせます。topology は明示的で、Connection の削除は component を分割し、次の interaction の reachability
を変える可能性があります。

## inline で届くものと on-demand のもの

Kavor は Workspace 全体の恒久 dump ではなく、有用な context を優先します。

- 小さな text は graph state と一緒に届く場合がある。
- Specifications は lifecycle、path、最近の outputs を示し、canonical Markdown は Workspace に残る。
- Terminals は state と foreground command を示し、output は必要時に読む。
- Files は canonical source を示し、内容は filesystem に残る。
- CodingAgents は state と作業 facts を示し、以前の messages は必要時に読む。

大きい、または live な内容を context window に継続コピーしません。明確な reference により reasoning space と本物の source を保ちます。

## message も graph に従う

到達可能な CodingAgent は component 内の別 CodingAgent に message を送れます。直接 Connection は不要です。message は durable で
`Messages` panel から確認できます。implementation の review handoff、Specification 作者への質問、独立調査の分割、findings の返却に
使えます。

durable decision を message だけに残さないでください。contract は Specification、working memory は Sticky Note、result は適切な
outputs に保存します。

## Guardrails は直接 pair に残る

Reachability は access rule、Guardrail は restriction rule です。CodingAgent と Specification の直接 Connection に
`specification_read_only` があれば、別 route があってもその pair への制限は有効です。別 CodingAgent の制限が resource 全体の global
policy になるわけではありません。

visual proximity、labels、message reference は access を付与しません。実際の Connections path が必要です。

## agent は layout も見るが authority は小さい

Workspace の整理を支援するため、CodingAgent は Canvas 上すべての Nodes の labels、kinds、geometry を参照できます。この layout view
には、自分の graph 外の configuration、content、Connections は含まれません。

そのため component 外の Node を整列・移動しても内容への access は得ません。layout は Workspace-wide、context と structural change は
そうではありません。

## Allow workspace editing

各 CodingAgent の advanced settings に `Allow workspace editing` があります。agent が始める structural change を制御し、session restart
なしですぐ有効になります。

有効な場合、scope 内で次が可能です。

- CodingAgent、Specification、Sticky Note、Terminal、File、Schedule を含む active Nodes の作成。
- canonical Specification の作成と Canvas への materialization。
- supported Connections の追加、Terminal Connection parameter の変更。
- Connections の削除。
- 到達可能 Nodes と Specifications の rename。
- 到達可能 Schedule の設定。
- Nodes の move、resize、reveal。

無効なら structural change は拒否され、agent は設定が off と伝えて停止すべきです。Node の移動は authority や content を変えないため、
layout は利用できます。

## structure は graph に従い、Workspace 全体には従わない

CodingAgent が structural に変更できるのは、到達可能 component の Nodes と Connections、および同じ atomic change 内で先に作った Nodes
です。Node の作成と接続を同時に行い、Canvas に debris を残さず、isolated agent も新 resource と自分を同じ batch で接続できます。

graph 外の既存 Node への最初の link は人が作ります。Workspace layout visibility を使って、到達可能にしていない resource に agent 自身を
接続することはできません。

## change は atomic

Kavor は complete set を検証し、順番に 1 unit として適用します。1 step が失敗すれば、その batch の以前の structural changes も残りません。

Terminal 作成と agent 接続は両方成功するか、両方とも起こりません。invalid Connection で orphan Node を残しません。返された result は実際に
persist された形なので、defaults、geometry、canonical paths が request と同じだと仮定せず読み取ります。

## 人に残るもの

`Allow workspace editing` は unrestricted control ではありません。CodingAgent は次を行えません。

- Nodes の削除。
- Guardrails の作成、削除、緩和。
- 他 Node kinds の任意 reconfiguration。
- incoming messages を人の approval に保留する control の変更。
- reference や Canvas position による自己 graph の拡大。

agent は到達可能 Connection を削除できるため、context を失う、または別 CodingAgent を interrupt する可能性がある場合は request を明確にします。
Kavor は、人が依頼した場合または既に委任された作業に必要な場合だけ peers の Connections に触れるよう指示します。

## Docs MCP が agent に Kavor を教える

Kavor の CodingAgents は local Docs MCP から公式 documentation を参照できます。Node 名、supported combinations、Schedule の詳細を暗記せずに
help を求められます。

documentation は案内であり authority ではありません。Docs MCP は Connections を作らず、Guardrails を無効にせず、suggestion を Canvas
change に変えません。

## agent と働く 3 つの prompt

### 変更前に説明する

> Kavor の公式 documentation と現在の graph を参照し、この task を解決する最小 structure、到達可能になる Nodes、残る limits を説明して
> ください。まだ Canvas を変更しないでください。

### review できる loop を作る

> Specification、Builder、Reviewer、Sticky Note を使った小さい loop を作ってください。必要最小限の Connections を使い、新 Nodes の作成と
> 接続を 1 atomic change で行い、implementation 前に停止して Canvas を確認させてください。

### access を広げず整理する

> intention、implementation、review、evidence が読みやすいよう Canvas を整理してください。Connections を作成・削除せず、Guardrails を変更せず、
> graph 外の Nodes への access を仮定しないでください。

## edit を許可する前の checklist

- agent は期待する structural result を説明したか。
- 新しい各 Node に具体的役割があるか。
- 作成 Node は同 batch で接続されるか、人だけが読む意図か。
- change は到達可能 component 内か。
- Connection 削除が graph 分割や別 agent の interrupt を起こさないか。
- resource を渡す前に直接 Guardrail が必要か。
- review のために agent が停止する地点は明確か。

CodingAgent を Canvas の invisible owner ではなく collaborator として使ってください。受け取った structure、変わった structure、人が保った limits を
確認できることが価値です。

## 次に読む

- 最小 topology で[最初の loop を閉じる](./first-loop.md)。
- graph を広げる前に [Connections matrix](./connections.md) を確認する。
- [CodingAgents と role の選び方](./agents-and-roles.md)を学ぶ。
- permissions を広げず [Schedule](./schedule.md) を設定する。
