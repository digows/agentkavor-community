---
id: first-loop
title: Comment fermer votre première boucle dans Kavor
description: Construisez une petite boucle avec une Specification, Claude Code, Codex et une Sticky Note, de l'intention à la décision humaine.
kind: tutorial
lastReviewedAt: 2026-08-05
canonicalUrl: https://agentkavor.com/fr/docs/first-loop
---

# Comment fermer votre première boucle dans Kavor

Le meilleur premier Canvas n'est pas le plus complet. C'est le plus petit qui transforme une intention claire en
un changement que vous pouvez examiner.

Dans ce tutoriel, Claude Code implémente une Specification, Codex examine le résultat, tous deux conservent les
preuves dans une Sticky Note, et vous décidez quand le travail est terminé.

[![Specification, Claude Code, Codex et Sticky Note connectés sur le Canvas](https://agentkavor.com/kavor-small-loop-demo-poster.jpg)](https://agentkavor.com/fr/videos/small-loop)

[Regardez la boucle complète en 1 minute et 29 secondes →](https://agentkavor.com/fr/videos/small-loop)

## Avant de commencer

Vous avez besoin de :

- Kavor avec un Workspace ouvert ;
- Claude Code et Codex installés et authentifiés ;
- une petite tâche avec un résultat observable dans le répertoire du Workspace.

Une bonne première tâche tient en une phrase et comporte deux ou trois critères objectifs. Par exemple : « Ajouter
la validation du formulaire et conserver les tests existants au vert. » Évitez de commencer par une refactorisation
de grande ampleur.

## La boucle que vous allez construire

Le travail suivra cette séquence :

`Specification → Claude Code → message → Codex → décision humaine`

La Specification sera connectée aux deux CodingAgents. Claude Code et Codex seront également connectés l'un à
l'autre et à la même Sticky Note.

Les Connections ne sont pas des flèches de flux. Ce sont des relations entre Nodes ; la séquence ci-dessus décrit
le travail de ce tutoriel.

## Vous préférez la construire avec de l'aide ?

Votre CodingAgent préféré peut aussi consulter la documentation officielle de Kavor, sans configuration
supplémentaire, pour expliquer le Canvas, répondre aux questions et vous aider à construire la boucle. Lorsque les
Connections et autorisations actuelles le permettent, le CodingAgent peut également créer des Nodes et des
Connections avec vous.

Vous pouvez commencer par cette demande :

> Consultez la documentation officielle de Kavor et aidez-moi à construire une première boucle pour cette tâche.
> Commencez par expliquer la structure et les Connections nécessaires. Ensuite, si les Connections actuelles le
> permettent, créez la Specification, les CodingAgents et la Sticky Note, reliez-les, puis arrêtez-vous avant de
> commencer l'implémentation afin que je puisse examiner la boucle.

La documentation n'étend pas l'accès du CodingAgent, ne crée pas de Connections implicites et ne permet pas de
contourner les Guardrails. Si le service de documentation est indisponible, les autres outils locaux de Kavor
continuent de fonctionner.

## 1. Créez une petite Specification

1. Faites un clic droit sur une zone vide du Canvas et choisissez `Add Spec…`.
2. Donnez-lui un nom direct, comme `Corriger la validation du formulaire`, puis confirmez.
3. Modifiez la Specification pour consigner :
   - le problème actuel ;
   - le résultat attendu ;
   - ce qui est hors périmètre ;
   - deux ou trois critères d'acceptation vérifiables.
4. Passez le statut de `Draft` à `Ready` lorsque le contrat est prêt à être implémenté.

Une Specification est un Markdown durable. Elle reste dans le Workspace à la fin d'une session et permet à
l'implémentation, à la revue et à la décision humaine de partir du même contrat.

## 2. Ajoutez les participants et la mémoire partagée

Faites un clic droit sur le Canvas et ajoutez :

- `Add Claude Code` ;
- `Add Codex` ;
- `Add Sticky Note`.

Renommez les CodingAgents si cela clarifie leurs rôles, par exemple `Implementer` et `Reviewer`. Donnez à la Sticky
Note un titre simple, comme `Implementation and review notes`.

Créez ces cinq Connections :

1. Specification — Claude Code ;
2. Specification — Codex ;
3. Claude Code — Codex ;
4. Claude Code — Sticky Note ;
5. Codex — Sticky Note.

Faites glisser la poignée circulaire d'un Node vers celle de l'autre. Pour la première Connection de chaque type,
lisez la confirmation de Kavor avant de continuer. N'ajoutez pas de Guardrails à cette première boucle ; utilisez-les
plus tard lorsque vous aurez une restriction précise à appliquer.

## 3. Demandez une livraison vérifiable

Envoyez ceci à Claude Code :

> Lisez la Specification connectée et implémentez uniquement ce périmètre. Avant de modifier le code, confirmez les
> critères d'acceptation. Une fois terminé, exécutez les vérifications pertinentes, enregistrez les outputs durables
> sur la Specification et ajoutez à la Sticky Note un résumé des fichiers modifiés, des vérifications exécutées et
> des risques restants. Envoyez ensuite un message Kavor à Codex, en référençant la Specification, et demandez une
> revue selon les critères d'acceptation.

Une Connection rend le contexte et les capacités autorisées accessibles ; elle n'exécute pas la tâche toute seule.
Suivez le travail dans le CodingAgent et ne considérez pas « terminé » comme une preuve suffisante.

## 4. Recevez la revue

Lorsque le message arrive, Codex peut utiliser la Specification et la Sticky Note directement connectées.
Demandez-lui de :

- comparer l'implémentation à chaque critère d'acceptation ;
- exécuter les vérifications pertinentes ;
- consigner des constats concrets, ou indiquer qu'il n'a trouvé aucun blocage ;
- ajouter le résultat de la revue à la Sticky Note ;
- répondre à Claude Code lorsqu'une correction est nécessaire.

Ouvrez `Messages` sur le Node pour examiner la livraison et les réponses. S'il y a des constats, laissez Claude Code
les corriger puis demandez une nouvelle revue. Ce retour fait partie de la même boucle.

## 5. Fermez la boucle par une décision humaine

Avant de marquer le travail comme terminé :

1. relisez les critères de la Specification ;
2. examinez les outputs et les modifications produites ;
3. vérifiez que la Sticky Note contient les résumés d'implémentation et de revue ;
4. résolvez les constats bloquants ;
5. passez le statut de la Specification à `Done`.

Le statut ne remplace pas votre décision. Vous pouvez toujours accepter le changement, demander une correction,
réduire le périmètre ou l'abandonner. La boucle est fermée lorsque l'intention, l'exécution, la revue, les preuves et
l'acceptation restent visibles dans le Workspace.

## Résultat attendu

À la fin :

- le Canvas montre qui a participé et quel contexte a été partagé ;
- la Specification conserve le contrat et les outputs durables ;
- les messages entre CodingAgents restent consultables ;
- la Sticky Note rassemble les observations d'implémentation et de revue ;
- la décision finale reste la vôtre.

## Si quelque chose ne fonctionne pas

- **Le CodingAgent ne trouve pas la Specification ou la Sticky Note :** vérifiez la Connection directe entre les
  deux Nodes. Référencer un Node dans un message n'accorde pas d'accès à lui seul.
- **Le message n'arrive pas :** vérifiez la Connection entre les CodingAgents et ouvrez `Messages` pour examiner la
  livraison. Un fournisseur occupé peut recevoir le message plus tard.
- **Un Guardrail bloque l'action :** ouvrez la Connection et examinez la restriction ; ne demandez pas au CodingAgent
  de la contourner.
- **Les preuves manquent :** demandez au CodingAgent d'enregistrer les fichiers, commits ou autres outputs durables
  sur la Specification et de compléter la Sticky Note.

Continuez avec [Qu'est-ce que Kavor ?](https://agentkavor.com/fr/docs/what-is-kavor), lisez les
[notes de version](https://agentkavor.com/fr/docs/release-notes), ou partagez votre première boucle
dans la [Kavor Community](https://github.com/digows/agentkavor-community/discussions).
