import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

const Button = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      {...props}
      className={[
        'bg-amber-500 text-white font-semibold text-base rounded-lg px-4 py-2',
        props.className,
      ].join(' ')}
    >
      {props.children}
    </button>
  );
};

export default Button;
