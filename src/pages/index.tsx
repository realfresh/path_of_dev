import React from "react"
import styled from "styled-components"
import Disqus from "disqus-react"
import {graphql, Link, PageRendererProps} from "gatsby"
import {theme} from "../theme"
import {Layout} from "../components/layout"
import {SEO} from "../components/seo"
import {boxStyles} from "../components/box"

interface Props extends PageRendererProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            date: string
            path: string
            title: string
            description: string
            preview: string
          }
        }
      }>
    }
  }
}

const Posts = styled.ul`
  margin-top: 20px;
  .post {
    ${boxStyles};
    display: block;
    margin-top: 20px;
    padding: 25px 30px;
    color: ${theme.text};
    text-decoration: none;
    .title {
      font-size: 1rem;
      line-height: 1.4rem;
      font-weight: 600;
    }
    .details {
      margin-top: 2px;
      font-size: 0.8rem;
    }
    .description {
      margin-top: 5px;
      font-size: 0.9rem;
      line-height: 1.4rem;
    }
  }
`

export default (props: Props) => (
  <Layout>
    <SEO title="path_of_dev: Simplifying web development">
      <link rel="canonical" href="https://pathof.dev"/>
    </SEO>
    <h1 className="lhp">Latest Posts</h1>
    <Posts>
      {props.data.allMarkdownRemark.edges.map(({ node }, i) => node.frontmatter.preview === "true" ? null : (
        <li key={i}>
          <Link className="post" to={node.frontmatter.path}>
            <h2 className="title">{node.frontmatter.title}</h2>
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
            </p>
            <p className="description">{node.frontmatter.description}</p>
          </Link>
        </li>
      ))}
    </Posts>
  </Layout>
)

export const query = graphql`
  query PageQuery {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000 ) {
          edges {
              node {
                  frontmatter {
                      date(formatString: "MMMM DD, YYYY")
                      path
                      title
                      description
                      preview
                  }
              }
          }
      }
  }
`