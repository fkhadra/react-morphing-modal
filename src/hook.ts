import { useRef, useState } from 'react';
import { getNodePostion, getScaleValues, getBackgroundFromStyle, bodyScrolling } from './utils';

export interface ModalOptions {
  background?: string;
}

export const STATE = {
  IS_CLOSE: 0,
  IS_IN_PROGRESS: 1 << 1,
  IS_OPEN: 1 << 2
};

export function useModal(options: ModalOptions = {}) {
  const triggerRef = useRef<HTMLElement>();
  const placeholderRef = useRef<HTMLElement>();
  const [status, setState] = useState(STATE.IS_CLOSE);

  function handleEscapeKey(e: KeyboardEvent) {
    if (e.keyCode === 27) close();
  }

  function open() {
    if (placeholderRef.current && triggerRef.current) {
      const placeholder = placeholderRef.current;
      const trigger = triggerRef.current;
      const triggerStyles = window.getComputedStyle(trigger);
      const placeholderPosition = getNodePostion(trigger);
      const background =  options.background || getBackgroundFromStyle(triggerStyles);
      
      bodyScrolling.lock();
      document.addEventListener('keyup', handleEscapeKey, { once: true });

      placeholder.style.cssText += `width: ${trigger.offsetWidth}px; height: ${
        trigger.offsetHeight
      }px; background: ${background};`;

      setState(STATE.IS_IN_PROGRESS);

      const placeholderScale = getScaleValues(
        placeholder,
        placeholderPosition
      );

      placeholderRef.current.style.cssText += `top: ${
        placeholderPosition.top
      }px; left: ${placeholderPosition.left}px; transform: scale(${
        placeholderScale.scaleX
      },${placeholderScale.scaleY});`;

      placeholder.addEventListener(
        'transitionend',
        () => {
          setState(STATE.IS_OPEN);
        },
        { once: true }
      );
    }
  }

  function close() {
    if (placeholderRef.current) {
      const placeholder = placeholderRef.current;
      setState(STATE.IS_IN_PROGRESS);

      bodyScrolling.unlock();
      placeholder.style.removeProperty('transform');
      placeholder.style.transform = 'scale(1,1);';

      placeholder.addEventListener(
        'transitionend',
        () => {
          setState(STATE.IS_CLOSE);
        },
        { once: true }
      );
    }
  }

  return {
    triggerRef,
    open,
    close,
    modalProps: {
      placeholderRef,
      status,
      close
    }
  };
}
