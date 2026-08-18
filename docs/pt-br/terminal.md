---
id: terminal
title: "Terminal no Kavor: execução visível para humano e agente"
description: Use um shell real no Canvas, conecte contexto por caminhos canônicos e permita assistência do CodingAgent sem perder supervisão.
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/pt-br/docs/terminal
---

# Terminal no Kavor: execução visível para humano e agente

Um Terminal é um shell real no Canvas. Você continua digitando comandos, acompanhando logs e operando ferramentas
conhecidas; o Kavor acrescenta contexto, observabilidade e colaboração ao redor dessa sessão.

O objetivo não é esconder execução atrás de um botão. É permitir que humano e CodingAgent trabalhem no mesmo
ambiente visível, cada um sob limites claros.

## O que o Terminal possui

Cada Terminal possui sua própria sessão, shell e histórico de tela retido pelo Node. Abrir mais de um Terminal é útil
quando as responsabilidades são distintas: aplicação, testes, banco, logs ou uma máquina remota já aberta por você.

O processo continua sendo um processo de shell. O Kavor não converte texto exibido em sucesso, não transforma todo
comando em uma tarefa persistida e não presume que uma ferramenta terminou apenas porque imprimiu uma mensagem
otimista.

## O que ele faz sozinho

Sem Connections, o Terminal já mantém o shell dentro do Workspace e evita quebrar o fluxo para alternar entre
janelas externas. Você pode executar comandos interativos, observar processos longos e manter sessões diferentes no
mesmo Canvas.

Connections acrescentam participantes e fontes canônicas sem substituir o shell.

## O que ele ganha no grafo

O Terminal aceita quatro pares diretos:

| Connection | O que acrescenta |
| --- | --- |
| **Terminal + CodingAgent** | O agente pode executar comandos correlacionados, acompanhar o processo, consultar tela ou histórico e interromper uma execução quando autorizado. Pode receber `terminal_read_only`. |
| **Terminal + File** | Exporta o caminho absoluto canônico do File em uma variável de ambiente escolhida por você. |
| **Terminal + Specification** | Exporta o caminho absoluto canônico do Markdown da Specification em uma variável de ambiente. |
| **Terminal + Trigger** | Seleciona a sessão ativa como alvo direto de um comando agendado pelo Schedule. |

Um CodingAgent não precisa estar diretamente ligado ao Terminal quando ambos já pertencem ao mesmo componente
alcançável. A Connection direta, porém, é onde um Guardrail `terminal_read_only` pode declarar e impor que aquele
agente somente observe.

## Assistência sem disputar o teclado

O Terminal é uma superfície compartilhada com prioridade para o humano. Um CodingAgent não deve despejar um comando
sobre texto que você ainda está digitando. Quando a entrada não está segura, a operação aguarda ou retorna uma
condição que precisa ser tratada, em vez de corromper sua linha.

Para trabalho iniciado pelo agente, o Kavor correlaciona o comando com seu acompanhamento. O agente pode esperar por
aquele resultado, cancelar a execução correspondente ou consultar o estado visível. Para uma sessão já existente,
ele escolhe a visão adequada: tela atual, tail limitado ou buffer completo.

Essa distinção importa. Ler a tela responde “o que o humano vê agora?”. Ler um tail ajuda com logs recentes. O buffer
completo serve para uma investigação que realmente precisa do histórico, sem transformar toda interação num dump
automático de contexto.

## Use Files e Specifications sem copiar caminhos

Connections com File ou Specification recebem um nome de variável de ambiente. O valor é o caminho absoluto canônico
da fonte, nunca seu conteúdo.

Exemplos:

```sh
node "$IMPORT_SCRIPT" --input "$SOURCE_FILE"
```

```sh
markdownlint "$SPECIFICATION_FILE"
```

As variáveis são aplicadas quando a sessão do Terminal inicia. Se uma Connection ou seu parâmetro mudar com o shell
aberto, a nova configuração aguarda o reinício daquela sessão. `TERM` e `COLORTERM` são reservadas pelo emulador.

Use nomes que expressem responsabilidade, como `CHECK_SQL`, `SPECIFICATION_FILE` ou `IMPORT_SCRIPT`. Uma variável
genérica como `FILE` perde significado quando o grafo cresce.

## Três padrões úteis

### Implementação acompanhada de evidência

Conecte Specification, CodingAgent e Terminal. O agente executa apenas as verificações relevantes, preserva a saída
necessária e registra o resultado como output. Você acompanha o mesmo shell e pode intervir.

### Diagnóstico de uma aplicação em execução

Mantenha a aplicação em um Terminal e os testes ou consultas em outro. Um CodingAgent alcançável consulta a tela ou
o tail necessário, formula uma hipótese e executa um comando delimitado. Logs continuam visíveis para você; a
investigação não vira uma caixa-preta.

### Operação remota supervisionada

Você abre uma sessão SSH no Terminal. Um CodingAgent pode ajudar a interpretar estado e sugerir ou executar comandos
quando autorizado. O Kavor não vira um serviço remoto: credenciais, conexão, shell e supervisão continuam na sessão
que você abriu.

## Um grafo prático

```text
Specification — Maintainer — Reviewer
                     │
                  Terminal
                     │
              File: check.sql
```

O Maintainer usa a Specification como contrato, o File como fonte explícita e o Terminal para executar a verificação.
O Reviewer avalia resultado e evidências. A Connection File + Terminal fornece `CHECK_SQL`; o shell pode usá-la sem
copiar um caminho manualmente.

## Um pedido inicial melhor

> Diagnostique a falha usando somente o contexto alcançável. Leia primeiro a tela atual do Terminal. Execute um
> comando por vez, explique o que ele discrimina e preserve a saída necessária para o Reviewer. Não interrompa um
> processo iniciado por mim e pare antes de qualquer ação destrutiva ou que amplie o escopo da Specification.

Para monitoramento:

> Acompanhe somente o tail necessário deste Terminal. Avise quando houver evidência nova; não trate ausência de novas
> linhas como sucesso e não deixe um watcher iniciado apenas para sua investigação rodando depois de concluir.

## Guardrail de somente leitura

`terminal_read_only` mantém inspeção e bloqueia operações que alterariam a sessão, o processo ou a entrada naquela
Connection direta. É útil para um Reviewer que precisa ler evidências, mas não deve executar correções.

O Guardrail pertence ao par. Ele não transforma o Terminal inteiro numa superfície globalmente somente leitura e não
substitui as permissões do sistema operacional.

## Limites que importam

- Saída de Terminal não é prova automática de que um efeito externo ocorreu corretamente.
- Um CodingAgent não deve interferir em entrada humana inacabada.
- Comandos destrutivos continuam exigindo escopo exato e autorização adequada.
- Uma variável fornecida por Connection contém um caminho, não conteúdo ou segredo.
- Alterações nessas variáveis exigem reiniciar a sessão do Terminal para entrar no ambiente.
- Schedule entrega apenas a uma sessão ativa e não recupera automaticamente comandos perdidos enquanto o Kavor
  estava fechado.
- Um processo iniciado para investigação deve ser encerrado quando não precisa permanecer para o humano.
- Vários Terminals ajudam quando representam responsabilidades reais; duplicá-los sem propósito apenas fragmenta o
  estado operacional.

## Antes de delegar um comando

Confirme:

- este é o Terminal correto para a responsabilidade?
- existe entrada humana em andamento?
- o comando é delimitado e reversível quando necessário?
- o agente sabe qual saída constitui evidência?
- o buffer necessário é tela, tail ou histórico completo?
- Files e Specifications usam nomes de variável compreensíveis?
- o Reviewer deve observar sob `terminal_read_only`?
- está claro quando interromper, esperar ou pedir sua decisão?

O Terminal ganha valor no grafo quando execução permanece real, contexto fica explícito e supervisão não desaparece.

Consulte a [matriz de Connections](./connections.md), aprenda
[como CodingAgents enxergam e constroem o Canvas](./coding-agents-and-canvas.md) ou configure
[Schedule para comandos e prompts](./schedule.md).
