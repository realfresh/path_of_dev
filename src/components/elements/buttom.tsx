import styled from "styled-components"
import { theme } from "../../theme"

export const Button = styled.button`
  outline: 0;
  font-size: 1rem;
  font-weight: bold;
  height: 42px;
  color: white;
  background: var(--primary-dark);
  border: 1px solid var(--primary-dark);
  border-radius: 3px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
`