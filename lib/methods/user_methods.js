Meteor.methods({
  /**
   * Meteor.methods get called by the client and the server simultaneously
   * when invoked by the client. This allows us to update the client's version
   * of the database immediately - latency compensation. If for whatever reason,
   * the server responds with a different idea of how the database should look,
   * it will take precedence and the changes the client made will be updated.
   *
   * For instance, if there are complex validation calculations, we can insert right
   * away to the client db right away. If validation fails, the client db will be reverted.
   *
   * @param settingName
   * @param value
   */
  "updateSetting": function(settingName, value) {
    var update = {};
    update[settingName] = value;


    // This is for latency compensation. Let the client update the client db right away.
    if (Meteor.isClient) {
      Meteor.users.update({_id: this.userId}, {$set: {settings: update}});
    }
    // Now if the server is making the call we can be assured that none of the global
    // variables have been tampered with
    if (Meteor.isServer) {

      Meteor.users.update({_id: this.userId}, {$set: {settings: update}});
    }
  }
});