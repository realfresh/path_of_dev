import React from "react"
import styled from "styled-components"
import { FaGithub } from "react-icons/fa"

const FooterComponent = styled.footer`
  background: var(--bg1);
  padding: 20px;
  .content {
    max-width: var(--content-md);
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
      color: var(--text);
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
      <div className="copyright">pathofdev © {new Date().getFullYear()}</div>
      <a className="github" href="https://github.com/realfresh/path_of_dev" target="_blank">
        <span className="text">See site code on GitHub</span>
        <FaGithub className="icon"/>
      </a>
    </div>
  </FooterComponent>
)
