---
id: nodes
title: Les Nodes de Kavor
description: Découvrez ce que CodingAgent, Specification, Sticky Note, Terminal, File et Trigger font seuls, et ce qu'ils gagnent lorsqu'ils sont connectés.
kind: guide
lastReviewedAt: 2026-08-07
canonicalUrl: https://agentkavor.com/fr/docs/nodes
---

# Un Node est utile seul. Un graphe transforme le travail en système.

Kavor ne vous demande pas d'abandonner votre coding agent préféré, de masquer le terminal ni de transformer chaque
décision en une nouvelle conversation. Il réunit participants, outils et contexte sur un même Canvas afin que vous
puissiez voir qui travaille, avec quoi et dans quelles limites.

Chaque élément de premier plan sur ce Canvas est un **Node**. Un CodingAgent est un Node. Une Specification aussi.
Sticky Note, Terminal, File et Trigger occupent le même espace parce qu'ils peuvent tous prendre part au travail,
chacun avec une responsabilité différente.

Seul, un Node est déjà utile. Lorsque vous créez une **Connection**, cette utilité devient une capacité explicite.
Lorsque plusieurs Connections forment un graphe, le contexte, l'exécution, la mémoire et la collaboration ne sont
plus dispersés entre des fenêtres et des sessions isolées.

Voici le modèle :

**Node → Connection → graphe → décision humaine**

Cette séquence décrit la manière dont le travail acquiert une structure. Les Connections ne sont ni des flèches
persistées ni une automatisation qui exécute la case suivante. Ce sont des relations visibles entre des Nodes.

![CodingAgents, Specification, Sticky Note, Terminal, File et Trigger connectés sur le Canvas de Kavor](https://media.agentkavor.com/editorial/nodes-and-connections/graph.b499a1b842e8.jpg)

*Un Canvas peut associer intention durable, mémoire partagée, exécution, fichiers et cause planifiée sans masquer les
participants ni leurs Connections.*

## Ce qu'une Connection change réellement

Une Connection répond à une question pratique : **que peuvent faire ces deux Nodes ensemble ?**

Selon la combinaison, elle peut permettre à un CodingAgent de travailler avec une Specification, d'écrire dans une
Sticky Note, d'opérer un Terminal, de considérer un File comme une partie explicite du périmètre ou de dialoguer avec
un autre CodingAgent. Elle peut aussi fournir à un Terminal le chemin canonique d'un File, ou réveiller à une heure
définie un CodingAgent dont la session est active.

Dans le même temps, la Connection établit une limite :

- des Nodes proches sur le Canvas n'obtiennent aucun accès l'un à l'autre ;
- mentionner un Node dans un message n'accorde aucune capacité ;
- toutes les combinaisons de Nodes ne sont pas prises en charge ;
- un Guardrail peut restreindre une capacité accordée par la Connection ;
- le graphe rend le contexte accessible, mais n'approuve pas automatiquement les actions.

Le résultat est moins magique et plus utile : vous pouvez inspecter la structure avant, pendant et après le travail.

## Les six Nodes

### CodingAgent : votre harness préféré comme participant du graphe

Un CodingAgent est le provider natif que vous utilisez déjà, exécuté dans sa propre interface de terminal. Au lieu de
remplacer Claude Code, Codex ou Google Antigravity par une conversation générique, Kavor préserve l'expérience de
chaque harness et l'installe sur le Canvas.

Chaque CodingAgent peut avoir un rôle clair. Le harness conserve ses options natives de provider, de modèle et de
niveau d'effort lorsqu'il propose ces capacités. Vous pouvez garder un Spec Writer concentré sur les questions et
les décisions, un Builder dédié à l'implémentation et un Reviewer chargé de mettre le résultat à l'épreuve.

Lorsque des CodingAgents sont connectés, ils peuvent échanger des messages asynchrones. Vous continuez à voir ces
conversations dans le panneau Messages et pouvez intervenir si nécessaire. En les connectant à des Specifications,
Files, Sticky Notes et Terminals, le graphe indique clairement quelles ressources participent au travail.

C'est le même harness, avec désormais un contexte et des capacités visibles.

### Specification : une intention qui survit à la session

Une Specification consigne les décisions, le périmètre, les contraintes et les critères d'acceptation dans un
Markdown durable. Elle peut décrire les fondations d'une architecture, une intégration, la modélisation d'un domaine,
une fonctionnalité, un module ou une séquence délimitée de corrections.

Vous pouvez l'écrire manuellement ou la corédiger avec un CodingAgent. Pour les sujets difficiles, mieux vaut investir
le meilleur raisonnement disponible avant l'implémentation. Réfléchir en profondeur à ce stade coûte généralement
moins cher que de corriger les ambiguïtés ensuite.

Les Specifications ont un lifecycle. **Draft** sert à explorer et à décider. **Ready** indique que le contrat peut
être implémenté. **In progress**, **Blocked** et **Done** rendent l'état du travail visible. **Done** n'a de sens que
lorsque les critères d'acceptation sont réellement satisfaits.

Connectée à des agents aux rôles distincts, la même Specification peut guider celui qui écrit, celui qui implémente
et celui qui révise, sans dépendre de la mémoire d'une seule conversation.

### Sticky Note : une mémoire de travail partagée

Une Sticky Note est un post-it sur le Canvas. Vous pouvez y écrire des questions, des hypothèses, des décisions
temporaires, des constats et les prochaines étapes comme dans n'importe quelle note rapide.

Connectée à un CodingAgent, elle gagne une deuxième paire de mains. L'agent peut tenir la note avec vous : rassembler
les décisions ouvertes pendant l'élaboration d'une Specification, signaler un point qui mérite votre attention
pendant l'implémentation ou répondre à « qu'as-tu déjà fait, que fais-tu et que feras-tu ensuite ? » sans enfouir cet
état dans l'historique d'une conversation.

Les Sticky Notes sont adaptées à une mémoire informelle et visible. Lorsqu'une décision devient un contrat durable
pour l'implémentation et la maintenance future, elle doit être promue en Specification au lieu de rester cachée pour
toujours dans une note.

### Terminal : une exécution qui reste visible

Un Terminal maintient le shell dans le même Workspace visuel. Vous pouvez passer d'un terminal à l'autre, suivre un
log, exécuter des vérifications ou rester connecté à une machine distante sans perdre le Canvas qui l'entoure.

Lorsqu'un CodingAgent est connecté, vous pouvez travailler ensemble dans le même Terminal. L'agent peut inspecter
l'output, exécuter des commandes lorsque cela est permis, suivre une exécution corrélée et contribuer à un diagnostic.
La saisie humaine reste prioritaire, et un Guardrail peut rendre la Connection accessible en lecture seule.

Files et Specifications peuvent également fournir leurs chemins au Terminal par l'intermédiaire de variables
d'environnement. Un Trigger peut remettre une commande planifiée directement à une session active du shell.

Le Terminal ne masque pas l'exécution derrière une automatisation opaque. Le processus, la commande et le résultat
restent visibles.

### File : un fichier qui participe au Canvas

Un File est un fichier. L'intérêt consiste à rendre sa source canonique visible et explicite dans le graphe.

Connecté à un CodingAgent, il peut délimiter le fichier à lire, à réviser ou à modifier. Sur le Canvas, il peut aussi
garder un texte, une image ou un PDF sous vos yeux pendant que vous organisez le reste du travail.

Connecté à un Terminal, le chemin absolu du File peut être exposé par une variable d'environnement. Vous pouvez ainsi
utiliser visuellement un script, un fichier SQL, une configuration ou un autre support comme entrée d'une commande,
sans recopier de chemins entre les fenêtres.

Le File ne devient pas une pièce jointe jetable. Il reste la véritable source dans le filesystem.

### Trigger : une cause visible d'activité

Un Trigger planifie une action dans le temps. Il peut remettre une commande à un Terminal, comme le cron du système
d'exploitation, ou envoyer un prompt clair à un CodingAgent dont la session est active.

Sa valeur augmente lorsque la cible est déjà connectée à d'autres Nodes. Un Trigger peut réveiller un agent chargé
d'inspecter un File, d'exécuter des vérifications dans un Terminal, d'écrire un rapport dans une Sticky Note et de
demander une révision indépendante à un autre CodingAgent.

C'est ainsi qu'une heure dans le calendrier peut donner naissance à un petit système autonome ou semi-autonome. Le
Trigger lance l'activité ; le graphe apporte le contexte, les outils, la mémoire et la collaboration.

Le Trigger ne décide pas seul de ce qui mérite d'être fait, n'élargit pas les permissions, ne démarre pas une session
que vous avez laissée arrêtée et ne possède qu'une seule cible directe : un CodingAgent ou un Terminal.

## Lorsque les Nodes forment un graphe

La valeur du Canvas apparaît lorsque chaque Node possède une responsabilité et que les Connections expriment un
besoin réel. Trois graphes illustrent cette progression.

### De l'intention à la révision

**Specification → Builder → Reviewer → décision humaine**

La Specification conserve le contrat. Le Builder implémente. Le Reviewer compare le résultat aux critères
d'acceptation. Une Sticky Note préserve les constats et les décisions de travail ; un Terminal fournit des preuves
telles que les tests et les vérifications.

Les Connections n'exécutent pas automatiquement cette séquence. Elles rendent les participants et les capacités
nécessaires accessibles au sein d'un même graphe.

### Maintenance planifiée

**Trigger → Maintainer**

Le Maintainer est connecté à un File contenant les données d'entrée, à un Terminal pour exécuter les vérifications,
à une Sticky Note pour consigner le rapport et à un Reviewer pour obtenir une évaluation indépendante.

Le Trigger remet le prompt à l'heure configurée lorsque Kavor est en cours d'exécution et que la session de la cible
est active. Le CodingAgent travaille avec le contexte et les limites qu'il possédait déjà. À votre retour dans le
Workspace, vous pouvez consulter les résultats, les messages et les preuves.

### Commande opérationnelle supervisée

**Trigger → Terminal**

Un File contenant du SQL ou un script fournit son chemin au Terminal par une variable d'environnement. Le Trigger
remet la commande planifiée à la session active. Un CodingAgent connecté au Terminal peut aider à analyser le
résultat, tandis que vous gardez le processus sous les yeux.

Ce graphe automatise une cause et une exécution sans prétendre que le système connaît à lui seul le sens du succès.

## Commencez par le travail, pas par le nombre de Nodes

Un Canvas plus grand n'est pas automatiquement meilleur. Commencez par la plus petite structure qui rend le résultat
vérifiable :

1. définissez ce qui doit se produire ;
2. ajoutez une Specification lorsque des décisions, un périmètre ou des critères doivent survivre ;
3. choisissez un CodingAgent et attribuez-lui un rôle clair ;
4. connectez un File lorsque le périmètre concret doit être explicite ;
5. connectez un Terminal lorsque la tâche exige une exécution ou des preuves ;
6. utilisez une Sticky Note lorsque l'humain et l'agent doivent partager une mémoire de travail ;
7. ajoutez un autre CodingAgent lorsqu'une révision indépendante ou un travail parallèle améliore réellement le
   résultat ;
8. ajoutez un Trigger lorsque le temps constitue une cause légitime de l'activité.

L'objectif n'est pas de remplir le Canvas. Il s'agit de construire un système assez petit pour être compris et assez
complet pour préserver l'intention, l'exécution, les preuves et la décision.

## Pour aller plus loin

- Consultez la [matrice des Connections prises en charge](./connections.md) pour savoir exactement ce que permet
  chaque combinaison.
- [Bouclez votre premier cycle](./first-loop.md) avec une Specification, deux CodingAgents et une Sticky Note.
- Découvrez [comment choisir les CodingAgents et leurs rôles](./agents-and-roles.md) afin de séparer formulation,
  implémentation, révision et livraison.
- Revenez à [Qu'est-ce que Kavor ?](./what-is-kavor.md) pour revoir le modèle complet du produit.
