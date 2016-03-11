# :boom: Meteor Blast :boom:

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
* [pecl:loading](https://github.com/pcel/meteor-loading) - Loading screen for subscribing to lots of data.
* [lepozepo:accounting](https://github.com/Lepozepo/meteor-accounting/) - Working with currency data.
* [twbs:bootstrap](https://github.com/twbs/bootstrap/) - The popular and easy to use framework for html/css/js.
* [momentjs:moment](https://github.com/moment/moment/) - Formatting dates with ease.

#### Packages removed

The two packages below ship with Meteor. And though autopublish makes it easier to develop, automatically front-loading all your data to the client, it doesn't encourage a security first approach. I'd much rather allow access as needed while building my app, than start removing things before production and possibly miss something. If you're going for ease of use and aren't dealing with sensitive data, feel free to add these packages back in to avoid the whole pub/sub model.

* autopublish
* insecure

## Files and Directory Structure

The directory structure below is adapted from common practices. You can structure your Meteor app however you'd like, though certain directory names have special rules as seen below. Load order can be important and confusing if this is your first time using Meteor. If you follow the directory structure below, and your app is fairly simple, it will probably never come up. There will be certain situations where you'll need to know what get's loaded first. Be sure to check out the documentation for more on [File Load Order](http://docs.meteor.com/#/full/fileloadorder).

#### Project root structure

```
project-root
    ├─── .meteor (for meteor packages)
    ├─── client
    ├─── lib
    ├─── private
    ├─── public
    ├─── server
    └─── tests
```

#### `client` subfolder

```
client
  ├─── config
  ├─── stylesheets
  └─── templates
      ├─── _partials
      ├─── app
      └─── home
  main.js
````

The `client` folder holds everything that will be loaded to and accessible by the client. It's important to note that anything that you wrap in `if (Meteor.isServer) { ... }` won't be accessible by client code, but could still be viewed by the client. Make sure to keep anything sensitive, like passwords, API keys, etc in folders that are only available to the server. Again, the substructure of `client` is up to you. In the case of this boilerplate, I keep all client configurations, like account.js, in `config`. All css (there are less compiler packages) and other things related to styling in `stylesheets`. I like to separate templates by `_partials`: snippets and includes used my multiple templates, `app`: templates used throughout the app, like 404.html, and then folders structured by routes. 

#### `lib` subfolder

```
lib
  ├─── collections
  └─── routes
```

The `lib` folder is accessible by both the client and the server. It's where your routes are going to be located, and setting up your mongo collections. It's important to remember not to put any sensitive information here. The exception to this is setting up your collections. As long as you don't have the autopublish and insecure packages installed, collections will only be available to the client on a publish/subscribe basis.

#### `private` subfolder

```
private
  └─── config
```

The `private` subfolder is only available to the server. So why not just put it in the server folder? Think of the `private` folder as assets available to the server but not needed for the server to start up. Every time a client connects to the server on a new thread, it spins up the server loading process. This is a good place to hold large files the server may at some point, or settings and configuration files. If you're sharing your project on github, make sure to add files with sensitive information to your .gitignore. You don't want to publish your secret keys.

#### `public` subfolder

```
public
  └─── images
```

The `public` subfolder is available to the server and the client, but acts like the `private` subfolder in that it does not get loaded and pushed to the client. This is a good place for static assets like images.

#### `server` subfolder

```
server
  ├─── migrations
  └─── publications
  main.js
```

This is where all the server magic happens. You'll want to set up your publications here.

#### `tests` subfolder

```
tests
```

This subfolder is ignored by Meteor. There are incredible packages that exist for testing your apps locally like [velocity:core](https://github.com/meteor-velocity/velocity/). I have included this `tests` folder in my structure as a placeholder. I may add some sample testing in the future.

#### Important

* Paying attention to the directory structure is important to the security of your app. Be mindful of sensitive data and where it's located.
* The first thing to do when troubleshooting an unfamiliar bug is check it's location and ask yourself who's trying to access it.

## Resources

* [Full Meteor Documentation](http://docs.meteor.com/#/full/)
* [AtmoshpereJS](https://atmospherejs.com/) - Search Meteor Packages
* [Discover Meteor Book](https://www.discovermeteor.com/)

###### Notice

I am not affiliated with Meteor or any of the packages used above. If you have issues or questions regarding Meteor or those packages, I'd do my best to help, but they would be better directed to their respective owners. Any and all comments and suggestions on improving this particular boilerplate are welcomed and encouraged. Enjoy! :)
