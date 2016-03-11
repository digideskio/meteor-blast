/**
 * Publish messages for the chat page, but only if the user is logged in.
 */

//Meteor.publish("messages", function(num) {
//  // Normally you don't want to sort on the server side (unless it's a very large
//  // amount of data or you need to sort in the query to get the right documents
//  // Here, we need the newest messages, so we're going to sort by date.
//
//  // Make sure the user is logged in to receive messages
//  if (this.userId) {
//    return Messages.find({},
//        {
//          limit: num || 50,
//          sort: {date: -1}
//        });
//  } else {
//    // Return an empty array so the waitOn method doesn't hang
//    return [];
//  }
//});

// server: publish the current size of a collection
Meteor.publish("messages", function (limit) {
    var self = this;
    var initializing = true;

    // observeChanges only returns after the initial `added` callbacks
    // have run. Until then, we don't want to send a lot of
    // `self.changed()` messages - hence tracking the
    // `initializing` state.
    var handle = Messages.find({}, {limit: limit || 50, sort: {date: -1}}).observeChanges({
        added: function (id, doc) {
            var user = Meteor.users.find({_id: doc._userId}).fetch();
            self.added('messages', id, {message: doc.message, date: doc.date, profile: user.profile});
            if (!initializing)
                self.changed("messages", id, {message: doc.message, date: doc.date, profile: user.profile});
        },
        removed: function (id) {
            self.removed('messages', id);
        },
        changed: function(id, fields) {
            self.changed('messages', id, fields);
        }
    });

    // Instead, we'll send one `self.added()` message right after
    // observeChanges has returned, and mark the subscription as
    // ready.
    initializing = false;
    //self.added("counts", roomId, {count: count});
    self.ready();

    // Stop observing the cursor when client unsubs.
    // Stopping a subscription automatically takes
    // care of sending the client any removed messages.
    self.onStop(function () {
        handle.stop();
    });
});