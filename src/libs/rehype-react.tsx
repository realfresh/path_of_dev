import React from "react"
import RehypeReact from "rehype-react"
import ImageZoom from "react-medium-image-zoom"
import { PrismTokenise } from "../components/prismTokenise"
import seoUrl from "../utilities/seo-url.js"

export const renderMarkdown = new RehypeReact({
  createElement: React.createElement,
  components: {
    h2: ({ children }) => {
      const title = children[0]
      const id = `${seoUrl(title)}`
      return <h2 id={id}><a href={`#${id}`}>{title}</a></h2>
    },
    h3: ({ children }) => {
      const title = children[0]
      const id = `${seoUrl(title)}`
      return <h3 id={id}><a href={`#${id}`}>{title}</a></h3>
    },
    h4: ({ children }) => {
      const title = children[0]
      const id = `${seoUrl(title)}`
      return <h4 id={id}><a href={`#${id}`}>{title}</a></h4>
    },
    youtube: ({ children }) => {
      return (
        <iframe
          width="100%"
          height="360"
          src={children[0]}
        />
      )
    },
    img: (props) => {
      return (
        <ImageZoom
          shouldRespectMaxDimension={true}
          image={{
            src: props.src,
            alt: props.alt || "",
          }}
        />
      )
    },
    pre: (props) => {
      const childProps = props.children[0].props
      const code = childProps.children[0]
      const language = childProps.className.split("-")[1]
      const filename = childProps["data-meta"] || undefined
      return (
        <PrismTokenise
          code={code}
          language={language}
          filename={filename}
          plugins={["line-numbers"]}
        />
      )
    },
  },
}).Compiler