import React from "react"
import styled from "styled-components"
import { boxStyles } from "./box"
import { FaGithub } from "react-icons/fa"
import { theme } from "../theme"

const FooterComponent = styled.footer`
  background: ${theme.gray10};
  padding: 20px;
  .content {
    max-width: ${theme.content_lg}px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    .copyright {
      
    }
    .github {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: ${theme.text};
      .icon { 
        font-size: 1.2rem;
        
      }
      .text { 
        margin-right: 8px;
      }
    }
  } 
`

export const Footer = () => (
  <FooterComponent>
    <div className="content">
      <div className="copyright">path_of_dev © {new Date().getFullYear()}</div>
      <a className="github" href="https://github.com/realfresh/path_of_dev" target="_blank">
        <span className="text">See site code on GitHub</span>
        <FaGithub className="icon"/>
      </a>
    </div>
  </FooterComponent>
)
