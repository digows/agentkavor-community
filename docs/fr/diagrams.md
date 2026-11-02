---
id: diagrams
title: "Diagram dans Kavor : de l'idée au dessin, sans quitter le graphe"
description: Créez des Diagrams avec les CodingAgents, modifiez la source ou un dessin Excalidraw et vérifiez le résultat sur le Canvas, avec des exemples par format.
kind: guide
lastReviewedAt: 2026-11-02
canonicalUrl: https://agentkavor.com/fr/docs/diagrams
---

# Diagram : rendez vos explications visibles

Une architecture, une machine à états ou un modèle de données se discute plus facilement quand l'humain et l'agent
regardent le même dessin. Un **Diagram** conserve la source de ce dessin dans un fichier et l'affiche sur le Canvas.
Vous pouvez demander une proposition, modifier la source, voir le résultat et revoir la décision sans changer de
contexte.

Le dessin ne remplace pas la Specification : il peut révéler une ambiguïté, expliquer une décision ou donner forme à
une alternative. Le contrat reste à sa place.

[![Un Diagram Mermaid connecté à un CodingAgent sur le Canvas, avec une Sticky Note contenant le contexte de la démonstration.](https://media.agentkavor.com/editorial/diagrams/overview/image.ffa637039fea.jpg)](https://media.agentkavor.com/editorial/diagrams/overview/native.e719329c8ac6.png)

Le dessin participe au même graphe de travail que le CodingAgent et la Sticky Note. Sa source reste dans un fichier.

## Créer ou ajouter un Diagram

### Depuis l'interface

1. Cliquez sur **Diagram** dans la barre d'outils du Canvas ou ouvrez le panneau **Diagrams**, juste après **Specs**,
   puis utilisez **New diagram**.
2. Choisissez le format et indiquez un nom. Mermaid est le format par défaut.
3. Vérifiez le chemin et l'extension affichés avant de créer. `Enter` confirme ; `Escape` annule.
4. Écrivez dans **Source** ou commencez à dessiner, dans le cas d'Excalidraw.

Vous pouvez aussi glisser **Diagram** depuis la barre d'outils jusqu'à l'endroit voulu sur le Canvas. Le formulaire
s'ouvre dans le panneau et conserve cette position jusqu'à confirmation ; un clic dans la barre d'outils utilise la
zone visible pour la création.

Le formulaire n'a pas de champ de dossier distinct. Depuis la barre d'outils ou l'action générale **New diagram**, il
utilise la destination configurée dans le Workspace. Depuis le menu **New Diagram…** d'un dossier, il utilise ce
dossier. Vérifiez le chemin affiché avant de confirmer. Les collisions de noms et les erreurs restent dans le
formulaire, sans écraser de fichier. draw.io ne figure pas parmi les formats de création, car son éditeur est externe.

[![Panneau Diagrams avec le formulaire New diagram ouvert et la liste des formats disponibles pour la création.](https://media.agentkavor.com/editorial/diagrams/panel-create/image.5cafbedbecc9.jpg)](https://media.agentkavor.com/editorial/diagrams/panel-create/native.fcf3ecd7562d.png)

Choisissez un format à créer depuis le panneau. draw.io s'ouvre à partir d'un fichier existant et n'apparaît donc pas
dans cette liste de création.

### Choisir le dossier des nouveaux Diagrams

Ouvrez **Workspace Settings → Documentation roots**. Les Specifications et les Diagrams partagent ces racines ; il
n'existe pas de liste de racines distincte pour les Diagrams.

Le champ **Diagrams folder** est relatif à la **première Documentation root**. La valeur par défaut est `diagrams` :
avec la racine `docs`, le résultat est `docs/diagrams/`. Vous pouvez indiquer un dossier imbriqué, comme
`architecture/diagrams`, et vérifier la destination calculée avant d'enregistrer. Utilisez `.` pour créer directement
dans la première racine, sans sous-dossier.

Modifier ce champ ou réordonner les roots ne change que la destination des prochaines créations. Les fichiers et
Nodes existants ne sont pas déplacés. Le panneau découvre les Diagrams dans les Documentation roots ; un fichier
hors de ces racines peut toujours être ouvert sur le Canvas par son chemin explicite. La configuration de découverte
n'accorde pas de nouvelle permission sur le filesystem.

### Depuis un fichier existant

Utilisez **Add to Canvas** dans le panneau Diagrams ou [glissez un fichier sur le Canvas](./adding-content.md).
L'extension sélectionne le format, y compris les extensions composées comme `.vl.json`. La source reste à son
emplacement ; les modifications sur disque actualisent le Node.

**Le SVG est un choix explicite :** ouvrir ou glisser un `.svg` crée normalement un File, pas un Diagram. Si vous
demandez à un CodingAgent de l'ajouter, précisez que vous voulez un Diagram. Si le même fichier est déjà représenté
par un File, cette opération convertit le Node en conservant son identité, sa position, sa taille et ses Connections,
sans modifier le fichier.

Chaque source possède au maximum un Node par Workspace. Renommer un Diagram renomme sa source ; retirer le Node ne
supprime pas le fichier.

## Travailler avec un CodingAgent

Décrivez ce que vous voulez communiquer, pas seulement le format. « Montre la décision et les chemins d'échec de ce
flux » donne plus de contexte que « fais un beau diagramme ». Utilisez de petits exemples et vérifiez que le dessin
correspond au système.

Les prompts ci-dessous sont des points de départ avec des données fictives. Collez-les dans le CodingAgent
responsable et adaptez les noms et chemins avant l'envoi. Pour créer le Node, il lui faut `Allow workspace editing` ;
les ressources existantes doivent être accessibles et leurs Guardrails restent applicables. Sans autorisation
structurelle, demandez uniquement la source ou des conseils.

Si vous ne donnez pas de chemin, le CodingAgent consulte les **Documentation roots** et le **Diagrams folder** du
Workspace et utilise la même destination que l'interface — `docs/diagrams/` dans la configuration par défaut. Un
chemin explicite dans le prompt prévaut. Les exemples utilisent des chemins explicites dans `docs/diagrams/` ;
adaptez-les pour conserver les fichiers dans une autre racine configurée et les retrouver dans le panneau.

### Vérifier le dessin, pas seulement la syntaxe

Un CodingAgent peut écrire la source, ajouter son Diagram au Canvas et consulter le résultat du rendu actuel :
`rendered`, `failed` ou `not_rendered`. En cas d'échec, il reçoit l'erreur du moteur et la ligne lorsqu'elle est
disponible.

Une source apparemment valide ne prouve pas qu'elle a été rendue. `not_rendered` signifie qu'il n'existe pas
d'observation valide pour le fichier actuel sur disque ; ouvrez ou révélez le Diagram pour qu'il soit affiché.
Les résultats d'une autre révision du fichier, les aperçus non enregistrés et les observations antérieures à un
redémarrage ne comptent pas comme une réussite du rendu actuel.

Si le Diagram est accessible avec `diagram_read_only` sur la Connection directe, l'agent doit préserver sa source
et ne peut ni renommer ni supprimer le Node. N'utilisez ni le prompt ni les outils du filesystem pour contourner
cette restriction.

### De la demande au dessin sur le Canvas

[Voyez un CodingAgent créer un diagramme d'entités CRM sur le Canvas](https://agentkavor.com/fr/videos/creating-diagram).

La démonstration commence avec un CodingAgent et une Sticky Note de contexte. L'utilisateur demande un diagramme
simple d'entités CRM ; l'agent utilise Excalidraw, écrit la source et ajoute sur le Canvas un Diagram connecté à lui.
Comme dans les exemples ci-dessous, la création du Node dépend de l'autorisation d'édition du Workspace.

Le résultat réunit **Account**, **Contact**, **Lead**, **Opportunity** et **Activity**, avec des champs et des relations
fictifs. Vérifiez le dessin avant d'en faire un modèle pour votre projet : il illustre une proposition, pas une
analyse de votre schéma réel. La démonstration suit la création jusqu'au résultat visuel ; l'édition, l'export et
l'organisation des dossiers ont leurs propres procédures dans ce guide.

L'enregistrement est silencieux et en anglais. Les séquences de saisie et d'attente ont été accélérées ; le résultat
final apparaît à vitesse normale. Le texte ci-dessus permet de suivre la démonstration sans dépendre de la vidéo.

## Choisir le format selon ce qu'il faut expliquer

Tous les exemples demandent une source et une vérification sur le Canvas, pas l'exécution du code de votre
application. Le téléchargement initial des ressources nécessaires peut exiger une connexion réseau ; consultez
[les téléchargements et le mode hors ligne](#téléchargements-confidentialité-et-mode-hors-ligne).

[![Des Diagram Nodes affichant des exemples D2, WaveDrom, draw.io, Mermaid et PlantUML sur le même Canvas.](https://media.agentkavor.com/editorial/diagrams/formats/image.a4d2d23386fa.jpg)](https://media.agentkavor.com/editorial/diagrams/formats/native.6ceae5434ad2.png)

Différents formats peuvent cohabiter sur le Canvas. Ces exemples sont illustratifs ; les formats et leurs limites
sont détaillés ci-dessous.

### Mermaid — `.mmd`, `.mermaid`

Un bon point de départ pour les flux, séquences et états. Il utilise les types disponibles dans le moteur intégré à
Kavor ; ne supposez pas qu'une syntaxe récemment ajoutée à Mermaid y soit déjà disponible. Collez dans le CodingAgent
pour créer un petit flux fictif.

```prompt
Crée docs/diagrams/checkout.mmd en Mermaid : panier → paiement → confirmation, avec un chemin de paiement refusé.
Ajoute-le comme Diagram à mon graphe et vérifie le résultat du rendu actuel.
Corrige les erreurs signalées ; ne modifie pas l'application et n'annonce pas de réussite sans observer le résultat.
```

**Résultat attendu :** un flux avec un chemin d'échec lisible et un résultat de rendu rapporté. Sans observation
valide, l'agent indique `not_rendered`, pas une réussite présumée.

### PlantUML — `.puml`, `.plantuml`

Pour UML, les séquences, Gantt, les cartes mentales et les wireframes. Le moteur JavaScript n'exige pas d'installer
Java. Les bibliothèques standard, dont C4, sont obtenues à la demande ; le premier usage de C4 peut nécessiter un
téléchargement supplémentaire. Collez dans le CodingAgent.

```prompt
Crée docs/diagrams/checkout-context.puml avec la bibliothèque C4 : client, boutique et prestataire de paiement externe.
Identifie les relations, ajoute le fichier comme Diagram et consulte le résultat actuel.
S'il manque une bibliothèque ou qu'une erreur survient, signale le motif avant d'affirmer que le dessin est prêt.
```

**Résultat attendu :** un contexte C4 simple, avec une dépendance externe explicite. L'absence de réseau ou de
bibliothèque ne doit pas être confondue avec une validation du dessin.

### Graphviz — `.dot`, `.gv`

Pour les graphes où la disposition des sommets aide à comprendre les dépendances. Les layouts sont ceux du moteur
intégré. Collez dans le CodingAgent ; dans cet exemple, les dépendances sont fictives, pas déduites de votre dépôt.

```prompt
Crée docs/diagrams/dependencies.dot : web dépend de api ; api dépend de billing et catalog ; tous deux dépendent de storage.
Dispose le graphe de gauche à droite, ajoute-le comme Diagram et vérifie le rendu actuel.
N'invente pas de dépendances du projet réel ; il s'agit seulement de l'exemple décrit.
```

**Résultat attendu :** un graphe de dépendances légendé, sans transformer une illustration en diagnostic du projet.

### D2 — `.d2`

Pour l'architecture et les relations entre composants. Kavor propose les layouts **Dagre et ELK** ; **TALA n'est pas
pris en charge**. Collez dans le CodingAgent et précisez le layout lorsque ce choix importe.

```prompt
Crée docs/diagrams/order-service.d2 avec le layout Dagre : client, API, file d'attente et worker, montrant le parcours d'une commande.
Ajoute-le comme Diagram et vérifie le rendu actuel. Utilise uniquement des fonctions compatibles avec Dagre ou ELK, sans TALA.
Signale toute erreur et ne modifie pas l'infrastructure réelle.
```

**Résultat attendu :** un dessin d'architecture lisible, sans dépendre de TALA ni créer les services illustrés.

### SVG — `.svg`

Pour les dessins vectoriels dont vous voulez contrôler directement les formes, les libellés et la composition.
Le rendu est intégré. Collez dans le CodingAgent et demandez explicitement un **Diagram**, en préservant la distinction
avec un File ordinaire.

```prompt
Crée docs/diagrams/review-cycle.svg : trois boîtes, Builder, Reviewer et décision humaine, reliées dans cet ordre.
Utilise un SVG autonome, sans scripts ni ressources distantes, et ajoute-le explicitement comme Diagram, pas comme File.
Vérifie le rendu actuel et rapporte le résultat sans modifier d'autres Nodes.
```

**Résultat attendu :** un dessin vectoriel présenté comme Diagram. L'extension `.svg` seule ne change pas le type
d'un File.

### Excalidraw — `.excalidraw`

Pour un dessin exploratoire que vous souhaitez continuer à manipuler visuellement. Le fichier contient la scène
Excalidraw ; c'est le format doté d'un éditeur visuel dans Kavor. Collez dans le CodingAgent pour préparer une scène
simple.

```prompt
Crée docs/diagrams/review-workshop.excalidraw avec une scène valide : idée, implémentation et revue, avec flèches et libellés.
Ajoute-la comme Diagram et vérifie le rendu. Garde le dessin simple pour que je puisse continuer avec Edit drawing.
Ne remplace aucun fichier existant et n'affirme pas que ma revue a été effectuée.
```

**Résultat attendu :** une scène que vous pouvez ouvrir dans `Edit drawing`. Générer une scène ne garantit pas la
qualité du flux représenté ; examinez-la avant de l'utiliser pour prendre une décision.

### draw.io — `.drawio`

Pour visualiser les diagrammes de ce format, y compris les pages et les calques. **View only** : pas d'éditeur visuel
ni de modification du XML dans Source de Kavor. Produisez ou modifiez le fichier avec un outil externe, y compris le
CodingAgent via le filesystem lorsqu'il y est autorisé. Collez dans l'agent pour générer un nouvel exemple, pas
écraser un de vos documents.

```prompt
Crée docs/diagrams/order-overview.drawio comme fichier draw.io valide avec une page : client → API → base de données.
Ajoute le fichier existant comme Diagram et vérifie le rendu actuel.
N'utilise pas New diagram pour draw.io et ne promets pas d'édition visuelle dans Kavor.
```

**Résultat attendu :** une page consultable dans le Node. Pour modifier ensuite le dessin, utilisez l'application
externe ou une modification autorisée de la source ; Kavor suit les changements du fichier.

### Vega-Lite / Vega — `.vl.json`, `.vg.json`

Pour les graphiques de données. `.vl.json` sélectionne Vega-Lite ; `.vg.json`, Vega. Ce sont des grammaires différentes :
changer l'extension ne suffit pas. Pour un exemple sans dépendance réseau, collez dans le CodingAgent et demandez
des données intégrées.

```prompt
Crée docs/diagrams/build-times.vl.json en Vega-Lite : des barres pour des temps de build fictifs de 12, 18 et 9 secondes.
Intègre les données au JSON, nomme les axes et ne cherche aucun jeu de données externe.
Ajoute-le comme Diagram et vérifie le rendu actuel.
```

**Résultat attendu :** un graphique permettant la comparaison, avec des unités claires. Pour travailler en Vega,
demandez explicitement cette grammaire et un chemin `.vg.json`. Un jeu de données distant dépend toujours du réseau,
même si le moteur est en cache.

### WaveDrom — `.wavedrom`

Pour la chronologie des signaux numériques. La source utilisée par Kavor est du JSON valide, pas un script
JavaScript. Collez dans le CodingAgent pour visualiser un handshake simple.

```prompt
Crée docs/diagrams/handshake.wavedrom en JSON valide avec clock, request et acknowledge sur huit cycles.
Rends explicite le moment où acknowledge répond à request ; n'exécute aucun script.
Ajoute-le comme Diagram et consulte le résultat actuel, en corrigeant les erreurs signalées par le moteur.
```

**Résultat attendu :** des signaux alignés dans le temps. Le dessin explique l'exemple ; il ne prouve pas une mesure
matérielle.

### nomnoml — `.nomnoml`, `.noml`

Pour des esquisses UML concises. La syntaxe est propre à nomnoml, pas interchangeable avec PlantUML. Collez dans le
CodingAgent.

```prompt
Crée docs/diagrams/order-model.nomnoml avec Order, OrderItem et Product, en montrant les relations et quelques attributs.
Utilise la syntaxe nomnoml, ajoute-le comme Diagram et vérifie le rendu actuel.
Garde le modèle fictif ; ne modifie ni les classes ni le schéma du projet.
```

**Résultat attendu :** une esquisse d'entités à discuter, sans transformer le dessin en implémentation automatique.

### Pikchr — `.pikchr`

Pour les compositions techniques dans le langage de dessin de style PIC. Il utilise la grammaire Pikchr, pas un
programme PIC arbitraire. Collez dans le CodingAgent pour un petit dessin de traitement.

```prompt
Crée docs/diagrams/processing.pikchr avec entrée, transformation et sortie, avec des boîtes légendées et des flèches.
Utilise la syntaxe Pikchr, ajoute-le comme Diagram et vérifie le rendu actuel.
Si le moteur rejette la source, corrige l'erreur observée avant de rapporter le résultat.
```

**Résultat attendu :** une composition vectorielle simple. Une syntaxe visuellement plausible ne remplace pas
l'observation du résultat du moteur.

### Svgbob — `.bob`

Pour transformer une esquisse ASCII en dessin vectoriel. L'alignement du texte fait partie de la source. Collez dans
le CodingAgent et conservez l'alignement dans le fichier.

```prompt
Crée docs/diagrams/request-path.bob en ASCII : deux boîtes nommées Client et Server, reliées par une flèche.
Préserve l'alignement, ajoute-le comme Diagram et vérifie le rendu actuel.
Ne colle pas simplement une image : garde l'esquisse textuelle comme source modifiable.
```

**Résultat attendu :** un dessin issu de l'esquisse textuelle. Modifier les espaces peut changer la géométrie.

### DBML — `.dbml`

Pour discuter des tables, colonnes et relations. La source est du DBML, pas du SQL ; le rendu ne crée pas de tables et
n'exécute pas de migration. Collez dans le CodingAgent en utilisant un modèle fictif.

```prompt
Crée docs/diagrams/shop-schema.dbml avec customers, orders et order_items, en indiquant les clés et les relations.
Ajoute-le comme Diagram et vérifie le rendu actuel.
Ne te connecte pas à une vraie base, ne génère pas de migrations et ne traite pas l'exemple comme le schéma de mon projet.
```

**Résultat attendu :** un modèle de données à examiner. Pour représenter ensuite le schéma réel, fournissez des
sources autorisées et gardez découvertes, hypothèses et décisions distinctes.

## Alterner entre dessin et source

- **Diagram :** privilégie le résultat visuel. Les fichiers existants s'ouvrent dans cette vue.
- **Source :** montre la source. Pour les formats modifiables, elle utilise l'éditeur et le flux d'enregistrement des
  Files.
- **Split :** source à gauche et aperçu à droite, pour ajuster et comparer sans changer de contexte.

Les nouveaux fichiers des formats source s'ouvrent dans Source. Dans Excalidraw, utilisez **Edit drawing** pour entrer
dans l'éditeur visuel et **Finish editing** pour revenir au dessin. Les modifications utilisent le même fichier et
le même flux d'enregistrement ; il n'existe pas de second Save distinct pour le dessin. L'édition visuelle et
l'édition de source ne sont pas actives en même temps.

draw.io conserve Source en lecture seule. Utilisez **Open with default app** pour travailler dans un éditeur externe.

Dans la vue Diagram, glisser avec le bouton droit déplace la vue interne ; pincer ou utiliser `Ctrl`/`⌘` + la
molette règle le zoom, sans déplacer le Canvas. Utilisez les contrôles de zoom et **Fit** pour cadrer. L'en-tête reste
la zone permettant de déplacer le Node. L'éditeur Excalidraw conserve ses propres contrôles.

[![PlantUML dans Split, avec la source à gauche et le rendu à droite, et un autre Diagram ouvert dans l'éditeur visuel Excalidraw.](https://media.agentkavor.com/editorial/diagrams/source-editing/image.71cde50ac832.jpg)](https://media.agentkavor.com/editorial/diagrams/source-editing/native.57f2690ef912.png)

Pour les formats source, Split rapproche le code et le résultat. Excalidraw propose aussi l'édition visuelle du
dessin lui-même.

### Lorsque l'aperçu n'est plus à jour

Si une modification ne peut pas être rendue, le dernier résultat réussi peut rester visible avec **Preview out of
date** et l'erreur du moteur. Il correspond à la source précédente et ne prouve pas la réussite de la nouvelle.
Lorsqu'un numéro de ligne réel est signalé, vous pouvez l'ouvrir dans Source ; un fichier jamais rendu affiche sa
source et l'erreur.

Corrigez la syntaxe, enregistrez et vérifiez le résultat actuel. Les problèmes d'enregistrement et les conflits
diffèrent des échecs de rendu ; ne jetez pas une modification locale simplement parce qu'un dessin reste à l'écran.

### Exporter pour partager

L'action **Export** propose le dessin complet en SVG et PNG, pas une capture limitée à ce qui tient dans le Node.
Pour draw.io, elle exporte la page active et ses calques. Si l'aperçu n'est plus à jour, l'export utilise le dernier
rendu réussi et le signale. Sans aucun résultat rendu, l'export est indisponible.

## Utiliser le panneau Diagrams sans remplir le Canvas

Le panneau trouve récursivement les fichiers de diagramme dans les **Documentation roots**, respecte `.gitignore`
et permet de chercher par nom ou chemin et de filtrer par format dans **All formats**. Il ne recherche pas tous les
fichiers du Workspace.

La liste reflète la hiérarchie réelle des dossiers sur disque. Sans recherche ni filtre de format, elle inclut les
dossiers vides ; développez et repliez les répertoires pour naviguer. Avec plusieurs roots, l'arborescence est
regroupée par racine.

Specs et Diagrams affichent les mêmes **Documentation roots**. Un dossier créé dans un panneau apparaît dans l'autre :
c'est le même dossier sur disque, pas une copie. Cela ne transforme pas une Specification en diagramme et ne change
pas son lifecycle.

- **Preview :** ouvre un aperçu en lecture seule, sans ajouter de Node. Survoler ou sélectionner la ligne ne l'ouvre
  pas. Il y a un seul aperçu à la fois ; `Escape` le ferme et rend le focus à l'action.
- **Add to Canvas :** ajoute la source ; si un Node existe déjà, l'action le retrouve.
- **New diagram :** crée via le formulaire inline, avec format et nom.
- **Show in File Manager :** localise le fichier ou le dossier dans le gestionnaire du système.

Un aperçu peut nécessiter le téléchargement du moteur de son format. Le fermer ne transforme pas un résultat tardif
en rendu valide d'un autre fichier.

[![Panneau Diagrams avec l'aperçu d'un fichier Excalidraw ouvert hors du Canvas et le menu Add to Canvas d'un autre fichier.](https://media.agentkavor.com/editorial/diagrams/panel-preview/image.b05789ae15d3.jpg)](https://media.agentkavor.com/editorial/diagrams/panel-preview/native.1e11695f5729.png)

Preview permet de consulter le dessin sans créer de Node. Add to Canvas est une action distincte.

### Créer et organiser des dossiers

Ouvrez le menu contextuel d'un dossier dans l'arborescence :

- **New Diagram… :** ouvre le formulaire inline pour créer dans ce dossier, même s'il n'est pas la destination par
  défaut de **Diagrams folder**. Choisissez le format, indiquez le nom et vérifiez le chemin.
- **New Folder… :** crée un vrai sous-dossier ; il peut rester vide jusqu'à ce que vous ayez besoin d'y mettre un
  diagramme.
- **Rename Folder… :** change le nom du dossier sans choisir un autre répertoire parent. Les Diagram Nodes concernés
  suivent le nouveau chemin.
- **Show in File Manager :** ouvre l'emplacement dans le gestionnaire du système.

Ces actions ne permettent ni de renommer ni de supprimer les Documentation roots configurées. Pour changer les
racines de découverte ou la destination par défaut des créations, utilisez les paramètres du Workspace, pas la
suppression d'un dossier.

### Renommer, déplacer et versionner le fichier

Dans le menu contextuel d'un diagramme, **Rename Diagram…** change le nom du fichier en conservant son extension, y
compris les extensions composées comme `.vl.json`. Pour déplacer le fichier, glissez la ligne vers un autre dossier
ou une autre racine de l'arborescence. S'il est déjà suivi par Git, le déplacement utilise `git mv` ; un fichier non
suivi peut aussi être déplacé.

Le Diagram Node suit le chemin après un renommage du fichier, un renommage de son dossier ou un déplacement du
diagramme. Vous n'avez pas besoin de l'ajouter à nouveau : l'identité du Node et ses Connections sont conservées.

Dans un dépôt Git, **Commit Diagram** crée un commit limité au chemin de ce fichier et affiche le hash obtenu. Il
n'inclut pas les modifications d'autres chemins déjà dans le stage. L'action fonctionne même sans Node sur le
Canvas ; elle versionne le fichier, pas une capture du dessin.

En présence d'une modification locale non enregistrée, répondez au choix présenté avant de changer la source ou de
faire le commit. Si l'opération échoue, lisez le message du panneau et corrigez la cause ; ne considérez pas un
déplacement ou un commit comme terminé simplement parce que vous l'avez lancé.

### Supprimer sans confondre fichier et Node

**Delete Diagram**, dans le menu du fichier et après confirmation, supprime la source et retire ses Diagram Nodes.
Cela diffère du simple retrait d'un Node du Canvas, qui conserve le fichier.

**Delete Folder and Contents** exige une confirmation et ne supprime qu'une sous-arborescence contenant des fichiers
de diagramme reconnus et de vrais répertoires. Si le panneau trouve une Specification, un autre type de fichier, une
entrée cachée ou un lien symbolique, il refuse l'opération avant toute modification et invite à utiliser **Files**
pour gérer le contenu mixte. Cette vérification est propre à Diagrams ; elle ne change pas les règles de suppression
du panneau Specs.

Lors de la suppression d'un diagramme individuel suivi par Git, Kavor utilise le flux de suppression de Git. Si Git
refuse l'opération, par exemple en raison de modifications locales, résolvez l'état indiqué avant de réessayer ;
la confirmation n'autorise pas à supprimer de force ces modifications.

## Intégrer la source au graphe

Un Diagram accessible fournit sa source et son résultat visuel au travail d'un CodingAgent. Il n'est pas nécessaire
d'y connecter directement tous les agents ; une Connection directe importe lorsque vous souhaitez appliquer
`diagram_read_only` à cette paire.

Une Connection **Diagram + Terminal** fournit le chemin absolu de la source par une variable d'environnement que
vous choisissez, comme pour File + Terminal. La valeur est le chemin, pas le SVG ou le PNG rendu. Configurez-la avant
de démarrer la session ou redémarrez celle-ci pour recevoir un changement de paramètre. Consultez la
[matrice des Connections](./connections.md).

## Téléchargements, confidentialité et mode hors ligne

Le dessin est rendu dans Kavor ; il n'est pas envoyé à un service de rendu externe. Les moteurs, polices et
ressources auxiliaires sont téléchargés à la demande, vérifiés et conservés dans le cache de données de l'application.
Ouvrir Kavor ou un Workspace ne télécharge pas tous les formats. SVG utilise l'affichage intégré.

Après le premier usage, les ressources déjà obtenues peuvent être réutilisées hors ligne. L'éditeur Excalidraw n'est
téléchargé qu'à l'entrée en édition ; les bibliothèques PlantUML comme C4 et les ressources draw.io peuvent aussi
nécessiter un premier téléchargement. Une mise à jour de Kavor remplaçant ces ressources peut nécessiter un nouveau
téléchargement lors du prochain usage.

Lors d'une première tentative hors ligne ou d'un échec de téléchargement, le Node affiche le motif et **Retry**. La
source des formats modifiables reste disponible ; réessayez lorsque les ressources peuvent être obtenues.

**Un moteur en cache ne signifie pas une absence totale de réseau.** Le contenu lui-même peut référencer des images,
des jeux de données ou d'autres ressources distantes. Les includes locaux sont résolus depuis le dossier du
diagramme et leurs modifications peuvent actualiser le dessin. Examinez les sources inconnues avant de les ouvrir ;
pour un usage hors ligne, préférez du contenu autonome et préparez toutes les ressources nécessaires à l'avance.

La surface du diagramme est isolée de l'interface privilégiée de l'application. Cela ne rend pas les références du
dessin dignes de confiance. Si vous demandez à un CodingAgent de produire ou d'analyser du contenu, la participation
du provider suit les conditions du harness choisi ; ne confondez pas rendu local et traitement local par le modèle.

## Pour aller plus loin

- [Ajoutez du contenu au Canvas](./adding-content.md) sans copier inutilement ses sources.
- Gardez les décisions dans la [Specification](./specification.md) et utilisez le dessin pour les expliquer.
- Consultez [les Connections prises en charge](./connections.md) et [les limites de contexte des CodingAgents](./coding-agents-and-canvas.md).
