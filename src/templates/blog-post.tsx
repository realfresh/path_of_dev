import React from "react"
import Prism from "prismjs"
import Disqus from "disqus-react"
import RehypeReact from "rehype-react"
import ImageZoom from "react-medium-image-zoom"
import {graphql, Link, PageRendererProps} from "gatsby"
import {LayoutSideColumn} from "../components/LayoutSideColumn"
import {SEO} from "../components/seo"
import {LinksList} from "../components/links-list"
import {Divider} from "../components/divider"
import {MarkDownContent} from "../components/MarkdownContent"
import styled from "styled-components"
import { PrismTokenise } from "../components/prismTokenise"
import { theme } from "../theme"

const seoUrl = require("../utilities/seo-url.js")

// CAN"T REMEMBER WHY I DID THIS BUT IT WAS IMPORTANT
Prism.hooks.add("before-highlight", (env: any) => {
  env.code = env.element.innerText
})

const renderMarkdown = new RehypeReact({
  createElement: React.createElement,
  components: {
    h2: ({ children }) => {
      const title = children[0]
      const id = `${seoUrl(title)}`
      return <h2 id={id}><a href={`#${id}`}>{title}</a></h2>
    },
    h3: ({ children }) => {
      const title = children[0]
      const id = `${seoUrl(title)}`
      return <h3 id={id}><a href={`#${id}`}>{title}</a></h3>
    },
    h4: ({ children }) => {
      const title = children[0]
      const id = `${seoUrl(title)}`
      return <h4 id={id}><a href={`#${id}`}>{title}</a></h4>
    },
    youtube: ({ children }) => {
      return (
        <iframe
          width="100%"
          height="360"
          src={children[0]}
        />
      )
    },
    img: (props) => {
      return (
        <ImageZoom
          shouldRespectMaxDimension={true}
          image={{
            src: props.src,
            alt: props.alt || "",
          }}
        />
      )
    },
    pre: (props) => {
      const childProps = props.children[0].props
      const code = childProps.children[0]
      const language = childProps.className.split("-")[1]
      const filename = childProps["data-meta"] || undefined
      console.log(childProps)
      return (
        <PrismTokenise
          code={code}
          language={language}
          filename={filename}
          plugins={["line-numbers"]}
        />
      )
    },
  },
}).Compiler

const Post = styled.article`

  max-width: ${theme.content_md}px;
  margin: 0 auto;
  
  header {
    .details {
      font-size: 0.9rem;
      margin-top: 5px;
    }
  }
  
  .toc {
    margin-top: 30px;
    .title {
      font-size: 0.9rem;
      font-weight: 600;
      line-height: 1;
      margin-bottom: 10px;
    }
  }
  
  .post-content {
    margin-top: 30px;
    margin-bottom: 60px;
  }
  
  .recommend-articles {
    padding-top: 52px;
    padding-bottom: 60px;
    .title {
      font-size: 1.2rem;
      font-weight: 600;
      line-height: 1;
      margin-bottom: 15px;
    }
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

    // SCROLL TO HASH HEADING IN URL
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
    const disqusConfig = {
      url: location.href,
      identifier: post.frontmatter.path, // post.frontmatter.path.split("/blog/")[1],
      title: post.frontmatter.title,
    }
    return (
      <LayoutSideColumn sideColumnBottom={true}>

        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description}>
          <link rel="canonical" href={`https://pathof.dev/${post.frontmatter.path}`}/>
        </SEO>

        <Post>

          <header>
            <h1 className="lhp">{post.frontmatter.title}</h1>
            <p className="details">
              Published:{` `}
              <time dateTime={post.frontmatter.date}>
                {post.frontmatter.date}
              </time>
              {` - `}
              <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
                0 Comments
              </Disqus.CommentCount>
              {` - `}
              {Math.round(post.timeToRead * 1.4)} min read
            </p>
          </header>

          {post.headings.length > 0 && (
            <div className="toc">
              <p className="title">Contents</p>
              <LinksList
                links={(() => {
                  return post.headings.map(({ value, depth }) => {
                    const link = `#${seoUrl(value)}`
                    return { depth, link, text: value, internal: false }
                  })
                })()}
              />
            </div>
          )}

          <MarkDownContent className="post-content">
            {renderMarkdown(post.htmlAst)}
          </MarkDownContent>

          <Divider/>

          <div className="recommend-articles">
            <p className="title">Latest Posts</p>
            <LinksList
              links={data.allMarkdownRemark.edges.filter(({node}) => node.frontmatter.preview !== "true").map(({node}) => ({
                text: node.frontmatter.title,
                link: node.frontmatter.path,
                depth: 1,
                internal: true,
              }))}
            />
          </div>

          <Divider/>

          <div className="disqus-comments">
            <Disqus.DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </div>

        </Post>

      </LayoutSideColumn>
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