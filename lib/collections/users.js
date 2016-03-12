// We are using the Meteor Accounts package so we do not need to create a new collection
// This is for allow/deny methods

// We don't want the user to be able to directly update their own profile, which is the default
Meteor.users.deny({
  update: function() {
    return true;
  }
});