---
id: coding-agent
title: "CodingAgent dans Kavor : votre harness préféré au sein d'un graphe"
description: Choisissez un provider, conservez son expérience native et reliez le CodingAgent au contexte, aux outils et aux participants appropriés.
kind: guide
lastReviewedAt: 2026-10-28
canonicalUrl: https://agentkavor.com/fr/docs/coding-agent
---

# CodingAgent dans Kavor : votre harness préféré au sein d'un graphe

Un CodingAgent est votre agent de programmation exécuté dans l'interface native de son provider, désormais visible
comme participant du Canvas.

Kavor ne remplace pas chaque harness par un chat générique. Il conserve l'expérience du provider et ajoute une
structure autour d'elle : responsabilité explicite, contexte accessible, outils, autres CodingAgents et limites que
vous pouvez inspecter.

![Sélecteur de provider dans la toolbar Kavor avant l'ajout d'un CodingAgent au Canvas.](https://media.agentkavor.com/demos/coding-agent-provider-selector/poster.22c2dccb70c5.jpg)

[Voyez le choix du provider en vidéo →](https://agentkavor.com/fr/videos/coding-agent-provider-selector)

## Ce que possède un CodingAgent

Chaque CodingAgent représente une session distincte. Le Node conserve la configuration et l'état nécessaires à ce
rôle, notamment le provider choisi et, lorsque celui-ci les propose, le modèle, le niveau d'effort, les permissions
et la session native.

Le provider est un réglage du CodingAgent, pas un autre type de Node. Le sélecteur comprend :

- Anthropic Claude Code ;
- OpenAI Codex ;
- Google Antigravity ;
- xAI Grok ;
- SST OpenCode.

Quand vous ajoutez un CodingAgent depuis la toolbar, vous choisissez d'abord le provider. Vous configurez ensuite la
session pour le travail. Les options peuvent différer, car Kavor préserve les capacités réelles de chaque harness au
lieu de prétendre qu'ils partagent tous le même contrat.

## Comptes, utilisation et rotation

Vous pouvez suivre l'utilisation des providers dans l'en-tête et ouvrir le panneau **Accounts** pour ajouter des
comptes, choisir ceux qui participent à chaque Workspace et utiliser la sélection **Automatic** ou un compte fixe.
La connexion native reste disponible ; configurer d'autres comptes est facultatif et ne remplace pas la connexion
des applications du provider.

Le [guide CodingAgent Accounts](./coding-agent-accounts.md) explique les fenêtres d'utilisation, la répartition
entre Workspaces, la copie initiale des préférences, le changement avec continuité de session et les limites de
chaque provider.

## Ce qu'il peut faire seul

Sans Connection, un CodingAgent reste une session provider-native dans le Workspace. Vous pouvez dialoguer, utiliser
les outils du harness et choisir son répertoire de travail. Ce répertoire peut se trouver hors de la racine du
Workspace lorsque le rôle exige un autre dépôt ou worktree ; l'association reste explicite dans la session.

Le Node aide déjà à séparer les contextes : une session peut enquêter pendant qu'une autre implémente. Sans graphe,
le contexte partagé dépend toutefois encore de ce que vous fournissez dans chaque conversation.

La Connection transforme la session isolée en participant d'un système de travail.

### Fournir un fichier ou une capture dans la saisie

Dans une session ouverte, vous pouvez coller des fichiers du presse-papiers système ou des images PNG/JPEG. Kavor
insère une référence sans créer de File ni de Connection sur le Canvas. Vérifiez le chemin et rédigez la demande
avant de l'envoyer ; interpréter l'image dépend toujours du harness.

Le [guide Terminal](./terminal.md#coller-des-fichiers-et-images-dans-la-saisie-dune-session) explique la procédure,
les limites et la différence entre une référence collée et une ressource conservée dans le graphe.

## Démarrer, redémarrer ou arrêter l’exécution

Le Node et le processus du provider sont deux choses différentes. Un CodingAgent peut rester sur le Canvas lorsque son exécution est arrêtée.

- **Start** démarre une session arrêtée dans le répertoire sélectionné. Répéter Start sur une session en cours ne crée pas un autre processus.
- **Restart** ferme le processus actuel et démarre son remplaçant, en conservant le compte, la racine de travail et l’intention de reprendre la session native. Cela n’efface pas l’historique et n’annule pas les changements du projet.
- **Shutdown** arrête l’exécution sans supprimer le Node ni l’historique natif. Utilisez Start pour le relancer.

Kavor affiche les étapes de préparation et indique si le provider est prêt ou si le démarrage a échoué. Une approbation en attente reste votre décision : démarrer ou redémarrer n’autorise pas l’agent à répondre à votre place.

En cas d’échec, lisez l’erreur avant de réessayer. Corrigez le répertoire manquant, l’installation, l’authentification ou l’autre prérequis indiqué, puis utilisez **Retry**. Une nouvelle tentative n’est ni la session précédente ni la preuve que la tâche a été exécutée.

## Séparer le travail avec des Git worktrees

Une nouvelle conversation sépare le contexte. Un Git worktree sépare aussi le checkout, avec son propre répertoire, ses fichiers et son index. Deux CodingAgents peuvent travailler sur des branches distinctes sans changer celle du checkout partagé.

Dans le contrôle **Git** du CodingAgent :

1. Choisissez la référence de départ et un nom de worktree.
2. Utilisez **Create** pour créer un worktree géré sous `.worktrees/` et l’associer à ce CodingAgent.
3. Ou choisissez **Use** sur un worktree existant pour sélectionner son répertoire.
4. Vérifiez la racine et la branche affichées avant de demander des modifications ou des commits.

**Workspace root → Use** ramène le CodingAgent à la racine du Workspace sans supprimer l’ancien worktree. Créer ou sélectionner un worktree pour l’agent ne change pas la branche, l’index ou les fichiers du checkout partagé. Le merge et le nettoyage ultérieurs sont des décisions séparées.

Lorsque l’association Git d’un CodingAgent en cours change, Kavor le relance dans la racine choisie en conservant l’identité native pour la reprise lorsque le provider le permet. Une session volontairement arrêtée reste arrêtée. Si la reprise échoue, l’erreur reste visible pour correction et Retry ; le changement de racine ne prouve pas que la session est prête.

Un worktree n’est pas une copie complète de l’environnement local. Les dépendances installées et les fichiers non suivis, comme la configuration locale, peuvent être absents. Préparez les prérequis du projet sans copier automatiquement les identifiants. Un chemin absent ou un worktree invalide doit être corrigé avant le démarrage, pas remplacé silencieusement par un autre répertoire.

Supprimer un worktree n’est pas supprimer son Node. Kavor refuse de supprimer ou de finaliser un worktree encore référencé par un autre CodingAgent. Si le dossier a été supprimé hors de Kavor, vérifiez l’état Git et réparez l’association avant de continuer.

## Explorer une autre voie avec Fork

**Fork** crée un autre CodingAgent à partir de l’historique natif d’une session existante. La source reste indépendante ; le nouveau Node reçoit une autre identité de session et une Connection avec le demandeur du Fork.

Utilisez-le pour explorer une alternative sans recommencer la conversation, ou pour séparer une investigation à partir d’un contexte établi. Définissez ensuite l’objectif et la condition d’arrêt du nouveau CodingAgent.

Le support dépend du provider et de la version installée. Claude Code, Codex, Grok et OpenCode disposent d’une intégration Fork ; Antigravity ne propose pas cette capacité dans Kavor. Une session native pouvant être bifurquée doit exister. Si l’historique est indisponible ou si le provider refuse l’opération, Kavor signale l’échec au lieu de présenter une conversation vide comme un Fork.

Fork ne crée pas de branche Git, ne prépare pas les dépendances et n’isole pas les fichiers à lui seul. Par défaut, la nouvelle session utilise la racine de la source ; choisissez un worktree distinct et préparé si l’alternative nécessite aussi une isolation du code. Copier-coller un Node du Canvas ne remplace pas Fork : la copie ne transporte pas l’historique natif de la session.

## Échangez via Channels

Vous pouvez aussi parler à ce même CodingAgent via un Channel, à commencer par WhatsApp. L'agent reste sur le desktop avec le contexte et les limites de son Workspace ; la conversation distante ne remplace pas le harness et ne crée pas un autre agent cloud. Consultez [Agent Kavor et Channels](./agent-kavor.md) pour configurer la conversation et son destinataire.

Vous pouvez demander au CodingAgent de publier un résultat dans une conversation activée de ce Workspace, même si
le travail a commencé sur le desktop. Cet envoi choisit une destination explicite : ce n'est ni un message à un autre
CodingAgent ni une diffusion à tous les Channels. Une réponse à une demande humaine conserve la conversation d'origine.
Voyez [comment recevoir des nouvelles sans lancer une autre demande WhatsApp](./agent-kavor.md#recevez-des-nouvelles-sans-lancer-une-autre-demande-whatsapp).

Le même guide explique la préparation automatique de l'audio reçu, la conservation de l'original et les limites réelles
des images et vidéos. Ces fonctions ne font pas de tous les providers des lecteurs universels et ne contournent pas
les approbations du desktop.

## Ce qu'il gagne dans le graphe

Un CodingAgent peut travailler avec tout Node accessible par un chemin de Connections valides dans son composant.
Chaque ressource n'a pas besoin de lui être directement reliée.

Les Connections directes impliquant un CodingAgent ont des rôles précis :

| Connection | Ce qu'elle ajoute |
| --- | --- |
| **CodingAgent + Specification** | Place intention, périmètre et critères durables dans le graphe. Elle peut porter `specification_read_only`. |
| **CodingAgent + Sticky Note** | Ajoute une mémoire informelle partagée pour décisions ouvertes, progression et findings. Elle peut porter `sticky_note_read_only`. |
| **CodingAgent + File** | Rend explicite une source canonique du filesystem. Elle peut porter `file_read_only`. |
| **CodingAgent + Terminal** | Permet d'exécuter des commandes, suivre des processus et consulter les preuves du shell. Elle peut porter `terminal_read_only`. |
| **CodingAgent + WebBrowser** | Permet d'observer et d'utiliser les pages réelles de ce WebBrowser dans le même état visible par l'humain. |
| **CodingAgent + CodingAgent** | Réunit les participants dans un même composant. Les CodingAgents accessibles peuvent échanger des messages asynchrones et consulter le contexte nécessaire à leur coordination. |
| **Trigger + CodingAgent** | Sélectionne cette session active comme cible directe d'un prompt planifié. Un Trigger ne démarre pas une session que vous avez fermée. |

L'accessibilité n'efface pas les contrats directs. Si la Connection exacte entre un CodingAgent et une ressource
possède un Guardrail, cette restriction continue de régir la paire même si un autre chemin existe dans le graphe.

## Schémas utiles

### Implémenter à partir d'un contrat

Reliez une Specification, un CodingAgent au rôle d'Implementer et un Terminal. L'agent lit le contrat à sa source,
ne modifie que le périmètre nécessaire, exécute les vérifications et enregistre les outputs dans la Specification.

L'intention reste ainsi hors de l'historique de conversation et les preuves demeurent dans le Workspace.

### Séparer implémentation et revue

Utilisez des sessions distinctes pour l'Implementer et le Reviewer. Tous deux accèdent à la même Specification et
aux mêmes preuves, mais reçoivent une question différente.

L'Implementer demande « comment respecter le contrat ? ». Le Reviewer demande « le résultat respecte-t-il vraiment
le contrat et quels risques subsistent ? ». Cette séparation réduit le risque que la revue hérite automatiquement
des hypothèses de l'auteur.

### Combiner des providers sans créer un concours

Des providers différents peuvent participer au même graphe. Combinez-les lorsqu'une autre interface, un autre modèle
ou une autre approche de raisonnement améliore une responsabilité concrète.

N'ajoutez pas un provider uniquement pour augmenter le nombre d'agents. Définissez d'abord le rôle, le résultat
attendu et la condition d'arrêt, puis choisissez le harness qui sert le mieux le travail.

### Travailler avec une page active

Connectez un WebBrowser lorsque la tâche dépend d'une véritable interface web. Vous continuez à voir et utiliser les
mêmes onglets ; le CodingAgent peut naviguer, interagir, attendre des changements et capturer des preuves sans
reconstruire la page à partir de texte copié dans le chat.

Le WebBrowser peut rester actif lorsque vous changez de Workspace et revenir dans le même état. L'agent poursuit
ainsi un travail déjà autorisé sans recharger la page à chaque changement de contexte visuel.

![CodingAgent et WebBrowser connectés sur le Canvas](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)

[Voyez le CodingAgent et le WebBrowser travailler ensemble →](https://agentkavor.com/fr/videos/web-browser-node)

### Consulter la session actuelle d'un autre CodingAgent

Un CodingAgent accessible peut parcourir passivement, page par page, les tours terminés de la session provider-native
actuelle d'un autre CodingAgent. Cette lecture récupère le raisonnement, les preuves et le contexte qui ne sont pas
encore devenus un message ou un output durable.

Elle n'envoie aucune entrée au provider, n'active pas la session consultée et ne remplace pas un message lorsque
l'autre agent doit agir, décider ou répondre. Si la session change pendant la pagination, l'ancienne continuation
est refusée ; le lecteur doit recommencer pour ne pas mélanger des historiques différents.

## Un graphe pratique

```text
Specification — Implementer — Reviewer
                    │            │
                  Terminal    Sticky Note
                    │
                   File
```

Les lignes représentent des Connections sans direction persistée. Tous les Nodes appartiennent au même composant
accessible. L'Implementer exécute le contrat, le Reviewer produit une évaluation indépendante et la Sticky Note garde
les questions ou findings visibles pour la décision humaine.

Ce schéma n'est pas une séquence automatique. Les messages coordonnent les handoffs ; les Specifications et autres
ressources préservent ce qui doit survivre aux sessions ; vous décidez quand le travail est accepté.

## Un meilleur prompt initial

Pour un Implementer :

> Implémente uniquement le périmètre défini dans la Specification accessible. Avant de modifier le code, identifie
> les Files et vérifications pertinents. Utilise le Terminal pour produire des preuves, enregistre le résultat comme
> output de la Specification et demande au Reviewer une évaluation indépendante. Arrête-toi si une décision
> nécessaire sort du contrat.

Pour un Reviewer :

> Compare l'implémentation et les preuves aux critères de la Specification. Recherche les comportements incorrects,
> scénarios manquants, régressions et risques opérationnels. Enregistre des findings concrets avant de proposer des
> changements et n'approuve pas seulement parce que les tests existants ont réussi.

## Exemple : un handoff que le Reviewer peut vérifier

Imaginez une correction du formulaire d'inscription. La Specification exige qu'un e-mail invalide affiche un
message, que l'envoi soit bloqué et qu'un e-mail valide continue de fonctionner. Utilisez le graphe ci-dessus et
gardez Builder et Reviewer dans des sessions distinctes.

Demande au Builder :

> Implémente la validation définie dans la Specification. Préserve le comportement du parcours valide. Exécute les
> tests pertinents dans le Terminal et consigne les fichiers modifiés, commandes et résultats. Envoie ensuite au
> Reviewer le handle de la Specification et le commit ou diff exact à revoir. Signale les points en suspens et
> arrête-toi avant de publier.

Un handoff utile identifie la livraison plutôt que de copier toute la conversation :

> L'implémentation se trouve dans le commit indiqué dans les outputs de la Specification. Les tests d'e-mail invalide,
> vide et valide ont réussi dans le Terminal Checks. Examine les critères et les parcours d'échec dans ce commit.
> Consigne les findings avec fichier, scénario et preuve ; réponds lorsque tu as terminé. Ne modifie pas le code
> pendant cette revue.

Demande au Reviewer :

> Lis le contrat et examine la livraison référencée. Vérifie chaque critère, reproduis les scénarios pertinents et
> ajoute tes conclusions à la Sticky Note. Distingue un défaut démontré d'une hypothèse. Si tu trouves un blocage,
> explique quel comportement échoue et renvoie le travail au Builder pour correction.

Le résultat attendu est un changement identifiable, une revue indépendante et votre décision fondée sur des preuves.
Si le Builder modifie encore la livraison, attendez qu'il stabilise le résultat ou délimitez explicitement ce qui est
prêt à être revu. Deux agents examinant des révisions différentes du code n'évaluent pas la même livraison.

## Limites importantes

- Un CodingAgent n'obtient pas d'accès par proximité visuelle ; un chemin de Connections doit exister.
- Référencer un Node dans un message ne lui accorde pas l'accès.
- La lecture passive de la session d'un autre CodingAgent ne l'active pas et ne transfère pas une décision durable
  dans la Specification.
- Un Guardrail limite la paire directe à laquelle il appartient ; ce n'est pas une politique globale du Workspace.
- Les messages coordonnent le travail, mais ne doivent pas être le seul lieu d'une décision durable.
- Les providers ne proposent pas nécessairement les mêmes modèles, permissions, événements ou opérations de session.
- Un Trigger remet un prompt à une session active ; il n'étend pas les permissions et ne garantit pas qu'un effet
  externe se produise exactement une fois.
- Avec `Allow workspace editing`, un CodingAgent peut contrôler les sessions et supprimer des Nodes accessibles dans le cadre de la demande autorisée. Cela ne permet ni de modifier les Guardrails ni de contourner les approbations humaines. Consultez les [limites d’édition du Canvas](./coding-agents-and-canvas.md#allow-workspace-editing).
  restent humaines.

## Avant de démarrer la session

Vérifiez :

- la responsabilité de ce CodingAgent ;
- le résultat observable qu'il doit produire ;
- les Nodes qui doivent être accessibles ;
- les Guardrails nécessaires sur les Connections directes ;
- si provider, modèle et effort correspondent au risque de la tâche ;
- où préserver décisions, progression et preuves ;
- avec qui il doit communiquer et quand il doit s'arrêter.

Un CodingAgent ne devient pas puissant grâce à un prompt plus long. Il devient plus utile quand responsabilité,
contexte, outils, collaboration et limites forment un ensemble cohérent.

Poursuivez avec [Comment choisir les CodingAgents et définir les rôles](./agents-and-roles.md), découvrez
[comment les CodingAgents voient et construisent le Canvas](./coding-agents-and-canvas.md) ou consultez la
[matrice des Connections prises en charge](./connections.md).
