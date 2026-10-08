---
id: terminal
title: "Terminal dans Kavor : une exécution visible pour l'humain et l'agent"
description: Utilisez un vrai shell sur le Canvas, reliez le contexte par des chemins canoniques et laissez le CodingAgent aider sans perdre la supervision.
kind: guide
lastReviewedAt: 2026-10-08
canonicalUrl: https://agentkavor.com/fr/docs/terminal
---

# Terminal dans Kavor : une exécution visible pour l'humain et l'agent

Un Terminal est un vrai shell sur le Canvas. Vous continuez à saisir des commandes, suivre les logs et utiliser vos
outils habituels ; Kavor ajoute contexte, observabilité et collaboration autour de cette session.

Le but n'est pas de cacher l'exécution derrière un bouton, mais de permettre à l'humain et au CodingAgent de
travailler dans le même environnement visible, chacun sous des limites claires.

![Terminals, Files, Specifications et CodingAgents reliés dans un Canvas de travail](https://media.agentkavor.com/editorial/nodes-and-connections/graph.b499a1b842e8.jpg)

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

## Coller des fichiers et images dans la saisie d'une session

Utilisez un fichier ou une capture sans saisir son chemin. Le collage dans Terminal ou la surface terminal d'un
CodingAgent insère une référence préparée pour la session, pas des données binaires dans la ligne de commande.

1. Copiez un fichier depuis le gestionnaire de fichiers du système ou une image PNG/JPEG dans le presse-papiers.
2. Donnez le focus à la saisie d'une session Terminal ou CodingAgent ouverte.
3. Utilisez `Paste` dans le menu contextuel ou le raccourci de collage de la surface.
4. Vérifiez le chemin inséré et terminez la commande ou la demande avant de l'envoyer.

Par exemple, collez une capture d'un formulaire défectueux dans la saisie du CodingAgent, puis demandez :

> Utilisez l'image référencée pour comparer le formulaire à son implémentation. Reproduisez le problème dans le
> WebBrowser connecté et décrivez la différence observée avant de modifier le code.

Kavor fournit la référence ; l'interprétation de l'image dépend du provider. Coller une image ne l'affiche pas inline
dans Terminal et ne prouve pas que le harness l'a analysée.

Si le presse-papiers contient l'image elle-même, Kavor enregistre une copie locale dans le profil de l'application et
insère son chemin. Les images de plus de 20 MB sont refusées. Pour des références à des fichiers existants, leurs
chemins sont utilisés. Sans fichier ni image, le texte reste collé comme texte.

Cela ne crée ni File, ni Connection, ni variable d'environnement. Utilisez [File](./file.md) pour une ressource
explicite dans le graphe, ou la section précédente pour les chemins fournis au shell par une Connection. Vérifiez
le contenu sensible avant de l'envoyer au provider.

Les raccourcis dans Terminal, un éditeur ou une page appartiennent à cette surface. Pour copier ou déplacer des
**Nodes**, donnez le focus au Canvas et suivez la [procédure de graphe](./nodes.md#réutiliser-un-graphe-sans-reconstruire-chaque-node).

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

## Exemple : enquêter sur une panne sans tout redémarrer

Une application web tourne dans Terminal App, mais un formulaire ne termine pas son envoi. Gardez ce processus ouvert
et utilisez un autre Terminal, Checks, pour les vérifications. Reliez le CodingAgent aux ressources nécessaires :

> Observe l'écran actuel de Terminal App et reproduis l'erreur dans le WebBrowser connecté. Rapproche l'heure de
> l'action des logs. Ne redémarre pas le serveur et n'interromps pas mon processus. Utilise Terminal Checks si tu as
> besoin d'une commande distincte, et note ce que chaque vérification confirme ou écarte.

Pour un projet Node.js, une vérification simple dans Terminal Checks peut confirmer l'environnement :

```sh
node --version
```

Pour enquêter sur l'application, l'agent doit choisir les commandes réelles du projet après avoir lu ses scripts et
conventions. Une commande générique empruntée à une autre stack ne prouve rien sur la panne.

Le résultat attendu relie l'action, la sortie observée et une cause démontrée ou une hypothèse délimitée. « La requête
a atteint le serveur mais a renvoyé une erreur de validation » est plus utile que « le serveur semble défectueux ».
Après une correction autorisée, répétez le même parcours pour comparer les résultats.

### Suivre un processus que vous avez lancé

Vous pouvez aussi lancer un build et demander au CodingAgent de ne suivre que la sortie pertinente :

> Suis le build dans ce Terminal. Utilise la sortie récente et ne consulte davantage d'historique que si nécessaire.
> Rapporte le résultat observable et les messages qui étayent ta conclusion. N'envoie pas de commandes et ne termine
> pas le processus pendant son exécution.

La demande coordonne la collaboration ; `terminal_read_only` peut restreindre les opérations Kavor à l'observation.
Vous continuez à utiliser le shell tandis que l'agent aide à interpréter l'état visible.

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
- Schedule ne remet une commande qu'à une session ouverte. Au démarrage, Kavor peut restaurer un Terminal marqué
  pour rester ouvert lorsqu'il est ciblé par un Trigger actif, mais ne récupère pas automatiquement les commandes
  manquées lorsque l'application était fermée.
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
