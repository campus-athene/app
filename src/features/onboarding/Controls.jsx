import React from 'react';
import { twMerge } from 'tailwind-merge';
import BaseButton from '../../components/Button';

export const Button = (props) =>
  React.createElement(BaseButton, {
    ...props,
    className: twMerge('rounded-full text-white', props.className),
  });

export const Input = (props) =>
  React.createElement('input', {
    type: 'text',
    ...props,
    className: twMerge(
      'rounded-full px-4 bg-white bg-opacity-80 focus-visible:bg-opacity-100',
      props.className
    ),
  });

export const Radio = ({ children, checked, label, onChange }) => (
  <label style={{ color: 'lightgray' }}>
    <div>
      <input type="radio" checked={checked} onChange={onChange} />
      <span style={{ fontSize: '1.1em', marginLeft: '0.4em' }}>{label}</span>
    </div>
    <div style={{ fontSize: '0.9em' }}>{children}</div>
  </label>
);

export const Frame = ({ children }) => (
  <div
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
    {children}
  </div>
);

export const Heading = ({ children }) => (
  <h3
    className="text-xl"
    style={{
      color: 'lightgray',
      textAlign: 'center',
    }}
  >
    {children}
  </h3>
);

export const Subheading = ({ children }) => (
  <div style={{ color: 'lightgray', textAlign: 'center' }}>{children}</div>
);
