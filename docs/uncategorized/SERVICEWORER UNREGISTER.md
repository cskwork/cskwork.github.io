---
title: "SERVICEWORER UNREGISTER"
description: ""
date: 2021-04-20T07:13:23.116Z
tags: []
---
```
 navigator.serviceWorker.getRegistrations().then(function (registrations) {
  if (!registrations.length) {
    console.log('No serviceWorker registrations found.')
    return
  }
  for(let registration of registrations) {
    registration.unregister().then(function (boolean) {
      console.log(
        (boolean ? 'Successfully unregistered' : 'Failed to unregister'), 'ServiceWorkerRegistration\n' +
        (registration.installing ? '  .installing.scriptURL = ' + registration.installing.scriptURL + '\n' : '') +
        (registration.waiting ? '  .waiting.scriptURL = ' + registration.waiting.scriptURL + '\n' : '') +
        (registration.active ? '  .active.scriptURL = ' + registration.active.scriptURL + '\n' : '') +
        '  .scope: ' + registration.scope + '\n'
      )
    })
  }
})

```