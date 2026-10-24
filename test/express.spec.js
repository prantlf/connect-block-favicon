/* global describe */

import express from 'express'
import testServer from './server.js'

describe('Using blockFavicon with Express', () => testServer(express, 8968))
