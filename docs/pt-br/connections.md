---
id: connections
title: Matriz de Connections suportadas no Kavor
description: Consulte os pares de Nodes que podem ser conectados, seu papel estrutural, parâmetros, Guardrails e limites.
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/pt-br/docs/connections
---

# Matriz de Connections suportadas no Kavor

Uma Connection não é uma seta de workflow. É uma relação explícita e sem direção que coloca dois Nodes no mesmo
componente alcançável do Canvas.

Para um CodingAgent, o grafo inteiro importa: ele pode trabalhar com qualquer Node alcançável por um caminho de
Connections válidas, mesmo quando o recurso não está diretamente conectado a ele. A Connection direta continua
importante quando seleciona o alvo de um Schedule, carrega parâmetros ou mantém um Guardrail específico entre um
CodingAgent e um recurso.

Esta página é a referência pública para os pares que o Kavor permite conectar diretamente e para o contrato especial
de cada par.

## Quatro regras para ler o grafo

1. **Connections não possuem direção persistida.** A ordem dos endpoints não expressa fluxo, controle ou precedência.
2. **Alcance é transitivo.** Se existe um caminho válido entre um CodingAgent e outro Node, ambos pertencem ao mesmo
   grafo de contexto e capacidades.
3. **Algumas regras continuam diretas.** Um Guardrail pertence à Connection exata que o carrega; parâmetros de
   Terminal pertencem ao seu par; um Trigger seleciona seu único alvo pela Connection direta.
4. **Par não suportado significa “sem Connection direta”.** Dois Nodes ainda podem participar do mesmo componente por
   meio de outros pares suportados.

Uma mensagem ainda possui remetente e destinatário. Um Schedule ainda entrega a um alvo. Essas direções pertencem à
operação realizada, não à Connection desenhada no Canvas.

## Combinações suportadas

| Par de Nodes | Papel da Connection direta | Parâmetros | Guardrail disponível | Exemplo principal |
| --- | --- | --- | --- | --- |
| **CodingAgent + Specification** | Coloca a intenção durável no grafo e oferece o ponto direto para restringir aquele agente. | Nenhum | `specification_read_only` | Spec Writer, Builder e Reviewer trabalhando sobre o mesmo contrato alcançável. |
| **CodingAgent + Sticky Note** | Coloca a memória informal no grafo e oferece o ponto direto para restringir aquele agente. | Nenhum | `sticky_note_read_only` | Decisões abertas, progresso, findings e handoffs visíveis. |
| **CodingAgent + Terminal** | Coloca o shell ao alcance do grafo e oferece o ponto direto para restringir aquele agente. | Nenhum | `terminal_read_only` | Diagnóstico, testes, logs ou assistência em uma sessão SSH supervisionada. |
| **CodingAgent + File** | Coloca uma fonte canônica do filesystem no grafo e oferece o ponto direto para restringir aquele agente. | Nenhum | `file_read_only` | Delimitar um módulo, PDF, imagem, relatório ou configuração. |
| **CodingAgent + CodingAgent** | Une participantes em um componente. Qualquer CodingAgent alcançável pode trocar mensagens com outro. | Nenhum | Nenhum | Builder solicitando uma revisão ao Reviewer. |
| **Specification + Terminal** | Exporta o caminho absoluto canônico da Specification para a sessão do Terminal. | Nome de variável de ambiente obrigatório | Nenhum | Validar, inspecionar ou comparar o Markdown da Specification. |
| **File + Terminal** | Exporta o caminho absoluto canônico do File para a sessão do Terminal. | Nome de variável de ambiente obrigatório | Nenhum | Executar um script ou usar um arquivo SQL sem copiar seu caminho entre janelas. |
| **Trigger + CodingAgent** | Seleciona um CodingAgent com sessão ativa como alvo do prompt do Schedule. | Nenhum | Nenhum | Acordar um Maintainer para analisar falhas, escrever um relatório e pedir revisão. |
| **Trigger + Terminal** | Seleciona uma sessão ativa de Terminal como alvo do comando do Schedule. | Nenhum | Nenhum | Rodar testes, uma verificação de banco ou um script de manutenção. |

As quatro Connections entre CodingAgent e recurso não são a única maneira de alcançar o recurso. Elas são a maneira
mais explícita de colocá-lo no grafo daquele agente e a única superfície onde um Guardrail específico para esse par
pode existir.

## Guardrails restringem um par direto

O grafo é aberto por padrão para Nodes alcançáveis. Um Guardrail registra uma restrição escolhida pelo usuário na
Connection direta entre um CodingAgent e um recurso:

| Guardrail | Connection | Efeito |
| --- | --- | --- |
| `specification_read_only` | CodingAgent + Specification | Mantém leitura e bloqueia alterações de lifecycle e outputs pelo Kavor. A edição do Markdown também passa a ser um contrato explícito de somente leitura para aquele agente. |
| `sticky_note_read_only` | CodingAgent + Sticky Note | Mantém leitura e bloqueia append ou replace do conteúdo. |
| `terminal_read_only` | CodingAgent + Terminal | Mantém inspeção e bloqueia operações que alterariam sessão, processo ou entrada. |
| `file_read_only` | CodingAgent + File | Declara que a fonte canônica não deve ser alterada pelo agente. |

Uma rota alternativa pelo grafo não apaga um Guardrail que ainda exista na Connection direta entre o agente e o
recurso. Ao mesmo tempo, uma restrição na Connection de outro agente não vira uma política global daquele Node.

Operações mediadas pelo Kavor são rejeitadas antes de produzir efeitos quando um Guardrail as bloqueia. Files e o
corpo de Specifications também podem ser alcançados pelas ferramentas de filesystem do próprio harness; nesse caso,
o Guardrail é um contrato visível e monitorado, não uma sandbox do sistema operacional.

Um Guardrail não cria uma Connection, não amplia permissões e não vale para um Node apenas porque ele está próximo no
Canvas.

## Connections com variáveis de ambiente

Apenas dois pares possuem parâmetros persistidos:

- **File + Terminal**;
- **Specification + Terminal**.

Nos dois casos, você escolhe o nome de uma variável de ambiente. O valor fornecido ao Terminal é o caminho absoluto
canônico da fonte — nunca o conteúdo do arquivo.

Por exemplo, um File conectado como `CHECK_SQL` pode ser usado no shell assim:

```sh
sqlite3 app.db < "$CHECK_SQL"
```

O Kavor aplica o valor quando a sessão do Terminal inicia. Se a Connection ou seu parâmetro mudar enquanto o shell
estiver aberto, a interface informa que a variável aguarda o reinício da sessão. `TERM` e `COLORTERM` são nomes
reservados.

## O limite especial de um Schedule

Schedule é a fonte de Trigger disponível no produto. Cada Trigger possui no máximo um alvo direto: um CodingAgent ou
um Terminal. A Connection seleciona esse alvo; o id do alvo não é duplicado na configuração.

Um CodingAgent acordado pelo Schedule pode trabalhar com todos os Nodes de seu componente alcançável, sob os mesmos
limites e Guardrails que já possuía. O Schedule adiciona o momento e o payload, não novas permissões.

Para que a entrega aconteça, o Kavor precisa estar em execução, a máquina precisa estar acordada e a sessão do alvo
precisa estar ativa. O Schedule não inicia uma sessão deliberadamente fechada, não distribui um disparo para vários
alvos e não promete efeito externo exatamente uma vez. Remover sua Connection de alvo pausa o Trigger e registra o
motivo.

Leia [Schedule: dê um relógio ao seu grafo](./schedule.md) para configurar recorrência, usar `Run now` e interpretar o
histórico durável.

## Combinações que não existem diretamente

O Kavor rejeita qualquer par que não apareça na matriz. Isso inclui:

- Trigger + Specification;
- Trigger + File;
- Trigger + Sticky Note;
- Specification + File;
- Specification + Sticky Note;
- File + Sticky Note;
- File + File;
- Sticky Note + Terminal;
- Sticky Note + Sticky Note;
- Terminal + Terminal.

Um Node também não pode ser conectado a si mesmo. Inverter os mesmos endpoints não cria outra Connection, pois a
relação não possui direção persistida.

Esses limites não impedem composições úteis. Uma Specification e uma Sticky Note, por exemplo, podem participar do
mesmo grafo quando ambas são conectadas por pares suportados a CodingAgents. O que não existe é uma Connection direta
entre elas.

Proximidade no Canvas, menção em uma mensagem ou participação no mesmo Workspace não substituem um caminho de
Connections.

## Escolha a menor estrutura que resolve o trabalho

Antes de criar uma Connection, pergunte o que falta ao componente:

- intenção durável: adicione uma Specification;
- memória de trabalho entre humano e agente: adicione uma Sticky Note;
- execução ou evidência: adicione um Terminal;
- uma fonte canônica explícita: adicione um File;
- outra perspectiva: adicione um CodingAgent;
- tempo como causa legítima da atividade: adicione um Schedule por último.

Não conecte cada CodingAgent diretamente a cada recurso por reflexo. Crie a menor topologia que mantém tudo
alcançável e acrescente uma Connection direta quando ela melhora a leitura do Canvas, carrega um parâmetro ou precisa
de um Guardrail próprio.

## Continue

- Leia [o guia central de Nodes](./nodes.md) para entender a responsabilidade de cada participante.
- [Feche seu primeiro loop](./first-loop.md) com intenção, implementação, revisão e decisão humana.
- Veja [como CodingAgents enxergam e constroem o Canvas](./coding-agents-and-canvas.md).
