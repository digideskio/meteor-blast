Meteor.publish("userStatus", function() {
  var self = this,
    initializing = true;

  Meteor.users.find({"status.online": true}, {fields: {profile: 1}}).observeChanges({
    added: function(id, doc) {
      if (initializing) {
        self.added('userStatus', id, doc);
      }
    },
    removed: function(id) {
      self.removed('userStatus', id);
    },
    changed: function(id, field) {
      self.changed("messages", id, field);
    }
  });

  this.ready();
  initializing = false;
});