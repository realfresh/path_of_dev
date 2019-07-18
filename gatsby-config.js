const he = require('he');
const seoUrl = require("./src/utilities/seo-url");
const PrismicDOM = require('prismic-dom');
const Elements = PrismicDOM.RichText.Elements;

// IN PRODUCTION, ENV VARIABLES INCLUDED FROM NETLIFY
if (process.env.NODE_ENV === "development") {
  require("dotenv").config({
    path: `.env.private`,
  })
}

module.exports = {
  siteMetadata: {
    title: `path_of_dev`,
    description: `A blog with the aim to help simplify web development with helpful discussions and tutorials`,
    author: `@path_of_dev`,
    siteUrl: 'https://pathof.dev'
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: process.env.PRISMIC_REPOSITORY_NAME,
        accessToken: process.env.PRISMIC_API_KEY,
        linkResolver: ({ node, key, value }) => post => `/blog/${post.uid}`,
        htmlSerializer: ({ node, key, value }) => (
          type,
          element,
          content,
          children,
        ) => {

          if (type === Elements.heading2) {
            const text = children.join('')
            return `<h2 id="${seoUrl(text)}"><a href="#${seoUrl(text)}">${text}</a></h2>`
          }
          if (type === Elements.heading3) {
            const text = children.join('')
            return `<h3 id="${seoUrl(text)}"><a href="#${seoUrl(text)}">${text}</a></h3>`
          }
          if (type === Elements.heading4) {
            const text = children.join('')
            return `<h4 id="${seoUrl(text)}"><a href="#${seoUrl(text)}">${text}</a></h4>`
          }

          if (type === Elements.embed) {
            return (`
              <div class="embed" data-oembed="${element.oembed.embed_url}" data-oembed-type="${element.oembed.type}" data-oembed-provider="${element.oembed.provider_name}">
                ${element.oembed.html}
              </div>
            `);
          }

          if (type === Elements.image) {
            return `<img class="post-image" src="${element.url}" alt="${element.alt === null ? '' : element.alt}">`;
          }

          if (type === Elements.preformatted) {
            let string = "";
            for (const c of children) {
              if (c.indexOf("-----") !== -1) {
                const tmp = c.split("-----")
                string += he.unescape(tmp[1]);
              }
              else {
                string += c;
              }
            }
            return string;
          }

          // RETURN DEFAULT VALUE
          return null;

        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `path_of_dev`,
        short_name: `pod`,
        start_url: `/`,
        background_color: `#f9f9f9`,
        theme_color: `#2FD023`,
        display: `minimal-ui`,
        icon: `static/images/icon-logo-512px.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`,
        serialize: ({ site, allSitePage }) => {

          const routes = {
            "/": {
              priority: 1,
              changefreq: "daily",
            }
          };

          return allSitePage.edges.map(edge => {
            const r = routes[edge.node.path];
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: r ? r.changefreq : "monthly",
              priority: r ? r.priority : 0.7,
            }
          })

        }
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_PROPERTY_ID,
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: ["/preview/**"],
      },
    },
  ],
}
