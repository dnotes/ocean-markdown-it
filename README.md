# Ocean markdown-it

[Ocean markdown-it] library is a wrapper for [markdown-it] built to render Ocean-flavored markdown (OFM).

[Ocean markdown-it]: https://github.com/dnotes/ocean-markdown-it
[commonmark specification]: https://spec.commonmark.org/0.29/
[markdown-it]: https://github.com/markdown-it/markdown-it

## Installation

`npm install ocean-markdown-it` or  
`yarn add ocean-markdown-it`

## Usage

Ocean Markdown IT can be used as an inline replacement for [markdown-it]. The module exports an instance of markdown-it that has been created with all of the configuration and plugins necessary for supporting OFM.

``` javascript
const md = require('ocean-markdown-it')
html = md.render('# This is Ocean-flavored markdown {.title}')
console.log(html) // <h1 class="title">This is Ocean-flavored markdown</h1>
```

# Ocean-flavored Markdown

Ocean-flavored markdown is an expanded subset of the [commonmark specification] optimized for literary texts. In the few conditions under which [markdown-it] diverges from commonmark, OFM follows the markdown-it implementation.