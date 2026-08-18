---
id: coding-agent
title: "CodingAgent no Kavor: seu harness favorito como parte de um grafo"
description: Escolha um provider, preserve sua experiência nativa e conecte o CodingAgent ao contexto, às ferramentas e aos participantes certos.
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/pt-br/docs/coding-agent
---

# CodingAgent no Kavor: seu harness favorito como parte de um grafo

Um CodingAgent é o seu agente de programação executado na interface nativa do próprio provider, agora como um
participante visível do Canvas.

O Kavor não substitui cada harness por um chat genérico. Ele preserva a experiência do provider e acrescenta uma
estrutura ao redor dela: responsabilidade explícita, contexto alcançável, ferramentas, outros CodingAgents e limites
que você consegue inspecionar.

[![Seletor de provider na toolbar do Kavor antes de adicionar um CodingAgent ao Canvas.](https://media.agentkavor.com/demos/coding-agent-provider-selector/poster.22c2dccb70c5.jpg)](https://agentkavor.com/pt-br/videos/coding-agent-provider-selector)

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

## O que ele faz sozinho

Sem nenhuma Connection, um CodingAgent ainda é uma sessão provider-native dentro do Workspace. Você pode conversar,
usar as ferramentas que o harness oferece e manter o trabalho delimitado pela raiz daquele Workspace.

O Node já ajuda a separar contextos: uma sessão pode investigar o problema enquanto outra implementa. Porém, sem um
grafo, o contexto compartilhado continua dependendo do que você fornecer dentro de cada conversa.

É a Connection que transforma a sessão isolada em participante de um sistema de trabalho.

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
| **CodingAgent + CodingAgent** | Une participantes ao mesmo componente. CodingAgents alcançáveis podem trocar mensagens assíncronas e consultar o contexto necessário para coordenar o trabalho. |
| **Trigger + CodingAgent** | Seleciona aquela sessão ativa como alvo direto de um prompt agendado. O Trigger não inicia uma sessão que você fechou. |

Alcance não elimina contratos diretos. Se a Connection exata entre um CodingAgent e um recurso possui um Guardrail,
essa restrição continua valendo para aquele par mesmo quando outra rota existe no grafo.

## Três padrões úteis

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

## Limites que importam

- Um CodingAgent não recebe acesso por proximidade visual; precisa existir um caminho de Connections.
- Referenciar um Node em uma mensagem não concede acesso a ele.
- Um Guardrail restringe o par direto ao qual pertence; não é uma política global do Workspace.
- Mensagens coordenam trabalho, mas não devem ser o único lugar de uma decisão durável.
- Providers não oferecem necessariamente os mesmos modelos, permissões, eventos ou operações de sessão.
- Um Trigger entrega um prompt a uma sessão ativa; não amplia permissões nem garante que um efeito externo aconteça
  exatamente uma vez.
- Autorizar edição do Canvas não autoriza apagar Nodes nem alterar Guardrails; essas fronteiras continuam humanas.

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
