import { Router } from 'meteor/iron:router';

Router.route("/", {
  name: 'homeIndex',
  data: function() {
    return {
      homeActive: true
    }
  }
});

Router.route("/about", {
    template: 'homeAbout',
    name: 'homeAbout',
    data: function () {
      return {
        aboutActive: true
      }
    }
});

Router.route("/contact", {
  name: 'homeContact',
  data: function () {
    return {
      contactActive: true
    }
  }
});