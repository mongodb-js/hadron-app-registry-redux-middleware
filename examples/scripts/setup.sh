#!/bin/bash

PACKAGE_NAME="@mongodb-js/hadron-app-registry-redux-middleware"
EXAMPLE_DIR=$PWD
LIB_DIR="$EXAMPLE_DIR/../../"

echo "Creating NPM Link for $PACKAGE_NAME"

# Change directory into the library (root directory) and run `npm link`
cd $LIB_DIR
npm link

echo "Linking hadron-app-registry-redux-middleware into $EXAMPLE_DIR"

# # Change directory into the example and run `npm link @mongodb-js/hadron-app-registry-redux-middleware`
cd $EXAMPLE_DIR
npm link $PACKAGE_NAME

echo "Done."
