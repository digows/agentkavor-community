---
id: connections
title: Matriz de Connections suportadas no Kavor
description: Consulte as combinações suportadas entre Nodes, as capacidades concedidas, os parâmetros necessários e os Guardrails disponíveis.
kind: guide
lastReviewedAt: 2026-08-07
canonicalUrl: https://agentkavor.com/pt-br/docs/connections
---

# Matriz de Connections suportadas no Kavor

Uma Connection não é apenas uma linha desenhada no Canvas. Ela declara que dois Nodes participam do mesmo grafo e
define as capacidades que essa combinação acrescenta ao trabalho.

Nem toda combinação é válida. Cada par suportado possui um contrato específico: algumas Connections tornam contexto
alcançável, outras permitem operações mediadas pelo Kavor e duas fornecem caminhos canônicos a um Terminal por meio
de variáveis de ambiente.

Esta página é a referência pública para esses contratos.

## Como ler uma Connection

Uma Connection possui três responsabilidades distintas:

1. **Existência:** conecta os Nodes em um mesmo componente alcançável do grafo.
2. **Parâmetros:** registra uma configuração obrigatória quando aquele par precisa dela.
3. **Guardrails:** subtrai capacidades do comportamento normalmente permitido entre os dois Nodes.

Connections são relações bidirecionais. O Kavor armazena os dois endpoints em ordem canônica, mas essa ordem não
expressa fluxo, controle ou precedência. Uma mensagem ainda possui remetente e destinatário; um Trigger ainda possui
um alvo. Essas direções pertencem à operação executada, não à Connection persistida.

## Combinações suportadas

| Par de Nodes | O que a Connection permite | Parâmetros | Guardrail disponível | Exemplo principal |
| --- | --- | --- | --- | --- |
| **CodingAgent + Specification** | Ler metadados e o Markdown canônico, trabalhar com o lifecycle e registrar outputs duráveis quando permitido. | Nenhum | `specification_read_only` | Spec Writer, Builder e Reviewer compartilhando o mesmo contrato. |
| **CodingAgent + Sticky Note** | Ler e escrever memória informal em Markdown com controle de versão; cada escrita escolhe append ou replace. | Nenhum | `sticky_note_read_only` | Decisões abertas, progresso, findings e handoffs visíveis. |
| **CodingAgent + Terminal** | Ler output, executar comandos, acompanhar ou interromper uma execução correlacionada e interagir com o processo em foreground quando permitido. | Nenhum | `terminal_read_only` | Diagnóstico, testes, logs ou assistência em uma sessão SSH supervisionada. |
| **CodingAgent + File** | Tornar uma fonte canônica do filesystem explícita no grafo para leitura, revisão ou alteração quando permitido. | Nenhum | `file_read_only` | Delimitar um módulo, PDF, imagem, relatório ou configuração. |
| **CodingAgent + CodingAgent** | Formar um grafo alcançável para mensagens assíncronas, respostas, revisão independente e trabalho paralelo. | Nenhum | Nenhum | Builder solicitando uma revisão ao Reviewer. |
| **Specification + Terminal** | Exportar o caminho absoluto canônico da Specification para a sessão do Terminal. | Nome de variável de ambiente obrigatório | Nenhum | Validar, inspecionar ou comparar o Markdown da Specification. |
| **File + Terminal** | Exportar o caminho absoluto canônico do File para a sessão do Terminal. | Nome de variável de ambiente obrigatório | Nenhum | Executar um script ou usar um arquivo SQL sem copiar seu caminho entre janelas. |
| **Trigger + CodingAgent** | Entregar em um horário configurado um prompt a um CodingAgent com sessão ativa. | Nenhum | Nenhum | Acordar um Maintainer para analisar falhas, escrever um relatório e pedir revisão. |
| **Trigger + Terminal** | Entregar em um horário configurado um comando à sessão ativa de um Terminal. | Nenhum | Nenhum | Rodar testes, uma verificação de banco ou um script de manutenção. |

## Guardrails restringem; não concedem acesso

Uma Connection começa com as capacidades implementadas para aquele par. Um Guardrail registra uma restrição escolhida
pelo usuário sobre essa base:

| Guardrail | Connection | Efeito |
| --- | --- | --- |
| `specification_read_only` | CodingAgent + Specification | Mantém leitura e proíbe alterações no lifecycle e nos outputs através do Kavor. A edição direta do Markdown torna-se um contrato explícito de somente leitura. |
| `sticky_note_read_only` | CodingAgent + Sticky Note | Mantém leitura e bloqueia append ou replace do conteúdo. |
| `terminal_read_only` | CodingAgent + Terminal | Mantém inspeção do Terminal e bloqueia operações que alterariam a sessão, o processo ou sua entrada. |
| `file_read_only` | CodingAgent + File | Declara que a fonte canônica não deve ser alterada pelo agente. |

Guardrails pertencem à Connection direta entre o CodingAgent e o recurso. Uma rota alternativa pelo grafo não apaga
uma restrição que exista nesse par direto.

Operações mediadas pelo Kavor são rejeitadas antes de produzir efeitos quando um Guardrail as bloqueia. Files e o
corpo de Specifications também podem ser acessados pelas ferramentas de filesystem do próprio harness; nesses casos,
o Guardrail é um contrato visível e monitorado, não uma sandbox do sistema operacional.

Um Guardrail não cria uma Connection, não torna um Node alcançável e não aumenta permissões. Se o objetivo é impedir
que um recurso participe do grafo, não crie a Connection.

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
estiver aberto, a interface sinaliza que a variável aguarda o reinício da sessão. `TERM` e `COLORTERM` são nomes
reservados e não podem ser usados nesses parâmetros.

## O limite especial de um Trigger

Um Trigger possui no máximo um alvo direto: um CodingAgent ou um Terminal. Ele não se conecta diretamente a uma
Specification, File ou Sticky Note e não distribui o mesmo disparo para vários alvos.

O restante do grafo pode ampliar o que o alvo consegue fazer sem ampliar suas permissões. Um CodingAgent acordado por
um Trigger pode trabalhar com Nodes que já estejam alcançáveis, sob os mesmos Guardrails e limites da sessão.

Para que a entrega aconteça, o Kavor precisa estar em execução e a sessão do alvo precisa estar ativa. Um Trigger não
inicia uma sessão que você manteve desligada, não decide o objetivo do trabalho e não transforma efeitos externos em
operações exatamente uma vez. Cada TriggerFiring mantém seu resultado durável para inspeção.

## Combinações que não existem

O Kavor rejeita qualquer par que não apareça na matriz. Isso inclui, entre outros:

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

Um Node também não pode ser conectado a si mesmo. Inverter os mesmos dois endpoints não cria outra Connection, pois
a relação não possui direção persistida.

Proximidade no Canvas, menção em uma mensagem ou participação em um mesmo Workspace não substituem uma Connection.
Se uma combinação não está nesta página, ela não concede capacidades por estar visualmente próxima de outra.

## Escolha a menor Connection que resolve o trabalho

Antes de conectar dois Nodes, pergunte qual capacidade concreta está faltando:

- o agente precisa de intenção durável? Conecte uma Specification;
- humano e agente precisam manter memória de trabalho? Conecte uma Sticky Note;
- o agente precisa executar ou observar um processo? Conecte um Terminal;
- uma fonte canônica precisa ficar explícita? Conecte um File;
- outro ponto de vista melhoraria implementação ou revisão? Conecte outro CodingAgent;
- o tempo realmente deve iniciar a atividade? Adicione um Trigger por último.

Uma boa Connection torna o trabalho mais explícito. Se você não consegue dizer qual capacidade ela acrescenta, o
grafo provavelmente não precisa dela.

## Continue

- Leia [o guia central de Nodes](./nodes.md) para entender a responsabilidade de cada participante.
- [Feche seu primeiro loop](./first-loop.md) com intenção, implementação, revisão e decisão humana.
- Veja [como escolher CodingAgents e papéis](./agents-and-roles.md) antes de ampliar o grafo.
