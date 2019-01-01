/* global jest, describe, beforeAll, it, expect */

const blockFavicon = require('../src/block-favicon')

describe('Calling blockFavicon', () => {
  const request = {}
  const response = {}
  let next

  function prepareRequest (url) {
    request.url = url
    response.writeHead = jest.fn()
    response.end = jest.fn()
    next = jest.fn()
  }

  describe('if the request URL is "/favicon.ico"', function () {
    beforeAll(function () {
      prepareRequest('/favicon.ico')
      blockFavicon()(request, response, next)
    })

    it('the response status will contain nothing and ask for caching it', function () {
      expect(response.writeHead).toHaveBeenCalledWith(204, {
        'cache-control': 'max-age=31536000'
      })
    })

    it('the response will end', function () {
      expect(response.end).toHaveBeenCalled()
    })

    it('the next handler will not be called', function () {
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe('if the request URL is not "/favicon.ico"', function () {
    beforeAll(function () {
      prepareRequest('/')
      blockFavicon()(request, response, next)
    })

    it('the response header will not be written', function () {
      expect(response.writeHead).not.toHaveBeenCalled()
    })

    it('the response will not end', function () {
      expect(response.end).not.toHaveBeenCalled()
    })

    it('the next handler will be called', function () {
      expect(next).toHaveBeenCalled()
    })
  })
})
