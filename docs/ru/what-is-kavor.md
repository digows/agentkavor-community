---
id: what-is-kavor
title: Что такое Kavor?
description: Познакомьтесь с локальной визуальной системой Kavor для координации coding agents и долговечного инженерного контекста.
kind: guide
lastReviewedAt: 2026-09-08
canonicalUrl: https://agentkavor.com/ru/docs/what-is-kavor
---

# Что такое Kavor?

Kavor — локальная визуальная система для координации coding agents и окружающей их инженерной работы. Она сохраняет
контекст видимым на Canvas, а не прячет его в несвязанных чатах и терминалах.

Coding agents удешевили реализацию. Но по-прежнему необходимо формулировать задачу, сохранять контекст, проверять
доказательства, принимать решения и понимать, кто и над чем может действовать. Kavor придаёт этой работе явную структуру.

## Как работает Kavor

Workspace начинается с выбранного вами каталога. На Canvas добавляются Nodes для ресурсов и участников работы:
Specifications, Files, Sticky Notes, Terminals, WebBrowsers, Triggers и CodingAgents. Connections формируют
достижимые компоненты. CodingAgent может работать с любым Node в своей компоненте без прямой Connection. Параметры
и Guardrails остаются привязаны к конкретным Connections, когда нужна настройка или более строгая граница.

Один CodingAgent может реализовать Specification, другой — проверить результат, а третий — подготовить выпуск.
Specification и доказательства остаются в Workspace после завершения любой отдельной сессии агента. Вы можете
проверить граф, вмешаться и решить, что будет принято.

[![Canvas Kavor с подключёнными CodingAgents, Specifications, Files, Sticky Notes и Terminals](https://media.agentkavor.com/demos/canvas-overview/workspace.8f917eaa5261.jpg)](https://agentkavor.com/ru/videos/overview)

[Посмотрите реальный Workspace Kavor за 38 секунд →](https://agentkavor.com/ru/videos/overview)

## Основные термины

- **Workspace** — среда Kavor с корнем в выбранном вами каталоге.
- **Canvas** — визуальная поверхность, на которой организована работа.
- **Node** — первоклассный элемент Canvas, например CodingAgent, Specification, Sticky Note, Terminal, File,
  WebBrowser или Trigger.
- **Connection** — явная ненаправленная связь, объединяющая Nodes в достижимую компоненту.
- **CodingAgent** — провайдер агента, работающий как участник Workspace.
- **Specification** — долговечный контракт Markdown для намерения, ограничений и критериев приёмки.
- **Guardrail** — принадлежащее пользователю ограничение, применяемое к Connection.
- **Sticky Note** — общая неформальная рабочая память для решений, наблюдений и следующих шагов.
- **WebBrowser** — настоящие страницы Chromium, которые человек и CodingAgent могут наблюдать и использовать в одном живом состоянии.
- **Trigger** — видимая причина активности; Schedule — доступный источник действий по времени.

## Веб тоже участвует в графе

WebBrowser сохраняет настоящие страницы на Canvas. При соединении с CodingAgent человек и агент работают с одними
и теми же вкладками, навигацией и видимым состоянием, не сводя веб к тексту, вставленному в разговор. При переключении
Workspace страница может оставаться активной и вернуться в том же состоянии.

[![WebBrowser Kavor соединён с CodingAgent, работающим с той же страницей](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)](https://agentkavor.com/ru/videos/web-browser-node)

[Посмотрите WebBrowser в работе →](https://agentkavor.com/ru/videos/web-browser-node)

## Что остаётся локальным

Kavor следует принципу local-first. Ваш Workspace, репозитории, файлы, терминалы и сессии провайдеров остаются под
вашим контролем на вашем компьютере. Connection выражает полномочия внутри Kavor; она не является поводом копировать
приватное содержимое Workspace в публичные сервисы.

## Первый полезный цикл

Начните с малого: соедините одну Specification с одним CodingAgent и одним Terminal. Попросите CodingAgent реализовать
контракт, проверьте доказательства и сохраните решение в Workspace. Добавляйте проверяющих и более сложные циклы только
тогда, когда они действительно нужны работе.

[Пройдите полное руководство по первому циклу](./first-loop.md), чтобы добавить реализацию, проверку, общие
доказательства и решение человека.

Если вы хотите, чтобы CodingAgent помог построить структуру, узнайте, [как CodingAgents видят и строят Canvas](./coding-agents-and-canvas.md).
Чтобы запускать работу по времени, изучите [Schedule](./schedule.md).

## Одно приложение, несколько Workspaces

Разные Workspaces можно открыть в независимых окнах и распределить по мониторам. Каждое окно сохраняет собственный
Canvas и сессии, а приложение продолжает использовать один общий runtime.

![Несколько Workspaces Kavor открыты в разных окнах](https://media.agentkavor.com/releases/1.3.0/multiple-workspaces/overview.baa20506a993.jpg)

[Скачать Kavor](https://download.agentkavor.com/ru) или прочитать [примечания к выпускам](./release-notes/index.md).
