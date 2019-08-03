import React from "react"
import styled from "styled-components"
import { theme } from "../theme"

const Wrapper = styled.div`
  color: white;
`

const Logo = styled.h1`
  font-weight: 600;
  display: flex;
  align-items: center;
  span {
    &:first-child {
      background: ${theme.primary};
      font-size: 1.1rem;
      margin-right: 8px;
      margin-top: 5px;
      padding: 0 4px 2px 4px;
    }
     &:last-child {
      font-size: 2.6rem;
    }
  }
`
const Subtitle = styled.span`
  display: block;
  font-size: 0.8rem;
  padding-left: 2.2rem;
  margin-top: 5px;
`

interface Props {
  name: string
  subtitle?: string
}

export const LogoGenerator = (props: Props) => {
  return (
    <Wrapper>
      <Logo>
        <span>ez</span>
        <span>{props.name}</span>
      </Logo>
      {props.subtitle && <Subtitle>{props.subtitle}</Subtitle>}
    </Wrapper>
  )
}