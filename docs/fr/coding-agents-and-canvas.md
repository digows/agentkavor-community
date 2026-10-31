---
id: coding-agents-and-canvas
title: Comment les CodingAgents voient et construisent le Canvas
description: Comprenez le contexte accessible, les messages entre agents et l’édition atomique du Canvas dans les limites que vous contrôlez.
kind: guide
lastReviewedAt: 2026-10-29
canonicalUrl: https://agentkavor.com/fr/docs/coding-agents-and-canvas
---

# Comment les CodingAgents voient et construisent le Canvas

Le Canvas n’est pas seulement une image pour vous. Pour un CodingAgent, c’est un contexte vivant, une carte de
capacités et, lorsque vous l’autorisez, une surface que l’agent peut organiser.

Il s’agit de deux capacités distinctes :

1. **comprendre le graphe accessible** pour travailler avec les Nodes, ressources et autres CodingAgents ;
2. **modifier la structure du Canvas** par des changements immédiats et atomiques.

Voir la position d’un Node ne signifie pas lire son contenu ; travailler avec une ressource ne signifie pas pouvoir
supprimer n’importe quel élément du Workspace.

## Le graphe est le contexte partagé

À chaque interaction, Kavor transmet au CodingAgent un contexte compact pour la demande actuelle : identité, état
nécessaire du composant accessible, Guardrails actifs et références pour consulter le reste à la demande. Si la
structure change pendant le travail, Kavor signale qu'elle doit être relue.

L’agent peut utiliser tout Node relié par un chemin de Connections valides, quelle que soit la distance :

```text
Specification — Builder — Reviewer — Sticky Note
```

Builder atteint la Sticky Note via Reviewer ; Reviewer atteint la Specification via Builder. Les deux CodingAgents
peuvent échanger des messages sans que chaque ressource soit directement reliée à chacun.

Le Canvas reste ainsi lisible. La topologie demeure explicite : retirer une Connection peut diviser le composant et
modifier ce qui sera accessible à l’interaction suivante.

## Ce qui arrive directement et ce qui reste à la demande

Kavor privilégie un contexte utile, pas une copie permanente du Workspace.

- les petites informations textuelles peuvent accompagner l’état du graphe ;
- les Specifications exposent lifecycle, chemin et outputs récents, tandis que le Markdown canonique reste dans le Workspace ;
- les Terminals exposent l’état et la commande foreground ; l’output est lu au besoin ;
- les Files exposent leur source canonique ; le contenu reste dans le filesystem ;
- les CodingAgents exposent état et faits de travail ; les messages et tours terminés des sessions provider-native
  sont consultés si nécessaire.

Le contenu volumineux ou vivant n’est pas continuellement copié dans la fenêtre de contexte. Une référence claire
préserve l’espace de raisonnement et les sources réelles.

La lecture de la session d'un autre CodingAgent est passive et paginée. Elle n'envoie aucune entrée au provider et ne
réveille pas le peer. Lorsque l'autre agent doit recevoir le contexte, agir ou répondre, utilisez un message.

## Les messages suivent aussi le graphe

Tout CodingAgent accessible peut envoyer un message à un autre CodingAgent du composant ; aucune Connection directe
n’est requise. Les messages sont durables et inspectables dans `Messages`. Utilisez-les pour transmettre une
implémentation au Reviewer, demander une clarification, répartir des enquêtes ou renvoyer des findings.

Une décision durable ne doit pas vivre uniquement dans un message. Conservez les contrats dans la Specification, la
mémoire de travail dans une Sticky Note et les résultats dans les outputs appropriés.

### Choisissez la livraison selon l'effet souhaité

- Pour une revue qui peut attendre, utilisez **After turn** : la demande attend que le destinataire soit disponible.
- Pour la coordination ordinaire, **Native input** laisse le provider décider comment intégrer l'entrée. Cela ne garantit pas l'absence d'interruption.
- Pour changer explicitement de direction, **Send now** peut interrompre si le provider et les Guardrails l'autorisent. Précisez l'instruction remplacée, ce qui doit s'arrêter et l'action suivante. Interrompre n'annule pas les effets produits.

Un message accepté ou en attente ne prouve pas sa lecture ni son exécution. Brouillons et approbations humains restent protégés ; ne contournez pas une livraison retenue par un autre chemin.

La Connection directe définit le mode par défaut et les restrictions. Consultez la [référence des Connections](./connections.md) ; un message ne se confond pas avec la lecture passive de l'historique.

## Les Guardrails restent attachés à la paire directe

Reachability définit l’accès ; Guardrail définit la restriction. Si la Connection directe CodingAgent + Specification
porte `specification_read_only`, elle continue de limiter cette paire même si une autre route existe. La restriction
d’un autre CodingAgent ne devient pas une politique globale de la ressource.

La proximité visuelle, les labels et les références dans les messages ne donnent aucun accès : un vrai chemin de
Connections est requis.

## L’agent voit aussi le layout, avec moins d’autorité

Un CodingAgent peut consulter labels, types et géométrie de tous les Nodes pour organiser le Workspace. Cette vue
n’inclut ni configuration, ni contenu, ni Connections hors de son propre graphe.

Il peut donc aligner ou déplacer un Node externe sans accéder à son contenu. Le layout est Workspace-wide ; le
contexte et les modifications structurelles ne le sont pas.

## Allow workspace editing

Chaque CodingAgent dispose de `Allow workspace editing` dans les paramètres avancés. L’option contrôle les
modifications structurelles initiées par l’agent et s’applique immédiatement.

Lorsqu’elle est active, l’agent peut, dans sa portée :

- créer des Nodes actifs : CodingAgent, Specification, Sticky Note, Terminal, File, WebBrowser et Schedule ;
- supprimer des Nodes accessibles, en arrêtant leur exécution si nécessaire ;
- créer une Specification canonique et la matérialiser dans le Canvas ;
- ajouter des Connections prises en charge et modifier les paramètres Terminal ;
- retirer des Connections ;
- renommer des Nodes accessibles et des Specifications ;
- configurer un Schedule accessible ;
- déplacer, redimensionner et révéler des Nodes.

Lorsqu’elle est désactivée, les changements structurels sont refusés et l’agent doit le signaler sans insister. Le
layout reste disponible, car déplacer un Node n’étend pas l’autorité et ne modifie pas le contenu.

Cette option est également requise lorsqu’un CodingAgent démarre, redémarre, arrête ou fait un Fork d’un autre CodingAgent accessible. Ces actions suivent la demande autorisée ; elles n’approuvent pas les messages retenus et ne répondent pas aux dialogues humains.

Supprimer un Node retire sa présence et ses Connections du Canvas ; cela n’efface pas le File ou la Specification canonique et ne supprime pas un Git worktree. Si l’arrêt nécessaire échoue, Kavor signale un échec récupérable au lieu d’annoncer une suppression terminée normalement.

## Déléguer à une session réellement prête

Créer un CodingAgent, rendre son répertoire disponible et livrer un message sont des étapes distinctes. Un Node créé ou un message en file d’attente ne prouve ni le démarrage du provider ni l’exécution de la tâche.

Pour déléguer du travail dans un worktree :

1. Préparez le worktree avec Git et vérifiez les prérequis du projet.
2. Créez le CodingAgent associé à cette racine et connectez-le au contexte nécessaire.
3. Vérifiez le démarrage et la disponibilité avant d’annoncer un handoff terminé.
4. Envoyez une tâche avec un résultat attendu et une condition d’arrêt.
5. Inspectez la livraison et la réponse dans **Messages**.

En cas d’échec, l’agent coordinateur doit consulter l’état du destinataire et signaler l’étape et l’erreur disponibles. Corrigez la cause avant Start ou Retry. Ne créez pas un autre Node pour masquer une tentative échouée et ne renvoyez pas une tâche uniquement parce que la réponse n’est pas encore arrivée.

Start et Restart attendent que l’interface native soit prête. Cela ne signifie ni approbation d’une action, ni réussite de la tâche, ni autorisation de publier. Fork nécessite un historique et un support réels du provider. Consultez les [contrôles de session, worktrees et Fork](./coding-agent.md).

## La structure suit le graphe, pas tout le Workspace

Un CodingAgent peut modifier les Nodes et Connections de son composant accessible, ainsi que les Nodes créés plus tôt
dans le même changement atomique. Il peut ainsi créer puis connecter un Node sans laisser de débris, ou créer une
ressource et s’y connecter dans le même lot.

Le premier lien vers un Node préexistant hors du graphe reste votre décision. La vue du layout n’autorise pas l’agent
à s’attacher à une ressource que vous n’avez jamais rendue accessible.

Une Connection directe CodingAgent + WebBrowser donne un accès médiatisé aux pages actives de ce navigateur. La page
peut rester active pendant un changement de Workspace et revenir dans le même état ; l'accessibilité du graphe,
l'authentification et les limites humaines restent applicables.

## Les changements sont atomiques

Kavor valide l’ensemble complet et applique les changements dans l’ordre comme une unité. Si une étape échoue, aucun
changement structurel antérieur du lot ne subsiste.

Créer un Terminal et le connecter produit les deux ou aucun ; aucun Node orphelin ne reste. Le résultat contient la
forme réellement persistée et doit être lu plutôt que de supposer les defaults, la géométrie ou les chemins.

L’atomicité structurelle ne promet pas d’annuler des commandes externes ni de rouvrir des processus déjà arrêtés. Vérifiez les erreurs d’exécution et de récupération avant de continuer.

## Ce qui reste humain

`Allow workspace editing` ne donne pas un contrôle illimité. Un CodingAgent ne peut pas :

- créer, retirer ou assouplir des Guardrails ;
- reconfigurer arbitrairement les autres types de Node ;
- changer le contrôle humain qui retient des messages pour approbation ;
- utiliser une référence ou une position pour étendre son propre graphe.

Il peut retirer une Connection accessible : soyez explicite si cela peut supprimer du contexte ou interrompre un
autre CodingAgent. Kavor lui demande de toucher aux Connections des peers seulement si vous l’avez demandé ou si le
travail déjà délégué l’exige.

## Docs MCP aide l’agent à enseigner Kavor

Les CodingAgents peuvent consulter la documentation officielle par le Docs MCP local. Vous pouvez demander de l’aide
sans mémoriser les noms de Nodes, les combinaisons prises en charge ou les détails de Schedule.

La documentation guide, mais n’accorde aucune autorité. Docs MCP ne crée pas de Connections, ne désactive pas de
Guardrails et ne transforme pas une suggestion en modification du Canvas.

## Trois prompts pour collaborer

### Expliquer avant de toucher

Collez dans un CodingAgent du Workspace et décrivez la tâche à organiser. Cette première demande porte uniquement sur une explication.

```prompt
Consulte la documentation officielle de Kavor et le graphe actuel. Explique la plus petite structure qui résout
cette tâche, les Nodes accessibles et les limites restantes. Ne modifie pas encore le Canvas.
```

**Résultat attendu:** La proposition identifie ressources, Connections et limites sans modifier le Canvas. Voir le layout ne donne pas accès au contenu hors du graphe.

### Construire une boucle révisable

Décrivez d’abord une petite tâche. Activez `Allow workspace editing` pour autoriser la création de la structure ; cette option n’est pas nécessaire pour une simple explication.

```prompt
Construis une petite boucle avec une Specification, un Builder, un Reviewer et une Sticky Note. Utilise le minimum
de Connections, crée et connecte les Nodes en un changement atomique, puis arrête-toi avant l’implémentation.
```

**Résultat attendu:** Un loop connecté est prêt à être examiné, ou l’agent indique la restriction empêchant sa création. Cette demande ne doit pas lancer l’implémentation.

### Organiser sans étendre l’accès

Utilisez dans le CodingAgent du Workspace dont vous souhaitez organiser le Canvas. La demande autorise le placement visuel, pas la modification des accès.

```prompt
Organise visuellement le Canvas pour rendre intention, implémentation, revue et preuves lisibles. Ne crée ni ne
retire de Connections, ne modifie pas les Guardrails et ne suppose aucun accès hors de ton graphe.
```

**Résultat attendu:** Le layout devient plus lisible en préservant Connections, Guardrails et frontières du contenu accessible.

## Checklist avant d’autoriser une modification

- l’agent a-t-il expliqué le résultat structurel attendu ?
- chaque nouveau Node a-t-il une fonction concrète ?
- sera-t-il connecté dans le même lot ou réservé à la lecture humaine ?
- le changement reste-t-il dans le composant accessible ?
- retirer une Connection peut-il diviser le graphe ou interrompre un autre agent ?
- faut-il un Guardrail direct avant de fournir la ressource ?
- le point d’arrêt pour votre revue est-il clair ?

Utilisez le CodingAgent comme collaborateur du Canvas, pas comme propriétaire invisible. L’intérêt est d’inspecter la
structure reçue, la structure modifiée et les limites restées sous votre contrôle.

## Continuer

- [Fermez votre première boucle](./first-loop.md) avec une topologie minimale.
- Consultez la [matrice des Connections](./connections.md).
- Apprenez [comment choisir CodingAgents et rôles](./agents-and-roles.md).
- Configurez [Schedule](./schedule.md) sans étendre les permissions.
