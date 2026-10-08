---
id: sticky-note
title: "Sticky Note : mémoire de travail partagée"
description: Utilisez une Sticky Note pour noter l'état, les constats et les points d'attention avec vos CodingAgents sans transformer chaque note en Specification.
kind: guide
lastReviewedAt: 2026-10-08
canonicalUrl: https://agentkavor.com/fr/docs/sticky-note
---

# Une Sticky Note est petite, mais elle garde le travail visible

Une Sticky Note commence comme un post-it pour les humains. Connectée à un CodingAgent, elle devient une mémoire de
travail partagée : vous et l'agent pouvez noter ce qui compte pendant le travail, sans dépendre d'une conversation
qui sera bientôt enfouie.

![Une Specification, un CodingAgent et une Sticky Note partageant des observations sur le Canvas de Kavor](https://media.agentkavor.com/demos/spec-agent-notes/poster.463994b8b377.jpg)

[Voyez l'agent travailler avec la Specification et les notes →](https://agentkavor.com/fr/videos/spec-agent-notes)

*Une note partagée garde les observations, les décisions ouvertes et les prochaines étapes visibles près du graphe.*

## Ce que fait une Sticky Note

Une Sticky Note est utile même sans agent. Écrivez une question, une hypothèse, un rappel ou une courte liste de
choses à observer. Sa valeur augmente quand son contenu fait partie du même graphe de travail.

Avec une Connection vers un CodingAgent, l'agent peut lire et mettre à jour la note avec vous. Utilisez-la pour
conserver :

- un résumé **fait / en cours / prochaine étape** ;
- une décision ouverte pendant la préparation d'une Specification ;
- un point d'attention à revoir plus tard ;
- les constats découverts pendant l'implémentation ;
- les findings d'une revue indépendante ;
- une checklist de transmission entre participants du graphe.

La note est volontairement informelle. Elle rend le travail transparent dans les deux sens : vous voyez ce que l'agent
a remarqué et l'agent dispose d'un endroit explicite pour conserver ce qui doit rester visible.

## Trois façons de l'utiliser

### 1. La mémoire de votre tour

Avant de commencer, écrivez l'objectif et les questions qui ne doivent pas disparaître. Pendant le travail, ajoutez
des faits courts, des liens ou des décisions provisoires. À la fin, laissez les prochaines étapes claires pour votre
retour dans le Workspace.

Un format simple suffit :

- **État :** fait, en cours, prochaine étape.
- **Attention :** ce qui demande votre décision ou votre inspection.
- **Preuve :** le contrôle, le fichier ou l'observation qui étaye la note.

### 2. La seconde main du CodingAgent

Connectez la Sticky Note à l'agent et demandez-lui de noter uniquement les faits utiles à votre prochaine décision :

> Garde la Sticky Note comme un résumé court du tour. Note les changements, preuves, risques et questions qui demandent ma décision. Ne transforme pas les hypothèses en décisions finales.

L'agent peut ajouter des blocs séparés ou remplacer le contenu lorsque vous demandez une réorganisation complète. Le
contenu reste éditable par l'humain et chaque changement doit respecter la dernière version de la note.

Si la note contient déjà vos observations, précisez ce que l'agent peut modifier. Une note remplie ne l'invite pas
à la réorganiser de sa propre initiative. Une consigne plus précise est :

> Maintenez cette Sticky Note pendant l'enquête. Préservez mes notes et celles du Reviewer. Ajoutez seulement vos
> découvertes vérifiées et modifiez uniquement les éléments portant votre nom. Demandez ma permission avant de
> réorganiser tout le corps.

### 3. Le pont entre implémentation et revue

Un Builder peut noter ce qui a changé et les contrôles exécutés. Un Reviewer peut ajouter les findings et les risques.
Vous pouvez suivre les deux sans rechercher l'information dans deux sessions distinctes.

Une Connection entre CodingAgents n'est pas une séquence automatique de workflow : elle rend les participants
atteignables et permet l'échange de messages.

## Exemple : une note qui vous aide à reprendre le travail

Lorsque vous enquêtez sur un échec de connexion, chaque observation n'a pas besoin de devenir une décision
d'architecture. Utilisez une note pour préserver la découverte, la preuve et la question encore ouverte :

```markdown
## Fait
- Échec reproduit après expiration de la session.
- La connexion avec une nouvelle session fonctionne toujours.

## En cours
- Comparaison de la réponse de session expirée avec son traitement côté client.

## Attention de l'humain
- Décider si le client doit renouveler la session ou demander une nouvelle connexion.
- Hypothèse : le retry répète la requête avec l'ancien identifiant d'authentification. Pas encore confirmé.

## Preuves
- Terminal Checks : commande de reproduction et réponse observée.
- File du client : endroit où le retry est lancé.

## Prochaine étape
- Confirmer l'hypothèse avant de modifier le client.
```

Demandez à l'agent :

> Ajoute les découvertes vérifiées et les questions à la note. Préserve mes observations. Lorsqu'une hypothèse est
> confirmée ou écartée, actualise son état avec les preuves. Si la décision définit le périmètre d'une correction,
> reporte-la dans la Specification correspondante et laisse ici une courte référence.

Pour une revue, un bloc séparé peut consigner **scénario, comportement observé, preuve et prochaine étape**. Cela
permet de distinguer ce que le Builder a conclu de ce que le Reviewer a vérifié.

Utilisez une mise à jour ciblée ou un nouveau bloc lorsqu'il n'y a qu'une découverte. Demandez une réorganisation
du corps lorsque la note accumule des statuts anciens ; conservez les décisions encore ouvertes et vos observations.
Le résultat doit permettre de reprendre le travail sans relire toutes les conversations.

## Partager la note ne signifie pas en prendre possession

Un chemin de Connections permet la lecture et les écritures autorisées. Il ne demande pas à tous les agents du
graphe de commencer à y rapporter automatiquement leur travail.

Sans demande de votre part, le rapport automatique se limite à une Sticky Note **directement connectée à ce
CodingAgent**, vide lorsqu'il l'a rencontrée pour la première fois. Il utilise une courte liste et signe chaque entrée :

```markdown
- [x] Builder — done: reproduced the expired-session failure.
- [ ] Builder — doing: checking the client's retry handling.
- [ ] Builder — will: verify the fix against the Specification.
```

L'agent modifie uniquement ses propres entrées aux étapes significatives du travail. Il ne doit pas terminer,
réécrire ni supprimer vos entrées ou celles d'un autre agent. Une note remplie exige une demande explicite de
maintenance ; une autre route ou la Connection d'un collègue n'autorise pas un rapport proactif.

Si vous effacez une note dans laquelle l'agent écrivait déjà, il doit la laisser vide jusqu'à votre demande de reprise.
La mémoire partagée ne doit pas vous retirer le contrôle de ce qui reste sur le Canvas.

Ce sont des consignes de collaboration, pas un blocage technique de toute édition possible. Pour empêcher les
écritures par les opérations Kavor, utilisez `sticky_note_read_only` sur la Connection directe.

## Markdown, édition et conflits

Une Sticky Note accepte le Markdown pour les titres, listes, tâches, emphase, code et autres éléments courants d'une
note de travail. Le HTML brut n'est pas accepté. Une note contient jusqu'à 64 000 points de code Unicode et propose
quatre couleurs pour regrouper visuellement le contexte ; la couleur ne change pas l'autorité du contenu.

Kavor enregistre automatiquement les changements et signale si un autre participant a modifié la note avant votre
enregistrement. Au lieu de supprimer silencieusement le changement concurrent, l'interface permet de résoudre le
conflit. Une écriture peut ajouter un nouveau bloc ou remplacer tout le corps.

## Ce qu'elle ne doit pas être

N'utilisez pas une Sticky Note comme substitut à tout :

- une décision stable, avec portée et critères d'acceptation, appartient à une [Specification](./specification.md) ;
- le code source et les autres artefacts canoniques appartiennent à un [File](./file.md) ;
- les commandes et les preuves d'exécution appartiennent au [Terminal](./terminal.md) ;
- un message coordonne les participants, mais ne doit pas être le seul enregistrement d'une décision importante.

La meilleure note est assez courte pour être lue et assez riche pour que l'étape suivante ne dépende pas de la mémoire
d'une seule session.

## Guardrail et portée

Une Sticky Note est disponible pour un CodingAgent uniquement par un chemin valide de [Connections](./connections.md).
La proximité visuelle sur le Canvas ou la mention du Node dans un message n'accorde pas d'accès.

Vous pouvez placer le Guardrail sticky_note_read_only sur la Connection directe entre l'agent et la note. L'agent peut
toujours la consulter, mais ne peut pas y ajouter ou remplacer du contenu par les opérations de Kavor. Le Guardrail
limite cette paire directe ; il ne crée pas de Connection et ne transforme pas la note en politique globale du
Workspace.

## Pour aller plus loin

- [Comprendre le modèle des Nodes](./nodes.md).
- [Choisir le plus petit ensemble de Connections](./connections.md) pour le travail.
- [Boucler votre premier cycle](./first-loop.md) avec Specification, CodingAgents, Terminal et Sticky Note.
