import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages.js';

Meteor.methods({

  /**
   * For the server side of addChatMessage, the function only cares if theres a message
   * property. The rest are alerts for the user.
   *
   * @param msg
   */
  addChatMessage: function(msg) {
    if (msg && msg.message && msg.message.length) {
      Messages.insert({_userId: Meteor.userId(), message: msg.message, date: new Date()});
    }
  }

});