---
id: coding-agents-and-canvas
title: Como CodingAgents enxergam e constroem o Canvas
description: Entenda contexto alcançável, mensagens entre agentes e edição atômica do Canvas com limites controlados por você.
kind: guide
lastReviewedAt: 2026-10-29
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

Em cada nova interação, o Kavor entrega ao CodingAgent um contexto compacto para o pedido atual: sua identidade, o
estado necessário do componente alcançável, Guardrails ativos e referências para consultar o restante sob demanda.
Quando a estrutura muda durante o trabalho, o Kavor informa que o estado deve ser lido novamente.

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
- CodingAgents informam estado e fatos de trabalho; mensagens e turnos concluídos da sessão provider-native são
  consultados quando úteis.

Conteúdo grande ou vivo não é despejado inteiro na janela de contexto. O agente recebe uma referência clara para
consultá-lo. Isso preserva espaço para raciocínio e mantém Files, Specifications e Terminals em suas fontes reais.

A leitura da sessão de outro CodingAgent é passiva e paginada. Ela não envia input ao provider nem acorda o peer.
Quando o outro agente precisa receber o contexto, agir ou responder, use uma mensagem.

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

### Escolha a entrega pelo efeito desejado

- Para uma revisão que pode esperar, use **After turn**: o pedido aguarda o destinatário ficar disponível.
- Para coordenação normal, use **Native input**: o provider decide como incorporar a entrada. Isso não garante
  ausência de interrupção.
- Para uma mudança explícita de direção, **Send now** pode interromper o trabalho quando o provider e os Guardrails
  permitem. Diga o que foi substituído, o que deve parar e qual é a próxima ação. Interromper não desfaz efeitos.

Uma mensagem aceita ou enfileirada ainda não prova que o outro agente a leu ou executou. Rascunhos e aprovações
humanas continuam protegidos; não tente contornar uma entrega retida por outro caminho.

O modo padrão e as restrições são configurados na Connection direta entre os agentes. Consulte a
[referência de Connections](./connections.md) para os controles e Guardrails, sem confundir mensagens com leitura
passiva do histórico.

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

- criar Nodes ativos, incluindo CodingAgent, Specification, Sticky Note, Terminal, File, WebBrowser e Schedule;
- criar uma Specification canônica e materializá-la no Canvas;
- adicionar Connections suportadas;
- alterar parâmetros de Connections com Terminal;
- remover Connections;
- remover Nodes alcançáveis, encerrando sua execução quando necessário;
- renomear Nodes alcançáveis e Specifications;
- configurar um Schedule alcançável;
- mover, redimensionar e revelar Nodes.

Com a opção desligada, alterações estruturais são recusadas. O agente deve informar que a configuração está desativada
e não insistir. Layout continua disponível porque mover um Node não amplia autoridade nem altera conteúdo.

Essa opção também é necessária quando um CodingAgent inicia, reinicia, encerra ou faz Fork de outro CodingAgent
alcançável. Essas ações seguem o pedido autorizado; não aprovam mensagens retidas nem respondem diálogos humanos.

Remover um Node retira sua presença e suas Connections do Canvas; não equivale a apagar o File ou a Specification
canônica nem a remover um Git worktree. Se o encerramento necessário falhar, o Kavor informa a falha para recuperação,
em vez de declarar que a exclusão terminou normalmente.

## Delegue a uma sessão realmente pronta

Criar um CodingAgent, disponibilizar seu diretório e entregar uma mensagem são passos diferentes. Um Node criado ou
uma mensagem enfileirada ainda não provam que o provider iniciou nem que o trabalho foi executado.

Para delegar trabalho em um worktree:

1. prepare o worktree com Git e confira os requisitos específicos do projeto;
2. crie o CodingAgent associado àquela raiz e conecte-o ao contexto necessário;
3. confira seu estado de inicialização e de prontidão antes de anunciar um handoff concluído;
4. envie uma tarefa com resultado esperado e condição de parada;
5. inspecione a entrega e a resposta em `Messages`.

Quando houver falha, o agente que coordena deve consultar o estado do destinatário e relatar a etapa e o erro
disponíveis. Corrija a causa antes de Start ou Retry. Não crie outro Node apenas para esconder a tentativa que falhou,
nem reenvie uma tarefa só porque a resposta ainda não chegou.

Start e Restart aguardam a prontidão da interface nativa; isso não significa aprovação de uma ação, sucesso da tarefa
ou autorização para publicar. Fork depende de histórico e suporte reais do provider. Veja os
[controles de sessão, worktrees e Fork](./coding-agent.md#inicie-reinicie-ou-encerre-a-execução).

## Estrutura segue o grafo, não o Workspace inteiro

Um CodingAgent pode alterar estruturalmente:

- Nodes e Connections de seu componente alcançável;
- Nodes que ele criou antes, na mesma alteração atômica.

Isso permite criar um Node e conectá-lo imediatamente sem deixar lixo no Canvas. Também permite que um agente ainda
isolado crie recursos novos e conecte a si mesmo no mesmo lote.

O primeiro vínculo com um Node preexistente fora do grafo continua sendo seu. O agente não pode usar a visão de
layout do Workspace para se anexar a um recurso que você nunca tornou alcançável.

Uma Connection direta entre CodingAgent e WebBrowser dá acesso mediado às páginas vivas daquele navegador. A página
pode continuar ativa enquanto você troca de Workspace e voltar no mesmo estado; alcance do grafo, autenticação e
limites humanos continuam valendo.

## As mudanças são atômicas

Quando o CodingAgent monta uma estrutura, o Kavor valida o conjunto completo e aplica as alterações em ordem como uma
unidade. Se uma etapa falha, nenhuma alteração estrutural anterior do lote permanece.

Isso resolve um caso comum: criar um Terminal e conectá-lo ao agente deve resultar nos dois, ou em nenhum. O Canvas
não fica com um Node órfão porque a Connection final era inválida.

O resultado devolvido ao agente contém a forma realmente persistida. Ele deve lê-lo em vez de presumir que defaults,
geometria e caminhos canônicos ficaram idênticos ao pedido.

A atomicidade estrutural não promete desfazer comandos externos ou reabrir processos que já foram encerrados.
Confira os erros de execução e recuperação antes de continuar o trabalho.

## O que continua humano

`Allow workspace editing` não entrega controle irrestrito. Um CodingAgent não pode:

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

Cole em um CodingAgent do Workspace e descreva a tarefa que deseja organizar. Este primeiro pedido é somente de explicação.

```prompt
Consulte a documentação oficial do Kavor e o grafo atual. Explique a menor estrutura que resolve esta tarefa, quais
Nodes serão alcançáveis e quais limites permanecem. Não altere o Canvas ainda.
```

**Resultado esperado:** Uma proposta identifica recursos, Connections e limites sem alterar o Canvas. A visão de layout não concede acesso ao conteúdo fora do grafo.

### Monte um loop revisável

Descreva uma tarefa pequena antes do pedido. Ative `Allow workspace editing` no CodingAgent se quiser autorizar a criação da estrutura; não é necessário ativar essa opção para pedir apenas uma explicação.

```prompt
Monte um loop pequeno para esta tarefa com uma Specification, um Builder, um Reviewer e uma Sticky Note. Use o
menor número de Connections necessário, crie e conecte os novos Nodes em uma única alteração atômica e pare antes
de iniciar a implementação para eu revisar o Canvas.
```

**Resultado esperado:** Um loop conectado fica disponível para sua revisão, ou o agente informa a restrição que impediu a criação. Nenhuma implementação deve começar com este pedido.

### Organize sem ampliar acesso

Cole no CodingAgent do Workspace cujo Canvas deseja organizar. O pedido autoriza reposicionar visualmente, não mudar o acesso dos participantes.

```prompt
Organize visualmente este Canvas para deixar intenção, implementação, revisão e evidência fáceis de ler. Não crie
nem remova Connections, não altere Guardrails e não assuma acesso ao conteúdo de Nodes fora do seu grafo.
```

**Resultado esperado:** O layout fica mais legível, preservando Connections, Guardrails e a fronteira de conteúdo alcançável.

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
