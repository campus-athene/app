import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const WidgetTitle = (props: HTMLAttributes<HTMLHeadingElement>) =>
  React.createElement('h4', {
    ...props,
    className: 'font-normal text-lg mb-1',
  });

export const WidgetBox = (props: HTMLAttributes<HTMLDivElement>) =>
  React.createElement('div', {
    ...props,
    className: twMerge('snap-start rounded-xl border', props.className),
    style: {
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
      className={twMerge(
        'no-scrollbar flex snap-x snap-mandatory scroll-p-4 gap-2 overflow-x-scroll px-3',
        props.className
      )}
    >
      {props.children}
    </div>
  </div>
);

export default Widget;
