---
id: agent-kavor
title: "Agent Kavor: converse com seus agentes por Channels"
description: Vincule o WhatsApp, escolha um CodingAgent e participe do trabalho pelo Self-chat ou por um grupo dedicado ao Workspace.
kind: guide
lastReviewedAt: 2026-10-29
canonicalUrl: https://agentkavor.com/pt-br/docs/agent-kavor
---

# Agent Kavor: a conversa acompanha você

Você deixa um CodingAgent trabalhando e sai do computador. Não precisa perder o contato com o trabalho: pelo
Agent Kavor, você envia pedidos, acompanha respostas e participa das decisões por **Channels**. O primeiro Channel
disponível é o **WhatsApp**.

Agent Kavor não é outro modelo nem um agente hospedado que substitui seus CodingAgents. É a experiência de conversar
com eles pelos Channels, mantendo o trabalho nos Workspaces do Kavor. Um Channel também não é um Node nem uma
Connection do Canvas: ele transporta a conversa; o grafo continua definindo o contexto e as capacidades do agente.

## Antes de começar

- Mantenha o Kavor em execução e autenticado no desktop, com acesso à rede. A máquina precisa permanecer acordada.
- Tenha um Workspace e um CodingAgent configurados, incluindo o harness e sua autenticação.
- Use uma conta WhatsApp que você pode vincular como dispositivo. O Self-chat é o caminho mais curto para começar.

As solicitações continuam sujeitas à configuração do CodingAgent, aos limites do provider e aos controles humanos.
Uma mensagem no telefone não contorna um pedido de aprovação no desktop.

## 1. Vincule sua conta no desktop

1. Abra **Channels** na barra superior do Kavor.
2. Na configuração do WhatsApp, inicie a vinculação. Use o QR code ou a alternativa **Link with a code**, confirmando
   o vínculo no WhatsApp da conta correspondente. O código de vinculação não é login por SMS.
3. Aguarde a confirmação de conexão. Após uma vinculação explícita bem-sucedida, o Channel fica habilitado.
4. Em **Personal chat**, selecione **Self-chat**. Se estiver vinculando outra conta, você também pode configurar
   **Another number** como destino pessoal. As configurações são salvas automaticamente.

![Channels no desktop com WhatsApp conectado, Self-chat selecionado e configuração de grupos por Workspace](https://media.agentkavor.com/releases/2.0.0/whatsapp/setup/master.2552b26a5322.png)

O teste de envio da configuração usa o destino pessoal indicado; não dispara trabalho em um CodingAgent nem envia
uma mensagem para todos os grupos. Confira o destino antes de usá-lo.

## 2. Escolha o Workspace e o agente no Self-chat

Abra sua conversa pessoal no WhatsApp. O onboarding oferece a escolha do Workspace e depois do CodingAgent.
Responda às seleções e confira a confirmação do contexto antes de mandar o primeiro pedido.

![Onboarding no WhatsApp com Workspace e CodingAgent selecionados e confirmação do contexto da conversa](https://media.agentkavor.com/releases/2.0.0/whatsapp/onboarding/poster-framed.7636ed112536.png)

[Veja a seleção de Workspace e agente no WhatsApp →](https://agentkavor.com/pt-br/videos/whatsapp-onboarding)

Sua conversa pessoal mantém a seleção. Você pode conferir ou mudar de contexto sem repetir a vinculação:

| O que você quer fazer | Comando |
| --- | --- |
| Conferir Workspace e agente selecionados | `/context` |
| Listar Workspaces | `/workspaces` |
| Trocar de Workspace na conversa pessoal | `/workspace "Meu projeto"` |
| Listar agentes do Workspace | `/agents` |
| Escolher o agente padrão | `/agent "Reviewer"` |
| Consultar o estado do agente sem pedir uma análise | `/status` |
| Ver comandos e exemplos disponíveis | `/help` |

Use os nomes reais apresentados pelo Kavor. Para dirigir um pedido a outro agente sem mudar o padrão, use uma menção
explícita como `@Reviewer`. Uma consulta de status informa estado de execução; não prova que uma implementação passou
nos testes ou foi revisada.

### Consulte e escolha a conta do CodingAgent

No Workspace selecionado, `/accounts` mostra o uso, as renovações e a reserva de contas por provider. `/account`
informa a conta e o modo do CodingAgent selecionado; `/status` também inclui essa informação.

Para fixar uma conta existente ou voltar à seleção automática, use o nome real da conta:

```text
@Reviewer /account "Trabalho"
@Reviewer /account auto
/autorotate codex off
```

O último comando desliga **Auto Rotate** para Codex nesse Workspace; não move os agentes em execução. Esses são
controles estruturados do Kavor, não pedidos de análise a um modelo. Uma escolha de outra conta respeita a mesma
validação e o limite seguro entre turnos usados pelo desktop; uma resposta ao comando não prova que a troca terminou.

Adicionar contas, fazer login, sair, remover e escolher a participação ou a conta padrão do Workspace continuam no
painel de Accounts do desktop. Veja [CodingAgent Accounts](./coding-agent-accounts.md#comandos-do-agent-kavor) para a
sintaxe completa, os exemplos e o efeito de cada escolha. As regras de quem pode enviar comandos pelo Channel
continuam as mesmas.

## 3. Participe do trabalho à distância

Envie um pedido claro para o agente selecionado. Por exemplo:

No WhatsApp já vinculado, confirme o Workspace e o CodingAgent com `/context`. Envie o pedido para esse agente, com a tarefa e suas evidências alcançáveis.

```prompt
Confira o resultado dos testes da tarefa em andamento. Não altere código. Me diga o que passou, o que falhou e
qual evidência você conseguiu consultar.
```

**Resultado esperado:** Uma resposta distingue passou, falhou e não verificado, com a evidência consultada. O pedido não autoriza mudanças de código.

Acompanhe o andamento e a resposta na mesma conversa. Se o agente precisar de uma decisão, responda à pergunta
correspondente usando as opções ou o formato solicitado. Uma confirmação de envio não é confirmação de conclusão.

Os avisos curtos de estado mantêm o contexto e o texto na mesma linha, sem retirar a formatação. Em uma tela estreita,
essa linha pode quebrar naturalmente. Respostas completas, perguntas e conteúdo longo preservam sua própria disposição.

[Veja uma solicitação remota e a resposta completa do CodingAgent →](https://agentkavor.com/pt-br/videos/whatsapp-agent-interaction)

### Receba avisos sem iniciar outro pedido no WhatsApp

Você pode pedir ao CodingAgent, inclusive na sessão do desktop, que publique o resultado em uma conversa já
configurada. Por exemplo:

No desktop, peça ao CodingAgent responsável pela revisão. O grupo do Workspace deve estar configurado e habilitado; confira se o resumo pode ser compartilhado com seus participantes.

```prompt
Quando concluir esta revisão, envie o resumo no grupo de WhatsApp deste Workspace. Não publique em outras conversas.
```

**Resultado esperado:** O agente publica o resultado apenas no destino pedido ou informa por que não conseguiu enviá-lo. Concluir a revisão e confirmar a publicação são resultados distintos.

O agente descobre as conversas habilitadas do seu Workspace e escolhe explicitamente um destino. Um Channel pode
ter várias conversas: isso não é envio para todos os grupos nem uma publicação automática de tudo que aparece no
terminal do agente.

Esse aviso não precisa responder a uma mensagem anterior do WhatsApp. Já a resposta a um pedido recebido retorna
à conversa original, mesmo se você mudar o Workspace ou o agente padrão depois. Citar uma resposta conhecida de um
CodingAgent dirige o novo pedido ao autor daquela resposta, sem trocar o agente padrão da conversa.

### Envie áudio, mantendo o original

Você pode enviar uma gravação sozinha ou acompanhada de texto. Antes de entregar esse pedido a qualquer CodingAgent
destinatário, o Kavor prepara automaticamente uma transcrição e a identifica como texto gerado a partir do áudio.
A legenda, o arquivo original e a seleção de destinatários são preservados; a transcrição pode conter erros e não
substitui a gravação.

Os agentes que recebem o mesmo pedido usam o mesmo resultado. Reenviar exatamente o mesmo pedido ou recuperar seu
contexto reutiliza a referência daquele áudio, em vez de solicitar uma transcrição diferente para cada agente. O limite de
transcrição é **25 MB por áudio (25.000.000 bytes)**, distinto do armazenamento de anexos originais.

Falar um comando como `/shutdown` não aciona o controle do Kavor: a fala transcrita é conteúdo do pedido, não entrada
do interpretador de comandos. Para operar um controle, use o comando escrito correspondente.

Se a preparação falhar, você recebe um aviso na conversa original e os agentes em espera não recebem aquele pedido.
Siga a orientação do aviso ou envie o pedido em texto. Uma gravação ilegível ou sem fala pode exigir outro áudio;
uma gravação grande demais pode ser substituída por uma mais curta. Falha de serviço ou limite de uso não significa
que o CodingAgent começou a trabalhar. Se o resultado não foi confirmado, não presuma sucesso nem uma nova tentativa
automática.

A transcrição usa um serviço autenticado na nuvem e precisa de rede; não é uma operação 100% offline. O computador
continua executando seus CodingAgents, e o áudio original mantém o mesmo prazo de acesso e expiração.

### Imagens, vídeos e outros arquivos

Você também pode trocar imagens, vídeos e arquivos, com ou sem texto. Imagens dependem da entrada nativa ou de uma
ferramenta de leitura compatível com o harness e o modelo escolhidos. Vídeos são fornecidos como o arquivo original,
em melhor esforço, sem promessa de interpretação por qualquer agente. O Kavor não converte o vídeo nem extrai
quadros automaticamente.

Anexos gerenciados e suas cópias temporárias expiram **sete dias após o upload bem-sucedido**. Ler ou tentar novamente
não renova esse prazo, e a transcrição também não o prolonga. Se um anexo expirou, envie-o novamente; isso não apaga
seus arquivos originais nem o texto das mensagens.

## 4. Separe projetos em grupos de Workspace

Use um grupo quando quiser uma conversa permanente ligada a um projeto, sem trocar de Workspace no Self-chat.

1. Após vincular a conta, selecione os Workspaces desejados em **Workspace groups** e confirme a criação dos grupos.
   Você também pode gerenciar a associação na aba Channels do próprio Workspace e selecionar um grupo existente.
2. Confira o resultado de cada Workspace. Um grupo novo usa o nome `Kavor · Nome do Workspace`.
3. Abra o grupo e escolha o CodingAgent com `/agents` e `/agent "Nome"`, ou mencione um agente explicitamente.

O grupo mantém seu Workspace fixo. O agente padrão pode mudar dentro daquele projeto; `/workspace` não troca o
projeto do grupo. Workspaces novos não ganham grupos automaticamente.

Em Channels do Workspace, **Check group** confere se a conta vinculada ainda consegue acessar o grupo. Um grupo
indisponível para essa conta não é necessariamente um grupo apagado. Uma falha temporária de conexão também não
remove sua associação automaticamente.

Para trocar a associação, use **Remove group link** e confirme. Isso desvincula somente aquele Workspace: preserva
o grupo no WhatsApp, a vinculação do telefone, o histórico aceito e os outros Workspaces. Depois, você pode escolher
outro grupo ou criar um novo. Se uma criação ainda não foi confirmada, confira seu resultado antes de repetir a ação.

[Veja a criação e a abertura de um grupo dedicado ao Workspace →](https://agentkavor.com/pt-br/videos/whatsapp-workspace-group)

**Escolha com cuidado quem participa.** Por padrão, **All messages** permite que participantes enviem pedidos e
respondam perguntas. A configuração **Mentions & replies** exige uma menção à conta vinculada, o marcador `@kavor`
ou uma resposta citando uma mensagem do Kavor. Isso filtra a ativação; não transforma o grupo em um sistema de
permissões individuais. Adicionar participantes pode delegar acesso ao trabalho dos seus agentes.

## Conexão, privacidade e recuperação

- **Computador indisponível:** o WhatsApp não transforma o Kavor em um serviço hospedado. Retome o desktop e confira
  o estado real antes de reenviar uma ação que possa ter produzido efeitos.
- **Agente sem resposta:** confira `/context` e `/status`, depois veja se há autenticação, diálogo ou aprovação
  pendente no desktop. Não trate silêncio como sucesso nem como autorização para repetir um pedido destrutivo.
- **Conexão interrompida:** use os controles de reconexão em Channels. Parar a conexão preserva a vinculação;
  desvincular é uma ação diferente. Uma parada ou desativação explícita não deve ser desfeita por reconexão automática.
- **Pergunta ou seleção desatualizada:** consulte o contexto e peça uma seleção atual. Não responda a uma opção antiga
  supondo que ela ainda identifica o mesmo alvo.
- **Limites de privacidade:** execução e credenciais de vinculação ficam no computador, mas mensagens usam os serviços
  do WhatsApp, anexos passam por armazenamento temporário gerenciado pelo Kavor e o áudio recebido usa transcrição
  na nuvem. Envie apenas o que pode compartilhar.
- **Limites do WhatsApp:** a integração usa dispositivos vinculados, não a WhatsApp Business API hospedada pela Meta.
  Regras, restrições e suspensões da conta continuam sob controle da Meta.

## Continue

- Entenda [o que um CodingAgent pode fazer no grafo](./coding-agent.md).
- Organize [mensagens e trabalho entre agentes](./coding-agents-and-canvas.md).
- Confira [modos de entrega e Guardrails das Connections](./connections.md).
- [Sugira outro Channel com um caso de uso real](https://github.com/digows/agentkavor-community/discussions/new?category=ideas).
