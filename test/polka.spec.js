/* global describe */

import polka from 'polka'
import testServer from './server.js'

describe('Using blockFavicon with Polka', () => testServer(polka, 8969))
