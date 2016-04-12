import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Pages } from '../pages.js';

Meteor.methods({
  /**
   * This is an admin method. Because of this, we care more about hiding it from a nosey user. By leaving it
   * in the server folder only, users will not be able to see the code for it, like they would if it were also
   * in client/methods.
   *
   * We can put a this method in the client code with just some validation if we want to have access to
   * sAlert and give instance validation feedback to an admin, without having to do any DB manipulation.
   *
   * @param name - name of the page
   * @param key - name of the part of the page we're updating
   * @param value - new value for that part of the page
   */
  'updatePage': function(name, key, value) {
    if (Roles.userIsInRole(this.userId, ['admin'], 'admin-group')) {
      if (!key || !value || !(value+"").length) {
        // doesn't pass
      } else {
        var data = {};
        data[key] = value;
        Pages.upsert({name: name}, {$set: data});
      }
    }
  }
});