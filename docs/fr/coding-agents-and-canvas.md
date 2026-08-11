---
id: coding-agents-and-canvas
title: Comment les CodingAgents voient et construisent le Canvas
description: Comprenez le contexte accessible, les messages entre agents et l’édition atomique du Canvas dans les limites que vous contrôlez.
kind: guide
lastReviewedAt: 2026-08-11
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

À chaque interaction, Kavor transmet au CodingAgent l’état de son composant accessible : Nodes, Connections,
Guardrails et faits nécessaires pour comprendre le travail.

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
- les CodingAgents exposent état et faits de travail ; les anciens messages sont consultés si nécessaire.

Le contenu volumineux ou vivant n’est pas continuellement copié dans la fenêtre de contexte. Une référence claire
préserve l’espace de raisonnement et les sources réelles.

## Les messages suivent aussi le graphe

Tout CodingAgent accessible peut envoyer un message à un autre CodingAgent du composant ; aucune Connection directe
n’est requise. Les messages sont durables et inspectables dans `Messages`. Utilisez-les pour transmettre une
implémentation au Reviewer, demander une clarification, répartir des enquêtes ou renvoyer des findings.

Une décision durable ne doit pas vivre uniquement dans un message. Conservez les contrats dans la Specification, la
mémoire de travail dans une Sticky Note et les résultats dans les outputs appropriés.

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

- créer des Nodes actifs : CodingAgent, Specification, Sticky Note, Terminal, File et Schedule ;
- créer une Specification canonique et la matérialiser dans le Canvas ;
- ajouter des Connections prises en charge et modifier les paramètres Terminal ;
- retirer des Connections ;
- renommer des Nodes accessibles et des Specifications ;
- configurer un Schedule accessible ;
- déplacer, redimensionner et révéler des Nodes.

Lorsqu’elle est désactivée, les changements structurels sont refusés et l’agent doit le signaler sans insister. Le
layout reste disponible, car déplacer un Node n’étend pas l’autorité et ne modifie pas le contenu.

## La structure suit le graphe, pas tout le Workspace

Un CodingAgent peut modifier les Nodes et Connections de son composant accessible, ainsi que les Nodes créés plus tôt
dans le même changement atomique. Il peut ainsi créer puis connecter un Node sans laisser de débris, ou créer une
ressource et s’y connecter dans le même lot.

Le premier lien vers un Node préexistant hors du graphe reste votre décision. La vue du layout n’autorise pas l’agent
à s’attacher à une ressource que vous n’avez jamais rendue accessible.

## Les changements sont atomiques

Kavor valide l’ensemble complet et applique les changements dans l’ordre comme une unité. Si une étape échoue, aucun
changement structurel antérieur du lot ne subsiste.

Créer un Terminal et le connecter produit les deux ou aucun ; aucun Node orphelin ne reste. Le résultat contient la
forme réellement persistée et doit être lu plutôt que de supposer les defaults, la géométrie ou les chemins.

## Ce qui reste humain

`Allow workspace editing` ne donne pas un contrôle illimité. Un CodingAgent ne peut pas :

- supprimer des Nodes ;
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

> Consulte la documentation officielle de Kavor et le graphe actuel. Explique la plus petite structure qui résout
> cette tâche, les Nodes accessibles et les limites restantes. Ne modifie pas encore le Canvas.

### Construire une boucle révisable

> Construis une petite boucle avec une Specification, un Builder, un Reviewer et une Sticky Note. Utilise le minimum
> de Connections, crée et connecte les Nodes en un changement atomique, puis arrête-toi avant l’implémentation.

### Organiser sans étendre l’accès

> Organise visuellement le Canvas pour rendre intention, implémentation, revue et preuves lisibles. Ne crée ni ne
> retire de Connections, ne modifie pas les Guardrails et ne suppose aucun accès hors de ton graphe.

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
