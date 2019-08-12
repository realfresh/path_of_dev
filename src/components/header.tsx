import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { theme } from "../theme"

const HeaderComponent = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
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

export const Header = () => (
  <HeaderComponent>
    <div className="content">
      <Link to="/" className="logo">
        <h1 className="title">
          pathof.<span className="highlight">dev</span>
        </h1>
      </Link>
      <p className="tagline">Simplifying web development</p>
    </div>
  </HeaderComponent>
)
