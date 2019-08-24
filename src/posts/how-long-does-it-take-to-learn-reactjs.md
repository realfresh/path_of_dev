---
path: "/blog/how-long-does-it-take-to-learn-react"
date: "2019-08-02"
title: "How long does it take to learn React?"
description: "React is a fantastic UI library with a strange learning curve. See how long it takes to learn React as we take you through our learning timeline. "
image: "/images/technologies/react.png"
---

[React](https://reactjs.org/) is one of the fastest growing development libraries in the world for good reasons. If you are interested in learning React, you might be asking yourself, how long does it take to learn React?.

The truth is it depends on several personal factors. It also depends on what you mean by learn React. To me, someone who has learnt React is a person capable of building and deploying a production-ready React application in a reasonable timeframe. 

**The short answer is it will take you between 1-12 months of learning to become proficient with React. This depends on your existing software development experience, your knowledge of javascript and the learning path you take.**

To achieve proficiency, I believe there are 4 stages of learning React one must go through. Those 4 stages are:

- Learning the fundamentals of web development
- Setting up a React application
- Building your first few prototypes
- Becoming proficient with React and its ecosystem

These 4 stages make up what I would consider the recommended timeline for learning React. The learning curve of this timeline varies greatly for each stage.

Let's look at each of these 4 stages in detail and what you need to do in each of them.

## Learning the fundamentals of web development

You CANNOT learn React without knowledge of the 3 fundamentals in web development. Those are:

- HTML - Define elements on a web page
- CSS - Apply styles to elements on a web page
- JavaScript - Programmatically interact with web pages

For those just starting their web development journey, this is crucial. If you are not familiar with these technologies, I suggest you forget about React for a few weeks or months.

React is a JavaScript library designed to be used in the context of a web browser. Without an understanding of how to build basic web pages with HTML, CSS and JavaScript, you stand no chance of learning React.

Everything React does builds directly on-top of HTML, CSS and JS. If this is your first dive into programming, expect to spend at least several months becoming proficient in this stage before moving on.

HTML and CSS can both be relatively easy to pick up even for non-programmers. Mostly because these are not really programming languages. They are just a way to describe a particular state of a web page and it's contents.

The real difficult part here is learning JavaScript as it's a programming language. If you already have software development experience, you could likely pick up the basics of JavaScript in 1-4 weeks. Otherwise, expect it to take much longer before you are comfortable with it.

There are tons of tutorials and resources that can help you achieve proficiency with the fundamentals of web development. Take your time and work through those.

I would recommend building and hosting at least 2-3 websites. These websites can be anything like a portfolio, a blog, photo gallery, information sites, anything. Jumping straight into React will only leave you confused as to why React even exists. 

When you build your first few websites with HTML, CSS and JS, you will start to see the pain points in it. When you encounter these issues, you will then understand the context that gave birth to React. It will finally make sense why this library even exists.

Once you have built a few basic websites, you are ready to progress from this stage.

**Learning ES6 JavaScript**

JavaScript is a very quickly evolving language. The last 5 years have seen major developments and additions to the language. ES6+ JavaScript refers to the new additions that came to Javascript after the 2015 version was released.

React makes extensive use of ES6+ features for many different reasons. It's recommended that you become familiar with the new features JavaScript has to offer while learning it.

**Learning Git & GitHub**

While this isn't related to web development, Git and GitHub and integral to the modern developer workflow. You should familiarize yourself with these tools before proceeding to the next stages. I suggest checking out a guide I wrote recently about [understanding Git and GitHub](/blog/making-sense-of-git-and-github)

## Setting up a React application

You may be wondering, why is this even a learning stage? Truth be told, I wish it wasn't but it is. The reason is because of the level of scaffolding that exists below a React application. There are many different ways you could set up a React project. Let go through different ways and see how they work.

One thing to note is, React's [official documentation](https://reactjs.org/docs/getting-started.html) also provides an overview of all the different ways you can start using React. I highly recommend reading this.

### The simplest way to use React

See, you could use React just like any other JavaScript library by loading it from a CDN, with a small twist. To use the JSX syntax (React's way of writing HTML), we need to include a compiler for it (Babel). This is how it would be done.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Easy React</title>
</head>
<body>

  <div id="root"></div>

  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.5.5/babel.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react@16.8.6/index.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@16.8.6/index.min.js"></script>

  <script type="text/babel">
    const App = () => <h1>My React App</h1>;
    ReactDOM.render(<App/>, document.getElementById('root'));
  </script>

</body>
</html>
```
Pretty simple right? The problem here is this approach will quickly become completely unmaintainable for any serious web application. It's fine for extremely simple applications or to test things out. However, I would recommend skipping this approach, mainly because it is very limiting.

### Create React App (CRA) 

[Create React App](https://facebook.github.io/create-react-app/), as Facebook puts it, "the official supported way to create single-page React applications". They have put a great deal of effort into making the setup process of a React application effortless. 

CRA will automatically create a project folder, some base files and setup all the configuration necessary to develop and publish a React application (trust me, there is a lot of configuration needed).

Before you can do this, you will need to have [Node.js](https://nodejs.org/en) installed. Node.js is a JavaScript run-time for general-purpose computers, not limited to just the web browser. Node.js comes with a handy package manager called NPM which gives you access to thousands of scripts, libraries and frameworks.

Node.js and [NPM ecosystem](https://www.npmjs.com/) is something you will become very familiar with in your React learning journey. Once you have installed Node.js, you can start a new React project with the following shell command.

```bash
npx create-react-app my-app
```

Pretty awesome right? So is this the right way to learn to setup React? It could be if you just wanted to dive in quickly. 

Many people and businesses do use CRA for their React applications. For most, it will likely be more than sufficient. The documentation for CRA is extensive as well.

Would I recommend learning React this way? Probably not. Let me say, building one or two starter projects this way is fine. Just to get the hang of React. However, I wouldn't get used to it just.

The reason I say this is because building a React app goes far beyond just writing JSX and building a UI. Whenever you use a framework such as CRA, you are locked into a particular configuration which is mostly hidden from you. When you start to hit the limits of that configuration, you will find yourself stuck on how to progress.

With that, CRA is slightly different from other frameworks because of its ability to eject your app from the framework. This way you can start modifying the underlying configuration. However, if you arrived straight at this point, you would likely feel very lost as to why everything was configured that way.

Let me also say, CRA is not the only way to easily use React. There are also frameworks like [Gatbsy](https://www.gatsbyjs.org/) and [Next.js](https://nextjs.org). Each of these offers the same kind of effortless setup process but tailored to different needs. In fact, this site uses Gatsby.

Frameworks are perfectly fine to use if you already have extensive knowledge of React and understand the limits of them. In which case, you can assess if your project requirements can fit within those limits. 

However, as someone learning React, your learning will only be limited by this. To truly be proficient at building React applications, we must also have an understanding of the scaffolding that lies beneath a React application. That brings me to the last way to set up a React application.

### Manually configuring a React application

Manually setting up a React project can unfortunately be a bit of a journey. On a positive note, once you understand all the tools involved, it's much easier to set up subsequent projects. Best of all, you now have complete control over every aspect of your project.

So how do you set up a React project? You will need to use a build tool such as Webpack or Parcel. There are numerous other build tools available but these 2 represent opposing ends of the spectrum. Webpack is extremely customizable while Parcel will require almost zero configuration. You can move between both these build tools at any time, you are not locked into either of them.

The purpose of the build tool is to take all your project assets (JS, JSX, HTML, CSS, SCSS, LESS, images, etc.), compile everything needed to HTML, CSS and JS, package everything nicely and apply optimizations. At which point you are then ready to deploy your web application.

There is an almost endless stream of tutorials that will show you how to use Webpack or Parcel with React. Following a few of them should give you enough knowledge to start working with these tools.

## Building your first few prototypes

Once you have set up your React project, the next step is to learn the fundamentals of React itself. I recommend you start with the [official React tutorial](https://reactjs.org/docs/hello-world.html). This is by far one of the best introductions you will find.

It will teach you the basics of how React operates and how you can build modern web applications with it. Once you are armed with this knowledge, you are ready to start building some prototype applications. 

You should do this until you are comfortable with the basic design patterns of React. In this stage, I wouldn't overcomplicate things. If possible avoid using any kind of routing layer (react-router), state management (redux) or other additional tools.

Keep it simple and just focus on the fundamentals as everything else is built around that.

An important aspect of this stage is learning to deploy a React application. Most initial react projects will be simple single-page applications. These can easily be deployed to a host like [Netlify](https://www.netlify.com/). You should publish your prototype applications online to help you learn the deployment workflow.

The beautiful thing about React is once you get started, it's initially quite easy to pick up. This will likely be one of the easiest stages you will go through.

## Becoming proficient with React and it's ecosystem 

While React is easy to learn initially, it can be very difficult to master. There are 2 reasons for this. 

### React and its ecosystem are like lego

Most things in the React ecosystem are modular libraries with a very narrow scope. This includes React itself. Building a complex web application will require you to piece together React with many different modules.

For example, React is very narrowly focused on providing a UI layer. In this case the ability to render and update HTML in a highly customizable and modular pattern. That alone is not enough to build a web application. There are so many other components like routing, state management, authentication and more.

Most of these modules have their own learning curve and design patterns that take time to learn. As such be prepared to allocate a good chunk of time to learning these modules and how to implement them with React.

I think the 2 most important modules that you will need in addition to React is something to handle your page routing and application state.

Page routing is concerned with what is displayed at different webpages. For example, what should be shown at `/about-us` and `/contact`.

State management is concerned with maintaining the global application state. For example, if your application has a user system, you would store the user details globally so it's accessible throughout your entire system.

### Extensive React API and advanced design patterns

React in the last few years has seen some significant additions. There are many different utility functions provided to enhance your development experience such as `React.useState`.

React also has a number of advanced design patterns and tricks such as higher-order components. It's best to familiarize yourself with these when the need arises as it naturally will.

## Conclusion

As you can see, the React learning journey is quite extensive. It's no small feat and genuinely takes a lot of time to master. For someone just getting started programming, expect it to take at least 6-12 months of daily learning to achieve a basic level of proficiency. For advanced developers, one month should be sufficient for achieving basic proficiency.