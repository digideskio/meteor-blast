# Meteor Blast

Meteor Blast is a boilerplate designed to get you up and running with the [Meteor](https://www.meteor.com/) javascript platform and creating websites quickly.

## Getting Started

Once you have installed Meteor and cloned the project, simply run `meteor` from the command line at the root of the project.

## Packages Included

* [accounts-password](https://atmospherejs.com/meteor/accounts-password) - Takes care of passwords, so you don't have to.
* [accounts-facebook](https://atmospherejs.com/meteor/accounts-facebook) - Easy configurable login with facebook!
* [accounts-twitter](https://atmospherejs.com/meteor/accounts-twitter) - Easy configurable login with twitter! 
* [alanning:roles](https://github.com/alanning/meteor-roles/) - Support for groups and roles for users
* [ian:accounts-ui-bootstrap-3](https://github.com/ianmartorell/meteor-accounts-ui-bootstrap-3/) - Templating with bootstrap for logging in
* [iron:router](https://github.com/iron-meteor/iron-router/) - The go to router for Meteor 
* [percolate:migrations](https://github.com/percolatestudio/meteor-migrations/) - Support for migrations on startup
* [lepozepo:accounting](https://github.com/Lepozepo/meteor-accounting/) - Working with currency data.
* [twbs:bootstrap](https://github.com/twbs/bootstrap/) - The popular and easy to use framework for html/css/js.
* [momentjs:moment](https://github.com/moment/moment/) - Formatting dates with ease.

#### Packages removed

The two packages below ship with Meteor. And though autopublish makes it easier to develop, automatically front-loading all your data to the client, it doesn't encourage a security first approach. I'd much rather allow access as needed while building my app, than start removing things before production and possibly miss something. If you're going for ease of use and aren't dealing with sensitive data, feel free to add these packages back in to avoid the whole pub/sub model.

* autopublish
* insecure
