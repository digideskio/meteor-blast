//TODO: Change your routes

Router.route("/", {
  name: 'homeIndex',
  data: function() {
    return {
      homeActive: true
    }
  }
});

/**
 * This is an example of a route rendering a template different from it's name
 */
Router.route("/about", {
    template: 'homeIndex',
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