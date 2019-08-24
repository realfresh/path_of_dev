import React from "react"
import styled from "styled-components"
import Disqus from "disqus-react"

interface Props {
  title: string
  date: string
  disqus: DisqusConfig
  timeToRead: number
}

const disqusShortname = process.env.DISQUS_SHORTNAME!

const Header = styled.header`
  .details {
    font-size: 0.9rem;
    margin-top: 5px;
  }
`

export default ({ title, date, disqus, timeToRead }: Props) => (
  <Header>
    <h1 className="lhp">{title}</h1>
    <p className="details">
      Published:{` `}
      <time dateTime={date}>{date}</time>
      {` - `}
      <Disqus.CommentCount shortname={disqusShortname} config={disqus}>
        0 Comments
      </Disqus.CommentCount>
      {` - `}
      {timeToRead} min read
    </p>
  </Header>
)