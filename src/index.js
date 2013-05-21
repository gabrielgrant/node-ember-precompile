var fs = require('fs');
var path = require('path');
var vm = require('vm');
var context_ = require('./context');

module.exports = function (file, options) {
  var baseDir = options.baseDir || (path.dirname(file) + "/")

  var context = context_.getContext({
    // handlebars template to compile
    template: fs.readFileSync(file, 'utf8'),

    // compiled handlebars template
    templatejs: null
  });

  // compile the handlebars template inside the vm context
  vm.runInContext('templatejs = Ember.Handlebars.precompile(template).toString()', context)

  // extract the compiled template from the vm context and return it,
  // adding template to Ember.TEMPLATES when it is required
  var fileName = file.replace(baseDir, '')
  var templateName = fileName.replace(/\.(handlebars|hbs)$/, '').replace(/\./g, '/')
  var namedTemplateJs = 'Ember.TEMPLATES["' +
    templateName +
    '"] = Ember.Handlebars.template(' + context.templatejs + ');'

  return namedTemplateJs;
}

module.exports.context = context_;
module.exports.render = require('./render');
