
UserMethods = {
  getUserProfile: function(userId) {
    var user = Meteor.users.findOne({_id: userId});
    if (user) {
      return user.profile;
    }
  }
};