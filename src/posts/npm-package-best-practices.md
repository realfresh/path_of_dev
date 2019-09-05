---
path: "/blog/npm-package-best-practices"
date: "2019-09-05"
title: "Publishing an NPM package - Best practices"
description: "Publishing an NPM package can be hard. Let's look at the best practices for publishing a great package to the NPM"
image: "/images/technologies/npm.png"
---

Thank you! By contributing to the NPM package repository, you are helping make the world a better place for all JavaScript developers. However, the NPM ecosystem has recently gotten a bad reputation for having low-quality packages.

With that in mind, let's try to ensure all our contributions meet a certain standard. Recently, I decided to start open-sourcing my internal projects and publishing NPM modules. Along the way, I hit quite a few road bumps that left me wondering about the best practices when publishing a package to NPM.

As such, the purpose of this article is to summarize the best practices that I learnt. I've broken these down into several different sections. You do not need to read them in order, feel free to skip to the section that is most relevant for you.

This article is aimed at those intending to publish public packages for open-source use. If you plan on publishing private or internal packages, many of these best-practices may no longer apply.

## Setup

Before we start coding away, we must first initialize our NPM package and set up a few things. If you are not sure how to do this, see the [NPM documentation](https://docs.npmjs.com/creating-node-js-modules).

### Choose a package name

The name of your NPM package is controlled by the `name` field inside your `package.json` file.

```json /package.json
{
  "name": "your-package-name"
}
```

Picking a great name for an NPM package can aid its adoption. Try to strike a good balance between something that sounds nice while also describing the package in a nutshell.

There are a few [restrictions for naming NPM packages](https://docs.npmjs.com/files/package.json#name). To summarize, package names but be:

- URL safe
- Must not contain uppercase letters
- Cannot start with a dot or underscore
- Be less than 214 characters

It's also ideal to separate multi-word package names using a dash instead of underscore. While this isn't an explicit rule, its a community convention and it makes life easy when everyone sticks to a particular pattern.

When naming packages, we can choose to prefix the name with an organization name. In your NPM account dashboard, you will need to create a new organization such as `@pathofdev` which I have for my packages. The `@` denotes the organization name.

This is especially good if the package name you wanted was already taken as the prefix now differentiates it from the original. It's also good if you are trying to create a "brand".

So to give you an example, I recently published a [react tag input component](/projects/react-tag-input). The name I gave the package was `@pathofdev/react-tag-input`. Originally, I wanted to use `react-tag-input` but it was already taken. Thankfully by scoping the package to the `@pathofdev` organization, I could now provide the descriptive name I was after.

### Setup a Git repository

No public NPM package would be complete without a Git repository behind it. To be honest, I'm not even sure if NPM will let you publish your package without initializing a Git repository. Regardless, the usefulness of it cannot be overstated. If you are unsure about how Git works, I recommend checking out my other article, [making sense of Git and GitHub](/blog/making-sense-of-git-github).

This Git repository should ideally be published online using a service such as GitHub. While you can use other platforms, GitHub is popular with the open-source and NPM community so it's best to stick with that.

With an online Git repository, others can:

- Easily inspect your source code
- Suggest improvements or point out bugs
- Contribute to your project using pull requests

You can specify the URL for your Git repository in your `package.json` file. If you do this, your NPM package webpage will contain a link to your Git repo.

```json /package.json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/..."
  }
}
```

While using Git, you can keep adding commits and pushing changes to your remote Git repo without interfering with your NPM publishing.

### Independent packages or monorepo 

A monorepo is a single repository that contains code for many different related packages. This is a new pattern that is emerging to cope with a large number of interrelated packages.

Extremely popular libraries such as [Babel](https://github.com/babel/babel) use this monorepo structure. If you open the packages folder inside the repo, you will see all the packages that Babel publishes individually.

Naturally, it would be a huge pain to install Babel if all their code was bundled into one single package. More so considering that you won't use 95% of the packages they provide. For such use cases, splitting functionality into multiple packages and managing them in a monorepo can be ideal.

To summarize, you should consider using a monorepo structure if:

- You plan on publishing many related packages
- Each package imports common code from other your other packages

While monorepos are useful, they do have disadvantages. It will require you to learn a slightly different workflow and additional tools. Commonly, monorepos are constructed using either [Lerna](https://github.com/lerna/lerna) and/or [Git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules).

If you are interested in learning how to set up a monorepo, check out my article, [lerna monorepo with TypeScript incremental builds](https://pathof.dev/blog/lerna-typescript-monorepo).

### Directory structure conventions

When we are publishing a public NPM package, there is a good chance other developers may want to inspect the source code. Perhaps they even want to contribute a fix or feature to your package. 

For this, we need to ensure it's easy for others to navigate and reason with our codebase. This is best done by sticking to the common conventions that everyone is familiar with. This way, everyone will be on the same page.

A typical NPM package generally tends to use the following folder structure:

```txt no-lng
/build/
/libs/
/src/
/tests/
/vendor/
/package.json
```

**Not all the above folders are required, use them only where applicable.**

The root folder will usually contain all the configuration files for the project such as your `package.json`.

The purpose of the other folders are:

-  `build` - contains the compiled code of our project if applicable. Sometimes called `dist`
- `libs` - usually contains isolated modules of code that our main application may utilize. It typically refers to modules written by the package author specifically for this package.
-  `src` - contains the primary source code for your module
-  `tests` - contains any package tests
-  `vendor` - similar to libs but usually contains 3rd party code

Keep in mind there are no hard and fast rules, these are just common conventions.  So use your common sense. Ideally, where possible, don't re-invent the wheel so everyone else can understand your project.

### Choose a license

Choosing a license for your package is extremely important. A license defines the terms for using the package you have created. Without a license, developers, especially businesses will be hesitant to make use of it.

Thankfully, picking a license doesn't have to be hard. There is an amazing website called [Chose A License](https://choosealicense.com/) that will help you do exactly this.

Once you have selected a license, copy and paste it into a file called `LICENSE.txt` inside the root directory of your package. After that, you will need to specify the license name inside your `package.json` file.

```json /package.json
{
  "license": "MIT"
}
```

For open-source projects, I recommend using the MIT license. It is one of the [most popular licenses in the world](https://resources.whitesourcesoftware.com/blog-whitesource/top-open-source-licenses-trends-and-predictions) amongst open-source projects. It's short, to the point and allows people to effectively do anything with your package while personally disclaiming any liability.

### Set up ignore files

Before we start coding and making commits to our Git repo, it's important to set up our ignore files. For those not familiar with the concept, an ignore file tells Git and NPM what files to ignore when pushing code your repo or publishing your package.

This is useful for public packages as it can:
 
- Help reduce any unnecessary bloat in our package
- Prevent us from leaking any sensitive information we might store locally

There are 2 ignore files that are relevant for NPM packages. 

- `.gitignore` - tells Git what files to ignore
- `.npmignore` - tells NPM what files to ignore

This files must be located in the root folder of your package.

Keep in mind, if you do not have a `.npmignore` file, NPM will use your `.gitignore` file instead. With this being the case, it's best to only use a `.npmignore` file when you need to override your Git ignored files.

On that note, one thing to consider is what files we should publish to NPM. For example, when pushing our code to a remote Git repo, we would want to add our source code and tests. Some might say that publishing our source code to NPM is pointless as someone only needs the compiled source to use your package (assuming you are compiling your code).

However, I think that it's better to publish source files and tests to NPM provided it's not huge. The main reason is that as a developer, an IDE makes it easy to navigate to the source code of imported packages when it's available. As such, it's a great way for others to quickly inspect your code to see how the package behaves.

Lastly, both ignore files work according to the same syntax. Below is a sample ignore file that you can use to get started.

```txt .gitignore | .npmignore
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

When we are coding our packages, there are some major decisions we must make in terms of syntax and structure.

### Export syntax / module system

Our package might use several different files each exporting various functionality (a module). Currently, in JavaScript, there are 2 popular ways we handle file modules in JavaScript.

**CommonJS (Node.js standard)**

CommonJS way came about before JavaScript had an official standard for handling imports and exports. This is what Node.js uses to handle imports and exports. You can export anything from a particular file like this.

```js add.js
module.exports = function add(a + b) {
  return a + b
}
```

A user would simply import the package like this.

```js
const add = require("./add.js");
console.log(add(1, 1));
```

**ES6 modules**

In recent years, JavaScript has created a standard for handling imports and exports. This was introduced in the ES6 version of JavaScript. To export functionality, we can do the following.

```js add.js
export default function(a + b) {
  return a + b
}
```

It can then be imported like this.

```js
import add from "./add";
console.log(add(1, 1));
```

**Which syntax to use?**

My recommendation is to stick with the new de-facto standard and use the ES6 modules. Sadly, at the time of writing this, support for ES6 modules is still not completely widespread. Certain browsers and the Node.js environment do not have native support for them.

As such, you will need to use a build tool such as [Babel](https://babeljs.io) or a superset language like[Typescript](https://www.typescriptlang.org) which are capable of handling ES6 imports. These tools can package your code appropriately for different environments. For example, if your target is Node.js, these tools will turn your ES6 imports into CommonJS imports. 

If your target is the browser, you should use a bundler such as Webpack or Parcel alongside Babel / TypeScript to handle ES6 modules. This will allow you to bundle all your imports into a single file that can run in the browser.

Using ES6 imports will also enable something called **tree-shaking**. This is extremely valuable for client-side projects where we want to minimize our final code size. Essentially, any unused imports from packages will be stripped out from our final code. We will talk more about this in a later section.

If you are writing a package purely for use in a Node.js environment, it's perfectly fine to use the Node.js `require` syntax and skip over ES6 imports.

### Choose the correct software pattern

Ultimately the functionality that our module brings can be exported in several different patterns. Below are 3 common patterns you can use.

**Function**

For isolated functionality that takes an input and returns an output, we can simply export one or more standalone functions. This is what the popular library [Lodash](https://lodash.com) does.

```js index.js
export function add(a + b) {
  return a + b;
}

export function subtract(a + b) {
  return a - b;
}
```

One huge benefit of using this method is that it is easily tree-shakeable when using the ES6 modules. So a user doing `import { add } from "your-package"` will only get the `add` function and the `subtract` function won't be in their final code bundle.

**Singleton**

The singleton pattern exports a single instance containing the primary functionality of your package. This is good when all your functionality is interrelated and is likely to be consumed together. Singletons will not get the benefit of tree shaking.

```js
const Cart = {
  items: [],
  addItem: function(item) { 
    this.items.push(item);
  },
  getTotal: function() { 
    return this.items.reduce((a, v) => a + v.price, 0);
  },
};

export default Cart;
```

**Class**

Exporting a class allows users to create multiple instances (singletons) of your package functionality. This is good in cases where multiple instances might be needed with each instance having a slightly different configuration. 

For example, consider my [loading bar NPM package](https://github.com/pathofdev/Untrusive). I could have written it as a function or singleton, but then a user would have to pass a lot of arguments every time they want to start or stop the loading bar. Such as the bar colours and height.

With a class, a user can initialize the loading bar with a set of options and then easily call the methods to start and stop it without needing to pass any arguments. They can also have multiple loading bars each with different options.

```js
export default class Loader {

  constructor(options) {
    this.options = options;
  }

  start = () => {
    // access this.options
  }

  stop = () => {
    // access this.options
  }

}
```

### Application entry-point

Ideally, all your package functionality should be exported from a single file. This is your entry-point. This is how an NPM package is structured by default, as `package.json` only allows for single-file entry-point. 

Currently, there are 3 different application entry-points that be can be defined. They are:

- `main` - CommonJS or UMD entry-point
- `module` - ES6 module entry-point
- `types` - TypeScript definitions entry-point

**Main**

This is the only official entry-point supported by NPM, the others are community conventions. As such, publishing a package to NPM only requires the `main` entry-point, the others are optional. The `main` field must contain the path to your `.js` file that exports your package functionality. The exports must be compatible with Node's CommonJS module system. For example:

```js /src/index.js
module.exports = function(a + b) {
  return a + b
}
```

```json /package.json
{
  "main": "./src/index.js"
}
```

**Module**

The `module` entry-point is the same as the `main` one except instead of using the CommonJS `require` syntax, we use the ES6 module `export` syntax.

```js /src/index.mjs
export default function(a + b) {
  return a + b
}
```

```json /package.json
{
  "module": "./src/index.mjs"
}
```

Keep in mind, you can use ES6 modules in regular `.js` files instead of `.mjs`, it was just for the sake of keeping it separate in the above example.

This module entry-point will be used by community build tools to directly access the ES6 module files to aid with tasks like tree-shaking.

As mentioned before, I think the current best practice is to write your code in ES6 module format and use build tools to transform that into CommonJS or UMD format. Then, inside your `package.json`, supply the original ES6 module code to `module` field and the compiled CommonJS or UMD code to `main`.

**Types**

Finally, there is the `types` entry-point. This field points to all our exported TypeScript definitions for this package. This is where the TypeScript compiler will look to find your package types. 

As you can imagine, it's extremely useful as it allows others using your package to have a strongly typed interface enabling auto-complete and argument checking.

You can tell the TypeScript compiler to emit type definition files by specifying `-d` as a CLI argument. You can also add it to your `tsconfig.json` file.

```json /tsconfig.json
{
  "compilerOptions": {
    "declaration": true
  }
}
```

With that option, TypeScript will output a `.d.ts` file for all your `.ts` files. This will only contain type definitions. Since you have already exported all your package functionality from a single file, say `index.ts`, TypeScript will generate an `index.d.ts` file containing the type definitions of all your exported functionality. 

We can then add this file to our `types` field inside our `package.json`.

```json /package.json
{
  "types": "./dist/index.d.ts"
}
```

Keep in mind, the `declaration` option will not include type definitions in your code that you do not explicitly export. For example, if your package contains the following code:

```ts /src/index.ts
interface Options {
  color: string;
}

export default function(options: Options) {
  console.log(options.color);
}
```

The generated `index.d.ts` file will not export the `Options` interface. It's a good idea to make sure that is exported as well. This way people can import the `Options` interface and initialize the options object outside of the function argument.

```ts /src/index.ts
export interface Options {
  color: string;
}
```

**Multiple entry-points**

While there is no official way to have multiple entry-points, users can still import a specific file from your package. The `main` entry-point is simply the default file loaded when someone calls your package without a path.

```js
import package from "my-package" // loads main entry-point
```

Calling the package with a path will lead to a specific file within the package folder. This file can then export its own functionality.

```js
import subPackage from "my-package/dist/subPackage"
```

### Side effects

As defined in the [Webpack documentation](https://webpack.js.org/guides/tree-shaking/):

> A "side effect" is defined as code that performs a special behavior when imported, other than exposing one or more exports. An example of this are polyfills, which affect the global scope and usually do not provide an export.

Side effects unless required are a bad practice. Going off the Webpack example, a polyfill by its nature will produce side-effects. However, the majority of packages should be side-effect free. The issue is, by unexpectedly affecting the global scope, other developers may encounter hard to track bugs and issues. 

A side effect free package is also required for tree shaking when using Webpack and potentially other bundlers. This is so that un-used code can be safely stripped out without potentially breaking a package due to unknown side effects.

While not part of the official `package.json` spec, the `sideEffects` property is a common convention used to indicate whether or not a package contains side-effects.

```json /package.json
{
  "sideEffects": false
}
```

If certain files do have side-effects, you can specify them:

```json /package.json
{
  "sideEffects": [
    "./src/polyfills.js"
  ]
}
```

### Tree-shaking friendly

Tree-shaking is the process of stripping away unused dependencies from our final code. For end-users of our package to use tree shaking, our code must meet the following requirements:

- ES6 module format
- Be side effect free

Once these constraints are satisfied, tree-shaking can be conducted on your package. If you have followed the above recommendations, your code will meet this standard.

### Code comments

Don't expect code to be entirely self-documenting. Granted writing clean code that follows standard conventions can go a long way in increasing readability. However, sometimes things do need extra clarification.

I highly recommend checking out the [javascript clean code guide](https://github.com/ryanmcdermott/clean-code-javascript#comments). The section about comments has a fantastic example of useless comments vs useful comments.

### Install dependencies correctly

You probably already know this by now but NPM packages have 2 sets of dependencies. Run-time dependencies and development dependencies.

Run-time dependencies are modules that are consumed when using the main functionality of your package. Development dependencies do not need to be installed for someone to utilize your package. This can include build and testing tools.

When publishing a package to NPM, make sure you separate your run-time and development dependencies correctly. This way users do not need to install unnecessary dependencies.

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

## Building

Building is the process of taking your source code and packaging it in a certain way. By default, there is no reason to build/compile/transpile pure JavaScript as it can run perfectly fine on its own. 

However, tools such as Babel, TypeScript, Webpack and others allow us to greatly extend the JavaScript language. When using these tools that require us to build our code, there are several things to consider.

### Choose module format for target environment

Before we get into this, let's recap a few things for those unfamiliar with JavaScript modules. First, JavaScript code is generally executed across two different environments, the browser and Node.js

Second, there are 4 main specifications for JavaScript modules. They are:

- AMD (Asynchronous Module Definition)
- CommonJS (Node.js)
- UMD (Universal Module Definition)
- ES6 modules (New JS standard)

AMD is used in the browser. CommonJS is used in Node.js. UMD is a pattern that integrates both CommonJS and AMD. Thus allowing modules to work in both the browser and Node.js

As you can see, the JS ecosystem was becoming a mess of competing ideas. Thankfully, ES6 JavaScript has introduced its own module specification to standardize modules in JavaScript for both the browser and Node.js

Right now the ES6 import syntax is available in most modern browsers and is experimental in Node.Js. Sadly, since it lacks complete support, we still need to worry about using older module systems.

You can read about these module specifications at the following articles:

- [What is AMD, CommonJS, and UMD?](https://www.davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd)
- [Learn the basics of the JavaScript module system and build your own library](https://www.freecodecamp.org/news/anatomy-of-js-module-systems-and-building-libraries-fadcd8dbd0e)
- [How to write and build JS libraries in 2018](https://medium.com/@kelin2025/so-you-wanna-use-es6-modules-714f48b3a953)

Now given this information, depending on what our target environment is for our package, we would want to supply our code in the correct module pattern.

**Node.js only package**

For Node.js only packages, your code must be available in CommonJS module format with the syntax `require` and `module.exports =`. Writing your code this way means no additional work will be required before publishing your package.

However, it is still common for package authors to use tools like Babel to get access to the latest JavaScript features including ES6 modules.

If you are using the ES6 module syntax, you can configure your build tool to convert ES6 modules to CommonJS module syntax.

In Webpack this can be done by [setting the target to node](https://webpack.js.org/concepts/targets). For TypeScript, if your target is ES5 or less, CommonJS is the default module syntax. Otherwise if using ES6 or above, set the compiler option property `module` to `commonjs`.

**Browser only package**

When providing browser packages, we may want to provide 2 sets of code. One using the ES6 module syntax and another using the UMD pattern.

Even though ES6 modules are not fully supported yet, most modern frontend development workflows involve the use of tools that use Babel. This allows them to handle ES6 modules which provide a number of benefits. Most notably, as we discussed in an earlier section, tree shaking allows the stripping of un-used code exports.

You could also supply your code in CommonJS module format instead of ES6. However, tree-shaking would no longer be possible for your package.

But what about those not using tools capable of handling ES6 modules? Aside from ES6 modules, browsers can only use the `<script>` tag to load additional JavaScript. Naturally, if our package had many dependencies and files, it would be extremely painful for the end-user to add and maintain script tags for all of these. 

This is where the UMD format comes in. By using a package bundler such as Webpack or Parcel, we can create a single `.js` file with all our code and dependencies. This bundle will follow the UMD specification and can be run on the browser. This way, your users can load your package with a single `<script>` tag.

As you can imagine, this way is definitely inferior. Naturally, if you have many dependencies, the single file would be huge. More than likely, users would be double loading certain dependencies. For example, if your package uses jquery, someone adding your UMD bundle to their site will load your bundled jquery along with their own separate jquery if they use it. On the other hand, if users of your package use a bundler like Webpack and your code is available is ES6 or CommonJS module format, the jquery dependency could be shared.

To summarize, write your code using ES6 modules and use a bundler to supply a UMD file with all dependencies bundled.

**Both browser and Node.js**

When targeting both browsers and Node.js, it's best to write our code using ES6 modules. Then with our build tool, we can create one CommonJS build and another UMD build. This way those using Node.js can import the CommonJS build. Browser users can either use the ES6 module build if using a bundler or the UMD build otherwise. 

When doing this, specify the CommonJS build in the `main` field of your `package.json`. This way in a Node.js environment, that is loaded directly.  Those who like to use your UMD bundle can include it manually or access it through a CDN like [jsDelivr](https://www.jsdelivr.com).

### TypeScript definitions

Publishing type definitions is super helpful to all package users. It provides an almost self-documenting API for a package. I have written an article specifically on this previously. Check out [publishing type definitions with NPM package](/blog/publishing-type-definitions-with-npm-package). 

As mentioned in the entry-points section above, you will need to use the `types` field inside your `package.json` to point to the package types.

### Minification

This is slowly becoming less relevant for package publishers as build tools will often handle this for our end users. However, if we are providing a UMD bundle for browser usage, it would be ideal to provide a minified version of that. This way, it's one less step for those loading our package with a `<script>` tag.

## Pre-publishing

Before we publish our package, there are a few additional things we may want to do and consider.

### Documentation

If you want others to use your package, you must provide good documentation. Without this, nobody stands a good chance of working with what you have created. 

GitHub is the perfect place for this documentation to live. To add documentation to your repository, create a `README.md` file in the root folder of your package.

Here you can use markdown syntax to write out your docs. At a minimum, your docs should contain the following:

- Overview and benefits of your package
- Usage instructions for different environments
- API documentation explaining all methods and functionality

With this, users have something to work with.

### Locking dependencies

Due to how versioning is handled in `package.json`, the package downloaded can be different than the version specified. For example, prefixing our package version with `^1.0.0` allows NPM to download any version `1`  package such as `1.0.5` or `1.2.0`. 

While a minor version jump is meant to be backwards compatible, the reality is functionality can often change or break.

Sometimes this behavior can be fine, especially when your dependencies are extremely well-supported packages with carefully tested releases. It may also be necessary if security is important as new versions may contain security patches.

Regardless, how you handle this is up to you, but it's best to think practically. For mission-critical packages, locking down a dependency version is usually preferable.

Locking our package dependencies is a way of ensuring that only a specific package version is installed. You are probably already familiar with `package-lock.json` or `yarn.lock`. These files are there to lock down the dependencies of a package. 

While these files do provide dependency locking, it's not published to NPM for others to use. This is where the `npm-shrinkwrap.json` file comes in. This is the same as `package-lock.json`, however, NPM handles it differently. Most notably it is published alongside your NPM package.

To generate a shrinkwrap file, we simply run the following command in our package folder:

```bash no-lng
npm shrinkwrap
```

This will convert our `package-lock.json` to `npm-shrinkwrap.json`,

One important trade-off to understand is including this will force others to use a certain version of our dependencies. This means if they are also using the same dependency but a different version, they will have to install both versions. 

By not including a shrinkwrap file, NPM can install a version that's compatible with your version and their version if possible.

For more info on versioning, see the NPM document on [semantic versioning](https://docs.npmjs.com/about-semantic-versioning).

### Your final package.json file

Just to recap all the things discussed in this article, let's see how our `package.json` file should be looking.

```json /package.json
{
  "name": "package-name",
  "version": "1.0.0",
  "description": "A description to show on NPM",
  "keywords": ["search tags"],
  "author": "Your Name",
  "license": "MIT",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "https://github.com/..."
  },
  "scripts": {},
  "devDependencies": {},
  "dependencies": {}
}
```

I also recommend reading the [NPM page dedicated to the package.json file](https://docs.npmjs.com/files/package.json). This will explain all the options available in detail excluding certain community conventions like `sideEffects`, `module`, `types` etc.

### Security considerations

There are several best practices around security for publishing a public NPM package. This is not an extensive list but it should serve as a good starting point.

The key security considerations in my opinion are:

- Do not publish private information to your VCS or NPM (use ignore files)
- Ensure that your package uses minimal dependencies 
- Carefully evaluate any dependencies that you do use
- Take care before giving VCS / NPM access to any 3rd party

## Publishing process

Publishing an NPM package is extremely simple. The process is:

- Run any build commands if necessary
- Stage changes in VCS, e.g. `git add .`
- Commit changes with a message (optional as the next step creates a commit)
- Run `npm version patch|minor|major` to update package version (this creates a commit and a Git tag for the new version)
- Push changes and tags to VCS with `git push --tags`
- Publish to NPM with `npm publish`

The process is mostly self-explanatory. If we were just using Git without NPM, typically we might do `git add . && git commit -m "message" && git push`.

When publishing to NPM, we are pretty much doing that with two extra commands, `npm version` and `npm publish`.

The NPM version command creates a Git commit and updates the version number inside your `package.json`. It also creates a Git tag for that specific version.

Given this, it's optional to create a commit with a message and running `npm version` is sufficient. However, it's probably still a good idea to add messages or release notes for each tag. When using the version command, you can specify either patch, minor or major for how your version should be incremented.

See the [NPM CLI reference](https://docs.npmjs.com/cli-documentation/cli) for more info on these commands.

To help simplify your publishing process, I recommend adding the following scripts to your `package.json`

```json /package.json
{
  "scripts": {
    "build": "your-build-command",
    "publish": "git push --tags && npm publish"
  }
}
```

With these 2 scripts, your publishing process should look like this:

- `npm run build`
- `git add .`
- `git commit -m "description"`
- `npm version patch|minor|major`
- `npm run publish`

## Post-publishing

If you've published your package, congratulations! The fun doesn't stop here though. For a package to be successful, it must be maintained. Maintaining a package ideally requires you to:

- Review any issues created on your repository
- Review any pull requests created on your repository
- Review your code, dependencies and documentation from time to time

By default, you have no obligation to provide any kind of on-going maintenance for your package. However, it's extremely helpful if you are clear with your intentions. If you have no plans on maintaining your package in an on-going fashion, state that upfront. 

It's extremely frustrating for developers working on professional projects to work with packages that are not maintained properly.

## Conclusion

I hope you enjoyed this article. It took a lot of time and effort to put it together. If there is anything important I missed out on, let me know and I will add it here. All feedback is appreciated!