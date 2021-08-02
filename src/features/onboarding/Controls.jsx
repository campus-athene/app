import React from 'react';
import { Button as BSButton } from 'react-bootstrap';

export const Button = (props) =>
  React.createElement(BSButton, {
    variant: 'warning',
    ...props,
    style: { margin: '0 auto', borderRadius: '2em', ...props.style },
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
    style={{
      fontWeight: 'normal',
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
