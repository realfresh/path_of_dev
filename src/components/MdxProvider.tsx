import React from "react"
import {PrismMdxTokenise} from "./prismMdxTokenise"
import {MDXProvider as Provider} from "@mdx-js/react"

const mdxComponents = {
  code: PrismMdxTokenise,
}

interface Props {
  children: React.ReactNode
}

export const MDXProvider = ({ children }: Props) => {
  return (
    <Provider components={mdxComponents}>
      {children}
    </Provider>
  )
}

