import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Roles } from '/imports/modules/roles.js';

/**
 * Checks to see if the user has a role
 */
Template.registerHelper("hasRole",
  (user, role) => Roles.userHasRole(user, role));