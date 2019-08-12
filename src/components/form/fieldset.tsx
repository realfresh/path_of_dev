import styled from "styled-components"
import { theme } from "../../theme"

export const Fieldset = styled.fieldset<{ horizontal?: boolean; }>`
  display: flex;
  flex-direction: ${({ horizontal }) => horizontal ? "row" : "column"};
  align-items: ${({ horizontal }) => horizontal ? "center" : "flex-start"};
  > * {
    margin-right: ${({ horizontal }) => horizontal ? "15" : "0"}px;
    margin-bottom: ${({ horizontal }) => horizontal ? "0" : "15"}px;
    &:last-child {
      margin-right: 0;  
      margin-bottom: 0; 
    }
  }
`