# Switcheroo
[![](https://data.jsdelivr.com/v1/package/gh/caezd/switcheroo/badge)](https://www.jsdelivr.com/package/gh/caezd/switcheroo)

Switcheroo is a [Forumotion](https://www.forumotion.com/) plugin that allows an user to group multiple accounts in a quick nav bar to switch from one to another in just one click. The interface is intuitive, and once the prerequiste steps have been followed, you can customise Switcheroo so it matches your theme colours. 

## Before you install: prerequisites

Switcheroo requires a few adjustments on your part before it can be installed. This step is very important, as the plugin won't work without these settings.

### Allow Ajax forms
You need to authorize unofficial forms to post on your forum. This is pretty straightforward: access the administration panel and go to the section `General › Forum › Security`. 
Find the option _Unauthorize unofficial forms to post messages and private messages on the forum_ and make sure it's set to "no", then save your changes.


### Enable the Toolbar
Make sure that the ForumActif toolbar is activated. If this is not the case, go to your administration panel in the section `Modules › Toolbar › Configuration` and check "*Yes*" for the option "*Activate the toolbar*". 
If you disabled the toolbar because you don't plan to use it, there's a way to hide it at the end of this tutorial.
**Note :** Switcheroo requires the toolbar to function. As AwesomeBB uses a different toolbar system, the plugin is unfortunately not compatible with this version.

### Keep the navbar
Your forum's main navigation bar (the one that allows you to search, login, register and logout) must be included somewhere on all pages. If you've removed it from your templates for some reason, you'll find below a simple solution for putting it back and hiding it.

## Install the plugin
The plugin itself is very easy to install. It includes two external javascript files to import:
- **monomer.js** is where I centralize all the utility functions I use on a daily basis. For instance, it's through this script that the plugin's login form is displayed as a popup.
- **switcheroo.js** is the main file used to activate the Switcheroo plugin.
  
These are the files you'll find in this Github *repository*. By including them this way, you won't have to modify anything when the plugin is updated.

Open your `overall_footer_end` template and, just before the closing `</body>` tag, insert the following snippet:

```html
<!-- Plugin main bar, where the magic happens. Some values can be edited. -->
<nav id="switcheroo" class="switcheroo" direction="vertical" position="top"></nav>

<!-- Monomer.js and Switcheroo.js -->
<script src="https://cdn.jsdelivr.net/gh/caezd/switcheroo@master/monomer.js"></script>
<script src="https://cdn.jsdelivr.net/gh/caezd/switcheroo@master/switcheroo.js"></script>

<!-- Script that initializes the plugin -->
<script>
(function() {
      new Switcheroo('#switcheroo');
})();
</script>
```
Save the changes and publish your template.

**Note:** You can, in theory, place the `<nav id="switcheroo" ...> </nav>` part elsewhere in your template if this suits your needs.

With these few lines, Switcheroo is up and running! At this stage, however, it looks ugly and squashed at the bottom of your forum. That's to be expected, as the CSS is still needed to make it all look good. But for now, let's focus on the available options.

### Plugin options

Switcheroo comes with a few options that you can easily customize. They must be set when the plugin is first initialized, i.e. in the template where you installed it, just after the `<!-- Script that initializes the plugin -->` comment, between the `<script> </script>` tags.

Les valeurs des options ci-dessous sont celles par défaut :
```js
(function() {
    new Switcheroo('#switcheroo', {
        logo: '', /* accepts html, displays a logo that takes you back to the forum home page */
        enableReorder: true, /* enable drag&drop to change accounts display order */
        customButtons: [{}], /* Adds additional buttons */
        updateAvatar: true, /* enable right-click refresh the avatar */
        confirm: true, /* prompts for a confirmation before switching accounts */
        deleteIcon: '×', /* accepts html, icon to delete a linked account */
        addIcon: '+', /* accepts html, icon to open the login and pairing form */
    },
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
```

You don't need to rewrite each line, just specify the values you're modifying. Please note that there are two sets of options. If you only use the second, leave a space or a comment in the first `{}`, otherwise Forumotion will act up. 

Check the `init_xxx.js` files in [demo] for an example on how to write your initialization to fit your needs.

### Adding more buttons with `customButtons`
The `customButtons` option, if used, must be in the following format:
```js
customButtons: [{/* button 1 */}, { /* button 2 */}, {/*button 3 */}],
```
That is, one or more groups of properties between braces `{}`, separated by commas, inside a set of square brackets `[]`. You can break lines to improve readability, as long as you don't forget the commas. 

Each button is defined by several parameters, separated by commas:
```js
{
    action : '/', /* url or js function (to trigger on click) */
    classes : [] , /* OPTIONAL: one or more class names, enclosed in quotation marks and separated by commas */
    before : false, /* OPTIONAL: if your buttons are displayed with flex, will place the button before the switcheroo avatars. */
    html : '', /* HTML code of what you want to place in your button */
    tooltip : '', /* OPTIONAL: text to be displayed by a tooltip */
}
```
You'll find an example in [init_custom-buttons.js](demo/init_custom-buttons.js).

Once generated, the classes will be formatted as `switcheroo__button--classname`.

## Appearance
Now that you've tailored Switcheroo to your needs, it's time to make it look a little more appealing.

By default, you can use the stylesheet created for the [Blank Theme](https://blank-theme.com/), which you can use anywhere else. It includes a number of CSS custom properties to help you change colors more easily. 

Copy and paste the contents of [switcheroo_blank_theme.css](css/switcheroo_blank_theme.css) and add it to your existing style sheet, in your admin panel, section `Display > Pictures and Colors > Colors & CSS > CSS Stylesheet`.

This CSS stylesheet works in conjunction with the attributes assigned to the Switcheroo navbar in the HTML code, remember :

```html
<nav id="switcheroo" class="switcheroo" direction="vertical" position="top"></nav>
```
Two options are visible in this code:
- `direction` can either take the value `vertical` or `horizontal` to set the orientation of the navbar
- `position` can be set to `top`, `static` or `bottom`, depending on whether you want the bar to be fixed at the top, at the bottom or not at all (static).
If you're writing your own CSS, these options won't work unless you write the corresponding CSS.

## Hide the prerequisites (optional)

### Remove the Toolbar
As promised, this little piece of CSS will get rid of the toolbar without disabling it, allowing the plugin to work. If it has added some unwanted space to the top of your forum, make sure the option "Fix the toolbar" is set to _No_ in your admin panel.
```css
#fa_toolbar, #fa_toolbar_hidden {
    display: none!important;
}
```

### Hide the main navbar
The default nav bar is required for the plugin to work, but you may be using a different one. The variable that displays it, `{GENERATED_NAV_BAR}`, can be found in the `overall_header` template.  
If it's not present in your template (if you're using a custom template), add this line to your code just after the opening `<body>` tag.
```html
    <div style="display: none;">{GENERATED_NAV_BAR}</div>
```
