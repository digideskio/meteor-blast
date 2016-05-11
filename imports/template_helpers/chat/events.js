// Import Meteor globals
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';
import { sAlert } from 'meteor/juliancwirko:s-alert';

// Import our packages
import { Chatter } from '/imports/modules/chatter.js';
import { Keyboard } from '/imports/modules/keyboard.js';
import { Debug } from '/imports/modules/debug.js';

// Import our chat specific functions
import { F } from './_functions.js';

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
    Meteor.call('addChatMessage', Chatter.parse(message));
    // Clear the form
    event.target.message.value = "";
    // Auto scroll to the bottom of the page
    F.scrollToBottom();
  },
  // Buttons by the message input
  "click .btn-chat": () => $('#chat_form').submit(),
  "click .btn-scroll": () => F.scrollToBottom(),
  "click .btn-expand, click .btn-compress": () =>
    $('.sidebar-panel, .btn-expand, .btn-compress').toggleClass('hide'),
  // Buttons in the sidebar header
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
  // Clicking on a user in the available users panel
  "click .loggedin-user": event => {
    Session.set('profileId', $(event.currentTarget).data('userid'));
    Session.set('sidebarTemplate', 'chatSidebarUserInfo');
  },
  "click .s-alert-box": event => sAlert.closeAll(),
  // Open all links in the chat in a new tab/window
  "click .message a":
    event => $(event.currentTarget).attr('target', '_blank')
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