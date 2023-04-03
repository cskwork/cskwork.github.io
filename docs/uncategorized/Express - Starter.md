---
title: "Express - Starter"
description: "https&#x3A;//developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment"
date: 2021-09-11T01:58:45.996Z
tags: []
---
### Express Application Generator

```shell
npm install express-generator -g
express projectname

cd projectname
npm install

# Run projectname on Windows with Command Prompt
SET DEBUG=projectname:* & npm start

# Run projectname on Windows with PowerShell
SET DEBUG=projectname:* | npm start

# Run projectname on Linux/macOS
DEBUG=projectname:* npm start

```

### Result in http://127.0.0.1:3000/
![](/images/c00b27d4-5752-4744-afbd-f3a024275b93-image.png)

### REF
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment