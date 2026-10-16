---
id: agent-kavor
title: "Agent Kavor: converse com seus agentes por Channels"
description: Vincule o WhatsApp, escolha um CodingAgent e participe do trabalho pelo Self-chat ou por um grupo dedicado ao Workspace.
kind: guide
lastReviewedAt: 2026-10-16
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

## 3. Participe do trabalho à distância

Envie um pedido claro para o agente selecionado. Por exemplo:

> Confira o resultado dos testes da tarefa em andamento. Não altere código. Me diga o que passou, o que falhou e
> qual evidência você conseguiu consultar.

Acompanhe o andamento e a resposta na mesma conversa. Se o agente precisar de uma decisão, responda à pergunta
correspondente usando as opções ou o formato solicitado. Uma confirmação de envio não é confirmação de conclusão.

[Veja uma solicitação remota e a resposta completa do CodingAgent →](https://agentkavor.com/pt-br/videos/whatsapp-agent-interaction)

Você pode trocar imagens, vídeos, áudio e arquivos, com ou sem texto. A capacidade de interpretar cada formato
depende do harness e das ferramentas disponíveis; o Kavor não promete transcrição automática nem compreensão de
qualquer mídia por qualquer agente.

Anexos gerenciados e suas cópias temporárias expiram **sete dias após o upload bem-sucedido**. Ler ou tentar novamente
não renova esse prazo. Se um anexo expirou, envie-o novamente; isso não apaga seus arquivos originais nem o texto
das mensagens.

## 4. Separe projetos em grupos de Workspace

Use um grupo quando quiser uma conversa permanente ligada a um projeto, sem trocar de Workspace no Self-chat.

1. Após vincular a conta, selecione os Workspaces desejados em **Workspace groups** e confirme a criação dos grupos.
   Você também pode gerenciar a associação na aba Channels do próprio Workspace e selecionar um grupo existente.
2. Confira o resultado de cada Workspace. Um grupo novo usa o nome `Kavor · Nome do Workspace`.
3. Abra o grupo e escolha o CodingAgent com `/agents` e `/agent "Nome"`, ou mencione um agente explicitamente.

O grupo mantém seu Workspace fixo. O agente padrão pode mudar dentro daquele projeto; `/workspace` não troca o
projeto do grupo. Workspaces novos não ganham grupos automaticamente.

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
  do WhatsApp e anexos passam por armazenamento temporário gerenciado pelo Kavor. Envie apenas o que pode compartilhar.
- **Limites do WhatsApp:** a integração usa dispositivos vinculados, não a WhatsApp Business API hospedada pela Meta.
  Regras, restrições e suspensões da conta continuam sob controle da Meta.

## Continue

- Entenda [o que um CodingAgent pode fazer no grafo](./coding-agent.md).
- Organize [mensagens e trabalho entre agentes](./coding-agents-and-canvas.md).
- Confira [modos de entrega e Guardrails das Connections](./connections.md).
- [Sugira outro Channel com um caso de uso real](https://github.com/digows/agentkavor-community/discussions/new?category=ideas).
