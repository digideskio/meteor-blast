Template.nav.helpers({
  homeActive: function() {
    return Router.current().route.path(this) === "/";
  },
  aboutActive: function() {
    return Router.current().route.path(this) === "/about";
  },
  contactActive: function() {
    return Router.current().route.path(this) === "/contact";
  }
});