---
id: coding-agent-accounts
title: "CodingAgent Accounts: suas contas, uso e rotação"
description: Acompanhe limites dos providers, adicione suas contas e escolha como os CodingAgents compartilham capacidade entre Workspaces sem substituir seu login nativo.
kind: guide
lastReviewedAt: 2026-10-24
canonicalUrl: https://agentkavor.com/pt-br/docs/coding-agent-accounts
---

# CodingAgent Accounts: suas contas, uso e rotação

## Visão geral

Uma Specification pode ter um Builder e um Reviewer trabalhando ao mesmo tempo, enquanto outro Workspace usa uma
terceira sessão. Essas sessões não precisam disputar o mesmo login sem que você perceba: **CodingAgent Accounts**
mostra a capacidade das suas contas e permite escolher como os CodingAgents a utilizam.

O pool pertence a você e é compartilhado entre seus Workspaces. Não é um recurso para compartilhar contas com outras
pessoas. A configuração é opcional: com apenas o login nativo do provider, você continua trabalhando como antes.

O login já existente no computador é a conta principal, **Main**. Quando o provider informa seu e-mail, o Kavor usa
esse e-mail sozinho como nome de exibição; se a identidade não está disponível, mostra **Main**. Adicionar uma conta
no Kavor não substitui esse login nem desconecta os aplicativos do provider que o usam.

Comece pelo grupo **Accounts** no header do Workspace. Passe o ponteiro sobre um provider para ver o resumo e clique
nele para abrir o painel. Esse painel reúne uso, contas, escolhas do Workspace e preferências; não há outro
gerenciador de contas em Settings.

## Uso

**Os percentuais mostram capacidade restante, não quantidade de agentes.** Vários CodingAgents podem usar a mesma
conta e consumir suas janelas ao mesmo tempo.

![Ilustração da interface dos indicadores Accounts de Claude Code, Codex, Antigravity e Grok.](https://media.agentkavor.com/product/2.1.0/coding-agent-accounts/header.118710635e3f.png)

Ilustração da interface com valores registrados na captura de referência; não representa uma nova leitura de uso dos providers.

### Leia o resumo do header

- Cada indicador usa a cor do seu provider e mostra até duas janelas gerais da conta, da mais curta para a seguinte.
  Uma conta com janelas de cinco horas e semanal mostra essas duas; uma conta apenas mensal não ganha uma janela de
  cinco horas inventada. Os percentuais de contas diferentes não são somados.
- Quando há mais de uma conta em uso nesse Workspace, o resumo representa a que tem menos capacidade restante em
  alguma dessas janelas. O hover identifica as contas em uso e as janelas de cada uma.
- Sem CodingAgents usando aquele provider, o indicador fica esmaecido e mostra a melhor conta disponível conhecida
  entre as que o Workspace pode escolher em Automatic. Isso não significa que ela já foi selecionada.
- **+N** é a reserva de outras contas com capacidade conhecida para a seleção automática desse Workspace, não uma
  reserva exclusiva. Contas também usadas por outros CodingAgents podem contar. **+N?** indica leituras ainda
  desconhecidas; um provider com apenas uma conta não mostra reserva.
- Uma janela fica âmbar ao atingir o limite de rotação. O indicador inteiro fica vermelho-claro quando todas as
  contas que Automatic pode usar nesse Workspace estão confirmadamente no limite configurado ou além dele. Isso é
  informação de capacidade, não um bloqueio de trabalho.

### Confira as janelas e a leitura

No painel, cada janela aparece com a capacidade restante e a próxima renovação. Janelas específicas de modelo ficam
nos detalhes da conta, não no indicador geral. Abra **More** para consultar o horário **Read**, plano, créditos,
resets acumulados e outros dados que o provider realmente informou.

As leituras visíveis são atualizadas periodicamente. Durante uma atualização, a última leitura válida continua
visível com seu horário real; fechar e reabrir o painel não transforma dados antigos em uma observação nova. Uma
falha mostra indisponibilidade ou orientação de login sem substituir os últimos percentuais válidos por valores
inventados. Use **Refresh**, ao lado do seletor de provider, para solicitar uma atualização.

**Unavailable** ou **—** não significam 0% nem 100%. Uma leitura desconhecida não confirma que a conta está sem
capacidade ou que o login expirou. Confira o erro e o horário; tente atualizar ou faça login novamente quando houver
essa indicação. Uma falha de consulta de uso não esconde as ações de adicionar conta ou refazer o login.

| Provider | O que pode ser apresentado |
| --- | --- |
| **Codex** | Janelas primária e secundária, seus períodos e resets, escopo por modelo, créditos e resets acumulados quando informados. Os períodos variam conforme a conta. |
| **Claude Code** | Janelas reconhecidas no resultado nativo de uso, como sessão e semana, com percentuais e resets. Estatísticas locais de tokens ou custo não viram quota. |
| **Grok** | Uso de créditos, período e renovação; plano e saldo pré-pago quando informados. |
| **Antigravity** | Capacidade restante e resets dos grupos ou buckets reportados pelo CLI. |
| **OpenCode** | Não participa deste monitoramento; o uso depende do provider configurado no harness. |

As consultas usam o canal nativo do provider, sem pedir trabalho a um modelo. Consultar um saldo não autoriza gastá-lo.

## Contas

### Adicione e autentique uma conta

1. Abra o painel de um provider compatível: **Codex**, **Claude Code** ou **Grok**.
2. Use **Add account**, dê um nome reconhecível, como `Trabalho`, e confirme **Add account and sign in**.
3. Conclua o login nativo na página do provider e use o código apresentado, quando necessário. O endereço de
   autorização abre uma vez para o fluxo iniciado por você; no provider cujo CLI abre o próprio navegador, o Kavor
   não abre uma segunda aba.
4. Confira o estado de autenticação e a leitura de uso. **Abrir o navegador não significa concluir o login.**
5. Se quiser incluir essa nova conta na seleção automática, ative sua participação no Workspace desejado. Uma conta
   recém-adicionada começa fora de Automatic em todos os Workspaces; o pool global não a habilita por conta própria.

O Kavor prepara um perfil isolado para a conta adicionada. As credenciais ficam no armazenamento usado pelo CLI
daquela conta, não no banco de dados do Kavor. O login nativo Main continua onde já estava.

Para um login expirado, use **Sign in again**. Nas contas gerenciadas, o painel oferece essa ação também quando o
estado de autenticação não pôde ser determinado; isso não transforma uma leitura desconhecida em expiração
confirmada. Cada clique que inicia um login, inclusive uma nova tentativa, abre o endereço de autorização uma vez
quando ele fica disponível. Se a abertura falhar, use **Continue provider sign-in** manualmente. Reabrir o painel ou
restaurar uma operação pendente não abre abas por conta própria.

### Main não é uma cópia do seu login

Main usa o login nativo no próprio local em que o provider o mantém. O painel não oferece login, saída ou remoção
para Main; gerencie esse login com as ferramentas do provider. Quando você muda a conta nativa fora do Kavor, Main
passa a representar esse login, sem uma oferta para recuperar a conta anterior.

Um login nativo sem identidade ou dados de uso, como uma chave de API do Codex, continua funcionando como antes, mas
não participa da rotação automática. O Kavor não lê credenciais para tentar deduzir uma identidade.

### Sair é diferente de remover

**Sign out** mantém a conta na lista para você fazer login novamente. **Remove account** retira a conta da lista e
exclui seu perfil isolado gerenciado pelo Kavor; não apaga o login Main nem o histórico compartilhado das sessões.

Se houver CodingAgents usando a conta, o Kavor mostra os afetados e pede confirmação. A mudança espera o limite
seguro entre turnos e a liberação do processo antigo. Uma escolha fixa daquela conta volta a Automatic; se ela era
a conta padrão de um Workspace, o padrão volta a Main. Sem outra conta, o caminho de execução usa o login nativo.

## Cópia da configuração pessoal

Ao adicionar uma conta, você recebe **uma cópia inicial** da configuração pessoal do provider no ambiente nativo.
Isso evita refazer preferências, skills e MCPs em cada conta. O conteúdo depende do provider e do que existe na origem:

| Provider | O que é copiado |
| --- | --- |
| **Codex** | `config.toml`, com preferências, perfis, MCPs pessoais e providers personalizados; hooks pessoais de `hooks.json`; `AGENTS.md` e os diretórios `skills`, `plugins`, `rules` e `prompts`. `forced_chatgpt_workspace_id` não é copiado. |
| **Claude Code** | `settings.json`, incluindo statusline e hooks pessoais; `keybindings.json`; `CLAUDE.md`; os diretórios `skills`, `plugins`, `rules`, `agents` e `commands`. De `.claude.json`, somente os MCPs pessoais, não o arquivo completo. |
| **Grok** | `config.toml`, com preferências e MCPs pessoais; `AGENTS.md` e os diretórios `skills`, `plugins`, `rules` e `hooks`. |

**Segredos embutidos nessas configurações também são copiados.** Isso inclui valores de ambiente de MCPs, cabeçalhos
HTTP estáticos e chaves de providers personalizados gravados nesses arquivos. Os arquivos mantêm suas permissões;
esses valores não são registrados em logs nem guardados no banco de dados do Kavor.

**O login nativo, os arquivos de autenticação, os itens do Keychain e a identidade da conta nunca são copiados.**
A conta adicionada precisa de seu próprio login. As entradas de integração pertencentes ao Kavor também não são
herdadas: o Kavor prepara sua integração para aquela conta.

É uma cópia, não uma sincronização. Um MCP que você adicionar depois em Main precisa ser configurado também nas
contas em que pretende usá-lo. Alterar uma conta adicionada não muda Main; repetir o login não recopia preferências.

Se a preparação apontar erro de configuração, confira o TOML ou JSON pessoal indicado antes de tentar novamente.
Não copie arquivos de autenticação nem apague o perfil nativo inteiro como tentativa de reparo.

## Troca de conta

### Escolha o comportamento de cada Workspace

Uma escolha **Manual** nas configurações do CodingAgent fixa uma conta para aquele Node e vence a política do
Workspace. Um CodingAgent em **Auto (Automatic)** segue as escolhas do seu Workspace para aquele provider.

No painel de Accounts do Workspace:

- Com **Auto Rotate** ligado, as chaves de participação definem quais contas Automatic pode usar. Cada Workspace
  tem sua própria seleção, mesmo usando o mesmo pool. Uma conta fora dessa seleção continua visível e pode ser
  escolhida manualmente no CodingAgent ou usada em outro Workspace.
- Com uma única conta participante, Automatic permanece nela, mesmo se estiver no limite. Sem participantes, usa
  o login nativo Main, sem rotação automática naquele Workspace.
- Com **Auto Rotate** desligado, os botões de escolha única definem a conta padrão para os CodingAgents em
  Automatic. Ao desligar, Main se torna esse padrão; não é restaurada uma escolha antiga. As participações ficam
  guardadas para quando você ligar Auto Rotate novamente.

Salvar Auto Rotate ou uma participação é imediato e **não reinicia nem redistribui agentes em execução**. Uma
participação passa a valer na próxima escolha automática real, como uma abertura ou uma rotação pelo limite. Já
escolher explicitamente outra conta padrão ou outra conta Manual pode mover os CodingAgents afetados, no limite
seguro entre turnos. Um agente cuja conta efetiva não mudou não é reiniciado.

![Seletor de Workspaces do Kavor diante de várias janelas de Canvas abertas para diferentes projetos de software.](https://media.agentkavor.com/releases/1.3.0/multiple-workspaces/overview.baa20506a993.jpg)

Workspaces independentes podem permanecer abertos em janelas separadas. A participação das contas é configurada no painel Accounts de cada Workspace.

### Como Automatic escolhe outra conta

O limite padrão é **95% de uso**, ajustável em **Rotate at used capacity (%)**, em **Global rotation preferences**.
O Kavor considera autenticação, elegibilidade do plano, modelo escolhido, participação no Workspace e todas as
janelas reportadas. Não troca o modelo para fazer uma conta caber na seleção.

Uma conta atual válida é mantida. Quando precisa escolher entre contas elegíveis abaixo do limite em todas as
janelas, o Kavor prefere, nesta ordem:

1. Uma conta já usada pelos CodingAgents desse Workspace.
2. Uma conta que nenhum outro Workspace esteja usando.
3. A conta compartilhada com menos outros Workspaces.

Entre candidatas equivalentes, prefere a que renova sua capacidade mais cedo. Com quatro Workspaces e quatro contas
elegíveis disponíveis, isso permite distribuir uma conta por Workspace. Não é uma reserva exclusiva: contas podem
ser compartilhadas quando necessário. Abrir ou fechar um Workspace não provoca uma redistribuição geral.

A troca reinicia o harness na outra conta **entre turnos**, retomando a mesma sessão nativa e seu histórico. O Node
mostra as etapas reais de espera, escolha, reinício e retomada. Uma indicação de espera não bloqueia um terminal
ainda utilizável; durante o reinício do CLI, o terminal é fechado e volta quando a sessão está pronta. Uma troca
bem-sucedida não gera notificação do sistema; notificações ficam para falhas reais, com Workspace e CodingAgent.

### Capacidade esgotada e falhas de turno

**Capacidade baixa ou esgotada, por si só, não pausa o CodingAgent, não bloqueia uma mensagem e não desativa a entrada
do terminal.** Sem alternativa com capacidade, ele permanece na conta atual. Uma abertura Automatic inicial sem
conta elegível com capacidade usa Main e informa essa condição. Os limites reais e a cobrança do turno continuam
sendo aplicados pelo provider.

Um login confirmado como expirado é ignorado nas escolhas automáticas; uma falha de rede ou uma leitura desconhecida
não confirmam expiração. Isso não substitui uma escolha Manual.

Em **Codex e Claude Code**, um turno que falhou por quota da conta confirmada pelo provider pode ser retomado em
outra conta, sob as mesmas regras de Automatic e quando é seguro reenviar. Entrega incerta, autenticação, rate limit,
sobrecarga geral e causa desconhecida não autorizam repetir um pedido. **Um turno Grok que falhou não é reenviado
automaticamente**, porque o sinal nativo não distingue quota de rate limit; a rotação pelo limite de uso continua disponível.

### Créditos e resets acumulados

**Allow spending credits** e **Allow spending banked resets** são permissões separadas, desligadas por padrão.
Elas governam a seleção e a rotação feitas pelo Kavor; ver um saldo não ativa nenhuma delas. Com créditos desligados,
uma conta no limite configurado não ganha elegibilidade automática por ainda ter saldo. Isso não interrompe uma
sessão já em execução nem altera sua escolha Manual.

**Essas opções não bloqueiam cobrança nativa dentro de um turno.** Controle no próprio provider os limites de gasto
e o consumo pago da conta. O Kavor não compra créditos nem muda as configurações de cobrança do seu login.

Resets acumulados e suas expirações só aparecem quando reportados. O consumo de um reset acumulado não foi
verificado; a presença do saldo ou da preferência não deve ser interpretada como uma operação de consumo garantida.

## Ferramentas para CodingAgents

Um CodingAgent pode consultar suas contas sem receber credenciais:

- `kavor_coding_agent_account_list_usage` consulta o pool global e os logins nativos, com paginação, janelas, resets,
  elegibilidade e horário da observação; pode filtrar por provider.
- `kavor_coding_agent_account_request_change` solicita a troca da **própria conta** do CodingAgent chamador para o
  fim do turno, respeitando Automatic e as contas permitidas naquele Workspace.

A solicitação é recusada em Manual e não garante que exista uma alternativa elegível. Essas ferramentas não permitem
trocar a conta de outro CodingAgent, fazer login, remover contas, alterar permissões de gastos nem acessar tokens.

Por exemplo:

> Compare as janelas e renovações das minhas contas sem alterar nenhuma seleção. Se recomendar uma troca para sua
> própria sessão, explique quais leituras sustentam a sugestão e respeite minha escolha Manual.

## Comandos do Agent Kavor

Na conversa do **Agent Kavor**, inclusive por um Channel habilitado, os comandos operam no Workspace selecionado,
sem um turno de modelo para interpretar o controle. Use os nomes reais apresentados pelo Kavor:

```text
/accounts
/accounts codex
/account
@Reviewer /account "Trabalho"
@Reviewer /account auto
/autorotate codex off
/autorotate codex on
/status
```

- `/accounts [provider]` mostra o resumo de uso, renovações e reserva do Workspace. Não é uma exportação completa de
  todas as contas: quando há mais resultados ou leituras desconhecidas, indica os limites e aponta para o painel.
- `/account [@Nome]` consulta a conta e o modo do agente selecionado ou indicado. Acrescente o nome ou e-mail de uma
  conta para fixá-la; use `auto` para voltar a Automatic. Nomes com espaços precisam de aspas.
- `/autorotate [provider] on|off` liga ou desliga Auto Rotate nesse Workspace, sem mover agentes em execução.
  Sem provider, usa o do CodingAgent padrão; sem agente padrão, você precisa informar o provider.
- `/status` inclui a conta e suas janelas gerais; `/help` apresenta os controles e exemplos disponíveis.

Fixar outra conta respeita a mesma validação, o limite seguro e o feedback do desktop. Uma resposta ao comando não
prova que a retomada terminou. Adicionar contas, fazer login, sair, remover, alterar participações e escolher a
conta padrão do Workspace continuam sendo ações do painel no desktop. As regras de autorização do Channel não mudam.

Veja [Agent Kavor e Channels](./agent-kavor.md) para selecionar o Workspace e o destinatário antes de operar os controles.

## Suporte e limitações por provider

- **Codex, Claude Code e Grok** oferecem contas gerenciadas e troca com continuidade da sessão. O plano da conta e o
  modelo precisam permitir a execução. Uma configuração isolada não torna um plano inelegível em um plano aceito.
- **Grok** não informa identidade nativa da conta. Main fica com esse nome neutro; plano e saldo não são usados para
  deduzir um e-mail. A exceção de reenvio de turnos está descrita acima.
- **Antigravity** oferece monitoramento da conta da máquina, sem pool, troca de contas ou a cópia de configuração
  descrita neste guia.
- **OpenCode** fica fora do monitoramento e do gerenciamento de contas descritos aqui; seus limites dependem do
  provider configurado no próprio harness.
- Logins sem identidade ou uso reportado continuam disponíveis pelo caminho nativo, sem inventar quota ou ativar
  rotação automática. As informações disponíveis e as janelas podem variar entre contas e modos de autenticação.
- Dados ausentes não são saldos zero. Mudanças nos formatos nativos podem deixar uma observação indisponível;
  confira o horário, a mensagem e o login antes de concluir que a quota acabou.

Para montar o trabalho com essas contas, continue no [guia de CodingAgent](./coding-agent.md) e em
[como dividir agentes e papéis](./agents-and-roles.md).
