import React, { DetailedHTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';
import BaseButton from '../../components/Button';

export const Button = (
  props: DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) =>
  React.createElement(BaseButton, {
    ...props,
    className: twMerge('rounded-full text-white', props.className),
  });

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
  label?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <label style={{ color: 'lightgray' }}>
    <div>
      <input type="radio" checked={props.checked} onChange={props.onChange} />
      <span style={{ fontSize: '1.1em', marginLeft: '0.4em' }}>
        {props.label}
      </span>
    </div>
    <div style={{ fontSize: '0.9em' }}>{props.children}</div>
  </label>
);

export const Frame = (
  props: DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => (
  <div
    {...props}
    style={{
      height: '100vh',
      background: '#372649',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      paddingTop: 'env(safe-area-inset-bottom))',
      paddingBottom: 'env(safe-area-inset-bottom))',
    }}
  >
    {props.children}
  </div>
);

export const Heading = (
  props: DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => (
  <h3
    {...props}
    className="text-xl"
    style={{
      color: 'lightgray',
      textAlign: 'center',
    }}
  >
    {props.children}
  </h3>
);

export const Subheading = (
  props: DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => (
  <div {...props} style={{ color: 'lightgray', textAlign: 'center' }}>
    {props.children}
  </div>
);
