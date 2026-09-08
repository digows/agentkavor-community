---
id: what-is-kavor
title: O que é o Kavor?
description: Entenda o sistema visual local-first do Kavor para coordenar coding agents e contexto de engenharia durável.
kind: guide
lastReviewedAt: 2026-09-08
canonicalUrl: https://agentkavor.com/pt-br/docs/what-is-kavor
---

# O que é o Kavor?

Kavor é um sistema visual local-first para coordenar coding agents e o trabalho de engenharia ao redor deles. Ele
mantém o contexto visível em um Canvas, em vez de enterrá-lo em chats e terminais desconectados.

Coding agents baratearam a implementação. Eles não eliminaram a necessidade de formular o problema, preservar
contexto, revisar evidências, tomar decisões e entender quem pode agir sobre o quê. Kavor dá uma estrutura explícita
a esse trabalho.

## Como o Kavor funciona

Um Workspace começa em um diretório escolhido por você. No Canvas, você adiciona Nodes para os recursos e participantes
do trabalho: Specifications, Files, Sticky Notes, Terminals, WebBrowsers, Triggers e CodingAgents. Connections entre Nodes transportam
contexto ao formar componentes alcançáveis. Um CodingAgent pode trabalhar com qualquer Node de seu componente,
mesmo sem uma Connection direta. Parâmetros e Guardrails continuam ligados a Connections específicas quando o
trabalho exige configuração ou um limite mais forte.

Um CodingAgent pode implementar uma Specification, outro pode revisar o resultado e um terceiro pode preparar a
release. A Specification e as evidências permanecem no Workspace quando qualquer sessão individual termina. Você
pode inspecionar o grafo, intervir e decidir o que será aceito.

[![Canvas do Kavor com CodingAgents, Specifications, Files, Sticky Notes e Terminals conectados](https://media.agentkavor.com/demos/canvas-overview/workspace.8f917eaa5261.jpg)](https://agentkavor.com/pt-br/videos/overview)

[Veja um Workspace real do Kavor em 38 segundos →](https://agentkavor.com/pt-br/videos/overview)

## Vocabulário central

- **Workspace** — o ambiente Kavor enraizado em um diretório escolhido por você.
- **Canvas** — a superfície visual onde o trabalho é organizado.
- **Node** — um item de primeira classe no Canvas, como CodingAgent, Specification, Sticky Note, Terminal, File,
  WebBrowser ou Trigger.
- **Connection** — uma relação explícita e sem direção que integra Nodes a um componente alcançável.
- **CodingAgent** — um provedor de agente atuando como participante do Workspace.
- **Specification** — um contrato Markdown durável para intenção, restrições e critérios de aceite.
- **Guardrail** — uma restrição controlada pelo usuário e aplicada a uma Connection.
- **Sticky Note** — memória de trabalho informal compartilhada para decisões, observações e próximos passos.
- **WebBrowser** — páginas reais do Chromium que humano e CodingAgent podem observar e operar no mesmo estado vivo.
- **Trigger** — uma causa visível de atividade; Schedule é sua fonte disponível para ações no tempo.

## A web também participa do grafo

Um WebBrowser mantém páginas reais no Canvas. Conectado a um CodingAgent, ele permite que humano e agente trabalhem
sobre as mesmas abas, navegação e estado visível, sem reduzir a web a texto copiado para uma conversa. Ao trocar de
Workspace, a página pode continuar ativa e voltar no mesmo estado quando você retorna.

[![WebBrowser do Kavor conectado a um CodingAgent operando a mesma página](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)](https://agentkavor.com/pt-br/videos/web-browser-node)

[Veja o WebBrowser em funcionamento →](https://agentkavor.com/pt-br/videos/web-browser-node)

## O que permanece local

Kavor é local-first. Seu Workspace, repositórios, arquivos, terminais e sessões dos provedores permanecem sob seu
controle, na sua máquina. O grafo expressa autorização dentro do Kavor; ele não é motivo para copiar conteúdo privado
do Workspace para serviços públicos.

## Um primeiro loop útil

Comece pequeno: conecte uma Specification a um CodingAgent e um Terminal. Peça ao CodingAgent que implemente o
contrato, inspecione as evidências e preserve a decisão no Workspace. Adicione revisores e loops mais ricos somente
quando o trabalho se beneficiar deles.

[Siga o tutorial completo do primeiro loop](./first-loop.md) para adicionar implementação, revisão, evidências
compartilhadas e uma decisão humana.

Quando você quiser que o próprio CodingAgent ajude a montar a estrutura, veja
[como CodingAgents enxergam e constroem o Canvas](./coding-agents-and-canvas.md). Para iniciar trabalho no tempo,
aprenda a usar [Schedule](./schedule.md).

## Um aplicativo, vários Workspaces

Você pode abrir Workspaces diferentes em janelas independentes e distribuí-los entre monitores. Cada janela mantém
seu próprio Canvas e suas próprias sessões, enquanto o aplicativo continua sendo uma única instância.

![Múltiplos Workspaces do Kavor abertos em janelas diferentes](https://media.agentkavor.com/releases/1.3.0/multiple-workspaces/overview.baa20506a993.jpg)

[Baixe o Kavor](https://download.agentkavor.com/pt-br) ou leia as [notas de versão](./release-notes/index.md).
