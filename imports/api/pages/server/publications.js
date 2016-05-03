import { Meteor } from 'meteor/meteor';
import { Roles } from '/imports/roles.js';
import { Pages } from '../pages.js';

/**
 * This is the simplest form of a Meteor publish method. Simply find a record in the
 * database, and return it to the client.
 */
Meteor.publish("getPageData", function(template) {
  return Pages.find({name: template});
});

// Meteor.publish('allUsers', function(){
//     if(Roles.userIsInRole(this.userId, ['admin'], 'admin-group'))
//     return Meteor.users.find({})
// });
