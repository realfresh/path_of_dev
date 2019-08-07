import React from "react"
import styled from "styled-components"
import { theme } from "../theme"

export const SideColumn = styled.div`

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  
  > .side {
    width: 100%;
    margin-bottom: 60px;
    max-width: 600px;
  }
  
  > .main {
    flex-grow: 1;
  }
  
  @media (min-width: ${theme.content_lg}px) {
    align-items: flex-start;
    flex-direction: row;
    > .side {
      position: sticky;
      top: 30px;
      width: 300px;
      min-width: 300px;
      margin-bottom: 0;
      margin-right: 60px;
    }
  }
  
`
