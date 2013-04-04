#! /bin/bash

# run this from the top of the node-ember-precompile repo

TEST_INSTALL_DIR="/tmp/ember-precompile-test-$(date +%s)"

PACKAGE_DIR=$(pwd)
TEST_DIR="$PACKAGE_DIR/test"

mkdir "$TEST_INSTALL_DIR"
pushd  "$TEST_INSTALL_DIR"
npm install "$PACKAGE_DIR"

# round-trip-ish test
./node_modules/.bin/ember-precompile "$TEST_DIR/test1.hbs" > template.js
cat template.js | ./node_modules/.bin/ember-render test1 --context '{"thing": "its and it"}'

# full nested template test
./node_modules/.bin/ember-precompile "$TEST_DIR/test1.hbs"  "$TEST_DIR/test.two.hbs" > template.js
cat template.js | ./node_modules/.bin/ember-render test/two --context '{"thing": "its and it"}'


popd


