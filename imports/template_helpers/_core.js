/**
 * Here we will register some helpers that will be available to all of our templates.
 * For template helpers that are specific to a single template, you can register that
 * by doing Template.templateName.helper() - See templates/chat/chat_helpers.js for
 * examples.
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Roles } from '/imports/modules/roles.js';
import moment from 'moment';

/**
 * Subscribes to and returns a user
 */
Template.registerHelper("getUser", userId => {
  // If you're already subscribed to the user, Meteor will not "resubscribe"
  // Remember to set your own limitations on what information a user can see.
  // This will be done in your publication - See imports/api/users/server/publications.js
  Meteor.subscribe("userProfileInfo", userId);
  return Meteor.users.find({_id: userId}).fetch()[0];
});

/**
 * Simple check to see if a user exists
 */
Template.registerHelper("userExists", userId => {
  Meteor.subscribe("userProfileInfo", userId);
  return !!Meteor.users.find({_id: userId}).fetch()[0];
});

/**
 * Gets Session data by some key
 */
Template.registerHelper("getSessionData", key => Session.get(key));

/**
 * Sets Session key with some data
 */
Template.registerHelper("setSessionData",
  (key, data) => Session.set(key, data));

/**
 * Checks to see if the user has a role
 */
Template.registerHelper("hasRole",
  (user, role) => Roles.userHasRole(user, role));

/**
 * Returns the current Route Name
 */
Template.registerHelper("getRouteName", () => FlowRouter.getRouteName());

/**
 * Returns true if the current route matches any of the names provided
 */
Template.registerHelper("isRouteName",
  (...names) => names.includes(FlowRouter.getRouteName()));

/**
 * In a lot of cases we'll want to get a value, like a template string or a setting value
 * and one won't exist. Let's create a template helper so that we can get a value or use
 * a default if one doesn't exist.
 */
Template.registerHelper("getValueOrDefault", (val, orDefault) => val || orDefault);

/**
 * Let's create an equals helper that returns true if all args are equal to each other
 * This is something that could be used across many projects, so if we get a few more of
 * these, we should abstract them away from this file so we can import them in other projects
 */
Template.registerHelper("equals", function(...items) {
  // Make sure the item is an array and that it has 3 elements
  // 3 because the last element is a hash object added by spacebars
  if (!Array.isArray(items) || items.length < 3) {
    throw new Error("Template helper <equals> is missing parameters. Do not send hashed input.");
  }
  // Pop off the Spacebars.kw hash object
  items.pop();
  // Filter the array for elements equal to the first and then see if the 2 lengths match
  return items.filter(el => el == items[0])
      .length === items.length;
});

/**
 * Uses momentJS to format a date
 */
Template.registerHelper("dateFormat",
  date => moment(date).format('MM/DD/YYYY hh:mm A'));

/**
 * Returns the current year
 */
Template.registerHelper('currentYear', function(){
  return new Date().getFullYear();
});

/**
 * Returns the copyright holder
 */
Template.registerHelper('copyrightHolder', function(){
  return "EvermoreDev"
});
