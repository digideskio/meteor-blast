import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';


Template.adminUsers.onCreated(function(){
  Template.instance().autorun(()=> {
    Template.instance().subscribe('allUsers');
  });
});

Template.adminUsers.helpers({
  users: () => Meteor.users.find().fetch()
});

Template.adminUsers.events({
  'click .toggle-admin':
    event =>  {
      Meteor.call('toggleAdmin', $(event.currentTarget).data('userid'));
    }
});
