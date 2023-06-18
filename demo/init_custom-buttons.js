/* 
Un exemple d'utilisation de customButtons avec trois boutons différents 
An example of using customButtons with three distinct buttons
*/

(function() {
    new Switcheroo('#switcheroo', {
        customButtons: [
            {
                action : '/f1-mon-premier-forum', 
                classes : 'someClass',
                before : false,
                html : '<img src="https://via.placeholder.com/40.png" alt="description">',
                tooltip : 'Lien interne au forum'
            },
            {
                action : 'https://pinterest.com', 
                classes : ['pinterest', 'rs'],
                before : true,
                html : '<i class="ion-social-pinterest"></i>',
                tooltip : 'Pinterest'
            },
            {
                action : '/faq',
                before : false,
                html : '<strong>⁇</strong>',
                tooltip : 'Yeah !'
            },
        ],	
    });
})();