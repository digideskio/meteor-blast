/**
 * Publish messages for the chat page, but only if the user is logged in.
 */

Meteor.publish("messages", function (limit) {
    var self = this;
    limit = limit || 50;

    var observable = Messages.find({}, {limit: limit, sort: {date: -1}});

    var handle = observable.observeChanges({
        //added: function (id, doc) {
        //    self.added('messages', id, {message: doc.message, date: doc.date, profile: UserMethods.getUserProfile(doc._userId)});
        //},
        //removed: function (id) {
        //    self.removed('messages', id);
        //},
        //changed: function(id, fields) {
        //    // The _userId reference never changes, but the data it refs may have.
        //    // Let's get access to the doc and change it as if we were adding it
        //    var doc = Messages.findOne({_id: id});
        //    self.changed("messages", id, {message: doc.message, date: doc.date, profile: UserMethods.getUserProfile(doc._userId)});
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
});