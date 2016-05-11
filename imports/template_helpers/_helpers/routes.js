import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

/**
 * Returns the current Route Name
 */
Template.registerHelper("getRouteName", () => FlowRouter.getRouteName());

/**
 * Returns true if the current route matches any of the names provided
 */
Template.registerHelper("isRouteName",
  (...names) => names.includes(FlowRouter.getRouteName()));