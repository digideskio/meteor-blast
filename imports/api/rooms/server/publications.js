import { Meteor } from 'meteor/meteor';
import { Rooms } from '../rooms.js';

/**
 * This is the simplest form of a Meteor publish method. Simply find a record in the
 * database, and return it to the client.
 */
Meteor.publish("getRoom", function(roomName) {
  return Rooms.find({nameToLowerCase: roomName.toLowerCase()});
});