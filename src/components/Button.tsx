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
        'rounded-lg bg-amber-500 px-4 py-2 text-base font-semibold text-white',
        props.className,
      ].join(' ')}
    >
      {props.children}
    </button>
  );
};

export default Button;
