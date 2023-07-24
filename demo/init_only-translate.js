(function() {
    new Switcheroo('#switcheroo', {/* nothing */},
    {
        button: {
            add: "Link a character",
        },
        msg: {
            error: "An error has occured.",
            confirm: "Please confirm to switcheroo.",
        },
        modal: {
            password_label: "Password",
            username_label: "Username",
            login_button: "Login",
        }
    });
})();