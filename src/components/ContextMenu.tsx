import { SwipeableDrawer, SwipeableDrawerProps } from '@mui/material';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ContextMenuProps = { closeOnClick?: boolean } & Omit<
  SwipeableDrawerProps,
  'onOpen'
> &
  Partial<Pick<SwipeableDrawerProps, 'onOpen'>>;

const ContextMenu = (props: ContextMenuProps) => {
  return (
    <SwipeableDrawer
      disableSwipeToOpen={true}
      onOpen={() => {}}
      {...props}
      PaperProps={{
        ...props.PaperProps,
        className: twMerge(
          'divide-y rounded-2xl m-2',
          props.PaperProps?.className
        ),
        onClick: (e) =>
          props.closeOnClick !== false ? props.onClose(e) : undefined,
        style: {
          maxHeight: '85%',
          ...props.PaperProps?.style,
        },
      }}
    />
  );
};

export const ContextMenuItem = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={twMerge('px-4 py-3 text-lg', props.className)}>
      {props.children}
    </div>
  );
};

export default ContextMenu;
