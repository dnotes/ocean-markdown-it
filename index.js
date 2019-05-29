'use strict'
const md = require('markdown-it')('commonmark', {
  typographer: true,
})
  .use(require('markdown-it-footnote'))

module.exports = md
