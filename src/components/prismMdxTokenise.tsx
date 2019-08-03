import React from "react"
import {PrismTokenise} from "./prismTokenise"

interface Props {
  children: React.ReactNode
  className: string
}

export const PrismMdxTokenise = ({ children, className }: Props) => {
  const language = (className || "").replace(/language-/, "")
  return (
    <PrismTokenise code={children as string} language={language}/>
  )
}
