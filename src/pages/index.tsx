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
    allPrismicBlog: {
      edges: Array<{
        node: {
          id: string
          uid: string
          first_publication_date: string
          data: {
            title: {
              text: string
            }
            description: {
              text: string
            }
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
    .date {
      font-size: 0.8rem;
    }
    .description {
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
      {props.data.allPrismicBlog.edges.map(({ node }) => (
        <li key={node.id}>
          <Link className="post" to={`/blog/${node.uid}`}>
            <h2 className="title">{node.data.title.text}</h2>
            <p className="date">
              {new Date(node.first_publication_date).toLocaleDateString()}
              {` - `}
              <Disqus.CommentCount
                shortname={"path_of_dev"}
                config={{
                  url: `https://pathof.dev/blog/${node.uid}`,
                  identifier: node.id,
                  title: node.data.title.text,
                }}>
                0 Comments
              </Disqus.CommentCount>
            </p>
            <p className="description">{node.data.description.text}</p>
          </Link>
        </li>
      ))}
    </Posts>
  </Layout>
)

export const query = graphql`
  query PageQuery {
      allPrismicBlog(sort: {fields: first_publication_date, order: DESC}) {
          edges {
              node {
                  id
                  uid
                  first_publication_date
                  data {
                      title {
                          text
                      }
                      description {
                          text
                      }
                  }
              }
          }
      }
  }
`