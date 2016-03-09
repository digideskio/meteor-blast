Router.route("/chat", {
  name: 'chatHome',
  onBeforeAction: function() {
    if (!Meteor.userId()) {
      return this.redirect('homeIndex');
    } else {
      this.next();
    }
  },
  waitOn: function () {
    this.subscribe("messages");
  },
  data: function () {
    return {
      chatActive: true,
      messages: Messages.find().fetch().reverse()
    }
  }
});