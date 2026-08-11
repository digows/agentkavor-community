---
id: coding-agents-and-canvas
title: Como CodingAgents enxergam e constroem o Canvas
description: Entenda contexto alcançável, mensagens entre agentes e edição atômica do Canvas com limites controlados por você.
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/pt-br/docs/coding-agents-and-canvas
---

# Como CodingAgents enxergam e constroem o Canvas

O Canvas não é apenas uma imagem para você. Para um CodingAgent, ele é contexto vivo, mapa de capacidades e — quando
você permite — uma superfície que o próprio agente pode organizar.

São duas capacidades diferentes:

1. **entender o grafo alcançável** para trabalhar com Nodes, recursos e outros CodingAgents;
2. **editar a estrutura do Canvas** por meio de alterações imediatas e atômicas.

Separar essas duas coisas evita uma conclusão perigosa: enxergar a posição de um Node não significa poder ler seu
conteúdo, e poder trabalhar com um recurso não significa poder remover qualquer coisa do Workspace.

## O grafo é o contexto compartilhado

Em cada nova interação, o Kavor entrega ao CodingAgent o estado atual de seu componente alcançável: Nodes, Connections,
Guardrails e os fatos necessários para entender o trabalho.

O agente pode operar qualquer Node ligado a ele por um caminho de Connections válidas, a qualquer distância. Por
exemplo:

```text
Specification — Builder — Reviewer — Sticky Note
```

O Builder alcança a Sticky Note pelo Reviewer. O Reviewer alcança a Specification pelo Builder. Os dois CodingAgents
podem trocar mensagens, embora o acesso de cada um não dependa de uma Connection direta para todos os recursos.

Essa regra reduz a malha de linhas no Canvas e evita repetir o mesmo contexto em cada sessão. A topologia ainda
permanece explícita: remover uma Connection pode dividir o componente e alterar o que ficará alcançável na próxima
interação.

## O que chega inteiro e o que é consultado sob demanda

Kavor favorece contexto útil, não um dump permanente do Workspace.

- informações pequenas e textuais podem chegar junto com o estado do grafo;
- Specifications informam lifecycle, caminho e outputs recentes, enquanto o Markdown canônico continua no Workspace;
- Terminals informam estado e comando em foreground, e o output é consultado quando necessário;
- Files informam a fonte canônica, cujo conteúdo continua no filesystem;
- CodingAgents informam estado e fatos de trabalho; mensagens anteriores são consultadas quando úteis.

Conteúdo grande ou vivo não é despejado inteiro na janela de contexto. O agente recebe uma referência clara para
consultá-lo. Isso preserva espaço para raciocínio e mantém Files, Specifications e Terminals em suas fontes reais.

## Mensagens também seguem o grafo

Qualquer CodingAgent alcançável pode enviar uma mensagem a outro CodingAgent do componente. Uma Connection direta
entre os dois não é necessária.

As mensagens são duráveis e inspecionáveis no painel `Messages`. Use-as para:

- entregar uma implementação para revisão;
- pedir esclarecimento a quem escreveu uma Specification;
- dividir investigações independentes;
- devolver findings e solicitar uma nova verificação.

Uma mensagem coordena participantes, mas não deve ser o único lugar de uma decisão durável. Preserve contratos na
Specification, memória de trabalho em uma Sticky Note e resultados nos outputs apropriados.

## Guardrails continuam ligados ao par direto

Reachability é a regra de acesso. Guardrail é a regra de restrição.

Se existe uma Connection direta entre um CodingAgent e uma Specification com `specification_read_only`, esse
Guardrail continua valendo para o par mesmo que outra rota também chegue à Specification. Uma restrição na Connection
de outro CodingAgent, porém, não vira uma política global do recurso.

Visual proximity, labels e referências em mensagens não concedem acesso. É necessário existir um caminho real de
Connections.

## O agente também enxerga o layout — com menos autoridade

Para ajudar a organizar o Workspace, um CodingAgent pode consultar rótulos, tipos e geometria de todos os Nodes do
Canvas. Essa visão de layout não inclui configurações, conteúdo ou Connections fora de seu próprio grafo.

Por isso ele pode alinhar ou reposicionar um Node que está fora de seu componente sem ganhar acesso ao que aquele Node
contém. Layout é Workspace-wide; contexto e alterações estruturais não são.

## Allow workspace editing

Cada CodingAgent possui a opção `Allow workspace editing` em suas configurações avançadas. Ela controla alterações
estruturais iniciadas pelo agente e entra em vigor imediatamente, sem reiniciar a sessão.

Com a opção ligada, o CodingAgent pode, dentro de seu escopo:

- criar Nodes ativos, incluindo CodingAgent, Specification, Sticky Note, Terminal, File e Schedule;
- criar uma Specification canônica e materializá-la no Canvas;
- adicionar Connections suportadas;
- alterar parâmetros de Connections com Terminal;
- remover Connections;
- renomear Nodes alcançáveis e Specifications;
- configurar um Schedule alcançável;
- mover, redimensionar e revelar Nodes.

Com a opção desligada, alterações estruturais são recusadas. O agente deve informar que a configuração está desativada
e não insistir. Layout continua disponível porque mover um Node não amplia autoridade nem altera conteúdo.

## Estrutura segue o grafo, não o Workspace inteiro

Um CodingAgent pode alterar estruturalmente:

- Nodes e Connections de seu componente alcançável;
- Nodes que ele criou antes, na mesma alteração atômica.

Isso permite criar um Node e conectá-lo imediatamente sem deixar lixo no Canvas. Também permite que um agente ainda
isolado crie recursos novos e conecte a si mesmo no mesmo lote.

O primeiro vínculo com um Node preexistente fora do grafo continua sendo seu. O agente não pode usar a visão de
layout do Workspace para se anexar a um recurso que você nunca tornou alcançável.

## As mudanças são atômicas

Quando o CodingAgent monta uma estrutura, o Kavor valida o conjunto completo e aplica as alterações em ordem como uma
unidade. Se uma etapa falha, nenhuma alteração estrutural anterior do lote permanece.

Isso resolve um caso comum: criar um Terminal e conectá-lo ao agente deve resultar nos dois, ou em nenhum. O Canvas
não fica com um Node órfão porque a Connection final era inválida.

O resultado devolvido ao agente contém a forma realmente persistida. Ele deve lê-lo em vez de presumir que defaults,
geometria e caminhos canônicos ficaram idênticos ao pedido.

## O que continua humano

`Allow workspace editing` não entrega controle irrestrito. Um CodingAgent não pode:

- excluir Nodes;
- criar, remover ou relaxar Guardrails;
- reconfigurar arbitrariamente outros tipos de Node;
- mudar o controle humano que segura mensagens recebidas para aprovação;
- usar uma referência ou posição no Canvas para ampliar seu próprio grafo.

Um agente pode remover uma Connection alcançável, portanto o pedido precisa ser claro quando essa ação pode retirar
contexto ou interromper o trabalho de outro CodingAgent. Kavor orienta agentes a tocar Connections de peers somente
quando você pediu ou quando isso é necessário para um trabalho já delegado.

## O Docs MCP ajuda o agente a ensinar Kavor

CodingAgents no Kavor podem consultar a documentação oficial pelo Docs MCP local. Isso permite pedir ajuda sem
memorizar nomes de Nodes, combinações suportadas ou detalhes de Schedule.

A documentação orienta; ela não concede autoridade. O Docs MCP não cria Connections, não desliga Guardrails e não
transforma uma sugestão em mudança no Canvas.

## Três prompts para trabalhar junto com o agente

### Explique antes de tocar

> Consulte a documentação oficial do Kavor e o grafo atual. Explique a menor estrutura que resolve esta tarefa, quais
> Nodes serão alcançáveis e quais limites permanecem. Não altere o Canvas ainda.

### Monte um loop revisável

> Monte um loop pequeno para esta tarefa com uma Specification, um Builder, um Reviewer e uma Sticky Note. Use o
> menor número de Connections necessário, crie e conecte os novos Nodes em uma única alteração atômica e pare antes
> de iniciar a implementação para eu revisar o Canvas.

### Organize sem ampliar acesso

> Organize visualmente este Canvas para deixar intenção, implementação, revisão e evidência fáceis de ler. Não crie
> nem remova Connections, não altere Guardrails e não assuma acesso ao conteúdo de Nodes fora do seu grafo.

## Checklist antes de autorizar uma edição

- o agente explicou o resultado estrutural esperado?
- os Nodes novos possuem uma função concreta?
- cada Node criado será conectado no mesmo lote ou existe apenas para leitura humana?
- a mudança permanece dentro do componente alcançável?
- alguma Connection removida pode dividir o grafo ou interromper outro agente?
- um Guardrail direto é necessário antes de entregar o recurso?
- está claro onde o agente deve parar para você revisar?

Use o CodingAgent como colaborador do Canvas, não como dono invisível dele. O ganho é justamente poder enxergar a
estrutura que ele recebeu, a estrutura que mudou e os limites que continuaram sob seu controle.

## Continue

- [Feche seu primeiro loop](./first-loop.md) com uma topologia mínima.
- Consulte a [matriz de Connections](./connections.md) antes de ampliar o grafo.
- Veja [como escolher CodingAgents e papéis](./agents-and-roles.md).
- Aprenda a configurar [Schedule](./schedule.md) sem ampliar permissões.
