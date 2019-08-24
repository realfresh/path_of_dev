import React from "react"
import styled from "styled-components"
import { Header } from "../header"
import { Footer } from "../footer"
import { MDXProvider } from "../MdxProvider"

interface Props {
  children: React.ReactNode
  sideColumnBottom?: boolean
}

const Main = styled.main`
  min-height: 88vh;
  padding: 60px 20px;
  > .content {
    max-width: var(--content-md);
    margin: 0 auto;
  }
`

export const LayoutSingleColumn = ({ children, sideColumnBottom }: Props) => {
  return (
    <MDXProvider>
      <Header/>
      <Main>
        <div className="content">
          {children}
        </div>
      </Main>
      <Footer/>
    </MDXProvider>
  )
}

