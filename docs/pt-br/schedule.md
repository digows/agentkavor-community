---
id: schedule
title: "Schedule no Kavor: dê um relógio ao seu grafo"
description: Agende prompts e comandos com recorrência, preview, pausa, Run now e histórico durável sem ampliar permissões.
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/pt-br/docs/schedule
---

# Schedule no Kavor: dê um relógio ao seu grafo

Schedule é uma causa visível de atividade: você escolhe quando algo deve acontecer, conecta um único alvo e mantém
cada tentativa inspecionável no Canvas.

No domínio do Kavor, Schedule é a fonte de Trigger disponível. Ele não executa o trabalho e não decide se vale a pena
agir. Possui somente duas responsabilidades: **quando disparar** e **qual payload entregar**.

O alvo dá significado ao payload:

- conectado a um **CodingAgent**, o payload é um prompt;
- conectado a um **Terminal**, o payload é um comando de shell.

O restante pertence ao alvo. Workspace, diretório, provider ou shell, Git mode, permissões, Guardrails e contexto do
grafo continuam exatamente como já estavam.

![Um Schedule concluído conectado a um CodingAgent que recebeu o prompt de revisão, com uma Sticky Note compartilhando a intenção do loop](https://agentkavor.com/kavor-schedule-trigger-demo.jpg)

*Um Schedule inicia a atividade; o CodingAgent usa o contexto alcançável para executar e explicar o resultado.*

## Três usos que justificam um Schedule

### Acordar um Maintainer com contexto

Um Schedule entrega um prompt diário a um CodingAgent. Esse agente alcança uma Specification com o contrato de
manutenção, um Terminal para executar verificações, um File com dados de entrada, uma Sticky Note para o relatório e
um Reviewer para uma avaliação independente.

O Schedule inicia uma causa. O grafo fornece intenção, ferramentas, memória e colaboração.

### Executar um comando operacional visível

Um Schedule conectado diretamente a um Terminal pode entregar uma verificação, um script ou um comando de
manutenção. Se um File também estiver conectado ao Terminal com uma variável de ambiente, o comando pode consumir o
caminho canônico sem copiar valores entre janelas.

```sh
sqlite3 app.db < "$CHECK_SQL"
```

O processo continua no Terminal real. O histórico do Schedule registra o que o Kavor conseguiu observar sobre a
entrega, sem inventar sucesso a partir do texto exibido pelo shell.

### Criar um sistema semiautônomo pequeno

```text
Schedule — Maintainer — Specification
                      ├─ Terminal
                      ├─ File
                      ├─ Sticky Note
                      └─ Reviewer
```

As linhas representam Connections sem direção persistida. O Schedule possui um único alvo direto: `Maintainer`. O
CodingAgent usa o restante do componente alcançável para cumprir o prompt e deixa evidências para a decisão humana.

## Configure primeiro, solte o relógio depois

Um Schedule novo começa **Paused** como uma execução única futura. Isso permite escrever o payload, escolher a
recorrência, conectar o alvo e revisar o preview antes de autorizar atividade.

Uma configuração segura segue esta ordem:

1. adicione um Schedule ao Canvas;
2. escreva um payload específico e verificável;
3. escolha uma execução única ou uma recorrência;
4. confira `Next occurrences` e a zona exibida;
5. conecte diretamente um CodingAgent ou Terminal;
6. use `Resume` somente quando a estrutura estiver pronta.

Um Trigger pode existir sem alvo enquanto é configurado. Não trate isso como configuração completa: um Schedule em
execução sem Connection de alvo registra o momento como `Blocked`, e `Run now` sem alvo é recusado antes de criar uma
tentativa.

## Escreva um payload que possa terminar

Um bom prompt para CodingAgent informa objetivo, recursos do grafo, evidência esperada e condição de parada:

> Analise as falhas recentes de CI. Execute apenas as verificações relevantes no Terminal Checks, registre um resumo
> com evidências na Sticky Note Daily report e peça ao Reviewer uma avaliação independente. Não altere código antes
> de registrar a causa provável e pare se a correção exigir ampliar o escopo da Specification.

Um bom comando para Terminal é explícito, não interativo e deixa um resultado observável:

```sh
pnpm test -- --runInBand
```

O payload não substitui Connections. Mencionar uma Sticky Note, File ou Specification não concede acesso se o Node
não estiver no componente alcançável do CodingAgent.

## Recorrência sem esconder o calendário

O editor oferece atalhos para os casos comuns:

- `Once`;
- `Hourly`;
- `Daily`;
- `Weekdays`;
- `Weekly`;
- `Monthly`;
- `Custom` para uma expressão cron avançada.

Os atalhos e o editor avançado alteram a mesma expressão; não existem dois agendamentos paralelos que possam divergir.
O intervalo mínimo é de um minuto. Uma recorrência que cron não representa corretamente, como “a cada duas semanas a
partir desta data”, não deve ser aproximada com uma expressão enganosa.

O Kavor salva uma zona IANA explícita e mostra as próximas ocorrências na zona local da máquina que apresenta o
Canvas. A zona não é um campo editável na interface; ela é estampada a partir do host quando a configuração é salva.
Confira sempre o preview antes de usar `Resume`.

Em mudanças de horário de verão, uma sobreposição local dispara uma vez. Um horário inexistente no avanço do relógio
é deslocado para o primeiro instante local válido, em vez de desaparecer silenciosamente. No preset mensal, um dia
que não existe naquele mês é pulado; dia 31, por exemplo, não executa em fevereiro.

## Pause, Resume e Run now são coisas diferentes

- **Pause** interrompe novas ocorrências imediatamente. O tempo pausado não produz tentativas nem registros `Missed`.
- **Resume** volta a considerar somente ocorrências futuras. Ele exige payload válido; uma execução única também
  precisa continuar no futuro.
- **Run now** cria uma tentativa manual independente. Funciona enquanto o Schedule está pausado e não desloca a
  próxima ocorrência da recorrência.

`Run now` é útil para validar o payload e o alvo antes de liberar o relógio. Ele não é um retry automático de uma
tentativa anterior e não altera o estado Paused ou Running.

Uma execução `Once` volta para Paused depois que seu instante é consumido. O histórico permanece e `Run now` continua
disponível.

## O que acontece quando chega a hora

O Kavor registra uma tentativa durável para o instante e arbitra a entrega junto com mensagens já aceitas pelo alvo.
A tentativa pode passar por `Pending` e `Delivering` antes do resultado observado.

O histórico distingue situações diferentes:

- **Completed** — o Kavor observou a conclusão;
- **Needs attention** — o CodingAgent pediu intervenção e ainda pode concluir depois;
- **Fired** — a entrega ocorreu, mas aquele caminho não oferece conclusão observável;
- **Failed** — houve uma falha observável;
- **Interrupted** — a entrega começou, mas foi interrompida antes de um resultado confiável;
- **Blocked** — o alvo ou Workspace não estava disponível no momento da entrega;
- **Missed** — o instante passou enquanto o runtime não podia reivindicá-lo;
- **Coalesced** — outra tentativa já ocupava o único slot pendente daquele alvo.

Horário programado não é evidência de execução. Consulte a última apresentação no Node e abra o histórico para ver
horário nominal, entrega, resultado e diagnóstico disponível.

## Quando a máquina dorme ou o Kavor não está aberto

Schedules dependem do runtime local. O Kavor precisa estar em execução, a máquina precisa estar acordada, o usuário
precisa estar autenticado e a sessão do alvo precisa estar ativa.

Se uma ou várias ocorrências passam durante uma indisponibilidade, o Kavor registra somente a ocorrência perdida mais
recente daquele Schedule, em vez de criar milhares de linhas depois de uma ausência longa. Ele não executa o trabalho
de surpresa ao voltar. A interface informa `Missed` e oferece uma ação explícita equivalente a `Run now`.

Não existe catch-up automático nem retry de efeitos externos. Essa escolha evita que um comando antigo execute fora
de contexto sem você perceber.

## Quando o alvo já está ocupado

O Schedule mantém no máximo uma tentativa pendente enquanto o alvo trabalha. Novas ocorrências que chegam com esse
slot ocupado são registradas como `Coalesced` e não serão entregues depois.

Esse limite impede que um agente ou Terminal acorde para processar uma fila antiga sem controle. Se a tarefa pode
durar mais que a recorrência, aumente o intervalo ou faça o próprio alvo reconciliar o estado atual de forma
idempotente.

## Limites que você deve assumir

- um Schedule possui no máximo um alvo direto;
- o alvo precisa ser um CodingAgent ou Terminal;
- o Schedule não inicia uma sessão que você fechou deliberadamente;
- ele não amplia o grafo, permissões ou Guardrails do alvo;
- ele não substitui critérios de aceite nem decide se o resultado está correto;
- ele faz no máximo uma tentativa automática de entrega por tentativa registrada;
- ele não promete efeito externo exatamente uma vez;
- ele não acumula todas as ocorrências perdidas ou coalescidas para executar depois.

Se o trabalho exige fan-out, aprovação em etapas, compensação ou orquestração transacional, não esconda isso dentro
de um Schedule. Modele responsabilidades no grafo e mantenha a decisão humana explícita.

## Checklist antes de usar Resume

- o payload descreve objetivo, evidência e condição de parada?
- `Next occurrences` corresponde ao horário que você espera?
- a zona exibida é a correta para esta máquina?
- existe exatamente uma Connection de alvo?
- a sessão do alvo deve permanecer ativa naquele horário?
- o grafo contém somente o contexto e as capacidades necessários?
- repetir o trabalho é seguro caso um efeito externo já tenha acontecido?
- você sabe onde consultar o resultado e o histórico?

## Continue

- Consulte a [matriz de Connections](./connections.md) para revisar o contrato do alvo.
- Entenda [como CodingAgents enxergam e constroem o Canvas](./coding-agents-and-canvas.md).
- Use [CodingAgents e papéis](./agents-and-roles.md) para separar manutenção, revisão e decisão.
