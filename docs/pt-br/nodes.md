---
id: nodes
title: Nodes do Kavor
description: Entenda o que CodingAgent, Specification, Sticky Note, Terminal, File e Trigger fazem sozinhos e o que ganham quando conectados.
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/pt-br/docs/nodes
---

# Um Node é útil sozinho. Um grafo transforma trabalho em sistema.

O Kavor não pede que você abandone seu coding agent favorito, esconda o terminal ou transforme toda decisão em
mais um chat. Ele coloca participantes, ferramentas e contexto no mesmo Canvas para que você consiga ver quem está
trabalhando, com o quê e sob quais limites.

Cada item de primeira classe desse Canvas é um **Node**. Um CodingAgent é um Node. Uma Specification também. Sticky
Notes, Terminals, Files e Triggers ocupam o mesmo espaço porque todos podem participar do trabalho — cada um com uma
responsabilidade diferente.

Sozinho, um Node já tem utilidade. Quando você cria uma **Connection**, ele passa a participar de um componente
alcançável. Nesse grafo, CodingAgents podem trabalhar com contexto, execução, memória e colaboradores a qualquer
distância — sem depender de uma Connection direta para cada recurso.

Esse é o modelo:

**Node → Connection → grafo → decisão humana**

A sequência descreve como o trabalho ganha estrutura. Connections não são setas persistidas nem uma automação que
executa a próxima caixa. Elas são relações visíveis entre Nodes.

![CodingAgents, Specification, Sticky Note, Terminal, File e Trigger conectados no Canvas do Kavor](https://agentkavor.com/kavor-nodes-and-connections-article.jpg)

*Um Canvas pode combinar intenção durável, memória compartilhada, execução, arquivos e uma causa agendada sem
esconder os participantes nem suas Connections.*

## O que uma Connection realmente muda

Uma Connection responde primeiro a uma pergunta prática: **de qual grafo esses Nodes participam?**

Qualquer CodingAgent pode trabalhar com os Nodes alcançáveis por esse grafo e conversar com outros CodingAgents do
mesmo componente. A Connection direta ainda pode ter um contrato próprio: selecionar o alvo de um Schedule, entregar
ao Terminal o caminho canônico de um File ou Specification e carregar um Guardrail entre um CodingAgent e um recurso.

Ao mesmo tempo, a Connection estabelece um limite:

- Nodes próximos no Canvas não ganham acesso uns aos outros;
- mencionar um Node em uma mensagem não concede capacidade;
- nem toda combinação entre Nodes aceita uma Connection direta, embora pares não suportados possam participar do
  mesmo grafo por rotas válidas;
- um Guardrail restringe somente o par direto onde foi colocado e continua valendo mesmo quando há outra rota;
- o grafo torna o contexto alcançável, mas não aprova ações automaticamente.

O resultado é menos mágico e mais útil: você consegue inspecionar a estrutura antes, durante e depois do trabalho.

## Os seis Nodes

### CodingAgent: seu harness favorito como participante do grafo

Um CodingAgent é o provider nativo que você já usa, executado em sua própria interface de terminal. Em vez de
substituir Claude Code, Codex ou Google Antigravity por um chat genérico, o Kavor preserva a experiência de cada
harness e o coloca no Canvas.

Cada CodingAgent pode ter um papel claro. O harness preserva suas opções nativas de provider, modelo e nível de
esforço quando oferece essas capacidades. Você pode manter um Spec Writer concentrado em perguntas e decisões, um
Builder focado em implementação e um Reviewer responsável por desafiar o resultado.

CodingAgents que pertencem ao mesmo componente alcançável podem trocar mensagens assíncronas, mesmo sem uma
Connection direta entre eles. Você continua enxergando essas conversas no painel de Messages e pode intervir quando
necessário. Specifications, Files, Sticky Notes e Terminals alcançáveis deixam claro quais recursos participam
daquele trabalho.

É o mesmo harness — agora com contexto e capacidades visíveis.

### Specification: intenção que sobrevive à sessão

Uma Specification registra decisões, escopo, restrições e critérios de aceite em Markdown durável. Ela pode descrever
a fundação de uma arquitetura, uma integração, a modelagem de um domínio, uma feature, um módulo ou uma sequência
delimitada de correções.

Você pode escrevê-la manualmente ou coescrevê-la com um CodingAgent. Para assuntos difíceis, vale investir o melhor
raciocínio disponível antes da implementação. Pensar com profundidade aqui costuma custar menos do que corrigir
ambiguidades depois.

Specifications possuem lifecycle. **Draft** é espaço para investigar e decidir. **Ready** sinaliza que o contrato pode
ser implementado. **In progress**, **Blocked** e **Done** mantêm o estado do trabalho visível. **Done** só faz sentido
quando os critérios de aceite realmente foram atendidos.

Conectada a agentes com papéis distintos, a mesma Specification pode orientar quem escreve, quem implementa e quem
revisa — sem depender da memória de uma única conversa.

### Sticky Note: memória de trabalho compartilhada

Uma Sticky Note é um post-it no Canvas. Você pode escrever perguntas, hipóteses, decisões temporárias, findings e
próximos passos como faria em qualquer nota rápida.

Conectada a um CodingAgent, ela ganha uma segunda mão. O agente pode manter a nota junto com você: compilar decisões
em aberto durante uma Specification, registrar algo que merece sua atenção durante a implementação ou responder
“o que você já fez, está fazendo e fará depois?” sem enterrar esse estado no histórico do chat.

Sticky Notes funcionam bem como memória informal e visível. Quando uma decisão se torna um contrato durável para
implementação e manutenção futura, ela deve ser promovida para uma Specification, não ficar escondida para sempre
em uma nota.

### Terminal: execução que continua visível

Um Terminal mantém o shell dentro do mesmo Workspace visual. Você pode navegar entre terminais, acompanhar um log,
executar verificações ou permanecer conectado a uma máquina remota sem perder o Canvas ao redor.

Quando um CodingAgent está conectado, vocês podem trabalhar no mesmo Terminal. O agente pode inspecionar output,
executar comandos quando permitido, acompanhar uma execução correlacionada e ajudar em um diagnóstico. A entrada
humana continua tendo prioridade, e um Guardrail pode manter a Connection somente para leitura.

Files e Specifications também podem fornecer seus caminhos ao Terminal por variáveis de ambiente. Um Trigger pode
entregar um comando agendado diretamente a uma sessão ativa do shell.

O Terminal não esconde a execução atrás de uma automação opaca. Processo, comando e resultado permanecem visíveis.

### File: um arquivo que participa do Canvas

Um File é um arquivo. O ganho está em tornar sua fonte canônica visível e explícita no grafo.

Conectado a um CodingAgent, ele pode delimitar o arquivo que deve ser lido, revisado ou alterado. No Canvas, também
pode manter um texto, uma imagem ou um PDF à vista enquanto você organiza o restante do trabalho.

Conectado a um Terminal, o caminho absoluto do File pode ser exposto por uma variável de ambiente. Isso permite usar
visualmente um script, um arquivo SQL, uma configuração ou outro material como entrada de um comando sem copiar
caminhos entre janelas.

O File não vira um attachment descartável. Ele continua sendo a fonte real no filesystem.

### Schedule: uma causa visível de atividade

Schedule é a fonte de Trigger disponível no Kavor. Ele agenda uma ação no tempo: pode entregar um comando a um
Terminal, como um cron do sistema operacional, ou enviar um prompt claro a um CodingAgent com sessão ativa.

Seu valor cresce quando o alvo já está conectado a outros Nodes. Um Trigger pode acordar um agente responsável por
inspecionar um File, executar verificações em um Terminal, escrever um relatório em uma Sticky Note e pedir uma
revisão independente a outro CodingAgent.

É assim que um horário no calendário pode dar origem a um pequeno sistema autônomo ou semiautônomo. O Trigger inicia
a atividade; o grafo fornece contexto, ferramentas, memória e colaboração.

O Schedule não decide sozinho o que vale a pena fazer, não amplia permissões, não inicia uma sessão que você manteve
desligada e possui apenas um alvo direto: um CodingAgent ou um Terminal.

## Quando os Nodes formam um grafo

O valor do Canvas aparece quando cada Node possui uma responsabilidade e as Connections expressam uma necessidade
real. Três grafos mostram essa progressão.

### Da intenção à revisão

**Specification → Builder → Reviewer → decisão humana**

A Specification mantém o contrato. O Builder implementa. O Reviewer compara o resultado com os critérios de aceite.
Uma Sticky Note preserva findings e decisões de trabalho; um Terminal fornece evidências como testes e verificações.

As Connections não executam essa sequência automaticamente. Elas tornam os participantes e as capacidades necessárias
alcançáveis dentro do mesmo grafo.

### Manutenção programada

**Trigger → Maintainer**

O Maintainer está conectado a um File com os dados de entrada, a um Terminal para executar verificações, a uma Sticky
Note para registrar o relatório e a um Reviewer para uma avaliação independente.

O Trigger entrega o prompt no horário configurado quando o Kavor está em execução e a sessão do alvo está ativa. O
CodingAgent trabalha com o contexto e os limites que já possuía. Você pode acompanhar resultados, mensagens e
evidências quando voltar ao Workspace.

### Comando operacional supervisionado

**Trigger → Terminal**

Um File contendo SQL ou um script fornece seu caminho ao Terminal por uma variável de ambiente. O Trigger entrega o
comando agendado à sessão ativa. Um CodingAgent conectado ao Terminal pode ajudar a analisar o resultado, enquanto
você mantém visibilidade sobre o processo.

Esse grafo automatiza uma causa e uma execução sem fingir que o sistema conhece sozinho o significado de sucesso.

## Comece pelo trabalho, não pela quantidade de Nodes

Um Canvas maior não é automaticamente melhor. Comece pela menor estrutura que torna o resultado verificável:

1. defina o que precisa acontecer;
2. adicione uma Specification quando houver decisões, escopo ou critérios que precisam sobreviver;
3. escolha um CodingAgent e dê a ele um papel claro;
4. conecte um File quando o escopo concreto precisa ficar explícito;
5. conecte um Terminal quando a tarefa exige execução ou evidência;
6. use uma Sticky Note quando humano e agente precisam manter memória de trabalho compartilhada;
7. adicione outro CodingAgent quando uma revisão independente ou trabalho paralelo realmente melhorar o resultado;
8. adicione um Trigger quando o tempo for uma causa legítima da atividade.

O objetivo não é preencher o Canvas. É construir um sistema pequeno o bastante para ser compreendido e completo o
bastante para preservar intenção, execução, evidência e decisão.

## Continue

- Consulte a [matriz de Connections suportadas](./connections.md) para saber exatamente o que cada combinação permite.
- [Feche seu primeiro loop](./first-loop.md) com uma Specification, dois CodingAgents e uma Sticky Note.
- Veja [como escolher CodingAgents e papéis](./agents-and-roles.md) para separar formulação, implementação, revisão e
  entrega.
- Aprenda a usar [Schedule para dar um relógio ao seu grafo](./schedule.md).
- Entenda [como CodingAgents enxergam e constroem o Canvas](./coding-agents-and-canvas.md).
- Volte para [O que é o Kavor?](./what-is-kavor.md) para revisar o modelo completo do produto.
