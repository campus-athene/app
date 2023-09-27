import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const WidgetTitle = (props: HTMLAttributes<HTMLHeadingElement>) =>
  React.createElement('h4', {
    ...props,
    className: twMerge('font-normal text-lg mb-1', props.className),
  });

export const WidgetBox = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={twMerge(
      'snap-start overflow-hidden rounded-xl border bg-white shadow-md',
      props.className,
    )}
  />
);

const Widget = (props: {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
  title: ReactNode;
}) => (
  <>
    <WidgetTitle onClick={props.onClick} className="mx-5">
      {props.title}
    </WidgetTitle>
    <WidgetBox style={props.style} className="mx-4 mb-4">
      {props.children}
    </WidgetBox>
  </>
);

export const ScrollWidget = (props: {
  children?: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  title: ReactNode;
}) => (
  <>
    <WidgetTitle onClick={props.onClick} className="mx-5">
      {props.title}
    </WidgetTitle>
    <div
      className={twMerge(
        'no-scrollbar flex snap-x snap-mandatory scroll-p-4 gap-2 overflow-x-scroll px-4 pb-4',
        props.className,
      )}
    >
      {props.children}
    </div>
  </>
);

export default Widget;
