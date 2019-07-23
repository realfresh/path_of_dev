---
path: "/blog/creating-anchor-links"
date: "2019-07-14"
title: "Creating anchor links"
description: "Anchor links are used to link directly to a particular section within a webpage. A great feature to have as it makes sharing content far easier"
---

An anchor link is a type of link that points to a particular section within a web page. When a web page loads, if the URL contains an anchor link, the browser will automatically scroll to the anchored point.

For an anchor link to work, we require 2 things. A link element with an anchor link along with a target for the link. For example:

```html
<a href="#myTarget">Link Text</a>
<h2 id="myTarget">Section Heading</a>
```

When a user clicks on the link tag, it will take them to the target element as defined by the ID.

An anchor link works by adding a hash to a URL followed by the anchor ID. For example, with the above code, if the user was on https://example.com/page, after clicking the anchor link, their URL would change to https://example.com/page#myTarget.

If a user shared the URL with someone else who visits the anchor link, the page will load and scroll directly to the “myTarget” heading.

## Anchor link not scrolling on page load

Sometimes you may encounter an issue when an anchor URL is loaded, the page doesn’t scroll to the target position. This can happen for several different reasons.

There are supposedly some Chrome bugs that can cause this. There is also an outstanding [bug with react-router](https://github.com/ReactTraining/react-router/issues/394) that is preventing this behaviour from working.

Fortunately, the fix is simple, we need to manually implement the scroll function. We can do this with a bit of JavaScript. The code below was written by rafex and can be found [here](https://github.com/ReactTraining/react-router/issues/394#issuecomment-220221604).

```javascript
function hashLinkScroll() {
  const hash = window.location.hash;
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element && element.scrollIntoView) {
        element.scrollIntoView();
      }
    }, 0);
  }
}
```

## Smooth scroll to an anchor link

For the most part, I generally wouldn’t recommend this behaviour. It may conflict with the existing hash link implementation of the browser. It also might seem weird for the user to see the scroll effect when the page could have just loaded directly to its anchored point.

Regardless, if you wish to do this, **you need to make a simple change to the code above**.

```javascript
// ABOVE SCROLL CODE
element.scrollIntoView();

// SMOOTH SCROLL (NOT AVAILABLE IN OLD BROWSERS)
element.scrollIntoView({ behaviour: 'smooth' });
```

If you want to support all browsers, consider using the [smooth scroll polyfill](https://github.com/iamdustan/smoothscroll).