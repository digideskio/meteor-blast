import { Mongo } from 'meteor/mongo';
import { Roles } from '/imports/modules/roles.js';

/**
 * This is an example of allowing/denying access to certain CRUD functions
 * of the database by using the allow/deny methods of a collection object.
 *
 *
 * @type {Mongo.Collection}
 */
export const Pages = new Mongo.Collection("pages");

Pages.allow({
  update: function() {
    return Roles.userHasRole(Meteor.user(), 'admin');
  }
});