---
path: "/blog/publishing-type-definitions-with-npm-package"
date: "2019-07-31"
title: "Publishing TypeScript definitions with an NPM package"
description: "Already built your TypeScript package and ready to publish to NPM? Now see how to include your TypeScript type definitions with your package and avoid a major pitfall"
image: "/images/technologies/typescript.png"
---

Publishing your TypeScript module to NPM is relatively straight forward. When we do this, it's best to include our type definitions directly in our package.

This way other TypeScript users can import our package along with our type definitions. To publish an NPM package and include our type definitions, we need to do two things.

- Generate type definitions from `.ts` files
- Specify a main type definition file in `package.json`

## Generate type definitions

The TypeScript compiler allows you emit the definitions from all your TypeScript code. This means it will generate a `.d.ts` file containing only type definitions from any `.ts` file. Keep in mind it will not emit declaration files for `.d.ts` files in our project, only for `.ts` files.

Using this functionality, we can export the type definitions in our package along-side our compiled JavaScript code.

There are two ways to this.

First, you can use the CLI argument `--declaration` when running the TypeScript compiler.

```bash
tsc --declaration
```

Second, you can specify the `declaration` option in your `tsconfig.json` file.

```json
{
  "compilerOptions": {
    "declaration": true
  }
}
```

## Including type definitions

Simply generating your type declaration files is not enough. We will also need to supply a main type definitions entry-point. 

When publishing an NPM package, you will already have a single entry-point file that exports all your functionality. Let's say this is an `index.js` file and that this is generated from your `index.ts` file.

Using the `declaration` option with the TypeScript compiler will then generate an `index.d.ts` file that exports all your type definitions. This is the main type definition entry-point for your package.

You need to specify this declaration file in your `package.json`.  This is done by adding the `types` property like this:

```json
{
  "types": "./dist/index.d.ts"
}
```

When we add the `types` property to our `package.json`, TypeScript will automatically load your definitions when your package is imported.

## Not all type definitions exported

When using the `declaration` option with the TypeScript compiler, not all of your types will be exported. This can cause problems for others importing your package. There are a few things we can do to fix this.

### Write type definitions in .ts files

The first thing we need to do is make sure our type definitions are inside `.ts` files, not `.d.ts`. This is because the TypeScript compiler will not emit another declaration file for existing `.d.ts` files. Neither will it fix your type import paths in the emitted declaration files to point to any types imported from your existing `.d.ts` files.

As such, some of your types won't be exported correctly.

### Explicitly import type definitions

You must as also ensure that you are importing your type declarations instead of using them from your global TypeScript project scope.

For example say you have the following files:

```txt
- project-root
-- src
--- index.ts
--- types.ts
```

Your  `types.ts` file contains the following:

```ts
interface Options {
  message: string;
}
```

Your `index.ts` file that contains the following:

```ts
export function log(opts: Options): void {
  console.log(opts.message);
}
```

This is fine locally since your TypeScript project can find your `Options` interface referenced in the `index.ts` file. However, if someone tried to import your package, they would find that your `log` function `opts` would be type `any`. 

The reason is when importing a package, TypeScript will only import type definitions that are explicitly imported inside your files. As such, the `Options` interface won't be found by TypeScript.

Let's take a closer look. If you run the TypeScript compiler with the above files, it would output the following.

```txt
- project-root
-- dist
--- index.js
--- index.d.ts
--- types.js
--- types.d.ts
```

If we look at the entry-point `index.d.ts`, we would see the following:

```ts
export declare function log(opts: Options): void;
```

The issue is since you didn't explicitly import your `Options` interface, the person importing your package won't get access to it. They would instead see `opts` as type `any`.

To fix this, we would need to modify our `types.ts` file to look like this:

```ts
export interface Options {
  message: string;
}
```

Finally, our `index.ts` file should look like this:

```ts
import { Options } from "./types";

export function log(opts: Options): void {
  console.log(opts.message);
}
```

Now if we run the TypeScript compiler, we would see the `index.d.ts` file look like this:

```ts
import { Options } from "./types";
export declare function log(opts: Options): void;
```

At this point, our types will be correctly imported in our declaration files. Anyone importing our NPM package will have the correct access to all our types.

### Explicitly export all types in our package

One last thing we might want to do is to explicitly export all the type definitions written in our package. This is very useful for others importing your package who may want to access your types directly.

Going off the above file examples, we could modify our `index.ts` file to look like this:

```ts
import * as Types* from "./types";

export function log(opts: Types.Options): void {
  console.log(opts.message);
}

export { Types }
```

Using the `*` in our import allows us to grab all the exported type definitions in our `types.ts` file. Then we simply export that directly.

Now if someone was importing our package, they can do the following:

```ts
import { log, Types } from "your-package";

function newLog(title, opts: Types.Options) {
  log(opts);
  console.log(`Title: ${title}`);
}
```