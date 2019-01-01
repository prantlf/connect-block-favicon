/* global describe */

const express = require('express')
const testServer = require('./server')

describe('Using blockFavicon with Express', () => testServer(express))
