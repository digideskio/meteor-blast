import { Meteor } from 'meteor/meteor';
import { Pages } from '../pages.js';

/**
 * This is the simplest form of a Meteor publish method. Simply find a record in the
 * database, and return it to the client.
 */
Meteor.publish("getPageData", function(template) {
  return Pages.find({name: template});
});