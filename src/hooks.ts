import { useRef, useState, DOMAttributes } from 'react';
import {
  getBackground,
  bodyScrolling,
  getBorderRadius,
  getPlaceholderComputedStyle,
} from './DOMutils';

// maybe there is a better interface for my use case
export type DOMEvent = keyof DOMAttributes<HTMLElement>;

export interface ModalOptions {
  background?: string;
  event?: DOMEvent;
}

export interface TriggerProps {
  ref: React.MutableRefObject<any>;
  [x: string]: React.MutableRefObject<any> | (() => void);
}

// 0 -> close
// 1 -> opening in progress
// 2 -> open
export type StateValues = 0 | 1 | 2;

export type ModalId = string | number | symbol | null;

export type TriggerPropsOptions = {
  id?: ModalId;
  event?: DOMEvent;
};

export type ModalState = Record<
  'IS_CLOSE' | 'IS_IN_PROGRESS' | 'IS_OPEN',
  StateValues
>;

export interface UseModal {
  triggerProps: {
    (id?: ModalId): TriggerProps;
    (options?: TriggerPropsOptions): TriggerProps;
  };
  close: () => void;
  activeModal: ModalId;
  modalProps: {
    placeholderRef: React.MutableRefObject<HTMLDivElement | undefined>;
    state: StateValues;
    close: () => void;
  };
}

export const STATE: ModalState = {
  IS_CLOSE: 0,
  IS_IN_PROGRESS: 1,
  IS_OPEN: 2,
};

export function useModal(options: ModalOptions = {}): UseModal {
  const placeholderRef = useRef<HTMLDivElement>();
  const activeTriggerRef = useRef<any>();
  const [activeModal, setActiveModal] = useState<ModalId>(null);
  const [state, setState] = useState<StateValues>(STATE.IS_CLOSE);
  const event = options.event || 'onClick';

  function handleEscapeKey(e: KeyboardEvent) {
    if (e.keyCode === 27) close();
  }
  // maybe throttle later if needed
  function handleResize() {
    console.log('mpu');
    requestAnimationFrame(updatePlaceholder);
  }

  function updatePlaceholder() {
    const trigger = activeTriggerRef.current.current;
    if (placeholderRef.current && trigger) {
      const placeholderStyle = getPlaceholderComputedStyle(
        trigger,
        placeholderRef.current
      );
      placeholderRef.current.style.cssText += placeholderStyle;
    }
  }

  function open(triggerRef: React.MutableRefObject<any>, id?: ModalId) {
    activeTriggerRef.current = triggerRef;
    console.log('open');

    if (placeholderRef.current && triggerRef.current) {
      const placeholder = placeholderRef.current;
      const trigger = triggerRef.current;
      const triggerStyles = window.getComputedStyle(trigger);
      const background = options.background || getBackground(triggerStyles);
      const borderRadius = getBorderRadius(triggerStyles);

      bodyScrolling.lock();

      document.addEventListener('keyup', handleEscapeKey);
      window.addEventListener('resize', handleResize);

      placeholder.style.cssText = `width: ${trigger.offsetWidth}px; height: ${trigger.offsetHeight}px; background: ${background}; ${borderRadius}`;

      if (id) {
        setActiveModal(id);
      }

      setState(STATE.IS_IN_PROGRESS);

      const placeholderStyle = getPlaceholderComputedStyle(
        trigger,
        placeholder
      );
      placeholder.style.cssText += placeholderStyle;

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
    console.log('close');
    if (placeholderRef.current) {
      const placeholder = placeholderRef.current;
      setState(STATE.IS_IN_PROGRESS);
      document.removeEventListener('keyup', handleEscapeKey);
      window.removeEventListener('resize', handleResize);
      bodyScrolling.unlock();
      placeholder.style.removeProperty('transform');
      placeholder.style.transform = 'scale(1,1);';

      placeholder.addEventListener(
        'transitionend',
        () => {
          console.log('transend');

          setState(STATE.IS_CLOSE);
          setActiveModal(null);
        },
        { once: true }
      );
    }
  }

  return {
    triggerProps(param?: ModalId | TriggerPropsOptions) {
      let id;
      let evt = event;

      if (
        typeof param === 'number' ||
        typeof param === 'string' ||
        typeof param === 'symbol'
      ) {
        id = param;
      } else if (typeof param === 'object' && param !== null) {
        id = param.id;
        evt = param.event || event;
      }

      const ref = useRef<any>();
      return {
        ref,
        [evt]: open.bind(null, ref, id),
      };
    },
    close,
    activeModal,
    modalProps: {
      placeholderRef,
      state,
      close,
    },
  };
}
