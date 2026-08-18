---
id: specification
title: "Specification no Kavor: pense com cuidado uma vez, implemente melhor"
description: Estruture intenção, decisões e critérios em Markdown durável, organize múltiplas roots e conduza o lifecycle da Specification.
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/pt-br/docs/specification
---

# Specification no Kavor: pense com cuidado uma vez, implemente melhor

Uma Specification transforma intenção em um contrato durável que humanos e CodingAgents conseguem ler, discutir,
implementar e revisar sem depender da memória de uma única conversa.

Ela pode definir uma arquitetura, integração, modelagem de domínio, feature, módulo ou um conjunto delimitado de
correções. O tamanho varia; a responsabilidade permanece a mesma: explicar o que precisa ser verdadeiro antes de o
trabalho ser tratado como concluído.

![Workspace Settings do Kavor com quatro roots de Specification configuradas.](https://media.agentkavor.com/releases/1.4.0/multiple-specification-roots/article.7d42383e3a37.jpg)

## A fonte da verdade é um arquivo

O conteúdo de uma Specification vive em Markdown dentro do seu Workspace. O arquivo é seu: pode ser aberto no Kavor,
editado por outras ferramentas, versionado no Git e lido diretamente por CodingAgents.

O Kavor mantém apenas metadados operacionais ao redor dessa fonte, como identidade, status e outputs. O frontmatter
preserva a identidade que permite acompanhar uma Specification quando seu arquivo é movido ou renomeado.

Não edite manualmente os campos que o Kavor controla no frontmatter. Escreva o contrato no corpo; deixe identidade e
lifecycle serem atualizados pelas operações do produto.

## Escreva sozinho ou com um CodingAgent

Você pode começar manualmente ou coescrever com um CodingAgent. Para um assunto difícil, vale usar uma sessão voltada
a planejamento e investir mais capacidade de raciocínio antes de implementar.

Um bom ponto de partida é:

> Entreviste-me sobre o assunto X para escrevermos a Specification Y. Separe fatos verificados, decisões, premissas,
> non-goals, cenários de falha e critérios de aceite observáveis. Não trate o documento como Ready enquanto existirem
> decisões que mudariam a solução.

Pensar melhor aqui pode reduzir retrabalho, contexto desperdiçado e implementação ambígua. Não é garantia de menor
custo: uma Specification ruim continua ruim mesmo quando é longa ou foi escrita por um modelo caro.

## Um contrato mínimo que consegue orientar trabalho

Uma Specification útil normalmente contém:

- contexto e problema atual;
- objetivo e definição de sucesso;
- non-goals que limitam o escopo;
- decisões e restrições;
- abordagem pretendida quando ela já estiver decidida;
- critérios de aceite observáveis;
- cenários de falha e riscos relevantes;
- perguntas ainda abertas;
- referências para código, ADRs, issues ou outras Specifications.

O documento não precisa seguir um ritual fixo quando o Workspace já possui uma convenção melhor. Precisa, porém,
distinguir decisão de hipótese e permitir que outra pessoa avalie o resultado sem reconstruir toda a conversa original.

## Lifecycle é orientação, não decoração

O Kavor usa cinco estados:

| Estado | Significado prático |
| --- | --- |
| **Draft** | O problema ainda está sendo investigado, entrevistado ou decidido. |
| **Ready** | O contrato possui informação suficiente para iniciar implementação com segurança. |
| **In progress** | O trabalho autorizado pela Specification está em execução. |
| **Blocked** | Existe uma condição concreta que impede progresso significativo. |
| **Done** | O objetivo foi atingido e não resta trabalho exigido pelo contrato. |

O status é deliberadamente advisory. O Kavor não transforma checkboxes de Markdown em um sistema proprietário nem
prova sozinho que todos os critérios foram satisfeitos. Tratar como Done continua exigindo evidência e julgamento.

Uma prática forte é separar autoria, implementação e revisão. O CodingAgent que ajudou a escrever pode esclarecer o
contrato; outro implementa; um Reviewer independente compara resultado e critérios.

## Organize mais de uma Specification root

Um Workspace pode manter Specifications em mais de uma pasta. Isso ajuda quando um único projeto já separa decisões
por produto, engenharia, operações ou módulos — ou quando uma raiz única se tornou um depósito difícil de navegar.

Abra Workspace Settings e use **Specification roots** para adicionar, remover ou reordenar as pastas. As roots são:

- relativas ao diretório do Workspace;
- ordenadas;
- únicas e não sobrepostas;
- limitadas a 32 por Workspace.

A primeira root é a **Primary** e recebe novas Specifications por padrão. Reordenar muda esse destino padrão; não move
arquivos existentes. Remover uma root também não apaga seus arquivos. As Specifications fora das roots configuradas
deixam de participar da listagem ativa e podem voltar quando a root for adicionada novamente.

Quando mais de uma root existe, o painel de Specifications agrupa primeiro por root e depois pelas pastas reais do
filesystem. O Canvas não cria uma taxonomia paralela: a organização continua sendo a estrutura de arquivos que você
já possui.

### Um desenho simples de roots

```text
docs/         decisões e contratos gerais do produto
specs/        features e integrações em execução
marketing/    campanhas e experiências editoriais
operations/   manutenção e mudanças operacionais
```

Não crie roots apenas para reduzir a quantidade de itens em uma lista. Use-as quando cada pasta possui uma fronteira
durável e compreensível para humanos e agentes.

## O que a Specification ganha no grafo

Uma Specification aceita duas Connections diretas:

- **Specification + CodingAgent** coloca o contrato ao alcance do agente e permite lifecycle e outputs. A Connection
  pode receber `specification_read_only`.
- **Specification + Terminal** exporta o caminho absoluto canônico do Markdown por uma variável de ambiente
  configurada na Connection.

Outros CodingAgents no mesmo componente também podem alcançar a Specification por caminhos válidos. A Connection
direta não precisa ser repetida para cada participante, a menos que melhore a leitura da topologia ou precise de um
Guardrail específico para aquele par.

## Três usos que justificam uma Specification

### Fundação arquitetural

Registre invariantes, dependências permitidas, limites de segurança, estratégia de migração e critérios verificáveis.
O documento passa a orientar features posteriores sem exigir que cada agente redescubra a fundação.

### Feature com implementação e revisão independentes

Um Spec Writer esgota decisões e move o contrato para Ready. Um Implementer trabalha a partir dele. Um Reviewer
verifica comportamento, falhas e evidências. Outputs mantêm commits ou outros resultados ligados ao trabalho.

### Série delimitada de correções

Quando vários defeitos compartilham uma causa ou uma superfície, uma Specification pode definir o comportamento
esperado, o conjunto exato de correções e os testes de regressão. Se o documento vira uma lista infinita de bugs sem
uma fronteira comum, ele perdeu o papel de contrato.

## Um grafo prático

```text
Spec Writer — Specification — Implementer — Reviewer
                        │
                     Terminal
```

O Spec Writer registra decisões. O Implementer executa somente o contrato Ready. O Reviewer compara resultado e
critérios. O Terminal fornece evidências. A decisão de tratar o trabalho como Done continua humana.

## O que evitar

- Sair de Draft porque o texto parece longo, sem resolver decisões que mudam a solução.
- Colocar análise, Specification, implementação e revisão na mesma sessão por conveniência.
- Escrever critérios como “funciona corretamente” ou “possui boa performance” sem resultado observável.
- Alterar o frontmatter controlado pelo Kavor como se fosse conteúdo comum.
- Tratar status como prova automática de qualidade ou conclusão.
- Criar roots sobrepostas ou usar várias roots sem uma fronteira editorial durável.
- Guardar a única decisão relevante numa conversa ou mensagem que o próximo participante não encontrará.

## Antes de mover para Ready

Confirme:

- problema, objetivo e non-goals estão claros?
- fatos, decisões e hipóteses estão separados?
- cenários de falha relevantes foram tratados?
- critérios de aceite podem ser verificados?
- o Implementer saberá onde pode e onde não pode alterar?
- o Reviewer conseguirá avaliar o resultado sem herdar a linha de raciocínio do autor?
- perguntas que mudariam a solução foram respondidas?

Uma Specification boa não tenta prever cada linha de código. Ela remove ambiguidade suficiente para que execução e
revisão possam ser independentes, verificáveis e recuperáveis.

Continue em [Como fechar seu primeiro loop](./first-loop.md), escolha os participantes em
[CodingAgents e papéis](./agents-and-roles.md) ou revise a [matriz de Connections](./connections.md).
