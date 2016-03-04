//TODO: Change your routes

Router.route("/", function() {
  this.render('homeIndex');
}, {
  name: 'homeIndex'
});

Router.route("/about", function() {
  this.render('homeIndex');
}, {
  name: 'homeAbout'
});

Router.route("/contact", function() {
  this.render('homeContact');
}, {
  name: 'homeContact'
});

// Example of some routing with subscribing and params

//Router.route("/sample/:page", {
//	name : 'sample',
//	waitOn : function() {
//	  return [Meteor.subscribe("items", 1),
//	  		  Meteor.subscribe("moreItems")];
//	},
//	data : function() {
//		return {page: this.params.page};
//	}
//});