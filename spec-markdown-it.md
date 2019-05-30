# Divergence from commonmark in markdown-it

Ocean Markdown is defined in reference to Commonmark, but the initial parser is built on [markdown-it], which diverges very slightly from the Commonmark spec. These divergences are noted below.

[markdown-it]: https://github.com/markdown-it/markdown-it


## Fenced code blocks

- [Commonmark #108](https://github.com/commonmark/commonmark-spec/blob/master/spec.txt#L1885)

> Code fences (opening and closing) cannot contain internal spaces:

```````````````````````````````` example
``` ```
aaa
.
<p><code></code>
aaa</p>
````````````````````````````````

Commonmark expects a space between the code tags (`<code> </code>`) but markdown-it does not render it.

- [Commonmark #116](https://github.com/commonmark/commonmark-spec/blob/master/spec.txt#L1996)

> [Info strings] for tilde code blocks can contain backticks and tildes:

```````````````````````````````` example
~~~ aa ``` ~~~
foo
~~~
.
<p>~~~ aa ``` ~~~
foo</p>
<pre><code></code></pre>
````````````````````````````````

This commonmark spec is not properly implemented by markdown-it.

## Link reference definitions

- [Commonmark #164](https://github.com/commonmark/commonmark-spec/blob/master/spec.txt#L2845)

> A [link reference definition]
> does not correspond to a structural element of a document.  Instead, it
> defines a label which can be used in [reference links]
> and reference-style [images] elsewhere in the document.  [Link
> reference definitions] can come either before or after the links that use
> them.

```````````````````````````````` example
[Foo bar]:
<my url>
'title'

[Foo bar]
.
<p>[Foo bar]:
<my url>
'title'</p>
<p>[Foo bar]</p>
````````````````````````````````

This markdown is not properly identified as a link definition by markdown-it.

- [Commonmark #187](https://github.com/commonmark/commonmark-spec/blob/master/spec.txt#L3137)

> Link reference definitions can occur
> inside block containers, like lists and block quotations.  They
> affect the entire document, not just the container in which they
> are defined:

```````````````````````````````` example
[foo]

> [foo]: /url
.
<p><a href="/url">foo</a></p>
<blockquote></blockquote>
````````````````````````````````

Commonmark expects a line break between the blockquote tags, but markdown-it does not render one. 
**(Syntactically identical)**

## Block quotes

- [Commonmark #209-210](https://github.com/commonmark/commonmark-spec/blob/master/spec.txt#L3535)

> A block quote can be empty:

```````````````````````````````` example
>
.
<blockquote></blockquote>
````````````````````````````````

```````````````````````````````` example
>
>  
> 
.
<blockquote></blockquote>
````````````````````````````````

Commonmark expects a line break between the blockquote tags, but markdown-it does not render one. 
**(Syntactically identical)**

## Lists

- [Commonmark #282](https://github.com/commonmark/commonmark-spec/blob/master/spec.txt#L5177)

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
<ul>
<li>a</li>
<li>b</li>
<li>c</li>
<li>d</li>
<li>e</li>
</ul>
````````````````````````````````

Markdown-it incorrectly creates a new list item when it should recognize a paragraph continuation.

- [Commonmark #283](https://github.com/commonmark/commonmark-spec/blob/master/spec.txt#L5197)

> And here, `3. c` is treated as in indented code block,
> because it is indented four spaces and preceded by a
> blank line.

```````````````````````````````` example
1. a

  2. b

    3. c
.
<ol>
<li>
<p>a</p>
</li>
<li>
<p>b</p>
</li>
<li>
<p>c</p>
</li>
</ol>
````````````````````````````````

Markdown-it incorrectly creates a new list item when it should recognize a code block.

## Code spans

- [Commonmark #331-#337](https://github.com/commonmark/commonmark-spec/blob/master/spec.txt#L5899)

> Note that only *one* space is stripped:

```````````````````````````````` example
`  ``  `
.
<p><code>``</code></p>
````````````````````````````````

Markdown-it incorrectly strips all leading and trailing space from code blocks.

> The stripping only happens if the space is on both
> sides of the string:

```````````````````````````````` example
` a`
.
<p><code>a</code></p>
````````````````````````````````

Markdown-it incorrectly strips all leading and trailing space from code blocks.

> Only [spaces], and not [unicode whitespace] in general, are
> stripped in this way:

```````````````````````````````` example
` b `
.
<p><code>b</code></p>
````````````````````````````````

Markdown-it incorrectly strips leading and trailing non-breaking spaces from code blocks.

> No stripping occurs if the code span contains only spaces:

```````````````````````````````` example
` `
`  `
.
<p><code></code>
<code></code></p>
````````````````````````````````

Markdown-it incorrectly strips all spaces from code blocks that contain only spaces.

> [Line endings] are treated like spaces:

```````````````````````````````` example
``
foo
bar  
baz
``
.
<p><code>foo bar baz</code></p>
````````````````````````````````

```````````````````````````````` example
``
foo 
``
.
<p><code>foo</code></p>
````````````````````````````````

Markdown-it incorrectly strips spaces preceeding line endings within inline clode blocks.

> Interior spaces are not collapsed:

```````````````````````````````` example
`foo   bar 
baz`
.
<p><code>foo bar baz</code></p>
````````````````````````````````

Markdown-it incorrectly collapses interior spaces within code blocks.

## Emphasis and strong emphasis

- [Commonmark #415-416](https://github.com/commonmark/commonmark-spec/blob/master/spec.txt#L6913)

> When the lengths of the interior closing and opening
> delimiter runs are *both* multiples of 3, though,
> they can match to create emphasis:

```````````````````````````````` example
foo***bar***baz
.
<p>foo***bar***baz</p>
````````````````````````````````

Markdown-it does not recognize combined emphasis markers.

```````````````````````````````` example
foo******bar*********baz
.
<p>foo******bar*********baz</p>
````````````````````````````````

Markdown-it does not recognize chained emphasis markers.

## Links

- [Commonmark #486](https://github.com/commonmark/commonmark-spec/blob/master/spec.txt#L7543)

> The destination can only contain spaces if it is
> enclosed in pointy brackets:

```````````````````````````````` example
[link](</my uri>)
.
<p>[link](&lt;/my uri&gt;)</p>
````````````````````````````````

Markdown-it does not properly recognize link destinations containing spaces within pointy brackets.

## Hard line breaks

- [Commonmark #637](https://github.com/commonmark/commonmark-spec/blob/master/spec.txt#L9241)

> Line breaks do not occur inside code spans

```````````````````````````````` example
`code 
span`
.
<p><code>code span</code></p>
````````````````````````````````

Markdown-it improperly strips spaces preceeding line endings within inline code blocks.
