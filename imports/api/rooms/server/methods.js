import { Meteor } from 'meteor/meteor';
import { Rooms } from '../rooms.js';
import { sAlert } from 'meteor/juliancwirko:s-alert';

Meteor.methods({
  /**
   * Update a room topic
   */
  editRoomTopic: function(topic) {
    Rooms.update({topic: topic});
  }
});