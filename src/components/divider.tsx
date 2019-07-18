import React from "react"
import styled from "styled-components"
import {theme} from "../theme"

const Wrapper = styled.span`
  display: flex;
  justify-content: center;
  > span {
    background: ${theme.text};
    width: 8px;
    height: 8px;
    margin: 0 5px;
  }
`

export const Divider = () => (
  <Wrapper>
    <span/>
    <span/>
    <span/>
  </Wrapper>
)