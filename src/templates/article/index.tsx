import React from "react"
import styled from "styled-components"
import Disqus from "disqus-react"
import {graphql, PageRendererProps} from "gatsby"
import {SEO} from "../../components/seo"
import {Divider} from "../../components/divider"
import {MarkDownContent} from "../../components/MarkdownContent"
import {renderMarkdown} from "../../libs/rehype-react"
import {LayoutSingleColumn} from "../../components/layouts/LayoutSingleColumn"
import seoUrl from "../../utilities/seo-url.js"
import Header from "./header"
import List from "./list"

const Post = styled.article`

  max-width: var(--content-md);
  margin: 0 auto;
  
  .table-of-contents {
    margin-top: 30px;
  }
  
  .post-content {
    margin-top: 30px;
    margin-bottom: 60px;
  }
  
  .recommend-articles {
    padding-top: 52px;
    padding-bottom: 60px;
  }
  
  .disqus-comments {
    padding-top: 60px;
  }
  
`

interface Props extends PageRendererProps {
  data: {
    markdownRemark: {
      htmlAst: string
      headings: Array<{ depth: number, value: string }>
      frontmatter: {
        date: string
        path: string
        title: string
        description: string
      }
      timeToRead: number
    }
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            path: string
            title: string
            description: string
            date: string
            preview: string
          }
        }
      }>
    }
  }
}

export default class BlogPostTemplate extends React.Component<Props> {

  componentDidMount() {
    const { hash } = this.props.location
    if (hash) {
      const el = document.querySelector(hash)
      if (el && el.scrollIntoView) {
        el.scrollIntoView()
      }
    }
  }

  render() {
    const { data, location } = this.props
    const post = data.markdownRemark
    const disqusShortname = process.env.DISQUS_SHORTNAME!
    const disqusConfig: DisqusConfig = {
      url: location.href,
      identifier: post.frontmatter.path, // post.frontmatter.path.split("/blog/")[1],
      title: post.frontmatter.title,
    }
    return (
      <LayoutSingleColumn>

        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description}>
          <link rel="canonical" href={`https://pathof.dev/${post.frontmatter.path}`}/>
        </SEO>

        <Post>

          <Header
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            disqus={disqusConfig}
            timeToRead={Math.round(post.timeToRead * 1.4)}
          />

          <List
            title="Table of contents"
            className="table-of-contents"
            list={post.headings.map(({ value, depth }) => {
              const link = `#${seoUrl(value)}`
              return { depth, link, text: value, internal: false }
            })}
          />

          <MarkDownContent className="post-content">
            {renderMarkdown(post.htmlAst)}
          </MarkDownContent>

          <Divider/>

          <List
            title="Latest Posts"
            className="recommend-articles"
            list={data.allMarkdownRemark.edges.filter(({node}) => node.frontmatter.preview !== "true").map(({node}) => ({
              text: node.frontmatter.title,
              link: node.frontmatter.path,
              depth: 1,
              internal: true,
            }))}
          />

          <Divider/>

          <div className="disqus-comments">
            <Disqus.DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </div>

        </Post>

      </LayoutSingleColumn>
    )
  }

}

export const pageQuery = graphql`
  query($path: String!) {

      markdownRemark(frontmatter: { path: { eq: $path } }) {
          htmlAst
          headings {
              depth
              value
          }
          frontmatter {
              date(formatString: "MMMM DD, YYYY")
              path
              title
              description
          }
          timeToRead
      }

      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: { path: { ne: $path }, preview: { ne: "true" } }}, limit: 5) {
          edges {
              node {
                  frontmatter {
                      path
                      title
                      description
                      date(formatString: "MMMM DD, YYYY")
                      preview
                  }
              }
          }
      }
      
  }
`