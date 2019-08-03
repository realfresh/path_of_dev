import React from "react"
import Prism, { } from "prismjs"
import he from "he"

interface Props {
  code: string
  language: string
  plugins?: string[]
}

export class PrismCode extends React.Component<Props> {

  ref: React.RefObject<HTMLPreElement>

  constructor(props: Props) {
    super(props)
    this.ref = React.createRef()
  }

  componentDidMount() {
    this.highlight()
  }

  componentDidUpdate() {
    this.highlight()
  }

  componentWillUnmount() {
    console.log("UNMOUNT PRISM CODE")
    if (this.ref && this.ref.current) {
      this.ref.current.remove()
    }
  }

  highlight = () => {
    if (this.ref && this.ref.current) {
      Prism.highlightElement(this.ref.current)
    }
    Prism.highlightAll()
  }

  render() {
    const { code, plugins, language } = this.props
    console.log(Prism.tokenize(code, Prism.languages.html))
    // console.log(Prism.languages.html)
    return (
      <pre
        className={!plugins ? "" : plugins.join(" ")}
        dangerouslySetInnerHTML={{
          __html: `<code class="language-${language}">${he.encode(code.trim())}</code>`
        }}
      />
    )
  }

}