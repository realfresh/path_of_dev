import React from "react"
import styled from "styled-components"
import {PageRendererProps} from "gatsby"
import {theme} from "../../../theme"
import {SEO} from "../../../components/seo"
import {LayoutSideColumn} from "../../../components/LayoutSideColumn"
import {MarkDownContent} from "../../../components/MarkdownContent"
import {ReactTagInputDemo} from "../../../components/demos/ReactTagInput"
import {FaGithub, FaNpm} from "react-icons/fa"
import PageContent from "./index.mdx"
import { Flex, Box } from "@rebass/grid"
import Disqus from "disqus-react"

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

const Page = styled.article`

  max-width: ${theme.content_md}px;
  margin: 0 auto;
  
  header {
    h1 {
      font-size: 1.8rem;
    }
    .github_npm {
      display: flex;
      @media(min-width: 40em) {
        justify-content: flex-end;
      }
      > * { 
        margin-right: 15px;
        &:last-child { margin-right: 0; }
      }
      > a {
        display: flex;
        align-items: center;
        font-size: 0.85rem;
        font-weight: 600;
        color: ${theme.text};
        text-decoration: none;
        background-color: ${theme.gray20};
        transition: 0.23s background-color;
        padding: 0.4rem 0.6rem;
        border-radius: 5px;
        svg {
          font-size: 1.2rem;
          margin-right: 0.6rem;
        }
        &:hover {
          background-color: ${theme.gray30};
        }
      }
    }
  }
  
  .markdown {
    margin-top: 30px;
    margin-bottom: 60px;
  }
    
  .comments {
    padding-top: 60px;
  }
  
  .divider {
    margin-bottom: 5px;
    border-bottom: 1px solid ${theme.gray30};
  }
  
  > * {
    margin-top: 20px;
    &:first-child { margin-top: 0 }
  }
  
`

export default (props: Props) => {
  const { location } = props
  const disqusShortname = process.env.DISQUS_SHORTNAME!
  const disqusConfig = {
    url: location.href,
    identifier: "/projects/react-tag-input", // post.frontmatter.path.split("/blog/")[1],
    title: "React Tag Input",
  }
  return (
    <LayoutSideColumn sideColumnBottom={true}>

      <SEO
        title="React Tag Input - Component"
        description="React tag input is a robust, minimal and performant input component for creating multiple tags">
        <link rel="canonical" href="https://pathof.dev/projects/react-tag-input"/>
      </SEO>

      <Page>

        <header>
          <Flex flexWrap="wrap" alignItems="center" justifyContent="space-between" m={-2}>
            <Box width={[ 1, 1/2 ]} p={2}>
              <h1 className="">React Tag Input</h1>
            </Box>
            <Box width={[ 1, 1/2 ]} p={2}>
              <div className="github_npm">
                <a href="https://github.com/path-of-dev/react-tag-input" target="_blank"><FaGithub/> GitHub</a>
                <a href="https://www.npmjs.com/package/@pathofdev/react-tag-input" target="_blank"><FaNpm/> NPM</a>
              </div>
            </Box>
          </Flex>
        </header>

        <div className="divider"/>

        <MarkDownContent className="markdown">
          <div>

            <p className="details lhp">React Tag Input is a robust, minimal and performant input field for creating multiple tags. The component has the following features.</p>

            <ul>
              <li>No dependencies</li>
              <li>Lightweight, only 2.4kb gzipped</li>
              <li>Edit existing tags directly</li>
              <li>Easy to customize theme</li>
              <li>Responsive to any screen size</li>
              <li>Support for custom validator</li>
              <li>Removes line breaks and formatting on paste</li>
              <li>HTML injection blocked</li>
              <li>Includes TypeScript definitions</li>
              <li>Uses MIT license</li>
            </ul>

            <h2>Demo</h2>

            <ReactTagInputDemo/>

            <PageContent/>

          </div>
        </MarkDownContent>

        <div className="comments">
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div>

      </Page>

    </LayoutSideColumn>
  )
}
