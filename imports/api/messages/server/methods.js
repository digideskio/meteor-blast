import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages.js';

Meteor.methods({

  /**
   * For the server side of addChatMessage, the function only cares if theres a message
   * property. The rest are alerts for the user.
   *
   * @param roomName - Always make sure this is lowerCase
   * @param msg
   */
  addChatMessage: function(roomName, msg) {
    if (roomName && roomName.length && msg && msg.message && msg.message.length) {
      Messages.insert({_userId: Meteor.userId(), roomName: roomName.toLowerCase(), message: msg.message, date: new Date()});
    }
  }

});