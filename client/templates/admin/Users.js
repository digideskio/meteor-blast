import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Session } from 'meteor/session';

Template.Users.onCreated(function(){
    this.autorun(()=> {
        this.subscribe('allUsers');

    });
});

Template.Users.helpers({
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

    dateFormat: function(){
        return moment(this.createdAt).format('MMMM DD, YYYY hh:mm');
    },

    userRoles: function(){
        return getRolesForUser(this._id);
    },

    isAdmin: function(){
        return (Roles.userIsInRole(this._id, ['admin'], 'admin-group'));
    },

    editMode: function(){
        return Session.get('currentUser') ? 'edit-mode': '';
    },
    currentEdit: function(){
        let user = Session.get('currentUser');
        return user._id === this._id;
    }
});

Template.Users.events({
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
