# Changelog

All notable changes will be documented in this file. After version 2.0.0, this library will follow semantic versioning; all breaking changes which require modification of either markdown files or code implementations will result in a new major release.

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

## [Unreleased]

- [ ] Refactor or additionally provide a normal markdown-it plugin instead of only a wrapper.

## 2.0.0

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
