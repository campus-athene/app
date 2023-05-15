import { Drawer, SwipeableDrawer, SwipeableDrawerProps } from '@mui/material';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type OptionalProps = 'onOpen' | 'onClose';
export type CardModalProps = { canClose?: boolean } & Omit<
  SwipeableDrawerProps,
  OptionalProps
> &
  Partial<Pick<SwipeableDrawerProps, OptionalProps>>;

const CardModal = (props: CardModalProps) => {
  const As =
    props.canClose !== false && props.onClose ? SwipeableDrawer : Drawer;

  return (
    <As
      anchor="bottom"
      disableSwipeToOpen={true}
      onClose={() => {}}
      onOpen={() => {}}
      {...props}
      PaperProps={{
        ...props.PaperProps,
        className: ['rounded-3xl p-4 m-2', props.PaperProps?.className].join(
          ' '
        ),
        style: {
          maxHeight: '85%',
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
          ...props.PaperProps?.style,
        },
      }}
    />
  );
};

export const Header = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => {
  return (
    <h1
      {...props}
      className={twMerge('mb-4 text-lg font-semibold', props.className)}
    >
      {props.children}
    </h1>
  );
};

export default CardModal;
