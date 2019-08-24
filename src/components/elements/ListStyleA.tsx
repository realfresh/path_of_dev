import React from "react"
import styled from "styled-components"

export const ListStyleA = styled.div`
  > .item {
    display: flex;
    align-items: center;
    padding: 18px 20px;
    margin: 0 -20px;
    color: var(--theme-text);
    text-decoration: none;
    transition: 0.2s all;
    border-radius: 5px;
    > .image {
      width: 100%;
      min-width: 50px;
      max-width: 50px;
      margin-right: 25px;
      img { 
        width: 100%;
      }
      svg {
        font-size: 50px;
      }
    }
    > .content {
      > .title {
        font-size: 1.2rem;
        line-height: 1.5rem;
        font-weight: 500;
      }
      > .details {
        font-size: 0.85rem;
      }
      > .description {
        margin-top: 5px;
        font-size: 0.9rem;
        line-height: 1.4rem;
        flex-grow: 1;
      } 
    }
    &:hover {
      background: var(--bg1);
    }
  }
`