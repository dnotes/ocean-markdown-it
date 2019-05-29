# Introduction

## Ocean Markdown specification

The Ocean Markdown specification is an extended subset of the Commonmark specification optimized for literature instead of modern internet communication. Ocean Markdown is defined in relation to the Commonmark specification, meaning that Commonmark definitions are maintained as in the original unless otherwise specified in this document.

# Divergence from Commonmark

## Fenced code blocks

The following examples are rendered slightly differently by markdown-it than anticipated in Commonmark, and for Ocean Markdown the difference does not matter:

Fenced code blocks that consist only of a space are rendered as empty, instead of containing a space.

```````````````````````````````` example
``` ```
aaa
.
<p><code></code>
aaa</p>
````````````````````````````````

# Additions to Commonmark

## Footnotes

Ocean Markdown defines footnotes or endnotes exactly as supported by the [markdown-it-footnote plugin](//github.com/markdown-it/markdown-it-footnote).

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
