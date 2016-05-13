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

// For our client only storage of the user's message history
let MessageHistory = new Mongo.Collection(null);
// Keep track of the index for traversing through message history
let messageCursor = 0;

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

    // insert the message into the users local history
    if (message && message.length) {
      MessageHistory.insert({message: message});
    }
    // Reset the messageCursor to the length of MessageHistory
    messageCursor = MessageHistory.find().count();

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

/**
 * Handling key events for the entire document -
 * Disabling keys outside of the message field and creating some
 * keyboard shortcuts
 */
$(document).on('keydown', function(event) {
  /** Commands anywhere on the page **/
  // ALT is our command key, so prevent it from doing anything by itself
  if (Keyboard.isKey(Keyboard.ALT, event)) {
    event.preventDefault();
  }
  // ALT + T - simulate the /time command
  if (Keyboard.isKey(Keyboard.T, event, {altKey: true})) {
    Meteor.call("addChatMessage", Chatter.parse("/time"));
    return;
  }
  else if (Keyboard.isKey(Keyboard.DOWN_ARROW, event, {altKey: true})) {
    F.scrollToBottom();
    return;
  }

  /** Outside of the message field **/
  // Send the focus back to the message field on all keys expect up, down, and alt
  if (!$(event.target).is('input') &&
    !Keyboard.isKey([Keyboard.DOWN_ARROW, Keyboard.UP_ARROW, Keyboard.ALT], event)) {
    event.preventDefault();
    // Showing an example of alerting the user on
    // a keydown outside of the message field.
    if (Keyboard.isKey(Keyboard.BACKSPACE, event)) {
      sAlert.info("The backspace key has been disabled.");
    }
    // Return focus to the message field
    $('.new-message-input').focus();
  } else {
    /** Inside the message field **/
    // Up arrow to travel up through message history
    if (Keyboard.isKey(Keyboard.UP_ARROW, event)) {
      let messageHistory = MessageHistory.find().fetch();
      if (messageHistory.length) {
        // Reset if out of bounds
        messageCursor = (messageCursor > messageHistory.length || messageCursor < 1) ?
          messageHistory.length : messageCursor;
        $('.new-message-input').focus().val(messageHistory[messageCursor-1].message);
        messageCursor--;
      }
    }
    // Down arrow to travel down through message history
    else if (Keyboard.isKey(Keyboard.DOWN_ARROW, event)) {
      let messageHistory = MessageHistory.find().fetch();
      if (messageHistory.length) {
        // Reset if out of bounds
        messageCursor = (messageCursor >= messageHistory.length - 1 || messageCursor < -1) ?
          -1 : messageCursor;
        $('.new-message-input').focus().val(messageHistory[messageCursor-1].message);
        messageCursor++;
      }
    }
  }

});