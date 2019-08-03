
declare module "@mdx-js/react" {
  import { ComponentType, StyleHTMLAttributes } from "react"
  interface MDXProps {
    children: React.ReactNode
    components: {}
  }
  export class MDXProvider extends React.Component<MDXProps> {}
}

// types/mdx.d.ts
declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}
