---
path: "/blog/npm-package-best-practices"
date: "2019-08-14"
title: "Publishing an NPM package - Best practices"
description: "Publishing an NPM package can be hard. Let's break down everything you need to know to publish a great package to the NPM"
preview: "true"
---

First, I just want to say thank you. By contributing to the NPM package repository, you are helping make the world a better place for all JavaScript developers.

Recently, I decided to start open-sourcing my internal projects and publishing NPM modules so others can easily access them. Along the way, I hit quite few road bumps that left me wondering about the best practices when publishing a package to NPM.

As such, the purpose of this article is to summarizes the best practices that I learnt. I've broken down these best-practices into 6 different sections. You do not need to read them in order, feel free to skip to the section that is relevant for you currently.

**Note: this article is mostly relevant for publishing public packages intended for open-source use**

## Setup

When we first setup our module, there are several we must do.

### Initialize a new NPM package

Before we start to create our package, we must first create a folder on your local computer to store our source code. Inside this folder, we can run `npm init` to initialize a brand new NPM package.

```bash
npm init
```

Once run, we will be taken through a simple setup process with a few questions. This will be used to generate the `package.json` file in your folder which designates the folder as an NPM package.

Do not worry to much about this info required as it can all be modified later inside your `package.json` file. Usually I just spam the enter key until it's complete.

### Choose a package name

Picking a great name for an NPM package is crucial. Try to strike a good balance between something that sounds nice while also describing the package in a nut shell.

There are a few [restrictions for naming NPM packages](https://docs.npmjs.com/files/package.json#name). To summarize, package names but be URL safe, must not contain uppercase letters, be less than 214 characters and cannot start with a dot or underscore.

With those restrictions in mind, any multi word package names should be separate by a dash instead of underscore. While this isn't an explicit rule, its a community convention and it makes life easy when everyone sticks to a particular pattern.

When naming packages, we can also prefix the name with an organization name. In your NPM account dashboard, you can create a new organization such as `@pathofdev` which I have for my packages.

This is espically good if the package name you wanted was already taken as the prefix now differentiates it from the original. It's also good if you are trying to create a "brand".

So to give you an example, I recently published a [react tag input component](/projects/react-tag-input). The name I gave the package was `@pathofdev/react-tag-input`. Originally, I wanted to use `react-tag-input` but it was already taken. Thankfully by scoping the package to the `@pathofdev` organization, I could now provide the descriptive name I was after.

Your NPM package name can be set in the `package.json` file using the `name` property.

```json package.json
{
  "name": "@pathofdev/react-tag-input"
}
```

### Setup a Git repository

No public NPM package would be complete without a Git repository behind it. To be honest, I'm not even sure NPM will let you publish your package without initializing a git repository. The usefulness of it cannot be overstated. If you are unsure about git or how it works, I recommend checking out my other post, [making sense of Git and GitHub](/blog/making-sense-of-git-github).

While I don't think you require an online git repository like what GitHub provides, it is highly recommended that you have one. The main advantage is that:

- It's the easiest way for others to inspect your source code
- A common place to suggest improvements or point out bugs
- Allow community contributions to your project using pull requests.

You can specify the online URL for your git repository in your `package.json` file

```json package.json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/pathofdev/react-tag-input"
  }
}
```

While using Git, you can keep adding commits and pushing changes to your remote git repo without interfering with your NPM publishing.

When you are ready to publish a new version of your package to NPM, you will need a clean working directory with all changes committed. We will go through this in greater detail in the publishing process section.

### Directory structure conventions

When we are publishing a public NPM package, there is a good chance other developers may want to inspect the source code. We need to ensure it's easy for others to navigate and reason with our code base. For this, a good directory structure is important.

By now, you have properly noticed the common conventions the community has with regard to directory structure. It's best to stick with these so everyone is on the same page.

A typical NPM package generally tends to use the following folder structure:

```txt
/build/
/libs/
/src/
/tests/
/vendor/
/package.json
```

**Note: not all the above folders are required, use them only where applicable.**

The root folder will usually contain all the configuration files for the project such as `package.json`.

Let's break down the purpose of the other folders

-  **build** - folder will contain the compiled code of our project if applicable.
- **libs** - folder usually contains isolated modules of code that our main application may utilize. It typically refers to modules written by the package author specifically for this package.
-  **tests** - folder containing our application tests
-  **src** - folder should contain the primary source code for your module
-  **vendor** - folder is similar to libs but usually contains 3rd party code from other projects

Keep in mind there are no hard and fast rules, these are just common conventions. Wherever possible, don't re-invent the wheel, use the standard convention so everyone else is able to understand your project.

### Choose a license

Choosing a license for your package is extremely important. A license defines the terms for using the package you have created. Without a license, developers, especially businesses will be hesitant to make use of it.

Thankfully, picking a license doesn't have to be hard. There is an amazing website called [Chose A License](https://choosealicense.com/) that will help you do exactly this.

Once you have selected a license, copy and paste it into a file called `LICENSE.txt` inside the root directory of your package. After that, you will need to specify the license inside your `package.json` file.

```json package.json
{
  "license": "MIT"
}
```

For completely open-source projects, I recommend using the **MIT license**. It is one of the [most popular licenses in the world](https://resources.whitesourcesoftware.com/blog-whitesource/top-open-source-licenses-trends-and-predictions) amongst open-source projects. It's short, to the point and allows people to effectively do anything with your package while disclaiming any liability

### Setup ignore file

Before we start coding and making commits to our git repo, it's important to setup our ignore files. For those not familiar with the concept, ignore files tell Git and NPM what files to ignore when pushing to your repo or publishing your package.

Ignoring files is extremely important when publishing a public package. It helps us reduce any unnecessary bloat in our packages and prevents us from leaking any sensitive information.

There are 2 ignore files that are relevant for NPM packages. First is `.gitignore` and next is `.npmignore`. As you can guess, one tells Git what to ignore and the other tells NPM what to ignore. 

However, if you do not have a `.npmignore` file, NPM will use your `.gitignore` file instead. With this being the case, it's best to only use an `.npmignore` file when you need to over-ride your ignored files for NPM.

One thing to consider is whether certain files shouldn't be published with an NPM package. For example, when pushing our code to a remote git repo, we would want add our source code and tests. Some might say that publishing these to NPM are pointless as someone only needs the compiled source to use your package.

I personally think that it's better to publish source files and tests to NPM. The main reason is that as a developer, an IDE makes it easy to navigate to the source code of imported packages when it's available. As such, it's a great way for others to quickly inspect your source to see how the package behaves.

Now, both ignore files work according to the same syntax. Below is a sample ignore file that you can use to get started.

```txt .gitignore/.npmignore
node_modules/

# Ignore files with sensitive environment variables
.env
.env.test

# Next.js output
.next/

# Parcel cache
.cache/

# Ignore IDE configuration files
.idea/ 
.vscode/

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

## Coding

There are certain practices and things that we must consider we programming our package.

### Export Syntax

When programming our package, we might use several different files each exporting various functionality. Currently in JavaScript, there are 2 different ways we can export functionality. 

**Node.js way**

The Node.js way came about before JavaScript had an official standard for handling imports and exports. You can export anything from a particular file like this.

```js
module.exports = function add(a + b) {
  return a + b
}
```

**ES6 way**

Thankfully, JavaScript has now created a standard for handling imports and exports. This was introduced in the ES6 version of JavaScript. To export functionality we can do the following.

```js
export default (a + b) => {
  return a + b
}
```

**Which syntax to use?**

My recommendation is to stick with the new de-facto standard and use the ES6 syntax. However, at the time of writing this, neither the browser nor Node.js have native support for ES6 modules. As such, you require a build tool such as Webpack, Parcel and Typescript are capable if handling this.

If you are writing a package purely for use in a Node.js environment,  it's perfectly fine to use the Node.js `require` syntax without any issues.

### Choose the correct software pattern

Ultimately the functionality that our module brings can be exported in several different patterns. Below are 3 common patterns you can use.

**Function**

For isolated functionality that takes an input and returns an output, we can simply export one or more standalone functions. This is what the popular library lodash does.

```js index.js
export function add(a + b) {
  return a + b;
}

export function subtract(a + b) {
  return a - b;
}
```

The main benefit of this method is tools such as webpack are able to strip out unused exports from the package to reduce the final size of your bundle. This is called tree shaking. 

So a user doing `import { add } from "your-package"` will only get the `add` function and the `subtract` function won't be in their final code bundle.

**Singleton**

The singleton pattern exports an object containing all the functionality of your package. This is good when all your functionality is interrelated and is likely to be consumed together. Singletons will not get the benefit of tree shaking and stripping unused methods from your code.

```js
const Cart = {
  items: [],
  add: (item) => this.items.push(item),
  total: () => this.items.reduce((a, v) => a + v.price, 0),
}

export default Cart;
```

**Class**

Exporting a class allows users to create multiple instances of your package functionality. This is good in cases where multiple instances might be needed. For example, a cart might be better supplied as a class instead of a singleton if an application needed to have multiple carts.

```js
export default class Cart {

  items = []

  add = (item) => this.items.push(item)

  total = () => this.items.reduce((a, v) => a + v.price, 0)

}
```

### Application entry point

### Side effects

As defined in the Webpack documentation:

> A "side effect" is defined as code that performs a special behavior when imported, other than exposing one or more exports. An example of this are polyfills, which affect the global scope and usually do not provide an export.

Side effects unless required are a bad practice. By unexpectedly affecting the global scope, other developers may encounter hard to track bugs and issues. 

A side effect free package is also required for tree shaking when using Webpack and potentially other bundlers. This is so that un-used cost can be safely stripped out without potentially breaking a package due to unknown side effects.

While not part of the official `package.json` spec, the `sideEffects` property is a common convention used to indicate whether or not a package contains side-effects.

```json package.json
{
  "sideEffects": false
}
```

If certain files do have side-effects, you can specify them

```json package.json
{
  "sideEffects": [
    "./src/polyfills"
  ]
}
```

### Code comments

Don't expect code to be entirely self documenting. Granted writing clean code that follows standard conventions can go a long way to increasing readability. However, sometimes things do need extra clarification.

I highly recommend checking out this [javascript clean code guide](https://github.com/ryanmcdermott/clean-code-javascript).

### Install dependencies correctly

You probably already know this by now but NPM packages have 2 sets of dependencies. Run-time dependencies and development dependencies.

Run-time dependencies are modules that are consumed for anyone using your package. Development dependencies do not need to be installed for someone to utilize your package. This can include build and testing tools.

When publishing a package to NPM, make sure you separate your run-time and development dependencies correctly. This way users do not need to install unnecessary additional modules.

```json package.json
{
  "dependencies": {
    "react": "16.0.0"
  },
  "devDependencies": {
    "webpack": "4.0.0"
  }
}
```

Another important point to consider is locking down a dependency version. You have probably noticed many package.json files will specify a dependency version prefixed with `^`, for example `^16.0.0`.

This is telling NPM that it's okay to use the latest release version 16 release available. For example it can even use `16.6.0`.

Sometimes this behavior is fine, because by default all versions within a major release should be backwards compatible. In practice however, new bugs can appear between minor versions. That said, bugs could also be fixed in new minor versions.

How you handle this is up to you, but it's best to think practically. For critical applications, locking down a dependency version is usually preferable.

For more info on versioning, see the NPM document on [semantic versioning](https://docs.npmjs.com/about-semantic-versioning).

## Building

Building is the process of taking your source code and packaging it in certain ways for others who will use it.

By default, there is no reason to transpile pure JavaScript as it can run perfectly fine on it's own. However, it's common practice, to use build tools (Webpack, Rollup, Parcel, TypeScript) for a number of very good reasons. When using these tools, there are several things to consider.

### Choose module format for target environment

Before we get into this, lets recap a few things. 

First, JavaScript code is generally executed across two different environments, the browser and Node.js

Second there are 3 main specifications for import and exporting JavaScript packages. They are:

- AMD (Asynchronous Module Definition)
- CommonJS
- ES6 modules

AMD is typically used in the browser and CommonJS in Node.js. ES6 JavaScript has introduced its own module specification to standardize modules in JavaScript for both the browser and Node.js

Right now the ES6 import syntax is available in most modern browsers and is experimental in Node.Js. Since ES6 is still not available everywhere, you might have come across [Universal Module Definition](https://github.com/umdjs/umd) (UMD). This is a module pattern that is designed to work in environments supporting either AMD and CommonJS.

You can read about these module specifications in more detail at https://www.davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/

Now given this information, depending on what our intended environment is for our package, we would want to build our code differently.

**Node.js only package**

If you are using the `require` syntax, there is no additional work needed. Your code can easily be imported and run by anyone.

If you are using the ES6 module syntax, you can configure your build tool to convert ES6 imports to CommonJS module syntax which is what Node.js uses.

In Webpack this can be done by [setting the target to node](https://webpack.js.org/concepts/targets). For TypeScript, if your target is ES5 or less, CommonJS is the default module syntax. Otherwise if using ES6 or above, set the config property `module` to `CommonJS`.

- https://www.davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/
- https://medium.com/@kelin2025/so-you-wanna-use-es6-modules-714f48b3a953

**Browser only package**

When providing browser packages, we may want to provide 2 sets of code. One using the ES6 module syntax and another using the UMD pattern.

Even though ES6 modules are not fully supported yet, most modern frontend development workflows involve the use of tools like Webpack with Babel. These tools are able to handle ES6 modules which provide a number of benefits. Mostly notably, as we discussed in an earlier section, tree shaking allows the stripping of unused code exports. Overall it provides a much better dependency management system.

Currently, browsers have no way to import additional packages in JavaScript. The only way for JS code to be included is with a `<script>` tag. Naturally if we had many dependencies and files, it would be extremely painful for the end user to add and maintain script tags for all of these. 

UMD is a format for JavaScript packages where all your dependencies and files are bundled into a single `.js` file. All the code within your package is scoped inside a function which adds your exports to the global namespace.

The benefit of UMD 

As such, when building a package with multiple files and dependencies, we can use the 

The ES6 module syntax allows the importing of external functionality but this doesn't work in the browser natively (yet). With the ES6 module syntax, users can do `import Package from "package"` to access your functionality. To do this, they will need to use a build tool capable of handling imports. This is pretty common now days thankfully, with helpful tools like Webpack, Parcel and Rollup.

However, if you want others to be able to add a `<script>` tag to load a single file containing the functionality of your package, you need to compile your code into `UMD` format. UMD format will bundle all your package dependenceis and your source code into a single `.js` file. This way it can be easily accessed by others who are not using any kind of build tools that can handle imports.

If your package has no dependencies and is limited to a single or few files, you can likely skip this step altogether. However it is still good practice to define your library in UMD format manually to avoid polluting the global namespace.

**Node.js only package**

If you have written your code using `require` instead of `import`, then there is nothing to do here, your code can already run on Node.js.

If you used the ES6 syntax, a tool such as Babel, Rollup, TypeScript (if you use it) can help compile the `import` syntax down to `require`. For this you want to use the `CommonJS` module format.

**Both browser and Node.js**



Firstly, if you are targeting just the browser and your code has zero external dependencies, then you likely can skip this step. If you are targeting 

However if you are building a package that can be used in both environments or have multiple dependencies, then you need to package your application correctly.



### Tree-shaking

### TypeScript definitions

### Minification

--

## Pre-publishing

### Documentation

### Locking dependencies

### Ignoring files

### Your final package.json file

---

## Publishing process
---

## Post-publishing

### On-going maintenance

- pull requests
- your obligations and intentions

### Security considerations

-- dont publish senstivie data

### Package maintainers

