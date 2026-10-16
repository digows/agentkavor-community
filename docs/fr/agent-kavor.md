---
id: agent-kavor
title: "Agent Kavor : échangez avec vos agents via Channels"
description: Associez WhatsApp, choisissez un CodingAgent et participez depuis Self-chat ou un groupe dédié au Workspace.
kind: guide
lastReviewedAt: 2026-10-16
canonicalUrl: https://agentkavor.com/fr/docs/agent-kavor
---

# Agent Kavor : emportez la conversation

Vous laissez un CodingAgent travailler et quittez votre ordinateur sans perdre le contact. Agent Kavor permet
d'envoyer des demandes, de suivre les réponses et de participer aux décisions via **Channels**. **WhatsApp** est le
premier Channel disponible.

Agent Kavor n'est ni un autre modèle ni un agent hébergé remplaçant vos CodingAgents. C'est l'expérience de dialogue
via Channels, tandis que le travail reste dans les Workspaces de Kavor. Un Channel n'est pas non plus un Node ou une
Connection du Canvas : il transporte la conversation ; le graphe définit toujours le contexte et les capacités de l'agent.

## Avant de commencer

- Gardez Kavor ouvert et authentifié sur le desktop, avec un accès réseau. L'ordinateur doit rester éveillé.
- Préparez un Workspace et un CodingAgent configurés, avec le harness et son authentification.
- Utilisez un compte WhatsApp que vous pouvez associer comme appareil. Self-chat est le chemin le plus court pour commencer.

Les demandes restent soumises à la configuration du CodingAgent, aux limites du provider et aux contrôles humains.
Un message sur le téléphone ne contourne pas une approbation en attente sur le desktop.

## 1. Associez votre compte sur le desktop

1. Ouvrez **Channels** dans la barre supérieure de Kavor.
2. Lancez l'association WhatsApp. Scannez le QR code ou choisissez **Link with a code**, puis confirmez dans le compte
   WhatsApp concerné. Le code d'association n'est pas une connexion par SMS.
3. Attendez la confirmation. Une association explicite réussie active le Channel.
4. Dans **Personal chat**, choisissez **Self-chat**. Si vous associez un autre compte, vous pouvez aussi définir
   **Another number** comme destinataire personnel. Les paramètres s'enregistrent automatiquement.

![Channels sur le desktop avec WhatsApp connecté, Self-chat sélectionné et configuration des groupes par Workspace](https://media.agentkavor.com/releases/2.0.0/whatsapp/setup/master.2552b26a5322.png)

Le test d'envoi utilise le destinataire personnel indiqué : il ne lance aucun travail de CodingAgent et n'envoie
pas de message à tous les groupes. Vérifiez la destination avant de l'utiliser.

## 2. Choisissez Workspace et agent dans Self-chat

Ouvrez votre conversation personnelle dans WhatsApp. L'onboarding propose d'abord un Workspace, puis un CodingAgent.
Répondez aux sélections et vérifiez la confirmation du contexte avant d'envoyer votre première demande.

![Onboarding WhatsApp avec Workspace et CodingAgent sélectionnés et confirmation du contexte](https://media.agentkavor.com/releases/2.0.0/whatsapp/onboarding/poster-framed.7636ed112536.png)

[Voir la sélection du Workspace et de l'agent dans WhatsApp →](https://agentkavor.com/fr/videos/whatsapp-onboarding)

La conversation personnelle conserve sa sélection. Consultez ou changez le contexte sans refaire l'association :

| Votre objectif | Commande |
| --- | --- |
| Vérifier le Workspace et l'agent sélectionnés | `/context` |
| Lister les Workspaces | `/workspaces` |
| Changer de Workspace dans la conversation personnelle | `/workspace "Mon projet"` |
| Lister les agents du Workspace | `/agents` |
| Choisir l'agent par défaut | `/agent "Reviewer"` |
| Consulter l'état sans demander une analyse | `/status` |
| Voir les commandes et exemples disponibles | `/help` |

Utilisez les noms réellement affichés par Kavor. Une mention explicite comme `@Reviewer` adresse une demande à un
autre agent sans changer celui par défaut. L'état d'exécution ne prouve pas qu'une implémentation a passé tests ou revue.

## 3. Participez à distance

Envoyez une demande claire à l'agent sélectionné. Par exemple :

> Vérifie les résultats des tests de la tâche en cours. Ne modifie pas le code. Indique ce qui a réussi, ce qui a
> échoué et les preuves que tu as pu consulter.

Suivez la progression et la réponse dans la même conversation. Lorsqu'une décision est nécessaire, répondez à la
question correspondante avec les choix proposés ou le format demandé. Une confirmation d'envoi n'est pas une confirmation de fin.

[Voir une demande à distance et la réponse complète du CodingAgent →](https://agentkavor.com/fr/videos/whatsapp-agent-interaction)

Échangez images, vidéos, audio et fichiers, avec ou sans texte. Leur interprétation dépend du harness et de ses
outils ; Kavor ne promet ni transcription automatique ni compréhension de tous les formats par chaque agent.

Les pièces jointes gérées et leurs copies temporaires expirent **sept jours après un upload réussi**. Les lectures
et nouvelles tentatives ne prolongent pas ce délai. Renvoyez une pièce expirée ; l'expiration n'efface ni vos fichiers
originaux ni le texte des messages.

## 4. Séparez les projets en groupes de Workspace

Un groupe conserve une conversation liée à un projet sans changer de Workspace dans Self-chat.

1. Après l'association, sélectionnez les Workspaces souhaités dans **Workspace groups** et confirmez la création.
   Vous pouvez aussi gérer l'association dans l'onglet Channels du Workspace et sélectionner un groupe existant.
2. Vérifiez le résultat de chaque Workspace. Un nouveau groupe s'appelle `Kavor · Nom du Workspace`.
3. Ouvrez le groupe et choisissez un CodingAgent avec `/agents` et `/agent "Nom"`, ou mentionnez-le explicitement.

Le Workspace du groupe est fixe. Son agent par défaut peut changer dans ce projet ; `/workspace` ne change pas le
projet du groupe. Les nouveaux Workspaces ne reçoivent pas automatiquement de groupe.

[Voir la création et l'ouverture d'un groupe dédié au Workspace →](https://agentkavor.com/fr/videos/whatsapp-workspace-group)

**Choisissez les participants avec soin.** Par défaut, **All messages** permet d'envoyer des demandes et de répondre
aux questions. **Mentions & replies** exige une mention du compte associé, le marqueur `@kavor` ou une réponse citant
un message Kavor. Cela filtre l'activation, sans créer un système de permissions individuelles. Ajouter des personnes
peut déléguer l'accès au travail de vos agents.

## Connexion, confidentialité et récupération

- **Ordinateur indisponible :** WhatsApp ne transforme pas Kavor en service hébergé. Rétablissez le desktop et vérifiez
  l'état réel avant de renvoyer une action ayant peut-être déjà produit des effets.
- **Agent sans réponse :** vérifiez `/context` et `/status`, puis l'authentification, les dialogues et approbations
  en attente sur le desktop. Le silence ne prouve ni le succès ni l'autorisation de répéter une demande destructive.
- **Connexion interrompue :** utilisez les contrôles de reconnexion de Channels. Arrêter préserve l'association ;
  dissocier est une autre action. Une reconnexion automatique ne doit pas annuler un arrêt ou une désactivation explicite.
- **Question ou sélection obsolète :** vérifiez le contexte et demandez une sélection actualisée. Ne supposez pas
  qu'une ancienne option désigne toujours le même destinataire.
- **Confidentialité :** exécution et identifiants d'association restent sur l'ordinateur, mais les messages utilisent
  WhatsApp et les pièces jointes un stockage temporaire géré par Kavor. Ne partagez que du contenu autorisé.
- **Limites WhatsApp :** l'intégration utilise les appareils associés, pas la WhatsApp Business API hébergée par Meta.
  Règles, restrictions et suspensions de compte restent sous le contrôle de Meta.

## Continuer

- Comprenez [ce qu'un CodingAgent peut faire dans le graphe](./coding-agent.md).
- Organisez [les messages et la collaboration entre agents](./coding-agents-and-canvas.md).
- Consultez [les modes de livraison et Guardrails des Connections](./connections.md).
- [Suggérez un autre Channel avec un cas réel](https://github.com/digows/agentkavor-community/discussions/new?category=ideas).
