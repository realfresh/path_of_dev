import React from "react"
import styled from "styled-components"
import { theme } from "../theme"

export const SideColumn = styled.div<{ columnBottom?: boolean }>`

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  
  > .side {
    order: ${({columnBottom}) => columnBottom ? 2 : 0};
    width: 100%;
    margin-bottom: ${({columnBottom}) => columnBottom ? 0 : 60}px;
    margin-top: ${({columnBottom}) => columnBottom ? 60 : 0}px;
    max-width: 600px;
  }
  
  > .main {
    flex-grow: 1;
    max-width: 100%;
    width: 100%;
  }
  
  @media (min-width: ${theme.content_lg}px) {
    align-items: flex-start;
    flex-direction: row;
    > .side {
      order: 2;
      position: sticky;
      top: 90px;
      width: 300px;
      min-width: 300px;
      margin-top: 0;
      margin-bottom: 0;
      margin-left: 60px;
    }
  }
  
`
