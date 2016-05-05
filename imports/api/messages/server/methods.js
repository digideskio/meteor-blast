import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages.js';

Meteor.methods({

  /**
   * This is the server "addChatMessage". It's being passed an object. Validation on the chat message
   * is being done somewhere else. In the client "addChatMessage" if a validation error exists, the user
   * will be alerted and the message property will be empty. All the server cares about is that the user
   * exists and there is a message property on the object we receive.
   *
   * @param msg {Object} This is the message object
   */
  addChatMessage: function(msg) {
    if (msg && msg.message) {
      Messages.insert({_userId: Meteor.userId(), _roomId: Meteor.user().currentRoomId, message: msg.message, date: new Date()});
    }
  }

});