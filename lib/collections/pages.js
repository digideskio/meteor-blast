/**
 * This is an example of allowing/denying access to certain CRUD functions
 * of the database by using the allow/deny methods of a collection object.
 *
 *
 * @type {Mongo.Collection}
 */
Pages = new Mongo.Collection("pages");

Pages.allow({
  update: function() {
    return Roles.userIsInRole(Meteor.user(), 'admin', 'admin-group');
  }
});