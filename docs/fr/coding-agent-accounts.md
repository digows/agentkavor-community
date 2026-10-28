---
id: coding-agent-accounts
title: "CodingAgent Accounts : vos comptes, leur utilisation et la rotation"
description: Suivez les limites des providers, ajoutez vos comptes et choisissez comment les CodingAgents partagent leur capacité entre Workspaces sans remplacer votre connexion native.
kind: guide
lastReviewedAt: 2026-10-28
canonicalUrl: https://agentkavor.com/fr/docs/coding-agent-accounts
---

# CodingAgent Accounts : vos comptes, leur utilisation et la rotation

## Vue d'ensemble

Une Specification peut mobiliser un Builder et un Reviewer en même temps, tandis qu'un autre Workspace utilise une
troisième session. Ces sessions n'ont pas à se disputer la même connexion à votre insu : **CodingAgent Accounts**
affiche la capacité de vos comptes et vous permet de choisir comment les CodingAgents l'utilisent.

Le pool vous appartient et se partage entre vos Workspaces. Ce n'est pas un moyen de partager des comptes avec
d'autres personnes. Sa configuration est facultative : avec la seule connexion native du provider, vous continuez
à travailler comme auparavant.

La connexion déjà présente sur l'ordinateur constitue le compte principal, **Main**. Lorsque le provider fournit
votre adresse e-mail, Kavor utilise cette adresse seule comme nom d'affichage ; si l'identité n'est pas disponible,
il affiche **Main**. Ajouter un compte dans Kavor ne remplace pas cette connexion et ne déconnecte pas les
applications du provider qui l'utilisent.

Commencez par le groupe **Accounts** dans l'en-tête du Workspace. Survolez un provider pour voir le résumé, puis
cliquez dessus pour ouvrir le panneau. Ce panneau réunit utilisation, comptes, choix du Workspace et préférences ;
il n'existe pas d'autre gestionnaire de comptes dans Settings.

## Utilisation

**Les pourcentages indiquent la capacité restante, pas le nombre d'agents.** Plusieurs CodingAgents peuvent utiliser
le même compte et consommer ses fenêtres d'utilisation simultanément.

![Illustration des indicateurs Accounts de Claude Code, Codex, Antigravity et Grok.](https://media.agentkavor.com/product/2.1.0/coding-agent-accounts/header.118710635e3f.png)

Illustration de l’interface avec les valeurs relevées dans la capture de référence ; il ne s’agit pas d’une nouvelle mesure d’utilisation des providers.

### Lire le résumé de l'en-tête

- Chaque indicateur reprend la couleur de son provider et affiche jusqu'à deux fenêtres générales du compte, de la
  plus courte à la suivante. Un compte avec une fenêtre de cinq heures et une fenêtre hebdomadaire affiche ces deux
  fenêtres ; un compte uniquement mensuel ne se voit pas attribuer une fenêtre fictive de cinq heures. Les
  pourcentages de comptes différents ne sont pas additionnés.
- Lorsque plusieurs comptes sont utilisés dans ce Workspace, le résumé représente celui dont la capacité restante
  est la plus faible dans l'une de ces fenêtres. Le survol identifie les comptes utilisés et les fenêtres de chacun.
- Si aucun CodingAgent n'utilise ce provider, l'indicateur s'estompe et affiche le meilleur compte disponible connu
  parmi ceux que le Workspace peut choisir en Automatic. Cela ne signifie pas qu'il a déjà été sélectionné.
- **+N** indique la réserve d'autres comptes dont la capacité est connue pour la sélection automatique de ce
  Workspace, et non une réserve exclusive. Des comptes également utilisés par d'autres CodingAgents peuvent y
  figurer. **+N?** signale des relevés encore inconnus ; un provider avec un seul compte n'affiche pas de réserve.
- Une fenêtre devient ambrée lorsqu'elle atteint le seuil de rotation. L'indicateur entier devient rouge clair
  lorsque tous les comptes qu'Automatic peut utiliser dans ce Workspace ont atteint ou dépassé le seuil configuré,
  d'après des relevés confirmés. C'est une information de capacité, pas un blocage du travail.

### Vérifier les fenêtres et le relevé

Dans le panneau, chaque fenêtre affiche sa capacité restante et son prochain renouvellement. Les fenêtres propres
à un modèle figurent dans les détails du compte, pas dans l'indicateur général. Ouvrez **More** pour consulter
l'heure **Read**, le forfait, les crédits, les réinitialisations en réserve et les autres données réellement
fournies par le provider.

Les relevés visibles sont actualisés périodiquement. Pendant l'actualisation, le dernier relevé valide reste
affiché avec son heure réelle ; fermer et rouvrir le panneau ne transforme pas d'anciennes données en nouvelle
observation. Un échec indique une indisponibilité ou une marche à suivre pour se connecter, sans remplacer les
derniers pourcentages valides par des valeurs inventées. Utilisez **Refresh**, à côté du sélecteur de provider,
pour demander une actualisation.

**Unavailable** ou **—** ne signifient ni 0 % ni 100 %. Un relevé inconnu ne confirme ni l'épuisement de la capacité
du compte ni l'expiration de la connexion. Vérifiez l'erreur et l'heure ; essayez d'actualiser ou reconnectez-vous
si cela vous est demandé. Un échec de consultation de l'utilisation ne masque pas les actions d'ajout de compte
ou de reconnexion.

| Provider | Informations pouvant être affichées |
| --- | --- |
| **Codex** | Fenêtres primaire et secondaire, leurs périodes et réinitialisations, périmètre par modèle, crédits et réinitialisations en réserve lorsqu'ils sont fournis. Les périodes varient selon le compte. |
| **Claude Code** | Fenêtres reconnues dans le résultat natif d'utilisation, par exemple la session et la semaine, avec pourcentages et réinitialisations. Les statistiques locales de tokens ou de coût ne deviennent pas des quotas. |
| **Grok** | Utilisation des crédits, période et renouvellement ; forfait et solde prépayé lorsqu'ils sont fournis. |
| **Antigravity** | Capacité restante et réinitialisations des groupes ou buckets signalés par le CLI. |
| **OpenCode** | Ne participe pas à ce suivi ; l'utilisation dépend du provider configuré dans le harness. |

Les consultations passent par le canal natif du provider, sans demander de travail à un modèle. Consulter un solde
n'autorise pas à le dépenser.

## Comptes

### Ajouter un compte et s'authentifier

1. Ouvrez le panneau d'un provider compatible : **Codex**, **Claude Code** ou **Grok**.
2. Utilisez **Add account**, attribuez un nom reconnaissable, comme `Trabalho`, puis confirmez avec
   **Add account and sign in**.
3. Terminez la connexion native sur la page du provider et utilisez le code affiché si nécessaire. L'adresse
   d'autorisation s'ouvre une fois pour le parcours que vous avez lancé ; lorsque le CLI du provider ouvre lui-même
   le navigateur, Kavor n'ouvre pas un deuxième onglet.
4. Vérifiez l'état d'authentification et le relevé d'utilisation. **Ouvrir le navigateur ne signifie pas que la
   connexion est terminée.**
5. Pour inclure ce nouveau compte dans la sélection automatique, activez sa participation dans le Workspace voulu.
   Un compte nouvellement ajouté est exclu d'Automatic dans tous les Workspaces ; le pool global ne l'active pas
   de lui-même.

Kavor prépare un profil isolé pour le compte ajouté. Les identifiants restent dans le stockage utilisé par le CLI
de ce compte, pas dans la base de données de Kavor. La connexion native Main reste à son emplacement d'origine.

Pour une connexion expirée, utilisez **Sign in again**. Pour les comptes gérés, le panneau propose aussi cette
action lorsque l'état d'authentification n'a pas pu être déterminé ; cela ne transforme pas un relevé inconnu en
expiration confirmée. Chaque clic qui lance une connexion, y compris une nouvelle tentative, ouvre l'adresse
d'autorisation une fois lorsqu'elle devient disponible. Si l'ouverture échoue, utilisez manuellement
**Continue provider sign-in**. Rouvrir le panneau ou restaurer une opération en attente n'ouvre pas d'onglet
de sa propre initiative.

### Main n'est pas une copie de votre connexion

Main utilise la connexion native à l'endroit même où le provider la conserve. Le panneau ne propose ni connexion,
ni déconnexion, ni suppression pour Main ; gérez cette connexion avec les outils du provider. Lorsque vous changez
de compte natif en dehors de Kavor, Main représente cette nouvelle connexion, sans proposer de récupérer le compte
précédent.

Une connexion native sans identité ou sans données d'utilisation, comme une clé API Codex, continue de fonctionner
comme auparavant, mais ne participe pas à la rotation automatique. Kavor ne lit pas les identifiants pour tenter
d'en déduire une identité.

### Déconnecter n'est pas supprimer

**Sign out** conserve le compte dans la liste pour vous permettre de vous reconnecter. **Remove account** retire
le compte de la liste et supprime son profil isolé géré par Kavor ; cela ne supprime ni la connexion Main ni
l'historique partagé des sessions.

Si des CodingAgents utilisent le compte, Kavor affiche ceux qui sont concernés et demande confirmation. Le
changement attend le point sûr entre deux tours et la libération de l'ancien processus. Un choix fixe de ce
compte revient à Automatic ; si c'était le compte par défaut d'un Workspace, ce défaut revient à Main. Sans autre
compte, l'exécution utilise la connexion native.

## Copie de la configuration personnelle

Lors de l'ajout d'un compte, vous recevez **une copie initiale** de la configuration personnelle du provider issue
de l'environnement natif. Cela évite de recréer les préférences, skills et MCPs pour chaque compte. Le contenu
dépend du provider et de ce qui existe à la source :

| Provider | Éléments copiés |
| --- | --- |
| **Codex** | `config.toml`, avec préférences, profils, MCPs personnels et providers personnalisés ; hooks personnels de `hooks.json` ; `AGENTS.md` et les répertoires `skills`, `plugins`, `rules` et `prompts`. `forced_chatgpt_workspace_id` n'est pas copié. |
| **Claude Code** | `settings.json`, y compris la statusline et les hooks personnels ; `keybindings.json` ; `CLAUDE.md` ; les répertoires `skills`, `plugins`, `rules`, `agents` et `commands`. Pour `.claude.json`, seuls les MCPs personnels sont copiés, pas le fichier entier. |
| **Grok** | `config.toml`, avec préférences et MCPs personnels ; `AGENTS.md` et les répertoires `skills`, `plugins`, `rules` et `hooks`. |

**Les secrets intégrés à ces configurations sont également copiés.** Cela comprend les valeurs d'environnement
des MCPs, les en-têtes HTTP statiques et les clés de providers personnalisés enregistrés dans ces fichiers. Les
fichiers conservent leurs permissions ; ces valeurs ne sont ni consignées dans les logs ni stockées dans la base
de données de Kavor.

**La connexion native, les fichiers d'authentification, les éléments du Keychain et l'identité du compte ne sont
jamais copiés.** Le compte ajouté nécessite sa propre connexion. Les entrées d'intégration appartenant à Kavor ne
sont pas non plus héritées : Kavor prépare son intégration pour ce compte.

Il s'agit d'une copie, pas d'une synchronisation. Un MCP ajouté plus tard dans Main doit aussi être configuré dans
les comptes où vous voulez l'utiliser. Modifier un compte ajouté ne change pas Main ; se reconnecter ne recopie
pas les préférences.

Si la préparation signale une erreur de configuration, vérifiez le TOML ou JSON personnel indiqué avant de
réessayer. Ne copiez pas les fichiers d'authentification et ne supprimez pas tout le profil natif pour tenter
de réparer le problème.

## Changement de compte

### Choisir le comportement de chaque Workspace

Un choix **Manual** dans les paramètres du CodingAgent fixe un compte pour ce Node et l'emporte sur la politique
du Workspace. Un CodingAgent en **Auto (Automatic)** suit les choix de son Workspace pour ce provider.

Lorsque le mode effectif est **Manual**, défini sur le Node ou hérité du Workspace, la fin d'un tour ne déclenche
pas de consultation de capacité pour la rotation. Les relevés d'utilisation visibles et **Refresh** restent disponibles.

Dans le panneau Accounts du Workspace :

- Avec **Auto Rotate** activé, les interrupteurs de participation définissent les comptes utilisables par
  Automatic. Chaque Workspace a sa propre sélection, même s'ils utilisent le même pool. Un compte exclu de cette
  sélection reste visible et peut être choisi manuellement dans le CodingAgent ou utilisé dans un autre Workspace.
- Avec un seul compte participant, Automatic le conserve même s'il a atteint le seuil. Sans participant, il utilise
  la connexion native Main, sans rotation automatique dans ce Workspace.
- Avec **Auto Rotate** désactivé, les boutons de sélection unique définissent le compte par défaut des CodingAgents
  en Automatic. La désactivation fait de Main le compte par défaut ; elle ne restaure pas un ancien choix. Les
  participations sont conservées pour la prochaine activation d'Auto Rotate.

L'enregistrement d'Auto Rotate ou d'une participation est immédiat et **ne redémarre ni ne redistribue les agents
en cours d'exécution**. Une participation prend effet au prochain choix automatique réel, par exemple à l'ouverture
ou lors d'une rotation déclenchée par le seuil. En revanche, choisir explicitement un autre compte par défaut ou
un autre compte Manual peut déplacer les CodingAgents concernés au point sûr entre deux tours. Un agent dont le
compte effectif ne change pas n'est pas redémarré.

![Panneau Accounts de Codex avec Auto Rotate activé, participation des comptes, capacité restante et préférences de rotation ; identités masquées.](https://media.agentkavor.com/product/2.1.0/coding-agent-accounts/panel.2cf397f707ee.png)

La participation des comptes se configure dans le panneau Accounts de chaque Workspace. Les valeurs de capacité restante et les horaires de renouvellement proviennent de la capture de référence, et non d’une requête en direct au fournisseur. Les identités ont été masquées.

### Comment Automatic choisit un autre compte

Le seuil par défaut est de **95 % d'utilisation**, réglable dans **Rotate at used capacity (%)**, sous
**Global rotation preferences**. Kavor tient compte de l'authentification, de l'éligibilité du forfait, du modèle
choisi, de la participation au Workspace et de toutes les fenêtres signalées. Il ne change pas de modèle pour
rendre un compte admissible à la sélection.

Les décisions d'Automatic peuvent partager un relevé valide du même compte entre vos Workspaces pendant au plus
**30 secondes** à partir de la consultation initiale. Sa réutilisation ne prolonge pas ce délai. Son expiration,
le renouvellement d'une fenêtre ou un échec confirmé d'authentification ou de quota imposent une nouvelle évaluation ;
des données indisponibles ne deviennent pas une capacité éligible. La rotation reste préventive, au seuil configuré,
sans attendre l'échec d'un tour.

Le compte actuel est conservé s'il est valide. Lorsqu'il faut choisir parmi des comptes éligibles sous le seuil
dans toutes les fenêtres, Kavor préfère, dans cet ordre :

1. Un compte déjà utilisé par les CodingAgents de ce Workspace.
2. Un compte qu'aucun autre Workspace n'utilise.
3. Le compte partagé avec le moins d'autres Workspaces.

À égalité, il préfère celui dont la capacité se renouvelle le plus tôt. Avec quatre Workspaces et quatre comptes
éligibles disponibles, cela permet de répartir un compte par Workspace. Ce n'est pas une réservation exclusive :
les comptes peuvent être partagés si nécessaire. Ouvrir ou fermer un Workspace ne provoque pas de redistribution
générale.

Le changement redémarre le harness sur l'autre compte **entre deux tours**, en reprenant la même session native et
son historique. Le Node affiche les étapes réelles d'attente, de choix, de redémarrage et de reprise. Une indication
d'attente ne bloque pas un terminal encore utilisable ; pendant le redémarrage du CLI, le terminal se ferme puis
revient lorsque la session est prête. Un changement réussi ne génère pas de notification système ; celles-ci sont
réservées aux échecs réels, avec indication du Workspace et du CodingAgent.

### Capacité épuisée et échecs de tour

**Une capacité faible ou épuisée, à elle seule, ne met pas le CodingAgent en pause, ne bloque pas un message et ne
désactive pas la saisie du terminal.** Sans autre compte disposant de capacité, il reste sur le compte actuel. Une
première ouverture en Automatic sans compte éligible disposant de capacité utilise Main et signale cette situation.
Les limites réelles et la facturation du tour restent appliquées par le provider.

Une connexion dont l'expiration est confirmée est ignorée dans les choix automatiques ; un échec réseau ou un
relevé inconnu ne confirme pas l'expiration. Cela ne remplace pas un choix Manual.

Avec **Codex et Claude Code**, un tour ayant échoué à cause d'un quota de compte confirmé par le provider peut être
repris sur un autre compte, selon les mêmes règles d'Automatic et lorsque le renvoi est sûr. Une livraison
incertaine, un problème d'authentification, un rate limit, une surcharge générale ou une cause inconnue n'autorisent
pas à répéter une demande. **Un tour Grok ayant échoué n'est pas renvoyé automatiquement**, car le signal natif ne
distingue pas quota et rate limit ; la rotation au seuil d'utilisation reste disponible.

### Crédits et réinitialisations en réserve

**Allow spending credits** et **Allow spending banked resets** sont deux permissions distinctes, désactivées par
défaut. Elles régissent la sélection et la rotation effectuées par Kavor ; voir un solde n'active aucune des deux.
Lorsque les crédits sont désactivés, un compte au seuil configuré ne devient pas éligible automatiquement sous
prétexte qu'il possède encore un solde. Cela n'interrompt pas une session déjà en cours et ne modifie pas votre
choix Manual.

**Ces options ne bloquent pas la facturation native au cours d'un tour.** Réglez les limites de dépenses et la
consommation payante du compte chez le provider lui-même. Kavor n'achète pas de crédits et ne modifie pas les
paramètres de facturation de votre connexion.

Les réinitialisations en réserve et leurs dates d'expiration n'apparaissent que si elles sont signalées. La
consommation d'une réinitialisation en réserve n'a pas été vérifiée ; la présence d'un solde ou d'une préférence
ne doit pas être interprétée comme une garantie de consommation effective.

## Outils pour les CodingAgents

Un CodingAgent peut consulter vos comptes sans recevoir d'identifiants :

- `kavor_coding_agent_account_list_usage` consulte le pool global et les connexions natives, avec pagination,
  fenêtres, réinitialisations, éligibilité et heure d'observation ; il peut filtrer par provider.
- `kavor_coding_agent_account_request_change` demande le changement du **propre compte** du CodingAgent appelant
  pour la fin du tour, en respectant Automatic et les comptes autorisés dans ce Workspace.

La demande est refusée en Manual et ne garantit pas l'existence d'une autre option éligible. Ces outils ne
permettent ni de changer le compte d'un autre CodingAgent, ni de se connecter, ni de supprimer des comptes,
ni de modifier les permissions de dépenses, ni d'accéder aux tokens.

Par exemple :

> Compare les fenêtres et renouvellements de mes comptes sans modifier aucune sélection. Si tu recommandes un
> changement pour ta propre session, explique quels relevés étayent cette suggestion et respecte mon choix Manual.

## Commandes d'Agent Kavor

Dans la conversation d'**Agent Kavor**, y compris via un Channel activé, les commandes agissent sur le Workspace
sélectionné, sans tour de modèle pour interpréter le contrôle. Utilisez les noms réellement affichés par Kavor :

```text
/accounts
/accounts codex
/account
@Reviewer /account "Trabalho"
@Reviewer /account auto
/autorotate codex off
/autorotate codex on
/status
```

- `/accounts [provider]` affiche le résumé de l'utilisation, des renouvellements et de la réserve du Workspace. Ce
  n'est pas un export complet de tous les comptes : s'il reste des résultats ou des relevés inconnus, la réponse
  indique ses limites et renvoie au panneau.
- `/account [@Nome]` consulte le compte et le mode de l'agent sélectionné ou indiqué. Ajoutez le nom ou l'e-mail
  d'un compte pour le fixer ; utilisez `auto` pour revenir à Automatic. Les noms contenant des espaces doivent
  être entre guillemets.
- `/autorotate [provider] on|off` active ou désactive Auto Rotate dans ce Workspace, sans déplacer les agents en
  cours d'exécution. Sans provider, la commande utilise celui du CodingAgent par défaut ; sans agent par défaut,
  vous devez préciser le provider.
- `/status` inclut le compte et ses fenêtres générales ; `/help` présente les contrôles et exemples disponibles.

Fixer un autre compte respecte les mêmes validations, le même point sûr et les mêmes retours que sur le desktop.
Une réponse à la commande ne prouve pas que la reprise est terminée. Ajouter des comptes, se connecter, se
déconnecter, supprimer, modifier les participations et choisir le compte par défaut du Workspace restent des
actions du panneau desktop. Les règles d'autorisation du Channel ne changent pas.

Consultez [Agent Kavor et Channels](./agent-kavor.md) pour sélectionner le Workspace et le destinataire avant
d'utiliser ces contrôles.

## Prise en charge et limites par provider

- **Codex, Claude Code et Grok** proposent des comptes gérés et des changements avec continuité de session. Le
  forfait du compte et le modèle doivent autoriser l'exécution. Une configuration isolée ne rend pas admissible
  un forfait qui ne l'est pas.
- **Grok** ne fournit pas l'identité native du compte. Main garde ce nom neutre ; forfait et solde ne servent pas
  à déduire un e-mail. L'exception concernant le renvoi des tours est décrite plus haut.
- **Antigravity** permet de suivre le compte de la machine, sans pool, changement de compte ni copie de
  configuration tels que décrits dans ce guide.
- **OpenCode** est exclu du suivi et de la gestion des comptes décrits ici ; ses limites dépendent du provider
  configuré dans son propre harness.
- Les connexions sans identité ou utilisation signalée restent disponibles par la voie native, sans inventer de
  quota ni activer la rotation automatique. Les informations disponibles et les fenêtres peuvent varier selon les
  comptes et les modes d'authentification.
- Des données absentes ne sont pas des soldes nuls. Un changement de format natif peut rendre une observation
  indisponible ; vérifiez l'heure, le message et la connexion avant de conclure que le quota est épuisé.

Pour organiser le travail avec ces comptes, poursuivez avec le [guide CodingAgent](./coding-agent.md) et
[la répartition des agents et des rôles](./agents-and-roles.md).
