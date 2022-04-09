/* global describe */

const polka = require('polka')
const testServer = require('./server')

describe('Using blockFavicon with Polka', () => testServer(polka, 8969))
