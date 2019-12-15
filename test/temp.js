'use strict'

var path = require('path')
var generate = require('markdown-it-testgen')

/* eslint-env mocha */

describe('Testing new features', function() {
  var md = require('../')
  generate(path.join(__dirname, 'fixtures/temp.txt'), { header: true }, md)
})
