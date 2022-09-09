import { Language } from 'prism-react-renderer';
import { JSXElementConstructor, ReactElement } from 'react';

import type { PrePropsType } from './types';

export const preToCodeBlock = (preProps: PrePropsType) => {
  const children = preProps.children as
    | ReactElement<any, string | JSXElementConstructor<any>>
    | undefined;

  if (children && children.props) {
    const { children: codeString, className = '', ...props } = children.props;

    const matches = className.match(/language-(?<lang>.*)/);

    return {
      className,
      codeString: codeString.trim(),
      language:
        matches && matches.groups && matches.groups.lang
          ? (matches.groups.lang as Language)
          : ('' as Language),
      ...props
    };
  }
};
