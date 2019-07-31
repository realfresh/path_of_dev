import React from "react"
import styled from "styled-components"
import {Link, PageRendererProps} from "gatsby"
import {theme} from "../theme"
import {SEO} from "../components/seo"
import {boxStyles} from "../components/box"

interface Props extends PageRendererProps {}

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

const Layout = styled.main`
  max-width: 680px;
  margin: 0 auto;
  padding: 60px 20px;
`

export default (props: Props) => (
  <Layout>
    <SEO title="ezAuth - The simplest authentication system for applications">
      <link rel="canonical" href="https://pathof.dev/ezauth"/>
    </SEO>
    <h1 className="lhp">Latest Posts</h1>
  </Layout>
)
