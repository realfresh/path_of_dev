import React from "react"
import styled from "styled-components"
import { theme } from "../theme"
import { Link } from "gatsby"
import { boxStyles } from "./box"

interface Props {
  className?: string
  links: Array<{ depth: number, text: string, link: string, internal: boolean }>
}

const Wrapper = styled.nav`
  ${boxStyles};
  padding: 20px 25px;
  .title {
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1;
  }
  ul {
    padding: 0 15px;
    list-style: disc;
  }
  li {
    cursor: pointer;
    margin-bottom: 8px;   
    a {
      text-decoration: underline;
      color: ${theme.primary};
      font-size: 0.9rem;
      line-height: 1.4;
    }
    &:last-child { 
      margin-bottom: 0 
    }
    &.depth-2 { margin-left: 0; }
    &.depth-3 { margin-left: 10px; }
    &.depth-4 { margin-left: 20px; }
  }
`

export class LinksList extends React.Component<Props> {

  render() {
    const { links, className } = this.props
    if (links.length === 0)
      return null
    return (
      <Wrapper className={className}>
        <ul>
          {links.map(({ depth, text, internal, link }, i) => {
            return (
              <li key={i} className={`depth-${depth}`}>
                {internal && <Link to={link}>{text}</Link>}
                {!internal && <a href={link}>{text}</a>}
              </li>
            )
          })}
        </ul>
      </Wrapper>
    )

  }

}