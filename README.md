# Boilerplate for Fundamentals of Web Applications

This document describes how to setup the environment for web application development in order to be able to safely develop both client-side and server-side programming. In particular this document shows how to install babel and webpack that will take care
of transpiling and bundling of JavaScript code.

## Initialize you project

Run 

```bash
npm init
```

to initialize the project, entering the data requested. This will create a file `package.json` that will take care of the `node` package dependencies and allow to write some tasks to build, run, test, and deploy your code.

## Babel and transpiling

In order to be safe in writing your code with the latest JavaScript standard and still be used in any (reasonable) browser, you have to install [babel](https://babeljs.io):

```bash
npm install --save-dev babel-cli babel-loader babel-preset-env
```

And add a file `.babelrc` with the following content:

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
```

This, for example, prescribes that the environment consists of the last 2 versions of each browser plus Safari versions greater than or equal to 7.


You can refer to [https://babeljs.io/docs/plugins/preset-env/](https://babeljs.io/docs/plugins/preset-env/) for a list of the different presets available for babel (and also for a checklist of JavaScript browser capabilities).

## Webpack

Moreover, in order to automate bundling your code and exploiting `node` modules on the client-side you are required to install [webpack](https://webpack.js.org):

```bash
npm install --save-dev webpack webpack-cli style-loader css-loader url-loader file-loader
```

In order to configure it, you should provide a basic `webpack.config.js` file. A possible content is like the following one:

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

The `entry` entry indicates the entrypoint(s) of the application (in case there's more than a single entrypoint an array of filenames could be provided). The `module` indicates to use `babel-loader` to transpile all the `.js` files according to the babel configuration, but to exclude the files under the `node_modules` directory.

The JavaScript code will be bundled in a file whose name is `bundle.js` you will find in the `dist` directory after the pack bundling is performed.

Moreover, `css` and related kind of resources (images and fonts) are treated and bundled.

## Add a build task to `package.json`

In the end, the `package.json` file should look like this:

```json
{
  "name": "fwapp-boilerplate",
  "version": "0.0.1",
  "description": "Boilerplate for Fundamentals of Web Applications",
  "main": "index.js",
  "scripts": {
    "build": "webpack --progress --mode development"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/FWAPP-UniUD/fwapp-boilerplate.git"
  },
  "keywords": [
    "boilerplate"
  ],
  "author": "Luca Di Gaspero",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/FWAPP-UniUD/fwapp-boilerplate/issues"
  },
  "homepage": "https://github.com/FWAPP-UniUD/fwapp-boilerplate#readme",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-loader": "^7.1.4",
    "babel-preset-env": "^1.6.1",
    "webpack": "^4.1.1",
    "webpack-cli": "^2.0.11"
  }
}
```

In order to use webpack, you can issue the command:

```bash
npm run build
```

that will run the `build` script thus bundling everything in the `dist/bundle.js` file.

## Using the `bundle.js`

The bundling and transpiling script will use `index.js` as the entrypoint of (client-side) JavaScript modules and translates them into `dist/bundle.js`. Therefore in your `html` file you can incorporate the transpiled script as in the following snippet:

```html
<script src="dist/bundle.js"></script>
```

For example, given the following JavaScript file, using ES2015 syntax features:

```javascript
const msg = "Hello World!";
const f = () => {
    console.log(msg);
};
f();
```

after transpiling it gets translated into:

```javascript
"use strict";

var msg = "Hello World!";
var f = function f() {
    console.log(msg);
};
f();
```

which, according to the `.babelrc` specification, is compatible with any of the last two versions of any browser and with Safari >= 7. Moreover, that code is then bundled in a single `bundle.js` file (you can inspect it in the `dist` directory, however it has also some other code you do not need to understand).

## Further building tasks

It could be useful to add a few other building tasks for development. In particular *clean* and *copy*, respectively for removing the content of the `dist` directory before building and copying the `index.html` file into the `dist` directory so that everything is in that place after the build.

In order to get this behavior, you are required a few `npm` installations:

```bash
npm install --save-dev rimraf copyfiles
```

Further you have to simply change the `package.json` `scripts` entry as follows:

```json
{
  ...
  "scripts": {
      "clean": "rimraf dist/*",
      "copy": "copyfiles -f ./index.html ./dist",
      "build": "npm run clean & npm run copy & webpack --progress --mode development"
  },
  ...
}
```

Recall, in that case that `index.html` JavaScript loading should now become:

```html
<script src="bundle.js"></script>
```

Now everything built is inside the `dist` directory that can be deployed.