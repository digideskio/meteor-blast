UserMethods = {
  getUserProfile: function(userId) {
    var user = Meteor.users.findOne({_id: userId});
    if (user) {
      return user.profile;
    }
  },
  isAdmin: function() {
    return Roles.userIsInRole(Meteor.user(), 'admin', 'admin-group');
  }
};