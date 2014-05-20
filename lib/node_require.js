// "built/almond" doesn't support nodejs CommonJs module fallback, so this require module
// serves as a way to expose node's `require()` function when needed.

if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
  // Should this be required outside of node, return an empty object
  return require || {};
});
