const commonjs = require("rollup-plugin-commonjs");
const resolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');
const uglify = require('rollup-plugin-uglify');
const alias = require('rollup-plugin-alias');
const babel = require('rollup-plugin-babel');
const forceBinding = require('rollup-plugin-force-binding');
const path = require('path');
const fs = require('fs');
const minify = require('uglify-es').minify;
const glob = require("glob");

const currentModule = path.basename(process.cwd());
const isRootModule = /^analytics\.js(-integration-.*)?$/
const isRelativeModule = /^\.[a-z\-\._0-9/]+$/

var globOpts = {
  cwd: __dirname,
  strict: true,
  absolute: true,
  ignore: ["**/node_modules/**"]
};

const packages = glob.sync("packages/**/package.json", globOpts)
  .map(result => require(path.normalize(result)).name);

// Other trusted packages
packages.push("@segment/isodate");
packages.push("@segment/is-meta");
packages.push("@segment/prevent-default");

packages.push("@ndhoule/map");
packages.push("@ndhoule/defaults");
packages.push("@ndhoule/foldl");
packages.push("@ndhoule/after");
packages.push("@ndhoule/each");
packages.push("@ndhoule/includes");
packages.push("@ndhoule/pick");
packages.push("@ndhoule/clone");

packages.push("is");
packages.push("next-tick");
packages.push("component-event");
packages.push("bind-all");

module.exports = {
  entry: 'lib/index.js',
  external: function(id) {
    // Root modules are the modules that need the full JS inside
    if (isRootModule.test(currentModule)) {
      return false;
    }

    // Treat all lerna packages as externals
    if (packages.indexOf(id) > -1) {
      console.log("external", id);
      return true;
    }

    // Treat lodash as external
    if (id.indexOf("lodash") > -1) {
      console.log("external", id);
      return true;
    }

    return false;
  },
  plugins: [
    forceBinding(['isArray']),
    resolve({
        browser: true
    }),
    commonjs({
      namedExports: {
        'node_modules/uuid/index.js': ['v1', 'v4']
      }
    }), 
    babel({
      exclude: ['node_modules/**', '*.json' ],
      plugins: ["external-helpers"]
    }),
    json(), 
    uglify({}, minify),
    alias({
      resolve: ['.jsx', '.js']
    }) 
  ],
  dest: 'dist/bundle.min.js' // equivalent to --output
};