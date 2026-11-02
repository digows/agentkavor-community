---
id: adding-content
title: Adicionar conteúdo ao Canvas
description: Arraste arquivos, cole imagens, links e texto e reutilize grupos de Nodes sem perder de vista suas fontes e sessões.
kind: guide
lastReviewedAt: 2026-10-30
canonicalUrl: https://agentkavor.com/pt-br/docs/adding-content
---

# Adicionar conteúdo ao Canvas

Um PDF de referência, um print do problema, um link para a aplicação e uma nota de investigação podem participar do
mesmo trabalho. Você não precisa começar criando cada Node à mão: arraste arquivos do sistema ou cole o conteúdo
diretamente no Canvas.

O resultado depende do conteúdo e de onde você cola. No Canvas, a colagem cria ou localiza Nodes. Dentro de um
editor, Terminal, CodingAgent ou página do WebBrowser, ela continua sendo a colagem daquele ambiente.

## Arraste arquivos do sistema

1. Abra o Workspace de destino.
2. Arraste um ou mais arquivos do Finder, Explorer ou outro gerenciador de arquivos para uma área do Canvas.
3. Solte onde o conjunto deve aparecer. Vários arquivos são organizados em uma grade e selecionados juntos.
4. Confira o resumo: Nodes adicionados, fontes já presentes e itens ignorados.

Os arquivos **continuam onde estão**. Kavor não os importa, copia nem move. Cada fonte tem no máximo um Node por
Workspace: repetir o gesto seleciona e revela o Node existente, sem duplicá-lo nem mudar sua posição.

O tipo é escolhido pela fonte:

- uma Specification pertencente ao Workspace aparece como Specification;
- um arquivo de formato de diagrama aparece como [Diagram](./diagrams.md), com a exceção de SVG;
- os demais aparecem como [File](./file.md). Um `.svg` comum continua sendo File; peça explicitamente um Diagram
  quando quiser tratá-lo dessa forma.

Pastas não são adicionadas. Se você arrastar uma pasta junto com arquivos, o Kavor informa o item ignorado e ainda
adiciona os arquivos válidos. Um arquivo que não possa ser lido também aparece no resumo com o motivo.

Arrastar sobre a entrada de um Terminal ou CodingAgent mantém a inserção do caminho naquela sessão; não cria um
Node no Canvas. Os painéis Files e Specs conservam seus próprios gestos de arrastar.

### Arquivos fora do Workspace

Você pode referenciar um arquivo sem colocá-lo dentro da pasta do projeto. O Node mostra o caminho absoluto e o
marcador `Outside this Workspace`. Dentro do Workspace, o caminho mostrado é relativo à raiz.

Alterações no arquivo externo atualizam sua apresentação ao vivo; se a fonte for removida, o Node indica que ela
está indisponível. Você não precisa usar Reload a cada alteração. Uma edição local ainda não salva exige atenção a
conflitos antes de substituir o conteúdo.

Uma referência externa não torna o arquivo parte do repositório. Se você compartilhar o projeto ou mudar de máquina,
confira se essa fonte continuará existindo no caminho esperado.

## Cole arquivos, imagens, links e texto

Com o foco no Canvas, use `⌘V` no macOS ou `Ctrl+V` no Windows/Linux. O menu de contexto também oferece Paste no
ponto em que foi aberto. Pelo teclado, a colagem usa o ponteiro dentro do Canvas ou o centro da área visível; colagens
repetidas recebem um pequeno deslocamento.

Quando o clipboard oferece mais de uma representação, o Kavor usa a primeira aplicável nesta ordem:

| Conteúdo copiado | Resultado no Canvas |
| --- | --- |
| Grafo de Nodes copiado ou recortado no Kavor | Cola a seleção, seguindo as regras abaixo. |
| Arquivos copiados no gerenciador de arquivos | Referencia os arquivos, como no arrastar e soltar. |
| Dados de imagem, como um screenshot sem arquivo de origem | Salva um PNG no Workspace e cria seu File Node. |
| Uma URL isolada | Cria um WebBrowser aberto nesse endereço. |
| Texto | Cria uma Sticky Note com o texto literal, sem interpretá-lo como Markdown. |

Cole dentro de uma sessão quando quiser fornecer uma entrada a ela, não criar Nodes. Para arquivos e imagens na
entrada de um harness, veja [a colagem no Terminal](./terminal.md#cole-arquivos-e-imagens-na-entrada-da-sessão).

### Onde uma imagem colada é salva

Dados de imagem são a exceção à regra de apenas referenciar: eles ainda não possuem um arquivo para o Canvas usar.
O Kavor grava um PNG na pasta `assets/` da **primeira Documentation root**. Com a raiz padrão `docs/`, por exemplo:

```text
docs/assets/pasted-image-20261030-093000.png
```

O nome usa data e hora; se já existir, recebe um sufixo numérico. Nenhum arquivo existente é sobrescrito. O feedback
mostra o caminho realmente salvo somente depois de o arquivo e o Node existirem.

O limite de dados de imagem no clipboard é **20 MB**. Uma falha ao salvar é reportada como falha da imagem, não vira
silenciosamente uma Sticky Note. Esse limite não substitui os limites de visualização abaixo.

## Copie, recorte e cole Nodes

Use isso para reaproveitar um loop que já funciona, como Specification, Builder, Reviewer e Sticky Note.

1. Selecione os Nodes que devem viajar juntos, com o foco fora de editores e sessões.
2. Use `⌘C` / `Ctrl+C` para copiar ou `⌘X` / `Ctrl+X` para recortar. O menu de contexto oferece as mesmas ações.
3. Continue no mesmo Canvas ou abra o Workspace de destino, inclusive em outra janela do Kavor.
4. Posicione o ponteiro e cole. Confira os participantes e as Connections antes de retomar o trabalho.

Somente as Connections cujos **dois endpoints estão selecionados** fazem parte da captura. Uma Connection isolada
não leva os Nodes, e as ligações com participantes fora da seleção não são copiadas.

Copiar cria novas identidades e preserva a disposição relativa. A mesma cópia pode ser colada mais de uma vez.
Recortar no mesmo Canvas apenas reposiciona o grupo, mantendo suas identidades e sessões. Entre Workspaces, move os
Nodes e Connections internos e remove as Connections de fronteira na origem; o recorte é consumido após o sucesso.
Antes de colar, `Esc` no Canvas de origem cancela o recorte.

### O que viaja com cada Node

| Node | O que permanece — e o que não é clonado |
| --- | --- |
| Sticky Note | Conteúdo e cor. |
| File e Diagram | Referência à mesma fonte, não uma cópia dos bytes. Um Node já existente para a fonte é reutilizado. |
| Specification | Reutilizada no Workspace que a possui; em outro Workspace aparece como File. O lifecycle continua no proprietário original. |
| Terminal | Configuração do shell e intenção de abertura, não buffer nem histórico. Ao mover entre Workspaces, a sessão de origem fecha. |
| CodingAgent | Configuração de provider, modelo e preferências, não conversa, mensagens ou worktree isolado. Ao mover, a sessão de origem fecha; confira a raiz e a configuração no destino. |
| Trigger | Uma cópia nasce pausada, sem histórico de disparos. Um recorte preserva a configuração, mas não pode mover um disparo ainda inacabado. |
| WebBrowser | Abas, não popups, downloads ou observações. As páginas são recriadas no destino. |

Guardrails e parâmetros das Connections acompanham o conjunto segundo as regras do par. Quando uma Specification
vira File em outro Workspace, sua restrição de leitura se adapta para `file_read_only`; Diagram conserva
`diagram_read_only`. Revise as restrições no destino antes de iniciar uma nova tarefa.

O clipboard de grafos pertence à execução atual do Kavor. Substituí-lo por outra cópia ou reiniciar o aplicativo
invalida a captura; isso nunca apaga a origem de um recorte pendente. Ele não é backup nem exportação entre máquinas.

Uma captura aceita até **512 Nodes, 2.048 Connections e 16 MiB**. Se a seleção recortada mudar antes da colagem, ou uma
fonte deixar de existir, a operação é recusada sem colar parcialmente. Confira a origem e capture novamente.

## Entenda o preview de um arquivo

O Node continua representando a fonte real, mesmo quando ela não possui um preview rico:

- **Texto UTF-8:** editor, preview quando disponível, salvamento e tratamento de conflitos.
- **Imagens:** PNG, JPEG, GIF, WebP, BMP, ICO, AVIF e SVG. SVG em um File é exibido como imagem, não como markup da
  interface do aplicativo.
- **PDF:** páginas visualizáveis no Canvas, sem editor de formulário ou anotações e sem executar JavaScript do PDF.
- **Diagramas:** apresentação e edição específicas no [guia de Diagramas](./diagrams.md).
- **Outros formatos:** cartão com ícone ou miniatura disponível no sistema, nome, tipo, tamanho, data de alteração e
  caminho. Áudio e vídeo aparecem nesse cartão; não há playback embutido.

Imagens e PDFs têm limite de **32 MiB por arquivo**; imagens também têm limite de **16 megapixels**. Formatos não
suportados, limites excedidos ou falhas de preview não transformam uma fonte existente em arquivo ausente: o cartão
explica a situação e mantém as ações disponíveis. `Retry` aparece quando uma nova tentativa pode ajudar, não para
remover um limite de tamanho ou formato.

Use **Open** para abrir no aplicativo padrão, **Reveal in Finder** ou o equivalente do sistema para localizar a fonte,
e **Copy path** para copiar seu caminho. Miniaturas dependem do sistema: macOS e Windows podem fornecê-las; quando
não houver uma, o ícone continua identificando o arquivo.

## Desfaça sem confundir Nodes e arquivos

Cada gesto de adicionar conteúdo ou colar um grafo gera uma entrada no histórico do Canvas. Undo desfaz os Nodes
criados por aquela operação, sem apagar uma fonte apenas referenciada ou um Node que já existia. Redo restaura o
resultado.

Uma imagem gravada pelo próprio Kavor ao colar dados é diferente: Undo também remove esse PNG, e Redo o restaura.
Se você alterar a imagem ou criar uma referência conflitante depois, o Kavor pode recusar o undo em vez de apagar
trabalho posterior. Confira o motivo, não trate Undo como exclusão incondicional de arquivos.

No recorte entre Workspaces, Undo precisa restaurar os dois lados. Uma mudança conflitante posterior também pode
impedir a operação, sem restaurar apenas metade de um grafo.

## Use o conteúdo com um CodingAgent

Drop, paste e clipboard de grafos são gestos humanos. Um CodingAgent adiciona fontes por caminho, não opera seu
clipboard. Depois de adicionar o material, conecte somente o que deve participar do trabalho.

Para uma primeira leitura, diga ao CodingAgent quais Nodes acabou de adicionar e torne-os alcançáveis. Não inclua
credenciais nem autorize alterações implicitamente.

```prompt
Examine os Nodes que identifiquei no meu grafo alcançável.
Separe fonte canônica, referência visual, página viva e nota de trabalho.
Explique como esse material ajuda na tarefa que descrevi e aponte o que não conseguiu ler.
Não altere arquivos, não execute comandos e não crie Connections; apresente primeiro sua leitura.
```

**Resultado esperado:** um mapa curto do material realmente consultado, com lacunas explícitas. O preview não garante
que o harness consiga interpretar todo formato, e adicionar um Node não autoriza acesso a conteúdo fora do grafo.

## Continue

- Use [File como contexto e escopo](./file.md), sem transformar referência em cópia descartável.
- Crie e revise [Diagramas](./diagrams.md) com um CodingAgent.
- Consulte a [matriz de Connections](./connections.md) antes de conectar recursos.
- Entenda [o que os agentes enxergam no Canvas](./coding-agents-and-canvas.md).
