const path = require('path');
const webpack = require('webpack');
const glob = require("glob");
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;

const currentModule = path.basename(process.cwd());

var globOpts = {
  cwd: __dirname,
  strict: true,
  absolute: true,
  ignore: ["**/node_modules/**"]
};

const alias = {
    lodash: path.join(process.cwd(), 'node_modules/lodash')
};

// Deduplicate modules
glob.sync("packages/**/package.json", globOpts).forEach(result => {
    alias[require(path.normalize(result)).name] = path.normalize(path.dirname(result))
});

const aliased = [
    "@segment/isodate",
    "@segment/is-meta",
    "@segment/prevent-default",
    "@ndhoule/map",
    "@ndhoule/defaults",
    "@ndhoule/foldl",
    "@ndhoule/after",
    "@ndhoule/each",
    "@ndhoule/includes",
    "@ndhoule/pick",
    "@ndhoule/clone",
    "@ndhoule/extend",
    "is",
    "next-tick",
    "component-event",
    "component-emitter",
    "component-type",
    "component-bind",
    "bind-all",
];

aliased.forEach(dep => {
    alias[dep] = path.join(process.cwd(), "..", "analytics.js-core", "node_modules", dep);
});

const externals = {};

// Use the debug module directly from analytics.js
if (currentModule != "analytics.js") {
    externals.debug = "analyticsImpl.createDebug";
}

module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: './lib/index.js',
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(process.cwd(), 'dist')
    },
    externals: externals,
    resolve: {
        alias: alias
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                //exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ["transform-class-properties"]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("production"),
            'process.env.DEBUG': JSON.stringify(false),
            'process.env.VERSION': JSON.stringify(require(path.join(process.cwd(), 'package.json')).version)
        }),
          
        //new webpack.optimize.ModuleConcatenationPlugin(),
        //new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
        //new PrepackWebpackPlugin({})

    ]
};
