---
id: file
title: "File: contexto e escopo no Canvas"
description: Use um File para manter uma fonte canônica visível, delimitar o contexto de um CodingAgent e levar seu caminho a um Terminal.
kind: guide
lastReviewedAt: 2026-10-01
canonicalUrl: https://agentkavor.com/pt-br/docs/file
---

# Um File é um arquivo — e isso já é poderoso

Um File não é um anexo descartável. Ele representa uma fonte canônica do filesystem dentro do Canvas, tornando claro
qual material o trabalho deve ler, revisar, editar ou usar como entrada.

![Um PDF exibido em um File Node e usado por um CodingAgent no Canvas do Kavor](https://media.agentkavor.com/demos/pdf-canvas-agent/poster.7306bdccc7f5.jpg)

[Veja um PDF participando do trabalho no Canvas →](https://agentkavor.com/pt-br/videos/pdf-canvas-agent)

*O File mantém o material visível enquanto você organiza agentes, decisões e execução ao redor dele.*

## O que o File faz

Sozinho, o File permite visualizar e trabalhar com uma fonte do Workspace. Dependendo do formato, o Kavor oferece
edição textual, busca, ajuste de leitura e preview rico.

Os formatos textuais incluem Plain Text, Markdown, JSON, SQL, TypeScript, JavaScript, YAML, Shell, HTML e CSS. Imagens
e PDFs podem ser visualizados no Canvas; SVG pode alternar entre preview e source.

O File continua apontando para a fonte real. Se o arquivo mudar fora do Kavor, o Node acompanha a mudança e sinaliza
quando existe uma edição local que precisa ser reconciliada. Isso evita confundir uma cópia de contexto com o artefato
que realmente será versionado.

## File como escopo explícito

Conectado a um CodingAgent, o File transforma uma intenção genérica em uma fonte concreta de trabalho. Ele pode
delimitar um módulo, fornecer um contrato de entrada, manter uma imagem ou PDF para análise, ou deixar claro qual
configuração deve ser revisada.

Um pedido inicial pode ser direto:

> Leia o File conectado como a fonte canônica desta tarefa. Explique o que precisa mudar, preserve o escopo e só edite depois que eu confirmar o plano.

Quando o agente precisa apenas consultar o material, use o Guardrail `file_read_only` na Connection direta. O agente
continua enxergando o File alcançável, mas não pode alterar sua fonte por meio das operações mediadas pelo Kavor.

## File como entrada de um Terminal

Uma Connection entre File e Terminal exporta o caminho absoluto canônico do arquivo para a sessão por meio de um nome de
variável de ambiente escolhido por você. O valor é o caminho, não uma cópia do conteúdo.

Por exemplo, um File conectado como `CHECK_SQL` pode ser usado assim:

```sh
sqlite3 app.db < "$CHECK_SQL"
```

O caminho é aplicado quando a sessão do Terminal inicia. Se você alterar a Connection ou seu parâmetro com o shell já
aberto, a interface informa que a sessão precisa ser reiniciada para receber o novo valor.

Esse desenho é útil para scripts, SQL, configurações e relatórios: o File mantém a fonte explícita no Canvas e o
Terminal executa o comando sem que você precise copiar caminhos entre janelas.

## Três formas de usar

### Revisar uma fonte existente

Conecte o File a um CodingAgent e peça uma leitura orientada por risco. Para uma revisão visual, mantenha o arquivo,
uma Sticky Note para findings e um Terminal para as verificações no mesmo grafo.

### Implementar com escopo claro

Conecte a Specification, o File e o Builder. A Specification explica o resultado; o File identifica a fonte concreta;
o CodingAgent faz a mudança e registra evidências nos lugares apropriados.

### Transformar um artefato em entrada executável

Conecte um File de SQL ou script a um Terminal, nomeie a variável e execute o comando a partir do shell. Se um agente
também estiver conectado, ele pode ajudar a interpretar a saída enquanto você acompanha o processo.

## Exemplos: a mesma peça, três tipos de entrada

### Código como foco de uma revisão

Adicione o arquivo do cliente HTTP como File, conecte um Reviewer e mantenha uma Sticky Note alcançável para os
findings. Peça:

> Revise o File do cliente HTTP, especialmente timeout, retry e tratamento de erros. Use-o como foco da análise.
> Caso uma conclusão dependa de outro arquivo, identifique a dependência antes de ampliar a investigação. Registre
> somente findings sustentados por código ou reprodução e não implemente correções.

O resultado esperado é uma revisão localizada, com cenário e referência ao trecho relevante. O File explicita o
foco; não constitui um sandbox para as ferramentas nativas do harness. Delimite o escopo no pedido e use o Guardrail
adequado para as operações do Kavor.

### PDF ou imagem como referência

Mantenha um PDF de requisitos ou uma imagem de referência no mesmo grafo que a Specification e o CodingAgent:

> Compare o material do File com a Specification. Separe requisitos explícitos, interpretações e dúvidas. Para cada
> divergência, indique a página ou elemento observado e registre a pergunta na Sticky Note. Não invente conteúdo que
> não conseguir ler.

Você espera uma comparação verificável, não apenas um resumo. A capacidade de interpretação depende do formato e
das ferramentas disponíveis no harness; o preview do Kavor mantém a referência visível para você.

### Um script como entrada do Terminal

Crie um File para um pequeno script Node.js e configure sua Connection ao Terminal com o nome `CHECK_SCRIPT`:

```javascript
console.log('Canvas file connection is working');
```

Inicie a sessão do Terminal após configurar a Connection e execute:

```sh
test -n "$CHECK_SCRIPT" && node "$CHECK_SCRIPT"
```

O resultado esperado é `Canvas file connection is working`. A variável contém o caminho do script. Se estiver
vazia, confira o nome na Connection e reinicie a sessão para receber a configuração. Este exemplo usa um shell POSIX
e exige Node.js instalado; em PowerShell, consulte a variável com `$env:CHECK_SCRIPT` e execute `node $env:CHECK_SCRIPT`.

## Limites que importam

- a Connection não transforma o File em acesso genérico ao filesystem; o Node continua representando sua fonte
  canônica configurada;
- nem todo formato binário é editável como texto;
- o caminho exportado ao Terminal não contém o corpo do arquivo;
- uma Connection direta com um CodingAgent é necessária para um Guardrail específico do File;
- uma alteração externa ou concorrente precisa ser resolvida antes de substituir uma edição local;
- estar próximo de um File no Canvas não concede acesso ao seu conteúdo.

## Continue

- Veja a [matriz de Connections](./connections.md), incluindo File + Terminal e CodingAgent + File.
- Entenda como [CodingAgents enxergam o grafo](./coding-agents-and-canvas.md).
- Combine um File com uma [Sticky Note](./sticky-note.md) para separar fonte canônica de memória de trabalho.
- [Feche seu primeiro loop](./first-loop.md) com intenção, implementação, evidência e revisão.
