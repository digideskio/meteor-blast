/**
 * This is an example of a Meteor publish method. Right now, the only thing being returned to
 * the client is all users that are online. Also, the only fields being sent back to the client
 * are the profile and settings of each online user. It's important we do that here, to protect
 * from other sensitive data within a user table from being sent to the client.
 *
 * This example includes some empty methods: added, removed, changed. We can do some special
 * things if any of those events happen. For instance, if a new online user is "added" to this
 * subscription, we can send a notification to the client that a "New user has signed on".
 */
Meteor.publish("onlineProfiles", function() {
  var handle = Meteor.users.find({"status.online": true}, {fields: {profile: 1, settings: 1}});
  handle.observeChanges({
    added: function() {
    },
    removed: function() {
    },
    changed: function() {
    }
  });
  return handle;
});

Meteor.publish("userProfileInfo", function(userId) {
  return Meteor.users.find({_id: userId}, {fields: {profile: 1, settings: 1}});
});