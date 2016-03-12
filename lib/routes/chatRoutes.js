/**
 * Chat route
 *
 * IMPORTANT: In the data section of /chat once we have subscribed to messages
 * we are receiving a cursor. It's very important that our cursor here matches
 * the cursor from our subscription or the messages will not be reactive.
 * We are sorting messages by date in the publication to receive the latest
 * dates, however if we just do Messages.find({}) here, our cursors will not match.
 * We can do whatever we want to the array after we fetch it, but before that, we
 * want our publication cursor and the cursor we pull from it to match.
 */

Router.route("/chat", {
  name: 'chatHome',
  onBeforeAction: function() {
    // TODO: WARNING - This can be circumvented in the console by simply doing
    // Meteor.userId = function() { return true; }
    if (!Meteor.userId()) {
      return this.redirect('homeIndex');
    } else {
      this.next();
    }
  },
  waitOn: function () {
    if (Meteor.userId()) {
      return Meteor.subscribe("messages");
    }
  },
  data: function () {
    return {
      chatActive: true
    }
  }
});
