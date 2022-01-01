import React from 'react';

const Widget = (props) =>
  React.createElement('div', {
    ...props,
    style: {
      border: '1px solid lightgray',
      borderRadius: '1em',
      margin: '0 1em 1em 1em',
      padding: '1em',
      ...props.style,
    },
  });

export default Widget;
