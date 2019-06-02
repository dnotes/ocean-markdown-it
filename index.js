'use strict'
const md = require('markdown-it')('commonmark', {
  typographer: true,
})
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-attrs'), {
    allowedAttributes: ['id', 'class', /^(¶|data)/],
  })

module.exports = md
