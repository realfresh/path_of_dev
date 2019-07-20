## Welcome
This repo contains the source code for my blog https://pathof.dev

## Built with
The project makes use of Gatbsty JS as a static site generator and prismic.io as a headless CMS. Together, this blog site is statically generated and hosted on Netlify

## How can I use this source to create my own blog?

### Prerequisites
- prismic.io account with a content type called `Blog` with an API id of `blog`
- prismic.io API key

### Process
1. Clone this repo to your PC
2. Go to folder, install dependencies with `npm install` or `yarn`
3. Create a file in the root folder called `.env.private`

Inside the `.env.private` file, add the following and replace the dots with your information
```
PRISMIC_REPOSITORY_NAME=...
PRISMIC_API_KEY=...
GOOGLE_ANALYTICS_PROPERTY_ID=...
```

To be continued...
