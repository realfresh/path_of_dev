import React from "react"
import styled from "styled-components"
import { LinksList, LinkListItem } from "../../components/links-list"

interface Props {
  title: string
  list: LinkListItem[]
  className?: string
}

const Element = styled.div`
  margin-top: 30px;
  .title {
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 15px;
  }
`

export default ({ title, list, className }: Props) => (
  <Element className={className}>
    <p className="title">{title}</p>
    <LinksList links={list}/>
  </Element>
)