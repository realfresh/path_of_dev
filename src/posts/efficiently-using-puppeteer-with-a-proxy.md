---
path: "/blog/efficiently-using-puppeteer-with-a-proxy"
date: "2019-07-11"
title: "How to efficiently use puppeteer with a proxy"
description: "Using puppeteer with many proxy servers can be difficult. See how you can efficiently to use puppeteer with one or more proxy connections in an efficient manner"
---

Puppeteer is a fantastic tool created by the folk at Google. It allows us to programmatically use the Chromium browser for tasks such a web scraping, taking screenshots, UI testing and much more.

It’s a fairly common use case that one may want to use a proxy to connect to sites via puppeteer. In this article, we will look at 2 approaches for using puppeteer with a proxy. Each of these approaches has their own advantages and disadvantages, you should pick the right one for your use case.

## Proxy all connections over puppeteer

This method involves proxying every single request **on the browser level** of puppeteer. It’s **perfect if you only have a single proxy** to use. This method is the simplest of them all. Take note that you will need to authenticate to your proxy if required for each page you create.

```js
const puppeteer = require('puppeteer');

(async () => {
  
  // 1. LAUNCH BROWSER WITH PROXY CONNECTION
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--proxy-server=your-proxy-server.com:8000']
  });
  
  // 2. CREATE NEW PAGE
  const page = await browser.newPage();
  
  // 3. ONLY IF YOUR PROXY REQUIRES AUTHENTICATION
  await page.authenticate({ username: '', password: '' });
  
  // 4. GO TO YOUR PAGE
  await page.goto('https://www.google.com');
  
})()
```

## Proxy a specific page over puppeteer

Sometimes things get more complex. Say you have one or more proxy connections you want to use with puppeteer, the only way to do this using the above code is to spawn a new instance of puppeteer. This might be fine if you have only a few proxies to use but it can become terrible if you have 10’s or 100’s of proxy servers to use. Every instance of puppeteer will require more memory to keep open. For long-running programs such as web servers, this can be a massive drain on your system resources.

You might consider spawning a new browser instance as needed and disposing of it when done. This could be ok and has its own advantages, but it will slow down your program. Say we were using it for a screenshot tool and we want to provide a fast user experience. Spawning and closing a new browser instance every time will definitely be slower than keeping one instance open.

Thankfully, there is a way to load a specific page in puppeteer over a proxy, saving you the trouble of spawning a new instance each time. This method involves intercepting the page request and manually fetching the content yourself with your proxy. We will need to use the help of a package such as “request” to create our custom proxy request.

Let’s see how we can do this.

```js
const puppeteer = require('puppeteer');
const request = require('request');

(async () => {

  // 1. LAUNCH BROWSER WITH PROXY CONNECTION
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--proxy-server=your-proxy-server.com:8000']
  });

  // 2. CREATE NEW PAGE
  const page = await browser.newPage();

  // 3. SET INTERCEPT NETWORK REQUESTS FOR PAGE
  await page.setRequestInterception(true);

  // 4. HANDLE NETWORK INTERCEPTION
  page.on('request', async (interceptedRequest) => {

    try {

      const resType = interceptedRequest.resourceType();

      // PROXY ONLY CERTAIN REQUEST TYPES
      if (['document', 'xhr'].indexOf(resType) !== -1) {

        // USE THE REQUEST MODULE TO MANUALLY SEND THE REQUEST OVER YOUR PROXY
        const response = await new Promsie((resolve, reject) => {
          request({
            url: interceptedRequest.url(),
            method: interceptedRequest.method(),
            headers: interceptedRequest.headers(),
            body: interceptedRequest.postData(),
            proxy: `http://username:password@host:port`, // REPLACE WITH YOUR PROXY CONNECTION DETAILS
          }, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        });

        // FULFILL THE INTERCEPTED REQUEST
        interceptedRequest.respond({
          status: response.statusCode,
          contentType: response.headers['content-type'],
          headers: response.headers,
          body: response.body,
        });

      } else {
        interceptedRequest.continue();
      }

    } catch (e) {
      interceptedRequest.continue();
    }

  });

  // 5. GO TO YOUR PAGE
  await page.goto('https://www.google.com');

})();
```

## Spawning a new puppeteer instance can be better

Yes, the primary issue of spawning a new puppeteer instance every time still stands. Creating and disposing instances will naturally slow down your program, especially if you were doing it on a per request level. However, this method has some unique advantages of its own that should be considered. Spawning a new pupeteer instance is like a blank slate. Sharing one instance with multiple pages can lead to cross-contamination of cookies and other stored data. Since each instance is a standalone chromium browser, it’s possible that one running page can crash the entire instance.