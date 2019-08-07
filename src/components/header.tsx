import React from "react"
import styled from "styled-components"
import Typist from "react-typist"
import { Link } from "gatsby"
import { theme } from "../theme"
import { boxStyles } from "./box"

const HeaderComponent = styled.header`
  background: ${theme.text};
  color: white;
  padding: 20px 20px;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: ${theme.content_lg}px;
  }
  .tagline {
    color: white;
    font-size: 0.85rem;
    line-height: 1.2;
    font-weight: 600;
    @media (max-width: 420px) {
      display: none;
    }
  }
  .logo {
    text-decoration: none;
  }
  .title {
    color: white;
    font-size: 1.2rem;
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
  "Think twice before installing random packages",
  "Yes, this name was inspired by Path Of Exile",
]

export const Header = () => (
  <HeaderComponent>
    <div className="content">
      <Link to="/" className="logo">
        <h1 className="title">
          path_of_<span className="highlight">dev</span>
        </h1>
      </Link>
      <p className="tagline">Simplifying web development</p>
    </div>
  </HeaderComponent>
)
