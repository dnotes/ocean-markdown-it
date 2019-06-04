'use strict'

// Load plugins
const typography = require('markdown-it-replacements')

// Set typographic replacements
typography.replacements.push({
  name: 'copyright',
  re: /\([cC]\)/mg,
  sub: '©',
  default: true,
})
typography.replacements.push({
  name: 'trademark',
  re: /\((?:tm|TM)\)/mg,
  sub: '™',
  default: true,
})
typography.replacements.push({
  name: 'registered',
  re: /\([rR]\)/mg,
  sub: '®',
  default: true,
})
typography.replacements.push({
  name: 'mdash2',
  re: /(^|[^-])---?([^-])/mg,
  sub: '$1\u2014$2',
  default: true,
})
typography.replacements.push({
  name: 'mdash2',
  re: /([^-])---?([^-]|$)/mg,
  sub: '$1\u2014$2',
  default: true,
})
typography.replacements.push({
  name: 'mdash2',
  re: /(^|[^-\s])---?([^-\s])/mg,
  sub: '$1\u2014$2',
  default: true,
})
typography.replacements.push({
  name: 'mdash2',
  re: /([^-\s])---?([^-\s]|$)/mg,
  sub: '$1\u2014$2',
  default: true,
})
// Catch em-dashes surrounded by spaces
typography.replacements.push({
  name: 'mdash2',
  re: /(^|[^-]) (?:--|—) ([^-]|$)/mg,
  sub: '$1\u2014$2',
  default: true,
})

// Load markdown
const md = require('markdown-it')('commonmark', {
  typographer: true,
})
  .enable(['linkify', 'smartquotes', 'replacements'])
  .disable(['backticks'])
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-attrs'), {
    allowedAttributes: ['id', 'class', /^(¶|data)/],
  })
  .use(typography, {
    plusminus: false,
    ellipsis: false,
    ndash: false,
    mdash: false,
  })

module.exports = md
