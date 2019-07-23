import styled from "styled-components"
import { boxStyles } from "../components/box"
import { theme } from "../theme"

export const BlogPostWrapper = styled.article`

  header {
    .details {
      font-size: 0.9rem;
      margin-top: 5px;
    }
  }
  
  .toc {
    margin-top: 30px;
  }
  
  .post > div {
  
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    padding-bottom: 60px;
    
    > * {
      margin-top: 20px;
      &:first-child {
        margin-top: 0;
      }
    }
    
    h2 {
      margin-top: 50px;
      margin-bottom: 10px;
    }
    
    h3, h4 {
      margin-top: 40px;
    }
    
    h2, h3, h4 {
      ${boxStyles};
      line-height: 1.3;
      padding: 10px 24px;
      border-left: 4px solid ${theme.primary};
      align-self: center;
      min-width: 109%;
      a {
        color: ${theme.text};
        text-decoration: none;
      }
    }
    
    p {
      line-height: 1.6;
    }
    
    strong {
      font-weight: 600;
    }
    
    pre {}
    
    img {
      width: auto;
      max-width: 106%;
      align-self: center;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }
    
    ul {
      padding: 0 15px;
      list-style: disc;
      li {
        line-height: 1.4;
        margin-bottom: 8px;
        &:last-child { 
          margin-bottom: 0 
        }
      }
    }
    
    .embed {
      iframe {
        width: 100%;
      }
    }
    
  }
  
  .recommend-articles {
    padding-top: 52px;
    padding-bottom: 60px;
    .title {
      font-size: 1.2rem;
      font-weight: 600;
      line-height: 1;
      margin-bottom: 15px;
    }
  }
  
  .disqus-comments {
    padding-top: 60px;
  }
  
`