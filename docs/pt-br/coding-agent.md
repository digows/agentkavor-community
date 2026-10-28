---
id: coding-agent
title: "CodingAgent no Kavor: seu harness favorito como parte de um grafo"
description: Escolha um provider, preserve sua experiência nativa e conecte o CodingAgent ao contexto, às ferramentas e aos participantes certos.
kind: guide
lastReviewedAt: 2026-10-28
canonicalUrl: https://agentkavor.com/pt-br/docs/coding-agent
---

# CodingAgent no Kavor: seu harness favorito como parte de um grafo

Um CodingAgent é o seu agente de programação executado na interface nativa do próprio provider, agora como um
participante visível do Canvas.

O Kavor não substitui cada harness por um chat genérico. Ele preserva a experiência do provider e acrescenta uma
estrutura ao redor dela: responsabilidade explícita, contexto alcançável, ferramentas, outros CodingAgents e limites
que você consegue inspecionar.

![Seletor de provider na toolbar do Kavor antes de adicionar um CodingAgent ao Canvas.](https://media.agentkavor.com/demos/coding-agent-provider-selector/poster.22c2dccb70c5.jpg)

[Veja a demonstração →](https://agentkavor.com/pt-br/videos/coding-agent-provider-selector)

## O que o CodingAgent possui

Cada CodingAgent representa uma sessão separada. O Node preserva a configuração e o estado necessários para executar
aquele papel, incluindo o provider escolhido e, quando o provider oferece essas opções, modelo, nível de esforço,
permissões e sessão nativa.

O provider é uma configuração do CodingAgent, não um tipo diferente de Node. O seletor reúne:

- Anthropic Claude Code;
- OpenAI Codex;
- Google Antigravity;
- xAI Grok;
- SST OpenCode.

Ao adicionar um CodingAgent pela toolbar, você escolhe primeiro o provider. Depois, configura aquela sessão de acordo
com o trabalho. As opções disponíveis podem variar porque o Kavor preserva as capacidades reais de cada harness em
vez de fingir que todos possuem o mesmo contrato.

## Contas, uso e rotação

Você pode acompanhar o uso dos providers no header e abrir o painel de **Accounts** para adicionar contas, escolher
quais participam de cada Workspace e usar seleção **Automatic** ou uma conta fixa. O login nativo continua disponível;
configurar outras contas é opcional e não substitui o login dos aplicativos do provider.

O [guia de CodingAgent Accounts](./coding-agent-accounts.md) explica as janelas de uso, a distribuição entre
Workspaces, a cópia inicial de preferências, a troca com continuidade da sessão e os limites de cada provider.

## O que ele faz sozinho

Sem nenhuma Connection, um CodingAgent ainda é uma sessão provider-native dentro do Workspace. Você pode conversar,
usar as ferramentas que o harness oferece e escolher seu diretório de trabalho. Esse diretório pode estar fora da
raiz do Workspace quando o papel exige outro repositório ou worktree; a associação permanece explícita na sessão.

O Node já ajuda a separar contextos: uma sessão pode investigar o problema enquanto outra implementa. Porém, sem um
grafo, o contexto compartilhado continua dependendo do que você fornecer dentro de cada conversa.

É a Connection que transforma a sessão isolada em participante de um sistema de trabalho.

### Fornecer um arquivo ou uma captura na entrada

Na sessão aberta, você também pode colar arquivos do clipboard do sistema ou imagens PNG/JPEG. O Kavor insere uma
referência ao arquivo, sem criar um File ou uma Connection no Canvas. Confira o caminho e escreva o pedido antes de
enviá-lo; interpretar a imagem continua dependendo das capacidades do harness.

O [guia do Terminal](./terminal.md#cole-arquivos-e-imagens-na-entrada-da-sessão) explica o procedimento, os limites e a
diferença entre uma referência colada e um recurso mantido no grafo.

## Inicie, reinicie ou encerre a execução

O Node e o processo do provider não são a mesma coisa. Você pode manter o CodingAgent no Canvas mesmo quando a
execução está encerrada.

- **Start** inicia uma sessão parada no diretório selecionado. Repetir Start em uma sessão em execução não cria
  outro processo.
- **Restart** encerra o processo atual e inicia sua substituição, mantendo a conta, a raiz de trabalho e a intenção
  de retomar a sessão nativa. Não é limpar o histórico nem desfazer alterações no projeto.
- **Shutdown** encerra a execução, sem excluir o Node ou o histórico nativo. Use Start quando quiser voltar a
  executá-lo.

O Kavor mostra as etapas de preparação e informa quando o provider está pronto ou quando a inicialização falhou.
Uma aprovação pendente continua sendo sua: iniciar ou reiniciar não autoriza o agente a respondê-la por você.

Se a inicialização falhar, leia o erro antes de repetir. Corrija o diretório ausente, a instalação, a autenticação
ou outro requisito indicado e use **Retry**. Uma tentativa nova não deve ser confundida com a sessão anterior nem
com a confirmação de que a tarefa foi executada.

## Separe o trabalho com Git worktrees

Uma nova conversa separa contexto. Um Git worktree separa também o checkout, com diretório, arquivos e index próprios.
Isso permite que dois CodingAgents trabalhem em branches diferentes sem trocar a branch do checkout compartilhado.

No controle **Git** do CodingAgent:

1. escolha a referência de base e um nome para o worktree;
2. use **Create** para criar o worktree gerenciado em `.worktrees/` e associá-lo àquele CodingAgent;
3. ou use **Use** em um worktree existente para selecionar seu diretório;
4. confira a raiz e a branch exibidas antes de pedir alterações ou commits.

Selecionar **Workspace root → Use** devolve o CodingAgent à raiz do Workspace; isso não remove o worktree anterior.
Criar ou selecionar um worktree para o agente não muda a branch, o index ou os arquivos do checkout compartilhado.
Operações posteriores de merge e limpeza são decisões separadas.

Ao mudar a associação Git de um CodingAgent em execução, o Kavor relança a sessão na raiz selecionada, preservando a
identidade nativa para retomada quando o provider permite. Uma sessão deliberadamente parada continua parada. Se a
retomada falhar, o erro permanece visível para correção e Retry; não trate a troca da raiz como prova de prontidão.

O worktree não é uma cópia completa do ambiente local. Dependências instaladas e arquivos não versionados, como
configurações locais, podem não existir nele. Prepare o que o projeto exige, sem copiar credenciais automaticamente.
Um caminho inexistente ou um worktree inválido deve ser corrigido antes da inicialização, não substituído
silenciosamente por outro diretório.

A remoção de um worktree é diferente de remover seu Node. O Kavor recusa remover ou finalizar um worktree ainda
referenciado por outro CodingAgent. Se a pasta foi removida fora do Kavor, revise o estado Git e recupere a associação
antes de continuar.

## Continue por outro caminho com Fork

**Fork** cria outro CodingAgent a partir do histórico nativo de uma sessão existente. A origem permanece independente;
o novo Node recebe outra identidade de sessão e uma Connection com quem solicitou o Fork.

Use-o para explorar uma alternativa sem recomeçar a conversa, ou separar uma investigação a partir de um contexto já
construído. Depois do Fork, defina o objetivo e a condição de parada do novo CodingAgent.

O suporte depende do provider e da versão instalada. Claude Code, Codex, Grok e OpenCode possuem integração de Fork;
Antigravity não oferece essa capacidade no Kavor. É necessário existir uma sessão nativa que possa ser bifurcada.
Quando o histórico não está disponível ou o provider não aceita a operação, o Kavor informa a falha em vez de
substituí-la por uma conversa vazia apresentada como Fork.

Fork não cria uma branch Git, não prepara dependências e não isola arquivos por si só. Por padrão, a nova sessão usa a
mesma raiz da origem; selecione um worktree separado quando a alternativa também precisar de isolamento de código.
Esse worktree deve estar preparado antes de ser usado. Copiar e colar um Node no Canvas também não substitui Fork:
a cópia não transporta o histórico nativo da sessão.

## Converse por Channels

Você também pode conversar com esse mesmo CodingAgent por um Channel, começando pelo WhatsApp. O agente continua no
desktop, usando o contexto e os limites do seu Workspace; a conversa remota não substitui o harness nem cria outro
agente na nuvem. Veja [Agent Kavor e Channels](./agent-kavor.md) para configurar a conversa e selecionar o destinatário.

Você pode pedir que o CodingAgent publique um resultado em uma conversa habilitada daquele Workspace, mesmo quando
o trabalho começou no desktop. Esse envio escolhe um destino explícito; não é uma mensagem para outro CodingAgent
nem uma transmissão para todos os Channels. Uma resposta a um pedido humano, por sua vez, mantém a conversa original.
Veja [como receber avisos sem iniciar outro pedido no WhatsApp](./agent-kavor.md#receba-avisos-sem-iniciar-outro-pedido-no-whatsapp).

O mesmo guia explica o preparo automático de áudio recebido, a preservação do original e os limites reais de imagens
e vídeos. Esses recursos não tornam todos os providers leitores universais de mídia nem contornam aprovações do desktop.

## O que ele ganha no grafo

Um CodingAgent pode trabalhar com qualquer Node alcançável por um caminho de Connections válidas em seu componente.
Nem todo recurso precisa estar diretamente ligado a ele.

As Connections diretas envolvendo CodingAgent possuem papéis específicos:

| Connection | O que acrescenta |
| --- | --- |
| **CodingAgent + Specification** | Coloca intenção, escopo e critérios duráveis no grafo. A Connection direta pode receber `specification_read_only`. |
| **CodingAgent + Sticky Note** | Acrescenta memória informal compartilhada para decisões abertas, progresso e findings. Pode receber `sticky_note_read_only`. |
| **CodingAgent + File** | Torna uma fonte canônica do filesystem explícita no trabalho. Pode receber `file_read_only`. |
| **CodingAgent + Terminal** | Permite executar comandos, acompanhar processos e consultar evidências no shell. Pode receber `terminal_read_only`. |
| **CodingAgent + WebBrowser** | Permite observar e operar as páginas reais daquele WebBrowser no mesmo estado visível ao humano. |
| **CodingAgent + CodingAgent** | Une participantes ao mesmo componente. CodingAgents alcançáveis podem trocar mensagens assíncronas e consultar o contexto necessário para coordenar o trabalho. |
| **Trigger + CodingAgent** | Seleciona aquela sessão ativa como alvo direto de um prompt agendado. O Trigger não inicia uma sessão que você fechou. |

Alcance não elimina contratos diretos. Se a Connection exata entre um CodingAgent e um recurso possui um Guardrail,
essa restrição continua valendo para aquele par mesmo quando outra rota existe no grafo.

## Padrões úteis

### Implementar a partir de um contrato

Conecte uma Specification, um CodingAgent com papel de Implementer e um Terminal. O agente lê o contrato na fonte,
altera apenas o escopo necessário, executa as verificações e registra outputs na Specification.

Esse desenho mantém a intenção fora do histórico da conversa e deixa a evidência no Workspace.

### Separar implementação de revisão

Use sessões diferentes para Implementer e Reviewer. Ambos alcançam a mesma Specification e as evidências, mas cada um
recebe uma pergunta diferente.

O Implementer pergunta “como cumprir o contrato?”. O Reviewer pergunta “o resultado realmente cumpre o contrato e
quais riscos permanecem?”. A separação reduz a chance de a revisão herdar automaticamente as premissas do autor.

### Combinar providers sem criar uma competição

Providers diferentes podem participar do mesmo grafo. Use essa combinação quando outra interface, outro modelo ou
outra linha de raciocínio melhorar uma responsabilidade concreta.

Não adicione um provider apenas para aumentar o número de agentes. Primeiro defina o papel, o resultado esperado e a
condição de parada; depois escolha o harness que melhor serve ao trabalho.

### Trabalhar com uma página viva

Conecte um WebBrowser quando a tarefa depende de uma interface web real. Você continua vendo e usando as mesmas abas;
o CodingAgent pode navegar, interagir, esperar por mudanças e capturar evidências sem reconstruir a página a partir
de texto colado no chat.

O WebBrowser pode permanecer ativo quando você troca de Workspace e reaparecer no mesmo estado ao retornar. Isso
permite que o agente continue um trabalho já autorizado sem exigir que a página seja recarregada a cada mudança de
contexto visual.

![CodingAgent e WebBrowser conectados no Canvas](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)

[Veja a demonstração →](https://agentkavor.com/pt-br/videos/web-browser-node)

### Consultar a sessão atual de outro CodingAgent

Um CodingAgent alcançável pode consultar passivamente os turnos já concluídos da sessão provider-native de outro
CodingAgent. A leitura é paginada e serve para recuperar raciocínio, evidências e contexto que ainda não viraram uma
mensagem ou output durável.

Essa consulta não envia entrada ao provider, não ativa a sessão lida e não substitui uma mensagem quando o outro
agente precisa agir, decidir ou responder. Se a sessão mudar durante a paginação, a continuação antiga é recusada;
o leitor deve começar outra consulta para não misturar históricos diferentes.

## Um grafo prático

```text
Specification — Implementer — Reviewer
                    │            │
                  Terminal    Sticky Note
                    │
                   File
```

As linhas representam Connections sem direção persistida. Todos os Nodes fazem parte do mesmo componente alcançável.
O Implementer executa o contrato, o Reviewer produz uma avaliação independente e a Sticky Note mantém questões ou
findings visíveis para a decisão humana.

Esse desenho não é uma sequência automática. Mensagens coordenam handoffs; Specifications e outros recursos
preservam o que precisa sobreviver às sessões; você decide quando o trabalho está aceito.

## Um prompt inicial melhor

Para um Implementer:

> Implemente somente o escopo definido na Specification alcançável. Antes de alterar código, identifique os Files e
> as verificações relevantes. Use o Terminal para produzir evidências, registre o resultado como output da
> Specification e peça ao Reviewer uma avaliação independente. Pare se uma decisão necessária estiver fora do
> contrato.

Para um Reviewer:

> Compare a implementação e as evidências com os critérios da Specification. Procure comportamento incorreto,
> cenários ausentes, regressões e riscos operacionais. Registre findings concretos antes de sugerir mudanças e não
> aprove o trabalho apenas porque os testes existentes passaram.

## Exemplo: um handoff que o Reviewer consegue verificar

Imagine uma correção no formulário de cadastro. A Specification exige que um e-mail inválido mostre uma mensagem,
que o envio seja bloqueado e que um e-mail válido continue funcionando. Use o grafo acima e mantenha Builder e
Reviewer em sessões separadas.

Pedido ao Builder:

> Implemente a validação definida na Specification. Preserve o comportamento do caminho válido. Execute os testes
> relevantes no Terminal e registre os arquivos alterados, comandos e resultados. Depois envie ao Reviewer o handle
> da Specification e o commit ou diff exato para revisão. Informe pendências e pare antes de publicar.

Um handoff útil identifica a entrega em vez de copiar toda a conversa:

> A implementação está no commit indicado nos outputs da Specification. Os testes de e-mail inválido, vazio e válido
> passaram no Terminal Checks. Revise os critérios e os caminhos de falha nesse commit. Registre findings com arquivo,
> cenário e evidência; responda quando terminar. Não altere o código nesta revisão.

Pedido ao Reviewer:

> Leia o contrato e examine a entrega referenciada. Verifique cada critério, reproduza os cenários relevantes e
> acrescente suas conclusões à Sticky Note. Diferencie um defeito demonstrado de uma hipótese. Se encontrar um
> bloqueio, explique qual comportamento falha e devolva ao Builder para correção.

O resultado esperado é uma mudança identificável, uma revisão independente e uma decisão sua baseada em evidência.
Se o Builder ainda está alterando a entrega, espere que ele estabilize o resultado ou delimite explicitamente o que
está pronto para revisão. Dois agentes olhando revisões diferentes do código não estão avaliando a mesma entrega.

## Limites que importam

- Um CodingAgent não recebe acesso por proximidade visual; precisa existir um caminho de Connections.
- Referenciar um Node em uma mensagem não concede acesso a ele.
- Ler passivamente a sessão de outro CodingAgent não o aciona e não transfere uma decisão durável para a
  Specification.
- Um Guardrail restringe o par direto ao qual pertence; não é uma política global do Workspace.
- Mensagens coordenam trabalho, mas não devem ser o único lugar de uma decisão durável.
- Providers não oferecem necessariamente os mesmos modelos, permissões, eventos ou operações de sessão.
- Um Trigger entrega um prompt a uma sessão ativa; não amplia permissões nem garante que um efeito externo aconteça
  exatamente uma vez.
- Com `Allow workspace editing`, um CodingAgent pode controlar sessões e remover Nodes alcançáveis dentro do pedido
  autorizado. Isso não permite alterar Guardrails nem ignorar aprovações humanas. Veja os
  [limites da edição do Canvas](./coding-agents-and-canvas.md#allow-workspace-editing).

## Antes de iniciar a sessão

Confirme:

- qual responsabilidade este CodingAgent possui;
- qual resultado observável ele deve produzir;
- quais Nodes precisam estar alcançáveis;
- quais Guardrails devem existir nas Connections diretas;
- se provider, modelo e esforço combinam com o risco da tarefa;
- onde decisões, progresso e evidências serão preservados;
- com quem ele deve conversar e em que condição deve parar.

Um CodingAgent não fica poderoso porque recebeu um prompt maior. Ele fica mais útil quando responsabilidade,
contexto, ferramentas, colaboração e limites formam um desenho coerente.

Continue em [Como escolher CodingAgents e definir papéis](./agents-and-roles.md), entenda
[como CodingAgents enxergam e constroem o Canvas](./coding-agents-and-canvas.md) ou consulte a
[matriz de Connections suportadas](./connections.md).
