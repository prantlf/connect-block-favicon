module.exports = function blockFavicon () {
  return (req, res, next) => {
    if (req.url !== '/favicon.ico') return next()
    res.writeHead(204, { 'cache-control': 'max-age=31536000' })
    res.end()
  }
}
