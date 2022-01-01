import React from 'react';

const Widget = (props) =>
  React.createElement('div', {
    ...props,
    style: {
      border: '1px solid lightgray',
      borderRadius: '1em',
      marginBottom: '1em',
      padding: '1em',
      ...props.style,
    },
  });

export default Widget;
