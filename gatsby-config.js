// IN PRODUCTION, ENV VARIABLES INCLUDED FROM NETLIFY
if (process.env.NODE_ENV === "development") {
  require("dotenv").config({
    path: `.env.private`,
  })
}

module.exports = {
  siteMetadata: {
    title: `pathofdev`,
    description: `A blog with the aim to help simplify web development with helpful discussions and tutorials`,
    author: `@pathofdev`,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {

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
            },
            "/projects/react-tag-input": {
              priority: 0.8,
              changefreq: "weekly",
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
