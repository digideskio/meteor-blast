/**
 * Package for maintaining user roles. Inspired by alanning:roles from Meteor
 * atmosphere.
 */

import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

let roles = new Mongo.collection("roles");

export const Roles = {

};

/**
 * Creates new roles in the roles database.
 * Enforces all roles to lowercase.
 *
 * @param role {String} Name of role to create
 */
Roles.createRole = role => {
  try {
    return roles.insert({name: role.trim().toLowerCase()});
  }
  catch (e) {
    throw new Error("Roles: problem inserting role. " + e);
  }
};

/**
 * Deletes a role in the database.
 * Note: Does not remove the role from users
 *
 * @param role {String} Name of role to delete
 */
Roles.deleteRoleByName = role => {
  try {
    return roles.remove({name: role.trim().toLowerCase()});
  }
  catch (e) {
    throw new Error("Roles: problem deleting role. " + e);
  }
};

/**
 * Deletes a role in the database.
 * Note: Does not remove the role from users
 *
 * @param roleId {String} ID of role to delete
 */
Roles.deleteRoleById = roleId => {
  try {
    return roles.remove({name: roleId})
  }
  catch (e) {
    throw new Error("Roles: problem deleting role. " + e);
  }
};

/**
 * Adds user(s) to role(s)
 * @param users {String|Object|Array} A single User object or ID or an array of User objects or User IDs
 * @param roles {String|Array} A role name or an array of row names.
 */
Roles.addUsersToRoles = (users, roles) => {

  if (!isArray(roles)) {
    roles = [roles];
  }
  if (!isArray(users)) {
    users = [users];
  }

  // Clean all the roles
  roles = roles.filter(r=>(typeof r === 'string' && r.trim().length > 0))
    .map(r=>r.trim().toLowerCase());

  // Make sure users is ids
  users = users.map(u => (typeof u === 'object' && u._id && typeof u._id === 'string') ?
    u._id : null).filter(u => u !== null);

  if (users.length && roles.length) {
    Meteor.users.update({_id: {$in: users}},
      {roles: {$addToSet: roles}}, {multi: true});
  }
};