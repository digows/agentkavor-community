---
id: connections
title: Matrice des Connections prises en charge par Kavor
description: Consultez les paires de Nodes qui peuvent être connectées, leur rôle structurel, leurs paramètres, Guardrails et limites.
kind: guide
lastReviewedAt: 2026-10-30
canonicalUrl: https://agentkavor.com/fr/docs/connections
---

# Matrice des Connections prises en charge par Kavor

Une Connection n'est pas une flèche de workflow. C'est une relation explicite et sans direction qui place deux Nodes
dans le même composant accessible du Canvas.

Pour un CodingAgent, le graphe entier compte : il peut travailler avec tout Node accessible par un chemin de
Connections valides, même si la ressource ne lui est pas directement connectée. La Connection directe reste
importante lorsqu'elle sélectionne la cible d'un Schedule, porte des paramètres ou maintient un Guardrail propre
à la paire CodingAgent et ressource.

Cette page est la référence publique des paires que Kavor permet de connecter directement et du contrat propre à
chacune.

## Comment lire une Connection

Quatre règles permettent de lire le graphe :

1. **Les Connections n'ont pas de direction persistée.** L'ordre des endpoints n'exprime ni flux, ni contrôle, ni priorité.
2. **L'accessibilité est transitive.** Un chemin valide entre un CodingAgent et un autre Node les place dans le même
   graphe de contexte et de capacités.
3. **Certaines règles restent directes.** Un Guardrail appartient à la Connection exacte qui le porte ; les paramètres
   Terminal appartiennent à leur paire ; un Trigger sélectionne sa cible unique par la Connection directe.
4. **Paire non prise en charge signifie « pas de Connection directe ».** Deux Nodes peuvent encore participer au même
   composant via d'autres paires prises en charge.

Un message possède toujours un expéditeur et un destinataire. Un Schedule remet toujours son contenu à une cible.
Ces directions appartiennent à l'opération exécutée, pas à la Connection dessinée sur le Canvas.

## Combinaisons prises en charge

| Paire de Nodes | Rôle de la Connection directe | Paramètres | Guardrail disponible | Exemple principal |
| --- | --- | --- | --- | --- |
| **CodingAgent + Specification** | Placer l'intention durable dans le graphe et offrir le point direct pour restreindre cet agent. | Aucun | `specification_read_only` | Spec Writer, Builder et Reviewer travaillant sur le même contrat accessible. |
| **CodingAgent + Sticky Note** | Placer la mémoire informelle dans le graphe et offrir le point direct pour restreindre cet agent. | Aucun | `sticky_note_read_only` | Décisions ouvertes, progression, constats et handoffs visibles. |
| **CodingAgent + Terminal** | Rendre le shell accessible au graphe et offrir le point direct pour restreindre cet agent. | Aucun | `terminal_read_only` | Diagnostic, tests, logs ou assistance dans une session SSH supervisée. |
| **CodingAgent + File** | Placer une source canonique du filesystem dans le graphe et offrir le point direct pour restreindre cet agent. | Aucun | `file_read_only` | Délimiter un module, un PDF, une image, un rapport ou une configuration. |
| **CodingAgent + Diagram** | Rendre la source et le résultat de rendu du diagramme accessibles au graphe. | Aucun | `diagram_read_only` | Produire une proposition visuelle et vérifier les erreurs de la source actuelle. |
| **CodingAgent + WebBrowser** | Donner à l'agent un accès médiatisé aux pages actives de ce WebBrowser. | Aucun | Aucun | Humain et agent naviguant, remplissant, vérifiant et capturant des preuves dans le même état visible. |
| **CodingAgent + CodingAgent** | Réunir les participants dans un composant. Tout CodingAgent accessible peut échanger des messages avec un autre. | Mode de livraison par défaut | Bloquer After turn, Native input ou Send now | Un Builder demandant une révision à un Reviewer. |
| **Specification + Terminal** | Exporter le chemin absolu canonique de la Specification vers la session du Terminal. | Nom de variable d'environnement obligatoire | Aucun | Valider, inspecter ou comparer le Markdown de la Specification. |
| **File + Terminal** | Exporter le chemin absolu canonique du File vers la session du Terminal. | Nom de variable d'environnement obligatoire | Aucun | Exécuter un script ou utiliser un fichier SQL sans recopier son chemin entre les fenêtres. |
| **Diagram + Terminal** | Exporter le chemin absolu canonique de la source du Diagram vers la session. | Nom de variable d'environnement obligatoire | Aucun | Utiliser la source d'un diagramme comme entrée d'un outil du projet. |
| **Trigger + CodingAgent** | Sélectionner un CodingAgent dont la session est active comme cible du prompt du Schedule. | Aucun | Aucun | Réveiller un Maintainer pour analyser des échecs, écrire un rapport et demander une révision. |
| **Trigger + Terminal** | Sélectionner une session Terminal active comme cible de la commande du Schedule. | Aucun | Aucun | Lancer des tests, une vérification de base de données ou un script de maintenance. |

Les Connections entre CodingAgent et ressource ne sont pas le seul moyen d'atteindre cette ressource. Elles sont le
moyen le plus explicite de l'intégrer au graphe de cet agent et le seul endroit où poser un Guardrail propre à
cette paire.

CodingAgent + WebBrowser possède un contrat propre : la Connection rend les pages réelles de ce Node disponibles
pour une navigation, une interaction, une attente et une capture médiatisées. Elle n'hérite pas d'un Guardrail
générique et ne contourne ni l'authentification, ni les permissions du site, ni les décisions humaines. Le profil
dédié accepte les certificats de développement invalides ; c'est un comportement explicite du navigateur, pas une
permission créée par la Connection.

## Les Guardrails restreignent ; ils n'accordent aucun accès

Le graphe est ouvert par défaut aux Nodes accessibles. Un Guardrail enregistre une restriction choisie par
l'utilisateur sur la Connection directe entre un CodingAgent et une ressource :

| Guardrail | Connection | Effet |
| --- | --- | --- |
| `specification_read_only` | CodingAgent + Specification | Conserve la lecture et interdit les modifications du lifecycle et des outputs via Kavor. L'édition directe du Markdown devient un contrat explicite de lecture seule. |
| `sticky_note_read_only` | CodingAgent + Sticky Note | Conserve la lecture et bloque append ou replace du contenu. |
| `terminal_read_only` | CodingAgent + Terminal | Conserve l'inspection du Terminal et bloque les opérations qui modifieraient la session, le processus ou son entrée. |
| `file_read_only` | CodingAgent + File | Déclare que la source canonique ne doit pas être modifiée par l'agent. |
| `diagram_read_only` | CodingAgent + Diagram | Conserve la lecture et la consultation du résultat ; interdit d'écrire dans la source et bloque le renommage ou la suppression du Node. |
| `coding_agent_message_after_turn_blocked` | CodingAgent + CodingAgent | Bloque la livraison After turn entre la paire. |
| `coding_agent_message_native_blocked` | CodingAgent + CodingAgent | Bloque la livraison Native input entre la paire. |
| `coding_agent_message_immediate_blocked` | CodingAgent + CodingAgent | Bloque Send now et le steering entre la paire. |

Les Guardrails appartiennent à la Connection directe entre le CodingAgent et la ressource. Un autre chemin dans le
graphe n'efface pas une restriction qui existe sur cette paire directe. Une restriction sur la Connection d'un
autre agent ne devient pas pour autant une politique globale de ce Node.

Les opérations médiées par Kavor sont rejetées avant de produire des effets lorsqu'un Guardrail les bloque. Les Files, Diagrams
et le corps des Specifications peuvent également être accessibles par les outils de filesystem du harness lui-même ;
dans ce cas, le Guardrail est un contrat visible et surveillé, pas une sandbox du système d'exploitation.

Un Guardrail ne crée pas de Connection, n'augmente pas les permissions et ne s'applique pas à un Node simplement
parce qu'il est proche sur le Canvas.

## Livraison entre CodingAgents

La Connection directe choisit le mode par défaut des messages qui n'en précisent pas. Sans configuration, il s'agit de **Native input**. Les agents peuvent demander un autre mode par message lorsque les Guardrails l'autorisent.

- **After turn :** attend la fin du tour et la disponibilité du destinataire.
- **Native input :** utilise l'entrée habituelle du provider, qui peut intégrer, mettre en attente, orienter ou interrompre selon ses capacités et réglages. Ce n'est pas une garantie de livraison sans interruption.
- **Send now :** demande une entrée immédiate avec interruption possible. Exige le support du provider et n'annule ni modifications, ni commandes, ni effets déjà produits.

![Connection entre CodingAgents avec After turn, Native input, Send now et Guardrails de livraison](https://media.agentkavor.com/releases/2.0.0/agent-communication/delivery/master.cda7ab810311.png)

Un Guardrail direct s'applique même si un autre chemin existe dans le graphe. Aucun mode ne contourne brouillons, approbations ou livraisons retenues par l'humain. Acceptation et livraison ne signifient pas achèvement.

## Connections avec variables d'environnement

Trois paires fournissent des chemins via des variables d'environnement :

- **File + Terminal** ;
- **Diagram + Terminal** ;
- **Specification + Terminal**.

Dans les trois cas, vous choisissez le nom d'une variable d'environnement. La valeur fournie au Terminal est le chemin
absolu canonique de la source, jamais le contenu du fichier.

Par exemple, un File connecté sous le nom `CHECK_SQL` peut être utilisé dans le shell ainsi :

```sh
sqlite3 app.db < "$CHECK_SQL"
```

Kavor applique la valeur au démarrage de la session du Terminal. Si la Connection ou son paramètre change alors que
le shell est ouvert, l'interface indique que la variable attend le redémarrage de la session. `TERM` et `COLORTERM`
sont des noms réservés qui ne peuvent pas être utilisés pour ces paramètres.

## La limite particulière d'un Trigger

Schedule est la source de Trigger disponible dans le produit. Un Trigger possède au maximum une cible directe : un
CodingAgent ou un Terminal. La Connection sélectionne cette cible ; son id n'est pas dupliqué dans la configuration.

Un CodingAgent réveillé par le Schedule peut travailler avec tous les Nodes de son composant accessible, sous les
mêmes limites et Guardrails. Le Schedule ajoute le moment et le payload, pas de nouvelles permissions.

Pour que la remise ait lieu, Kavor doit être en cours d'exécution, la machine éveillée et la session de la cible
ouverte. Au démarrage, Kavor restaure les sessions marquées pour rester ouvertes lorsqu'elles sont ciblées par des
Triggers actifs, y compris dans les autres Workspaces de l'utilisateur. Le Schedule ne démarre pas une session fermée
volontairement, ne distribue pas un déclenchement à plusieurs cibles et ne garantit pas un effet externe exactement
une fois. Retirer sa Connection de cible met le Trigger en pause et enregistre le motif.

Lisez [Schedule : donnez une horloge à votre graphe](./schedule.md) pour configurer la récurrence, utiliser `Run now`
et interpréter l'historique durable.

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
- WebBrowser + Specification ;
- WebBrowser + Sticky Note ;
- WebBrowser + Terminal ;
- WebBrowser + File ;
- WebBrowser + Trigger ;
- WebBrowser + WebBrowser ;
- Terminal + Terminal.

Un Node ne peut pas non plus être connecté à lui-même. Inverser les deux mêmes endpoints ne crée pas une autre
Connection, puisque la relation ne possède pas de direction persistée.

Ces limites n'empêchent pas les compositions utiles. Une Specification et une Sticky Note, par exemple, peuvent
participer au même graphe si des paires prises en charge les relient à des CodingAgents. Ce qui n'existe pas, c'est
une Connection directe entre elles.

La proximité sur le Canvas, la mention dans un message ou la participation au même Workspace ne remplacent pas un
chemin de Connections.

## Choisissez la plus petite Connection qui résout le travail

Avant de créer une Connection, demandez-vous ce qui manque au composant :

- l'agent a besoin d'une intention durable ? Connectez une Specification ;
- l'humain et l'agent doivent conserver une mémoire de travail ? Connectez une Sticky Note ;
- l'agent doit exécuter ou observer un processus ? Connectez un Terminal ;
- une source canonique doit être explicite ? Connectez un File ;
- une explication visuelle modifiable comme source ? Ajoutez un [Diagram](./diagrams.md) ;
- l'humain et l'agent ont besoin d'une page active ? Connectez un WebBrowser ;
- un autre point de vue améliorerait l'implémentation ou la révision ? Connectez un autre CodingAgent ;
- le temps doit-il réellement déclencher l'activité ? Ajoutez un Schedule en dernier.

Ne connectez pas par réflexe chaque CodingAgent directement à chaque ressource. Créez la plus petite topologie qui
garde tout accessible, puis ajoutez une Connection directe si elle clarifie le Canvas, porte un paramètre ou exige
son propre Guardrail.

## Copier un prompt pour revoir les Connections

Utilisez dans un CodingAgent du composant à examiner et précisez sa tâche. Cela n’autorise ni connexion à des Nodes préexistants hors du graphe ni modification des Guardrails.

```prompt
Consulte la documentation officielle des Connections et examine mon composant accessible.
Explique quelles ressources la topologie permet déjà d’atteindre et quelles paires portent des paramètres ou Guardrails directs.
Pour la tâche décrite, signale des Connections redondantes ou manquantes uniquement pour une raison concrète.
Ne modifie pas le Canvas. Présente la proposition et l’effet de chaque changement avant ma décision.
```

**Résultat attendu :** Une revue distinguant accessibilité transitive et contrats directs. Une suggestion ne crée pas d’accès, ne retire pas de Guardrail et ne transforme pas les Connections en flèches d’exécution.

## Pour aller plus loin

- Lisez [le guide central des Nodes](./nodes.md) pour comprendre la responsabilité de chaque participant.
- Approfondissez avec les guides consacrés au [CodingAgent](./coding-agent.md), à la
  [Specification](./specification.md), au [Terminal](./terminal.md), à la [Sticky Note](./sticky-note.md), au
  [File](./file.md), au [WebBrowser](./web-browser.md) et aux [Diagrams](./diagrams.md).
- [Bouclez votre premier cycle](./first-loop.md) avec intention, implémentation, révision et décision humaine.
- Découvrez [comment les CodingAgents voient et construisent le Canvas](./coding-agents-and-canvas.md).
