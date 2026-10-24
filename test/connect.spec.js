/* global describe */

import connect from 'connect'
import testServer from './server.js'

describe('Using blockFavicon with Connect', () => testServer(connect, 8967))
