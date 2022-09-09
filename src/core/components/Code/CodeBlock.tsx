import Highlight, { defaultProps, Prism } from 'prism-react-renderer';
import { Prism as Code } from '@mantine/prism';

import type { CodeBlockProps, HighlightedCodeTextProps } from './types';

// @ts-ignore
(typeof global !== 'undefined' ? global : window).Prism = Prism;

/**
 * This imports the syntax highlighting style for the Swift language
 */
require('prismjs/components/prism-swift');
require('prismjs/components/prism-glsl');

const deleted = { color: 'red', label: '-' };
const added = { color: 'green', label: '+' };

const CodeBlock = (props: CodeBlockProps) => {
  const { codeString, language, metastring } = props;

  return (
    <Code
      language={language}
      withLineNumbers
      highlightLines={{
        3: deleted,
        4: deleted,
        5: deleted,
        7: added,
        8: added,
        9: added,
      }}
    >
      {codeString}
    </Code>
  );
};

export default CodeBlock;
