import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export const WidgetTitle = (props: HTMLAttributes<HTMLHeadingElement>) =>
  React.createElement('h4', {
    ...props,
    className: 'font-normal text-lg mb-1',
    style: {
      ...props.style,
    },
  });

export const WidgetBox = (props: HTMLAttributes<HTMLDivElement>) =>
  React.createElement('div', {
    ...props,
    className: ['snap-start', props.className].join(' '),
    style: {
      border: '1px solid lightgray',
      borderRadius: '1rem',
      // Fix Safari not cropping in rounded corners
      WebkitMaskImage: '-webkit-radial-gradient(white, black)',
      ...props.style,
    },
  });

const Widget = (props: {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
  title: ReactNode;
}) => (
  <div
    style={{ marginBottom: '1rem', paddingLeft: '1rem', paddingRight: '1rem' }}
  >
    <WidgetTitle onClick={props.onClick}>{props.title}</WidgetTitle>
    <WidgetBox style={props.style}>{props.children}</WidgetBox>
  </div>
);

export const ScrollWidget = (props: {
  children?: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  title: ReactNode;
}) => (
  <div style={{ marginBottom: '1rem' }}>
    <WidgetTitle
      onClick={props.onClick}
      style={{ marginLeft: '1rem', marginRight: '1rem' }}
    >
      {props.title}
    </WidgetTitle>
    <div
      className={[
        'flex gap-2 no-scrollbar overflow-x-scroll px-3 scroll-p-4 snap-mandatory snap-x',
        props.className,
      ].join(' ')}
    >
      {props.children}
    </div>
  </div>
);

export default Widget;
