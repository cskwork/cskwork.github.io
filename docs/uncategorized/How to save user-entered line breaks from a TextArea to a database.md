---
title: "How to save user-entered line breaks from a TextArea to a database?"
description: "1 TextArea HTML element is preserving the white space in the database.The problem appears when trying to display the \\n on the web browser, which wil"
date: 2023-02-22T02:33:18.816Z
tags: []
---
1 TextArea HTML element is preserving the white space in the database.
The problem appears when trying to display the \n on the web browser, which will fail.

To display \n in the web browser use :
```
<p style="white-space: pre-line">multi-line text</p>
```

2 Just put the output text between <pre></pre> tags, that will preserve the line breaks.

### Reference
https://stackoverflow.com/questions/498461/how-to-save-user-entered-line-breaks-from-a-textarea-to-a-database