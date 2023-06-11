import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../../components/Button';

export const Radio = (props: {
  checked?: boolean;
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
}) => (
  <label
    className={twMerge('flex items-center text-chalk', props.className)}
    style={props.style}
  >
    <input
      className="flex-shrink-0 flex-grow-0"
      type="radio"
      checked={props.checked}
      onChange={props.onChange}
    />
    <div className="ml-2">
      <div className="text-lg font-medium">{props.label}</div>
      <div>{props.children}</div>
    </div>
  </label>
);

export const Frame = (props: {
  children: ReactNode;
  noBack?: boolean;
  title?: string;
  priAction?: ReactNode;
  secAction?: ReactNode;
  onPriAction?: React.MouseEventHandler<HTMLButtonElement>;
  onSecAction?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div
      className="flex h-screen flex-col justify-center bg-theme"
      style={{
        paddingTop: 'calc(2rem + env(safe-area-inset-top))',
        paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))',
      }}
    >
      <div
        className="mx-3 flex max-w-xs flex-col self-center text-center text-chalk"
        style={{ height: '100vh', maxHeight: '32rem' }}
      >
        {props.title && <div className="text-2xl">{props.title}</div>}
        <div className="flex flex-grow flex-col justify-between">
          {props.title && <div />}
          {props.children}
          <div />
        </div>
        <div
          className="flex flex-col items-center space-y-4"
          style={{ height: '4.375rem' }}
        >
          {!!props.priAction && (
            <Button className="rounded-full" onClick={props.onPriAction}>
              {props.priAction}
            </Button>
          )}
          {!!props.secAction && (
            <button
              className="border-none bg-transparent text-xs text-chalk underline"
              onClick={props.onSecAction}
            >
              {props.secAction}
            </button>
          )}
        </div>
      </div>
      {/* Still needs to be implemented. */}
      {/* <NavButton
        type="back"
        style={{
          position: 'absolute',
          top: statusBarHeightCss,
          visibility: props.noBack ? 'hidden' : undefined,
        }}
      /> */}
    </div>
  );
};
