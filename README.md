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

- [x] Code spans enclosed in single backticks are disabled.
- [x] Indented blocks are rendered as block quotes instead of code blocks using [markdown-it-indented-quotes].
- [x] Block quotes are rendered as flat paragraphs with *.blockquote* class.
- [x] Markdown lists are rendered as flat paragraphs with *.li* class using [markdown-it-flat-lists].
- [x] Footnotes and endnotes are implemented using [markdown-it-footnote].
- [x] HTML attributes (id, class, ¶ and data-*) are implemented using [markdown-it-attrs].
- [x] Explicit numbering of paragraphs with [markdown-it-auto-parnum] is supported with the *¶* attribute.
- [x] Transliterated underlined characters are rendered using [markdown-it-macron-below].
- [x] Page numbers are implemented using [markdown-it-pagenumbers].
- [x] Important typography is rendered using [markdown-it-replacements].
- [x] Underlined text is rendered in the \<u\> tag using [markdown-it-underline].

# Ocean-flavored Markdown (OFM)

Markdown is a widely-used convention for writing for the web, useful because it is easy and quick to write and creates a readable text document that converts well to HTML. The [Markdown] website has a good introduction for people who may find it unfamiliar. Ocean-flavored Markdown is an extension of this syntax designed to support literature. The specification is detailed at [spec.md].

[Ocean markdown-it]: https://github.com/dnotes/ocean-markdown-it
[Commonmark spec]: https://spec.commonmark.org/0.29/
[markdown-it]: https://github.com/markdown-it/markdown-it
[Markdown]: https://daringfireball.net/markdown
[OFM]: #ocean-flavored-markdown-ofm
[spec.md]: https://github.com/dnotes/ocean-markdown-it/blob/master/spec.md

<!-- These links are to the plugins used by ocean-markdown-it -->
[markdown-it-attrs]: https://www.npmjs.com/project/markdown-it-attrs
[markdown-it-auto-parnum]: https://www.npmjs.com/project/markdown-it-auto-parnum
[markdown-it-flat-lists]: https://www.npmjs.com/project/markdown-it-flat-lists
[markdown-it-footnote]: https://www.npmjs.com/project/markdown-it-footnote
[markdown-it-indented-quotes]: https://www.npmjs.com/project/markdown-it-indented-quotes
[markdown-it-macron-underline]: https://www.npmjs.com/project/markdown-it-macron-underline
[markdown-it-pagenumbers]: https://www.npmjs.com/project/markdown-it-pagenumbers
[markdown-it-replacements]: https://www.npmjs.com/project/markdown-it-replacements
[markdown-it-underline]: https://www.npmjs.com/project/markdown-it-underline
