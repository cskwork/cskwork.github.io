---
title: "The Compilation Process"
description: "Source CodeParsing step (scanned, split up, groped) aka. lexical (isolation from the sentence containing it) analysis. (grammar or meaning of text not"
date: 2022-04-17T08:59:34.490Z
tags: []
---
### Source Code
- Parsing step (scanned, split up, groped) aka. lexical (isolation from the sentence containing it) analysis. (grammar or meaning of text not taken into context. Just the meaning of the words themselves)

### Lexical Analysis phase
1 Scans code
- Source text is considered as a chunk of string text.
- scanner reads the text one character at a time. 
- for each char. it marks the line and position of where the character was found in source text.

2 Evaluates (lexing/tokenization)
- the lexer/tokenizer determines what type of token it has found

![](/images/2ef986fd-f2a7-4c93-bc76-8ae5ee1cfede-image.png)

#### Example of how compiler lexes a phrase

![](/images/6428eba8-c633-4817-9c45-b5ee431e90c7-image.png)

#### token
- represented as a pair consisting of a token name and some (optional) value

#### lexemes
- words of a program
- substring of source code.
- grouping of smallest sequence of characters.

![](/images/a63d1d8f-8a04-4a68-8e29-d496e83de04a-image.png)


### 출처
https://medium.com/basecs/reading-code-right-with-some-help-from-the-lexer-63d0be3d21d