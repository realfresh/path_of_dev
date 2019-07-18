const path = require("path")

exports.createPages = async ({ graphql, actions }) => {

  const { createPage } = actions

  const pages = await graphql(`
    {
      allPrismicBlog {
        edges {
          node {
            id
            uid
          }
        }
      }
    }
  `)

  const template = path.resolve("src/templates/blog-post.tsx")

  pages.data.allPrismicBlog.edges.forEach(edge => {
    createPage({
      path: `/blog/${edge.node.uid}`,
      component: template,
      context: {
        uid: edge.node.uid,
      },
    })
  })

}