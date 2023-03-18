import React from 'react';
import { twMerge } from 'tailwind-merge';
import BaseButton from '../../components/Button';

export const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => (
  <BaseButton {...props} className={twMerge('rounded-full', props.className)} />
);

export const SecondaryButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      {...props}
      className={twMerge('text-chalk underline', props.className)}
    />
  );
};

export const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) =>
  React.createElement('input', {
    type: 'text',
    ...props,
    className: twMerge(
      'rounded-full px-4 bg-white bg-opacity-80 focus-visible:bg-opacity-100',
      props.className
    ),
  });

export const Radio = (props: {
  checked?: boolean;
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
}) => (
  <label
    className={twMerge('text-chalk inline-block', props.className)}
    style={props.style}
  >
    <div>
      <input type="radio" checked={props.checked} onChange={props.onChange} />
      <span className="text-lg" style={{ marginLeft: '0.4em' }}>
        {props.label}
      </span>
    </div>
    <div>{props.children}</div>
  </label>
);

export const Frame = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => (
  <div
    {...props}
    className={twMerge(
      'flex h-screen flex-col justify-evenly bg-theme pt-safe pb-safe',
      props.className
    )}
  />
);

export const Heading = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => (
  <h3
    {...props}
    className={twMerge('text-chalk text-center text-2xl', props.className)}
  />
);

export const Subheading = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => (
  <div
    {...props}
    className={twMerge('text-chalk text-center', props.className)}
  />
);
