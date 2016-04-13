/**
 * This file is meant to destroy global objects, such that Meteor will
 * be forced to use imports properly. This is only to ensure that this
 * version of the app will work once Meteor stops using globals and goes
 * strictly to ES2015 modules.
 */

// **** Nuke Meteor Atmosphere Globals ****

// meteor/meteor
Meteor = null;

// meteor/session
Session = null;

// meteor/juliancwirko:s-alert
sAlert = null;

// meteor/markdown
Markdown = null;

// Currently breaks some packages, like s-alert
// meteor/kadira:flow-router
//FlowRouter = null;

// meteor/alanning:roles
Roles = null;
