# Introduction

## Ocean-flavored Markdown (OFM) spec

Ocean-flavored Markdown (OFM) is an extended subset of the [Commonmark spec] optimized for literary texts. Ocean Markdown is defined in relation to the [Commonmark spec], meaning that Commonmark definitions are theoretically maintained as in the original unless otherwise specified in this document. In the few conditions under which [markdown-it] diverges from Commonmark in implementation, OFM follows the markdown-it implementation.

[Commonmark]: https://commonmark.org
[Commonmark spec]: https://spec.commonmark.org/v0.29/
[markdown-it]: https://github.com/markdown-it/markdown-it

## OFM Principles

Development of the OFM specification is guided by four principles: support [literature], maintain [existing functionality], prefer a [flat structure], and follow [existing implementation].

### Support literature
[literature]: #support-literature

The primary purpose of OFM is to support literature. Literary texts have different structures and writing conventions from the modern style of writing for the Internet that Markdown and Commonmark were created to support.

### Maintain existing functionality
[existing functionality]: #maintain-existing-functionality

Altering or removing features supported by Commonmark should only be done with justification based on the OFM principles. Removal of features should only be done when a convention is insufficient to achieve the purpose.

### Prefer flat structure
[flat structure]: #prefer-flat-structure

In contrast to modern writing styles which often employ a semantic and nested structure that can be easily parsed by machines, literature uses a relatively flat structure of titles and paragraphs, relying on human understanding to distinguish elements like chapters and lists. This flat structure affords several benefits for parsing, rendering and understanding literature, including:

- easier referencing of numbered paragraphs
- more faithful rendering of ordered list items
- lazy loading of blocks within large documents
- better support for audio mapping

### Follow existing implementation
[existing implementation]: #follow-existing-implementation

For ease of developing tools, the OFM spec may follow implementations of Markdown parsers that differ from Commonmark spec in the following cases:

- the parser adds features not in Commonmark
- the parser incorrectly implements an edge case that does not affect literature



# Relation to the Commonmark spec

The sections below follow the [Commonmark spec], detailing any ways in which OFM diverges from and adds to Commonmark requirements. The following features are maintained exactly as in Commonmark:

- [Leaf blocks]
    - [Thematic breaks]
    - [ATX headings]
    - [Setext headings]
    - [Fenced code blocks]
    - [HTML blocks] [1]
    - [Link reference definitions] [2]
    - [Paragraphs]
    - [Blank lines]
- [Container blocks]
    - [Block quotes] [1]
- [Inlines]
    - [Entity and numeric character references]
    - [Emphasis and strong emphasis]
    - [Links] [2]
    - [Images] [2]
    - [Autolinks]
    - [Raw HTML] [1]
    - [Hard line breaks]
    - [Soft line breaks]
    - [Textual content]

1\. Discouraged. See notes below.

2\. See notes below about right-to-left language support.

[leaf blocks]: https://spec.commonmark.org/0.29/#leaf-blocks
[Leaf blocks]: https://spec.commonmark.org/0.29/#leaf-blocks
[container blocks]: https://spec.commonmark.org/0.29/#container-blocks
[Container blocks]: https://spec.commonmark.org/0.29/#container-blocks
[inline elements]: https://spec.commonmark.org/0.29/#inlines
[Inline elements]: https://spec.commonmark.org/0.29/#inlines
[Inlines]: https://spec.commonmark.org/0.29/#inlines

[Thematic breaks]: https://spec.commonmark.org/0.29/#thematic-breaks
[ATX headings]: https://spec.commonmark.org/0.29/#atx-headings
[Setext headings]: https://spec.commonmark.org/0.29/#setext-headings
[Indented code blocks]: https://spec.commonmark.org/0.29/#indented-code-blocks
[Fenced code blocks]: https://spec.commonmark.org/0.29/#fenced-code-blocks
[HTML blocks]: https://spec.commonmark.org/0.29/#html-blocks
[Link reference definitions]: https://spec.commonmark.org/0.29/#link-reference-definitions
[Paragraphs]: https://spec.commonmark.org/0.29/#paragraphs
[Blank lines]: https://spec.commonmark.org/0.29/#blank-lines
[Block quotes]: https://spec.commonmark.org/0.29/#block-quotes
[List items]: https://spec.commonmark.org/0.29/#list-items
[Lists]: https://spec.commonmark.org/0.29/#lists
[Backslash escapes]: https://spec.commonmark.org/0.29/#backslash-escapes
[Entity and numeric character references]: https://spec.commonmark.org/0.29/#entity-and-numeric-character-references
[Code spans]: https://spec.commonmark.org/0.29/#code-spans
[Emphasis and strong emphasis]: https://spec.commonmark.org/0.29/#emphasis-and-strong-emphasis
[Links]: https://spec.commonmark.org/0.29/#links
[Images]: https://spec.commonmark.org/0.29/#images
[Autolinks]: https://spec.commonmark.org/0.29/#autolinks
[Raw HTML]: https://spec.commonmark.org/0.29/#raw-html
[Hard line breaks]: https://spec.commonmark.org/0.29/#hard-line-breaks
[Soft line breaks]: https://spec.commonmark.org/0.29/#soft-line-breaks
[Textual content]: https://spec.commonmark.org/0.29/#textual-content

[1]: #divergence-from-commonmark
[2]: #right-to-left-language-support



## Divergence from Commonmark

The following elements in Ocean-flavored Markdown differ from their counterparts in Commonmark: 

<!-- Leaf blocks -->
### [Indented code blocks]

Indented blocks in OFM are to be treated as block quotes, not as code.

**Justification**: In [literature] it is a standard convention that long quotations are written as indented free-standing text blocks, and such quotations are common while code is almost nonexistent.

### [Fenced code blocks]

Fenced code blocks work just as in Commonmark, but since inline codeblocks (backticks) are disabled, code fences must be on a line by themselves:
```````````````````````````````` example
```echo "doesn't work"```
.
<p>```echo “doesn’t work”```</p>
````````````````````````````````

Fenced code blocks: Commonmark #108 (1885), MarkdownIT #1 (14)
> Code fences (opening and closing) cannot contain internal spaces:
```````````````````````````````` example
``` ```
aaa
.
<p>``` ```
aaa</p>
````````````````````````````````


### [HTML blocks]

The use of HTML blocks is discouraged in OFM, and may be limited or deprecated in future.

<!-- Container blocks -->
### [Block quotes]

Block quotes in OFM are indicated by indentation; however, the Commonmark block quote syntax is also supported.

While OFM continues to support block quotes as [container blocks] that may hold multiple other block elements, this use is discouraged and may be deprecated in the future.

**Justification**: Commonmark block quotes use a syntax that is never used in [literature], so it does no harm to [maintain functionality]. Commonmark block quotes also allow a nested structure, but a [flat structure] can be encouraged by convention in this case.

### [List items] and [Lists]

List items in OFM are rendered as regular paragraphs with a class of "list-item". Lists and list items are thus treated as [leaf blocks] instead of [container blocks].

Nested list items, beyond the first level, are indicated by a level class, e.g. `<p class="list-item l2">`.

Lists are not supported.

**Justification**: While [literature] does contain lists, the item identifiers--bullets, numbers, or letters--are considered part of the content, and support a much wider range of values than html bullets or automated numbering. In almost no case is there any advantage in maintaining the semantic nature of an html list, and collapsing list items into regular paragraphs affords a [flat structure].

<!-- Inlines -->
### [Backslash escapes]

In Ocean-flavored markdown, backslash escapes work as usual inside indented blocks.

**Justification**: This is a consequence of rendering indented text blocks as block quotes instead of code. In this instance backslash escapes are still needed.

### [Code spans]

Inline code spans are not supported in Ocean-flavored Markdown. Markdown that would ordinarily be rendered as code spans should be rendered as plain text.

**Justification**: The backtick character occasionally occurs in [literature], but code is rare; if code is needed it must be fenced by three backticks.

Fenced code blocks: Commonmark #91 (1666)
> Fewer than three backticks is not enough [to be treated as a fenced code block]:
```````````````````````````````` example
``
foo
``
.
<p>``
foo
``</p>
````````````````````````````````

Fenced code blocks: Commonmark #108 (1885)
> Code fences (opening and closing) cannot contain internal spaces:
```````````````````````````````` example
``` ```
aaa
.
<p>``` ```
aaa</p>
````````````````````````````````

Fenced code blocks: Commonmark #115 (1985)
> [Info strings] for backtick code blocks cannot contain backticks:
```````````````````````````````` example
``` aa ```
foo
.
<p>``` aa ```
foo</p>
````````````````````````````````


Inlines: Commonmark #297 (5499)
> Inlines are parsed sequentially from the beginning of the character
> stream to the end (left to right, in left-to-right languages).
> Thus, for example, in
```````````````````````````````` example
`hi`lo`
.
<p>`hi`lo`</p>
````````````````````````````````


Backslash escapes: Commonmark #303 (5579)
> Backslash escapes do not work in code blocks, code spans, autolinks, or
> raw HTML:
```````````````````````````````` example
`` \[\` ``
.
<p>`` [` ``</p>
````````````````````````````````


Entity and numeric character references: Commonmark #321 (5789)
> Entity and numeric character references are treated as literal
> text in code spans and code blocks:
```````````````````````````````` example
`f&ouml;&ouml;`
.
<p>`föö`</p>
````````````````````````````````


Code spans: Commonmark #328 (5870)
> This is a simple code span:
```````````````````````````````` example
`foo`
.
<p>`foo`</p>
````````````````````````````````


Code spans: Commonmark #329 (5881)
> Here two backticks are used, because the code contains a backtick.
> This example also illustrates stripping of a single leading and
> trailing space:
```````````````````````````````` example
`` foo ` bar ``
.
<p>`` foo ` bar ``</p>
````````````````````````````````


Code spans: Commonmark #330 (5891)
> This example shows the motivation for stripping leading and trailing
> spaces:
```````````````````````````````` example
` `` `
.
<p>` `` `</p>
````````````````````````````````


Code spans: Commonmark #331 (5899), MarkdownIT #9 (168)
> Note that only *one* space is stripped:
```````````````````````````````` example
`  ``  `
.
<p>`  ``  `</p>
````````````````````````````````


Code spans: Commonmark #332 (5908), MarkdownIT #10 (179)
> The stripping only happens if the space is on both
> sides of the string:
```````````````````````````````` example
` a`
.
<p>` a`</p>
````````````````````````````````


Code spans: Commonmark #333 (5917), MarkdownIT #11 (190)
> Only [spaces], and not [unicode whitespace] in general, are
> stripped in this way:
```````````````````````````````` example
` b `
.
<p>` b `</p>
````````````````````````````````


Code spans: Commonmark #334 (5925), MarkdownIT #12 (200)
> No stripping occurs if the code span contains only spaces:
```````````````````````````````` example
` `
`  `
.
<p>` `
`  `</p>
````````````````````````````````


Code spans: Commonmark #335 (5936), MarkdownIT #13 (212)
> [Line endings] are treated like spaces:
```````````````````````````````` example
``
foo
bar  
baz
``
.
<p>``
foo
bar<br />
baz
``</p>
````````````````````````````````


Code spans: Commonmark #336 (5946), MarkdownIT #14 (222)
```````````````````````````````` example
``
foo 
``
.
<p>``
foo
``</p>
````````````````````````````````


Code spans: Commonmark #337 (5957), MarkdownIT #15 (234)
> Interior spaces are not collapsed:
```````````````````````````````` example
`foo   bar 
baz`
.
<p>`foo   bar
baz`</p>
````````````````````````````````


Code spans: Commonmark #338 (5974)
> Note that backslash escapes do not work in code spans. All backslashes
> are treated literally:
```````````````````````````````` example
`foo\`bar`
.
<p>`foo`bar`</p>
````````````````````````````````


Code spans: Commonmark #339 (5985)
> Backslash escapes are never needed, because one can always choose a
> string of *n* backtick characters as delimiters, where the code does
> not contain any strings of exactly *n* backtick characters.
```````````````````````````````` example
``foo`bar``
.
<p>``foo`bar``</p>
````````````````````````````````


Code spans: Commonmark #340 (5991)
```````````````````````````````` example
` foo `` bar `
.
<p>` foo `` bar `</p>
````````````````````````````````


Code spans: Commonmark #341 (6003)
> Code span backticks have higher precedence than any other inline
> constructs except HTML tags and autolinks.  Thus, for example, this is
> not parsed as emphasized text, since the second `*` is part of a code
> span:
```````````````````````````````` example
*foo`*`
.
<p><em>foo`</em>`</p>
````````````````````````````````


Code spans: Commonmark #342 (6012)
> And this is not parsed as a link:
```````````````````````````````` example
[not a `link](/foo`)
.
<p><a href="/foo%60">not a `link</a></p>
````````````````````````````````


Code spans: Commonmark #343 (6022)
> Code spans, HTML tags, and autolinks have the same precedence.
> Thus, this is code:
```````````````````````````````` example
`<a href="`">`
.
<p>`<a href="`">`</p>
````````````````````````````````


Code spans: Commonmark #345 (6040)
> And this is code:
```````````````````````````````` example
`<http://foo.bar.`baz>`
.
<p>`<a href="http://foo.bar.%60baz">http://foo.bar.`baz</a>`</p>
````````````````````````````````


Code spans: Commonmark #349 (6075)
> The following case also illustrates the need for opening and
> closing backtick strings to be equal in length:
```````````````````````````````` example
`foo``bar``
.
<p>`foo``bar``</p>
````````````````````````````````


Emphasis and strong emphasis: Commonmark #477 (7399)
```````````````````````````````` example
*a `*`*
.
<p><em>a `</em>`*</p>
````````````````````````````````


Emphasis and strong emphasis: Commonmark #478 (7406)
```````````````````````````````` example
_a `_`_
.
<p><em>a `</em>`_</p>
````````````````````````````````


Links: Commonmark #512 (7813)
> The link text may contain inline content:
```````````````````````````````` example
[link *foo **bar** `#`*](/uri)
.
<p><a href="/uri">link <em>foo <strong>bar</strong> `#`</em></a></p>
````````````````````````````````


Links: Commonmark #521 (7887)
```````````````````````````````` example
[foo`](/uri)`
.
<p><a href="/uri">foo`</a>`</p>
````````````````````````````````


Links: Commonmark #526 (7967)
> The link text may contain inline content:
```````````````````````````````` example
[link *foo **bar** `#`*][ref]

[ref]: /uri
.
<p><a href="/uri">link <em>foo <strong>bar</strong> `#`</em></a></p>
````````````````````````````````


Links: Commonmark #533 (8041)
```````````````````````````````` example
[foo`][ref]`

[ref]: /uri
.
<p><a href="/uri">foo`</a>`</p>
````````````````````````````````


Hard line breaks: Commonmark #637 (9241), MarkdownIT #19 (288)
> Line breaks do not occur inside code spans
```````````````````````````````` example
`code 
span`
.
<p>`code
span`</p>
````````````````````````````````


Hard line breaks: Commonmark #638 (9249)
```````````````````````````````` example
`code\
span`
.
<p>`code<br />
span`</p>
````````````````````````````````


### [Raw HTML]

The use of raw HTML is discouraged in OFM, and may be limited or deprecated in future.



## Additions to Commonmark

### Footnotes
[markdown-it-footnote]: https://github.com/markdown-it/markdown-it-footnote

Ocean Markdown defines footnotes exactly as supported by the [markdown-it-footnote] plugin. Footnote labels are [inline elements], while footnote definitions function like [container blocks], although they are rendered at the end of the document instead of where they occur.

Footnote definitions are created in the same format as link and image definitions. They may be placed anywhere in the document. Footnotes can be defined immediately following the paragraph:

```````````````````````````````` example
Paragraph with footnote reference[^1].

[^1]: Footnote text.
.
<p>Paragraph with footnote reference<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>
<hr class="footnotes-sep" />
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>Footnote text. <a href="#fnref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
````````````````````````````````

Footnote definitions can also come at the end of a document, provided that they use the same label as the footnote reference:

```````````````````````````````` example
Paragraph with footnote reference[^1].

Intermediate paragraph.

[^1]: Footnote text.
.
<p>Paragraph with footnote reference<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>
<p>Intermediate paragraph.</p>
<hr class="footnotes-sep" />
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>Footnote text. <a href="#fnref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
````````````````````````````````

Footnotes can even come at the beginning of the document:

```````````````````````````````` example
[^1]: Footnote text.

Paragraph with footnote reference[^1].
.
<p>Paragraph with footnote reference<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>
<hr class="footnotes-sep" />
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>Footnote text. <a href="#fnref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
````````````````````````````````

Footnote labels are NOT preserved, but rather are converted to numeric values:

```````````````````````````````` example
[^2]: Footnote text.

Paragraph with footnote reference[^2].
.
<p>Paragraph with footnote reference<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>
<hr class="footnotes-sep" />
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>Footnote text. <a href="#fnref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
````````````````````````````````


Footnote labels may contain characters other than numbers:

```````````````````````````````` example
[^fn_2-aáж§:]: Footnote text.

Paragraph with footnote reference[^fn_2-aáж§:].
.
<p>Paragraph with footnote reference<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>
<hr class="footnotes-sep" />
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>Footnote text. <a href="#fnref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
````````````````````````````````

Footnote labels may not contain spaces:

```````````````````````````````` example
[^howdy doody]: Footnote text.

Paragraph with footnote reference[^howdy doody].
.
<p>[^howdy doody]: Footnote text.</p>
<p>Paragraph with footnote reference[^howdy doody].</p>
````````````````````````````````

Footnote labels may not be blank:

```````````````````````````````` example
[^]: Footnote text

Paragraph with footnote reference[^].
.
<p>[^]: Footnote text</p>
<p>Paragraph with footnote reference[^].</p>
````````````````````````````````


Footnotes may be written inline without a label:

```````````````````````````````` example
Paragraph with footnote reference^[Footnote text.].
.
<p>Paragraph with footnote reference<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>
<hr class="footnotes-sep" />
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>Footnote text. <a href="#fnref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
````````````````````````````````

Footnote text can contain multiple paragraphs, provided that each paragraph in the footnote definition is indented by equal white space of four or more spaces or a tab:

```````````````````````````````` example
Paragraph with footnote reference[^1].

[^1]: Footnote text.

    This footnote has multiple paragraphs.
.
<p>Paragraph with footnote reference<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>
<hr class="footnotes-sep" />
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>Footnote text.</p>
<p>This footnote has multiple paragraphs. <a href="#fnref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
````````````````````````````````

### HTML attributes
[markdown-it-attrs]: https://github.com/markdown-it/markdown-it-attrs

HTML attributes are an extension to block elements classes and html attributes, and are defined exactly as implemented by the [markdown-it-attrs] plugin. Only certain attributes are permitted, namely:

- id (or #*)
- class (or .*)
- ¶
- data-*

```````````````````````````````` example
Markdown paragraph. {#test .test ¶=1.1 data-attr="test" bad-data-attr="test"}
.
<p id="test" class="test" ¶="1.1" data-attr="test">Markdown paragraph.</p>
````````````````````````````````

```````````````````````````````` example
Markdown paragraph. {id=test class=test}
.
<p id="test" class="test">Markdown paragraph.</p>
````````````````````````````````

Attribute values with a space must be enclosed in quotes:

```````````````````````````````` example
Markdown paragraph. {data-good="asdf lkj" data-bad=asdf lkj}
.
<p data-good="asdf lkj" data-bad="asdf">Markdown paragraph.</p>
````````````````````````````````

Attributes may also be written on the line following a block element:

```````````````````````````````` example
Markdown paragraph.
{#test .test ¶=1.1 data-attr="test" bad-attr="test"}
.
<p id="test" class="test" ¶="1.1" data-attr="test">Markdown paragraph.</p>
````````````````````````````````

```````````````````````````````` example
> Markdown blockquote. {.test}
.
<blockquote class="test">
<p>Markdown blockquote.</p>
</blockquote>
````````````````````````````````

```````````````````````````````` example
> Markdown blockquote.
> {.test}
.
<blockquote class="test">
<p>Markdown blockquote.</p>
</blockquote>
````````````````````````````````

OMD indented block quotes are not implemented yet, but attributes must work on them after they are implemented.

```````````````````````````````` example
    OMD blockquote. {#test}
.
<pre><code>OMD blockquote. {#test}
</code></pre>
````````````````````````````````

```````````````````````````````` example
    OMD blockquote.
    {#test}
.
<pre><code>OMD blockquote.
{#test}
</code></pre>
````````````````````````````````

OMD lists are not implemented yet, but attributes must work on them after they are implemented.

```````````````````````````````` example
- Markdown list item. {#test .test ¶=1.1}
.
<ul>
<li id="test" class="test" ¶="1.1">Markdown list item.</li>
</ul>
````````````````````````````````

```````````````````````````````` example
- Markdown list item.
{#test .test ¶=1.1}
.
<ul id="test" class="test" ¶="1.1">
<li>Markdown list item.</li>
</ul>
````````````````````````````````

For single-line block elements including headings and thematic breaks, attributes must be on the same line as the elements.

```````````````````````````````` example
# Markdown header. {.title}
.
<h1 class="title">Markdown header.</h1>
````````````````````````````````

```````````````````````````````` example
Markdown header. {.title}
----------------
.
<h2 class="title">Markdown header.</h2>
````````````````````````````````

```````````````````````````````` example
--- {.large}
.
<hr class="large" />
````````````````````````````````

Attributes **do not** work on the line **following** headers or thematic breaks.

```````````````````````````````` example
# Markdown header.
{.test}

Markdown header.
----------------
{.test}

---
{.test}
.
<h1>Markdown header.</h1>
<p class="test"></p>
<h2>Markdown header.</h2>
<p class="test"></p>
<hr />
<p class="test"></p>
````````````````````````````````

HTML attributes can follow inline elements:

```````````````````````````````` example
**Markdown**{.test} 
[![image](image.png){.image-test}](https://example.com){.link-test}
.
<p><strong class="test">Markdown</strong>
<a href="https://example.com" class="link-test"><img src="image.png" alt="image" class="image-test" /></a></p>
````````````````````````````````

Attributes for defined links or images must be placed directly after the inline element, not in relation to the definition.

```````````````````````````````` example
Markdown [link]{.test}.

Markdown [link][link]{.test}.

Markdown ![image][image]{#test .test}.

Markdown [badlink].

[link]: https://example.com
[image]: image.png
[badlink]: https://example.com {.badlink}
.
<p>Markdown <a href="https://example.com" class="test">link</a>.</p>
<p>Markdown <a href="https://example.com" class="test">link</a>.</p>
<p>Markdown <img src="image.png" alt="image" id="test" class="test" />.</p>
<p>Markdown [badlink].</p>
<p class="badlink">[badlink]: https://example.com</p>
````````````````````````````````

Potentially insecure HTML attributes are not rendered:

```````````````````````````````` example
![insecure](img.png){#test .test ¶=1.1 onload="alert(1)"}
.
<p><img src="img.png" alt="insecure" id="test" class="test" ¶="1.1" /></p>
````````````````````````````````

```````````````````````````````` example
Insecure paragraph. {#test .test ¶=1.1 oninput=alert(1) onfocus=alert(1)}
.
<p id="test" class="test" ¶="1.1">Insecure paragraph.</p>
````````````````````````````````

```````````````````````````````` example
Insecure paragraph. 
{#test .test ¶=1.1 oninput="alert(1)" onfocus="alert(1)"}
.
<p id="test" class="test" ¶="1.1">Insecure paragraph.</p>
````````````````````````````````


### Page numbers
[markdown-it-pagenumbers]: https://github.com/markdown-it/markdown-it-pagenumbers

Page numbers are [inline elements] defined exactly as implemented by the [markdown-it-pagenumbers] plugin.

### Typographic elements
[markdown-it-replacements]: https://github.com/edemaine/markdown-it-replacements

A limited list of typographic replacements are required by OFM, and these are obtained using the [markdown-it-replacements] plugin. The following typographic replacements are required:

- Copyright
- Trademark
- Registered trademark
- Em-dashes

```````````````````````````````` example
(c), (C)

(tm), (TM)

(r), (R)

--these -- are--all---em dashes --and these-- and this--
.
<p>©, ©</p>
<p>™, ™</p>
<p>®, ®</p>
<p>—these—are—all—em dashes —and these— and this—</p>
````````````````````````````````

Automated conversion of quotation marks to smart quotes, e.g. as implemented by markdown-it smart quotes, are not part of the OFM spec, but may be used provided that they do not change smart quotes that are explicitly written in the Markdown.

```````````````````````````````` example
'normal' "quotes" are replaced
’smart‘ ”quotes“ stay the same even if they are the wrong way
.
<p>‘normal’ “quotes” are replaced
’smart‘ ”quotes“ stay the same even if they are the wrong way</p>
````````````````````````````````

Typography replacement creates a number of divergences from Commonmark spec tests
which use dashes or quotation marks, including tests for
malformed thematic breaks,
escaped characters,
malformed emphasis,
malformed link definitions,
and malformed HTML tags and comments:

```````````````````````````````` example
_ _ _ _ a

a------

---a---
.
<p>_ _ _ _ a</p>
<p>a------</p>
<p>—a—</p>
````````````````````````````````

```````````````````````````````` example
[foo]: /url 'title

with blank line'

[foo]
.
<p>[foo]: /url 'title</p>
<p>with blank line’</p>
<p>[foo]</p>
````````````````````````````````

```````````````````````````````` example
[foo]: /url "title" ok
.
<p>[foo]: /url “title” ok</p>
````````````````````````````````

```````````````````````````````` example
[foo]: /url
"title" ok
.
<p>“title” ok</p>
````````````````````````````````

```````````````````````````````` example
\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~
.
<p>!&quot;#$%&amp;’()*+,-./:;&lt;=&gt;?@[\]^_`{|}~</p>
````````````````````````````````

```````````````````````````````` example
\*not emphasized*
\<br/> not a tag
\[not a link](/foo)
\`not code`
1\. not a list
\* not a list
\# not a heading
\[foo]: /url "not a reference"
\&ouml; not a character entity
.
<p>*not emphasized*
&lt;br/&gt; not a tag
[not a link](/foo)
`not code`
1. not a list
* not a list
# not a heading
[foo]: /url “not a reference”
&amp;ouml; not a character entity</p>
````````````````````````````````

```````````````````````````````` example
a*"foo"*
.
<p>a*“foo”*</p>
````````````````````````````````

```````````````````````````````` example
a_"foo"_
.
<p>a_“foo”_</p>
````````````````````````````````

```````````````````````````````` example
aa_"bb"_cc
.
<p>aa_“bb”_cc</p>
````````````````````````````````

```````````````````````````````` example
a**"foo"**
.
<p>a**“foo”**</p>
````````````````````````````````

```````````````````````````````` example
a__"foo"__
.
<p>a__“foo”__</p>
````````````````````````````````

```````````````````````````````` example
**foo "*bar*" foo**
.
<p><strong>foo “<em>bar</em>” foo</strong></p>
````````````````````````````````

```````````````````````````````` example
[link](/url "title "and" title")
.
<p>[link](/url “title “and” title”)</p>
````````````````````````````````

```````````````````````````````` example
![[foo]]

[[foo]]: /url "title"
.
<p>![[foo]]</p>
<p>[[foo]]: /url “title”</p>
````````````````````````````````

```````````````````````````````` example
<a h*#ref="hi">
.
<p>&lt;a h*#ref=“hi”&gt;</p>
````````````````````````````````

```````````````````````````````` example
<a href="hi'> <a href=hi'>
.
<p>&lt;a href=&quot;hi’&gt; &lt;a href=hi’&gt;</p>
````````````````````````````````

```````````````````````````````` example
<a href='bar'title=title>
.
<p>&lt;a href='bar’title=title&gt;</p>
````````````````````````````````

```````````````````````````````` example
</a href="foo">
.
<p>&lt;/a href=“foo”&gt;</p>
````````````````````````````````

```````````````````````````````` example
foo <!-- not a comment -- two hyphens -->
.
<p>foo &lt;!— not a comment—two hyphens —&gt;</p>
````````````````````````````````

```````````````````````````````` example
foo <!--> foo -->

foo <!-- foo--->
.
<p>foo &lt;!—&gt; foo —&gt;</p>
<p>foo &lt;!— foo—&gt;</p>
````````````````````````````````

### Underlined characters
[markdown-it-macron-underline]: https://github.com/dnotes/markdown-it-macron-underlines

Unicode combining macron below characters should be rendered as underline tags. In the examples below, the combining character has been replaced with an underline to show its relative position:

- Double macron (U+035F): `s_h` should be rendered as `<u>sh</u>`
- Single macron (U+0331): `h_` should be rendered as `<u>h</u>`

```````````````````````````````` example
The S͟hayk͟h and the Mu’ad͟hd͟hin

U̱nde̱rli̱ne̱d vo̱we̱ls
.
<p>The <u>Sh</u>ay<u>kh</u> and the Mu’a<u>dh</u><u>dh</u>in</p>
<p><u>U</u>nd<u>e</u>rl<u>i</u>n<u>e</u>d v<u>o</u>w<u>e</u>ls</p>
````````````````````````````````

## Right-To-Left Language Support

OFM is committed to supporting markdown written in right-to-left scripts, which is not well supported by Markdown or Commonmark. The nature of this support is still under discussion, but it may entail ensuring that any markdown syntax that relies on direction-specific delimiters, such as brackets or parentheses, work just as well in the opposite direction, such that `]link[)url(` is equivalent to `[link](url)`. This could be done either by altering the parsers to recognize the delimiters in reverse, or possibly by using a preprocessor to replace RTL syntax delimiters with standard ones.
