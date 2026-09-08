---
id: file
title: "File : contexte et portée sur le Canvas"
description: Utilisez un File pour garder une source canonique visible, délimiter le contexte d'un CodingAgent et transmettre son chemin à un Terminal.
kind: guide
lastReviewedAt: 2026-09-08
canonicalUrl: https://agentkavor.com/fr/docs/file
---

# Un File est un fichier — et c'est déjà puissant

Un File n'est pas une pièce jointe jetable. Il représente une source canonique du filesystem sur le Canvas et rend
clair quel contenu le travail doit lire, revoir, modifier ou utiliser comme entrée.

[![Un PDF affiché dans un File Node et utilisé par un CodingAgent sur le Canvas de Kavor](https://agentkavor.com/kavor-pdf-canvas-agent-demo-poster.jpg)](https://agentkavor.com/fr/videos/pdf-canvas-agent)

*Le File garde le contenu visible pendant que vous organisez agents, décisions et exécution autour de lui.*

## Ce que fait un File

À lui seul, un File permet de visualiser et d'utiliser une source du Workspace. Selon son format, Kavor propose
l'édition de texte, la recherche, des préférences de lecture et un aperçu enrichi.

Les formats texte incluent Plain Text, Markdown, JSON, SQL, TypeScript, JavaScript, YAML, Shell, HTML et CSS. Les
images et les PDF peuvent être visualisés sur le Canvas ; un SVG peut alterner entre aperçu et source.

Le File continue de pointer vers la vraie source. Si le fichier change en dehors de Kavor, le Node reflète ce changement
et signale lorsqu'une modification locale doit être réconciliée. Vous ne confondez ainsi pas une copie de contexte
avec l'artefact qui sera réellement versionné.

## Un File comme portée explicite

Connecté à un CodingAgent, un File transforme une intention générale en source de travail concrète. Il peut délimiter un
module, fournir un contrat d'entrée, garder une image ou un PDF disponible pour l'analyse, ou identifier la
configuration à revoir.

Une demande de départ peut être :

> Lis le File connecté comme la source canonique de cette tâche. Explique ce qui doit changer, préserve la portée et n'édite qu'après ma confirmation du plan.

Lorsque l'agent doit seulement consulter le contenu, utilisez le Guardrail file_read_only sur la Connection directe.
L'agent peut toujours atteindre le File, mais ne peut pas modifier sa source par les opérations médiées par Kavor.

## Un File comme entrée d'un Terminal

Une Connection File + Terminal exporte le chemin absolu canonique du fichier vers la session au moyen d'un nom de
variable d'environnement choisi par vous. La valeur est le chemin, pas une copie du contenu.

Le chemin est appliqué au démarrage de la session Terminal. Si vous modifiez la Connection ou son paramètre alors que
le shell est déjà ouvert, l'interface indique que la session doit être redémarrée pour recevoir la nouvelle valeur.

C'est utile pour les scripts, SQL, configurations et rapports : le File garde la source explicite sur le Canvas et le
Terminal exécute la commande sans copier de chemins entre fenêtres.

## Trois façons de l'utiliser

### Revoir une source existante

Connectez le File à un CodingAgent et demandez une lecture orientée vers les risques. Pour une revue visuelle, gardez
le File, une Sticky Note pour les findings et un Terminal pour les contrôles dans le même graphe.

### Implémenter avec une portée claire

Connectez une Specification, le File et le Builder. La Specification explique le résultat ; le File identifie la
source concrète ; le CodingAgent effectue la modification et enregistre les preuves aux endroits appropriés.

### Transformer un artefact en entrée exécutable

Connectez un File SQL ou script à un Terminal, nommez la variable et lancez la commande depuis le shell. Si un agent est
aussi connecté, il peut aider à interpréter la sortie pendant que vous suivez le processus.

## Limites importantes

- une Connection ne transforme pas le File en accès générique au filesystem ; le Node représente toujours sa source
  canonique configurée ;
- tous les formats binaires ne sont pas éditables comme du texte ;
- le chemin exporté au Terminal ne contient pas le corps du fichier ;
- une Connection directe avec un CodingAgent est nécessaire pour un Guardrail propre au File ;
- les modifications externes ou concurrentes doivent être réconciliées avant de remplacer une modification locale ;
- être près d'un File sur le Canvas ne donne pas accès à son contenu.

## Pour aller plus loin

- Consultez la [matrice des Connections](./connections.md), notamment File + Terminal et CodingAgent + File.
- Découvrez [comment les CodingAgents voient le graphe](./coding-agents-and-canvas.md).
- Combinez un File avec une [Sticky Note](./sticky-note.md) pour séparer source canonique et mémoire de travail.
- [Bouclez votre premier cycle](./first-loop.md) avec intention, implémentation, preuves et revue.
