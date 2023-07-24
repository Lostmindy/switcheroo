/* 
   Exemples d'initialisation qui vous permet de changer le texte sur les boutons ajouter et supprimer.
   Init examples if you want to be fancy by changing the text on buttons add and delete.
*/

/* using windows symbols */
(function() {
    new Switcheroo('#switcheroo', {
        deleteIcon: '⨂',
        addIcon: '⨁',
    });
})();

/* OR using https://ionic.io/ionicons/v2 */
(function() {
    new Switcheroo('#switcheroo', {
        deleteIcon: '<i class="ion-close-round"></i>',
        addIcon: '<i class="ion-plus-round"></i>',
    });
})();


