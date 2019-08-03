import React from "react"
import Prism from "prismjs"
import styled from "styled-components"
import Highlight from "prism-react-renderer"
import prismTheme from "prism-react-renderer/themes/vsDark"


interface Props {
  code: string
  language: string
  plugins?: string[]
}

const LanguageBar = styled.div`
  background: rgb(50,50,50);
  color: #e5e5e5;
  font-size: 0.75rem;
  font-weight: bold;
  transform: translateY(3px);
  border-radius: 0.3rem 0.3rem 0 0;
  padding: 7px 10px;
  text-align: right;
  font-family: sans-serif;
  line-height: 1;
`

export const PrismTokenise = (props: Props) => {
  const { code, plugins, language } = props
  return (
    <div>
      <LanguageBar>
        {language.toUpperCase()}
      </LanguageBar>
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
