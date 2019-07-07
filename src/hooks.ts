import { useRef, useState, DOMAttributes, useEffect } from 'react';
import {
  getBackground,
  bodyScrolling,
  getBorderRadius,
  getPlaceholderComputedStyle,
} from './DOMutils';

// maybe there is a better interface for my use case
export type DOMEvent = keyof DOMAttributes<HTMLElement>;
export type ModalId = string | number | symbol | null;
// 0 -> close
// 1 -> opening in progress
// 2 -> open
export type StateValues = 0 | 1 | 2;

export interface TriggerPropsOptions {
  id?: ModalId;
  event?: DOMEvent;
  onOpen?: () => any;
  onClose?: () => any;
  background?: string;
}

export type HookOptions = Omit<TriggerPropsOptions, 'id'>;

export interface TriggerProps {
  ref: React.MutableRefObject<any>;
  [x: string]: React.MutableRefObject<any> | (() => void);
}

export type ModalState = Record<
  'IS_CLOSE' | 'IS_IN_PROGRESS' | 'IS_OPEN',
  StateValues
>;

export type ActiveTriggerRef = {
  nodeRef: React.MutableRefObject<any> | null;
  options?: TriggerPropsOptions | null;
};

export interface UseModal {
  triggerProps: {
    (id?: ModalId): TriggerProps;
    (options?: TriggerPropsOptions): TriggerProps;
  };
  close: () => void;
  activeModal: ModalId;
  modalProps: {
    placeholderRef: React.MutableRefObject<HTMLDivElement | null>;
    state: StateValues;
    close: () => void;
  };
}

export const STATE: ModalState = {
  IS_CLOSE: 0,
  IS_IN_PROGRESS: 1,
  IS_OPEN: 2,
};

const noop = () => {};

export function useModal(hookOptions: HookOptions = {}): UseModal {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const activeTriggerRef = useRef<ActiveTriggerRef>({
    nodeRef: null,
    options: null,
  });
  const [activeModal, setActiveModal] = useState<ModalId>(null);
  const [state, setState] = useState<StateValues>(STATE.IS_CLOSE);
  const event = hookOptions.event || 'onClick';
  const onOpenCallback = hookOptions.onOpen || noop;
  const onCloseCallback = hookOptions.onClose || noop;

  function handleEscapeKey(e: KeyboardEvent) {
    const key = e.key || e.keyCode;
    if (key === 'Escape' || key === 'Esc' || key === 27) close();
  }

  // maybe throttle later if needed
  function handleResize() {
    requestAnimationFrame(updatePlaceholder);
  }

  function updatePlaceholder() {
    const trigger = activeTriggerRef.current.nodeRef!.current;
    if (placeholderRef.current && trigger) {
      const placeholderStyle = getPlaceholderComputedStyle(
        trigger,
        placeholderRef.current
      );
      placeholderRef.current.style.cssText += placeholderStyle;
    }
  }

  useEffect(() => {
    if (state !== STATE.IS_CLOSE) {
      document.addEventListener('keydown', handleEscapeKey);
      window.addEventListener('resize', handleResize);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('resize', handleResize);
    };
  }, [state]);

  function open(
    triggerRef: React.MutableRefObject<any>,
    triggerOptions?: ModalId | TriggerPropsOptions
  ) {
    activeTriggerRef.current.nodeRef = triggerRef;
    if (placeholderRef.current && triggerRef.current) {
      const placeholder = placeholderRef.current;
      const trigger = triggerRef.current;
      const triggerStyles = window.getComputedStyle(trigger);
      const borderRadius = getBorderRadius(triggerStyles);

      let modalId: ModalId = null;
      let background = hookOptions.background || getBackground(triggerStyles);
      let onOpen = onOpenCallback;

      if (
        typeof triggerOptions === 'number' ||
        typeof triggerOptions === 'string' ||
        typeof triggerOptions === 'symbol'
      ) {
        modalId = triggerOptions;
      } else if (
        typeof triggerOptions === 'object' &&
        triggerOptions !== null
      ) {
        activeTriggerRef.current.options = triggerOptions;
        background = triggerOptions.background || background;
        onOpen = triggerOptions.onOpen || onOpenCallback;
      }

      bodyScrolling.lock();

      placeholder.style.cssText = `width: ${trigger.offsetWidth}px; height: ${trigger.offsetHeight}px; background: ${background}; ${borderRadius}`;

      if (modalId) {
        setActiveModal(modalId);
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
          onOpen();
          setState(STATE.IS_OPEN);
        },
        { once: true }
      );
    }
  }

  function close() {
    if (placeholderRef.current) {
      const triggerOptions = activeTriggerRef.current.options;
      const placeholder = placeholderRef.current;
      let onClose =
        triggerOptions && triggerOptions.onClose
          ? triggerOptions.onClose
          : onCloseCallback;
      setState(STATE.IS_IN_PROGRESS);

      bodyScrolling.unlock();
      placeholder.style.removeProperty('transform');
      placeholder.style.transform = 'scale(1,1);';

      placeholder.addEventListener(
        'transitionend',
        () => {
          onClose();
          setState(STATE.IS_CLOSE);
          setActiveModal(null);
        },
        { once: true }
      );
    }
  }

  return {
    triggerProps(options?: ModalId | TriggerPropsOptions) {
      const ref = useRef<any>();
      return {
        ref,
        [typeof options === 'object' && options !== null && options.event
          ? options.event
          : event]: open.bind(null, ref, options),
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
