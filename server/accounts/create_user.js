/**
 * Here we will update profile information once a user is created, such
 * that there is consistency for the profile object among different services
 */
Accounts.onCreateUser(function(options, user) {
  /**
   * Copy profile options if they exist
   */
  user.profile = {};
  // If there are profile options already set up
  if (options.profile) {
    user.profile = options.profile;
  }

  /**
   * Setting up a profile picture url
   */
  // For github users
  if (user.services && user.services.github) {
    user.profile.image = "https://avatars.githubusercontent.com/u/" + user.services.github.id;
  }
  // For default images matching the first letter of the profile name
  else if (user.profile && user.profile.name && (/[a-zA-Z]/).test(user.profile.name[0])) {
    user.profile.image = "/images/defaults/" + user.profile.name[0].toLocaleLowerCase() + ".png";
  }
  // Some default image if no other image was set
  else {
    user.profile.image = "/images/defaults/default.png";
  }

  /**
   * Some default settings
   */
  user.settings = {
    timestamp: true
  };

  /**
   * Add user to proper group
   */
  // Add user to a user group using the alanning:roles structure
  user.roles = {
    "user-group": [ "user" ]
  };

  // Return the user to be inserted into the DB
  return user;
});