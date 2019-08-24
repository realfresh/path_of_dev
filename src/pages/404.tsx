import React from "react"
import styled from "styled-components"
import {LayoutSideColumn} from "../components/layouts/LayoutSideColumn"
import {SEO} from "../components/seo"

const Content = styled.div`
  h1 {
    margin-bottom: 10px;
  }
`

export default () => (
  <LayoutSideColumn>
    <SEO title="404: Not found" description=""/>
    <Content>
      <h1 className="lhp">404 - NOT FOUND</h1>
      <p className="lhp">You just hit a route that doesn&#39;t exist... the sadness</p>
    </Content>
  </LayoutSideColumn>
)

