/* 
Toutes les options en même temps ! 
All the options at once !
*/


(function() {
    new Switcheroo('#switcheroo', {
        logo: '<img src="https://via.placeholder.com/50.png" alt="logo">', 
        enableReorder: true, 
        customButtons: [
            {
                action : 'https://blank-theme.com/', 
                classes : ['extlink'],
                html : '<img src="https://blank-theme.com/asset/logo.png" alt="logo Blank Theme">',
            },
            {
                action : '/t16-reglement', 
                classes : ['intlink'],
                before : true,
                html : '⚠️',
                tooltip : 'Règlement du forum'
            },
            {
                action : 'https://blankthemerpg.forumactif.com/t36-install-switcheroo', 
                classes : ['extlink', 'credit'],
                html : '(c)',
                tooltip : 'Code par Monomer'
            },
        ], 
        updateAvatar: true, 
        confirm: true, 
        deleteIcon: '⨉',
        addIcon: '…',
    },
    {
        button: {
            add: "Lier un autre compte",
        },
        msg: {
            error: "Une erreur est survenue pendant l'opération",
            confirm: "Voulez-vous changer de compte ?",
        },
        modal: {
            password_label: "Votre mot de passe",
            username_label: "Votre nom d'utilisateur",
            login_button: "C'est parti !",
        }
    });
})();