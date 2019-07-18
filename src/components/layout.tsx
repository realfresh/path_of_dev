import React from "react"
import styled from "styled-components"
import { Header } from "./header"
import { Footer } from "./footer"

interface Props {
  children: React.ReactNode
}

const Content = styled.main`
  max-width: 680px;
  margin: 0 auto;
  padding: 60px 20px;
`

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header/>
      <Content>
        {children}
      </Content>
      <Footer/>
    </>
  )
}

