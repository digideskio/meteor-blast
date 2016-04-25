// Import Meteor globals
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Roles } from 'meteor/alanning:roles';
import { Markdown } from 'meteor/markdown';
import { Messages } from '/imports/api/messages/messages.js'
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';
import { Parse } from '/imports/parse.js';

// Import npm packages
import moment from 'moment';

/**
 * Functions available only within the scope of this file
 */
var scrollToBottom = () => {
  let selector = $('.chat-window');
  if (selector[0]) {
    let height = selector.prop('scrollHeight');
    selector.stop().animate({scrollTop: height});
  }
};

/**
 * Sidebar Helpers
 */
Template.chatSidebarAvailableUsers.helpers({
  usersLoggedIn: () =>
    Meteor.users.find().fetch()
      .filter(u => u.status && u.status.online)
});

/**
 * MainPanel Helpers
 */
Template.chatMainPanelWindow.helpers({
  dateFormat: date =>
    moment(date).format('MM/DD/YYYY hh:mm A'),
  messages: () =>
    Messages.find({}, {sort: {date: 1}}).fetch()
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
    let message = event.target.message.value;
    // Call the method to add a chat message
    Meteor.call('addChatMessage', Parse.parse(message));
    // Clear the form
    event.target.message.value = "";
    // Auto scroll to the bottom of the page
    scrollToBottom();
  },
  "click .btn-scroll": () => scrollToBottom(),
  "click .btn-available-users": () =>
    Session.set('sidebarTemplate', 'chatSidebarAvailableUsers'),
  "click .btn-user-info": () =>
    Session.set('sidebarTemplate', 'chatSidebarUserInfo'),
  "click .btn-settings": () =>
    Session.set('sidebarTemplate', 'chatSidebarSettings'),
  "click .btn-rooms": () =>
    Session.set('sidebarTemplate', 'chatSidebarRooms'),
  "click .btn-help": () =>
    Session.set('sidebarTemplate', 'chatSidebarHelp'),
  "click .loggedin-user": event => {
    Session.set('profileId', $(event.currentTarget).data('userid'));
    Session.set('sidebarTemplate', 'chatSidebarUserInfo');
  },
  "click .alert": event =>
    $(event.currentTarget).addClass('hide')
});

/**
 * Listening to events for changing settings.
 */
Template.chatSidebarSettings.events({
  "click .switch-setting": event => {
    event.stopPropagation();
    let settingName = $(event.currentTarget).data('name');
    let status = $(event.currentTarget).attr('checked');
    // Update with the opposite of the current status
    $(event.currentTarget).attr('checked', !status);
    Meteor.call('updateSetting', settingName, !status);
  },
  "click .color-palette": event => {
    let color = $(event.currentTarget).data('color');
    Meteor.call('updateSetting', 'chatColor', color);
  }
});

/**
 * The template methods "onCreated" and "onRendered" fire automatically
 * and in that order. onRendered does not always mean that data is finished being
 * inserted into the DOM. There is no Meteor way to be sure that data being inserted
 * into the DOM, especially from a #each block, has completed.
 */
Template.chatHome.onCreated(() => {
  // Init Session profileId for viewing profiles &
  // Set the sidebar template
  Session.set({
    'profileId': Meteor.userId(),
    'sidebarTemplate': 'chatSidebarAvailableUsers'
  });

  // Set up some subscriptions
  Template.instance().subscribe("onlineProfiles");
  Template.instance().subscribe("messages", () =>
    Tracker.afterFlush(() =>
      window.requestAnimationFrame(scrollToBottom))
  );

  // Track Meteor.userId() - once it no longer exits
  // redirect the user
  Template.instance().autorun(() => {
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
Template.chatSidebarSettings.onRendered(() => {
  let settings = Meteor.user().settings;

  Template.instance().autorun(() => {
    if (!Template.instance().subscriptionsReady()) {
      return;
    }

    // Get all the switch-settings and set their default value
    // Because this is being done in autorun(), if any of these values
    // change, this will rerun
    $('.switch-setting').toArray().forEach(s =>
        $(s).attr('checked', settings && settings[$(s).data('name')]));
  });

});
