---
id: what-is-kavor
title: Qu'est-ce que Kavor ?
description: Comprenez le système visuel local-first de Kavor pour coordonner les coding agents et un contexte d'ingénierie durable.
kind: guide
lastReviewedAt: 2026-08-05
canonicalUrl: https://agentkavor.com/fr/docs/what-is-kavor
---

# Qu'est-ce que Kavor ?

Kavor est un système visuel local-first pour coordonner les coding agents et le travail d'ingénierie qui les entoure.
Il garde le contexte visible sur un Canvas au lieu de l'enfouir dans des chats et terminaux sans lien.

Les coding agents ont réduit le coût de l'implémentation. Ils n'ont pas supprimé la nécessité de cadrer le problème,
préserver le contexte, examiner les preuves, prendre des décisions et comprendre qui peut agir sur quoi. Kavor donne
une structure explicite à ce travail.

## Comment fonctionne Kavor

Un Workspace part d'un répertoire que vous choisissez. Sur son Canvas, vous ajoutez des Nodes pour les ressources et
participants : Specifications, Files, Sticky Notes, Terminals et CodingAgents. Les Connections entre Nodes transmettent
le contexte et accordent des capacités visibles. Les Guardrails restreignent ces capacités quand une limite plus
forte est nécessaire.

Un CodingAgent peut implémenter une Specification, un autre examiner le résultat et un troisième préparer la version.
La Specification et les preuves restent dans le Workspace après la fin de chaque session. Vous pouvez inspecter le
graphe, intervenir et décider de ce qui est accepté.

[![Canvas Kavor avec des CodingAgents, Specifications, Files, Sticky Notes et Terminals connectés](https://agentkavor.com/kavor-working-demo-poster.jpg)](https://agentkavor.com/fr/videos/overview)

[Regardez un véritable Workspace Kavor en 38 secondes →](https://agentkavor.com/fr/videos/overview)

## Vocabulaire central

- **Workspace** — l'environnement Kavor enraciné dans un répertoire que vous choisissez.
- **Canvas** — la surface visuelle où le travail est organisé.
- **Node** — un élément de premier ordre du Canvas, tel qu'un CodingAgent, une Specification, un File, un Terminal ou une Sticky Note.
- **Connection** — une relation explicite qui partage du contexte ou accorde une capacité entre des Nodes.
- **CodingAgent** — un fournisseur d'agent participant au Workspace.
- **Specification** — un contrat Markdown durable pour l'intention, les contraintes et les critères d'acceptation.
- **Guardrail** — une restriction contrôlée par l'utilisateur et appliquée à une Connection.
- **Sticky Note** — une mémoire de travail informelle partagée pour les décisions, observations et prochaines étapes.

## Ce qui reste local

Kavor est local-first. Votre Workspace, vos dépôts, fichiers, terminaux et sessions de fournisseurs restent sous votre
contrôle, sur votre machine. Une Connection exprime une autorisation dans Kavor ; elle ne justifie pas la copie de
contenu privé du Workspace vers des services publics.

## Une première boucle utile

Commencez petit : reliez une Specification à un CodingAgent et à un Terminal. Demandez au CodingAgent d'implémenter le
contrat, examinez les preuves et conservez la décision dans le Workspace. Ajoutez des relecteurs et des boucles plus
riches uniquement lorsque le travail en bénéficie.

[Téléchargez Kavor](https://download.agentkavor.com/fr) ou consultez les [notes de version](./release-notes/index.md).
