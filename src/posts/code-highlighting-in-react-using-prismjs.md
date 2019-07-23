---
path: "/blog/code-highlighting-in-react-using-prismjs"
date: "2019-07-15"
title: "Code highlighting in React using Prism.js"
description: "This tutorial will show you how to use Prism.js together React JS to highlight your code. We will cover setting up Prism.js an creating a React component for it"
---

Prism.js is a fantastic code highlighting library. Probably the best I’ve seen and used. However, it has one serious problem. The documentation while simple feels very confusing at the same time. I can’t help but feel a bit lost every time I try to use it with React and enable a plugin, add a theme or support more languages.

Since I just went through the process of implementing Prism.js in this website, I decided to write a simple tutorial on how to use it with React. All the code examples you are about to see use Prism.js for code highlighting.

**This tutorial assumes you are using standard React bundlers such as webpack or parcel and use Babel to transform your code.**

## Install and configure Prism.js

First thing we need to do is **install the library with NPM or yarn**. You can also load the library from a CDN like [jsDelivr](https://www.jsdelivr.com/package/npm/prismjs).

```bash
npm install --save prismjs
# OR
yarn add prismjs
```

The next thing we need to do is add a **babel plugin responsible for loading the CSS and language support for Prism.js**. You can load them manually from the Prism.js package but the issue is that package bundlers will load support for all languages. This can be detrimental to your final bundle size if you are only using a small subset of the languages provided.

To install this plugin, we simply run the following in our shell

```bash
npm install --save-dev babel-plugin-prismjs
# OR
yarn add --dev babel-plugin-prismjs
```

Next we need to **add the plugin configuration to our .babelrc file**. If you do not already have a .babelrc file, create one in the root folder of your source code. Then add the following JSON to the .babelrc file.

```json
{
  "plugins": [
    ["prismjs", {
      "languages": ["javascript", "css", "html"],
      "plugins": ["line-numbers", "show-language"],
      "theme": "okaidia",
      "css": true
    }]
  ]
}
```

As you may have noticed, you can specify which theme and plugins to use along with what languages to support. The loader will automatically add any CSS required by the plugins as well. If setting CSS to true, make sure your bundler is able to handle CSS imports.

## The simplest way to use Prism.js in React

This way is great if your code snippets to be highlighted don't change. However, if they do change, read the component method below instead.

By default, Prism.js is said to automatically highlight any code blocks on your page. However, I’ve found **with React, code blocks are not automatically highlighted**. You will need to **use the Prism.js API to highlight all the code** on your page.

Doing this is fairly straightforward, just add your code embed and call the Prism.js highlight all API.

```jsx
import React from "react"
import ReactDOM from "react-dom"
import Prism from "prismjs"

const code = `
const foo = 'foo';
const bar = 'bar';
console.log(foo + bar);
`.trim()

class Page extends React.Component {

  componentDidMount() {
    // You can call the Prism.js API here
    // Use setTimeout to push onto callback queue so it runs after the DOM is updated
    setTimeout(() => Prism.highlightAll(), 0)
  }

  render() {
    return (
      <pre className="line-numbers">
        <code className="language-js">
          {code}
        </code>
      </pre>
    )
  }

}

ReactDOM.render(<Page/>, document.getElementById("root"))

// Or call the Prism.js API here
setTimeout(() => Prism.highlightAll(), 0)
```

Notice how I wrote the code snippet to be embedded. The string is called with the function trim to remove the whitespace around the code. This is important to be able to write our code snippets neatly.

## Creating a Prism.js component

This is a more robust and contained way to highlight code using Prism.js. It will also update if the code snippet or settings have changed. The component itself is relatively simple and looks like this.

```jsx
import React from "react"
import Prism from "prismjs"

export class PrismCode extends React.Component {

  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  componentDidMount() {
    this.highlight()
  }

  componentDidUpdate() {
    this.highlight()
  }

  highlight = () => {
    if (this.ref && this.ref.current) {
      Prism.highlightElement(this.ref.current)
    }
  }

  render() {
    const { code, plugins, language } = this.props
    return (
      <pre className={!plugins ? "" : plugins.join(" ")}>
        <code ref={this.ref} className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
    )
  }

}
```

To use the component, we can simply do
```jsx
import React from "react"
import {PrismCode} from "./component"

const code = `
const foo = 'foo';
const bar = 'bar';
console.log(foo + bar);
`

const Example = () => (
  <PrismCode
    code={code}
    language="js"
    plugins={["line-numbers"]}
  />
)
```

That about sums it up for this tutorial. If you think there is anything important that can be added to this, let me know in the comments.