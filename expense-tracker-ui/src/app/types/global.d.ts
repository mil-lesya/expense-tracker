declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.webp'
declare module '*.ttf'

declare module '*.svg' {
  import React from 'react'
  const SVG: React.VFC<React.SVGProps<SVGElement>>
  export default SVG
}
