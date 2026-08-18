---
id: agents-and-roles
title: Choisir ses CodingAgents et définir leurs rôles dans Kavor
description: Apprenez à répartir le travail entre CodingAgents, à préserver un contexte partagé et à choisir provider, modèle et effort pour chaque responsabilité.
kind: guide
lastReviewedAt: 2026-08-06
canonicalUrl: https://agentkavor.com/fr/docs/agents-and-roles
---

# Choisir ses CodingAgents et définir leurs rôles dans Kavor

Le choix d’un CodingAgent ne commence pas par le provider. Il commence par la responsabilité que l’agent doit assumer.

Une seule session peut analyser le problème, rédiger la Specification, implémenter, réviser et préparer la livraison.
Cela paraît plus simple parce qu’il y a moins de participants, mais des objectifs différents se retrouvent concentrés
dans la même fenêtre de contexte. L’implémentation transporte toute l’exploration antérieure, la revue hérite des
hypothèses de l’auteur et la préparation de la livraison rivalise avec des décisions qui devraient déjà être
conservées hors de la session.

Kavor permet de répartir ces responsabilités entre plusieurs CodingAgents sans transformer le travail en chats
isolés. Les participants forment un graphe autour de ressources durables, telles que Specifications, Files et Sticky
Notes. Les Connections rendent le contexte et les capacités visibles, les messages permettent les handoffs et les
discussions, et la décision finale reste entre vos mains.

[![Spec Writer, Builder, Reviewer et Shipper connectés sur un Canvas Kavor](https://media.agentkavor.com/editorial/agents-and-roles/graph.6c35b0b2fdc5.jpg)](https://agentkavor.com/fr/videos/agents-and-roles)

[Voir quatre rôles former un graphe de travail →](https://agentkavor.com/fr/videos/agents-and-roles)

## Commencez par le travail, pas par l’agent

Avant d’ajouter un CodingAgent au Canvas, écrivez en une phrase pourquoi il existe. Une bonne définition contient :

- une responsabilité principale ;
- le contexte nécessaire pour l’assumer ;
- le résultat qu’il doit produire ;
- la condition à laquelle il doit s’arrêter.

« Réviser le code » reste trop large. « Comparer l’implémentation aux critères de la Specification, consigner les
findings et s’arrêter avant de modifier le code » définit un rôle vérifiable.

Le même provider peut occuper des rôles différents dans des sessions distinctes. Des providers différents peuvent
également remplir le même rôle. Le rôle appartient au travail ; provider, modèle et effort sont des réglages choisis
pour l’exécuter.

## Quatre rôles utiles

Toutes les tâches n’ont pas besoin des quatre rôles ci-dessous. Ce sont des frontières pour raisonner sur le travail,
pas un quota d’agents.

| Rôle | Question principale | Contexte essentiel | Résultat attendu |
| --- | --- | --- | --- |
| **Analyste ou Spec Writer** | Que faut-il changer et quelles limites doivent rester en place ? | Problème, contraintes, décisions et comportement existant | Une Specification claire, avec un périmètre et des critères vérifiables |
| **Implementer** | Comment produire la modification dans le cadre du contrat ? | Specification, Files pertinents, Terminal et conventions du Workspace | Une implémentation accompagnée de vérifications et de preuves |
| **Reviewer** | Qu’est-ce qui est incorrect, incomplet ou risqué ? | Specification, modifications et résultats des vérifications | Des findings concrets ou une revue sans blocage identifié |
| **Shipper** | Le travail peut-il être livré en toute sécurité ? | Specification, revue, état Git et exigences de release | Préparation de la livraison, risques restants et preuves pour la décision humaine |

Pour une petite correction, un Implementer et une revue humaine peuvent suffire. Pour une modification plus risquée,
séparer Specification, implémentation, revue et livraison réduit le risque qu’une seule ligne de raisonnement contrôle
tout le cycle.

Séparer les rôles n’impose pas des providers différents. Deux sessions du même provider isolent déjà leurs objectifs
et leurs contextes. Combiner des providers peut apporter une autre perspective et réduire des angles morts corrélés,
mais ne remplace pas les critères d’acceptation et ne garantit pas une meilleure revue.

## Le graphe est la mémoire partagée

Répartir le travail ne devrait pas obliger à copier le même prompt dans plusieurs sessions. Dans Kavor, le contexte
commun réside dans des Nodes durables :

- la **Specification** conserve l’intention, le périmètre et les critères ;
- les **Files** gardent les sources utiles dans le flux ;
- la **Sticky Note** consigne observations et décisions de travail ;
- le **Terminal** fournit l’environnement d’exécution des commandes et vérifications ;
- les **CodingAgents** assument des responsabilités distinctes autour de ces ressources.

Cette mémoire partagée n’est pas un historique de conversation unique qui grandit indéfiniment. C’est un ensemble
explicite de ressources que les participants peuvent consulter et mettre à jour selon les autorisations des
Connections et Guardrails. Lorsqu’une session se termine, la Specification, les Files, les notes et les preuves
restent dans le Workspace.

Un graphe d’implémentation, de revue et de livraison peut être représenté ainsi :

~~~text
Specification
    ├── Spec Writer
    ├── Implementer ↔ Reviewer
    └── Shipper

Contexte durable : Files · Sticky Note · Terminal · outputs de la Specification
~~~

Cette représentation montre la répartition des responsabilités, pas la direction des Connections. Les Connections
n’exécutent pas automatiquement une séquence ; elles rendent les relations, le contexte et les capacités inspectables
sur le Canvas.

## Répartissez aussi la fenêtre de contexte

Chaque rôle a besoin d’une partie différente du problème. Le Spec Writer peut devoir explorer des options et des
contraintes. L’Implementer a besoin du contrat accepté, des fichiers pertinents et des conventions du code. Le
Reviewer a besoin des critères, du diff et des preuves, pas de toute la conversation qui a conduit l’Implementer à la
solution.

Cette séparation améliore le rapport entre contexte utile et contexte total :

- chaque CodingAgent reçoit un objectif plus étroit ;
- les ressources communes restent dans le Workspace au lieu d’être répétées dans les prompts ;
- les détails sont consultés lorsqu’ils sont nécessaires ;
- la revue part du contrat et du résultat, pas de la justification accumulée par l’auteur ;
- une longue session cesse de transporter les étapes déjà terminées.

Une baisse de l’usage des tokens peut être un bénéfice, pas une promesse. Un graphe bien réparti évite le contexte
répété ou inutile ; un graphe avec trop d’agents, des messages redondants et des rôles vagues peut consommer davantage.
L’objectif n’est pas de maximiser le nombre de CodingAgents, mais de donner à chaque token une responsabilité plus
claire.

## Choisissez provider, modèle et effort après le rôle

Une fois la responsabilité définie, configurez la session selon la tâche. Utilisez les contrôles natifs du provider
pour choisir le modèle et l’effort lorsqu’ils sont disponibles.

Évaluez quatre facteurs :

1. **Ambiguïté :** la tâche doit-elle découvrir le problème ou exécuter un contrat clair ?
2. **Risque :** une erreur serait-elle locale et réversible, ou affecterait-elle sécurité, données, architecture ou
   release ?
3. **Usage des outils :** le rôle doit-il explorer le code et exécuter des commandes, ou surtout analyser des preuves ?
4. **Coût de coordination :** une session plus puissante peut-elle remplir le rôle avec moins de handoffs, ou une
   seconde perspective est-elle nécessaire ?

Un effort plus élevé est souvent pertinent pour les Specifications ambiguës, les décisions d’architecture et les
revues à haut risque. Les tâches mécaniques et bien délimitées peuvent utiliser des modèles plus rapides ou un effort
moindre. L’implémentation dépend de la taille du changement et du besoin de parcourir et tester le code.

Ne transformez pas ces indications en affectations permanentes. « Le provider A implémente toujours » et « le
provider B révise toujours » remplacent une décision d’ingénierie par une habitude. Réévaluez les réglages pour chaque
rôle et tirez des enseignements de la qualité des preuves produites.

## Utilisez les conversations pour les handoffs et le travail parallèle

Les CodingAgents d’un même flux n’ont pas à travailler en silence. Utilisez les messages Kavor lorsqu’un agent doit :

- transmettre une implémentation pour revue ;
- demander une précision à l’auteur de la Specification ;
- discuter d’un finding avant de le consigner comme blocage ;
- renvoyer une correction pour une nouvelle vérification ;
- coordonner des investigations indépendantes qui peuvent avancer en parallèle.

Un bon message indique :

- l’objectif du handoff ;
- les ressources du graphe qui contiennent le contexte ;
- ce qui a déjà été réalisé et vérifié ;
- l’action attendue du destinataire ;
- l’endroit où le résultat doit être conservé.

Les conversations sont asynchrones et inspectables. Elles ne remplacent pas la mémoire durable. Une décision qui doit
survivre au handoff doit retourner dans la Specification, une Sticky Note ou un autre output approprié ; elle ne doit
pas rester cachée uniquement dans les messages.

Ne parallélisez que les travaux qui peuvent avancer sans se disputer la même décision ni modifier la même surface.
Deux agents peuvent explorer des hypothèses différentes ou revoir des aspects indépendants. Deux Implementers qui
modifient les mêmes fichiers sans répartition explicite créent généralement plus de réconciliation que de vitesse.

## Ce qu’il faut éviter

### Concentrer tout le cycle dans une session

Analyse, Specification, implémentation, revue et release posent des questions différentes et utilisent des critères
différents. Réutiliser une session pour tout préserve aussi ses hypothèses, ses distractions et ses angles morts.

### Créer un agent pour chaque sous-tâche

Une séparation sans responsabilité indépendante ajoute des messages, du contexte dupliqué et un coût de coordination.
Si vous ne pouvez pas décrire un résultat et une condition d’arrêt distincts, vous n’avez probablement pas besoin d’un
autre CodingAgent.

### Réutiliser les mêmes réglages par commodité

Un modèle ou un effort insuffisants dégradent les tâches ambiguës ou critiques. Des réglages excessifs gaspillent du
temps et des tokens sur du travail mécanique. Choisissez la configuration selon le risque et la nature du rôle.

### Demander à l’Implementer de réviser son propre raisonnement

L’auto-revue peut détecter des erreurs simples, mais elle ne crée pas d’indépendance. Lorsqu’une seconde perspective
compte, utilisez une autre session avec des critères explicites et un accès aux résultats vérifiables.

### Garder les agents isolés

Copier manuellement des messages entre les sessions fragmente la provenance et masque le handoff. Utilisez les
conversations Kavor pour les revues, les précisions et la coordination du travail parallèle.

### Laisser les décisions uniquement dans les messages

Les messages coordonnent les participants. Specifications, Sticky Notes et outputs conservent ce que le Workspace
doit retenir.

## Trois configurations pour commencer

### Petite modification

Utilisez une Specification, un Implementer et un Reviewer. Connectez les deux agents au contexte nécessaire et
conservez l’implémentation et la revue dans une Sticky Note ou dans les outputs de la Specification. C’est la plus
petite configuration utile ; la vidéo de cette page montre comment la même logique s’étend jusqu’au Shipper sans
perdre le contexte.

### Modification à haut risque

Séparez Spec Writer, Implementer, Reviewer et Shipper. Donnez au Reviewer des critères explicites et l’indépendance
nécessaire pour contester l’implémentation. Le Shipper prépare les preuves de livraison, mais ne remplace pas votre
décision de publier.

### Investigation parallèle

Utilisez deux CodingAgents pour explorer des hypothèses ou des zones différentes, avec un troisième rôle chargé de
réconcilier les résultats. Définissez à l’avance où chaque découverte sera consignée et utilisez les messages pour les
questions et handoffs.

## Checklist avant de commencer

Pour chaque CodingAgent, vérifiez :

- puis-je décrire son rôle en une phrase ?
- a-t-il un résultat observable et une condition d’arrêt ?
- le graphe ne fournit-il que le contexte et les capacités nécessaires ?
- provider, modèle et effort correspondent-ils à l’ambiguïté et au risque ?
- sait-on clairement avec qui il doit parler et pourquoi ?
- les décisions et preuves seront-elles conservées hors de la conversation ?
- l’ajout de ce CodingAgent améliore-t-il suffisamment indépendance, parallélisme ou qualité pour justifier la
  coordination ?

Un bon Canvas n’est pas celui qui contient le plus d’agents. C’est celui qui rend responsabilités, contexte, handoffs,
preuves et décisions clairs pour tous les participants, vous compris.

Lisez le guide consacré au [CodingAgent](./coding-agent.md), construisez cette structure dans
[Boucler votre premier cycle avec Kavor](./first-loop.md) ou révisez les concepts dans
[Qu’est-ce que Kavor ?](./what-is-kavor.md).
