# Ocean markdown-it

[Ocean markdown-it] is a wrapper for [markdown-it] built to render Ocean-flavored Markdown ([OFM]).

## Installation

`npm install ocean-markdown-it` or  
`yarn add ocean-markdown-it`

## Usage

Ocean markdown-it can be used as an inline replacement for [markdown-it]. The module exports an instance of markdown-it that has been created with all of the configuration and plugins necessary for properly rendering OFM.

``` javascript
const md = require('ocean-markdown-it')
html = md.render('# This is Ocean-flavored markdown {.title}')
console.log(html) // <h1 class="title">This is Ocean-flavored markdown</h1>
```

## Supported divergences from Commonmark

- [ ] indented blocks become block quotes
- [ ] list items become paragraphs with .list-item
- [ ] nested list items have depth indicator
- [ ] backslash escapes work in indented blocks
- [ ] code spans are disabled
- [x] footnotes
- [ ] block attributes
- [ ] page numbers
- [ ] typography
- [ ] automated paragraph numbers

# Ocean-flavored Markdown (OFM)

Markdown is a widely-used convention for writing for the web, useful because it is easy and quick to write and creates a readable text document that converts well to HTML. The [Markdown] website has a good introduction for people who may find it unfamiliar. Ocean-flavored Markdown is an extension of this syntax designed to support literature. The specification is detailed at [spec.md].

[Ocean markdown-it]: https://github.com/dnotes/ocean-markdown-it
[Commonmark spec]: https://spec.commonmark.org/0.29/
[markdown-it]: https://github.com/markdown-it/markdown-it
[Markdown]: https://daringfireball.net/markdown
[OFM]: #ocean-flavored-markdown-ofm
[spec.md]: https://github.com/dnotes/ocean-markdown-it/blob/master/spec.md