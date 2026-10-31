---
id: agent-kavor
title: "Agent Kavor : échangez avec vos agents via Channels"
description: Associez WhatsApp, choisissez un CodingAgent et participez depuis Self-chat ou un groupe dédié au Workspace.
kind: guide
lastReviewedAt: 2026-10-29
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

### Consultez et choisissez le compte du CodingAgent

Dans le Workspace sélectionné, `/accounts` affiche l'utilisation, les renouvellements et la réserve de comptes
par provider. `/account` indique le compte et le mode du CodingAgent sélectionné ; `/status` inclut aussi ces
informations.

Pour fixer un compte existant ou revenir à la sélection automatique, utilisez le nom réel du compte :

```text
@Reviewer /account "Trabalho"
@Reviewer /account auto
/autorotate codex off
```

La dernière commande désactive **Auto Rotate** pour Codex dans ce Workspace ; elle ne déplace pas les agents en
cours d'exécution. Ce sont des contrôles structurés de Kavor, pas des demandes d'analyse à un modèle. Choisir un
autre compte respecte les mêmes validations et le même point sûr entre deux tours que sur le desktop ; une réponse
à la commande ne prouve pas que le changement est terminé.

Ajouter des comptes, se connecter, se déconnecter, supprimer et choisir la participation ou le compte par défaut
du Workspace restent des actions du panneau Accounts sur le desktop. Consultez
[CodingAgent Accounts](./coding-agent-accounts.md#commandes-dagent-kavor) pour la syntaxe complète, les exemples et
l'effet de chaque choix. Les règles déterminant qui peut envoyer des commandes via le Channel restent les mêmes.

## 3. Participez à distance

Envoyez une demande claire à l'agent sélectionné. Par exemple :

Dans la conversation WhatsApp liée, confirmez le Workspace et le CodingAgent avec `/context`. Adressez la demande à cet agent, avec la tâche et ses preuves accessibles.

```prompt
Vérifie les résultats des tests de la tâche en cours. Ne modifie pas le code. Indique ce qui a réussi, ce qui a
échoué et les preuves que tu as pu consulter.
```

**Résultat attendu:** La réponse distingue réussite, échec et éléments non vérifiés, en citant les preuves consultées. La demande n’autorise pas de modification du code.

Suivez la progression et la réponse dans la même conversation. Lorsqu'une décision est nécessaire, répondez à la
question correspondante avec les choix proposés ou le format demandé. Une confirmation d'envoi n'est pas une confirmation de fin.

Les brefs avis d'état gardent le contexte et le texte sur une même ligne, sans supprimer la mise en forme. Cette ligne
peut revenir naturellement à la ligne sur un écran étroit. Réponses complètes, questions et contenus longs conservent
leur propre disposition.

[Voir une demande à distance et la réponse complète du CodingAgent →](https://agentkavor.com/fr/videos/whatsapp-agent-interaction)

### Recevez des nouvelles sans lancer une autre demande WhatsApp

Vous pouvez demander au CodingAgent, y compris depuis sa session desktop, de publier le résultat dans une
conversation déjà configurée. Par exemple :

Sur le desktop, adressez-vous au CodingAgent chargé de la revue. Le groupe du Workspace doit être configuré et activé ; vérifiez que ses participants peuvent recevoir le résumé.

```prompt
Quand tu auras terminé cette revue, envoie le résumé au groupe WhatsApp de ce Workspace. Ne publie pas dans d'autres conversations.
```

**Résultat attendu:** L’agent publie uniquement vers la destination demandée ou explique pourquoi l’envoi a échoué. Terminer la revue et confirmer la publication sont deux résultats distincts.

L'agent découvre les conversations activées de son Workspace et choisit explicitement une destination. Un Channel
peut contenir plusieurs conversations : il ne s'agit ni d'un envoi à tous les groupes ni d'un miroir automatique du terminal.

Cet avis n'a pas besoin de répondre à un ancien message WhatsApp. En revanche, une réponse à une demande reçue revient
à la conversation d'origine, même si vous changez ensuite de Workspace ou d'agent par défaut. Citer une réponse connue
d'un CodingAgent adresse la nouvelle demande à son auteur sans changer l'agent par défaut de la conversation.

### Envoyez de l'audio en conservant l'original

Vous pouvez envoyer un enregistrement seul ou accompagné de texte. Avant de transmettre la demande à un CodingAgent
destinataire, Kavor prépare automatiquement une transcription et la désigne comme texte généré à partir de l'audio.
La légende, le fichier original et le choix des destinataires sont conservés ; la transcription peut contenir des
erreurs et ne remplace pas l'enregistrement.

Les agents recevant la même demande utilisent le même résultat. Renvoyer exactement cette demande ou récupérer son
contexte réutilise la référence de cet audio, au lieu de demander une transcription différente pour chaque agent.
La limite de transcription est de **25 Mo par audio (25 000 000 octets)**, distincte du stockage des originaux.

Prononcer une commande comme `/shutdown` n'active pas le contrôle de Kavor : la parole transcrite est du contenu de
demande, pas une entrée de l'interpréteur de commandes. Utilisez la commande écrite correspondante pour un contrôle.

Si la préparation échoue, vous recevez un avis dans la conversation d'origine et les agents en attente ne reçoivent
pas cette demande. Suivez cet avis ou envoyez la demande en texte. Un enregistrement illisible ou sans parole peut
nécessiter un autre audio ; un fichier trop volumineux, un enregistrement plus court. Un échec du service ou une limite
d'utilisation ne signifie pas que le CodingAgent a commencé à travailler. Sans résultat confirmé, ne supposez ni réussite
ni nouvelle tentative automatique.

La transcription utilise un service cloud authentifié et nécessite le réseau ; elle n'est pas entièrement hors ligne.
Votre ordinateur exécute toujours vos CodingAgents, et l'audio original conserve le même délai d'accès et d'expiration.

### Images, vidéos et autres fichiers

Vous pouvez aussi échanger images, vidéos et fichiers, avec ou sans texte. Les images nécessitent une entrée native
ou un outil de lecture compatible avec le harness et le modèle choisis. Les vidéos sont fournies sous leur forme
originale, au mieux des possibilités, sans garantir leur interprétation par chaque agent. Kavor ne convertit pas
automatiquement la vidéo et n'en extrait pas d'images.

Les pièces jointes gérées et leurs copies temporaires expirent **sept jours après un upload réussi**. Les lectures,
nouvelles tentatives et transcriptions ne prolongent pas ce délai. Renvoyez une pièce expirée ; l'expiration n'efface
ni vos fichiers originaux ni le texte des messages.

## 4. Séparez les projets en groupes de Workspace

Un groupe conserve une conversation liée à un projet sans changer de Workspace dans Self-chat.

1. Après l'association, sélectionnez les Workspaces souhaités dans **Workspace groups** et confirmez la création.
   Vous pouvez aussi gérer l'association dans l'onglet Channels du Workspace et sélectionner un groupe existant.
2. Vérifiez le résultat de chaque Workspace. Un nouveau groupe s'appelle `Kavor · Nom du Workspace`.
3. Ouvrez le groupe et choisissez un CodingAgent avec `/agents` et `/agent "Nom"`, ou mentionnez-le explicitement.

Le Workspace du groupe est fixe. Son agent par défaut peut changer dans ce projet ; `/workspace` ne change pas le
projet du groupe. Les nouveaux Workspaces ne reçoivent pas automatiquement de groupe.

Dans Channels du Workspace, **Check group** vérifie si le compte associé peut encore accéder au groupe. Un groupe
indisponible pour ce compte n'est pas forcément supprimé. Un échec temporaire de connexion ne retire pas automatiquement
son association non plus.

Pour changer l'association, utilisez **Remove group link** et confirmez. Seul ce Workspace est dissocié : le groupe
WhatsApp, l'association du téléphone, l'historique accepté et les autres Workspaces sont préservés. Choisissez ensuite
un autre groupe ou créez-en un. Si une création n'est pas confirmée, vérifiez son résultat avant de la répéter.

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
  WhatsApp et les pièces jointes un stockage temporaire géré par Kavor. L'audio reçu utilise aussi une transcription
  cloud. Ne partagez que du contenu autorisé.
- **Limites WhatsApp :** l'intégration utilise les appareils associés, pas la WhatsApp Business API hébergée par Meta.
  Règles, restrictions et suspensions de compte restent sous le contrôle de Meta.

## Continuer

- Comprenez [ce qu'un CodingAgent peut faire dans le graphe](./coding-agent.md).
- Organisez [les messages et la collaboration entre agents](./coding-agents-and-canvas.md).
- Consultez [les modes de livraison et Guardrails des Connections](./connections.md).
- [Suggérez un autre Channel avec un cas réel](https://github.com/digows/agentkavor-community/discussions/new?category=ideas).
