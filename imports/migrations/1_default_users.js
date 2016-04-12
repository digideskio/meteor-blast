import { Migrations } from 'meteor/percolate:migrations';

/**
 * User migrations
 * Using alanning:roles package and percolate:migrations package
 *
 * This migration gets us started with two sample users. One with admin
 * status and one normal user.
 */

Migrations.add({
	version: 1,
	up: function() {
    var id;
    id = Accounts.createUser({
      username: 'admin',
      password: 'password',
      email: 'admin@email.com',
      profile: {name: 'Admin Name'}
    });
    Roles.addUsersToRoles(id, 'admin', 'admin-group');

    id = Accounts.createUser({
      username: 'user',
      password: 'password',
      email: 'user@email.com',
      profile: {name: 'User Name'}
    });
    Roles.addUsersToRoles(id, 'user', 'user-group');

	},
  down: function() {
    // Remove all the users
    Meteor.users.remove({});
  }
});

