/**
 * Functions available only within the scope of _helpers
 */

import { Meteor } from 'meteor/meteor';

export const F = { };

/**
 * Subscribes to a user if not already in the local DB
 * @param userId
 */

F.subscribeToUser = userId => {
  // let len = Meteor.users.find({_id: userId}).fetch().length;
  // if (!len) {
    Meteor.subscribe("userProfileInfo", userId);
  // }
};
