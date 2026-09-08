---
id: web-browser
title: "WebBrowser: desenvolva e teste na frente do agente"
description: Use o WebBrowser compartilhado do Kavor para desenvolver aplicações web, reproduzir bugs, depurar páginas e provar fluxos E2E.
kind: guide
lastReviewedAt: 2026-09-08
canonicalUrl: https://agentkavor.com/pt-br/docs/web-browser
---

# O WebBrowser coloca a aplicação diante de você e do agente

O WebBrowser é uma superfície Chromium viva dentro do Canvas. Um CodingAgent conectado pode observar, interagir,
aguardar, depurar e testar a página que você também está vendo.

Veja a [demonstração do WebBrowser no Kavor](https://agentkavor.com/pt-br/videos/web-browser-node) em outra aba para
acompanhar o comportamento visual enquanto lê este guia.

## O browser como ferramenta de desenvolvimento

Para desenvolver uma aplicação web, o CodingAgent precisa mais do que editar arquivos. Ele precisa abrir a aplicação,
interagir com ela, esperar estados reais e investigar o que aconteceu no browser.

Com uma Connection entre CodingAgent e WebBrowser, o agente pode trabalhar com uma superfície ampla de operações
mediadas pelo Kavor:

- **observar:** ler o estado da página, obter um snapshot de acessibilidade e capturar screenshots;
- **interagir:** clicar, preencher campos, inserir texto, pressionar teclas, selecionar opções, marcar controles,
  rolar, arrastar, enviar arquivos e responder a diálogos;
- **sincronizar:** aguardar seletor, texto, URL, carregamento, inatividade de rede ou uma condição específica;
- **depurar:** consultar mensagens do console, requests de rede e corpos de respostas retidos;
- **testar:** reproduzir um bug, executar um fluxo E2E e preservar uma evidência visual do resultado;
- **isolar cenários:** bloquear, continuar ou simular respostas de rede durante um teste controlado;
- **organizar páginas:** abrir, selecionar e fechar abas, acompanhar downloads e lidar com desafios de autenticação.

O objetivo não é esconder o browser atrás de uma automação. É tornar o estado e as ações verificáveis enquanto o agente
trabalha.

## Um loop prático para uma aplicação web

Comece com um WebBrowser e um CodingAgent no mesmo componente. Se a aplicação roda localmente, conecte também o
Terminal que inicia o servidor. Um loop pequeno pode ser:

```text
File / Specification — CodingAgent — WebBrowser
                              │
                           Terminal
```

Peça ao agente para:

1. descobrir o estado atual da página antes de agir;
2. reproduzir o caminho que falha;
3. coletar evidência no console, na rede ou em um screenshot;
4. alterar o código com o escopo definido;
5. aguardar o novo estado e repetir o fluxo;
6. registrar o resultado e os riscos restantes em uma [Sticky Note](./sticky-note.md).

Um prompt inicial pode ser:

> Abra a aplicação no WebBrowser conectado. Primeiro observe a página e reproduza o fluxo sem alterar código. Depois descreva a causa provável, proponha a menor mudança e valide o caminho completo com evidência visual e de console.

## O mesmo browser para o humano

Você também pode usar o WebBrowser como uma página normal dentro do Workspace: abrir uma documentação, assistir a um
vídeo ou deixar uma página de referência aberta enquanto os agents trabalham.

YouTube e outras páginas comuns são usos naturais. Serviços de streaming como Netflix podem exigir autenticação, DRM,
permissões ou condições específicas do sistema; por isso, o Kavor não promete reprodução garantida para um serviço
particular.

## Uma superfície compartilhada, não um browser invisível

O agente e o humano compartilham a mesma página viva. Isso tem consequências boas e importantes:

- você consegue ver as ações e intervir;
- o agente não possui uma janela privada que esconda o que está fazendo;
- abas persistentes e páginas apresentadas pertencem ao perfil próprio do browser do Kavor, compartilhado entre seus
  WebBrowsers;
- extensões, histórico e cookies do seu Chrome externo não são reaproveitados automaticamente;
- o conteúdo da página é tratado como não confiável e não pode redefinir as instruções do agente.

O WebBrowser também não é um serviço de browser remoto nem uma permissão geral para operar o filesystem da máquina.

## Limites e cuidados

### Primeiro observe, depois aja

Antes de controlar uma página, o agente deve consultar o estado atual. Refs obtidas em um snapshot são temporárias e
podem deixar de existir depois de navegação ou alteração do DOM. Quando isso acontecer, é preciso obter um novo
snapshot em vez de insistir na referência antiga.

### Ações sensíveis continuam humanas

CAPTCHAs, passkeys, permissões do site, certificados e prompts de autenticação podem exigir sua intervenção. O agente
pode detectar ou aguardar essas situações, mas não deve fingir que uma ação humana aconteceu.

### Regras de rede são temporárias

Bloqueios e respostas simuladas valem para o cenário controlado e para a geração de página correspondente. Limpe as
regras ao terminar o teste; elas não são uma configuração permanente da aplicação.

### O perfil aceita certificados de desenvolvimento

Para alcançar servidores locais e ambientes de desenvolvimento, o perfil dedicado aceita certificados
autoassinados, expirados e emitidos por autoridades privadas. Essa escolha também reduz a proteção contra uma rede
hostil que apresente um certificado inválido. Use o perfil com consciência antes de autenticar em serviços sensíveis.

### A página pode continuar viva fora da tela

Ao trocar de Workspace na mesma janela, o Kavor preserva a página apresentada. Um CodingAgent conectado pode continuar
operando esse estado mesmo enquanto outro Workspace está visível. Fechar a aba, excluir o Node ou encerrar a sessão
encerra essa continuidade.

### Frames e páginas podem ser parciais

O snapshot de acessibilidade pode omitir conteúdo de frames cross-origin. Uma resposta de rede pode ter sido descartada
quando o histórico limitado avançou. O agente deve reportar a evidência observada, não inventar o que não conseguiu
inspecionar.

## Connection e Guardrail

O par direto `CodingAgent + WebBrowser` coloca o browser no componente alcançável do agente. O grafo pode incluir uma
Specification, Files, Terminal, Sticky Note e outros CodingAgents por caminhos válidos, mas uma proximidade visual ou
uma menção em mensagem não cria acesso.

O WebBrowser não possui um Guardrail específico próprio hoje. Isso não remove os limites de cada recurso que participa
do mesmo grafo: um File read-only continua read-only, uma sessão de Terminal mantém seus controles e uma Specification
continua obedecendo seu lifecycle.

## Continue

- Consulte a [matriz de Connections](./connections.md) para o contrato de `CodingAgent + WebBrowser`.
- Leia [como CodingAgents enxergam e constroem o Canvas](./coding-agents-and-canvas.md).
- Combine browser, código e evidências em [seu primeiro loop](./first-loop.md).
- Use uma [Specification](./specification.md) para definir o comportamento esperado antes de testar a aplicação.
