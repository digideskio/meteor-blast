import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages';

/**
 * Publish messages for the chat page, but only if the user is logged in.
 *
 * In case the client user has somehow managed to access our secure chat area,
 * we can still protect the messages from being sent by ensuring that only logged
 * in users receive any data from this publish method.
 */

Meteor.publish("messages", function (roomName, limit = 50) {
  // In the future, we may care more about which user has access, but for now
  // let's just make sure the user is actually logged in to our app
  if (this.userId) {
    var self = this;
    roomName = roomName.toLowerCase();
    console.log(roomName);

    var observable = Messages.find({roomName: roomName}, {limit: limit, sort: {date: -1}});

    // If we want to do some special things in the future
    var handle = observable.observeChanges({
      //added: function (id, doc) {
      //},
      //removed: function (id) {
      //},
      //changed: function(id) {
      //}
    });

    self.ready();

    // Stop observing the cursor when client unsubs.
    // Stopping a subscription automatically takes
    // care of sending the client any removed messages.
    self.onStop(function () {
      handle.stop();
    });

    return observable;
  }
});