/**
 * Some data to display on the pages that can be edited reactively by admins
 */

Migrations.add({
    version: 3,
    up: function() {
        Pages.insert({name: 'home', title: 'Welcome to the Homepage', subtitle: 'Some catchy subtitle'});
    },
    down: function() {
        Pages.remove();
    }
});
