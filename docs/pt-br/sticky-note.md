---
id: sticky-note
title: "Sticky Note: memória de trabalho compartilhada"
description: Use uma Sticky Note para registrar status, descobertas e pontos de atenção junto com seus CodingAgents sem transformar tudo em uma Specification.
kind: guide
lastReviewedAt: 2026-09-08
canonicalUrl: https://agentkavor.com/pt-br/docs/sticky-note
---

# Uma Sticky Note é pequena, mas mantém o trabalho à vista

Uma Sticky Note começa como um post-it para humanos. Conectada a um CodingAgent, torna-se uma memória de trabalho
compartilhada: você e o agente podem registrar o que importa durante o turno sem depender de uma conversa que vai
ficar para trás.

[![CodingAgents e uma Sticky Note conectados no Canvas do Kavor](https://agentkavor.com/kavor-connections-demo-poster.jpg)](https://agentkavor.com/pt-br/videos/connections)

*Uma nota compartilhada mantém observações, decisões abertas e próximos passos visíveis junto do grafo.*

## O que a Sticky Note faz

Uma Sticky Note é útil mesmo sem um agente. Escreva uma pergunta, uma hipótese, um lembrete ou uma lista curta de
coisas que você quer observar. O valor cresce quando o conteúdo passa a ser parte do mesmo grafo de trabalho.

Com uma Connection a um CodingAgent, o agente pode ler e atualizar a nota junto com você. Use-a para manter:

- um resumo de **feito / fazendo / próximo**;
- uma decisão ainda aberta durante a formação de uma Specification;
- um ponto de atenção que você quer revisar depois;
- descobertas encontradas durante a implementação;
- findings de uma revisão independente;
- um checklist de handoff entre participantes do grafo.

A nota é deliberadamente informal. Ela ajuda o trabalho a ficar transparente nos dois sentidos: você entende o que o
agente observou, e o agente recebe uma superfície explícita para preservar o que merece continuar visível.

## Três formas de usar

### 1. Memória do seu turno

Antes de começar, escreva o objetivo e as dúvidas que não podem desaparecer. Durante o trabalho, acrescente fatos
curtos, links ou decisões provisórias. No fim, deixe os próximos passos claros para quando você retornar ao Workspace.

Um formato simples funciona bem:

```markdown
## Status
- Feito: reproduzi o problema no fluxo de login.
- Fazendo: comparando as duas respostas da API.
- Próximo: decidir se o retry pertence ao cliente ou ao servidor.

## Atenção
- A falha aparece somente depois de uma sessão expirar.
```

### 2. Segunda mão do CodingAgent

Conecte a Sticky Note ao agente e peça que ele registre somente fatos úteis para sua próxima decisão:

> Mantenha a Sticky Note como um resumo curto do turno. Registre mudanças feitas, evidências, riscos e perguntas que precisam da minha decisão. Não transforme hipóteses em decisões finais.

O agente pode acrescentar blocos separados ou substituir o conteúdo quando você pedir uma reorganização completa. O
conteúdo continua editável pelo humano e cada alteração precisa respeitar a versão mais recente da nota.

### 3. Ponte entre implementação e revisão

Um Builder pode registrar o que mudou e quais verificações executou. Um Reviewer pode acrescentar findings e riscos.
Você acompanha ambos sem procurar a informação em duas sessões diferentes.

```text
Specification — Builder — Reviewer
                         │
                    Sticky Note
```

O desenho acima representa Nodes no mesmo grafo. A Connection entre CodingAgents não é uma sequência automática de
workflow; ela torna os participantes alcançáveis e permite a troca de mensagens.

## Markdown, edição e conflitos

A Sticky Note aceita Markdown para títulos, listas, tarefas, ênfase, código e outros elementos comuns de uma nota de
trabalho. HTML bruto não é aceito. A nota comporta até 64.000 pontos de código Unicode e oferece quatro cores para
separar visualmente contextos, mas a cor não muda a autoridade do conteúdo.

O Kavor salva alterações automaticamente e sinaliza quando outro participante modificou a nota antes da sua gravação.
Em vez de apagar a alteração concorrente silenciosamente, a interface permite resolver o conflito. Uma escrita pode
ser um `append`, para acrescentar um novo bloco, ou um `replace`, para substituir o corpo inteiro.

## O que ela não deve ser

Não use uma Sticky Note como substituta para tudo:

- uma decisão estável, com escopo e critérios de aceite, pertence a uma [Specification](./specification.md);
- o código-fonte e outros artefatos canônicos pertencem a um [File](./file.md);
- comandos e evidências de execução pertencem ao [Terminal](./terminal.md);
- uma mensagem coordena participantes, mas não deve ser o único registro de uma decisão importante.

A melhor nota é curta o bastante para ser lida e rica o bastante para evitar que o próximo passo dependa da memória
de uma sessão.

## Guardrail e alcance

Uma Sticky Note só fica ao alcance de um CodingAgent por um caminho válido de [Connections](./connections.md). A
proximidade visual no Canvas ou uma menção em mensagem não concede acesso.

Você pode colocar o Guardrail `sticky_note_read_only` na Connection direta entre o agente e a nota. Nesse caso, o
agente continua podendo consultá-la, mas não pode fazer `append` ou `replace` por meio das operações do Kavor. O
Guardrail restringe aquele par direto; ele não cria uma Connection nem transforma a nota em uma política global do
Workspace.

## Continue

- [Entenda o modelo dos Nodes](./nodes.md).
- [Escolha o menor conjunto de Connections](./connections.md) para o trabalho.
- [Feche seu primeiro loop](./first-loop.md) com Specification, CodingAgents, Terminal e Sticky Note.
