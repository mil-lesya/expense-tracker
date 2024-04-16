declare module '*.scss' {
  type IClassNames = Record<string, string>;
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.webp'
declare module '*.ttf'

declare module '*.svg' {
  import React from 'react';
  const SVG: React.VFC<React.SVGProps<SVGElement>>;
  export default SVG;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __IS_DEV__: boolean;
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __API__: string;
