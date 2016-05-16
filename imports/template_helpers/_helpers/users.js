import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { F } from './_functions';


/**
 * Subscribes to and returns a user
 */
Template.registerHelper("getUser", userId => {
  // If you're already subscribed to the user, Meteor will not "resubscribe"
  // Remember to set your own limitations on what information a user can see.
  // This will be done in your publication - See imports/api/users/server/publications.js
  // let len = Meteor.users.find({_id: userId}).fetch().length;
  // if (!len) {
    Meteor.subscribe("userProfileInfo", userId);
  // }
  return Meteor.users.find({_id: userId}).fetch()[0];
});

/**
 * Simple check to see if a user exists
 */
Template.registerHelper("userExists", userId => {
  let len = Meteor.users.find({_id: userId}).fetch().length;
  if (!len) {
    Meteor.subscribe("userProfileInfo", userId);
  }
  return Meteor.users.find({_id: userId}).fetch()[0];
});

