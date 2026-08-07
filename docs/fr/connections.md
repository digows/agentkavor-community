---
id: connections
title: Matrice des Connections prises en charge par Kavor
description: Consultez les combinaisons de Nodes prises en charge, les capacités accordées, les paramètres requis et les Guardrails disponibles.
kind: guide
lastReviewedAt: 2026-08-07
canonicalUrl: https://agentkavor.com/fr/docs/connections
---

# Matrice des Connections prises en charge par Kavor

Une Connection n'est pas une simple ligne tracée sur le Canvas. Elle déclare que deux Nodes participent au même
graphe et définit les capacités que cette combinaison ajoute au travail.

Toutes les combinaisons ne sont pas valides. Chaque paire prise en charge possède un contrat précis : certaines
Connections rendent le contexte accessible, d'autres autorisent des opérations médiées par Kavor, et deux d'entre
elles fournissent des chemins canoniques à un Terminal au moyen de variables d'environnement.

Cette page constitue la référence publique de ces contrats.

## Comment lire une Connection

Une Connection remplit trois fonctions distinctes :

1. **Existence :** elle relie les Nodes dans un même composant accessible du graphe.
2. **Paramètres :** elle enregistre une configuration obligatoire lorsque la paire en a besoin.
3. **Guardrails :** elle retranche des capacités au comportement normalement autorisé entre les deux Nodes.

Les Connections sont des relations bidirectionnelles. Kavor stocke les deux endpoints dans un ordre canonique, mais
cet ordre n'exprime ni flux, ni contrôle, ni priorité. Un message possède toujours un expéditeur et un destinataire ;
un Trigger possède toujours une cible. Ces directions appartiennent à l'opération exécutée, pas à la Connection
persistée.

## Combinaisons prises en charge

| Paire de Nodes | Ce que la Connection permet | Paramètres | Guardrail disponible | Exemple principal |
| --- | --- | --- | --- | --- |
| **CodingAgent + Specification** | Lire les métadonnées et le Markdown canonique, travailler avec le lifecycle et enregistrer des outputs durables lorsque cela est permis. | Aucun | `specification_read_only` | Spec Writer, Builder et Reviewer partageant le même contrat. |
| **CodingAgent + Sticky Note** | Lire et écrire une mémoire informelle en Markdown avec contrôle de version ; chaque écriture choisit append ou replace. | Aucun | `sticky_note_read_only` | Décisions ouvertes, progression, constats et handoffs visibles. |
| **CodingAgent + Terminal** | Lire l'output, exécuter des commandes, suivre ou interrompre une exécution corrélée et interagir avec le processus au premier plan lorsque cela est permis. | Aucun | `terminal_read_only` | Diagnostic, tests, logs ou assistance dans une session SSH supervisée. |
| **CodingAgent + File** | Rendre une source canonique du filesystem explicite dans le graphe pour la lire, la réviser ou la modifier lorsque cela est permis. | Aucun | `file_read_only` | Délimiter un module, un PDF, une image, un rapport ou une configuration. |
| **CodingAgent + CodingAgent** | Former un graphe accessible pour les messages asynchrones, les réponses, la révision indépendante et le travail parallèle. | Aucun | Aucun | Un Builder demandant une révision à un Reviewer. |
| **Specification + Terminal** | Exporter le chemin absolu canonique de la Specification vers la session du Terminal. | Nom de variable d'environnement obligatoire | Aucun | Valider, inspecter ou comparer le Markdown de la Specification. |
| **File + Terminal** | Exporter le chemin absolu canonique du File vers la session du Terminal. | Nom de variable d'environnement obligatoire | Aucun | Exécuter un script ou utiliser un fichier SQL sans recopier son chemin entre les fenêtres. |
| **Trigger + CodingAgent** | Remettre à une heure configurée un prompt à un CodingAgent dont la session est active. | Aucun | Aucun | Réveiller un Maintainer pour analyser des échecs, écrire un rapport et demander une révision. |
| **Trigger + Terminal** | Remettre à une heure configurée une commande à la session active d'un Terminal. | Aucun | Aucun | Lancer des tests, une vérification de base de données ou un script de maintenance. |

## Les Guardrails restreignent ; ils n'accordent aucun accès

Une Connection commence avec les capacités implémentées pour la paire concernée. Un Guardrail enregistre une
restriction choisie par l'utilisateur sur cette base :

| Guardrail | Connection | Effet |
| --- | --- | --- |
| `specification_read_only` | CodingAgent + Specification | Conserve la lecture et interdit les modifications du lifecycle et des outputs via Kavor. L'édition directe du Markdown devient un contrat explicite de lecture seule. |
| `sticky_note_read_only` | CodingAgent + Sticky Note | Conserve la lecture et bloque append ou replace du contenu. |
| `terminal_read_only` | CodingAgent + Terminal | Conserve l'inspection du Terminal et bloque les opérations qui modifieraient la session, le processus ou son entrée. |
| `file_read_only` | CodingAgent + File | Déclare que la source canonique ne doit pas être modifiée par l'agent. |

Les Guardrails appartiennent à la Connection directe entre le CodingAgent et la ressource. Un autre chemin dans le
graphe n'efface pas une restriction qui existe sur cette paire directe.

Les opérations médiées par Kavor sont rejetées avant de produire des effets lorsqu'un Guardrail les bloque. Les Files
et le corps des Specifications peuvent également être accessibles par les outils de filesystem du harness lui-même ;
dans ce cas, le Guardrail est un contrat visible et surveillé, pas une sandbox du système d'exploitation.

Un Guardrail ne crée pas de Connection, ne rend pas un Node accessible et n'augmente pas les permissions. Si vous
souhaitez empêcher une ressource de participer au graphe, ne créez pas la Connection.

## Connections avec variables d'environnement

Seules deux paires possèdent des paramètres persistés :

- **File + Terminal** ;
- **Specification + Terminal**.

Dans les deux cas, vous choisissez le nom d'une variable d'environnement. La valeur fournie au Terminal est le chemin
absolu canonique de la source, jamais le contenu du fichier.

Par exemple, un File connecté sous le nom `CHECK_SQL` peut être utilisé dans le shell ainsi :

```sh
sqlite3 app.db < "$CHECK_SQL"
```

Kavor applique la valeur au démarrage de la session du Terminal. Si la Connection ou son paramètre change alors que
le shell est ouvert, l'interface indique que la variable attend le redémarrage de la session. `TERM` et `COLORTERM`
sont des noms réservés qui ne peuvent pas être utilisés pour ces paramètres.

## La limite particulière d'un Trigger

Un Trigger possède au maximum une cible directe : un CodingAgent ou un Terminal. Il ne se connecte pas directement à
une Specification, un File ou une Sticky Note et ne distribue pas un même déclenchement à plusieurs cibles.

Le reste du graphe peut étendre ce que la cible est capable de faire sans élargir ses permissions. Un CodingAgent
réveillé par un Trigger peut travailler avec les Nodes déjà accessibles, sous les mêmes Guardrails et les mêmes
limites de session.

Pour que la remise ait lieu, Kavor doit être en cours d'exécution et la session de la cible doit être active. Un
Trigger ne démarre pas une session que vous avez laissée arrêtée, ne décide pas de l'objectif du travail et ne
transforme pas les effets externes en opérations exécutées exactement une fois. Chaque TriggerFiring conserve un
résultat durable à des fins d'inspection.

## Combinaisons inexistantes

Kavor rejette toute paire absente de la matrice. Cela inclut notamment :

- Trigger + Specification ;
- Trigger + File ;
- Trigger + Sticky Note ;
- Specification + File ;
- Specification + Sticky Note ;
- File + Sticky Note ;
- File + File ;
- Sticky Note + Terminal ;
- Sticky Note + Sticky Note ;
- Terminal + Terminal.

Un Node ne peut pas non plus être connecté à lui-même. Inverser les deux mêmes endpoints ne crée pas une autre
Connection, puisque la relation ne possède pas de direction persistée.

La proximité sur le Canvas, la mention dans un message ou la participation au même Workspace ne remplacent pas une
Connection. Si une combinaison n'apparaît pas sur cette page, elle n'accorde aucune capacité du seul fait d'être
visuellement proche d'une autre.

## Choisissez la plus petite Connection qui résout le travail

Avant de connecter deux Nodes, demandez-vous quelle capacité concrète manque :

- l'agent a besoin d'une intention durable ? Connectez une Specification ;
- l'humain et l'agent doivent conserver une mémoire de travail ? Connectez une Sticky Note ;
- l'agent doit exécuter ou observer un processus ? Connectez un Terminal ;
- une source canonique doit être explicite ? Connectez un File ;
- un autre point de vue améliorerait l'implémentation ou la révision ? Connectez un autre CodingAgent ;
- le temps doit-il réellement déclencher l'activité ? Ajoutez un Trigger en dernier.

Une bonne Connection rend le travail plus explicite. Si vous ne pouvez pas nommer la capacité qu'elle ajoute, le
graphe n'en a probablement pas besoin.

## Pour aller plus loin

- Lisez [le guide central des Nodes](./nodes.md) pour comprendre la responsabilité de chaque participant.
- [Bouclez votre premier cycle](./first-loop.md) avec intention, implémentation, révision et décision humaine.
- Découvrez [comment choisir les CodingAgents et leurs rôles](./agents-and-roles.md) avant d'élargir le graphe.
