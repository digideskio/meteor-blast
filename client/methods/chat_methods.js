Meteor.methods({
  /**
   * Adding a chat message to the database. For now, not doing much validation
   * on the client insert, so that the message shows up immediately.
   * @param message
   */
   addChatMessage: function(message) {

    if (!message.length) {
      sAlert.error("Please enter a message.");
    } else {
      Messages.insert({_userId: this.userId, message: message, date: new Date()});
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