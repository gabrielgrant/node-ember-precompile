#! /bin/bash

# run this from the top of the node-ember-precompile repo

TEST_INSTALL_DIR="/tmp/ember-precompile-test-$(date +%s)"

PACKAGE_DIR=$(pwd)

mkdir "$TEST_INSTALL_DIR"
pushd  "$TEST_INSTALL_DIR"
npm install "$PACKAGE_DIR"

# smoke test
./node_modules/.bin/ember-precompile "$PACKAGE_DIR/test/test1.hbs"

popd


