Meteor.publish("onlineProfiles", function() {
  var handle = Meteor.users.find({"status.online": true}, {fields: {profile: 1, settings: 1}});
  handle.observeChanges({
    added: function() {
      console.log("Something was added");
    },
    removed: function() {

    },
    changed: function() {

    }
  });
  return handle;
});