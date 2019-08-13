import styled from "styled-components"
import { theme } from "../theme"

export const MarkDownContent = styled.div`
  
  > div {
  
    display: flex;
    flex-direction: column;
    
    > * {
      margin-top: 25px;
      &:first-child {
        margin-top: 0;
      }
    }
    
    h2, h3, h4 {
      line-height: 1.3;
      border-left: 3px solid ${theme.primary};
      background: ${theme.gray10};
      a {
        color: ${theme.text};
        text-decoration: none;
      }
    }
    
    h2 {
      margin-top: 50px;
      margin-bottom: 10px;
      padding: 16px 16px;
    }
    
    h3, h4 {
      margin-top: 40px;
      padding: 12px 16px;
    }
    
    p {
      line-height: 1.8;
      margin-bottom: -5px;
    }
    
    p, li {
      font-size: 1rem;
      > code {
        background: rgba(47,208,35,0.15);
        padding: 3px 5px;
        font-size: 0.85rem;
      }
    }
    
    strong {
      font-weight: 600;
    }
    
    pre {}
    
    img {
      width: auto;
      // max-width: 106%;
      max-width: 100%;
      align-self: center;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }
    
    ul {
      padding: 0 0 0 25px;
      list-style: disc;
      li {
        line-height: 1.7;
        margin-bottom: 4px;
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
    
    
    table {
      width: 100%;
      overflow: auto;
      display: block;
      border-spacing: 0;
      border-collapse: collapse;
      tr {
        border-top: 1px solid #ccc;
        background-color: #fff;
        text-align: left;
      }
      tr:nth-child(2n) {
        background-color: #f8f8f8;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px 13px;
        font-size: 0.9rem;
        line-height: 1.2rem;
      }
    }
    
    .divider {
      margin: 30px 0 5px 0;
      border-bottom: 1px solid ${theme.gray30};
    }
    
  }
  
`