// Import Meteor globals
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Roles } from 'meteor/alanning:roles';
import { Markdown } from 'meteor/markdown';
import { Messages } from '/imports/api/messages/messages.js'
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';

// Import npm packages
import moment from 'moment';

/**
 * Functions available only within the scope of this file
 */
var scrollToBottom = function() {
  var selector = $('.chat-window');
  if (selector[0]) {
    var height = selector.prop('scrollHeight');
    selector.stop().animate({scrollTop: height});
  }
};

/**
 * Sidebar Helpers
 */
Template.chatSidebarAvailableUsers.helpers({
  usersLoggedIn: function() {
    return Meteor.users.find().fetch().filter(function(u) {
      return u.status && u.status.online;
    });
  }
});

/**
 * MainPanel Helpers
 */
Template.chatMainPanelWindow.helpers({
  dateFormat: function(date) {
    return moment(date).format('MM/DD/YYYY hh:mm A');
  },
  messages: function() {
    return Messages.find({}, {sort: {date: 1}}).fetch();
  },
  isOwner: function(userId) {
    return userId == Meteor.userId();
  }
});

/**
 * Though the chatHome template is our main chat layout and it
 * includes all of the partials, helper functions we add here will
 * NOT be available to the partials.
 */
Template.chatHome.helpers({

});

/**
 * Unlike helpers, events are available to all partial templates
 * loaded within the "chatHome" template, though it may be cleaner
 * and more legible if the events were placed on their corresponding
 * partial templates. This works because events are available to newly
 * created DOM elements.
 */
Template.chatHome.events({
  "submit .new-message": function(event) {
    // Stop the form from submitting
    event.preventDefault();
    // Grab the value at message
    var message = event.target.message.value;
    // Call the method to add a chat message
    Meteor.call('addChatMessage', message);
    // Clear the form
    event.target.message.value = "";
    // Auto scroll to the bottom of the page
    scrollToBottom();
  },
  "click .btn-scroll": function() {
    scrollToBottom();
  },
  "click .btn-available-users": function() {
    Session.set('sidebarTemplate', 'chatSidebarAvailableUsers');
  },
  "click .btn-user-info": function() {
    Session.set('sidebarTemplate', 'chatSidebarUserInfo');
  },
  "click .btn-settings": function() {
    Session.set('sidebarTemplate', 'chatSidebarSettings');
  },
  "click .loggedin-user": function(event) {
    Session.set('profileId', $(event.currentTarget).data('userid'));
    Session.set('sidebarTemplate', 'chatSidebarUserInfo');
  }
});

/**
 * Listening to events for changing settings.
 */
Template.chatSidebarSettings.events({
  "click .switch-setting": function(event) {
    event.stopPropagation();
    var settingName = $(event.currentTarget).data('name');
    var status = $(event.currentTarget).attr('checked');
    // Update with the opposite of the current status
    $(event.currentTarget).attr('checked', !status);
    Meteor.call('updateSetting', settingName, !status);
  },
  "click .color-palette": function(event) {
    var color = $(event.currentTarget).data('color');
    Meteor.call('updateSetting', 'chatColor', color);
  }
});

/**
 * The template methods "onCreated" and "onRendered" fire automatically
 * and in that order. onRendered does not always mean that data is finished being
 * inserted into the DOM. There is no Meteor way to be sure that data being inserted
 * into the DOM, especially from a #each block, has completed.
 */
Template.chatHome.onCreated(function() {
  var self = this;
  
  // Init Session profileId for viewing profiles
  Session.set('profileId', Meteor.userId());
  // Set the sidebar template
  Session.set('sidebarTemplate', 'chatSidebarAvailableUsers');

  // Set up some subscriptions
  self.subscribe("onlineProfiles");
  self.subscribe("messages", function() {
    Tracker.afterFlush(function() {
      window.requestAnimationFrame(scrollToBottom);
    });
  });

  // Track Meteor.userId() - once it no longer exits
  // redirect the user
  self.autorun(function() {
    if (!Meteor.userId()) {
      FlowRouter.go('/');
    }
  });

});

/**
 * Here we're going to update the view of the settings panel
 * based on the saved user settings. If a setting changes in
 * the database, the view will be updated accordingly.
 *
 * It's important to note that the setting may not exist. We want to be
 * able to add settings later and not have to update every user in the DB. It
 * will only create a DB entry for that user if they change the default value.
 */
Template.chatSidebarSettings.onRendered(function() {
  var self = this;
  var settings = Meteor.user().settings;

  self.autorun(function() {
    if (!self.subscriptionsReady()) {
      return;
    }

    // Get all the switch-settings and set their default value
    $('.switch-setting').toArray().forEach(function(s) {
      $(s).attr('checked', settings && settings[$(s).data('name')]);
    });

  });
});
