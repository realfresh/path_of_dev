import React from "react"
import {PrismCode} from "../projects/react-prism"

const codeSnippet = `
const foo = 'foo';
const bar = 'bar';
console.log(foo + bar);
`

const codeSnippet2 = `
.classass { 
  margin: 5px;
}
`
// ReactDOM.render(<Page/>, document.getElementById("root"))

// Or call the Prism.js API here
// setTimeout(() => Prism.highlightAll(), 0)

export default () => {
  const [code, setCode] = React.useState(0)
  setTimeout(() => setCode(code === 0 ? 1 : 0), 1000)
  return (
    <>
      <PrismCode
        language={code === 0 ? "js" : "css"}
        code={code === 0 ? codeSnippet : codeSnippet2}
        plugins={["line-numbers"]}
      />
    </>
  )
}