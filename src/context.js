//
// Sets up the context needed to use Ember with Node
//

var fs = require('fs');
var vm = require('vm');

var HANDLEBARSJS = fs.readFileSync(__dirname + '/../vendor/handlebars-1.0.0-rc.4.js', 'utf8')
var EMBERJS = fs.readFileSync(__dirname + '/../vendor/ember-1.0.0-rc.5.js', 'utf8')

function getBaseSandbox() {

  //dummy jQuery
  var jQuery = function () { return jQuery }
  jQuery.ready = function () { return jQuery }
  jQuery.inArray = function () { return jQuery }
  jQuery.jquery = "1.8.1"
  jQuery.event = { fixHooks: {} }

  //dummy DOM element
  var element = {
    firstChild: function () { return element },
    innerHTML: function () { return element },
    // needed for "movesWhitespace()" test
    childNodes: [
      {nodeValue: 'Test: '},
      {nodeValue: ''},
      {nodeValue: 'Value'}
    ]
  }

  var sandbox = {
    // DOM
    document: {
      createRange: false,
      createElement: function () { return element }
    },

    // Console
    console: console,

    // jQuery
    jQuery: jQuery,
    $: jQuery,

    // setTimeout is needed by Ember's run loop
    setTimeout: setTimeout
  }

  // window
  sandbox.window = sandbox;

  return sandbox;
}

function getContext(sandboxExtras){
  sandbox = getBaseSandbox();
  sandboxExtras = sandboxExtras || {};
  for (var attrname in sandboxExtras){
    sandbox[attrname] = sandboxExtras[attrname];
  }
  
  // create a context for the vm using the sandbox data
  var context = vm.createContext(sandbox)

  // load Handlebars and Ember into the sandbox
  vm.runInContext(HANDLEBARSJS, context, 'handlebars.js')
  vm.runInContext(EMBERJS, context, 'ember.js')
  return context;
}

module.exports = {
  getContext: getContext,
  getBaseSandbox: getBaseSandbox
};

// vim: tabstop=8 expandtab shiftwidth=2 softtabstop=2
