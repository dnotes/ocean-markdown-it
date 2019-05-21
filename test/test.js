'use strict'

var path = require('path')
var generate = require('markdown-it-testgen')

/* eslint-env mocha */

describe('Tests for ocean-markdown-it wrapper', function () {
  var md = require('../')
  generate(path.join(__dirname, 'fixtures/definitions.txt'), { header: true }, md)
})
