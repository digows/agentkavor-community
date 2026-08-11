---
id: schedule
title: "Schedule dans Kavor : donnez une horloge à votre graphe"
description: Planifiez des prompts et commandes récurrents avec aperçu, pause, Run now et historique durable, sans étendre les permissions.
kind: guide
lastReviewedAt: 2026-08-11
canonicalUrl: https://agentkavor.com/fr/docs/schedule
---

# Schedule dans Kavor : donnez une horloge à votre graphe

Schedule est une cause visible d’activité : vous choisissez quand une action doit survenir, connectez une cible
unique et conservez chaque tentative inspectable dans le Canvas.

Dans le domaine Kavor, Schedule est la source de Trigger disponible. Il n’effectue pas le travail et ne décide pas
s’il faut agir. Il a deux responsabilités : **quand déclencher** et **quel payload livrer**.

La cible donne son sens au payload :

- avec un **CodingAgent**, le payload est un prompt ;
- avec un **Terminal**, le payload est une commande shell.

Le reste appartient à la cible. Workspace, répertoire, provider ou shell, Git mode, permissions, Guardrails et
contexte du graphe restent inchangés.

![Un Schedule terminé connecté à un CodingAgent ayant reçu un prompt de revue, avec une Sticky Note partageant l’intention de la boucle](https://media.agentkavor.com/releases/1.3.0/schedule-trigger/overview.e6db5dc413e3.jpg)

*Schedule lance l’activité ; le CodingAgent utilise le contexte accessible pour exécuter et expliquer le résultat.*

## Trois usages qui justifient un Schedule

### Réveiller un Maintainer avec le contexte

Un Schedule livre chaque jour un prompt à un CodingAgent. Celui-ci atteint une Specification contenant le contrat de
maintenance, un Terminal pour les contrôles, un File d’entrée, une Sticky Note pour le rapport et un Reviewer pour
une évaluation indépendante.

Schedule crée la cause ; le graphe apporte intention, outils, mémoire et collaboration.

### Exécuter une commande opérationnelle visible

Un Schedule directement connecté à un Terminal peut livrer un contrôle, un script ou une commande de maintenance.
Si un File est aussi connecté au Terminal par une variable d’environnement, la commande utilise son chemin canonique
sans copier de valeurs entre fenêtres.

```sh
sqlite3 app.db < "$CHECK_SQL"
```

Le processus reste dans le vrai Terminal. L’historique enregistre ce que Kavor a pu observer sur la livraison sans
inventer une réussite à partir du texte du shell.

### Créer un petit système semi-autonome

```text
Schedule — Maintainer — Specification
                      ├─ Terminal
                      ├─ File
                      ├─ Sticky Note
                      └─ Reviewer
```

Les lignes sont des Connections sans direction persistée. Schedule a une cible directe : `Maintainer`. Le CodingAgent
utilise le reste du composant accessible et laisse des preuves pour la décision humaine.

## Configurez d’abord, libérez l’horloge ensuite

Un nouveau Schedule commence **Paused** comme exécution unique future. Vous pouvez ainsi écrire le payload, choisir
la récurrence, connecter la cible et vérifier l’aperçu avant d’autoriser l’activité.

Ordre recommandé :

1. ajoutez un Schedule au Canvas ;
2. écrivez un payload spécifique et vérifiable ;
3. choisissez une exécution unique ou récurrente ;
4. contrôlez `Next occurrences` et le fuseau affiché ;
5. connectez directement un CodingAgent ou Terminal ;
6. utilisez `Resume` seulement lorsque la structure est prête.

Un Trigger peut rester sans cible pendant sa configuration. Un Schedule actif sans Connection de cible enregistre
l’occurrence comme `Blocked` ; `Run now` sans cible est refusé avant la création d’une tentative.

## Écrivez un payload qui peut se terminer

Un bon prompt précise l’objectif, les ressources du graphe, les preuves attendues et la condition d’arrêt :

> Analyse les échecs CI récents. Exécute seulement les contrôles pertinents dans le Terminal Checks, consigne un
> résumé étayé dans la Sticky Note Daily report et demande au Reviewer une évaluation indépendante. Ne modifie pas le
> code avant d’avoir consigné la cause probable et arrête-toi si la correction exige d’élargir la Specification.

Une bonne commande Terminal est explicite, non interactive et produit un résultat observable :

```sh
pnpm test -- --runInBand
```

Le payload ne remplace pas les Connections. Citer une Sticky Note, un File ou une Specification ne donne pas accès si
le Node n’appartient pas au composant accessible du CodingAgent.

## La récurrence sans masquer le calendrier

L’éditeur propose `Once`, `Hourly`, `Daily`, `Weekdays`, `Weekly`, `Monthly` et `Custom` pour une expression cron
avancée. Les presets et l’éditeur avancé modifient la même expression : il n’existe pas deux plannings parallèles.
L’intervalle minimal est d’une minute. N’approximez pas avec cron une récurrence qu’il ne représente pas correctement,
comme « toutes les deux semaines à partir de cette date ».

Kavor enregistre un fuseau IANA explicite et affiche les prochaines occurrences dans le fuseau local de la machine
qui présente le Canvas. Le fuseau n’est pas modifiable dans l’interface ; il provient de l’hôte lors de
l’enregistrement. Vérifiez l’aperçu avant `Resume`.

Lors du passage à l’heure d’été ou d’hiver, une heure locale répétée ne déclenche qu’une fois. Une heure inexistante
est déplacée vers le premier instant local valide. Dans le preset mensuel, un jour absent du mois est ignoré : le 31
ne s’exécute pas en février.

## Pause, Resume et Run now sont différents

- **Pause** arrête immédiatement les nouvelles occurrences. La période en pause ne crée ni tentative ni `Missed`.
- **Resume** ne considère que les occurrences futures et exige un payload valide ; une exécution unique doit encore
  être dans le futur.
- **Run now** crée une tentative manuelle indépendante, fonctionne en pause et ne déplace pas la récurrence suivante.

`Run now` sert à valider le payload et la cible avant de libérer l’horloge. Ce n’est pas un retry automatique et il ne
change pas l’état Paused ou Running. Une exécution `Once` revient à Paused après son instant ; l’historique et
`Run now` restent disponibles.

## Quand l’heure arrive

Kavor stocke une tentative durable et arbitre la livraison avec les messages déjà acceptés par la cible. La tentative
peut passer par `Pending` et `Delivering` avant le résultat observé.

- **Completed** — Kavor a observé la fin ;
- **Needs attention** — le CodingAgent demande une intervention et peut encore terminer ;
- **Fired** — la livraison a eu lieu mais ce chemin n’expose pas de fin observable ;
- **Failed** — un échec observable s’est produit ;
- **Interrupted** — la livraison a commencé sans résultat fiable ;
- **Blocked** — la cible ou le Workspace était indisponible ;
- **Missed** — l’instant est passé sans que le runtime puisse le réclamer ;
- **Coalesced** — une autre tentative occupait déjà l’unique emplacement en attente de la cible.

L’heure planifiée ne prouve pas l’exécution. Consultez le dernier état du Node et l’historique pour l’heure nominale,
la livraison, le résultat et le diagnostic.

## Quand la machine dort ou que Kavor est fermé

Schedule dépend du runtime local : Kavor doit fonctionner, la machine être éveillée, l’utilisateur authentifié et la
session de la cible active.

Si plusieurs occurrences passent pendant l’indisponibilité, Kavor ne conserve que la plus récente occurrence manquée
de ce Schedule. Il n’exécute pas d’ancien travail par surprise au retour. L’interface affiche `Missed` et propose une
action explicite équivalente à `Run now`.

Il n’y a ni catch-up automatique ni retry des effets externes.

## Quand la cible est déjà occupée

Schedule conserve au maximum une tentative en attente pendant que la cible travaille. Les nouvelles occurrences
arrivant lorsque cet emplacement est occupé sont `Coalesced` et ne seront pas livrées plus tard.

Si la tâche peut durer plus longtemps que la récurrence, augmentez l’intervalle ou rendez la réconciliation de l’état
courant idempotente dans la cible.

## Limites à prendre en compte

- un Schedule a au maximum une cible directe, CodingAgent ou Terminal ;
- il ne démarre pas une session que vous avez volontairement fermée ;
- il n’étend ni le graphe, ni les permissions, ni les Guardrails de la cible ;
- il ne remplace pas les critères d’acceptation et ne juge pas la correction du résultat ;
- il effectue au maximum une tentative automatique de livraison par tentative enregistrée ;
- il ne promet pas d’effet externe exactement une fois ;
- il n’accumule pas toutes les occurrences `Missed` ou `Coalesced` pour plus tard.

Si le travail exige fan-out, approbation par étapes, compensation ou orchestration transactionnelle, modélisez ces
responsabilités dans le graphe et gardez la décision humaine explicite.

## Checklist avant Resume

- le payload précise-t-il objectif, preuve et condition d’arrêt ?
- `Next occurrences` correspond-il à l’heure attendue ?
- le fuseau affiché est-il correct ?
- existe-t-il exactement une Connection de cible ?
- la session de la cible doit-elle rester active ?
- le graphe ne contient-il que le contexte et les capacités nécessaires ?
- répéter est-il sûr si un effet externe a déjà eu lieu ?
- savez-vous où consulter résultat et historique ?

## Continuer

- Consultez la [matrice des Connections](./connections.md).
- Comprenez [comment les CodingAgents voient et construisent le Canvas](./coding-agents-and-canvas.md).
- Utilisez [CodingAgents et rôles](./agents-and-roles.md) pour séparer maintenance, revue et décision.
