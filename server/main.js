// Starting point for the server

// From the percolate:migrations package
Meteor.startup(function() {
  Migrations.migrateTo(2);
});
