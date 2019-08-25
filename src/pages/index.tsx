import React from "react"
import styled from "styled-components"
import {graphql, Link, PageRendererProps} from "gatsby"
import {LayoutSingleColumn} from "../components/layouts/LayoutSingleColumn"
import {SEO} from "../components/seo"
import {ListStyleA} from "../components/elements/ListStyleA"
import {FaGithub} from "react-icons/fa"
import {BlogPostsAll} from "../components/sections/posts"
import {Newsletter} from "../components/sections/newsletter"

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
            image: string
            icon: string
          }
          timeToRead: number
        }
      }>
    }
  }
}

const Heading = styled.section`
  h1 {
    font-size: 2rem;
    line-height: 2.8rem;
    margin-bottom: 20px;
    font-weight: 600;
  }
  p {
    font-size: 1.2rem;
    line-height: 2rem;
  }
`

const ListSection = styled.section`
  margin-top: 40px;
  h2 {
    border-bottom: 1px solid var(--border);
    padding-bottom: 15px;
    margin-bottom: 15px;
  }
`

const pageDetails = {
  title: "pathofdev: Simplifying web development",
  description: "The path of becoming a developer is hard. My goal is to simplify development with tutorials and open-source projects",
  canonical: "https://pathof.dev",
}

const openSourceProjects = [
  {
    title: "Untrusive",
    description: "Indeterminate loading bar for websites and web applications",
    url: "https://github.com/pathofdev/Untrusive",
    icon: <FaGithub/>,
  },
  {
    title: "React Tag Input",
    description: "Robust, minimal and performant input field for creating multiple tags",
    link: "/projects/react-tag-input",
    icon: <FaGithub/>,
  }
]

export default (props: Props) => (
  <LayoutSingleColumn>

    <SEO title={pageDetails.title} description={pageDetails.description}>
      <link rel="canonical" href={pageDetails.canonical}/>
    </SEO>

    <Heading>
      <h1>Simplifying Web Development</h1>
      <p>The path of modern web development is challenging. I hope to make it easier with helpful tutorials and open-source projects</p>
    </Heading>

    <ListSection>
      <h2 className="lhp">Open-source projects</h2>
      <ListStyleA>
        {openSourceProjects.map((item, i) => {
          const content = (
            <>
              <div className="image">
                {item.icon}
              </div>
              <div className="content">
                <h3 className="title">{item.title}</h3>
                <p className="details">{item.description}</p>
              </div>
            </>
          )
          return item.link ? (
            <Link key={i} to={item.link} className="item">
              {content}
            </Link>
          ) : (
            <a key={i} href={item.url} className="item">
              {content}
            </a>
          )
        })}
      </ListStyleA>
    </ListSection>

    <ListSection>
      <h2 className="lhp">Articles</h2>
      <BlogPostsAll/>
    </ListSection>

    <ListSection>
      <Newsletter/>
    </ListSection>

  </LayoutSingleColumn>
)

export const query = graphql`
    query {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 55 ) {
            ...PostQueryFragment
        }
    }
`