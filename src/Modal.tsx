import React from 'react';

import { classname as cx } from './classname';
import { STATE } from './hooks';

export interface ModalProps {
  state: number;
  placeholderRef: React.MutableRefObject<HTMLDivElement>;
  close: () => void;
  closeButton?: boolean;
  padding: boolean;
}

const Modal: React.FC<ModalProps> = ({
  state,
  placeholderRef,
  close,
  closeButton,
  children,
  padding,
}) => {
  const bodyPadding = !padding ? ` ${cx.body + cx.noPadding}` : '';
  return (
    <div
      className={cx.get(
        cx.container,
        state === STATE.IS_IN_PROGRESS || state === STATE.IS_OPEN
      )}
    >
      <div className={cx.get(cx.body, STATE.IS_OPEN === state) + bodyPadding}>
        {children}
      </div>
      <div className={cx.placeholder} ref={placeholderRef} />
      {closeButton && (
        <div
          className={cx.get(cx.closeButton, STATE.IS_OPEN === state)}
          onClick={close}
        />
      )}
    </div>
  );
};

Modal.defaultProps = {
  closeButton: true,
  padding: true,
};

export { Modal };
