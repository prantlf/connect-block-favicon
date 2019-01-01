function noFavicon () {
  return (request, response, next) => {
    if (request.url === '/favicon.ico') {
      response.writeHead(204, {
        'cache-control': 'max-age=31536000'
      })
      response.end()
    } else {
      next()
    }
  }
}

module.exports = noFavicon
