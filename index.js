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
  .use(require('markdown-it-macron-underline'))
  .use(require('markdown-it-indented-quotes'))
  .use(require('markdown-it-flat-lists'))
  .use(require('markdown-it-pagenumbers'))
  .use(require('markdown-it-underline'))
  .use(require('markdown-it-attrs'), {
    allowedAttributes: ['id', 'class', /^(¶|data)/],
  })
  .use(typography, {
    plusminus: false,
    ellipsis: false,
    ndash: false,
    mdash: false,
  })

function flatten(state) {
  let i = 0
  let token
  let classes = []
  let blockquoteLevel = 0
  let listLevel = 0
  let stubs = {}
  let lastParagraph = {}

  for (; i < state.tokens.length; i++) {
    token = state.tokens[i]

    // Capture level information from blockquote and list tokens
    if (token.type === 'blockquote_open') {
      blockquoteLevel += token.nesting
      if (token.attrs && token.attrs.length) {
        stubs[blockquoteLevel] = new state.Token()
        stubs[blockquoteLevel].attrs = token.attrs
      }
    }
    else if (token.type === 'blockquote_close') {
      if (lastParagraph[blockquoteLevel] && stubs[blockquoteLevel]) {
        for (let x = 0; x < stubs[blockquoteLevel].attrs.length; x++) {
          state.tokens[lastParagraph[blockquoteLevel]].attrJoin(stubs[blockquoteLevel].attrs[x][0], stubs[blockquoteLevel].attrs[x][1])
        }
        stubs[blockquoteLevel + 1] = null
      }
      blockquoteLevel += token.nesting
    }
    else if (token.type.indexOf('_list_') > -1) listLevel += token.nesting

    // Add proper classes to content tokens
    if (token.tag === 'p' ||
        token.tag === 'div' ||
        token.type === 'fence' ||
        token.tag === 'pre') {
      if (token.type.indexOf('_close') === -1) {
        classes = []

        // Add blockquote class (list classes are handled by markdown-it-flat-lists)
        if (blockquoteLevel) {
          classes.push('blockquote')
          classes.push('bq-' + blockquoteLevel)
        }

        // Add indent level
        if (blockquoteLevel || listLevel) classes.push(`indent-${blockquoteLevel + listLevel}`)

        // Add classes to token
        if (classes.length) state.tokens[i].attrJoin('class', classes.join(' '))

        // Remember last paragraph for possible blockquote attributes
        if (blockquoteLevel) lastParagraph[blockquoteLevel] = i
      }

      // do not hide content tokens
      state.tokens[i].hidden = false
    }
  }
}

function noRender() { return '' }

md.core.ruler.after('curly_attributes', 'flatten', flatten)
md.renderer.rules.blockquote_open = noRender
md.renderer.rules.blockquote_close = noRender

module.exports = md
