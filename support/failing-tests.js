'use strict'

const fs = require('fs')
const path = require('path')
const testExp = /(^`{32} example\n[\s\S]*?^\.\n[\s\S]*?^`{32}$)/m
const actualExp = /^\.\n([\s\S]*?)(?=`{32})/m

const specs = {}
specs.Commonmark = require('commonmark-spec').text.split(testExp)
specs.Ocean = fs.readFileSync(path.join(__dirname, '../spec.md'), 'utf8').split(testExp)
specs.MarkdownIT = fs.readFileSync(path.join(__dirname, '../spec-markdown-it.md'), 'utf8').split(testExp)

module.exports = function(runner) {
  runner.on('fail', function(test, err) {
    let match = test.title.match(/ (\w+) #(\d+)[^#]*$/)
    let spec = match[1]
    let num = match[2]
    let testCode = specs[spec][(num * 2) - 1]
    let oldResult = testCode.match(actualExp)[1]
    testCode = testCode.replace(actualExp, '.\n' + err.actual)
    let comment = (specs[spec][(num * 2) - 2]
      .split(/\n{2,}/)
      .filter(n => /\S/.test(n))
      .slice(-1)[0] || '')
      .replace(/^([^>])/gm, '> $1') + '\n```\n' + oldResult.trim() + '\n```\n'
    console.log(`\n\n${test.title}\n${comment.trim()}\n${testCode}`)
  })
}
