import React from "react"
import styled from "styled-components"
import Disqus from "disqus-react"
import {graphql, Link, PageRendererProps} from "gatsby"
import {theme} from "../theme"
import {Layout} from "../components/layout"
import {SEO} from "../components/seo"
import {boxStyles} from "../components/box"
import { Flex, Box } from "@rebass/grid"
import { SideColumn } from "../components/SideColumn"

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
  max-width: ${theme.content_lg}px;
  margin: 0 auto;
`

const SiteInfo = styled.div`
  h2 {
    margin-top: 30px;
    margin-bottom: 16px;
    font-size: 1.1rem;
    padding: 8px 14px;
    background: ${theme.gray10};
    border-left: 2px solid ${theme.primary};
    &:first-child { margin-top: 0 }
  }
  p, ul {
    padding: 0 10px;
    font-size: 0.95rem;
    margin-top: 8px;
  }
  ul {
    list-style: none;
  }
  a {
    color: ${theme.text};
    text-decoration: none;
  }
`

const Posts = styled.div`
  margin-top: 15px;
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

      <SideColumn className="main-content">
        <SiteInfo className="side">

          <div className="section">
            <h2 className="lhp">About this site</h2>
            <p className="lhp small">
              Becoming a developer is the hardest thing I've done in my life. With my experience, I hope to simplify web development with tutorials and opens-source projects.
            </p>
          </div>

          <h2 className="lhp">Open-source projects</h2>
          <ul className="list-unordered">
            <li><a href="https://github.com/path-of-dev/Untrusive">⌛ Untrusive - indeterminate loading bar</a></li>
          </ul>

        </SiteInfo>
        <div className="main">
          <h2 className="lhp">Latest Posts</h2>
          <Posts>
            <Flex as="ul" flexWrap="wrap" alignItems="stretch" m={-2}>
              {props.data.allMarkdownRemark.edges.map(({ node }, i) => node.frontmatter.preview === "true" ? null : (
                <Box key={i} as="li" width={[1, 0.5]} p={2} flex="0 1 auto">
                  <Link className="post" to={node.frontmatter.path}>
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
                    <p className="description">{node.frontmatter.description}</p>
                  </Link>
                </Box>
              ))}
            </Flex>
          </Posts>
        </div>
      </SideColumn>

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