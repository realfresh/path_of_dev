import React from "react"
import Prism from "prismjs"
import Disqus from "disqus-react"
import {graphql, Link, PageRendererProps} from "gatsby"
import {Layout} from "../components/layout"
import {SEO} from "../components/seo"
import {ModalImage} from "../components/modal-image"
import {LinksList} from "../components/links-list"
import {Divider} from "../components/divider"
import {BlogPostWrapper} from "./blog-post-wrapper"

const seoUrl = require("../utilities/seo-url.js")

// CAN"T REMEMBER WHY I DID THIS BUT IT WAS IMPORTANT
Prism.hooks.add("before-highlight", (env: any) => {
  env.code = env.element.innerText
})

const headingElements = ["heading2", "heading3", "heading4"]

interface Props extends PageRendererProps {
  data: {
    allPrismicBlog: {
      edges: Array<{
        node: {
          id: string
          uid: string
          data: {
            title: {
              text: string
            }
          }
        }
      }>
    }
    prismicBlog: {
      id: string
      uid: string
      first_publication_date: string
      data: {
        title: {
          text: string
        }
        content: {
          html: string
          raw: Array<{ text: string, type: string }>
        }
        description: {
          text: string
        }
      }
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
    const disqusShortname = process.env.DISQUS_SHORTNAME!
    const disqusConfig = {
      url: location.href,
      identifier: data.prismicBlog.id,
      title: data.prismicBlog.data.title.text,
    }
    return (
      <Layout>

        <SEO
          title={data.prismicBlog.data.title.text}
          description={data.prismicBlog.data.description.text}>
          <link rel="canonical" href={`https://pathof.dev/blog/${data.prismicBlog.uid}`}/>
        </SEO>

        <BlogPostWrapper>

          <header>
            <h1 className="lhp">{data.prismicBlog.data.title.text}</h1>
            <p className="details">
              Published:{` `}
              <time dateTime={data.prismicBlog.first_publication_date}>
                {new Date(data.prismicBlog.first_publication_date).toLocaleDateString()}
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
              const toc = data.prismicBlog.data.content.raw.filter(({ type }) => headingElements.indexOf(type) !== -1)
              return toc.map(({ type, text }) => {
                const depth = parseInt(type.split("heading")[1], 10)
                const link = `#${seoUrl(text)}`
                return { depth, text, link, internal: false }
              })
            })()}
          />

          <div
            className="post"
            dangerouslySetInnerHTML={{
              __html: data.prismicBlog.data.content.html
            }}
          />

          <Divider/>

          <section className="recommend-articles">
            <p className="title">Latest Posts</p>
            <LinksList
              links={data.allPrismicBlog.edges.map(({node}) => ({
                text: node.data.title.text,
                link: `/blog/${node.uid}`,
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

        <ModalImage/>

      </Layout>
    )
  }

}

export const pageQuery = graphql`
  query PostBySlug($uid: String!) {

      allPrismicBlog(sort: {fields: first_publication_date, order: DESC}, limit: 5, filter: {uid: { ne: $uid } }) {
          edges {
              node {
                  id
                  uid
                  data {
                      title {
                          text
                      }
                  }
              }
          }
      }
      
      prismicBlog(uid: { eq: $uid }) {
          id
          uid
          first_publication_date
          data {
              title {
                  text
              }
              content {
                  html
                  raw {
                      text
                      type
                  }
              }
              description {
                  text
              }
          }
      }
      
  }
`