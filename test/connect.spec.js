/* global describe */

const connect = require('connect')
const testServer = require('./server')

describe('Using blockFavicon with Connect', () => testServer(connect, 8967))
