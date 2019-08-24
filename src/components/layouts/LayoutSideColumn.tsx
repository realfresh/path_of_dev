import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { Header } from "../header"
import { Footer } from "../footer"
import { theme } from "../../theme"
import { SideColumn } from "../SideColumn"
import { MDXProvider } from "../MdxProvider"

interface Props {
  children: React.ReactNode
  sideColumnBottom?: boolean
}

const Content = styled.div`
  min-height: 88vh;
  padding: 60px 20px;
  > .content {
    max-width: ${theme.content_lg}px;
    margin: 0 auto;
  }
`

const SiteInfo = styled.aside`
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
    .icon {
      display: inline-block;
      width: 22px;
      text-align: center;
    }
  }
  a {
    color: ${theme.text};
    text-decoration: none;
  }
`

export const LayoutSideColumn = ({ children, sideColumnBottom }: Props) => {
  return (
    <MDXProvider>
      <Header/>
      <Content>
        <div className="content">
          <SideColumn columnBottom={sideColumnBottom}>
            <SiteInfo className="side">
              <h2 className="lhp">About this site</h2>
              <p className="lhp small">
                The path to becoming a proficient developer is hard. The aim of this website is to simplify web development with tutorials and open-source projects.
              </p>
              <h2 className="lhp">Open-source projects</h2>
              <ul className="list-unordered">
                <li><a href="https://github.com/path-of-dev/Untrusive"><span className="icon">⌛</span> Untrusive - indeterminate loading bar</a></li>
                <li><Link to="/projects/react-tag-input"><span className="icon">🏷</span> React Tag Input - editable tag creator</Link></li>
              </ul>
            </SiteInfo>
            <main className="main">
              {children}
            </main>
          </SideColumn>
        </div>
      </Content>
      <Footer/>
    </MDXProvider>
  )
}

