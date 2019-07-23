---
path: "/blog/how-to-embed-a-github-gist-in-your-website"
date: "2019-07-11"
title: "How to embed a GitHub gist in your website"
description: "Learn how to embed a GitHub gist into your web page to share code. This article also covers embedding a Github gist in React"
---

GitHub gist’s are a great way to share code with others. It’s also probably one of the simplest ways you can embed your code into a website.

Best of all you, know GitHub is a reputable company that is not going anywhere, so your code should remain online indefinitely.

**Embedding a gist into your website requires you to copy and paste the embed \<script> tag into your web-page. The embed script can be found at the top of your gist after creating it.**

![The header section of a GitHub gist](https://thesaasdev-blog.cdn.prismic.io/thesaasdev-blog/ea0c441e0d3d98fa2ee042ac8cf9612bb2a36984_github-gist-embed.png)

Once you have copied the code, simply paste it into your HTML where you would like the gist to appear

```html
<div>
  <h1>Your Code Embed</h1>
  <script src="https://gist.github.com/username/gist-id.js"></script>
</div>
```

## How to embed a single file from a gist

So you have a GitHub gist with multiple files in it. By default, including the gist embed code will display all the files in your gist. If you want to display a specific file, we need to use the file query parameter as follows:

```html
<script src="https://gist.github.com/username/gist-id.js?file=your-file-name.js"></script>
```

## How to embed a gist in React

This one left me banging my head on the wall. Simply dropping in the embed code into a react application won’t render anything. Thankfully, a helpful soul on [stackoverflow](https://stackoverflow.com/questions/30429361/how-to-embed-a-gist-using-reactjs) knew why.

It turns out that the GitHub embed script uses “document.write” to insert the code into your page. Not precisely sure how it works, but by the time react inserts the \<script> element into the page, it’s too late to write to the document. As such, nothing is displayed.

There are two ways to work around the issue. The first involves loading the script inside an iframe. You can use the NPM package [react-gist](https://github.com/tleunen/react-gist) to achieve this method. It provides a simple component you can call with your gist ID:

```jsx
const React = require('react');
const Gist = require('react-gist');

const root = document.getElementById('root');
React.render(<Gist id=’5104372’ />, root);
```

You can even copy and paste the component code from that package as it’s just one file. Might be safer than installing a random package to your code base. I would still suggest staring the repository to show your support.

The next method, which is shown in the stackoverflow post linked above, manually loads the script element and inserts it into the DOM. Someone else created an ES6 version of this that you can find at this [GitHub gist](https://gist.github.com/aVolpe/b364a8fcd10f1ba833d97e9ab278f42c) which was created by [aVolpe](https://gist.github.com/aVolpe). I’ve also added it below just for easy reference.

```jsx
import React from 'react';

class EmbeddedGist extends React.Component {

  constructor(props) {
      super(props);
      this.gist = props.gist;
      this.file = props.file;
      this.stylesheetAdded = false;
      this.state = {
        loading: true,
        src: ''
      };
  }
    
  // The Gist JSON data includes a stylesheet to add to the page
  // to make it look correct. `addStylesheet` ensures we only add
  // the stylesheet one time.
  addStylesheet = (href) => {
    if (!this.stylesheetAdded) {
      this.stylesheetAdded = true;
      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = href;
  
      document.head.appendChild(link);
    }
  }
  
  componentDidMount() {
    // Create a JSONP callback that will set our state
    // with the data that comes back from the Gist site
    var gistCallback = EmbeddedGist.nextGistCallback();
    window[gistCallback] = function(gist) {
        this.setState({
          loading: false,
          src: gist.div
        });
        this.addStylesheet(gist.stylesheet);
    }.bind(this);

    var url = 'https://gist.github.com/' + this.props.gist + '.json?callback=' + gistCallback;
    if (this.props.file) {
      url += '&file=' + this.props.file;
    }

    // Add the JSONP script tag to the document.
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    } else {
      return <div dangerouslySetInnerHTML={{__html: this.state.src}} />;
    }
  }
}

// Each time we request a Gist, we’ll need to generate a new
// global function name to serve as the JSONP callback.
var gistCallbackId = 0;
EmbeddedGist.nextGistCallback = () => {
    return 'embed_gist_callback_' + gistCallbackId++;
};

export default EmbeddedGist;

// USAGE
// <EmbeddedGist gist="aVolpe/fffbe6a9e9858c7e3546fb1d55782152"/>
// <EmbeddedGist gist="aVolpe/fffbe6a9e9858c7e3546fb1d55782152" file="SetUtils.java"/>
```

Let me know if there is another way to do it and I shall add it to this post.