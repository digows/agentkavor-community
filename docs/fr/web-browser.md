---
id: web-browser
title: "WebBrowser : développez et testez devant votre agent"
description: Utilisez le WebBrowser partagé de Kavor pour développer des applications web, reproduire des bugs, déboguer des pages et prouver des flux E2E.
kind: guide
lastReviewedAt: 2026-09-08
canonicalUrl: https://agentkavor.com/fr/docs/web-browser
---

# WebBrowser place l'application devant vous et votre agent

WebBrowser est une surface Chromium vivante dans le Canvas. Un CodingAgent connecté peut observer, interagir,
attendre, déboguer et tester la page que vous voyez également.

Consultez la [démonstration de WebBrowser dans Kavor](https://agentkavor.com/fr/videos/web-browser-node) dans un autre
onglet pendant votre lecture.

## Le browser comme outil de développement

Pour développer une application web, un CodingAgent a besoin de plus que de fichiers. Il doit ouvrir l'application,
interagir avec elle, attendre de vrais états et comprendre ce qui s'est passé dans le browser.

Avec une Connection entre CodingAgent et WebBrowser, l'agent dispose d'une large surface d'opérations médiées par
Kavor :

- **observer :** lire l'état de la page, obtenir un snapshot d'accessibilité et capturer des screenshots ;
- **interagir :** cliquer, remplir des champs, insérer du texte, appuyer sur des touches, sélectionner des options,
  cocher des contrôles, faire défiler, glisser, envoyer des fichiers et répondre aux dialogues ;
- **synchroniser :** attendre un sélecteur, un texte, une URL, un chargement, l'inactivité réseau ou une condition ;
- **déboguer :** consulter les messages de console, les requêtes réseau et les corps de réponse conservés ;
- **tester :** reproduire un bug, exécuter un flux E2E et conserver une preuve visuelle ;
- **isoler des scénarios :** bloquer, continuer ou simuler des réponses réseau dans un test contrôlé ;
- **organiser les pages :** ouvrir, sélectionner et fermer des onglets, suivre les téléchargements et gérer les défis
  d'authentification.

L'objectif n'est pas de cacher le browser derrière une automatisation, mais de rendre l'état et les actions
vérifiables pendant que l'agent travaille.

## Un cycle pratique pour une application web

Commencez avec un WebBrowser et un CodingAgent dans le même composant. Si l'application tourne localement, connectez
aussi le Terminal qui démarre le serveur.

Demandez à l'agent d'observer la page avant d'agir, de reproduire le parcours en échec, de recueillir les preuves de
console, réseau ou screenshot, de modifier le code dans la portée définie, puis de valider à nouveau tout le parcours.
Enregistrez le résultat et les risques restants dans une [Sticky Note](./sticky-note.md).

Un prompt de départ peut être :

> Ouvre l'application connectée dans WebBrowser. Observe d'abord la page et reproduis le parcours sans modifier le code. Décris ensuite la cause probable, propose le plus petit changement et valide le parcours complet avec des preuves visuelles et de console.

## Le même browser pour l'humain

Vous pouvez aussi utiliser WebBrowser comme une page normale dans le Workspace : ouvrir une documentation, regarder une
vidéo ou laisser une référence ouverte pendant que les agents travaillent.

YouTube et les autres pages courantes sont des usages naturels. Les services de streaming comme Netflix peuvent exiger
authentification, DRM, permissions ou conditions propres au système ; Kavor ne garantit donc pas la lecture d'un service
particulier.

## Une surface partagée, pas un browser invisible

L'agent et l'humain partagent la même page active. Vous voyez les actions et pouvez intervenir ; l'agent n'a pas de
fenêtre privée ; les onglets persistants appartiennent au profil browser propre à Kavor et partagé entre ses WebBrowsers ;
les extensions, l'historique et les cookies de votre Chrome externe ne sont pas réutilisés automatiquement.

Le contenu des pages n'est pas fiable. WebBrowser n'est pas non plus un service de browser distant ni une autorisation
générale d'opérer le filesystem de la machine.

## Limites et précautions

Les CAPTCHAs, passkeys, permissions du site, certificats et prompts d'authentification peuvent nécessiter votre
intervention. Les références d'un snapshot expirent après une navigation ou un changement du DOM. Les règles réseau
sont temporaires et doivent être effacées à la fin du test. Le profil de développement accepte les certificats
auto-signés, expirés et issus d'autorités privées ; cela réduit la protection face à un réseau hostile. Un snapshot
peut omettre les frames cross-origin et les historiques de console et de réseau sont limités ; l'agent doit décrire ce
qu'il a observé et ne pas inventer ce qu'il n'a pas pu inspecter.

Lors d'un changement de Workspace dans la même fenêtre, Kavor conserve la page présentée. Le CodingAgent peut continuer
à l'utiliser pendant qu'un autre Workspace est visible. Fermer l'onglet, supprimer le Node ou terminer la session met
fin à cette continuité.

## Connection et Guardrail

La paire directe CodingAgent + WebBrowser place le browser dans le composant atteignable de l'agent. Le graphe peut
inclure une Specification, des Files, un Terminal, une Sticky Note et d'autres CodingAgents par des chemins valides ;
la proximité visuelle ou une mention ne crée pas d'accès.

WebBrowser n'a pas aujourd'hui de Guardrail spécifique. Cela ne supprime pas les limites des ressources du même graphe :
un File read-only reste read-only, le Terminal conserve ses contrôles et la Specification suit toujours son lifecycle.

## Pour aller plus loin

- Consultez la [matrice des Connections](./connections.md) pour le contrat CodingAgent + WebBrowser.
- Lisez [comment les CodingAgents voient et construisent le Canvas](./coding-agents-and-canvas.md).
- Combinez browser, code et preuves dans [votre premier cycle](./first-loop.md).
- Utilisez une [Specification](./specification.md) pour définir le comportement attendu avant de tester l'application.
