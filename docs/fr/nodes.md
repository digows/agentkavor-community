---
id: nodes
title: Les Nodes de Kavor
description: Découvrez ce que CodingAgent, Specification, Sticky Note, Terminal, File, Diagram, WebBrowser et Trigger font seuls, et ce qu'ils gagnent lorsqu'ils sont connectés.
kind: guide
lastReviewedAt: 2026-10-30
canonicalUrl: https://agentkavor.com/fr/docs/nodes
---

# Un Node est utile seul. Un graphe transforme le travail en système.

Kavor ne vous demande pas d'abandonner votre coding agent préféré, de masquer le terminal ni de transformer chaque
décision en une nouvelle conversation. Il réunit participants, outils et contexte sur un même Canvas afin que vous
puissiez voir qui travaille, avec quoi et dans quelles limites.

Chaque élément de premier plan sur ce Canvas est un **Node**. Un CodingAgent est un Node. Une Specification aussi.
Sticky Notes, Terminals, Files, Diagrams, WebBrowsers et Triggers occupent le même espace parce qu'ils peuvent tous
prendre part au travail, chacun avec une responsabilité différente.

Seul, un Node est déjà utile. Lorsque vous créez une **Connection**, il rejoint un composant accessible. Dans ce
graphe, les CodingAgents peuvent travailler avec le contexte, l'exécution, la mémoire et les collaborateurs à toute
distance, sans dépendre d'une Connection directe vers chaque ressource.

Voici le modèle :

**Node → Connection → graphe → décision humaine**

Cette séquence décrit la manière dont le travail acquiert une structure. Les Connections ne sont ni des flèches
persistées ni une automatisation qui exécute la case suivante. Ce sont des relations visibles entre des Nodes.

![CodingAgents, Specification, Sticky Note, Terminal, File et Trigger connectés sur le Canvas de Kavor](https://media.agentkavor.com/editorial/nodes-and-connections/graph.b499a1b842e8.jpg)

*Un Canvas peut associer intention durable, mémoire partagée, exécution, fichiers et cause planifiée sans masquer les
participants ni leurs Connections.*

## Ce qu'une Connection change réellement

Une Connection répond d'abord à une question pratique : **à quel graphe ces Nodes participent-ils ?**

Tout CodingAgent peut travailler avec les Nodes accessibles par ce graphe et dialoguer avec les autres CodingAgents
du même composant. La Connection directe peut encore porter son propre contrat : sélectionner la cible d'un
Schedule, transmettre au Terminal le chemin canonique d'un File, Diagram ou Specification et porter un Guardrail
entre un CodingAgent et une ressource.

Dans le même temps, la Connection établit une limite :

- des Nodes proches sur le Canvas n'obtiennent aucun accès l'un à l'autre ;
- mentionner un Node dans un message n'accorde aucune capacité ;
- toutes les combinaisons de Nodes n'acceptent pas une Connection directe, mais des paires non prises en charge
  peuvent participer au même graphe par des chemins valides ;
- un Guardrail ne restreint que la paire directe qui le porte et reste applicable même si un autre chemin existe ;
- le graphe rend le contexte accessible, mais n'approuve pas automatiquement les actions.

Le résultat est moins magique et plus utile : vous pouvez inspecter la structure avant, pendant et après le travail.

## Copier un prompt pour comprendre votre graphe

Collez dans un CodingAgent du Workspace et décrivez la tâche. La demande porte sur lecture et conseils ; voir des Nodes hors du composant dans le layout ne les rend pas accessibles.

```prompt
Explique comment les Nodes de mon graphe accessible peuvent aider pour la tâche décrite.
Identifie où se trouvent l’intention, les sources, l’exécution et la mémoire de travail.
S’il manque quelque chose, propose la structure minimale nécessaire et explique l’utilité de chaque Node.
Ne crée ni ne supprime de Nodes ou Connections et ne lis aucun contenu hors de ton graphe.
```

**Résultat attendu :** Une carte courte du contexte disponible et une proposition si nécessaire. L’explication ne crée ni pipeline automatique ni nouveaux accès ; vous décidez de la suite.

## Types de Node

### CodingAgent : votre harness préféré comme participant du graphe

Un CodingAgent est le provider natif que vous utilisez déjà, exécuté dans sa propre interface de terminal. Au lieu de
remplacer Claude Code, Codex ou Google Antigravity par une conversation générique, Kavor préserve l'expérience de
chaque harness et l'installe sur le Canvas.

Chaque CodingAgent peut avoir un rôle clair. Le harness conserve ses options natives de provider, de modèle et de
niveau d'effort lorsqu'il propose ces capacités. Vous pouvez garder un Spec Writer concentré sur les questions et
les décisions, un Builder dédié à l'implémentation et un Reviewer chargé de mettre le résultat à l'épreuve.

Les CodingAgents d'un même composant accessible peuvent échanger des messages asynchrones, même sans Connection
directe entre eux. Vous continuez à voir ces conversations dans le panneau Messages et pouvez intervenir si
nécessaire. Les Specifications, Files, Sticky Notes et Terminals accessibles indiquent clairement quelles ressources
participent au travail.

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

Partager le contexte n'autorise pas un agent à réorganiser vos notes ou celles d'un autre participant. Précisez quelle
note il doit maintenir et ce qu'il doit préserver ; consultez le [guide Sticky Note](./sticky-note.md).

### Terminal : une exécution qui reste visible

Un Terminal maintient le shell dans le même Workspace visuel. Vous pouvez passer d'un terminal à l'autre, suivre un
log, exécuter des vérifications ou rester connecté à une machine distante sans perdre le Canvas qui l'entoure.

Lorsqu'un CodingAgent est connecté, vous pouvez travailler ensemble dans le même Terminal. L'agent peut inspecter
l'output, exécuter des commandes lorsque cela est permis, suivre une exécution corrélée et contribuer à un diagnostic.
La saisie humaine reste prioritaire, et un Guardrail peut rendre la Connection accessible en lecture seule.

Files, Diagrams et Specifications peuvent également fournir leurs chemins au Terminal par l'intermédiaire de variables
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

### Diagram : une source qui se lit aussi comme un dessin

Un Diagram représente un fichier de diagramme sur le Canvas. Un CodingAgent peut produire une proposition
d'architecture, de flux ou de modèle de données ; vous vérifiez le résultat, modifiez la source et gardez le dessin
près de la Specification qu'il aide à expliquer. Excalidraw propose aussi une édition visuelle ; draw.io sert
uniquement à la visualisation dans Kavor.

La source reste un vrai fichier. L'extension sélectionne le format, à l'exception du SVG : un SVG ordinaire s'ouvre
comme File et doit être ajouté explicitement comme Diagram. Une Connection avec un Terminal fournit le chemin de la
source ; avec un CodingAgent, un Guardrail direct peut la maintenir en lecture seule.

Consultez [Diagrams](./diagrams.md) pour choisir le format et copier des exemples de prompts. La page explique
l'édition, le résultat du rendu, les téléchargements et les limites hors ligne, sans confondre un ancien aperçu avec
une réussite du rendu de la nouvelle source.

### WebBrowser : le web ouvert à l'humain et à l'agent

Un WebBrowser place de véritables pages Chromium sur le Canvas. Vous pouvez naviguer, conserver des onglets et suivre
ce qui se passe sans quitter le Workspace.

Connecté à un CodingAgent, il devient plus qu'une référence visuelle. L'agent peut observer et utiliser les mêmes
pages actives que vous : naviguer, cliquer, remplir des champs, attendre un état et capturer des preuves. La
Connection rend le navigateur accessible ; elle ne contourne ni l'authentification, ni les permissions, ni les
décisions humaines.

Le profil du navigateur est dédié à Kavor et partagé par ses WebBrowsers. Cookies et sessions peuvent survivre à la
suppression d'un Node jusqu'à ce que vous effaciez les données dans Settings. Conçu pour le développement, ce profil
accepte les certificats autosignés, expirés et privés. Un réseau hostile peut donc lui présenter n'importe quel
certificat ; gardez cette exposition à l'esprit, surtout lorsque vous vous connectez à des services.

Lorsque vous changez de Workspace dans la même fenêtre, Kavor préserve la page active. À votre retour, le WebBrowser
réapparaît sans rechargement et un CodingAgent connecté peut continuer à utiliser cet état lorsque le Workspace est
hors écran. Fermer l'onglet, supprimer le Node ou terminer la session met fin à cette continuité.

[![WebBrowser connecté à un CodingAgent sur le Canvas Kavor](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)](https://agentkavor.com/fr/videos/web-browser-node)

[Voir l'humain et le CodingAgent travailler sur la même page →](https://agentkavor.com/fr/videos/web-browser-node)

### Schedule : une cause visible d'activité

Schedule est la source de Trigger disponible dans Kavor. Il planifie une action dans le temps : remettre une
commande à un Terminal, comme le cron du système d'exploitation, ou envoyer un prompt clair à un CodingAgent dont
la session est active.

Sa valeur augmente lorsque la cible est déjà connectée à d'autres Nodes. Un Trigger peut réveiller un agent chargé
d'inspecter un File, d'exécuter des vérifications dans un Terminal, d'écrire un rapport dans une Sticky Note et de
demander une révision indépendante à un autre CodingAgent.

C'est ainsi qu'une heure dans le calendrier peut donner naissance à un petit système autonome ou semi-autonome. Le
Trigger lance l'activité ; le graphe apporte le contexte, les outils, la mémoire et la collaboration.

Le Schedule ne décide pas seul de ce qui mérite d'être fait, n'élargit pas les permissions, ne démarre pas une session
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

## Réutiliser un graphe sans reconstruire chaque Node

Lorsqu'une boucle fonctionne bien, son groupe de Nodes peut être copié ou déplacé pour une autre tâche, y compris
entre Workspaces. Les fichiers du système, captures d'écran, liens et textes peuvent aussi entrer sur le Canvas par
glisser-déposer ou Paste. Ces gestes ne clonent pas les sessions et ne transforment pas les références aux fichiers
en copies de leurs octets.

Le guide [Ajouter du contenu au Canvas](./adding-content.md) réunit la procédure, la priorité du presse-papiers, ce
que conserve chaque type de Node et les effets d'Undo. Consultez-le avant de déplacer une boucle en cours d'exécution.

## Commencez par le travail, pas par le nombre de Nodes

Un Canvas plus grand n'est pas automatiquement meilleur. Commencez par la plus petite structure qui rend le résultat
vérifiable :

1. définissez ce qui doit se produire ;
2. ajoutez une Specification lorsque des décisions, un périmètre ou des critères doivent survivre ;
3. choisissez un CodingAgent et attribuez-lui un rôle clair ;
4. connectez un File lorsque le périmètre concret doit être explicite ;
5. connectez un Terminal lorsque la tâche exige une exécution ou des preuves ;
6. utilisez une Sticky Note lorsque l'humain et l'agent doivent partager une mémoire de travail ;
7. connectez un WebBrowser lorsque le travail doit observer ou utiliser une page active ;
8. ajoutez un autre CodingAgent lorsqu'une révision indépendante ou un travail parallèle améliore réellement le
   résultat ;
9. ajoutez un Diagram lorsqu'une décision, une structure ou un flux doit devenir visuellement explicite ;
10. ajoutez un Trigger lorsque le temps constitue une cause légitime de l'activité.

L'objectif n'est pas de remplir le Canvas. Il s'agit de construire un système assez petit pour être compris et assez
complet pour préserver l'intention, l'exécution, les preuves et la décision.

## Pour aller plus loin

- Consultez la [matrice des Connections prises en charge](./connections.md) pour savoir exactement ce que permet
  chaque combinaison.
- [Bouclez votre premier cycle](./first-loop.md) avec une Specification, deux CodingAgents et une Sticky Note.
- Découvrez [comment choisir les CodingAgents et leurs rôles](./agents-and-roles.md) afin de séparer formulation,
  implémentation, révision et livraison.
- Utilisez une [Sticky Note comme mémoire de travail partagée](./sticky-note.md).
- Découvrez comment un [File transforme une source canonique en contexte et portée](./file.md).
- Développez, déboguez et testez avec un agent dans [WebBrowser](./web-browser.md).
- Apprenez à utiliser [Schedule pour donner une horloge à votre graphe](./schedule.md).
- Découvrez [comment les CodingAgents voient et construisent le Canvas](./coding-agents-and-canvas.md).
- Revenez à [Qu'est-ce que Kavor ?](./what-is-kavor.md) pour revoir le modèle complet du produit.
