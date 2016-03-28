/**
 * Chat route
 */

Router.route("/chat", {
  name: 'chatHome',
  onBeforeAction: function() {
    // Not secure! Meteor.user = function() { return true; } in the console.
    // Make sure to protect the data in the publication as well
    if (!Meteor.user()) {
      return this.redirect('homeIndex');
    } else {
      this.next();
    }
  },
  data: function () {
    return {
      chatActive: true
    }
  }
});
