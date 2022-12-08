import { Drawer, SwipeableDrawer, SwipeableDrawerProps } from '@mui/material';
import React from 'react';

type OptionalProps = 'onOpen' | 'onClose';
type CardModalProps = { canClose?: boolean } & Omit<
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
        className: ['rounded-t-3xl p-4', props.PaperProps?.className].join(' '),
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
      className={['text-lg font-semibold mb-4', props.className].join(' ')}
    >
      {props.children}
    </h1>
  );
};

export default CardModal;
