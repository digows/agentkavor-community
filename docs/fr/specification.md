---
id: specification
title: "Specification dans Kavor : réfléchissez soigneusement une fois, implémentez mieux"
description: Structurez intention, décisions et critères dans un Markdown durable, organisez plusieurs roots et guidez le lifecycle de la Specification.
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/fr/docs/specification
---

# Specification dans Kavor : réfléchissez soigneusement une fois, implémentez mieux

Une Specification transforme une intention en contrat durable que les humains et CodingAgents peuvent lire,
discuter, implémenter et revoir sans dépendre de la mémoire d'une seule conversation.

Elle peut définir une architecture, une intégration, un modèle de domaine, une feature, un module ou un ensemble
délimité de corrections. Sa taille varie, pas sa responsabilité : expliquer ce qui doit être vrai avant de considérer
le travail terminé.

![Workspace Settings de Kavor avec quatre roots de Specification configurées.](https://media.agentkavor.com/releases/1.4.0/multiple-specification-roots/article.7d42383e3a37.jpg)

## La source de vérité est un fichier

Le contenu d'une Specification vit en Markdown dans votre Workspace. Le fichier vous appartient : ouvrez-le dans
Kavor, modifiez-le avec d'autres outils, versionnez-le dans Git et laissez les CodingAgents le lire directement.

Kavor ne conserve autour de cette source que les métadonnées opérationnelles, comme l'identité, le statut et les
outputs. Le frontmatter préserve l'identité qui permet de suivre une Specification lorsque son fichier est déplacé ou
renommé.

Ne modifiez pas manuellement les champs contrôlés par Kavor dans le frontmatter. Écrivez le contrat dans le corps et
laissez les opérations du produit actualiser identité et lifecycle.

## Écrivez-la seul ou avec un CodingAgent

Vous pouvez commencer manuellement ou coécrire avec un CodingAgent. Pour un sujet difficile, une session consacrée à
la planification et davantage de capacité de raisonnement avant l'implémentation peuvent être utiles.

Un bon point de départ :

> Interroge-moi sur le sujet X pour écrire la Specification Y. Sépare les faits vérifiés, décisions, hypothèses,
> non-goals, scénarios d'échec et critères d'acceptation observables. Ne considère pas le document Ready tant que des
> décisions susceptibles de changer la solution restent ouvertes.

Mieux réfléchir ici peut réduire reprise, contexte gaspillé et implémentation ambiguë. Ce n'est pas une garantie de
coût inférieur : une mauvaise Specification reste mauvaise même longue ou écrite par un modèle coûteux.

## Un contrat minimal capable de guider le travail

Une Specification utile contient généralement :

- le contexte et le problème actuel ;
- l'objectif et la définition du succès ;
- les non-goals qui limitent le périmètre ;
- les décisions et contraintes ;
- l'approche prévue lorsqu'elle est déjà décidée ;
- des critères d'acceptation observables ;
- les scénarios d'échec et risques pertinents ;
- les questions encore ouvertes ;
- les références au code, aux ADRs, issues ou autres Specifications.

Le document n'a pas besoin d'un rituel fixe si le Workspace possède une meilleure convention. Il doit toutefois
distinguer décision et hypothèse, et permettre d'évaluer le résultat sans reconstruire la conversation originale.

## Le lifecycle guide, il ne décore pas

Kavor utilise cinq états :

| État | Signification pratique |
| --- | --- |
| **Draft** | Le problème est encore étudié, discuté ou décidé. |
| **Ready** | Le contrat contient assez d'informations pour démarrer l'implémentation en sécurité. |
| **In progress** | Le travail autorisé par la Specification est en cours. |
| **Blocked** | Une condition concrète empêche un progrès significatif. |
| **Done** | L'objectif est atteint et aucun travail exigé par le contrat ne reste. |

Le statut est volontairement advisory. Kavor ne transforme pas les checkboxes Markdown en système propriétaire et
ne prouve pas seul que tous les critères sont satisfaits. Passer à Done exige toujours des preuves et du jugement.

Séparer rédaction, implémentation et revue est une pratique solide. Le CodingAgent coauteur peut clarifier le
contrat ; un autre l'implémente ; un Reviewer indépendant compare résultat et critères.

## Organiser plusieurs Specification roots

Un Workspace peut conserver ses Specifications dans plusieurs dossiers. C'est utile lorsqu'un projet sépare déjà
les décisions par produit, ingénierie, opérations ou modules, ou lorsqu'une root unique devient difficile à parcourir.

Ouvrez Workspace Settings et utilisez **Specification roots** pour ajouter, retirer ou réordonner les dossiers. Les
roots sont :

- relatives au répertoire du Workspace ;
- ordonnées ;
- uniques et non superposées ;
- limitées à 32 par Workspace.

La première root est **Primary** et reçoit les nouvelles Specifications par défaut. Réordonner change cette cible,
sans déplacer les fichiers existants. Retirer une root ne supprime pas ses fichiers. Les Specifications hors des roots
configurées quittent la liste active et peuvent revenir si la root est ajoutée à nouveau.

Avec plusieurs roots, le panneau Specifications regroupe d'abord par root, puis par dossiers réels du filesystem. Le
Canvas ne crée pas une taxonomie parallèle : l'organisation reste votre structure de fichiers.

### Un agencement simple

```text
docs/         décisions et contrats généraux du produit
specs/        features et intégrations en cours d'implémentation
marketing/    campagnes et expériences éditoriales
operations/   maintenance et changements opérationnels
```

Ne créez pas de roots uniquement pour raccourcir une liste. Utilisez-les lorsque chaque dossier forme une frontière
durable et compréhensible pour humains et agents.

## Ce que la Specification gagne dans le graphe

Une Specification accepte deux Connections directes :

- **Specification + CodingAgent** met le contrat à portée de l'agent et permet lifecycle et outputs. La Connection
  peut porter `specification_read_only`.
- **Specification + Terminal** exporte le chemin absolu canonique du Markdown via une variable d'environnement
  configurée sur la Connection.

Les autres CodingAgents du même composant peuvent aussi atteindre la Specification par des chemins valides. Il n'est
pas nécessaire de répéter la Connection directe pour chaque participant, sauf pour clarifier la topologie ou poser
un Guardrail propre à cette paire.

## Trois usages qui justifient une Specification

### Fondation architecturale

Consignez invariants, dépendances permises, limites de sécurité, stratégie de migration et critères vérifiables. Le
document guidera les features suivantes sans que chaque agent redécouvre la fondation.

### Feature avec implémentation et revue indépendantes

Un Spec Writer épuise les décisions et passe le contrat à Ready. Un Implementer travaille à partir de celui-ci. Un
Reviewer contrôle comportement, échecs et preuves. Les outputs rattachent commits et autres résultats au travail.

### Série délimitée de corrections

Lorsque plusieurs défauts partagent une cause ou une surface, une Specification peut définir le comportement attendu,
l'ensemble exact des corrections et les tests de régression. Si elle devient une liste infinie de bugs sans frontière
commune, elle n'est plus un contrat.

## Un graphe pratique

```text
Spec Writer — Specification — Implementer — Reviewer
                        │
                     Terminal
```

Le Spec Writer consigne les décisions. L'Implementer exécute uniquement un contrat Ready. Le Reviewer compare
résultat et critères. Le Terminal fournit les preuves. La décision de passer à Done reste humaine.

## Ce qu'il faut éviter

- Quitter Draft parce que le texte paraît long sans résoudre les décisions qui changent la solution.
- Réunir analyse, Specification, implémentation et revue dans une même session par commodité.
- Écrire « fonctionne correctement » ou « offre de bonnes performances » sans résultat observable.
- Modifier le frontmatter contrôlé par Kavor comme du contenu ordinaire.
- Traiter le statut comme preuve automatique de qualité ou d'achèvement.
- Créer des roots superposées ou plusieurs roots sans frontière éditoriale durable.
- Conserver l'unique décision importante dans une conversation que le participant suivant ne trouvera pas.

## Avant de passer à Ready

Vérifiez :

- problème, objectif et non-goals sont-ils clairs ?
- faits, décisions et hypothèses sont-ils séparés ?
- les scénarios d'échec pertinents ont-ils été traités ?
- les critères d'acceptation sont-ils vérifiables ?
- l'Implementer saura-t-il ce qu'il peut modifier ?
- le Reviewer pourra-t-il évaluer sans hériter du raisonnement de l'auteur ?
- les questions susceptibles de changer la solution ont-elles une réponse ?

Une bonne Specification ne cherche pas à prédire chaque ligne de code. Elle lève assez d'ambiguïté pour rendre
exécution et revue indépendantes, vérifiables et récupérables.

Poursuivez avec [Fermer votre première boucle dans Kavor](./first-loop.md), choisissez les participants dans
[CodingAgents et rôles](./agents-and-roles.md) ou consultez la [matrice des Connections](./connections.md).
