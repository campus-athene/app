import { SwipeableDrawer, SwipeableDrawerProps } from '@mui/material';
import { HTMLAttributes } from 'react';

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
        className: [
          'divide-y rounded-2xl m-2',
          props.PaperProps?.className,
        ].join(' '),
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
    <div
      {...props}
      className={['px-4 py-3 text-lg', props.className].join(' ')}
    >
      {props.children}
    </div>
  );
};

export default ContextMenu;
