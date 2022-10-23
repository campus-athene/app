import { createElement } from 'react';
import sanitizeHtml from 'sanitize-html';

/**
 * Displays html content as text.
 */
const Sanitize = ({
  children,
  ...props
}: Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'children' | 'dangerouslySetInnerHTML'
> & { children: string }) =>
  createElement('div', {
    ...props,
    dangerouslySetInnerHTML: {
      __html: sanitizeHtml(children, { allowedTags: [] }),
    },
  });

export default Sanitize;
