import styled from "styled-components"
import { theme } from "../../theme"

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  > * {
    border-bottom: 1px dashed ${theme.gray30};
    padding-bottom: 15px;
    margin-bottom: 15px;
    &:last-child {
      border-bottom: none;
      padding-bottom: 0; 
      margin-bottom: 0; 
    }
  }
`