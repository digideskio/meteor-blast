import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages.js';

Meteor.methods({

  addChatMessage: function(message) {
    if (!message.length) {
      // do nothing
    } else {
      Messages.insert({_userId: this.userId, message: message, date: new Date()});
    }
  }

});