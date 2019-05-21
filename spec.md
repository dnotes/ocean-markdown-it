# Introduction

## Ocean Markdown specification

The Ocean Markdown specification is an extended subset of the Commonmark specification optimized for literature instead of modern internet communication. Ocean Markdown is defined in relation to the Commonmark specification, meaning that Commonmark definitions are maintained as in the original unless otherwise specified in this document.

# Leaf blocks

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