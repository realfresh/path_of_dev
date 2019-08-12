import styled from "styled-components"
import { theme } from "../../theme"

export const Input = styled.input`
  outline: 0;
  font-size: 1rem;
  line-height: normal;
  height: 38px;
  background: white;
  border: 1px solid ${theme.gray30};
  border-radius: 3px;
  padding: 0.3rem 0.8rem;
  width: 100%;
`