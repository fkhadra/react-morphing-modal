import { useRef, useState, DOMAttributes } from 'react';
import {
  getNodePostion,
  getScaleValues,
  getBackgroundFromDOM,
  bodyScrolling,
} from './utils';

export interface ModalOptions {
  background?: string;
  event?: keyof DOMAttributes<HTMLElement>;
}

export type StateValues = 0 | 1 | 2;

type ModalState = Record<
  'IS_CLOSE' | 'IS_IN_PROGRESS' | 'IS_OPEN',
  StateValues
>;

export const STATE: ModalState = {
  IS_CLOSE: 0,
  IS_IN_PROGRESS: 1,
  IS_OPEN: 2,
};

export function useModal(options: ModalOptions = {}) {
  const triggerRef = useRef<any>();
  const placeholderRef = useRef<HTMLDivElement>();
  const [activeModal, setActiveModal] = useState(null);
  const [state, setState] = useState<StateValues>(STATE.IS_CLOSE);
  const event = options.event || 'onClick';

  function handleEscapeKey(e: KeyboardEvent) {
    if (e.keyCode === 27) close();
  }

  function open(ref?: typeof triggerRef, id?: any) {
    const activeRef = ref || triggerRef;
    if (placeholderRef.current && activeRef.current) {
      const placeholder = placeholderRef.current;
      const trigger = activeRef.current;
      const triggerStyles = window.getComputedStyle(trigger);
      const placeholderPosition = getNodePostion(trigger);
      const background =
        options.background || getBackgroundFromDOM(triggerStyles);

      bodyScrolling.lock();
      document.addEventListener('keyup', handleEscapeKey, { once: true });

      placeholder.style.cssText = `width: ${trigger.offsetWidth}px; height: ${trigger.offsetHeight}px; background: ${background};`;

      if (id) {
        setActiveModal(id);
      }

      setState(STATE.IS_IN_PROGRESS);

      const placeholderScale = getScaleValues(placeholder, placeholderPosition);

      placeholderRef.current.style.cssText += `top: ${placeholderPosition.top}px; left: ${placeholderPosition.left}px; transform: scale(${placeholderScale.scaleX},${placeholderScale.scaleY});`;

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
          setActiveModal(null);
        },
        { once: true }
      );
    }
  }

  return {
    triggerRef,
    triggerProps: {
      ref: triggerRef,
      [event]: open.bind(null, triggerRef),
    },
    multiTriggerProps(id?: any) {
      const ref = useRef<any>();
      return {
        ref,
        [event]: open.bind(null, ref, id),
      };
    },
    open,
    close,
    modalProps: {
      placeholderRef,
      state,
      activeModal,
      close,
    },
  };
}
