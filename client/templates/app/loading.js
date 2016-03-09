Template.loading.rendered = function () {
  if ( ! Session.get('loadingSplash') ) {
    this.loading = window.pleaseWait({
      logo: '/images/icons/meteor.png',
      backgroundColor: '#7f8c8d',
      loadingHtml: message + spinner
    });
    Session.set('loadingSplash', true); // just show loading splash once
  }
};

Template.loading.destroyed = function () {
  if ( this.loading ) {
    this.loading.finish();
    delete Session.keys['loadingSplash'];
  }
};

var message = '<p class="loading-message">Just a second</p>';
var spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';