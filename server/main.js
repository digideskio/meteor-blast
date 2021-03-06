/**
 * This is the main entry point for the server.
 */

import { Meteor } from 'meteor/meteor';

// Import all the collection api's needed by the server
import '/imports/api/messages/server/';
import '/imports/api/pages/server/';
import '/imports/api/users/server/';
import '/imports/api/rooms/server/';

import { Migrations } from 'meteor/percolate:migrations';
import '/imports/migrations/';


Meteor.startup(() => {
  Migrations.migrateTo(4);
});
