/* global jest, describe, beforeAll, it, expect */

const blockFavicon = require('..')

describe('Calling blockFavicon', () => {
  const req = {}
  const res = {}
  let next

  function prepareRequest (url) {
    req.url = url
    res.writeHead = jest.fn()
    res.end = jest.fn()
    next = jest.fn()
  }

  describe('if the request URL is "/favicon.ico"', function () {
    beforeAll(function () {
      prepareRequest('/favicon.ico')
      blockFavicon()(req, res, next)
    })

    it('the response status will contain nothing and ask for caching it', function () {
      expect(res.writeHead).toHaveBeenCalledWith(204, {
        'cache-control': 'max-age=31536000'
      })
    })

    it('the response will end', function () {
      expect(res.end).toHaveBeenCalled()
    })

    it('the next handler will not be called', function () {
      expect(next).not.toHaveBeenCalled()
    })
  })

  describe('if the request URL is not "/favicon.ico"', function () {
    beforeAll(function () {
      prepareRequest('/')
      blockFavicon()(req, res, next)
    })

    it('the response header will not be written', function () {
      expect(res.writeHead).not.toHaveBeenCalled()
    })

    it('the response will not end', function () {
      expect(res.end).not.toHaveBeenCalled()
    })

    it('the next handler will be called', function () {
      expect(next).toHaveBeenCalled()
    })
  })
})
