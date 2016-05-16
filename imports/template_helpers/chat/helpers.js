// Import Meteor globals
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';
import { sAlert } from 'meteor/juliancwirko:s-alert';

// Import NPM packages

// Import the collections we need
import { Rooms } from '/imports/api/rooms/rooms.js';
import { Messages } from '/imports/api/messages/messages.js'

// Import our packages
import { Chatter } from '/imports/modules/chatter.js';
import { Keyboard } from '/imports/modules/keyboard.js';
import { Debug } from '/imports/modules/debug.js';

// Import our chat specific functions
import { F } from './_functions.js';

/**
 * Sidebar Helpers
 */
Template.chatSidebarRooms.helpers({
  /** Get all rooms **/
  rooms: () => {
    if (Meteor.user()) {
      return Rooms.find().fetch();
    }
  }
});

Template.chatSidebarAvailableUsers.helpers({
  /**
   * Gets all the logged in users for the room the current user is in
   */
  usersLoggedIn: () =>
    Meteor.users.find().fetch()
      .filter(u => u.status && u.status.online && u.currentRoomId === Meteor.user().currentRoomId)
});

Template.chatSidebarHelp.helpers({
  getDocFile: (docFile) => {
    // Set it as an empty string first, so the markdown parser doesn't error
    $.get('/docs/' + docFile, (res) => {
      Session.set(docFile, res);
    });
    return Session.get(docFile);
  }
});

/**
 * MainPanel Helpers
 */
Template.chatMainPanelWindow.helpers({
  /** Get all chat messages **/
  messages: () => {
    if (Meteor.user()) {
      return Messages.find({_roomId: Meteor.user().currentRoomId}, {sort: {date: 1}}).fetch();
    }
  },
  /** scrollToBottom in the template **/
  scrollToBottom: () => F.scrollToBottom(),
  /** Get the currentRoom data **/
  currentRoom: () => {
    if (Meteor.user()) {
      return Rooms.find({_id: Meteor.user().currentRoomId}).fetch()[0];
    }
  },
  /** Takes in a message index and compares it to the message before it.
      If the user id is the same, returns true. **/
  isSameMsgOwner: (msgIdx) => {
    let msgs = Messages.find({_roomId: Meteor.user().currentRoomId}, {sort: {date: 1}}).fetch();
    return (msgs && msgs[msgIdx-1] && msgs[msgIdx]
            && msgs[msgIdx-1]._userId == msgs[msgIdx]._userId
            && !msgs[msgIdx-1].type && !msgs[msgIdx].type);
  }
});

/**
 * Though the chatHome template is our main chat layout and it
 * includes all of the partials, helper functions we add here will
 * NOT be available to the partials.
 */
Template.chatHome.helpers({

});