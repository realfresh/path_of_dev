import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { FaChevronRight } from "react-icons/fa"

export interface LinkListItem {
  depth: number
  text: string
  link: string
  internal: boolean
}

interface Props {
  className?: string
  links: LinkListItem[]
}

const Wrapper = styled.nav`
  border-radius: 5px;
  background: var(--bg2);
  padding: 20px 25px;
  margin: 0 -10px;
  ul {
    padding: 0;
    list-style: none;
  }
  li {
    cursor: pointer;
    margin-bottom: 10px;   
    a {
      text-decoration: none;
      color: var(--text);
      font-size: 0.95rem;
      line-height: 1.4;
      display: flex;
      align-items: center;
    }
    svg {
      margin-right: 10px;
      color: var(--text3)
    }
    &:last-child { 
      margin-bottom: 0 
    }
    &.depth-2 { 
      margin-left: 0;
    }
    &.depth-3 { 
      margin-left: 15px;
      a {
        text-decoration: none;
        font-size: 0.9rem; 
      }
    }
    &.depth-4 { margin-left: 30px; }
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
                {internal && <Link to={link}><FaChevronRight/> {text}</Link>}
                {!internal && <a href={link}><FaChevronRight/> {text}</a>}
              </li>
            )
          })}
        </ul>
      </Wrapper>
    )

  }

}