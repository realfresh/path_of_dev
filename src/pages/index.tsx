import React from "react"
import styled from "styled-components"
import Disqus from "disqus-react"
import {graphql, Link, PageRendererProps} from "gatsby"
import {theme} from "../theme"
import {Layout} from "../components/layout"
import {SEO} from "../components/seo"
import {boxStyles} from "../components/box"
import { Flex, Box } from "@rebass/grid"
import { FaRegClock } from "react-icons/fa"

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
          timeToRead: number
        }
      }>
    }
  }
}

const Page = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 0;
`

const Posts = styled.div`
  margin-top: 30px;
  .post {
    ${boxStyles};
    display: flex;
    flex-direction: column;
    padding: 25px 30px;
    color: ${theme.text};
    text-decoration: none;
    height: 100%;
    transition: 0.2s all;
    > .title {
      font-size: 1rem;
      line-height: 1.4rem;
      font-weight: 600;
    }
    > .details {
      margin-top: 5px;
      font-size: 0.85rem;
    }
    > .description {
      margin-top: 5px;
      font-size: 0.9rem;
      line-height: 1.4rem;
      flex-grow: 1;
    }
    > .bottom {
      
    }
    &:hover {
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    }
  }
`

export default (props: Props) => (
  <Layout>
    <SEO title="path_of_dev: Simplifying web development">
      <link rel="canonical" href="https://pathof.dev"/>
    </SEO>
    <Page>
      <h1 className="lhp">Latest Posts</h1>
      <Posts>
        <Flex as="ul" flexWrap="wrap" alignItems="stretch" m={-3}>
          {props.data.allMarkdownRemark.edges.map(({ node }, i) => node.frontmatter.preview === "true" ? null : (
            <Box key={i} as="li" width={[1, 0.5]} p={3} flex="0 1 auto">
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
                  {` - `}
                  {Math.round(node.timeToRead * 1.4)} min read
                </p>
                <p className="description">{node.frontmatter.description}</p>
              </Link>
            </Box>
          ))}
        </Flex>
      </Posts>
    </Page>
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
                  timeToRead
              }
          }
      }
  }
`