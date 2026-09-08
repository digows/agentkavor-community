---
id: what-is-kavor
title: Qu'est-ce que Kavor ?
description: Comprenez le système visuel local-first de Kavor pour coordonner les coding agents et un contexte d'ingénierie durable.
kind: guide
lastReviewedAt: 2026-09-08
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
participants : Specifications, Files, Sticky Notes, Terminals, WebBrowsers, Triggers et CodingAgents. Les Connections
forment des composants accessibles. Un CodingAgent peut travailler avec tout Node de son composant sans Connection
directe. Les paramètres et Guardrails restent liés à des Connections précises lorsqu'une configuration ou une limite
plus forte est nécessaire.

Un CodingAgent peut implémenter une Specification, un autre examiner le résultat et un troisième préparer la version.
La Specification et les preuves restent dans le Workspace après la fin de chaque session. Vous pouvez inspecter le
graphe, intervenir et décider de ce qui est accepté.

[![Canvas Kavor avec des CodingAgents, Specifications, Files, Sticky Notes et Terminals connectés](https://media.agentkavor.com/demos/canvas-overview/workspace.8f917eaa5261.jpg)](https://agentkavor.com/fr/videos/overview)

[Regardez un véritable Workspace Kavor en 38 secondes →](https://agentkavor.com/fr/videos/overview)

## Vocabulaire central

- **Workspace** — l'environnement Kavor enraciné dans un répertoire que vous choisissez.
- **Canvas** — la surface visuelle où le travail est organisé.
- **Node** — un élément de premier ordre du Canvas, tel qu'un CodingAgent, une Specification, une Sticky Note, un
  Terminal, un File, un WebBrowser ou un Trigger.
- **Connection** — une relation explicite et non orientée qui intègre des Nodes dans un composant accessible.
- **CodingAgent** — un fournisseur d'agent participant au Workspace.
- **Specification** — un contrat Markdown durable pour l'intention, les contraintes et les critères d'acceptation.
- **Guardrail** — une restriction contrôlée par l'utilisateur et appliquée à une Connection.
- **Sticky Note** — une mémoire de travail informelle partagée pour les décisions, observations et prochaines étapes.
- **WebBrowser** — de véritables pages Chromium que l'humain et le CodingAgent peuvent observer et utiliser dans le même état actif.
- **Trigger** — une cause visible d'activité ; Schedule est sa source disponible pour les actions temporelles.

## Le web participe lui aussi au graphe

Un WebBrowser conserve de véritables pages sur le Canvas. Connecté à un CodingAgent, il permet à l'humain et à
l'agent de travailler sur les mêmes onglets, la même navigation et le même état visible, sans réduire le web à du
texte copié dans une conversation. Lors d'un changement de Workspace, la page peut rester active et revenir dans le
même état.

[![WebBrowser Kavor connecté à un CodingAgent qui utilise la même page](https://media.agentkavor.com/releases/1.6.0/web-browser/poster.05d724ba99c7.png)](https://agentkavor.com/fr/videos/web-browser-node)

[Voir le WebBrowser en action →](https://agentkavor.com/fr/videos/web-browser-node)

## Ce qui reste local

Kavor est local-first. Votre Workspace, vos dépôts, fichiers, terminaux et sessions de fournisseurs restent sous votre
contrôle, sur votre machine. Une Connection exprime une autorisation dans Kavor ; elle ne justifie pas la copie de
contenu privé du Workspace vers des services publics.

## Une première boucle utile

Commencez petit : reliez une Specification à un CodingAgent et à un Terminal. Demandez au CodingAgent d'implémenter le
contrat, examinez les preuves et conservez la décision dans le Workspace. Ajoutez des relecteurs et des boucles plus
riches uniquement lorsque le travail en bénéficie.

[Suivez le tutoriel complet de la première boucle](./first-loop.md) pour ajouter implémentation, revue, preuves
partagées et décision humaine.

Lorsque vous souhaitez que le CodingAgent vous aide à construire la structure, découvrez [comment les CodingAgents
voient et construisent le Canvas](./coding-agents-and-canvas.md). Pour lancer un travail dans le temps, découvrez
[Schedule](./schedule.md).

## Une application, plusieurs Workspaces

Vous pouvez ouvrir différents Workspaces dans des fenêtres indépendantes et les répartir entre plusieurs écrans.
Chaque fenêtre conserve son propre Canvas et ses sessions, tandis que l'application continue d'utiliser un runtime
partagé.

![Plusieurs Workspaces Kavor ouverts dans différentes fenêtres](https://media.agentkavor.com/releases/1.3.0/multiple-workspaces/overview.baa20506a993.jpg)

[Téléchargez Kavor](https://download.agentkavor.com/fr) ou consultez les [notes de version](./release-notes/index.md).
