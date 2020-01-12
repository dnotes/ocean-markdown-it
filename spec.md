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
    - [HTML blocks] ([1])
    - [Link reference definitions] ([2])
    - [Paragraphs]
    - [Blank lines]
- [Container blocks]
    - [Block quotes] ([1])
- [Inlines]
    - [Entity and numeric character references]
    - [Links] ([2])
    - [Images] ([2])
    - [Autolinks]
    - [Raw HTML] ([1])
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
### [Thematic breaks]

Thematic breaks work just as in Commonmark, with a few exceptions owing to the changes related to indented code blocks and list items:

Thematic breaks: Commonmark #18 (590)
> Four spaces is too many:
```````````````````````````````` example
    ***
.
<hr />
````````````````````````````````

Thematic breaks: Commonmark #27 (675)
> Thematic breaks do not need blank lines before or after:
```````````````````````````````` example
- foo
***
- bar
.
<p class="li indent-1">- foo</p>

<hr />
<p class="li indent-1">- bar</p>
````````````````````````````````

**Thematic breaks: Commonmark #30 (722)**
> When both a thematic break and a list item are possible
> interpretations of a line, the thematic break takes precedence:
```````````````````````````````` example
* Foo
* * *
* Bar
.
<p class="indent-1">
<span class="li">* Foo</span>
</p>
<hr />
<p class="li indent-1">* Bar</p>
````````````````````````````````

Thematic breaks: Commonmark #31 (739)
> If you want a thematic break in a list item, use a different bullet:
```````````````````````````````` example
- Foo
- * * *
.
<p class="indent-1">
<span class="li">- Foo</span>
<span class="li li4">- * * *</span>
</p>
````````````````````````````````


### [Indented code blocks]

Indented blocks in OFM are treated as block quotes, not as code. The first line of a multi-line paragraph of text may be indented without becoming a block quote.

**Justification**: In [literature] it is a standard convention that long quotations are written as indented free-standing text blocks, and such quotations are common while code is almost nonexistent.

Tabs: Commonmark #1 (352)
```````````````````````````````` example
→foo→baz→→bim
.
<p class="blockquote bq-1 indent-1">foo	baz		bim</p>
````````````````````````````````

Tabs: Commonmark #2 (359)
```````````````````````````````` example
  →foo→baz→→bim
.
<p class="blockquote bq-1 indent-1">foo	baz		bim</p>
````````````````````````````````

Tabs: Commonmark #3 (366)
```````````````````````````````` example
    a→a
    ὐ→a
.
<p class="blockquote bq-1 indent-1">a	a
ὐ	a</p>
````````````````````````````````

Tabs: Commonmark #5 (392)
```````````````````````````````` example
- foo

→→bar
.
<p class="li indent-1">- foo</p>
<p class="li blockquote bq-1 indent-2">bar</p>
````````````````````````````````

Tabs: Commonmark #6 (415)
```````````````````````````````` example
>→→foo
.
<p class="blockquote bq-2 indent-2">foo</p>
````````````````````````````````

Tabs: Commonmark #7 (424)
```````````````````````````````` example
-→→foo
.
<p class="li blockquote bq-1 indent-2">- foo</p>
````````````````````````````````

Tabs: Commonmark #8 (436)
```````````````````````````````` example
    foo
→bar
.
<p class="blockquote bq-1 indent-1">foo
bar</p>
````````````````````````````````

ATX headings: Commonmark #39 (854)
> Four spaces are too much:
```````````````````````````````` example
    # foo
.
<h1>foo</h1>
````````````````````````````````

Setext headings: Commonmark #55 (1079)
> Four spaces indent is too much:
```````````````````````````````` example
    Foo
    ---

    Foo
---
.
<h2>Foo</h2>
<p>Foo</p>
<hr />
````````````````````````````````

Setext headings: Commonmark #70 (1276)
```````````````````````````````` example
    foo
---
.
<p>foo</p>
<hr />
````````````````````````````````

Indented code blocks: Commonmark #77 (1408)
```````````````````````````````` example
    a simple
      indented code block
.
<p class="blockquote bq-1 indent-1">a simple
indented code block</p>
````````````````````````````````

Indented code blocks: Commonmark #78 (1422)
> If there is any ambiguity between an interpretation of indentation
> as a code block and as indicating that material belongs to a [list
> item][list items], the list item interpretation takes precedence:
```````````````````````````````` example
  - foo

    bar
.
<p class="li indent-1">- foo</p>
<p class="li indent-1">bar</p>
````````````````````````````````

Indented code blocks: Commonmark #79 (1436)
```````````````````````````````` example
1.  foo

    - bar
.
<p class="li indent-1">1. foo</p>
<p class="li li2 indent-2">- bar</p>
````````````````````````````````

Indented code blocks: Commonmark #80 (1456)
> The contents of a code block are literal text, and do not get parsed
> as Markdown:
```````````````````````````````` example
    <a/>
    *hi*

    - one
.
<a/>
*hi*
<p class="li blockquote bq-1 indent-2">- one</p>
````````````````````````````````

Indented code blocks: Commonmark #81 (1472)
> Here we have three chunks separated by blank lines:
```````````````````````````````` example
    chunk1

    chunk2
  
 
 
    chunk3
.
<p class="blockquote bq-1 indent-1">chunk1</p>
<p class="blockquote bq-1 indent-1">chunk2</p>
<p class="blockquote bq-1 indent-1">chunk3</p>
````````````````````````````````

Indented code blocks: Commonmark #82 (1495)
> Any initial spaces beyond four will be included in the content, even
> in interior blank lines:
```````````````````````````````` example
    chunk1
      
      chunk2
.
<p class="blockquote bq-1 indent-1">chunk1</p>
<p class="blockquote bq-1 indent-1">chunk2</p>
````````````````````````````````

Indented code blocks: Commonmark #84 (1524)
> However, any non-blank line with fewer than four leading spaces ends
> the code block immediately.  So a paragraph may occur immediately
> after indented code:
```````````````````````````````` example
    foo
bar
.
<p>foo
bar</p>
````````````````````````````````

**Indented code blocks: Commonmark #85 (1537)**
> And indented code can occur immediately before and after other kinds of
> blocks:
```````````````````````````````` example
# Heading
    foo
Heading
------
    foo
----
.
<h1>Heading</h1>
<p>foo
Heading</p>
<hr />
<p>foo</p>
<hr />
````````````````````````````````

Indented code blocks: Commonmark #86 (1557)
> The first line can be indented more than four spaces:
```````````````````````````````` example
        foo
    bar
.
<p class="blockquote bq-1 indent-1">foo
bar</p>
````````````````````````````````

Indented code blocks: Commonmark #87 (1570)
> Blank lines preceding or following an indented code block
> are not included in it:
```````````````````````````````` example

    
    foo
    

.
<p class="blockquote bq-1 indent-1">foo</p>
````````````````````````````````

Indented code blocks: Commonmark #88 (1584)
> Trailing spaces are included in the code block's content:
```````````````````````````````` example
    foo  
.
<p class="blockquote bq-1 indent-1">foo</p>
````````````````````````````````

Fenced code blocks: Commonmark #98 (1750)
```````````````````````````````` example
> ```
> aaa

bbb
.
<pre><code class="blockquote bq-1 indent-1">aaa
</code></pre>
<p>bbb</p>
````````````````````````````````

Fenced code blocks: Commonmark #104 (1834)
> Four spaces indentation produces an indented code block:
```````````````````````````````` example
    ```
    aaa
    ```
.
<pre><code class="blockquote bq-1 indent-1">aaa
</code></pre>
````````````````````````````````

Paragraphs: Commonmark #195 (3247)
```````````````````````````````` example
    aaa
bbb
.
<p>aaa
bbb</p>
````````````````````````````````


### [Emphasis and strong emphasis]
[markdown-it-underline]: https://www.npmjs.com/package/markdown-it-underline

In addition to emphasis and strong emphasis, OFM adds support for the unarticulated annotation (\<u\>) tag as defined in [markdown-it-underline]. Note that this is a valid semantic tag in HTML5, specified to provide an "unarticulated, though explicitly rendered, non-textual annotation" to text, and OFM uses it to mark text that is underlined in the literary context. Most browsers will render this as underlined text by default.

```````````````````````````````` example
text _between underscores_ vs *between stars*
.
<p>text <u>between underscores</u> vs <em>between stars</em></p>
````````````````````````````````

**Justification**: Underlined text is extremely common in [literature], and OFM uses an [existing implementation] to provide support for it.

Two underscores still renders as a strong tag:
```````````````````````````````` example
__stay strong__
.
<p><strong>stay strong</strong></p>
````````````````````````````````

Underlined text can be nested with em and strong:
```````````````````````````````` example
some ***_text_*** here

some _***text***_ here

some _**_text_**_ here
.
<p>some <em><strong><u>text</u></strong></em> here</p>
<p>some <u><em><strong>text</strong></em></u> here</p>
<p>some <u><strong><u>text</u></strong></u> here</p>
````````````````````````````````

Underlined text can not cross paragraphs:
```````````````````````````````` example
_Underlined text must be terminated within the paragraph.

This does not work._
.
<p>_Underlined text must be terminated within the paragraph.</p>
<p>This does not work._</p>
````````````````````````````````

HTML blocks: Commonmark #118 (2087)
```````````````````````````````` example
<table><tr><td>
<pre>
**Hello**,

_world_.
</pre>
</td></tr></table>
.
<table><tr><td>
<pre>
**Hello**,
<p><u>world</u>.
</pre></p>
</td></tr></table>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #356 (6347)
```````````````````````````````` example
_foo bar_
.
<p><u>foo bar</u></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #363 (6411)
```````````````````````````````` example
foo-_(bar)_
.
<p>foo-<u>(bar)</u></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #372 (6506)
```````````````````````````````` example
_(_foo_)_
.
<p><u>(<u>foo</u>)</u></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #375 (6529)
```````````````````````````````` example
_foo_bar_baz_
.
<p><u>foo_bar_baz</u></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #376 (6540)
> This is emphasis, even though the closing delimiter is
> both left- and right-flanking, because it is followed by
> punctuation:
```````````````````````````````` example
_(bar)_.
.
<p><u>(bar)</u>.</p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #398 (6752)
> The point of this restriction is more easily appreciated
> with this example:
```````````````````````````````` example
_(__foo__)_
.
<p><u>(<strong>foo</strong>)</u></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #405 (6817)
> In particular, emphasis and strong emphasis can be nested
> inside emphasis:
```````````````````````````````` example
_foo __bar__ baz_
.
<p><u>foo <strong>bar</strong> baz</u></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #406 (6824)
```````````````````````````````` example
_foo _bar_ baz_
.
<p><u>foo <u>bar</u> baz</u></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #407 (6831)
```````````````````````````````` example
__foo_ bar_
.
<p><u><u>foo</u> bar</u></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #423 (6983)
> In particular, emphasis and strong emphasis can be nested
> inside strong emphasis:
```````````````````````````````` example
__foo _bar_ baz__
.
<p><strong>foo <u>bar</u> baz</strong></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #448 (7174)
```````````````````````````````` example
foo _\__
.
<p>foo <u>_</u></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #449 (7181)
```````````````````````````````` example
foo _*_
.
<p>foo <u>*</u></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #453 (7209)
```````````````````````````````` example
__foo_
.
<p>_<u>foo</u></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #454 (7220)
> Note that when delimiters do not match evenly, Rule 12 determines
> that the excess literal `_` characters will appear outside of the
> emphasis, rather than inside it:
```````````````````````````````` example
_foo__
.
<p><u>foo</u>_</p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #456 (7234)
```````````````````````````````` example
____foo_
.
<p>___<u>foo</u></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #458 (7248)
```````````````````````````````` example
_foo____
.
<p><u>foo</u>___</p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #460 (7265)
```````````````````````````````` example
*_foo_*
.
<p><em><u>foo</u></em></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #462 (7279)
```````````````````````````````` example
_*foo*_
.
<p><u><em>foo</em></u></p>
````````````````````````````````

Emphasis and strong emphasis: Commonmark #467 (7323)
```````````````````````````````` example
_____foo_____
.
<p><u><strong><strong>foo</strong></strong></u></p>
````````````````````````````````

[Code spans]: Commonmark #478 (7406), Ocean #168 (2224)
```````````````````````````````` example
_a `_`_
.
<p><u>a `</u>`_</p>
````````````````````````````````


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

The use of HTML blocks is discouraged in OFM, and may be limited or deprecated in future. In some cases, when HTML blocks are combined with blockquotes or list items, the results differ from Commonmark spec.

HTML blocks: Commonmark #143 (2466)
```````````````````````````````` example
> <div>
> foo

bar
.
<div>
foo
<p>bar</p>
````````````````````````````````

HTML blocks: Commonmark #144 (2480)
```````````````````````````````` example
- <div>
- foo
.
<p class="indent-1">
<span class="li">- <div></span>
<span class="li">- foo</span>
</p>
````````````````````````````````

HTML blocks: Commonmark #152 (2608)
> The opening tag can be indented 1-3 spaces, but not 4:
```````````````````````````````` example
  <!-- foo -->

    <!-- foo -->
.
  <!-- foo -->
<!-- foo -->
````````````````````````````````

HTML blocks: Commonmark #153 (2619)
```````````````````````````````` example
  <div>

    <div>
.
  <div>
<div>
````````````````````````````````

HTML blocks: Commonmark #160 (2768)
> There are problems, however, if the inner tags are indented
> *and* separated by spaces, as then they will be interpreted as
> an indented code block:
```````````````````````````````` example
<table>

  <tr>

    <td>
      Hi
    </td>

  </tr>

</table>
.
<table>
  <tr>
<td>
  Hi
</td>
  </tr>
</table>
````````````````````````````````

### [Link reference definitions]

Link reference definitions work exactly as in Commonmark, except in some edge cases as when combined with indented quotes.

Link reference definitions: Commonmark #180 (3038)
> This is not a link reference definition, because it is indented
> four spaces:
```````````````````````````````` example
    [foo]: /url "title"

[foo]
.
<p><a href="/url" title="title">foo</a></p>
````````````````````````````````

Link reference definitions: Commonmark #183 (3082)
> However, it can directly follow other block elements, such as headings
> and thematic breaks, and it need not be followed by a blank line.
```````````````````````````````` example
# [Foo]
[foo]: /url
> bar
.
<h1><a href="/url">Foo</a></h1>
<p class="blockquote bq-1 indent-1">bar</p>
````````````````````````````````

Empty blockquotes: Commonmark #187 (3137), MarkdownIT #1 (18)
> Link reference definitions: Commonmark #187 (3137)
> [Link reference definitions] can occur
> inside block containers, like lists and block quotations.  They
> affect the entire document, not just the container in which they
> are defined:
```````````````````````````````` example
[foo]

> [foo]: /url
.
<p><a href="/url">foo</a></p>
````````````````````````````````


<!-- Container blocks -->
### [Block quotes]

Block quotes in OFM are indicated by indentation. The Commonmark block quote syntax is also supported, though all blockquotes in OFM are rendered as flat paragraphs, e.g. `<p class="blockquote bq1 indent-1">`.

OFM also indicates the indent level of blockquote paragraphs with a class, e.g. `<p class="blockquote bq1 indent-1">`. The indent level increases with each nested list item or blockquote.

**Justification**: Commonmark block quotes use a syntax that is never used in [literature], so it does no harm to [maintain functionality] by allowing the syntax. However, where Commonmark block quotes are rendered as block elements which may contain headings and thematic breaks, in [literature] such structures are not used, and OFM renders all blockquotes as paragraphs to obtain a [flat structure].

Block quotes: Commonmark #198 (3344)
```````````````````````````````` example
> # Foo
> bar
> baz
.
<h1>Foo</h1>
<p class="blockquote bq-1 indent-1">bar
baz</p>
````````````````````````````````

Block quotes: Commonmark #199 (3359)
> The spaces after the `>` characters can be omitted:
```````````````````````````````` example
># Foo
>bar
> baz
.
<h1>Foo</h1>
<p class="blockquote bq-1 indent-1">bar
baz</p>
````````````````````````````````

Block quotes: Commonmark #200 (3374)
> The `>` characters can be indented 1-3 spaces:
```````````````````````````````` example
   > # Foo
   > bar
 > baz
.
<h1>Foo</h1>
<p class="blockquote bq-1 indent-1">bar
baz</p>
````````````````````````````````

Block quotes: Commonmark #201 (3389)
> Four spaces gives us a code block:
```````````````````````````````` example
    > # Foo
    > bar
    > baz
.
<h1>Foo</h1>
<p class="blockquote bq-2 indent-2">bar
baz</p>
````````````````````````````````

Block quotes: Commonmark #202 (3404)
> The Laziness clause allows us to omit the `>` before
> [paragraph continuation text]:
```````````````````````````````` example
> # Foo
> bar
baz
.
<h1>Foo</h1>
<p class="blockquote bq-1 indent-1">bar
baz</p>
````````````````````````````````

Block quotes: Commonmark #203 (3420)
> A block quote can contain some lazy and some non-lazy
> continuation lines:
```````````````````````````````` example
> bar
baz
> foo
.
<p class="blockquote bq-1 indent-1">bar
baz
foo</p>
````````````````````````````````

Block quotes: Commonmark #204 (3444)
> without changing the meaning:
```````````````````````````````` example
> foo
---
.
<p class="blockquote bq-1 indent-1">foo</p>
<hr />
````````````````````````````````

Block quotes: Commonmark #205 (3464)
> then the block quote ends after the first line:
```````````````````````````````` example
> - foo
- bar
.
<p class="blockquote bq-1 indent-2">
<span class="li">- foo</span>
</p>
<p class="li indent-1">- bar</p>
````````````````````````````````

Block quotes: Commonmark #206 (3482)
> For the same reason, we can't omit the `> ` in front of
> subsequent lines of an indented or fenced code block:
```````````````````````````````` example
>     foo
    bar
.
<p class="blockquote bq-1 indent-1">foo
bar</p>
````````````````````````````````

Block quotes: Commonmark #207 (3495)
```````````````````````````````` example
> ```
foo
```
.
<pre><code class="blockquote bq-1 indent-1"></code></pre>
<p>foo</p>
<pre><code></code></pre>
````````````````````````````````

Block quotes: Commonmark #208 (3511)
> Note that in the following case, we have a [lazy
> continuation line]:
```````````````````````````````` example
> foo
    - bar
.
<p class="blockquote bq-1 indent-1">foo
- bar</p>
````````````````````````````````

Empty blockquotes: Commonmark #209 (3535), MarkdownIT #2 (29)
> Block quotes: Commonmark #209-210 (3535)
> A block quote can be empty:
```````````````````````````````` example
>
.
````````````````````````````````

Empty blockquotes: Commonmark #210 (3543), MarkdownIT #3 (35)
```````````````````````````````` example
>
>  
> 
.
````````````````````````````````

Block quotes: Commonmark #211 (3555)
> A block quote can have initial or final blank lines:
```````````````````````````````` example
>
> foo
>  
.
<p class="blockquote bq-1 indent-1">foo</p>
````````````````````````````````

Block quotes: Commonmark #212 (3568)
> A blank line always separates block quotes:
```````````````````````````````` example
> foo

> bar
.
<p class="blockquote bq-1 indent-1">foo</p>
<p class="blockquote bq-1 indent-1">bar</p>
````````````````````````````````

Block quotes: Commonmark #213 (3590)
> Consecutiveness means that if we put these block quotes together,
> we get a single block quote:
```````````````````````````````` example
> foo
> bar
.
<p class="blockquote bq-1 indent-1">foo
bar</p>
````````````````````````````````

Block quotes: Commonmark #214 (3603)
> To get a block quote with two paragraphs, use:
```````````````````````````````` example
> foo
>
> bar
.
<p class="blockquote bq-1 indent-1">foo</p>
<p class="blockquote bq-1 indent-1">bar</p>
````````````````````````````````

Block quotes: Commonmark #215 (3617)
> Block quotes can interrupt paragraphs:
```````````````````````````````` example
foo
> bar
.
<p>foo</p>
<p class="blockquote bq-1 indent-1">bar</p>
````````````````````````````````

Block quotes: Commonmark #216 (3631)
> In general, blank lines are not needed before or after block
> quotes:
```````````````````````````````` example
> aaa
***
> bbb
.
<p class="blockquote bq-1 indent-1">aaa</p>
<hr />
<p class="blockquote bq-1 indent-1">bbb</p>
````````````````````````````````

Block quotes: Commonmark #217 (3649)
> However, because of laziness, a blank line is needed between
> a block quote and a following paragraph:
```````````````````````````````` example
> bar
baz
.
<p class="blockquote bq-1 indent-1">bar
baz</p>
````````````````````````````````

Block quotes: Commonmark #218 (3660)
```````````````````````````````` example
> bar

baz
.
<p class="blockquote bq-1 indent-1">bar</p>
<p>baz</p>
````````````````````````````````

Block quotes: Commonmark #219 (3672)
```````````````````````````````` example
> bar
>
baz
.
<p class="blockquote bq-1 indent-1">bar</p>
<p>baz</p>
````````````````````````````````

Block quotes: Commonmark #220 (3688)
> It is a consequence of the Laziness rule that any number
> of initial `>`s may be omitted on a continuation line of a
> nested block quote:
```````````````````````````````` example
> > > foo
bar
.
<p class="blockquote bq-3 indent-3">foo
bar</p>
````````````````````````````````

Block quotes: Commonmark #221 (3703)
```````````````````````````````` example
>>> foo
> bar
>>baz
.
<p class="blockquote bq-3 indent-3">foo
bar
baz</p>
````````````````````````````````

**Block quotes: Commonmark #222 (3725)**
```````````````````````````````` example
>     code

>    not code
.
<p class="blockquote bq-2 indent-2">code</p>
<p class="blockquote bq-1 indent-1">not code</p>
````````````````````````````````

Setext headings: Commonmark #62 (1175)
> The setext heading underline cannot be a [lazy continuation
> line] in a list item or block quote:
```````````````````````````````` example
> Foo
---
.
<p class="blockquote bq-1 indent-1">Foo</p>
<hr />
````````````````````````````````

Setext headings: Commonmark #63 (1186)
```````````````````````````````` example
> foo
bar
===
.
<p class="blockquote bq-1 indent-1">foo
bar
===</p>
````````````````````````````````

Setext headings: Commonmark #71 (1286)
```````````````````````````````` example
> foo
-----
.
<p class="blockquote bq-1 indent-1">foo</p>
<hr />
````````````````````````````````


### [List items] and [Lists]

OFM does not support rendering HTML lists. Instead, list items in OFM are treated as [leaf blocks] instead of [container blocks], and are defined exactly as in [markdown-it-flat-lists], viz.:

- list items are rendered as paragraphs or spans with a class of "li", e.g. `<p class="li">`
- nested list items are indicated by a level class, e.g. `<p class="li li2">`
- list items in general cannot contain block-level elements
- list items can contain multiple paragraphs
- "tight" lists (such as this one) are rendered as a single paragraph with items as `<span class="li">`

OFM also indicates the indent level of list item paragraphs with a class, e.g. `<p class="li indent-1">`. The indent level increases with each nested list item or blockquote.

**Justification**: Lists within [literature] perform a very different function from HTML lists, and are generally intended to be understood by human readers based on the structure of the document instead of semantic tags. They almost never contain nested control elements (headings or thematic breaks). In almost no case is there any advantage in maintaining the semantic nature of an html list, and collapsing list items into regular paragraphs affords a [flat structure].

List items: Commonmark #223 (3779)
```````````````````````````````` example
A paragraph
with two lines.

    indented code

> A block quote.
.
<p>A paragraph
with two lines.</p>
<p class="blockquote bq-1 indent-1">indented code</p>
<p class="blockquote bq-1 indent-1">A block quote.</p>
````````````````````````````````

List items: Commonmark #224 (3801)
```````````````````````````````` example
1.  A paragraph
    with two lines.

        indented code

    > A block quote.
.
<p class="li indent-1">1. A paragraph
with two lines.</p>
<p class="li blockquote bq-1 indent-2">indented code</p>
<p class="li blockquote bq-1 indent-2">A block quote.</p>
````````````````````````````````

Tabs: Commonmark #4 (379)
> In the following example, a continuation paragraph of a list
> item is indented with a tab; this has exactly the same effect
> as indentation with four spaces would:
```````````````````````````````` example
  - foo

→bar
.
<p class="li indent-1">- foo</p>
<p class="li indent-1">bar</p>
````````````````````````````````

Tabs: Commonmark #9 (445)
```````````````````````````````` example
 - foo
   - bar
→ - baz
.
<p class="indent-1">
<span class="li">- foo</span>
<span class="li li2">- bar</span>
<span class="li li3">- baz baz</span>
</p>
````````````````````````````````

Precedence: Commonmark #12 (496)
> Indicators of block structure always take precedence over indicators
> of inline structure.  So, for example, the following is a list with
> two items, not a list with one item containing a code span:
```````````````````````````````` example
- `one
- two`
.
<p class="indent-1">
<span class="li">- `one</span>
<span class="li">- two`</span>
</p>
````````````````````````````````

List items: Commonmark #225 (3834)
```````````````````````````````` example
- one

 two
.
<p class="li indent-1">- one</p>

<p>two</p>
````````````````````````````````

List items: Commonmark #226 (3846)
```````````````````````````````` example
- one

  two
.
<p class="li indent-1">- one</p>
<p class="li indent-1">two</p>
````````````````````````````````

List items: Commonmark #227 (3860)
```````````````````````````````` example
 -    one

     two
.
<p class="li indent-1">- one</p>
<p class="blockquote bq-1 indent-1">two</p>
````````````````````````````````

List items: Commonmark #228 (3873)
```````````````````````````````` example
 -    one

      two
.
<p class="li indent-1">- one</p>
<p class="li indent-1">two</p>
````````````````````````````````

List items: Commonmark #229 (3895)
> It is tempting to think of this in terms of columns:  the continuation
> blocks must be indented at least to the column of the first
> [non-whitespace character] after the list marker. However, that is not quite right.
> The spaces after the list marker determine how much relative indentation
> is needed.  Which column this indentation reaches will depend on
> how the list item is embedded in other constructions, as shown by
> this example:
```````````````````````````````` example
   > > 1.  one
>>
>>     two
.
<p class="li blockquote bq-2 indent-3">1. one</p>
<p class="li blockquote bq-2 indent-3">two</p>
````````````````````````````````

List items: Commonmark #230 (3922)
> The converse is also possible.  In the following example, the word `two`
> occurs far to the right of the initial text of the list item, `one`, but
> it is not considered part of the list item, because it is not indented
> far enough past the blockquote marker:
```````````````````````````````` example
>>- one
>>
  >  > two
.
<p class="li blockquote bq-2 indent-3">- one</p>

<p class="blockquote bq-2 indent-2">two</p>
````````````````````````````````

List items: Commonmark #232 (3954)
> A list item may contain blocks that are separated by more than
> one blank line.
```````````````````````````````` example
- foo


  bar
.
<p class="li indent-1">- foo</p>
<p class="li indent-1">bar</p>
````````````````````````````````

List items: Commonmark #233 (3971)
> A list item may contain any kind of block:
```````````````````````````````` example
1.  foo

    ```
    bar
    ```

    baz

    > bam
.
<p class="li indent-1">1. foo</p>
<pre><code class="indent-1">bar
</code></pre>
<p class="li indent-1">baz</p>
<p class="li blockquote bq-1 indent-2">bam</p>
````````````````````````````````

List items: Commonmark #234 (3999)
> A list item that contains an indented code block will preserve
> empty lines within the code block verbatim.
```````````````````````````````` example
- Foo

      bar


      baz
.
<p class="li indent-1">- Foo</p>
<p class="li blockquote bq-1 indent-2">bar</p>
<p class="li blockquote bq-1 indent-2">baz</p>
````````````````````````````````

List items: Commonmark #235 (4021)
> Note that ordered list start numbers must be nine digits or less:
```````````````````````````````` example
123456789. ok
.
<p class="li indent-1">123456789. ok</p>
````````````````````````````````

List items: Commonmark #237 (4039)
> A start number may begin with 0s:
```````````````````````````````` example
0. ok
.
<p class="li indent-1">0. ok</p>
````````````````````````````````

List items: Commonmark #238 (4048)
```````````````````````````````` example
003. ok
.
<p class="li indent-1">003. ok</p>
````````````````````````````````

List items: Commonmark #240 (4082)
> An indented code block will have to be indented four spaces beyond
> the edge of the region where text will be included in the list item.
> In the following case that is 6 spaces:
```````````````````````````````` example
- foo

      bar
.
<p class="li indent-1">- foo</p>
<p class="li blockquote bq-1 indent-2">bar</p>
````````````````````````````````

List items: Commonmark #241 (4099)
> And in this case it is 11 spaces:
```````````````````````````````` example
  10.  foo

           bar
.
<p class="li indent-1">10. foo</p>
<p class="li blockquote bq-1 indent-2">bar</p>
````````````````````````````````

List items: Commonmark #242 (4118)
> If the *first* block in the list item is an indented code block,
> then by rule #2, the contents must be indented *one* space after the
> list marker:
```````````````````````````````` example
    indented code

paragraph

    more code
.
<p class="blockquote bq-1 indent-1">indented code</p>
<p>paragraph</p>
<p class="blockquote bq-1 indent-1">more code</p>
````````````````````````````````

List items: Commonmark #243 (4133)
```````````````````````````````` example
1.     indented code

   paragraph

       more code
.
<p class="li blockquote bq-1 indent-2">1. indented code</p>
<p class="li indent-1">paragraph</p>
<p class="li blockquote bq-1 indent-2">more code</p>
````````````````````````````````

List items: Commonmark #244 (4155)
> Note that an additional space indent is interpreted as space
> inside the code block:
```````````````````````````````` example
1.      indented code

   paragraph

       more code
.
<p class="li blockquote bq-1 indent-2">1. indented code</p>
<p class="li indent-1">paragraph</p>
<p class="li blockquote bq-1 indent-2">more code</p>
````````````````````````````````

List items: Commonmark #246 (4192)
```````````````````````````````` example
-    foo

  bar
.
<p class="li indent-1">- foo</p>

<p>bar</p>
````````````````````````````````

List items: Commonmark #247 (4209)
> This is not a significant restriction, because when a block begins
> with 1-3 spaces indent, the indentation can always be removed without
> a change in interpretation, allowing rule #1 to be applied.  So, in
> the above case:
```````````````````````````````` example
-  foo

   bar
.
<p class="li indent-1">- foo</p>
<p class="li indent-1">bar</p>
````````````````````````````````

List items: Commonmark #248 (4237)
> Here are some list items that start with a blank line but are not empty:
```````````````````````````````` example
-
  foo
-
  ```
  bar
  ```
-
      baz
.
<p class="li indent-1">- foo</p>
<pre><code class="indent-1">bar
</code></pre>
<p class="li blockquote bq-1 indent-2">- baz</p>
````````````````````````````````

List items: Commonmark #249 (4263)
> When the list item starts with a blank line, the number of spaces
> following the list marker doesn't change the required indentation:
```````````````````````````````` example
-   
  foo
.
<p class="li indent-1">- foo</p>
````````````````````````````````

List items: Commonmark #250 (4277)
> A list item can begin with at most one blank line.
> In the following example, `foo` is not part of the list
> item:
```````````````````````````````` example
-

  foo
.
<p class="li indent-1">-</p>

<p>foo</p>
````````````````````````````````

**List items: Commonmark #251 (4291)**
> Here is an empty bullet list item:
```````````````````````````````` example
- foo
-
- bar
.
<p class="indent-1">
<span class="li">- foo</span>
<span class="li">- bar</span>
</p>
````````````````````````````````

**List items: Commonmark #252 (4306)**
> It does not matter whether there are spaces following the [list marker]:
```````````````````````````````` example
- foo
-   
- bar
.
<p class="indent-1">
<span class="li">- foo</span>
<span class="li">- bar</span>
</p>
````````````````````````````````

**List items: Commonmark #253 (4321)**
> Here is an empty ordered list item:
```````````````````````````````` example
1. foo
2.
3. bar
.
<p class="indent-1">
<span class="li">1. foo</span>
<span class="li">3. bar</span>
</p>
````````````````````````````````

List items: Commonmark #254 (4336)
> A list may start or end with an empty list item:
```````````````````````````````` example
*
.
<p class="li indent-1">*</p>
````````````````````````````````

List items: Commonmark #256 (4368)
> Indented one space:
```````````````````````````````` example
 1.  A paragraph
     with two lines.

         indented code

     > A block quote.
.
<p class="li indent-1">1. A paragraph
with two lines.</p>
<p class="li blockquote bq-1 indent-2">indented code</p>
<p class="li blockquote bq-1 indent-2">A block quote.</p>
````````````````````````````````

List items: Commonmark #257 (4392)
> Indented two spaces:
```````````````````````````````` example
  1.  A paragraph
      with two lines.

          indented code

      > A block quote.
.
<p class="li indent-1">1. A paragraph
with two lines.</p>
<p class="li blockquote bq-1 indent-2">indented code</p>
<p class="li blockquote bq-1 indent-2">A block quote.</p>
````````````````````````````````

List items: Commonmark #258 (4416)
> Indented three spaces:
```````````````````````````````` example
   1.  A paragraph
       with two lines.

           indented code

       > A block quote.
.
<p class="li indent-1">1. A paragraph
with two lines.</p>
<p class="li blockquote bq-1 indent-2">indented code</p>
<p class="li blockquote bq-1 indent-2">A block quote.</p>
````````````````````````````````

List items: Commonmark #259 (4440)
> Four spaces indent gives a code block:
```````````````````````````````` example
    1.  A paragraph
        with two lines.

            indented code

        > A block quote.
.
<p class="li blockquote bq-1 indent-2">1. A paragraph
with two lines.</p>
<p class="li blockquote bq-2 indent-3">indented code</p>
<p class="li blockquote bq-2 indent-3">A block quote.</p>
````````````````````````````````

List items: Commonmark #260 (4470)
> Here is an example with [lazy continuation lines]:
```````````````````````````````` example
  1.  A paragraph
with two lines.

          indented code

      > A block quote.
.
<p class="li indent-1">1. A paragraph
with two lines.</p>
<p class="li blockquote bq-1 indent-2">indented code</p>
<p class="li blockquote bq-1 indent-2">A block quote.</p>
````````````````````````````````

List items: Commonmark #261 (4494)
> Indentation can be partially deleted:
```````````````````````````````` example
  1.  A paragraph
    with two lines.
.
<p class="li indent-1">1. A paragraph
with two lines.</p>
````````````````````````````````

List items: Commonmark #262 (4507)
> These examples show how laziness can work in nested structures:
```````````````````````````````` example
> 1. > Blockquote
continued here.
.
<p class="li blockquote bq-2 indent-3">1. Blockquote
continued here.</p>
````````````````````````````````

List items: Commonmark #263 (4524)
```````````````````````````````` example
> 1. > Blockquote
> continued here.
.
<p class="li blockquote bq-2 indent-3">1. Blockquote
continued here.</p>
````````````````````````````````

List items: Commonmark #264 (4552)
> So, in this case we need two spaces indent:
```````````````````````````````` example
- foo
  - bar
    - baz
      - boo
.
<p class="indent-1">
<span class="li">- foo</span>
<span class="li li2">- bar</span>
<span class="li li3">- baz</span>
<span class="li li4">- boo</span>
</p>
````````````````````````````````

List items: Commonmark #265 (4578)
> One is not enough:
```````````````````````````````` example
- foo
 - bar
  - baz
   - boo
.
<p class="indent-1">
<span class="li">- foo</span>
<span class="li">- bar</span>
<span class="li">- baz</span>
<span class="li">- boo</span>
</p>
````````````````````````````````

**List items: Commonmark #266 (4595)**
> Here we need four, because the list marker is wider:
```````````````````````````````` example
10) foo
    - bar
.
<p class="li indent-1">10) foo
- bar</p>
````````````````````````````````

**List items: Commonmark #267 (4611)**
> Three is not enough:
```````````````````````````````` example
10) foo
   - bar
.
<p class="indent-1">
<span class="li">10) foo</span>
</p>
<p class="li indent-1">- bar</p>
````````````````````````````````

List items: Commonmark #268 (4626)
> A list may be the first block in a list item:
```````````````````````````````` example
- - foo
.
<p class="li li2 indent-2">- - foo</p>
````````````````````````````````

List items: Commonmark #269 (4639)
```````````````````````````````` example
1. - 2. foo
.
<p class="li li3 indent-3">1. - 2. foo</p>
````````````````````````````````

**List items: Commonmark #270 (4658)**
> A list item can contain a heading:
```````````````````````````````` example
- # Foo
- Bar
  ---
  baz
.
<p class="indent-1">
<span class="li">- # Foo</span>
<span class="li">- Bar</span>
<span class="li">---
baz</span>
</p>
````````````````````````````````

Lists: Commonmark #271 (4894)
> Changing the bullet or ordered list delimiter starts a new list:
```````````````````````````````` example
- foo
- bar
+ baz
.
<p class="indent-1">
<span class="li">- foo</span>
<span class="li">- bar</span>
</p>
<p class="li indent-1">+ baz</p>
````````````````````````````````

Lists: Commonmark #272 (4909)
```````````````````````````````` example
1. foo
2. bar
3) baz
.
<p class="indent-1">
<span class="li">1. foo</span>
<span class="li">2. bar</span>
</p>
<p class="li indent-1">3) baz</p>
````````````````````````````````

Lists: Commonmark #273 (4928)
> In CommonMark, a list can interrupt a paragraph. That is,
> no blank line is needed to separate a paragraph from a following
> list:
```````````````````````````````` example
Foo
- bar
- baz
.
<p>Foo</p>
<p class="indent-1">
<span class="li">- bar</span>
<span class="li">- baz</span>
</p>
````````````````````````````````

Lists: Commonmark #275 (5015)
> We may still get an unintended result in cases like
```````````````````````````````` example
The number of windows in my house is
1.  The number of doors is 6.
.
<p>The number of windows in my house is
1.  The number of doors is 6.</p>
````````````````````````````````

Lists: Commonmark #276 (5029)
> There can be any number of blank lines between items:
```````````````````````````````` example
- foo

- bar


- baz
.
<p class="li indent-1">- foo</p>
<p class="li indent-1">- bar</p>
<p class="li indent-1">- baz</p>
````````````````````````````````

Lists: Commonmark #277 (5050)
```````````````````````````````` example
- foo
  - bar
    - baz


      bim
.
<p class="indent-1">
<span class="li">- foo</span>
<span class="li li2">- bar</span>
<span class="li li3">- baz</span>
</p>
<p class="blockquote bq-1 indent-1">bim</p>
````````````````````````````````

Lists: Commonmark #278 (5080)
> To separate consecutive lists of the same type, or to separate a
> list from an indented code block that would otherwise be parsed
> as a subparagraph of the final list item, you can insert a blank HTML
> comment:
```````````````````````````````` example
- foo
- bar

<!-- -->

- baz
- bim
.
<p class="indent-1">
<span class="li">- foo</span>
<span class="li">- bar</span>
</p>
<!-- -->
<p class="indent-1">
<span class="li">- baz</span>
<span class="li">- bim</span>
</p>
````````````````````````````````

Lists: Commonmark #279 (5101)
```````````````````````````````` example
-   foo

    notcode

-   foo

<!-- -->

    code
.
<p class="li indent-1">- foo</p>
<p class="li indent-1">notcode</p>
<p class="li indent-1">- foo</p>
<!-- -->
<p class="blockquote bq-1 indent-1">code</p>
````````````````````````````````

Lists: Commonmark #280 (5132)
> List items need not be indented to the same level.  The following
> list items will be treated as items at the same list level,
> since none is indented enough to belong to the previous list
> item:
```````````````````````````````` example
- a
 - b
  - c
   - d
  - e
 - f
- g
.
<p class="indent-1">
<span class="li">- a</span>
<span class="li">- b</span>
<span class="li">- c</span>
<span class="li">- d</span>
<span class="li">- e</span>
<span class="li">- f</span>
<span class="li">- g</span>
</p>
````````````````````````````````

Lists: Commonmark #281 (5153)
```````````````````````````````` example
1. a

  2. b

   3. c
.
<p class="li indent-1">1. a</p>
<p class="li indent-1">2. b</p>
<p class="li indent-1">3. c</p>
````````````````````````````````

Lists: Commonmark #282 (5177)
> Note, however, that list items may not be indented more than
> three spaces.  Here `- e` is treated as a paragraph continuation
> line, because it is indented more than three spaces:
```````````````````````````````` example
- a
 - b
  - c
   - d
    - e
.
<p class="indent-1">
<span class="li">- a</span>
<span class="li">- b</span>
<span class="li">- c</span>
<span class="li">- d
- e</span>
</p>
````````````````````````````````

Lists: Commonmark #283 (5197)
> And here, `3. c` is treated as in indented code block,
> because it is indented four spaces and preceded by a
> blank line.
```````````````````````````````` example
1. a

  2. b

    3. c
.
<p class="li indent-1">1. a</p>
<p class="li indent-1">2. b</p>
<p class="li blockquote bq-1 indent-2">3. c</p>
````````````````````````````````

Lists: Commonmark #284 (5220)
> This is a loose list, because there is a blank line between
> two of the list items:
```````````````````````````````` example
- a
- b

- c
.
<p class="indent-1">
<span class="li">- a</span>
<span class="li">- b</span>
</p>
<p class="li indent-1">- c</p>
````````````````````````````````

**Lists: Commonmark #285 (5242)**
> So is this, with a empty second item:
```````````````````````````````` example
* a
*

* c
.
<p class="indent-1">
<span class="li">* a</span>
<span class="li">*</span>
<span class="li">* c</span>
</p>
````````````````````````````````

Lists: Commonmark #286 (5264)
> These are loose lists, even though there is no space between the items,
> because one of the items directly contains two block-level elements
> with a blank line between them:
```````````````````````````````` example
- a
- b

  c
- d
.
<p class="indent-1">
<span class="li">- a</span>
<span class="li">- b</span>
</p>
<p>c
- d</p>
````````````````````````````````

Lists: Commonmark #287 (5286)
```````````````````````````````` example
- a
- b

  [ref]: /url
- d
.
<p class="indent-1">
<span class="li">- a</span>
<span class="li">- b</span>
</p>
<p class="li indent-1">- d</p>
````````````````````````````````

**Lists: Commonmark #288 (5309)**
> This is a tight list, because the blank lines are in a code block:
```````````````````````````````` example
- a
- ```
  b


  ```
- c
.
<p class="indent-1">
<span class="li">- a</span>
<span class="li">- ```
b</span>
</p>
<pre><code>- c
</code></pre>
````````````````````````````````

Lists: Commonmark #289 (5335)
> This is a tight list, because the blank line is between two
> paragraphs of a sublist.  So the sublist is loose while
> the outer list is tight:
```````````````````````````````` example
- a
  - b

    c
- d
.
<p class="indent-1">
<span class="li">- a</span>
<span class="li li2">- b</span>
</p>
<p>c
- d</p>
````````````````````````````````

Lists: Commonmark #290 (5359)
> This is a tight list, because the blank line is inside the
> block quote:
```````````````````````````````` example
* a
  > b
  >
* c
.
<p class="li indent-1">* a</p>
<p class="li blockquote bq-1 indent-2">b</p>
<p class="li indent-1">* c</p>
````````````````````````````````

**Lists: Commonmark #291 (5379)**
> This list is tight, because the consecutive block elements
> are not separated by blank lines:
```````````````````````````````` example
- a
  > b
  ```
  c
  ```
- d
.
<p class="li indent-1">- a</p>
<p class="li blockquote bq-1 indent-2">b</p>
<pre><code class="indent-1">c
</code></pre>
<p class="li indent-1">- d</p>
````````````````````````````````

Lists: Commonmark #292 (5402)
> A single-paragraph list is tight:
```````````````````````````````` example
- a
.
<p class="li indent-1">- a</p>
````````````````````````````````

Lists: Commonmark #293 (5411)
```````````````````````````````` example
- a
  - b
.
<p class="indent-1">
<span class="li">- a</span>
<span class="li li2">- b</span>
</p>
````````````````````````````````

Lists: Commonmark #294 (5428)
> This list is loose, because of the blank line between the
> two block elements in the list item:
```````````````````````````````` example
1. ```
   foo
   ```

   bar
.
<pre><code class="indent-1">foo
</code></pre>
<p class="li indent-1">1. bar</p>
````````````````````````````````

Lists: Commonmark #295 (5447)
> Here the outer list is loose, the inner list tight:
```````````````````````````````` example
* foo
  * bar

  baz
.
<p class="indent-1">
<span class="li">* foo</span>
<span class="li li2">* bar</span>
</p>
<p>baz</p>
````````````````````````````````

Lists: Commonmark #296 (5465)
```````````````````````````````` example
- a
  - b
  - c

- d
  - e
  - f
.
<p class="indent-1">
<span class="li">- a</span>
<span class="li li2">- b</span>
<span class="li li2">- c</span>
</p>
<p class="indent-1">
<span class="li">- d</span>
<span class="li li2">- e</span>
<span class="li li2">- f</span>
</p>
````````````````````````````````

Setext headings: Commonmark #64 (1199)
```````````````````````````````` example
- Foo
---
.
<p class="li indent-1">- Foo</p>

<hr />
````````````````````````````````

Setext headings: Commonmark #69 (1265)
```````````````````````````````` example
- foo
-----
.
<p class="li indent-1">- foo</p>

<hr />
````````````````````````````````


<!-- Inlines -->
### [Backslash escapes]

In Ocean-flavored markdown, backslash escapes work as usual inside indented blocks.

**Justification**: This is a consequence of rendering indented text blocks as block quotes instead of code. In this instance backslash escapes are still needed.

Backslash escapes: Commonmark #304 (5586)
```````````````````````````````` example
    \[\]
.
<p class="blockquote bq-1 indent-1">[]</p>
````````````````````````````````

### [Entity and numeric character references]

In Ocean-flavored markdown, entity and numeric character references work as usual inside indented blocks.

**Justification**: This is a consequence of rendering indented text blocks as block quotes instead of code. In this instance character references are still needed.

Entity and numeric character references: Commonmark #322 (5796)
```````````````````````````````` example
    f&ouml;f&ouml;
.
<p class="blockquote bq-1 indent-1">föfö</p>
````````````````````````````````

Entity and numeric character references: Commonmark #324 (5816)
```````````````````````````````` example
&#42; foo

* foo
.
<p>* foo</p>
<p class="li indent-1">* foo</p>
````````````````````````````````

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
> Markdown blockquote. {.test #test}
.
<p class="blockquote bq-1 indent-1 test" id="test">Markdown blockquote.</p>
````````````````````````````````

```````````````````````````````` example
> Markdown blockquote.
> {.test #test}
.
<p class="blockquote bq-1 indent-1 test" id="test">Markdown blockquote.</p>
````````````````````````````````

OMD indented block quotes with attributes.

```````````````````````````````` example
    OMD blockquote {.test1 #test1 ¶=1.1}

        OMD nested blockquote {.test2 #test2 ¶=none}

    OMD blockquote.
    {.test3 #test3 ¶=1.2}
.
<p class="test1 blockquote bq-1 indent-1" id="test1" ¶="1.1">OMD blockquote</p>
<p class="blockquote bq-2 indent-2 test2" id="test2" ¶="none">OMD nested blockquote</p>
<p class="blockquote bq-1 indent-1 test3" id="test3" ¶="1.2">OMD blockquote.</p>
````````````````````````````````

OMD lists with attributes.

```````````````````````````````` example
- Markdown list item. {#test .test ¶=1.1}
.
<p class="li indent-1 test" id="test" ¶="1.1">- Markdown list item.</p>
````````````````````````````````

```````````````````````````````` example
- Markdown list item.
{#test .test ¶=1.1}
.
<p class="li indent-1 test" id="test" ¶="1.1">- Markdown list item.</p>
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

Page numbers appear in the middle of text
```````````````````````````````` example
This is some text [pg 123] with a page number in the middle.
.
<p>This is some text <a data-pg="123">123</a> with a page number in the middle.</p>
````````````````````````````````

Page numbers appear in the middle of a multiline paragraph
```````````````````````````````` example
This is some text
[pg 123]
with a page number in the middle.
.
<p>This is some text
<a data-pg="123">123</a>
with a page number in the middle.</p>
````````````````````````````````

Page numbers appear between paragraphs
```````````````````````````````` example
This is one paragraph.

[pg 123]

This is another.
.
<p>This is one paragraph.</p>
<a data-pg="123">123</a>
<p>This is another.</p>
````````````````````````````````

Page numbers appear between single-line block elements
```````````````````````````````` example
# Heading
[pg 1]

* * *

[pg 2]

---

[pg 3]

This is a paragraph.

Another paragraph.
.
<h1>Heading</h1>
<a data-pg="1">1</a>
<hr />
<a data-pg="2">2</a>
<hr />
<a data-pg="3">3</a>
<p>This is a paragraph.</p>
<p>Another paragraph.</p>
````````````````````````````````

Page numbers can appear within ATX header text
```````````````````````````````` example
# [pg 1] Header text [pg 2]
.
<h1><a data-pg="1">1</a> Header text <a data-pg="2">2</a></h1>
````````````````````````````````

Page numbers can include roman numerals
```````````````````````````````` example
This is some text [pg mdclxviii] with a page number in the middle.
.
<p>This is some text <a data-pg="mdclxviii">mdclxviii</a> with a page number in the middle.</p>
````````````````````````````````

Page numbers can include uppercase roman numerals
```````````````````````````````` example
This is some text [pg MDCLXVIII] with a page number in the middle.
.
<p>This is some text <a data-pg="MDCLXVIII">MDCLXVIII</a> with a page number in the middle.</p>
````````````````````````````````

Page numbers can include a period
```````````````````````````````` example
This is some text [pg 1.2] with a page number in the middle.
.
<p>This is some text <a data-pg="1.2">1.2</a> with a page number in the middle.</p>
````````````````````````````````

Page numbers can include a colon
```````````````````````````````` example
This is some text [pg 1:2] with a page number in the middle.
.
<p>This is some text <a data-pg="1:2">1:2</a> with a page number in the middle.</p>
````````````````````````````````

Page numbers can include a dash
```````````````````````````````` example
This is some text [pg 1-2] with a page number in the middle.
.
<p>This is some text <a data-pg="1-2">1-2</a> with a page number in the middle.</p>
````````````````````````````````

Page numbers do not require a space
```````````````````````````````` example
This is some text [pg12] with a page number in the middle.
.
<p>This is some text <a data-pg="12">12</a> with a page number in the middle.</p>
````````````````````````````````

Inline links remain unaffected by page numbers
```````````````````````````````` example
In the United States, some movies are rated [pg 13](https://filmratings.com).
.
<p>In the United States, some movies are rated <a href="https://filmratings.com">pg 13</a>.</p>
````````````````````````````````

Inline links with no url remain unaffected by page numbers
```````````````````````````````` example
In the United States, some movies are rated [pg 13]().
.
<p>In the United States, some movies are rated <a href="">pg 13</a>.</p>
````````````````````````````````

Defined links remain unaffected by page numbers
```````````````````````````````` example
In the United States, some movies are rated [pg 13].

[pg 13]: https://filmratings.com
.
<p>In the United States, some movies are rated <a href="https://filmratings.com">pg 13</a>.</p>
````````````````````````````````

Page numbers are not permitted within link text or titles
```````````````````````````````` example
[link [pg 1] text **with [pg 2] page numbers** inside](https://example.com "title [pg 3] page number")
.
<p><a href="https://example.com" title="title [pg 3] page number">link [pg 1] text <strong>with [pg 2] page numbers</strong> inside</a></p>
````````````````````````````````

Page numbers are not permitted within image alt tags or titles
```````````````````````````````` example
![image alt text with [pg 1] a page number inside](image.jpg "title [pg 2] page number")
.
<p><img src="image.jpg" alt="image alt text with [pg 1] a page number inside" title="title [pg 2] page number" /></p>
````````````````````````````````


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
