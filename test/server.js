/* global describe, beforeAll, afterAll, it, expect */

const request = require('request')
const blockFavicon = require('../src/block-favicon')

const port = 8967

function testServer (createServer) {
  let server
  let response

  function serveText (request, response, next) {
    response.writeHead(200, {
      'content-type': 'text/plain',
      'content-length': 6
    })
    response.write('Hello!')
    response.end()
  }

  function startServer () {
    return new Promise((resolve, reject) => {
      server = createServer()
        .use(blockFavicon())
        .use(serveText)
        .on('error', error => {
          server.close()
          reject(error)
        })
        .listen(port, resolve)
    })
  }

  function stopServer () {
    return new Promise((resolve, reject) => {
      server.close(error => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }

  function makeRequest (path) {
    return new Promise((resolve, reject) => {
      request
        .get(`http://localhost:${port}${path}`)
        .on('response', result => {
          response = result
          resolve()
        })
        .on('error', reject)
    })
  }

  beforeAll(startServer)

  afterAll(stopServer)

  describe('if the request URL is "/favicon.ico"', function () {
    beforeAll(() => makeRequest('/favicon.ico'))

    it('the response status will contain nothing', function () {
      expect(response.statusCode).toEqual(204)
    })

    it('the response will ask for caching it', function () {
      expect(response.headers['cache-control']).toEqual('max-age=31536000')
    })
  })

  describe('if the request URL is not "/favicon.ico"', function () {
    beforeAll(() => makeRequest('/'))

    it('the response status will fall through', function () {
      expect(response.statusCode).toEqual(200)
    })
  })
}

module.exports = testServer
