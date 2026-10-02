---
id: web-browser
title: "WebBrowser：agentの前で開発してテストする"
description: Kavorの共有WebBrowserでWebアプリを開発し、bugを再現し、ページをdebugし、E2Eフローを証明します。
kind: guide
lastReviewedAt: 2026-10-01
canonicalUrl: https://agentkavor.com/ja/docs/web-browser
---

# WebBrowserは人とagentの前にアプリを置きます

WebBrowserはCanvas内のライブChromium surfaceです。接続されたCodingAgentは、人が見ている同じページを観察、
操作、待機、debug、testできます。

このガイドを読みながら、別タブで[KavorのWebBrowserデモ](https://agentkavor.com/ja/videos/web-browser-node)を
確認できます。

![人と同じページを共有するWebBrowserに接続したCodingAgent](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)

## 開発ツールとしてのbrowser

Webアプリ開発では、CodingAgentはファイル編集だけでなく、アプリを開き、操作し、実際の状態を待ち、browserで
起きたことを調査する必要があります。

CodingAgent + WebBrowser Connectionにより、Kavorが仲介する幅広い操作を利用できます。

- **観察：** ページ状態、accessibility snapshot、screenshot
- **操作：** click、field入力、text挿入、key press、選択、check、scroll、drag、file upload、dialog応答
- **同期：** selector、text、URL、load state、network idle、指定条件の待機
- **debug：** console message、network request、保持されたresponse body
- **test：** bug再現、E2E flow、視覚的な証拠の保存
- **scenario分離：** 管理されたtest中のnetwork responseのblock、continue、fulfill
- **ページ管理：** tabのopen、select、close、download追跡、authentication challenge

目的はbrowserを自動化の裏に隠すことではなく、agentが作業する状態と操作を検証可能にすることです。

## Webアプリの実用的なループ

WebBrowserとCodingAgentを同じcomponentに置きます。アプリがローカルで動くなら、serverを起動するTerminalも
接続します。

agentには、操作前の観察、失敗する経路の再現、console・network・screenshotの証拠収集、定義されたスコープ内の
コード変更、新しい状態を待った再検証を依頼します。結果と残るリスクは[Sticky Note](./sticky-note.md)に記録します。

開始promptの例です。

> 接続されたアプリをWebBrowserで開いてください。最初にコードを変更せずページを観察してフローを再現し、原因候補と最小変更を説明してから、視覚情報とconsoleの証拠で全経路を検証してください。

## 証拠に基づいて開発する三つの例

### フォームのbugを再現する

Terminalでサーバーを動かし、WebBrowserでアプリを開いて依頼します：

> 不正なメールアドレスと有効なアドレスで送信を再現してください。コードを編集する前に、欄の状態、
> 表示されたメッセージ、requestの有無を記録してください。許可された修正後に両経路を繰り返し、ページを
> 再読み込みせずアドレスを直す経路も検証してください。

期待するのは表示された動作と観察したrequestsです。メッセージのscreenshotだけでは送信が止まったと
証明できません。networkで基準を確認します。

### ページが空になった理由を調べる

> ページを観察し、consoleのエラーと欠けた内容に関連するrequestを確認してください。networkの失敗、
> 想定外の応答、renderingのエラーを区別し、関連URL、status、利用できる証拠を記録してください。
> 応答本文を観察できない場合は、その制限を示してください。

コードを変更する前に原因を区別できる手掛かりを得ることが期待する結果です。内容がないだけではbackendの
故障と断定できません。

### networkの失敗から回復できるか検証する

あなたが管理するテストアプリで一時的なシナリオを依頼します：

> Specificationで定義した読み込みrequestだけにエラー応答をシミュレートしてください。失敗メッセージと
> 再試行を確認し、その後一時ルールを削除して通常の経路が回復することを確認してください。結果を残し、
> networkルールを解除してテストを終えてください。

隔離したシナリオで失敗と回復を確認します。テスト用のendpointsとデータを使い、関係ないrequestsを変更しない
十分に具体的なシミュレーションにしてください。

## 人も使う同じbrowser

WebBrowserはWorkspace内の通常ページとしても使えます。documentを開き、videoを見て、agentsが働く間に参考ページ
を残せます。

YouTubeなど一般的なページは自然な用途です。Netflixなどのstreaming serviceはauthentication、DRM、permission、
system条件を必要とする場合があるため、Kavorは特定serviceでの再生を保証しません。

## 見えないbrowserではなく共有surface

agentと人は同じライブページを共有します。人は操作を見て介入できます。agentに隠れたprivate windowはありません。
永続tabはKavor専用browser profileに属し、WebBrowsers間で共有されます。外部Chromeのextension、history、cookieは
自動的に再利用されません。

ページ内容は信頼できないdataです。WebBrowserはremote browser serviceでも、machine filesystemへの一般権限でも
ありません。

## 制限と注意

CAPTCHA、passkey、site permission、certificate、authentication promptは人の対応が必要な場合があります。
snapshot referenceはnavigationやDOM変更後に期限切れになるため、再取得します。network ruleは一時的で、test後に
消去します。開発profileはself-signed、expired、private authority certificateを受け入れるため、悪意あるnetworkに
対する保護が弱くなります。機密serviceへloginする前に注意してください。

snapshotはcross-origin frameを省略することがあり、consoleとnetwork historyには上限があります。agentは観察した
証拠を報告し、確認できなかった内容を作りません。

同じwindowでWorkspaceを切り替えても、Kavorは表示中のページを維持します。別のWorkspaceが見えている間も接続
CodingAgentはその状態を操作できます。tabを閉じる、Nodeを削除する、sessionを終了すると継続性は終わります。

## ConnectionとGuardrail

直接のCodingAgent + WebBrowser pairはbrowserをagentの到達可能componentに置きます。有効な経路でSpecification、
Files、Terminal、Sticky Note、他のCodingAgentsも同じグラフに参加できます。視覚的な近さやmessageの言及はaccessを
作りません。

WebBrowser専用Guardrailは現在ありません。同じグラフの別resourceの制限は維持されます。read-only Fileはread-only、
Terminalは自身のcontrolを保ち、Specificationはlifecycleに従います。

## 次に読む

- CodingAgent + WebBrowser contractの[Connections matrix](./connections.md)
- [CodingAgentsがCanvasを見て構築する方法](./coding-agents-and-canvas.md)
- browser、code、evidenceを[最初のループ](./first-loop.md)で組み合わせる
- test前に[Specification](./specification.md)で期待動作を定義する
