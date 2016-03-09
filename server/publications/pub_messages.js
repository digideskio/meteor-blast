/**
 * Publish messages for the chat page, but only if the user is logged in.
 */

Meteor.publish("messages", function(num) {
  return this.userId ? Messages.find({}, {limit: num || 50}) : [];
});