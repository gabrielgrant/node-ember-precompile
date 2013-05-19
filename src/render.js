//
// Render Ember compiled Handlebars templates with Node
//
// This should support:
// - rendering template from file
// - rendering compiled template

context_ = require('./context');
var jQuery = require('jquery');
var vm = require('vm');

module.exports = {
  fromCompiledString: function (compiledTemplateString, templateName, templateContext) {

    var execContext = context_.getContext({
      // name of the handlebars template to compile
      template: templateName,

      // rendered handlebars template
      renderedTemplate: null,

      // template context
      context: templateContext,

      $: jQuery,
      jQuery: jQuery
    });

    // load compiled templates into context
    vm.runInContext(compiledTemplateString, execContext);

    vm.runInContext('  \
      view = Ember.View.create({template: Ember.TEMPLATES[template]});  \
      view.set("context", context);  \
      renderedTemplate = view.renderToBuffer();', execContext);

    return execContext.renderedTemplate.buffer;
  },
  //TODO fromRawString: function(){}
};

// vim: tabstop=8 expandtab shiftwidth=2 softtabstop=2
