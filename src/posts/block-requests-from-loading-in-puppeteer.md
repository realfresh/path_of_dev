---
path: "/blog/block-requests-from-loading-in-puppeteer"
date: "2019-07-14"
title: "Block specific requests from loading in Puppeteer"
description: "Learn how to block requests from loading within the headless Chrome package, Puppeteer. Useful for reducing bandwidth usage or preventing things from loading"
---

Blocking requests in puppeteer is extremely simple. The API allows us to intercept all network requests on a particular puppeteer page.

When we intercept network requests, there are a number of actions we can perform including blocking the request. Let's take a look at how we can do this.

```javascript
const puppeteer = require('puppeteer');

const blockedResources = [
  'quantserve',
  'adzerk',
  'doubleclick',
  'adition',
  'exelator',
  'sharethrough',
  'twitter',
  'google-analytics',
  'fontawesome',
  'facebook',
  'analytics',
  'optimizely',
  'clicktale',
  'mixpanel',
  'zedo',
  'clicksor',
  'tiqcdn',
  'googlesyndication',
];

(async () => {
    
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', (request) => {
    // BLOCK IMAGES
    if (request.url().endsWith('.png') || request.url().endsWith('.jpg'))
        request.abort();
    // BLOCK CERTAIN DOMAINS
    else if (blockedResources.some(resource => request.indexOf(resource) !== -1))
        request.abort();
    // ALLOW OTHER REQUESTS
    else
        request.continue();
  });

  await page.goto('https://www.google.com');
    
})()
```

As you can see from the above code, it's pretty straight forward what is going on. After creating a browser and page, set request interception on the page and define the page request callback.

In the callback, you can analyse the request made from the browser. You can use the URL of the request to determine whether or not the resource should be blocked. To bloc it, simply call the abort function on the request. Otherwise call the continue function to proceed with the request.

You can see the specific details at the [relevant Puppeteer API documentation](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagesetrequestinterceptionvalue).