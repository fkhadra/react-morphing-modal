import React from 'react';

import { classname as cx } from './classname';
import { STATE } from './hooks';

export interface ModalProps {
  state: number;
  placeholderRef: React.MutableRefObject<HTMLDivElement>;
  close: () => void;
}

const Modal: React.FC<ModalProps> = ({
  state,
  placeholderRef,
  close,
  children,
}) => {
  return (
    <div
      className={cx.get(
        cx.container,
        state === STATE.IS_IN_PROGRESS || state === STATE.IS_OPEN
      )}
    >
      <div className={cx.get(cx.body, STATE.IS_OPEN === state)}>{children}</div>
      <div className={cx.placeholder} ref={placeholderRef} />
      <div
        className={cx.get(cx.closeButton, STATE.IS_OPEN === state)}
        onClick={close}
      />
    </div>
  );
};

export { Modal };
