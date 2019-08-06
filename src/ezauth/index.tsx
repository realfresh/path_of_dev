import React from "react"
import styled, { css } from "styled-components"
import {Link, PageRendererProps} from "gatsby"
import {theme} from "../theme"
import {SEO} from "../components/seo"
import {LogoGenerator} from "../components/logo"
import {Instructions} from "../components/instructions"
import {PrismMdxTokenise} from "../components/prismMdxTokenise"
import {MDXProvider} from "@mdx-js/react"
import {ezAuthInstructions} from "./instructions"

const mdxComponents = {
  pre: (props: any) => <div {...props} />,
  code: PrismMdxTokenise,
}

interface Props extends PageRendererProps {}

const content = css`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 20px;
`

const Layout = styled.main`
  h1, h2, h3, h4, h5 {
    font-family: 'Roboto Slab', serif;
  }
`

const HeaderWrapper = styled.div`
  background: #1E1E1E;
  margin-bottom: 300px;
  > .content { 
  
    ${content}; 
    
    header {
      .nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 60px 0;
        nav {
          list-style: none;
          display: flex;
          li {
            cursor: pointer;
            padding: 10px;
            a {
              color: white;
              font-weight: 400;
              font-size: 0.9rem;
            }
          }
        }
      }
      > .content {
        max-width: 740px;
        margin: 0 auto;
        color: white;
        text-align: center;
        padding: 40px 0 0 0;
        h2 {
          font-size: 1.8rem;
          font-weight: 400;
        }
        .divider {
           width: 25px;
           height: 4px;
           background: ${theme.primary};
           margin: 25px auto;
        }
        p {
          font-size: 1.2rem;
        }
      }
    }
    
    > .instructions {
      transform: translateY(100px);
    }
    
  }
`

export default class EzAuthHome extends React.Component<Props> {

  componentDidMount() {

    // HIGHLIGHT ALL CODE BLOCKS
    // Prism.highlightAll()

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
    return (
      <MDXProvider components={mdxComponents}>
        <Layout>
          <SEO title="ezAuth - The simplest authentication system for applications">
            <link rel="canonical" href="https://pathof.dev/ezauth"/>
          </SEO>
          <HeaderWrapper>
            <div className="content">
              <header>
                <div className="nav">
                  <LogoGenerator
                    name="Auth"
                    subtitle="built by path_of_dev"
                  />
                  <nav>
                    <li><a>Pricing</a></li>
                    <li><a>Login</a></li>
                    <li><a>Get Started</a></li>
                  </nav>
                </div>
                <div className="content">
                  <h2 className="lhp">Easily add authentication to your application</h2>
                  <div className="divider"/>
                  <p className="lhp">ezAuth is an API authentication system that makes adding user registeration and login to your applications a breeze. It's designed to do a few things and do them well. The focus is on simplicity and reliability.</p>
                </div>
              </header>
              <div className="instructions">
                <Instructions tabs={ezAuthInstructions}/>
              </div>
            </div>
          </HeaderWrapper>
        </Layout>
      </MDXProvider>
    )
  }

}
