# Divergence from commonmark in markdown-it

Ocean Markdown is defined in reference to Commonmark, but the initial parser is built on [markdown-it], which diverges very slightly from the Commonmark spec. These divergences are noted below.

[markdown-it]: https://github.com/markdown-it/markdown-it

## Empty blockquotes

*Commonmark expects empty <blockquote> elements to have a line break between
the opening and closing tags, but markdown-it does not render one.
These divergences are functionally equivalent.*

Link reference definitions: Commonmark #187 (3137)
> [Link reference definitions] can occur
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

Block quotes: Commonmark #209-210 (3535)
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