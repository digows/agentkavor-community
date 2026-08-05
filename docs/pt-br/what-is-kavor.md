---
id: what-is-kavor
title: O que é o Kavor?
description: Entenda o sistema visual local-first do Kavor para coordenar coding agents e contexto de engenharia durável.
kind: guide
lastReviewedAt: 2026-08-05
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
do trabalho: Specifications, Files, Sticky Notes, Terminals e CodingAgents. Connections entre Nodes transportam
contexto e concedem capacidades visíveis. Guardrails restringem essas capacidades quando o trabalho exige um limite
mais forte.

Um CodingAgent pode implementar uma Specification, outro pode revisar o resultado e um terceiro pode preparar a
release. A Specification e as evidências permanecem no Workspace quando qualquer sessão individual termina. Você
pode inspecionar o grafo, intervir e decidir o que será aceito.

[![Canvas do Kavor com CodingAgents, Specifications, Files, Sticky Notes e Terminals conectados](https://agentkavor.com/kavor-working-demo-poster.jpg)](https://agentkavor.com/pt-br/videos/overview)

[Veja um Workspace real do Kavor em 38 segundos →](https://agentkavor.com/pt-br/videos/overview)

## Vocabulário central

- **Workspace** — o ambiente Kavor enraizado em um diretório escolhido por você.
- **Canvas** — a superfície visual onde o trabalho é organizado.
- **Node** — um item de primeira classe no Canvas, como CodingAgent, Specification, File, Terminal ou Sticky Note.
- **Connection** — uma relação explícita que compartilha contexto ou concede uma capacidade entre Nodes.
- **CodingAgent** — um provedor de agente atuando como participante do Workspace.
- **Specification** — um contrato Markdown durável para intenção, restrições e critérios de aceite.
- **Guardrail** — uma restrição controlada pelo usuário e aplicada a uma Connection.
- **Sticky Note** — memória de trabalho informal compartilhada para decisões, observações e próximos passos.

## O que permanece local

Kavor é local-first. Seu Workspace, repositórios, arquivos, terminais e sessões dos provedores permanecem sob seu
controle, na sua máquina. Uma Connection expressa autorização dentro do Kavor; ela não é motivo para copiar conteúdo
privado do Workspace para serviços públicos.

## Um primeiro loop útil

Comece pequeno: conecte uma Specification a um CodingAgent e um Terminal. Peça ao CodingAgent que implemente o
contrato, inspecione as evidências e preserve a decisão no Workspace. Adicione revisores e loops mais ricos somente
quando o trabalho se beneficiar deles.

[Siga o tutorial completo do primeiro loop](./first-loop.md) para adicionar implementação, revisão, evidências
compartilhadas e uma decisão humana.

[Baixe o Kavor](https://download.agentkavor.com/pt-br) ou leia as [notas de versão](./release-notes/index.md).
