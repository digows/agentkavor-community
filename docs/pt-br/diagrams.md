---
id: diagrams
title: "Diagramas no Kavor: da ideia ao desenho, sem sair do grafo"
description: Crie diagramas com CodingAgents, edite a fonte ou um desenho Excalidraw e confira o resultado no Canvas, com exemplos por formato.
kind: guide
lastReviewedAt: 2026-11-02
canonicalUrl: https://agentkavor.com/pt-br/docs/diagrams
---

# Diagramas: transforme uma explicação em algo que você consegue enxergar

Uma arquitetura, uma máquina de estados ou um modelo de dados fica mais fácil de discutir quando humano e agente
olham para o mesmo desenho. Um **Diagram** mantém a fonte desse desenho em um arquivo e sua apresentação no Canvas.
Você pode pedir uma proposta, editar a fonte, ver o resultado e revisar a decisão sem trocar de contexto.

O desenho não substitui a Specification: ele pode revelar uma ambiguidade, explicar uma decisão ou dar forma a uma
alternativa. O contrato continua no lugar apropriado.

[![Um Diagram Mermaid conectado a um CodingAgent no Canvas, junto de uma Sticky Note com o contexto da demonstração.](https://media.agentkavor.com/editorial/diagrams/overview/image.ffa637039fea.jpg)](https://media.agentkavor.com/editorial/diagrams/overview/native.e719329c8ac6.png)

O desenho participa do mesmo grafo de trabalho do CodingAgent e da Sticky Note. A fonte continua em um arquivo.

## Crie ou adicione um Diagram

### Pela interface

1. Clique em **Diagram** na toolbar do Canvas ou abra o painel **Diagrams**, logo após **Specs**, e use **New diagram**.
2. Selecione o formato e informe um nome. Mermaid é o padrão.
3. Confira o caminho e a extensão mostrados antes de criar. `Enter` confirma; `Escape` cancela.
4. Escreva em **Source** ou comece a desenhar, no caso de Excalidraw.

Você também pode arrastar **Diagram** da toolbar até o ponto desejado do Canvas. O formulário abre no painel e
preserva esse ponto até a confirmação; ao clicar na toolbar, a criação usa a área visível.

O formulário não tem um campo de pasta separado. Pela toolbar ou pela ação geral **New diagram**, usa o destino
configurado no Workspace. Pelo menu **New Diagram…** de uma pasta, usa aquela pasta. Confira o caminho mostrado
antes de confirmar. Colisões de nome e falhas ficam no formulário, sem sobrescrever arquivos. draw.io não aparece
entre os formatos de criação, porque seu editor é externo.

[![Painel Diagrams com o formulário New diagram aberto e a lista de formatos disponíveis para criação.](https://media.agentkavor.com/editorial/diagrams/panel-create/image.5cafbedbecc9.jpg)](https://media.agentkavor.com/editorial/diagrams/panel-create/native.fcf3ecd7562d.png)

Escolha um formato para criar pelo painel. draw.io é aberto a partir de um arquivo existente, por isso não aparece
nesta lista de criação.

### Escolha a pasta de novos diagramas

Abra **Workspace Settings → Documentation roots**. Specifications e Diagrams compartilham essas raízes; não existe
uma lista separada de raízes para Diagramas.

O campo **Diagrams folder** é relativo à **primeira Documentation root**. O padrão é `diagrams`: com a raiz `docs`,
o resultado é `docs/diagrams/`. Você pode informar uma pasta aninhada, como `architecture/diagrams`, e conferir o
destino calculado antes de salvar. Use `.` para criar diretamente na primeira raiz, sem uma subpasta.

Mudar esse campo ou reordenar as roots altera apenas o destino das próximas criações. Arquivos e Nodes existentes
não são movidos. O painel descobre diagramas dentro das Documentation roots; um arquivo fora delas ainda pode ser
aberto no Canvas por seu caminho explícito. Configuração de descoberta não é uma nova permissão de filesystem.

### De um arquivo existente

Use **Add to Canvas** no painel Diagrams ou [arraste um arquivo para o Canvas](./adding-content.md). A extensão
seleciona o formato, inclusive extensões compostas como `.vl.json`. A fonte continua no lugar original; mudanças no
disco atualizam o Node.

**SVG é uma escolha explícita:** abrir ou arrastar um `.svg` normalmente cria um File, não um Diagram. Ao pedir a um
CodingAgent para adicioná-lo, diga que quer um Diagram. Se o mesmo arquivo já estiver representado por um File, essa
operação converte o Node preservando identidade, posição, tamanho e Connections, sem modificar o arquivo.

Cada fonte tem no máximo um Node por Workspace. Renomear um Diagram renomeia sua fonte; remover o Node não apaga o
arquivo.

## Trabalhe com um CodingAgent

Descreva o que quer comunicar, não apenas o formato. “Mostre a decisão e os caminhos de falha deste fluxo” oferece
mais contexto do que “faça um diagrama bonito”. Use exemplos pequenos e confira se o desenho corresponde ao sistema.

Os prompts abaixo são pontos de partida com dados fictícios. Cole no CodingAgent responsável e ajuste nomes e
caminhos antes de enviar. Para criar o Node, ele precisa de `Allow workspace editing`; recursos existentes precisam
estar alcançáveis e seus Guardrails continuam valendo. Sem autorização estrutural, peça apenas a fonte ou orientação.

Sem um caminho informado, o CodingAgent consulta as **Documentation roots** e o **Diagrams folder** do Workspace e
usa o mesmo destino da interface — `docs/diagrams/` na configuração padrão. Um caminho explícito no prompt
prevalece. Os exemplos usam caminhos explícitos em `docs/diagrams/`; adapte-os se quiser manter os arquivos dentro
de outra raiz configurada e encontrá-los pelo painel.

### Verifique o desenho, não só a sintaxe

Um CodingAgent pode escrever a fonte, adicionar seu Diagram ao Canvas e consultar o resultado da renderização atual:
`rendered`, `failed` ou `not_rendered`. Em uma falha, recebe o erro do engine e a linha quando disponível.

Uma fonte válida em aparência não prova que renderizou. `not_rendered` significa que não há observação válida para
o arquivo atual; abra ou revele o Diagram para que ele seja exibido. Resultados de outra revisão do arquivo,
previews ainda não salvos e observações anteriores a um reinício não contam como sucesso atual.

Se o Diagram estiver alcançável com `diagram_read_only` na Connection direta, o agente deve preservar a fonte e não
pode renomear nem excluir o Node. Não use o prompt nem ferramentas do filesystem para contornar essa restrição.

### Do pedido ao desenho no Canvas

[Veja um CodingAgent criar um diagrama de entidades de CRM no Canvas](https://agentkavor.com/pt-br/videos/creating-diagram).

Uma demonstração prática começa com um CodingAgent e uma Sticky Note de contexto. O usuário pede um diagrama
básico de entidades de CRM; o agente usa Excalidraw, escreve a fonte e adiciona um Diagram conectado a ele no Canvas.
Como nos exemplos abaixo, criar o Node depende da permissão de edição do Workspace.

O resultado reúne **Account**, **Contact**, **Lead**, **Opportunity** e **Activity**, com campos e relações
fictícios. Confira o desenho antes de usá-lo como modelo do seu projeto: ele ilustra uma proposta, não uma análise
do seu schema real. A demonstração acompanha a criação até o resultado visual; edição, exportação e organização
de pastas têm seus próprios procedimentos neste guia.

A gravação é silenciosa e está em inglês. Trechos de digitação e espera foram acelerados; o resultado final aparece
em velocidade normal. O texto acima permite acompanhar a demonstração sem depender do vídeo.

## Escolha o formato pelo que precisa explicar

Todos os exemplos pedem fonte e conferência no Canvas, não execução de código da sua aplicação. O download inicial
dos recursos necessários pode exigir rede; veja [downloads e modo offline](#downloads-privacidade-e-modo-offline).

[![Diagram Nodes exibindo exemplos de D2, WaveDrom, draw.io, Mermaid e PlantUML no mesmo Canvas.](https://media.agentkavor.com/editorial/diagrams/formats/image.a4d2d23386fa.jpg)](https://media.agentkavor.com/editorial/diagrams/formats/native.6ceae5434ad2.png)

Formatos diferentes podem conviver no Canvas. Estes são exemplos ilustrativos; os formatos e limites estão
detalhados abaixo.

### Mermaid — `.mmd`, `.mermaid`

Um bom começo para fluxos, sequências e estados. Usa os tipos disponíveis no engine integrado ao Kavor; não assuma
que uma sintaxe recém-adicionada ao Mermaid já existe nele. Cole no CodingAgent para criar um fluxo fictício pequeno.

```prompt
Crie docs/diagrams/checkout.mmd em Mermaid: carrinho → pagamento → confirmação, com um caminho de pagamento recusado.
Adicione como Diagram ao meu grafo e confira o resultado da renderização atual.
Corrija erros reportados; não altere a aplicação nem declare sucesso sem observar o resultado.
```

**Resultado esperado:** um fluxo com caminho de falha legível e resultado de renderização reportado. Se ainda não
houver uma observação válida, o agente informa `not_rendered`, não um sucesso presumido.

### PlantUML — `.puml`, `.plantuml`

Para UML, sequências, Gantt, mapas mentais e wireframes. O engine JavaScript não exige instalar Java. Bibliotecas
padrão, incluindo C4, são obtidas sob demanda; o primeiro uso de C4 pode exigir download adicional. Cole no CodingAgent.

```prompt
Crie docs/diagrams/checkout-context.puml usando a biblioteca C4: cliente, loja e provedor externo de pagamentos.
Identifique as relações, adicione o arquivo como Diagram e consulte o resultado atual.
Se faltar uma biblioteca ou houver erro, reporte o motivo antes de afirmar que o desenho está pronto.
```

**Resultado esperado:** um contexto C4 simples, com a dependência externa explícita. Falta de rede ou de biblioteca
não deve ser confundida com validação do desenho.

### Graphviz — `.dot`, `.gv`

Para grafos em que a disposição dos vértices ajuda a entender dependências. Os layouts são os incluídos no engine
integrado. Cole no CodingAgent; neste exemplo, as dependências são fictícias, não inferidas do seu repositório.

```prompt
Crie docs/diagrams/dependencies.dot: web depende de api; api depende de billing e catalog; ambos dependem de storage.
Organize o grafo da esquerda para a direita, adicione como Diagram e confira a renderização atual.
Não invente dependências do projeto real; este é apenas o exemplo descrito.
```

**Resultado esperado:** um grafo de dependências rotulado, sem transformar uma ilustração em diagnóstico do projeto.

### D2 — `.d2`

Para arquitetura e relações entre componentes. Kavor oferece layouts **Dagre e ELK**; **TALA não é suportado**.
Cole no CodingAgent e mantenha a escolha de layout explícita quando ela importar.

```prompt
Crie docs/diagrams/order-service.d2 com layout Dagre: cliente, API, fila e worker, mostrando o caminho de um pedido.
Adicione como Diagram e confira a renderização atual. Use somente recursos compatíveis com Dagre ou ELK, sem TALA.
Reporte qualquer erro e não altere a infraestrutura real.
```

**Resultado esperado:** um desenho de arquitetura legível, sem depender de TALA ou criar os serviços ilustrados.

### SVG — `.svg`

Para desenhos vetoriais em que você quer controlar formas, rótulos e composição diretamente. A renderização é
embutida. Cole no CodingAgent e peça explicitamente um **Diagram**, preservando a distinção em relação ao File comum.

```prompt
Crie docs/diagrams/review-cycle.svg: três caixas, Builder, Reviewer e decisão humana, ligadas nessa ordem.
Use SVG autocontido, sem scripts nem recursos remotos, e adicione explicitamente como Diagram, não como File.
Confira a renderização atual e reporte o resultado sem modificar outros Nodes.
```

**Resultado esperado:** um vetor apresentado como Diagram. Ter extensão `.svg` sozinho não muda o tipo de um File.

### Excalidraw — `.excalidraw`

Para um desenho exploratório que você quer continuar manipulando visualmente. O arquivo contém a cena Excalidraw;
é o formato com editor visual no Kavor. Cole no CodingAgent para preparar uma cena simples.

```prompt
Crie docs/diagrams/review-workshop.excalidraw com uma cena válida: ideia, implementação e revisão, com setas e rótulos.
Adicione como Diagram e confira a renderização. Deixe o desenho simples para eu continuar pelo Edit drawing.
Não substitua um arquivo já existente nem afirme que minha revisão foi feita.
```

**Resultado esperado:** uma cena que você pode abrir em `Edit drawing`. A geração de uma cena não resolve por si só
a qualidade do fluxo representado; revise-a antes de usá-la como decisão.

### draw.io — `.drawio`

Para visualizar diagramas desse formato, incluindo páginas e camadas. **View only**: não há editor visual nem edição
do XML na Source do Kavor. Produza ou edite o arquivo com uma ferramenta externa, inclusive o CodingAgent pelo
filesystem quando autorizado. Cole no agente para gerar um exemplo novo, não sobrescrever um documento seu.

```prompt
Crie docs/diagrams/order-overview.drawio como um arquivo draw.io válido com uma página: cliente → API → banco.
Adicione o arquivo existente como Diagram e confira a renderização atual.
Não use New diagram para draw.io e não prometa edição visual dentro do Kavor.
```

**Resultado esperado:** uma página consultável no Node. Para alterar o desenho depois, use o aplicativo externo ou
uma edição autorizada da fonte; o Kavor acompanha a mudança no arquivo.

### Vega-Lite / Vega — `.vl.json`, `.vg.json`

Para gráficos de dados. `.vl.json` seleciona Vega-Lite; `.vg.json`, Vega. São gramáticas diferentes, não basta trocar
a extensão. Para um exemplo sem dependência de rede, cole no CodingAgent e peça dados embutidos.

```prompt
Crie docs/diagrams/build-times.vl.json em Vega-Lite: barras para tempos de build fictícios de 12, 18 e 9 segundos.
Inclua os dados no próprio JSON, nomeie os eixos e não busque datasets externos.
Adicione como Diagram e confira a renderização atual.
```

**Resultado esperado:** um gráfico comparável e com unidades claras. Para trabalhar em Vega, peça explicitamente
essa gramática e um caminho `.vg.json`. Um dataset remoto ainda depende de rede, mesmo com o engine em cache.

### WaveDrom — `.wavedrom`

Para temporização de sinais digitais. A fonte usada pelo Kavor é JSON válido; não um script JavaScript. Cole no
CodingAgent para visualizar um handshake simples.

```prompt
Crie docs/diagrams/handshake.wavedrom em JSON válido com clock, request e acknowledge ao longo de oito ciclos.
Deixe explícito quando o acknowledge responde ao request; não execute nenhum script.
Adicione como Diagram e consulte o resultado atual, corrigindo erros reportados pelo engine.
```

**Resultado esperado:** sinais alinhados no tempo. O desenho explica o exemplo; não comprova uma medição de hardware.

### nomnoml — `.nomnoml`, `.noml`

Para esboços UML concisos. A sintaxe é própria do nomnoml, não intercambiável com PlantUML. Cole no CodingAgent.

```prompt
Crie docs/diagrams/order-model.nomnoml com Order, OrderItem e Product, mostrando as relações e poucos atributos.
Use a sintaxe nomnoml, adicione como Diagram e confira a renderização atual.
Mantenha o modelo fictício; não altere classes nem schema do projeto.
```

**Resultado esperado:** um esboço de entidades para discussão, sem converter o desenho em implementação automática.

### Pikchr — `.pikchr`

Para composições técnicas na linguagem de desenho PIC-style. Usa a gramática Pikchr, não um programa PIC arbitrário.
Cole no CodingAgent para um desenho pequeno de processamento.

```prompt
Crie docs/diagrams/processing.pikchr com entrada, transformação e saída, usando caixas rotuladas e setas.
Use sintaxe Pikchr, adicione como Diagram e confira a renderização atual.
Se o engine rejeitar a fonte, corrija o erro observado antes de reportar o resultado.
```

**Resultado esperado:** uma composição vetorial simples. Sintaxe visualmente plausível não substitui a observação do
resultado do engine.

### Svgbob — `.bob`

Para transformar um esboço ASCII em desenho vetorial. O alinhamento do texto faz parte da fonte. Cole no
CodingAgent e preserve o alinhamento no arquivo.

```prompt
Crie docs/diagrams/request-path.bob em ASCII: duas caixas rotuladas Client e Server, conectadas por uma seta.
Preserve o alinhamento, adicione como Diagram e confira a renderização atual.
Não apenas cole uma imagem: mantenha o esboço textual como fonte editável.
```

**Resultado esperado:** um desenho a partir do esboço textual. Mudanças nos espaços podem mudar a geometria.

### DBML — `.dbml`

Para discutir tabelas, colunas e relacionamentos. A fonte é DBML, não SQL; renderizar não cria tabelas nem executa uma
migration. Cole no CodingAgent usando um modelo fictício.

```prompt
Crie docs/diagrams/shop-schema.dbml com customers, orders e order_items, indicando chaves e relacionamentos.
Adicione como Diagram e confira a renderização atual.
Não conecte a banco real, não gere migrations e não trate o exemplo como o schema do meu projeto.
```

**Resultado esperado:** um modelo de dados revisável. Se quiser representar o schema real depois, forneça fontes
autorizadas e mantenha descobertas, hipóteses e decisões separadas.

## Alterne entre desenho e fonte

- **Diagram:** prioriza o resultado visual. Arquivos existentes abrem nessa vista.
- **Source:** mostra a fonte. Nos formatos editáveis, usa o editor e o fluxo de salvamento dos Files.
- **Split:** fonte à esquerda e preview à direita, útil para ajustar e comparar sem alternar de contexto.

Novos formatos de fonte abrem em Source. No Excalidraw, use **Edit drawing** para entrar no editor visual e **Finish
editing** para voltar ao desenho. As mudanças usam o mesmo arquivo e fluxo de salvamento; não existe um segundo Save
separado para o desenho. Edição visual e edição de fonte não ficam ativas ao mesmo tempo.

draw.io mantém Source somente para leitura. Use **Open with default app** para trabalhar em um editor externo.

Na vista Diagram, arrastar com o botão direito move a visão interna; pinch ou `Ctrl`/`⌘` + roda ajusta o zoom, sem
arrastar o Canvas. Use os controles de zoom e **Fit** para enquadrar. O cabeçalho continua sendo a área para mover o
Node. O editor Excalidraw mantém seus próprios controles.

[![PlantUML em Split, com fonte à esquerda e renderização à direita, e outro Diagram aberto no editor visual do Excalidraw.](https://media.agentkavor.com/editorial/diagrams/source-editing/image.71cde50ac832.jpg)](https://media.agentkavor.com/editorial/diagrams/source-editing/native.57f2690ef912.png)

Nos formatos de fonte, Split aproxima código e resultado. Excalidraw oferece também edição visual do próprio
desenho.

### Quando o preview fica desatualizado

Se uma edição não renderizar, o último resultado bem-sucedido pode continuar visível com **Preview out of date** e o
erro do engine. Ele pertence à fonte anterior, não prova sucesso da nova. Quando houver uma linha real reportada,
você pode abri-la em Source; um arquivo que nunca renderizou mostra a fonte e a falha.

Corrija a sintaxe, salve e confira o resultado atual. Problemas de salvamento e conflitos são diferentes de falhas
de renderização; não descarte uma edição local só porque ainda há um desenho na tela.

### Exporte para compartilhar

A ação **Export** oferece SVG e PNG do desenho completo, não uma captura recortada do que cabe no Node. Em draw.io,
exporta a página ativa e suas camadas. Se o preview estiver desatualizado, a exportação usa o último render
bem-sucedido e informa isso. Sem nenhum resultado renderizado, exportar fica indisponível.

## Use o painel Diagrams sem preencher o Canvas

O painel encontra arquivos de diagrama recursivamente dentro das **Documentation roots**, respeita `.gitignore` e
permite buscar por nome ou caminho e filtrar por formato em **All formats**. Ele não faz uma busca geral por todos
os arquivos do Workspace.

A listagem espelha a hierarquia real de pastas no disco. Sem busca ou filtro de formato, ela inclui pastas vazias;
expanda e recolha os diretórios para navegar. Com várias roots, a árvore é agrupada por raiz.

Specs e Diagrams mostram as mesmas **Documentation roots**. Uma pasta criada em um painel aparece no outro: é a
mesma pasta no disco, não uma cópia. Isso não transforma uma Specification em diagrama nem muda seu ciclo de vida.

- **Preview:** abre uma visualização somente para leitura, sem adicionar Node. Hover ou seleção da linha não a abre.
  Há uma prévia por vez; `Escape` fecha e devolve o foco à ação.
- **Add to Canvas:** adiciona a fonte; quando já houver um Node, a ação localiza o existente.
- **New diagram:** cria pelo formulário inline, com formato e nome.
- **Show in File Manager:** localiza o arquivo ou a pasta no gerenciador do sistema.

Uma prévia pode precisar baixar o engine daquele formato. Fechá-la não transforma um resultado atrasado em
renderização válida de outro arquivo.

[![Painel Diagrams com a prévia de um arquivo Excalidraw aberta fora do Canvas e o menu Add to Canvas de outro arquivo.](https://media.agentkavor.com/editorial/diagrams/panel-preview/image.b05789ae15d3.jpg)](https://media.agentkavor.com/editorial/diagrams/panel-preview/native.1e11695f5729.png)

Preview permite consultar o desenho sem criar um Node. Add to Canvas é uma ação separada.

### Crie e organize pastas

Abra o menu de contexto de uma pasta na árvore:

- **New Diagram…:** abre o formulário inline para criar dentro daquela pasta, mesmo que ela não seja o destino
  padrão em **Diagrams folder**. Escolha o formato, informe o nome e confira o caminho.
- **New Folder…:** cria uma subpasta real; ela pode ficar vazia até você precisar de um diagrama ali.
- **Rename Folder…:** muda o nome da pasta sem escolher outro diretório pai. Os Diagram Nodes afetados acompanham
  o novo caminho.
- **Show in File Manager:** abre a localização no gerenciador do sistema.

As Documentation roots configuradas não podem ser renomeadas ou excluídas por essas ações. Para mudar as raízes de
descoberta ou o destino padrão de novas criações, use as configurações do Workspace, não a exclusão de uma pasta.

### Renomeie, mova e versione o arquivo

No menu de contexto de um diagrama, **Rename Diagram…** altera o nome do arquivo preservando a extensão, inclusive
extensões compostas como `.vl.json`. Para mover o arquivo, arraste a linha até outra pasta ou raiz da árvore. Se ele
já for rastreado pelo Git, a movimentação usa `git mv`; um arquivo não rastreado também pode ser movido.

O Diagram Node acompanha o caminho após renomear o arquivo, renomear sua pasta ou mover o diagrama. Você não precisa
adicioná-lo de novo: a identidade do Node e suas Connections são preservadas.

Em um repositório Git, **Commit Diagram** cria um commit somente do caminho daquele arquivo e mostra o hash
resultante. Não inclui mudanças de outros caminhos que já estejam no stage. A ação funciona mesmo sem um Node no
Canvas; versiona o arquivo, não uma captura do desenho.

Se houver edição local ainda não salva, resolva a decisão apresentada antes de mudar a fonte ou fazer o commit. Se
a operação falhar, leia a mensagem no painel e corrija a causa; não considere um movimento ou commit concluído só
porque iniciou a ação.

### Exclua sem confundir arquivo e Node

**Delete Diagram**, no menu do arquivo e após confirmação, apaga a fonte e remove seus Diagram Nodes. É diferente
de remover apenas um Node do Canvas, que mantém o arquivo.

**Delete Folder and Contents** exige confirmação e só exclui uma subárvore que contenha arquivos de diagrama
reconhecidos e diretórios reais. Se encontrar uma Specification, outro tipo de arquivo, uma entrada oculta ou um
link simbólico, o painel recusa a operação antes de mudar qualquer coisa e orienta usar **Files** para lidar com
conteúdo misto. A checagem é específica de Diagrams; não altera as regras de exclusão do painel Specs.

Ao excluir um diagrama individual rastreado, o Kavor usa o fluxo de exclusão do Git. Se o Git recusar a operação,
por exemplo por mudanças locais, resolva o estado indicado antes de tentar novamente; a confirmação não autoriza
descartar essas mudanças à força.

## Leve a fonte ao grafo

Um Diagram alcançável oferece fonte e resultado visual ao trabalho de um CodingAgent. Não é necessário conectar
todos os agentes diretamente a ele; uma Connection direta é importante quando você quer aplicar
`diagram_read_only` àquele par.

Uma Connection **Diagram + Terminal** fornece o caminho absoluto da fonte por uma variável de ambiente escolhida
por você, como em File + Terminal. O valor é o caminho, não o SVG ou PNG renderizado. Configure antes de iniciar a
sessão ou reinicie-a para receber uma mudança no parâmetro. Veja a [matriz de Connections](./connections.md).

## Downloads, privacidade e modo offline

O desenho é renderizado dentro do Kavor; ele não é enviado a um serviço externo de renderização. Engines, fontes e
recursos auxiliares são baixados sob demanda, verificados e guardados no cache de dados do aplicativo. Abrir o Kavor
ou um Workspace não baixa todos os formatos. SVG usa a apresentação embutida.

Depois do primeiro uso, recursos já obtidos podem ser reutilizados offline. O editor Excalidraw só é baixado quando
você entra em edição; bibliotecas PlantUML, como C4, e recursos do draw.io também podem precisar de um primeiro
download. Uma atualização do Kavor que troque esses recursos pode exigir novo download no próximo uso.

Na primeira tentativa offline ou em uma falha de download, o Node mostra o motivo e **Retry**. A fonte dos formatos
editáveis continua disponível; tente novamente quando os recursos puderem ser obtidos.

**Cache do engine não significa ausência total de rede.** O próprio conteúdo pode referenciar imagens, datasets ou
outros recursos remotos. Includes locais são resolvidos a partir da pasta do diagrama e suas mudanças podem
atualizar o desenho. Revise fontes que não conhece antes de abri-las; para uso offline, prefira conteúdo autocontido
e prepare antes todos os recursos necessários.

A superfície do diagrama é isolada da interface privilegiada do aplicativo. Isso não transforma referências do
desenho em fontes confiáveis. Se você pedir a um CodingAgent para produzir ou analisar conteúdo, a participação do
provider segue as condições do harness escolhido; não confunda renderização local com processamento local do modelo.

## Continue

- [Adicione conteúdo ao Canvas](./adding-content.md) sem copiar desnecessariamente suas fontes.
- Mantenha decisões na [Specification](./specification.md) e use o desenho para explicá-las.
- Confira [as Connections suportadas](./connections.md) e [os limites de contexto dos CodingAgents](./coding-agents-and-canvas.md).
