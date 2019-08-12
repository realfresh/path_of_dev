import styled from "styled-components"
import { theme } from "../../theme"

export const Label = styled.label<{ horizontal?: boolean; textWidth?: string; bold?: boolean }>`
  display: flex;
  flex-direction: ${({ horizontal }) => horizontal ? "row" : "column"};
  align-items: ${({ horizontal }) => horizontal ? "center" : "flex-start"};
  > span {
    font-size: 0.85rem;
    line-height: 1.2rem;
    font-weight: ${({bold}) => bold ? 600 : 400};
    width: ${({ textWidth }) => textWidth || "auto"};
    min-width: ${({ textWidth }) => textWidth || "auto"};
  }
  > input, .input { 
    margin-left: ${({ horizontal }) => horizontal ? 15 : 0}px;
    margin-top: ${({ horizontal }) => horizontal ? 0 : 7}px;
  }
`