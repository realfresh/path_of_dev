import React from "react"
import styled from "styled-components"
import { boxStyles } from "./box"
import { FaGithub } from "react-icons/fa"
import { theme } from "../theme"

const FooterComponent = styled.footer`
  max-width: 680px;
  margin: 0 auto;
  padding: 0 20px;
  .content {
    ${boxStyles};
    padding: 20px; 
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
      <a className="github" href="https://github.com" target="_blank">
        <span className="text">See site code on GitHub</span>
        <FaGithub className="icon"/>
      </a>
    </div>
  </FooterComponent>
)
