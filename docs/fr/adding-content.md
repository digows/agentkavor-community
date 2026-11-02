---
id: adding-content
title: Ajouter du contenu au Canvas
description: Glissez des fichiers, collez des images, liens et textes et réutilisez des groupes de Nodes sans perdre de vue leurs sources et leurs sessions.
kind: guide
lastReviewedAt: 2026-10-30
canonicalUrl: https://agentkavor.com/fr/docs/adding-content
---

# Ajouter du contenu au Canvas

Un PDF de référence, une capture du problème, un lien vers l'application et une note d'investigation peuvent
participer au même travail. Inutile de créer chaque Node à la main : glissez des fichiers du système ou collez
directement du contenu sur le Canvas.

Le résultat dépend du contenu et de l'endroit où vous le collez. Sur le Canvas, le collage crée ou retrouve des
Nodes. Dans un éditeur, un Terminal, un CodingAgent ou une page WebBrowser, il reste propre à cet environnement.

## Glisser des fichiers du système

1. Ouvrez le Workspace de destination.
2. Glissez un ou plusieurs fichiers du Finder, de l'Explorer ou d'un autre gestionnaire de fichiers sur le Canvas.
3. Déposez-les là où le groupe doit apparaître. Plusieurs fichiers sont disposés en grille et sélectionnés ensemble.
4. Vérifiez le bilan : Nodes ajoutés, sources déjà présentes et éléments ignorés.

Les fichiers **restent à leur emplacement**. Kavor ne les importe, ne les copie et ne les déplace pas. Chaque source
possède au maximum un Node par Workspace : répéter le geste sélectionne et révèle le Node existant, sans le
dupliquer ni changer sa position.

Le type dépend de la source :

- une Specification appartenant au Workspace apparaît comme Specification ;
- un fichier dans un format de diagramme apparaît comme [Diagram](./diagrams.md), à l'exception du SVG ;
- les autres apparaissent comme [File](./file.md). Un `.svg` ordinaire reste un File ; demandez explicitement un
  Diagram si vous souhaitez le traiter ainsi.

Les dossiers ne sont pas ajoutés. Si vous glissez un dossier avec des fichiers, Kavor signale l'élément ignoré et
ajoute tout de même les fichiers valides. Un fichier illisible apparaît aussi dans le bilan, avec le motif.

Déposer un fichier dans la saisie d'un Terminal ou d'un CodingAgent insère toujours son chemin dans la session ;
cela ne crée pas de Node sur le Canvas. Les panneaux Files et Specs conservent leurs propres gestes de glissement.

### Fichiers hors du Workspace

Vous pouvez référencer un fichier sans le placer dans le dossier du projet. Le Node affiche son chemin absolu et
l'indication `Outside this Workspace`. Dans le Workspace, le chemin affiché est relatif à la racine.

Les modifications d'un fichier externe actualisent son affichage en direct ; si la source est supprimée, le Node
la signale comme indisponible. Vous n'avez pas besoin d'utiliser Reload à chaque modification. Une modification
locale non enregistrée exige de traiter les conflits avant de remplacer le contenu.

Une référence externe n'intègre pas le fichier au dépôt. Si vous partagez le projet ou changez de machine, vérifiez
que cette source existera toujours au chemin attendu.

## Coller des fichiers, images, liens et textes

Avec le focus sur le Canvas, utilisez `⌘V` sur macOS ou `Ctrl+V` sur Windows/Linux. Le menu contextuel propose
aussi Paste au point où il a été ouvert. Au clavier, le collage utilise la position du pointeur dans le Canvas ou le
centre de la zone visible ; les collages répétés sont légèrement décalés.

Lorsque le presse-papiers propose plusieurs représentations, Kavor choisit la première applicable dans cet ordre :

| Contenu copié | Résultat sur le Canvas |
| --- | --- |
| Graphe de Nodes copié ou coupé dans Kavor | Colle la sélection selon les règles ci-dessous. |
| Fichiers copiés dans le gestionnaire de fichiers | Référence les fichiers, comme lors d'un glisser-déposer. |
| Données d'image, comme une capture sans fichier source | Enregistre un PNG dans le Workspace et crée son File Node. |
| Une URL seule | Crée un WebBrowser ouvert à cette adresse. |
| Texte | Crée une Sticky Note avec le texte littéral, sans l'interpréter comme du Markdown. |

Collez dans une session pour lui fournir une entrée plutôt que créer des Nodes. Pour les fichiers et images dans la
saisie d'un harness, consultez [le collage dans le Terminal](./terminal.md#coller-des-fichiers-et-images-dans-la-saisie-dune-session).

### Où une image collée est enregistrée

Les données d'image font exception à la règle de simple référence : elles n'ont pas encore de fichier utilisable par
le Canvas. Kavor enregistre un PNG dans le dossier `assets/` de la **première Documentation root**. Avec la racine
par défaut `docs/`, par exemple :

```text
docs/assets/pasted-image-20261030-093000.png
```

Le nom utilise la date et l'heure ; s'il existe déjà, un suffixe numérique est ajouté. Aucun fichier existant n'est
écrasé. Le retour affiche le chemin réellement enregistré seulement une fois le fichier et le Node créés.

La limite des données d'image dans le presse-papiers est de **20 MB**. Un échec d'enregistrement est signalé comme un
échec de l'image, sans la transformer silencieusement en Sticky Note. Cette limite ne remplace pas les limites
d'affichage ci-dessous.

## Copier, couper et coller des Nodes

Utilisez cette fonction pour réutiliser une boucle qui fonctionne déjà, par exemple Specification, Builder, Reviewer
et Sticky Note.

1. Sélectionnez les Nodes à transférer ensemble, avec le focus hors des éditeurs et des sessions.
2. Utilisez `⌘C` / `Ctrl+C` pour copier ou `⌘X` / `Ctrl+X` pour couper. Le menu contextuel propose les mêmes actions.
3. Restez sur le même Canvas ou ouvrez le Workspace de destination, y compris dans une autre fenêtre Kavor.
4. Placez le pointeur et collez. Vérifiez les participants et les Connections avant de reprendre le travail.

Seules les Connections dont **les deux endpoints sont sélectionnés** font partie de la capture. Une Connection
isolée n'emporte pas ses Nodes, et les liens vers des participants hors de la sélection ne sont pas copiés.

Copier crée de nouvelles identités et conserve la disposition relative. Une même copie peut être collée plusieurs
fois. Couper sur le même Canvas ne fait que déplacer le groupe en conservant ses identités et ses sessions. Entre
Workspaces, cela déplace les Nodes et leurs Connections internes et retire les Connections de frontière à la source ;
la coupe est consommée après réussite. Avant le collage, `Esc` sur le Canvas source annule la coupe.

### Ce qui accompagne chaque Node

| Node | Ce qui est conservé — et ce qui n'est pas cloné |
| --- | --- |
| Sticky Note | Contenu et couleur. |
| File et Diagram | Référence à la même source, pas une copie des octets. Un Node déjà présent pour cette source est réutilisé. |
| Specification | Réutilisée dans son Workspace propriétaire ; dans un autre Workspace, elle apparaît comme File. Son lifecycle reste chez le propriétaire d'origine. |
| Terminal | Configuration du shell et intention d'ouverture, pas le buffer ni l'historique. Un déplacement entre Workspaces ferme la session source. |
| CodingAgent | Configuration du provider, du modèle et des préférences, pas la conversation, les messages ni le worktree isolé. Un déplacement ferme la session source ; vérifiez la racine et la configuration à destination. |
| Trigger | Une copie est créée en pause, sans historique de déclenchements. Une coupe conserve la configuration, mais ne peut pas déplacer un déclenchement encore inachevé. |
| WebBrowser | Onglets, pas les popups, téléchargements ni observations. Les pages sont recréées à destination. |

Les Guardrails et paramètres des Connections accompagnent le groupe selon les règles de chaque paire. Lorsqu'une
Specification devient un File dans un autre Workspace, sa restriction de lecture devient `file_read_only` ; un
Diagram conserve `diagram_read_only`. Vérifiez les restrictions à destination avant de commencer une nouvelle tâche.

Le presse-papiers de graphes appartient à l'exécution actuelle de Kavor. Le remplacer par une autre copie ou
redémarrer l'application invalide la capture ; cela ne supprime jamais la source d'une coupe en attente. Ce n'est ni
une sauvegarde ni un format d'export entre machines.

Une capture accepte au maximum **512 Nodes, 2 048 Connections et 16 MiB**. Si la sélection coupée change avant le
collage ou qu'une source n'existe plus, l'opération est refusée sans collage partiel. Vérifiez la source et effectuez
une nouvelle capture.

## Comprendre l'aperçu d'un fichier

Le Node représente toujours la source réelle, même si elle ne dispose pas d'un aperçu enrichi :

- **Texte UTF-8 :** éditeur, aperçu lorsqu'il est disponible, enregistrement et gestion des conflits.
- **Images :** PNG, JPEG, GIF, WebP, BMP, ICO, AVIF et SVG. Un SVG dans un File est affiché comme image, pas comme du
  balisage de l'interface de l'application.
- **PDF :** pages consultables sur le Canvas, sans éditeur de formulaires ou d'annotations et sans exécuter le
  JavaScript du PDF.
- **Diagrammes :** affichage et édition spécifiques dans le [guide Diagram](./diagrams.md).
- **Autres formats :** carte avec icône ou miniature disponible sur le système, nom, type, taille, date de
  modification et chemin. L'audio et la vidéo apparaissent dans cette carte ; il n'y a pas de lecture intégrée.

Les images et PDF sont limités à **32 MiB par fichier** ; les images sont aussi limitées à **16 mégapixels**. Un format
non pris en charge, une limite dépassée ou un échec d'aperçu ne font pas passer une source existante pour un fichier
absent : la carte explique la situation et conserve les actions disponibles. `Retry` apparaît lorsqu'une nouvelle
tentative peut aider, pas pour lever une limite de taille ou de format.

Utilisez **Open** pour ouvrir dans l'application par défaut, **Reveal in Finder** ou l'équivalent du système pour
localiser la source, et **Copy path** pour copier son chemin. Les miniatures dépendent du système : macOS et Windows
peuvent en fournir ; en leur absence, l'icône permet toujours d'identifier le fichier.

## Annuler sans confondre Nodes et fichiers

Chaque ajout de contenu ou collage de graphe crée une entrée dans l'historique du Canvas. Undo retire les Nodes
créés par cette opération, sans supprimer une source simplement référencée ni un Node préexistant. Redo restaure le
résultat.

Une image enregistrée par Kavor lors du collage de données est différente : Undo retire aussi ce PNG, et Redo le
restaure. Si vous modifiez l'image ou créez ensuite une référence conflictuelle, Kavor peut refuser l'annulation
plutôt que supprimer un travail ultérieur. Vérifiez le motif ; Undo n'est pas une suppression inconditionnelle de
fichiers.

Pour une coupe entre Workspaces, Undo doit restaurer les deux côtés. Un changement ultérieur incompatible peut
aussi empêcher l'opération, sans restaurer seulement la moitié du graphe.

## Utiliser le contenu avec un CodingAgent

Glisser-déposer, collage et presse-papiers de graphes sont des gestes humains. Un CodingAgent ajoute des sources par
chemin ; il ne manipule pas votre presse-papiers. Après avoir ajouté le contenu, connectez uniquement ce qui doit
participer au travail.

Pour une première lecture, indiquez au CodingAgent les Nodes que vous venez d'ajouter et rendez-les accessibles.
N'incluez pas d'identifiants secrets et n'autorisez pas implicitement des modifications.

```prompt
Examine les Nodes que j'ai identifiés dans mon graphe accessible.
Distingue source canonique, référence visuelle, page active et note de travail.
Explique comment ce contenu aide pour la tâche décrite et indique ce que tu n'as pas pu lire.
Ne modifie pas de fichiers, n'exécute pas de commandes et ne crée pas de Connections ; présente d'abord ta lecture.
```

**Résultat attendu :** une carte succincte du contenu réellement consulté, avec les lacunes explicites. L'aperçu ne
garantit pas que le harness sache interpréter tous les formats, et ajouter un Node n'autorise pas l'accès à du
contenu hors du graphe.

## Pour aller plus loin

- Utilisez [File comme contexte et portée](./file.md), sans transformer une référence en copie jetable.
- Créez et révisez des [Diagrams](./diagrams.md) avec un CodingAgent.
- Consultez la [matrice des Connections](./connections.md) avant de connecter des ressources.
- Découvrez [ce que les agents voient sur le Canvas](./coding-agents-and-canvas.md).
