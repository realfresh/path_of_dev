const path = require("path")

exports.createPages = async ({ graphql, actions }) => {

  const { createPage } = actions

  const pages = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000 ) {
        edges {
          node {
            frontmatter {
              path
              preview
            }
          }
        }
      }
    }
  `)

  const template = path.resolve("src/templates/blog-post.tsx")

  pages.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.frontmatter.preview !== "true") {
      createPage({
        path: node.frontmatter.path,
        component: template,
        context: {},
      })
    }
    else {
      console.log("PREVIEW", node);
    }
  })

}