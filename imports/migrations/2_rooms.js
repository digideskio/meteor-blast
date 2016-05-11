import { Migrations } from 'meteor/percolate:migrations';
import { Rooms } from '/imports/api/rooms/rooms.js';

/**
 * For now add one chat room.
 */
Migrations.add({
  version: 2,
  up: function() {
    Rooms.insert({name: 'Meteor-Blast', nameToLowerCase: 'meteor-blast', topic: 'Admins can set the topic with /topic'});
  },
  down: function() {
    Rooms.remove();
  }
});
