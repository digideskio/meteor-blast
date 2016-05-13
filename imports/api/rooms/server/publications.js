import { Meteor } from 'meteor/meteor';
import { Rooms } from '../rooms.js';

/**
 * This is the simplest form of a Meteor publish method. Simply find a record in the
 * database, and return it to the client.
 */
Meteor.publish("getRoom", (roomName) => {
  return Rooms.find({nameToLowerCase: roomName.toLowerCase()});
});

Meteor.publish("getRooms", () => {
  return Rooms.find();
});