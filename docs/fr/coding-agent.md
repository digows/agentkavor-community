---
id: coding-agent
title: "CodingAgent dans Kavor : votre harness préféré au sein d'un graphe"
description: Choisissez un provider, conservez son expérience native et reliez le CodingAgent au contexte, aux outils et aux participants appropriés.
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/fr/docs/coding-agent
---

# CodingAgent dans Kavor : votre harness préféré au sein d'un graphe

Un CodingAgent est votre agent de programmation exécuté dans l'interface native de son provider, désormais visible
comme participant du Canvas.

Kavor ne remplace pas chaque harness par un chat générique. Il conserve l'expérience du provider et ajoute une
structure autour d'elle : responsabilité explicite, contexte accessible, outils, autres CodingAgents et limites que
vous pouvez inspecter.

[![Sélecteur de provider dans la toolbar Kavor avant l'ajout d'un CodingAgent au Canvas.](https://media.agentkavor.com/demos/coding-agent-provider-selector/poster.22c2dccb70c5.jpg)](https://agentkavor.com/fr/videos/coding-agent-provider-selector)

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

## Ce qu'il peut faire seul

Sans Connection, un CodingAgent reste une session provider-native dans le Workspace. Vous pouvez dialoguer, utiliser
les outils du harness et maintenir le travail dans les limites de la racine de ce Workspace.

Le Node aide déjà à séparer les contextes : une session peut enquêter pendant qu'une autre implémente. Sans graphe,
le contexte partagé dépend toutefois encore de ce que vous fournissez dans chaque conversation.

La Connection transforme la session isolée en participant d'un système de travail.

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
| **CodingAgent + CodingAgent** | Réunit les participants dans un même composant. Les CodingAgents accessibles peuvent échanger des messages asynchrones et consulter le contexte nécessaire à leur coordination. |
| **Trigger + CodingAgent** | Sélectionne cette session active comme cible directe d'un prompt planifié. Un Trigger ne démarre pas une session que vous avez fermée. |

L'accessibilité n'efface pas les contrats directs. Si la Connection exacte entre un CodingAgent et une ressource
possède un Guardrail, cette restriction continue de régir la paire même si un autre chemin existe dans le graphe.

## Trois schémas utiles

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

## Limites importantes

- Un CodingAgent n'obtient pas d'accès par proximité visuelle ; un chemin de Connections doit exister.
- Référencer un Node dans un message ne lui accorde pas l'accès.
- Un Guardrail limite la paire directe à laquelle il appartient ; ce n'est pas une politique globale du Workspace.
- Les messages coordonnent le travail, mais ne doivent pas être le seul lieu d'une décision durable.
- Les providers ne proposent pas nécessairement les mêmes modèles, permissions, événements ou opérations de session.
- Un Trigger remet un prompt à une session active ; il n'étend pas les permissions et ne garantit pas qu'un effet
  externe se produise exactement une fois.
- Autoriser l'édition du Canvas n'autorise ni la suppression de Nodes ni la modification de Guardrails ; ces limites
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
