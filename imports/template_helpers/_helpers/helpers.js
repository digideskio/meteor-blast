/**
 * Here we will register some helpers that will be available to all of our templates.
 * For template helpers that are specific to a single template, you can register that
 * by doing Template.templateName.helper()
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

/**
 * In a lot of cases we'll want to get a value, like a template string or a setting value
 * and one won't exist. Let's create a template helper so that we can get a value or use
 * a default if one doesn't exist.
 */
Template.registerHelper("getValueOrDefault", (val, orDefault) => val || orDefault);

/**
 * Let's create an equals helper that returns true if all args are equal to each other
 * This is something that could be used across many projects, so if we get a few more of
 * these, we should abstract them away from this file so we can import them in other projects
 */
Template.registerHelper("equals", function(...items) {
  // Make sure the item is an array and that it has 3 elements
  // 3 because the last element is a hash object added by spacebars
  if (!Array.isArray(items) || items.length < 3) {
    throw new Error("Template helper <equals> is missing parameters. Do not send hashed input.");
  }
  // Pop off the Spacebars.kw hash object
  items.pop();
  // Filter the array for elements equal to the first and then see if the 2 lengths match
  return items.filter(el => el == items[0])
      .length === items.length;
});




/**
 * Returns the copyright holder
 */
Template.registerHelper('copyrightHolder', function(){
  return "EvermoreDev"
});
