import React from "react"
import Prism from "prismjs"
import Disqus from "disqus-react"
import RehypeReact from "rehype-react"
import ImageZoom from "react-medium-image-zoom"
import {graphql, Link, PageRendererProps} from "gatsby"
import {Layout} from "../components/layout"
import {SEO} from "../components/seo"
import {LinksList} from "../components/links-list"
import {Divider} from "../components/divider"
import {BlogPostWrapper} from "./blog-post-wrapper"

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
    }
  },
}).Compiler

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
    }
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            path: string
            title: string
            description: string
            date: string
          }
        }
      }>
    }
  }
}

export default class BlogPostTemplate extends React.Component<Props> {

  componentDidMount() {

    // HIGHLIGHT ALL CODE BLOCKS
    Prism.highlightAll()

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
      <Layout>

        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description}>
          <link rel="canonical" href={`https://pathof.dev/${post.frontmatter.path}`}/>
        </SEO>

        <BlogPostWrapper>

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
            </p>
          </header>

          <LinksList
            className="toc"
            links={(() => {
              return post.headings.map(({ value, depth }) => {
                const link = `#${seoUrl(value)}`
                return { depth, link, text: value, internal: false }
              })
            })()}
          />

          <div className="post">
            {renderMarkdown(post.htmlAst)}
          </div>

          <Divider/>

          <section className="recommend-articles">
            <p className="title">Latest Posts</p>
            <LinksList
              links={data.allMarkdownRemark.edges.map(({node}) => ({
                text: node.frontmatter.title,
                link: node.frontmatter.path,
                depth: 1,
                internal: true,
              }))}
            />
          </section>

          <Divider/>

          <section className="disqus-comments">
            <Disqus.DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </section>

        </BlogPostWrapper>

      </Layout>
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
      }

      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: { path: { ne: $path }}}, limit: 5) {
          edges {
              node {
                  frontmatter {
                      path
                      title
                      description
                      date(formatString: "MMMM DD, YYYY")
                  }
              }
          }
      }
      
  }
`