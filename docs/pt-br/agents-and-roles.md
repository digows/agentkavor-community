---
id: agents-and-roles
title: Como escolher CodingAgents e definir papéis no Kavor
description: Aprenda a dividir o trabalho entre CodingAgents, preservar contexto compartilhado e escolher provider, modelo e effort para cada responsabilidade.
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/pt-br/docs/agents-and-roles
---

# Como escolher CodingAgents e definir papéis no Kavor

Escolher um CodingAgent não começa pelo provider. Começa pela responsabilidade que ele deve assumir.

Uma única sessão pode analisar o problema, escrever a Specification, implementar, revisar e preparar a entrega. Isso
parece simples porque há menos participantes, mas concentra objetivos diferentes na mesma janela de contexto. A
implementação passa a carregar toda a investigação anterior, a revisão herda as mesmas premissas de quem escreveu o
código e a preparação da entrega compete por atenção com decisões que já deveriam estar preservadas fora da sessão.

No Kavor, você pode dividir essas responsabilidades entre CodingAgents sem transformar o trabalho em chats isolados.
Os participantes formam um grafo ao redor de recursos duráveis, como Specifications, Files e Sticky Notes. As
Connections tornam o contexto e as capacidades visíveis; qualquer CodingAgent pode trabalhar com os Nodes
alcançáveis em seu componente e conversar com outros CodingAgents desse mesmo grafo. As mensagens permitem handoffs
e discussões, e a decisão final continua com você.

[![Spec Writer, Builder, Reviewer e Shipper conectados em um Canvas do Kavor](https://agentkavor.com/kavor-agents-and-roles-article.jpg)](https://agentkavor.com/pt-br/videos/agents-and-roles)

[Veja quatro papéis formando um grafo de trabalho →](https://agentkavor.com/pt-br/videos/agents-and-roles)

## Comece pelo trabalho, não pelo agente

Antes de adicionar um CodingAgent ao Canvas, escreva em uma frase por que ele existe. Uma boa definição contém:

- uma responsabilidade principal;
- o contexto necessário para cumpri-la;
- o resultado que deve produzir;
- a condição em que deve parar.

`Revisar o código` ainda é amplo. `Comparar a implementação com os critérios da Specification, registrar findings e
parar antes de alterar o código` define um papel verificável.

O mesmo provider pode ocupar papéis diferentes em sessões separadas. Providers diferentes também podem cumprir o
mesmo papel. O papel pertence ao trabalho; o provider, o modelo e o effort são configurações escolhidas para executá-lo.

## Quatro papéis úteis

Nem toda tarefa precisa dos quatro papéis abaixo. Eles são fronteiras para raciocinar sobre o trabalho, não uma cota
de agentes.

| Papel | Pergunta principal | Contexto essencial | Resultado esperado |
| --- | --- | --- | --- |
| **Analista ou Spec Writer** | O que precisa mudar e quais limites devem permanecer? | Problema, restrições, decisões e comportamento existente | Uma Specification clara, com escopo e critérios verificáveis |
| **Implementer** | Como produzir a mudança dentro do contrato? | Specification, Files relevantes, Terminal e convenções do Workspace | Implementação acompanhada de verificações e evidências |
| **Reviewer** | O que está incorreto, incompleto ou arriscado? | Specification, alterações e resultados das verificações | Findings concretos ou uma revisão sem bloqueios identificados |
| **Shipper** | O trabalho está pronto para ser entregue com segurança? | Specification, revisão, estado do Git e requisitos de release | Preparação da entrega, riscos restantes e evidência para a decisão humana |

Para uma correção pequena, um Implementer e sua revisão humana podem bastar. Para uma alteração com risco maior, a
separação entre Specification, implementação, revisão e entrega reduz a chance de uma única linha de raciocínio
controlar o ciclo inteiro.

Separar papéis não exige necessariamente providers diferentes. Duas sessões do mesmo provider já isolam objetivos e
contextos. Combinar providers pode acrescentar outra perspectiva e reduzir pontos cegos correlacionados, mas não
substitui critérios de aceite nem garante uma revisão melhor.

## O grafo é a memória compartilhada

Dividir o trabalho não deveria exigir copiar e colar o mesmo prompt em várias sessões. No Kavor, o contexto comum fica
em Nodes duráveis:

- a **Specification** preserva intenção, escopo e critérios;
- os **Files** mantêm as fontes relevantes no fluxo;
- a **Sticky Note** registra observações e decisões de trabalho;
- o **Terminal** fornece o ambiente em que comandos e verificações são executados;
- os **CodingAgents** assumem responsabilidades distintas ao redor desses recursos.

Essa memória compartilhada não é um único histórico de conversa crescendo indefinidamente. É um conjunto explícito
de recursos que os participantes podem consultar e atualizar quando existe um caminho de Connections até eles. A
Connection não precisa ser direta. Se houver um Guardrail na Connection direta entre um CodingAgent e um recurso,
porém, a restrição continua valendo para esse par mesmo que o grafo ofereça outra rota. Quando uma sessão termina, a
Specification, os Files, as notas e as evidências continuam no Workspace.

Um grafo de implementação, revisão e entrega pode ser pensado assim:

```text
Specification
    ├── Spec Writer
    ├── Implementer ↔ Reviewer
    └── Shipper

Contexto durável: Files · Sticky Note · Terminal · outputs da Specification
```

Essa representação mostra a divisão de responsabilidade, não a direção das Connections. Connections não executam
uma sequência automaticamente; elas formam o componente alcançável que compartilha contexto e tornam relações,
limites e capacidades inspecionáveis no Canvas. Não é necessário ligar cada agente diretamente a cada recurso.

## Divida também a janela de contexto

Cada papel precisa de uma parte diferente do problema. O Spec Writer pode precisar explorar alternativas e
restrições. O Implementer precisa do contrato aceito, dos arquivos relevantes e das convenções do código. O Reviewer
precisa dos critérios, do diff e das evidências — não de toda a conversa que levou o Implementer até a solução.

Essa divisão melhora a relação entre contexto útil e contexto total:

- cada CodingAgent recebe um objetivo mais estreito;
- recursos comuns ficam no Workspace, em vez de serem repetidos em prompts;
- detalhes são consultados quando necessários;
- a revisão parte do contrato e do resultado, não da justificativa acumulada pelo autor;
- uma sessão longa deixa de carregar etapas que já terminaram.

A redução de uso de tokens pode ser um bônus, não uma promessa. Um grafo bem dividido evita contexto repetido ou
irrelevante; um grafo com agentes demais, mensagens redundantes e papéis vagos pode consumir mais. O objetivo não é
maximizar o número de CodingAgents. É dar a cada token uma responsabilidade mais clara.

## Escolha provider, modelo e effort depois do papel

Com a responsabilidade definida, configure a sessão de acordo com a tarefa. Use os controles nativos do provider
para escolher modelo e effort quando eles estiverem disponíveis.

Considere quatro fatores:

1. **Ambiguidade:** a tarefa exige descobrir o problema ou apenas executar um contrato claro?
2. **Risco:** uma falha seria local e reversível ou afetaria segurança, dados, arquitetura ou release?
3. **Uso de ferramentas:** o papel precisa explorar código, executar comandos ou principalmente analisar evidências?
4. **Custo de coordenação:** uma sessão mais forte resolve o papel com menos handoffs, ou uma segunda perspectiva é
   necessária?

Um effort maior costuma fazer mais sentido para Specification ambígua, decisões arquiteturais e revisões de alto
risco. Tarefas mecânicas e bem delimitadas podem funcionar com modelos mais rápidos ou effort menor. Implementação
varia conforme o tamanho da mudança e a necessidade de navegar e testar o código.

Não transforme essas orientações em associações permanentes. `Provider A sempre implementa` e `Provider B sempre
revisa` substituem uma decisão de engenharia por hábito. Reavalie a configuração para cada papel e aprenda com a
qualidade das evidências produzidas.

## Use conversas para handoffs e trabalho paralelo

CodingAgents no mesmo grafo não precisam trabalhar em silêncio nem ter uma Connection direta entre si. Qualquer par
alcançável pode trocar mensagens. Use as mensagens do Kavor quando um agente precisa:

- entregar uma implementação para revisão;
- pedir esclarecimento a quem escreveu a Specification;
- discutir um finding antes de registrá-lo como bloqueio;
- devolver uma correção para nova verificação;
- coordenar investigações independentes que podem acontecer em paralelo.

Uma boa mensagem informa:

- o objetivo do handoff;
- quais recursos do grafo contêm o contexto;
- o que já foi feito e verificado;
- qual ação o destinatário deve executar;
- onde o resultado precisa ser preservado.

As conversas são assíncronas e inspecionáveis. Elas não substituem memória durável. Uma decisão que precisa sobreviver
ao handoff deve voltar para a Specification, para uma Sticky Note ou para outro output apropriado; não deve ficar
escondida apenas na troca de mensagens.

Paralelize somente trabalhos que possam avançar sem disputar a mesma decisão ou alterar a mesma superfície. Dois
agentes podem investigar hipóteses diferentes ou revisar aspectos independentes. Dois Implementers alterando os
mesmos arquivos sem uma divisão explícita geralmente criam mais reconciliação do que velocidade.

## O que evitar

### Concentrar o ciclo inteiro em uma sessão

Análise, Specification, implementação, revisão e release têm perguntas e critérios diferentes. Reutilizar uma sessão
para tudo conserva também suas premissas, distrações e pontos cegos.

### Criar um agente para cada subtarefa

Separação sem responsabilidade independente adiciona mensagens, contexto duplicado e custo de coordenação. Se você
não consegue descrever um resultado e uma condição de parada distintos, provavelmente não precisa de outro
CodingAgent.

### Usar a mesma configuração por conveniência

Modelo e effort insuficientes degradam tarefas ambíguas ou críticas. Configurações excessivas desperdiçam tempo e
tokens em trabalho mecânico. Escolha a configuração pelo risco e pela natureza do papel.

### Pedir que o Implementer revise a própria linha de raciocínio

Auto-revisão pode encontrar erros simples, mas não cria independência. Quando uma segunda perspectiva importa, use
outra sessão com critérios explícitos e acesso ao resultado verificável.

### Manter os agentes isolados

Copiar mensagens manualmente entre sessões fragmenta proveniência e esconde o handoff. Use as conversas do Kavor para
revisões, esclarecimentos e coordenação de trabalho paralelo.

### Deixar decisões apenas nas mensagens

Mensagens coordenam participantes. Specifications, Sticky Notes e outputs preservam o que o Workspace precisa
lembrar.

## Três desenhos para começar

### Mudança pequena

Use uma Specification, um Implementer e um Reviewer. Conecte ambos ao contexto necessário e preserve implementação e
revisão em uma Sticky Note ou nos outputs da Specification. Esse é o menor desenho útil; o vídeo desta página mostra como a mesma lógica cresce até o Shipper sem perder o contexto.

### Mudança de alto risco

Separe Spec Writer, Implementer, Reviewer e Shipper. Dê ao Reviewer critérios explícitos e independência para
questionar a implementação. O Shipper prepara a evidência de entrega, mas não substitui sua decisão de publicar.

### Investigação paralela

Use dois CodingAgents para explorar hipóteses ou áreas diferentes, com um terceiro papel responsável por reconciliar
os resultados. Defina antes onde cada descoberta será registrada e use mensagens para dúvidas e handoffs.

## Checklist antes de iniciar

Para cada CodingAgent, confirme:

- consigo descrever seu papel em uma frase?
- ele tem um resultado observável e uma condição de parada?
- o componente alcançável disponibiliza o contexto e as capacidades necessários, sem recursos acidentais?
- provider, modelo e effort combinam com ambiguidade e risco?
- está claro com quem ele deve conversar e para quê?
- decisões e evidências serão preservadas fora da conversa?
- adicionar este CodingAgent melhora independência, paralelismo ou qualidade o suficiente para pagar a coordenação?

Um bom Canvas não é o que contém mais agentes. É o que deixa responsabilidade, contexto, handoffs, evidência e decisão
claros para todos os participantes — inclusive você.

Monte essa estrutura na prática em [Como fechar seu primeiro loop no Kavor](./first-loop.md), entenda
[como CodingAgents enxergam e constroem o Canvas](./coding-agents-and-canvas.md) ou revise os conceitos em
[O que é o Kavor?](./what-is-kavor.md).

