# Boilerplate for Fundamentals of Web Applications

Run 

```bash
npm init
```

to initialize the repository, entering the data requested.

If frontend development is needed, then you have to install babel

```bash
npm install - -save-dev babel-cli babel-preset-env
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

This prescribes that the environment consists of the last 2 versions of each browser plus Safari versions greater than or equal to 7.

Then, in the file `package.json` add a new script for *transpiling*, e.g.:

```json
"scripts": {
    "transpile": "babel ./index.js -d dist"
  }
```

In the end, the `package.json` file should look like this:

```json
{
  "name": "fwapp-boilerplate",
  "version": "0.0.1",
  "description": "Boilerplate for Fundamentals of Web Applications",
  "main": "index.js",
  "scripts": {
    "transpile": "babel ./index.js -d dist"
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
    "babel-preset-env": "^1.6.1"
  }
}
```

The transpiling script will use `index.js` as the entrypoint of (client-side) JavaScript modules and translates them into `dist/index.js`. Therefore in your `html` file you can incorporate the transpiled script as in the following snippet:

```html
<script src="dist/index.js"></script>
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

which, in the end, according to the `.babelrc` specification, is compatible with any of the last two versions of any browser and with Safari >= 7.