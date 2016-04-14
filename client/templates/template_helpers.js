/**
 * Here we will register some helpers that will be available to all of our templates.
 * For template helpers that are specific to a single template, you can register that
 * by doing Template.templateName.helper() - See templates/chat/chat_helpers.js for
 * examples.
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

// Subscribes to and returns a user
Template.registerHelper("getUser", function(userId) {
  // If you're already subscribed to the user, Meteor will not "resubscribe"
  // Remember to set your own limitations on what information a user can see.
  // This will be done in your publication - See imports/api/users/server/publications.js
  Meteor.subscribe("userProfileInfo", userId);
  return Meteor.users.find({_id: userId}).fetch()[0];
});

// Gets Session data by some key
Template.registerHelper("getSessionData", function(key) {
  return Session.get(key);
});

// Returns the current Route Name
Template.registerHelper("getRouteName", function() {
  return FlowRouter.getRouteName();
});

// Returns true if the current route matches any of the names provided
Template.registerHelper("isRouteName", function (...names) {
  return names.includes(FlowRouter.getRouteName());
});

// Checks to see if FlowRouter passed a template string, otherwise uses the default string provided.
// We'll do this so we can overload templates and not have to provide the default in
// every route.
Template.registerHelper("getTemplate", function(template, defaultTemplate) {
  return template || defaultTemplate;
});

// Let's create an equals helper that returns true if all args are equal to each other
// This is something that could be used across many projects, so if we get a few more of
// these, we should abstract them away from this file so we can import them in other projects
Template.registerHelper("equals", function(...items) {
  if (!Array.isArray(items) || items.length < 3) {
    throw new Error("Template helper <equals> is missing parameters. Do not send hashed input.");
  }
  // Pop off the Spacebars.kw hash object
  items.pop();
  return items.filter(function(el) {
    return el == items[0];
  }).length == items.length;
});