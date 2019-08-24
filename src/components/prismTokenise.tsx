import React from "react"
import Prism from "prismjs"
import styled from "styled-components"
import Highlight, { PrismTheme } from "prism-react-renderer"

const colors = {
  char: "#D8DEE9",
  comment: "#999999",
  keyword: "#c5a5c5",
  primitive: "#5a9bcf",
  string: "#8dc891",
  variable: "#d7deea",
  boolean: "#ff8b50",
  punctuation: "#5FB3B3",
  tag: "#fc929e",
  function: "#79b6f2",
  className: "#FAC863",
  method: "#6699CC",
  operator: "#fc929e",
}

const prismTheme: PrismTheme = {
  plain: {
    backgroundColor: "#242424",
    color: "#ffffff",
  },
  styles: [
    {
      types: ["attr-name"],
      style: {
        color: colors.keyword,
      },
    },
    {
      types: ["attr-value"],
      style: {
        color: colors.string,
      },
    },
    {
      types: ["comment", "block-comment", "prolog", "doctype", "cdata"],
      style: {
        color: colors.comment,
      },
    },
    {
      types: [
        "property",
        "number",
        "function-name",
        "constant",
        "symbol",
        "deleted",
      ],
      style: {
        color: colors.primitive,
      },
    },
    {
      types: ["boolean"],
      style: {
        color: colors.boolean,
      },
    },
    {
      types: ["tag"],
      style: {
        color: colors.tag,
      },
    },
    {
      types: ["string"],
      style: {
        color: colors.string,
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: colors.string,
      },
    },
    {
      types: ["selector", "char", "builtin", "inserted"],
      style: {
        color: colors.char,
      },
    },
    {
      types: ["function"],
      style: {
        color: colors.function,
      },
    },
    {
      types: ["operator", "entity", "url", "variable"],
      style: {
        color: colors.variable,
      },
    },
    {
      types: ["keyword"],
      style: {
        color: colors.keyword,
      },
    },
    {
      types: ["at-rule", "class-name"],
      style: {
        color: colors.className,
      },
    },
    {
      types: ["important"],
      style: {
        fontWeight: "400",
      },
    },
    {
      types: ["bold"],
      style: {
        fontWeight: "bold",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
  ],
}

interface Props {
  code: string
  language: string
  filename?: string
  plugins?: string[]
}

const LanguageBar = styled.div`
  background: rgb(50,50,50);
  color: #e5e5e5;
  font-size: 0.85rem;
  font-weight: bold;
  transform: translateY(3px);
  border-radius: 0.3rem 0.3rem 0 0;
  padding: 8px 10px;
  font-family: sans-serif;
  line-height: 1;
  display: flex;
  justify-content: space-between;
`

export const PrismTokenise = (props: Props) => {
  const { code, filename, language } = props
  const noLng = filename === "no-lng"
  return (
    <div>
      {!noLng && (
        <LanguageBar>
          <span className="language">{language.toUpperCase()}</span>
          {(filename) && <span>{filename}</span>}
        </LanguageBar>
      )}
      <Highlight Prism={Prism as any} code={code.trim()} language={language as any} theme={prismTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
        </pre>
        )}
      </Highlight>
    </div>
  )
}
