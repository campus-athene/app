import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

const Button = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) => {
  return (
    <button
      {...props}
      className={twMerge(
        'rounded-lg bg-accent px-4 py-2 text-base font-semibold text-black',
        props.className,
      )}
    >
      {props.children}
    </button>
  );
};

export default Button;
