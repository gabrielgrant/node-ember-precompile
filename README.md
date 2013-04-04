Precompile Handlebars templates for Ember.js

Install
-------

    npm install -g ember-precompile

Usage
-----

This module has a similar interface to the Handlebars precompiler

    ember-precompile template... [-f OUTPUT_FILE]

If output file is omitted, the compiled template(s) will be printed to stdout.

The template's name (in the Ember.TEMPLATES object) is created by transforming
the original filename:

 1. the `.handlebars` or `.hbs` file extension is stripped
 2. any remaining `.` characters are replaced by `/` to support
    the [nested templates used by the new Ember Router][1]

[1]: http://emberjs.com/guides/routing/defining-your-routes/#toc_resources
