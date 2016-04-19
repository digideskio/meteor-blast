import { Migrations } from 'meteor/percolate:migrations';
import { Pages } from '/imports/api/pages/pages.js';

/**
 * Some data to display on the pages that can be edited reactively by admins
 */

Migrations.add({
    version: 3,
    up: function() {
        Pages.insert({name: 'homeIndex', title: 'Welcome to the Homepage', subtitle: 'Some catchy subtitle'});
        Pages.insert({name: 'homeAbout', title: 'About Us', subtitle: 'Some stuff about us.', text: 'Some paragraph style stuff about us'});
    },
    down: function() {
        Pages.remove();
    }
});
