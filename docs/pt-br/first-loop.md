---
id: first-loop
title: Como fechar seu primeiro loop no Kavor
description: Monte um loop pequeno com uma Specification, Claude Code, Codex e uma Sticky Note, da intenção à decisão humana.
kind: tutorial
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/pt-br/docs/first-loop
---

# Como fechar seu primeiro loop no Kavor

O melhor primeiro Canvas não é o mais completo. É o menor que transforma uma intenção clara em uma mudança que você
consegue revisar.

Neste tutorial, Claude Code implementa uma Specification, Codex revisa o resultado, ambos preservam evidências em uma
Sticky Note e você decide quando o trabalho terminou.

[![Specification, Claude Code, Codex e Sticky Note conectados no Canvas](https://media.agentkavor.com/demos/first-loop/canvas.24845dea72ff.jpg)](https://agentkavor.com/pt-br/videos/small-loop)

[Veja o loop completo em 1 minuto e 29 segundos →](https://agentkavor.com/pt-br/videos/small-loop)

## Antes de começar

Você precisa de:

- Kavor com um Workspace aberto;
- Claude Code e Codex instalados e autenticados;
- uma tarefa pequena, com resultado observável, no diretório do Workspace.

Uma boa primeira tarefa cabe em uma frase e tem dois ou três critérios objetivos. Por exemplo: “Adicionar validação ao
formulário e manter os testes existentes passando”. Evite começar por uma refatoração ampla.

## O loop que você vai montar

A sequência de trabalho será:

`Specification → Claude Code → mensagem → Codex → decisão humana`

Os quatro Nodes formarão um único componente alcançável. Uma topologia mínima conecta a Specification ao Claude
Code, o Claude Code ao Codex e o Codex à Sticky Note. Os dois CodingAgents conseguem trabalhar com todos os recursos
alcançáveis e conversar entre si, mesmo quando um recurso não está diretamente ao lado dos dois.

Connections não são setas de fluxo. Elas são relações entre Nodes; a ordem acima descreve o trabalho deste tutorial.

## Prefere montar com ajuda?

Seu CodingAgent favorito também pode consultar a documentação oficial do Kavor, sem configuração adicional, para
explicar o Canvas, responder dúvidas e ajudar a montar o loop. Quando as Connections e permissões atuais autorizarem,
ele também pode criar os Nodes e Connections com você.

Você pode começar com este pedido:

> Consulte a documentação oficial do Kavor e me ajude a montar um primeiro loop para esta tarefa. Primeiro, explique
> a menor estrutura e as Connections necessárias. Depois, se o grafo atual e a opção Allow workspace editing
> autorizarem, crie a Specification, os CodingAgents e a Sticky Note em uma única alteração atômica, conecte-os e
> pare antes de iniciar a implementação para eu revisar o loop.

A documentação não amplia o acesso do CodingAgent, não cria Connections implícitas e não permite contornar
Guardrails. Se o serviço de documentação estiver indisponível, as demais ferramentas locais do Kavor continuam
funcionando.

## 1. Crie uma Specification pequena

1. Clique com o botão direito em uma área vazia do Canvas e escolha `Add Spec…`.
2. Dê um nome direto, como `Corrigir validação do formulário`, e confirme.
3. Edite a Specification para registrar:
   - o problema atual;
   - o resultado esperado;
   - o que está fora do escopo;
   - dois ou três critérios de aceite verificáveis.
4. Altere o status de `Draft` para `Ready` quando o contrato estiver pronto para implementação.

A Specification é Markdown durável. Ela continua no Workspace quando uma sessão termina e permite que implementação,
revisão e decisão humana partam do mesmo contrato.

## 2. Adicione os participantes e a memória compartilhada

Clique com o botão direito no Canvas e adicione:

- `Add Claude Code`;
- `Add Codex`;
- `Add Sticky Note`.

Renomeie os CodingAgents se isso ajudar a deixar os papéis claros, por exemplo `Implementer` e `Reviewer`. Na Sticky
Note, use um título simples, como `Implementation and review notes`.

Crie estas três Connections:

1. Specification — Claude Code;
2. Claude Code — Codex;
3. Codex — Sticky Note.

Arraste o ponto circular de um Node até o ponto circular do outro. Na primeira Connection de cada tipo, leia a
confirmação do Kavor antes de continuar. Não adicione Guardrails neste primeiro loop; use-os depois, quando houver uma
restrição concreta a aplicar.

Essas três Connections já deixam os quatro Nodes no mesmo grafo alcançável. Connections diretas adicionais continuam
válidas quando tornam a intenção visual mais clara ou quando precisam carregar um Guardrail específico. Elas não são
obrigatórias apenas para repetir acesso que o grafo já oferece.

## 3. Peça uma entrega verificável

No Claude Code, envie:

> Leia a Specification conectada e implemente somente esse escopo. Antes de alterar o código, confirme os critérios
> de aceite. Ao terminar, execute as verificações relevantes, registre os outputs duráveis na Specification e
> acrescente à Sticky Note um resumo dos arquivos alterados, testes executados e riscos restantes. Depois envie uma
> mensagem pelo Kavor ao Codex, referenciando a Specification, e peça uma revisão contra os critérios de aceite.

A Connection torna o contexto e as capacidades autorizadas acessíveis; ela não executa a tarefa sozinha. Acompanhe o
trabalho no CodingAgent e não trate “pronto” como evidência suficiente.

## 4. Receba a revisão

Quando a mensagem chegar, o Codex poderá usar a Specification e a Sticky Note porque ambas estão em seu grafo
alcançável. Peça que ele:

- compare a implementação com cada critério de aceite;
- execute as verificações relevantes;
- registre findings concretos, ou declare que não encontrou bloqueios;
- acrescente o resultado da revisão à Sticky Note;
- responda ao Claude Code quando uma correção for necessária.

Abra `Messages` no Node para inspecionar entrega e respostas. Se houver findings, deixe Claude Code corrigir e peça uma
nova revisão. Esse retorno faz parte do mesmo loop.

## 5. Feche o loop com uma decisão humana

Antes de marcar o trabalho como concluído:

1. releia os critérios da Specification;
2. inspecione os outputs e as alterações produzidas;
3. confirme que a Sticky Note contém o resumo da implementação e da revisão;
4. resolva findings bloqueantes;
5. altere o status da Specification para `Done`.

O status não substitui sua decisão. Você ainda pode aceitar, pedir uma correção, reduzir o escopo ou descartar a
mudança. O loop está fechado quando intenção, execução, revisão, evidência e aceite continuam visíveis no Workspace.

## Resultado esperado

Ao final:

- o Canvas mostra quem participou e qual contexto foi compartilhado;
- a Specification preserva o contrato e os outputs duráveis;
- as mensagens entre CodingAgents permanecem inspecionáveis;
- a Sticky Note reúne as observações de implementação e revisão;
- a decisão final continua sendo sua.

## Se algo não funcionar

- **O CodingAgent não encontra a Specification ou a Sticky Note:** confirme se existe um caminho de Connections entre
  o agente e o recurso. Referenciar um Node em uma mensagem não concede acesso por si só.
- **A mensagem não chega:** confirme se os CodingAgents pertencem ao mesmo componente alcançável e abra `Messages`
  para verificar a entrega. Eles não precisam de uma Connection direta; um provider ocupado pode receber a mensagem
  depois.
- **Um Guardrail bloqueia a ação:** abra a Connection e revise a restrição; não peça ao CodingAgent para contorná-la.
- **Faltam evidências:** peça ao CodingAgent para registrar arquivos, commits ou outros outputs duráveis na
  Specification e complementar a Sticky Note.

Continue por [Como CodingAgents enxergam e constroem o Canvas](./coding-agents-and-canvas.md), veja as
[notas de versão](https://agentkavor.com/pt-br/docs/release-notes) ou compartilhe seu primeiro loop na
[Kavor Community](https://github.com/digows/agentkavor-community/discussions).
