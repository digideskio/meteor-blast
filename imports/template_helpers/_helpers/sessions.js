import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

/**
 * Gets Session data by some key
 */
Template.registerHelper("getSessionData", key => Session.get(key));

/**
 * Sets Session key with some data
 */
Template.registerHelper("setSessionData",
  (key, data) => Session.set(key, data));