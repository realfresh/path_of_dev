import React from "react"
import Prism from "prismjs"

interface Props {
  language: string
  code: string
  plugins?: string[]
}

export class PrismCode extends React.Component<Props> {

  ref: React.RefObject<HTMLPreElement>

  constructor(props: Props) {
    super(props)
    this.ref = React.createRef<HTMLPreElement>()
  }

  componentDidMount() {
    this.highlight()
  }

  componentDidUpdate() {
    this.highlight()
  }

  highlight = () => {
    if (this.ref && this.ref.current) {
      Prism.highlightElement(this.ref.current)
    }
  }

  render() {
    const { code, plugins, language } = this.props
    return (
      <pre className={!plugins ? "" : plugins.join(" ")}>
        <code ref={this.ref} className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
    )
  }

}
