---
id: terminal
title: "Terminal dans Kavor : une exécution visible pour l'humain et l'agent"
description: Utilisez un vrai shell sur le Canvas, reliez le contexte par des chemins canoniques et laissez le CodingAgent aider sans perdre la supervision.
kind: guide
lastReviewedAt: 2026-08-18
canonicalUrl: https://agentkavor.com/fr/docs/terminal
---

# Terminal dans Kavor : une exécution visible pour l'humain et l'agent

Un Terminal est un vrai shell sur le Canvas. Vous continuez à saisir des commandes, suivre les logs et utiliser vos
outils habituels ; Kavor ajoute contexte, observabilité et collaboration autour de cette session.

Le but n'est pas de cacher l'exécution derrière un bouton, mais de permettre à l'humain et au CodingAgent de
travailler dans le même environnement visible, chacun sous des limites claires.

## Ce que possède un Terminal

Chaque Terminal possède sa session, son shell et l'historique d'écran retenu par le Node. Plusieurs Terminals sont
utiles lorsque les responsabilités diffèrent : application, tests, base de données, logs ou machine distante déjà
ouverte par vous.

Le processus reste un processus shell. Kavor ne transforme pas le texte affiché en succès, chaque commande en tâche
persistée, et ne suppose pas qu'un outil est terminé parce qu'il a imprimé un message optimiste.

## Ce qu'il peut faire seul

Sans Connections, le Terminal conserve déjà un shell dans le Workspace et évite de rompre le flux pour changer de
fenêtre. Vous pouvez exécuter des commandes interactives, observer des processus longs et garder plusieurs sessions
sur le même Canvas.

Les Connections ajoutent participants et sources canoniques sans remplacer le shell.

## Ce qu'il gagne dans le graphe

Le Terminal accepte quatre paires directes :

| Connection | Ce qu'elle ajoute |
| --- | --- |
| **Terminal + CodingAgent** | L'agent peut exécuter des commandes corrélées, suivre le processus, consulter écran ou historique et interrompre une exécution lorsqu'il y est autorisé. Elle peut porter `terminal_read_only`. |
| **Terminal + File** | Exporte le chemin absolu canonique du File dans une variable d'environnement choisie par vous. |
| **Terminal + Specification** | Exporte le chemin absolu canonique du Markdown de la Specification par une variable d'environnement. |
| **Terminal + Trigger** | Sélectionne la session active comme cible directe d'une commande planifiée par Schedule. |

Un CodingAgent n'a pas besoin d'un lien direct avec le Terminal si tous deux appartiennent déjà au même composant
accessible. La Connection directe est toutefois l'endroit où `terminal_read_only` impose que cet agent ne fasse
qu'observer.

## Aider sans disputer le clavier

Le Terminal est une surface partagée où l'humain est prioritaire. Un CodingAgent ne doit pas injecter une commande
par-dessus le texte que vous saisissez. Si l'entrée n'est pas sûre, l'opération attend ou renvoie une condition à
traiter au lieu de corrompre la ligne.

Pour un travail initié par l'agent, Kavor corrèle la commande et son suivi. L'agent peut attendre le résultat, annuler
l'exécution correspondante ou consulter l'état visible. Pour une session existante, il choisit la vue appropriée :
écran actuel, tail limité ou buffer complet.

Cette distinction compte. L'écran répond « que voit l'humain maintenant ? ». Le tail aide pour les logs récents. Le
buffer complet sert aux enquêtes qui ont réellement besoin de l'historique sans transformer chaque interaction en
dump automatique de contexte.

## Utiliser Files et Specifications sans copier les chemins

Les Connections avec File ou Specification reçoivent un nom de variable d'environnement. Sa valeur est le chemin
absolu canonique de la source, jamais son contenu.

```sh
node "$IMPORT_SCRIPT" --input "$SOURCE_FILE"
```

```sh
markdownlint "$SPECIFICATION_FILE"
```

Les variables s'appliquent au démarrage de la session Terminal. Si une Connection ou son paramètre change pendant que
le shell est ouvert, la nouvelle configuration attend le redémarrage de cette session. `TERM` et `COLORTERM` sont
réservées par l'émulateur.

Utilisez des noms qui expriment la responsabilité, tels que `CHECK_SQL`, `SPECIFICATION_FILE` ou `IMPORT_SCRIPT`.
Une variable générique comme `FILE` perd son sens lorsque le graphe grandit.

## Trois schémas utiles

### Implémentation accompagnée de preuves

Reliez Specification, CodingAgent et Terminal. L'agent n'exécute que les vérifications pertinentes, préserve l'output
nécessaire et enregistre le résultat comme output. Vous observez le même shell et pouvez intervenir.

### Diagnostiquer une application en cours

Gardez l'application dans un Terminal et les tests ou requêtes dans un autre. Un CodingAgent accessible consulte
l'écran ou le tail utile, formule une hypothèse et lance une commande délimitée. Les logs restent visibles ; l'enquête
ne devient pas une boîte noire.

### Opération distante supervisée

Vous ouvrez une session SSH dans le Terminal. Un CodingAgent peut interpréter l'état et proposer ou exécuter des
commandes lorsqu'il y est autorisé. Kavor ne devient pas un service distant : identifiants, connexion, shell et
supervision restent dans votre session.

## Un graphe pratique

```text
Specification — Maintainer — Reviewer
                     │
                  Terminal
                     │
              File: check.sql
```

Le Maintainer utilise la Specification comme contrat, le File comme source explicite et le Terminal pour exécuter la
vérification. Le Reviewer évalue résultat et preuves. La Connection File + Terminal fournit `CHECK_SQL`, utilisable
par le shell sans copier manuellement un chemin.

## Une meilleure demande initiale

> Diagnostique l'échec uniquement avec le contexte accessible. Lis d'abord l'écran actuel du Terminal. Exécute une
> commande à la fois, explique ce qu'elle permet de distinguer et préserve l'output nécessaire au Reviewer.
> N'interromps pas un processus lancé par moi et arrête-toi avant toute action destructive ou extension du périmètre
> de la Specification.

Pour la surveillance :

> Suis uniquement le tail nécessaire de ce Terminal. Préviens-moi lorsqu'une nouvelle preuve apparaît ; ne considère
> pas l'absence de nouvelles lignes comme un succès et ne laisse pas tourner un watcher lancé uniquement pour ton
> enquête après sa fin.

## Guardrail en lecture seule

`terminal_read_only` maintient l'inspection et bloque les opérations qui modifieraient session, processus ou entrée
via cette Connection directe. Il convient à un Reviewer qui doit lire les preuves sans exécuter de corrections.

Le Guardrail appartient à la paire. Il ne transforme pas tout le Terminal en surface globalement accessible en
lecture seule et ne remplace pas les permissions du système d'exploitation.

## Limites importantes

- L'output du Terminal ne prouve pas automatiquement qu'un effet externe s'est produit correctement.
- Un CodingAgent ne doit pas interférer avec une saisie humaine inachevée.
- Les commandes destructives exigent toujours un périmètre exact et l'autorisation appropriée.
- Une variable fournie par Connection contient un chemin, pas un contenu ni un secret.
- La modification de ces variables exige le redémarrage de la session Terminal.
- Schedule ne remet une commande qu'à une session active et ne récupère pas automatiquement celles manquées lorsque
  Kavor était fermé.
- Un processus lancé pour une enquête doit être arrêté s'il n'a pas à rester pour l'humain.
- Plusieurs Terminals aident lorsqu'ils représentent de vraies responsabilités ; les dupliquer sans but fragmente
  seulement l'état opérationnel.

## Avant de déléguer une commande

Vérifiez :

- est-ce le bon Terminal pour cette responsabilité ?
- une saisie humaine est-elle en cours ?
- la commande est-elle délimitée et réversible si nécessaire ?
- l'agent sait-il quel output constitue une preuve ?
- faut-il l'écran, un tail ou tout l'historique ?
- les Files et Specifications utilisent-ils des noms de variables compréhensibles ?
- le Reviewer doit-il observer sous `terminal_read_only` ?
- sait-on quand s'arrêter, attendre ou demander votre décision ?

Le Terminal gagne en valeur dans le graphe lorsque l'exécution reste réelle, le contexte explicite et la supervision
présente.

Consultez la [matrice des Connections](./connections.md), découvrez
[comment les CodingAgents voient et construisent le Canvas](./coding-agents-and-canvas.md) ou configurez
[Schedule pour les commandes et prompts](./schedule.md).
