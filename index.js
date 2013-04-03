var fs = require('fs');
var path = require('path');
var vm = require('vm');

var HANDLEBARSJS = fs.readFileSync(__dirname + '/vendor/handlebars-1.0.rc.2.js', 'utf8')
var EMBERJS = fs.readFileSync(__dirname + '/vendor/ember-1.0.pre.min.js', 'utf8')

module.exports = function (file) {
  //dummy jQuery
  var jQuery = function () { return jQuery }
  jQuery.ready = function () { return jQuery }
  jQuery.inArray = function () { return jQuery }
  jQuery.jquery = "1.7.1"
  jQuery.event = { fixHooks: {} }

  //dummy DOM element
  var element = {
    firstChild: function () { return element },
    innerHTML: function () { return element }
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

    // handlebars template to compile
    template: fs.readFileSync(file, 'utf8'),

    // compiled handlebars template
    templatejs: null
  }

  // window
  sandbox.window = sandbox

  // create a context for the vm using the sandbox data
  var context = vm.createContext(sandbox)

  // load Handlebars and Ember into the sandbox
  vm.runInContext(HANDLEBARSJS, context, 'ember.js')
  vm.runInContext(EMBERJS, context, 'ember.js')

  // compile the handlebars template inside the vm context
  vm.runInContext('templatejs = Ember.Handlebars.precompile(template).toString()', context)

  // extract the compiled template from the vm context and return it,
  // adding template to Ember.TEMPLATES when it is required
  var fileName = path.basename(file)
  var namedTemplateJs = 'Ember.TEMPLATES["' +
    fileName.replace(/.handlebars/, '').replace(/.hbs/, '') +
    '"] = Ember.Handlebars.template(' + context.templatejs + ');'

  return namedTemplateJs;
}

