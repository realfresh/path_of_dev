import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { FaSun, FaMoon } from "react-icons/fa"

const HeaderComponent = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--top-nav-bg);
  color: var(--top-nav-text);
  padding: 10px 20px;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: var(--content-md);
  }
  .right {
    color: white;
    font-size: 0.85rem;
    line-height: 1.2;
    font-weight: 600;
    @media (max-width: 420px) {
      display: none;
    }
    > .color-mode {
      cursor: pointer;
      padding: 10px;
      border-radius: 5px;
      font-size: 16px;
      transition: 0.23s background;
      &:hover {
        background: var(--top-nav-button-hover);
      }
    }
  }
  .logo {
    text-decoration: none;
    .title {
      color: white;
      font-size: 1.2rem;
      font-weight: 600;
      .highlight {
        color: var(--primary);
      }
    }
  }
`

function getTheme() {
  if (typeof window === "undefined") {
    return "light"
  }
  return localStorage.getItem("color-theme") ? localStorage.getItem("color-theme") : "light"
}

const baseTheme = getTheme()
function switchTheme(type: string): void {
  if (type === "dark") {
    document.documentElement.setAttribute("data-theme", "dark")
    localStorage.setItem("color-theme", "dark")
  }
  else {
    document.documentElement.setAttribute("data-theme", "light")
    localStorage.setItem("color-theme", "light")
  }
}
switchTheme(baseTheme || "light")

export const Header = () => {
  const [theme, setTheme] = React.useState(getTheme())
  return (
    <HeaderComponent>
      <div className="content">
        <Link to="/" className="logo">
          <h1 className="title">
            pathof.<span className="highlight">dev</span>
          </h1>
        </Link>
        <div className="right">
          <div
            className="color-mode"
            onClick={() => {
              const newTheme = theme === "light" ? "dark" : "light"
              setTheme(newTheme)
              switchTheme(newTheme)
            }}>
            {theme === "light" ? <FaMoon/> : <FaSun/>}
          </div>
        </div>
      </div>
    </HeaderComponent>
  )
}
