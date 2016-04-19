import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.loading.rendered = () => {
  if ( ! Session.get('loadingSplash') ) {
    Template.instance().loading = window.pleaseWait({
      logo: '/images/icons/meteor.png',
      backgroundColor: '#7f8c8d',
      loadingHtml: message + spinner
    });
    Session.set('loadingSplash', true); // just show loading splash once
  }
};

Template.loading.destroyed = function () {
  if ( Template.instance().loading ) {
    Template.instance().loading.finish();
    delete Session.keys['loadingSplash'];
  }
};

var message = '<p class="loading-message">Just a second</p>';
var spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';