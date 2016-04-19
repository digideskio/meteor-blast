import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

Template.nav.onRendered(() =>
  $('.button-collapse').sideNav()
);