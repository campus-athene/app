import { createElement, ReactHTML } from 'react';
import sanitizeHtml, { IOptions } from 'sanitize-html';

/**
 * Displays html content as text.
 */
const Sanitize = ({
  children,
  as,
  options,
  ...props
}: Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
  'children' | 'as' | 'options' | 'dangerouslySetInnerHTML'
> & {
  children: string;
  as?: keyof ReactHTML;
  options?: IOptions;
}) =>
  createElement(as || 'div', {
    ...props,
    dangerouslySetInnerHTML: {
      __html: sanitizeHtml(children, options || { allowedTags: [] }),
    },
  });

export default Sanitize;
