# connect-block-favicon
[![NPM version](https://badge.fury.io/js/connect-block-favicon.png)](http://badge.fury.io/js/connect-block-favicon)
[![Build Status](https://travis-ci.org/prantlf/connect-block-favicon.png)](https://travis-ci.org/prantlf/connect-block-favicon)
[![Coverage Status](https://coveralls.io/repos/github/prantlf/connect-block-favicon/badge.svg?branch=master)](https://coveralls.io/github/prantlf/connect-block-favicon?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d37159c599ac463191049f1dbae963c3)](https://www.codacy.com/app/prantlf/connect-block-favicon?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=prantlf/connect-block-favicon&amp;utm_campaign=Badge_Grade)
[![devDependency Status](https://david-dm.org/prantlf/connect-block-favicon/dev-status.svg)](https://david-dm.org/prantlf/connect-block-favicon#info=devDependencies)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![NPM Downloads](https://nodei.co/npm/connect-block-favicon.png?downloads=true&stars=true)](https://www.npmjs.com/package/connect-block-favicon)

Middleware for [Connect] or [Express] to silence browser requests for `favicon.ico` with no content. Useful for serving web project files from a local web server for development or test automation purposes.

* No need for storing a `favicon.ico` file in the root of your project.
* Both [Connect] and [Express] HTTP server frameworks supported.
* No other dependencies.

If you develop or test a web application and your console is polluted by the following message, when the browser tries accessing `/favicon.ico`, using this middleware will help you to get rid of it:

```txt
Failed to load resource: the server responded with a status of 404 (Not Found)
```

### Table of Contents

- [Synopsis](#synopsis)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Release History](#release-history)
- [License](#license)

## Synopsis

```js
const connect = require('connect')
const blockFavicon = require('connect-block-favicon')
const serveStatic = require('serve-static')

connect()
  .use(blockFavicon())
  .use(serveStatic('.', { etag: false }))
  .listen(9876, () => console.log('Serving on the port', 9876))
```

## Installation and Getting Started

This module can be installed in your project using [NPM] or [Yarn]. Make sure, that you use [Node.js] version 6 or newer.

```sh
npm i connect-block-favicon --save
```

```sh
yarn add connect-block-favicon
```

## Getting Started

The main module exports a factory, which returns a request handler. The request handler is a [middleware] (plugin function) compatible with both [Connect] and [Express] HTTP server frameworks. The factory is function returning the request handler.

```js
const connect = require('connect')
// Load the block-favicon middleware factory.
const blockFavicon = require('connect-block-favicon')

const app = connect()
// Create a block-favicon middleware and pass it to the application server.
app.use(blockFavicon())
```

The request handler intercepts requests to `/favicon.ico` and "satisfies" them by serving no content (HTTP status 204) and a request to cache the response for one year.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.  Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## Release History

* 2019-01-01   v0.0.1   Initial release

## License

Copyright (c) 2019 Ferdinand Prantl

Licensed under the MIT license.

[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[Yarn]: https://yarnpkg.com/
[Connect]: https://www.npmjs.com/package/connect
[Express]: https://expressjs.com/
[middleware]: https://github.com/senchalabs/connect#use-middleware
