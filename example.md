# Writing and editing Ocean-flavored Markdown

Ocean-flavored Markdown (OFM) is an extended subset of [Markdown] designed for literature.
This is an example of OFM.


## Paragraphs and text

Paragraphs of text are written in text blocks.
The text blocks may be manually wrapped at a certain width, 
and they will still be rendered as a single paragraph in HTML.

Blockquotes can be written as a block of text that is indented by four spaces:

    This is something I wrote once,
    long ago, before the making of the specification.

To set classes or attributes, use brackets after the text block. 
For example, paragraphs are usually auto-numbered,
but the numbering can be changed or stopped by using the "¶" attribute.
These attributes can come either within the block or on the next line. 
{#par-id .par-class ¶=none}

Poetry can be indicated by a block of text with the ".verse" class:

    hash marks, square brackets
    web content can be written
    sans HTML
    {.verse}


## Headers

Headers are preceeded by hash marks; 
a single hash mark (#) becomes an \<h1> element, 
while six (######) will become an \<h6> element.

###### Does anyone use h6?

Not really, but it's there for us.


## Emphasis

Emphasis is indicated by surrounding text with stars:
one for *italic*, and two for **bold**.
Three stars indicates ***bold and italic text.***


## Inline elements

Many inline elements are defined in Markdown by square brackets around the text
followed other data in parentheses or defined outside the text block.
[Links](https://w.wiki/4X8) can be written inline or [defined outside the text]. 
Footnotes[^1] have a similar syntax, with the footnote text outside the block, 
as can a ![picture](https://upload.wikimedia.org/wikipedia/commons/c/cc/Icons-mini-image.gif).

[defined outside the text]: https://w.wiki/4X8
[^1]: This is a footnote.


## Lists

In contrast to regular Markdown, lists are rendered as regular paragraphs in OFM.

1. This is just a paragraph starting with a number.

2. This is another paragraph starting with a number.