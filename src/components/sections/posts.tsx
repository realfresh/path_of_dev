import React from "react"
import Disqus from "disqus-react"
import { graphql, Link, PageRendererProps, useStaticQuery } from "gatsby"
import { ListStyleA } from "../elements/ListStyleA"
import { FaGithub, FaNpm } from "react-icons/fa"

interface Data {
  allMarkdownRemark: {
    edges: Array<{
      node: {
        frontmatter: {
          date: string
          path: string
          title: string
          description: string
          preview: string
          image: string
          icon: string
        }
        timeToRead: number
      }
    }>
  }
}

function RenderPostImage({image, icon}: {image: string, icon: string}) {
  if (icon === "github") {
    return <FaGithub/>
  }
  return <img src={image} alt={image}/>
}

const BlogPosts = ({ posts }: { posts: Data["allMarkdownRemark"]["edges"] }) => {
  return (
    <ListStyleA>
      {posts.map(({ node }, i) => node.frontmatter.preview === "true" ? null : (
        <Link key={i} to={node.frontmatter.path} className="item">
          <div className="image">
            <RenderPostImage
              icon={node.frontmatter.icon}
              image={node.frontmatter.image}
            />
          </div>
          <div className="content">
            <h3 className="title">{node.frontmatter.title}</h3>
            <p className="details">
              {node.frontmatter.date}
              {` - `}
              <Disqus.CommentCount
                shortname={"path_of_dev"}
                config={{
                  url: `https://pathof.dev/${node.frontmatter.path}`,
                  identifier: node.frontmatter.path,
                  title: node.frontmatter.title,
                }}>
                0 Comments
              </Disqus.CommentCount>
              {` - `}
              {Math.round(node.timeToRead * 1.4)} min read
            </p>
          </div>
        </Link>
      ))}
    </ListStyleA>
  )
}

export const query = graphql`
    fragment PostQueryFragment on MarkdownRemarkConnection {  
        edges {
            node {
                frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    path
                    title
                    description
                    preview
                    image
                    icon
                }
                timeToRead
            }
        }
    }
`
export const BlogPostsAll = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
        query {
            allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 50 ) {
                ...PostQueryFragment
            }
        }
    `
  )
  return <BlogPosts posts={allMarkdownRemark.edges}/>
}

export const BlogPostsRecent = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
        query {
            allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 6 ) {
                ...PostQueryFragment
            }
        }
    `
  )
  return <BlogPosts posts={allMarkdownRemark.edges}/>
}
