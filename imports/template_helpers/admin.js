import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Roles } from '/imports/roles.js';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';


Template.adminUsers.onCreated(function(){
  this.autorun(()=> {
    this.subscribe('allUsers');
  });
});

Template.adminUsers.helpers({
  users: function(){
    return Meteor.users.find();

  },
  profilePic: function(){
    return this.profile.image;
  },

  username: function(){
    return this.username;
  },

  userEmail: function(){
    return this.emails[0].address;
  },
  userRoles: function(){
    return getRolesForUser(this._id);
  },
  isAdmin: () => Roles.userHasRole(Meteor.userId(), 'admin'),

  editMode: function(){
    return Session.get('currentUser') ? 'edit-mode': '';
  },
  currentEdit: function(){
    let user = Session.get('currentUser');
    return user._id === this._id;
  }
});

Template.adminUsers.events({
  'click .user_id': function(){
    Session.set('currentUser', this);
  },
  'click .toggle-admin': function(){
    Meteor.call('toggleAdmin', this._id);
  },
  'click .close-edit-mode': function(){
    Session.set('currentUser', null);
  }
});
