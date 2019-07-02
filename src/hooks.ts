import { useRef, useState, DOMAttributes } from 'react';
import {
  getNodePostion,
  getScaleValues,
  getBackground,
  bodyScrolling,
  getBorderRadius,
} from './DOMutils';

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
      const background = options.background || getBackground(triggerStyles);
      const borderRadius = getBorderRadius(triggerStyles);

      bodyScrolling.lock();
      document.addEventListener('keyup', handleEscapeKey);

      placeholder.style.cssText = `width: ${trigger.offsetWidth}px; height: ${trigger.offsetHeight}px; background: ${background}; ${borderRadius}`;

      if (id) {
        setActiveModal(id);
      }

      setState(STATE.IS_IN_PROGRESS);

      const placeholderScale = getScaleValues(placeholder, placeholderPosition);
      // 👽1.5 to handle circle and rounded border
      placeholder.style.cssText += `
        top: ${placeholderPosition.top}px;
        left: ${placeholderPosition.left}px;
        transform: scale(${placeholderScale.scaleX *
          1.5},${placeholderScale.scaleY * 1.5});
      `;

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

      document.removeEventListener('keyup', handleEscapeKey);
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
