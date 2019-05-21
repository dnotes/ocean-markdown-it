#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const oceanSpec = fs.readFileSync(path.join(__dirname, '../spec.md'), 'utf8')
const commonmarkSpec = require('commonmark-spec').text
const examples = {}
const tests = []

const extractSpecTests = function(data, spec) {
  let currentSection = ""
  let exampleNumber = 0
  let tests = data
    .replace(/\r\n?/g, "\n") // Normalize newlines for platform independence
    .replace(/^<!-- END TESTS -->(.|[\n])*/m, '')

  tests.replace(/^`{32} example\n([\s\S]*?)^\.\n([\s\S]*?)^`{32}$|^#{1,6} *(.*)$/gm,
    (_, markdownSubmatch, htmlSubmatch, sectionSubmatch) => {
      if (sectionSubmatch) {
        currentSection = sectionSubmatch
      } else {
        exampleNumber++
        examples[markdownSubmatch] = {
          markdown: markdownSubmatch.replace(/→/gm, "\t"),
          html: htmlSubmatch.replace(/→/gm, "\t"),
          section: currentSection,
          specs: [...(examples[markdownSubmatch] || {})['specs'] || [], `${spec} #${exampleNumber}`],
        }
      }
    }
  )
}

extractSpecTests(commonmarkSpec, 'Commonmark')
extractSpecTests(oceanSpec, 'Ocean')

Object.keys(examples).forEach((k) => {
  let e = examples[k]
  tests.push(`\n${e.section}: ${e.specs.join(', ')}\n.\n${e.markdown}.\n${e.html}.\n`)
})

fs.writeFileSync(path.join(__dirname, '../test/fixtures/definitions.txt'), tests.join("\n"))
