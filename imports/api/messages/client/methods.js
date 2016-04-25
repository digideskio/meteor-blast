import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages.js';
import { sAlert } from 'meteor/juliancwirko:s-alert';

Meteor.methods({
  /**
   * Adding a chat message to the database.
   *
   * @param msg - A message object that has either a message, info, and error field.
   *   if a message.message exists, that's what gets entered into the db. The rest is for
   *   user alerts.
   */
  addChatMessage: function(msg) {

    if (!msg) {
      return;
    }

    if (msg.message && msg.message.length) {
      Messages.insert({_userId: Meteor.userId(), message: msg.message, date: new Date()});
    }
    if (msg.info) {
      sAlert.info(msg.info);
    }
    if (msg.error) {
      sAlert.error(msg.error);
    }

    /*
     The following code wrapped in Meteor.isServer will never run. This is because this method file is in the client
     folder. When this method gets called by the client, the client will run this version and the server will run
     the method with the same name in the server folder.
     */
    if (Meteor.isServer) {
      console.log('You will never see this console log.');
    }
  }
});