## Welcome
This repo contains the source code for my blog https://pathof.dev

## Built with
The project makes use of https://www.gatsbyjs.org as a static site generator and https://prismic.io as a headless CMS. When used together, a static blog site like this can be created. It can also be hosted on static hosting like https://www.netlify.com

## How can I use this source to create my own blog?

### Prerequisites
- https://nodejs.org - installed on your PC
- https://prismic.io - create a repository with a content type called `Blog` with an API id of `blog` and get your API key for it

### Process
1. Clone this repo to your PC or fork it if you like
2. Go to repo folder on your PC and install dependencies with `npm install` or `yarn`
3. Create a file in the root folder called `.env.private`

Inside the `.env.private` file, add the following and replace the dots with your information
```
PRISMIC_REPOSITORY_NAME=...
PRISMIC_API_KEY=...
GOOGLE_ANALYTICS_PROPERTY_ID=...
```

Use the following shell commands as needed
```
npm run develop # run in development, visit http://localhost:8000
npm run build # generate production build
npm run serve # serve production build
```

### Hosting your static site
You can use any static site hosting you like. Simple options are to upload the files to an S3 bucket or use a service like https://www.netlify.com
