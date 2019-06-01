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

--these -- are--all---em-dashes --and these-- and this--
.
<p>©, ©</p>
<p>™, ™</p>
<p>®, ®</p>
<p>—these—are—all—em-dashes —and these— and this—</p>
````````````````````````````````

Automated conversion of quotation marks to smart quotes, e.g. as implemented by markdown-it smart quotes, are not part of the OFM spec, but may be used provided that they do not change smart quotes that are explicitly written in the Markdown.

```````````````````````````````` example
'normal' "quotes" are replaced
’smart‘ ”quotes“ stay the same even if they are the wrong way
.
<p>‘normal’ “quotes” are replaced
’smart‘ ”quotes“ stay the same even if they are the wrong way</p>
````````````````````````````````

### Underlined characters
[markdown-it-macron-underline]: https://github.com/dnotes/markdown-it-macron-underlines

Unicode combining macron below characters should be rendered as underline tags. In the examples below, the combining character has been replaced with an underline to show its relative position:

- Double macron (U+035F): `s_h` should be rendered as `<u>sh</u>`
- Single macron (U+0331): `h_` should be rendered as `<u>h</u>`



## Right-To-Left Language Support

OFM is committed to supporting markdown written in right-to-left scripts, which is not well supported by Markdown or Commonmark. The nature of this support is still under discussion, but it may entail ensuring that any markdown syntax that relies on direction-specific delimiters, such as brackets or parentheses, work just as well in the opposite direction, such that `]link[)url(` is equivalent to `[link](url)`. This could be done either by altering the parsers to recognize the delimiters in reverse, or possibly by using a preprocessor to replace RTL syntax delimiters with standard ones.
