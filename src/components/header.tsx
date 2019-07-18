import React from "react"
import styled from "styled-components"
import Typist from "react-typist"
import { Link } from "gatsby"
import { theme } from "../theme"
import { boxStyles } from "./box"

const HeaderComponent = styled.header`
  .content {
    ${boxStyles};
    display: block;
    margin: 0 auto;
    max-width: 460px;
    padding: 25px 25px 23px 25px;
    text-align: center;
    color: ${theme.text};
    text-decoration: none;
  }
  .tagline {
    margin-top: 14px;
    font-weight: 600;
    font-size: 0.9rem;
    line-height: 1.2;
  }
  .title {
    font-size: 1.6rem;
    .highlight {
      color: ${theme.primary};
    }
  }
`

const tagLines = [
  "That feeling when it finally works",
  "You don't need a library for this",
  "A path with extreme highs and lows",
  "Use typescript please",
  "Why is my code not working?",
  "This just doesn't make any sense...",
  "A real love hate relationship",
  "If you just started programming, brace yourself...",
  "Don't blame the computer, it's usually your fault",
  "The night is young and full of errors :(",
  "Do I risk asking a question on Stack Overflow?",
  "Think twice before installing random packages",
  "Yes, this name was inspired by Path Of Exile",
]

export const Header = () => (
  <HeaderComponent>

    <Link to="/" className="content">

      <h1 className="title font-heading-alt">
        path_of_<span className="highlight">dev</span>
      </h1>

      <Typist
        className="tagline font-heading-alt"
        cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}
        avgTypingDelay={50}>
        {tagLines[Math.floor(Math.random() * tagLines.length)]}
      </Typist>

    </Link>

  </HeaderComponent>
)
