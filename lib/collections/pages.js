Pages = new Mongo.Collection("pages");

Pages.allow({
  update: function() {
    return Roles.userIsInRole(Meteor.user(), 'admin', 'admin-group');
  }
});