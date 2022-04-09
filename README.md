# connect-block-favicon

[![Latest version](https://img.shields.io/npm/v/connect-block-favicon)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/connect-block-favicon)
](https://www.npmjs.com/package/connect-block-favicon)
[![Test coverage](https://codecov.io/gh/prantlf/connect-block-favicon/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/connect-block-favicon)

Middleware for [Connect], [Express] or [Polka] to silence browser requests for `favicon.ico` with no content. Useful when serving web project files from a local web server for development or test automation purposes.

* No need for storing a `favicon.ico` file in the root of your project.
* Any server supporting [middleware] supported.
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
  .on('error', err => console.error(err))
  .listen(9876, () => console.log('Serving on the port', 9876))
```

## Installation

This module can be installed in your project using [NPM], [PNPM] or [Yarn]. Make sure, that you use [Node.js] version 6 or newer.

    npm i connect-block-favicon
    pnpm i connect-block-favicon
    yarn add connect-block-favicon

## Getting Started

The main module exports a factory, which returns a request handler. The request handler is a [middleware] (plugin function) compatible with both [Connect], [Express] or [Polka] HTTP server frameworks. The factory is function returning the request handler.

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

In lieu of a formal styleguide, take care to maintain the existing coding style.  Add unit tests for any new or changed functionality. Lint and test your code.

## License

Copyright (c) 2019-2022 Ferdinand Prantl

Licensed under the MIT license.

[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[PNPM]: https://pnpm.io/
[Yarn]: https://yarnpkg.com/
[Connect]: https://www.npmjs.com/package/connect
[Express]: https://expressjs.com/
[Polka]: https://www.npmjs.com/package/polka
[middleware]: https://github.com/senchalabs/connect#use-middleware
