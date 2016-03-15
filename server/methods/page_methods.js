Meteor.methods({
  'updatePage': function(name, key, value) {
    var data = {};
    data[key] = value;
    console.log(data);
    Pages.upsert({name: name}, {$set: data});
  }
});