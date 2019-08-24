import React from "react"
import styled from "styled-components"

const Wrapper = styled.span`
  display: flex;
  justify-content: center;
  > span {
    background: var(--text);
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