# Switcheroo

Switcheroo est un plugin pour [Forumactif](https://www.forumactif.com/) qui permet de rassembler plusieurs comptes dans une barre de navigation rapide pour changer de compte d'un clic. L'interface se veut intuitive, et une fois les prérequis remplis, l'installation et la personnalisation vous permettront d'adapter Switcheroo aux couleurs de votre design.

- [Read this doc in english](README.en.md) 
- [**Notes de version**](CHANGELOG.md)
- N'hésitez pas à passer sur [le forum de support](https://blankthemerpg.forumactif.com/t38-switcheroo-support) en cas de besoin !

## Avant l'installation : les prérequis

Switcheroo nécessite quelques modifications de votre part avant d'être installé. Cette étape est très importante puisque le plugin ne fonctionnera pas sans ces ajustements.

### Autoriser les formulaires ajax
Il faut autoriser les formulaires non-officiels à poster sur votre forum. Pour ce faire, rien de compliqué : accédez au panneau d'administration et rendez vous dans la section `Général › Forum › Sécurité`.  
Assurez-vous que l'option "*Interdire les formulaires non officiels à poster des messages et messages privés sur le forum*" est bien réglée sur "_Non_" et sauvegardez vos changements.

### Activer la Toolbar
Vous devez vous assurer que la Toolbar de ForumActif est activée. Si ce n'est pas le cas, dans votre panneau d'administration, rendez vous dans la section `Modules › Toolbar › Configuration` et cochez "*Oui*" à l'option "*Activer la toolbar*".   
Si elle est désactivée parce que vous ne l'utilisez pas, vous trouverez plus bas une solution pour la rendre invisible.

**Remarque :** Comme AwesomeBB utilise un système différent de toolbar, le plugin n'est malheureusement pas compatible avec cette version.

### Garder la barre de navigation
La barre de navigation principale de votre forum (celle qui permet de faire une recherche, de se connecter, de s'inscrire et de se déconnecter) doit être présente quelque part sur toutes les pages. Si vous l'avez retirée de votre template pour diverses raisons, vous trouverez plus bas une solution très simple pour la remettre et la cacher.

## Installer le plugin
Le plugin en lui-même est très simple à installer. Il comprend deux fichiers javascript externes à importer :
- **monomer.js** est un outil où je centralise toutes les fonctions utilitaires dont je me sers au quotidien. Par exemple, c'est grâce à ce script que le formulaire de connexion du plugin est appellé en popup.
- **switcheroo.js** est le fichier principal qui permet d'appeler le plugin Switcheroo.
  
Ce sont ces fichiers que vous trouvez dans ce *repository* Github. En les important de cette façon, en cas de mise à jour du plugin, vous n'aurez rien à modifier.

Ouvrez votre template `overall_footer_end` (fin du bas de page) et juste avant la fermeture de la balise `</body>` insérez le code suivant :

```html
<!-- Barre principale du plugin, dans laquelle la magie s'opère. Certaines valeurs peuvent être modifiées. -->
<nav id="switcheroo" class="switcheroo" direction="vertical" position="top"></nav>

<!-- Importation de Monomer.js et Switcheroo.js -->
<script src="https://cdn.jsdelivr.net/gh/caezd/switcheroo@master/monomer.js"></script>
<script src="https://cdn.jsdelivr.net/gh/caezd/switcheroo@master/switcheroo.js"></script>

<!-- Script qui permet d'initialiser le plugin -->
<script>
(function() {
      new Switcheroo('#switcheroo');
})();
</script>
```
Enregistrez vos modifications et publiez votre template. 

Note : Vous pouvez, en principe, placer la partie `<nav id="switcheroo" ...> </nav>` ailleurs dans votre template si cela correspond à vos besoins.

Avec ces quelques lignes, Switcheroo est installé et fonctionnel ! A ce stade, cependant, il est tout moche et écrasé en bas de votre forum. C'est normal, il manque encore le CSS pour que tout soit beau. Mais pour l'instant, concentrons-nous sur les options disponibles.

### Les options du plugin

Switcheroo vient avec quelques options qu'il vous est possible de modifier facilement. Elles doivent être ajoutées à l'initialisation du plugin pour fonctionner, c'est à dire dans le template où vous l'avez installé, juste après le commentaire `<!-- Script qui permet d'initialiser le plugin -->`, entre les deux dernières balises `<script> </script>`.

Les valeurs des options ci-dessous sont celles par défaut :
```js
(function() {
    new Switcheroo('#switcheroo', {
        logo: '', /* accepte html, permet d'afficher un logo qui retourne à l'accueil du forum */
        enableReorder: true, /* activer le drag&drop pour l'ordre des comptes (true/false) */
        customButtons: [{}], /* Permet d'ajouter des boutons en plus (liens utiles) */
        updateAvatar: true, /* activer le clic droit pour charger un nouvel avatar (true/false) */
        confirm: true, /* demande une confirmation avant le changement de compte */
        deleteIcon: '×', /* accepte html, icone pour supprimer un compte lié */
        addIcon: '+', /* accepte html, icone qui ouvre le formulaire de connexion et d'association */
    },
    {
        button: {
            add: "Associer un personnage",
        },
        msg: {
            error: "Une erreur est survenue lors du Switcheroo.",
            confirm: "Confirmer le Switcheroo de personnage ?",
        },
        modal: {
            password_label: "Mot de passe",
            username_label: "Nom d'utilisateur",
            login_button: "Connexion",
        }
    });
})();
```

Vous n'avez pas besoin de réécrire chaque ligne, n'indiquez que les valeurs que vous modifiez. Attention, il y a deux sets d'options. Si vous n'utilisez que le second, laissez une espace ou un commentaire dans le premier, sinon Forumactif fera sa mauvaise tête.

Consultez les fichiers `init_xxx.js` dans le dossier [demo](demo) pour voir des exemples d'initialisation du plugin qui puissent répondre à vos besoins.

### Ajouter des boutons avec `customButtons` 
L'option `customButtons`, si elle est utilisée, doit être au format suivant :
```js
customButtons: [{/* bouton 1 */}, { /* bouton 2 */}, {/*bouton 3 */}],
```
C'est à dire un ou plusieurs groupes de propriétés entre accolades `{}`, séparés par des virgules, à l'intérieur d'un set de crochets `[]`. Vous pouvez sauter des lignes pour améliorer la lisibilité, tant que vous n'oublez pas les virgules.

Chaque bouton est défini par plusieurs paramètres, à séparer par des virgules :
```js
{
    action : '/', /* un lien ou une fonction js */
    classes : [] , /* FACULTATIF : une ou plusieurs classes, entre guillemets et séparées par des virgules */
    before : false, /* FACULTATIF : si vos boutons sont affichés avec flex, permet de placer le bouton avant les avatars de switcheroo */
    html : '', /* le code HTML de ce que vous souhaitez placer dans votre bouton (une image ? Un symbole ?) */
    tooltip : '', /* FACULTATIF : le texte à faire apparaitre avec un tooltip */
}
```
Vous trouverez un exemple dans le fichier [init_custom-buttons.js](demo/init_custom-buttons.js).

Les classes, une fois générées, seront au format `switcheroo__button--nomdeclasse`.

## L'apparence
Maintenant que vous avez réglé Switcheroo selon vos besoins, il est temps de lui donner une apparence un peu plus avenante.

Par défaut, vous pouvez utiliser la feuille de style créée pour le [Blank Theme](https://blank-theme.com/), qui peut être utilisée partout ailleurs. Vous y trouverez notamment quelques variables CSS pour vous permettre de modifier les couleurs plus facilement. 

Copiez collez le contenu du fichier [switcheroo_blank_theme.css](css/switcheroo_blank_theme.css) et ajoutez le à la suite de votre feuille de style existante, dans votre panneau d'administration, section `Affichage > Images et Couleurs > Couleurs & CSS > Feuille de style CSS`. 

Cette feuille de styles s'accorde avec les attributs attribués à la barre dans le code HTML, souvenez-vous :
```html
<nav id="switcheroo" class="switcheroo" direction="vertical" position="top"></nav>
```
Deux options sont visibles dans ce code :
- `direction` peut prendre alternativement la valeur "vertical" ou "horizontal" pour changer l'orientation de la barre
- `position` peut prendre la valeur "top", "static" ou "bottom", selon que vous voulez fixer la barre en haut (top), en bas (bottom) ou ne pas la fixer (static).
  
Si vous écrivez votre propre CSS, ces options ne fonctionneront pas sans intervention de votre part.

## Masquer les prérequis (optionnel)

### Retirer la Toolbar
Comme promis, ce petit bout de CSS vous débarrassera de la toolbar sans la désactiver, permettant ainsi au plugin de fonctionner incognito. Si jamais elle a ajouté un espace indésirable en haut de votre forum, assurez-vous qu'elle ne soit pas fixée à l'écran.
```css
#fa_toolbar, #fa_toolbar_hidden {
    display: none!important;
}
```

### Masquer la barre de navigation
La barre de navigation originelle est nécessaire pour que le plugin fonctionne, mais il est possible que vous en utilisiez une autre. La variable qui permet de l'afficher, `{GENERATED_NAV_BAR}`, se trouve dans le template `overall_header` (haut de page).  
Si elle n'est pas présente dans votre template (si vous utilisez un système customisé), ajoutez cette ligne dans votre code juste après l'ouverture de la balise `<body>`
```html
    <div style="display: none;">{GENERATED_NAV_BAR}</div>
```