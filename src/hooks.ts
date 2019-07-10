import { useRef, useState, useEffect } from 'react';
import {
  getBackground,
  bodyScrolling,
  getBorderRadius,
  getPlaceholderComputedStyle,
} from './DOMutils';

import {
  ModalState,
  HookOptions,
  UseModal,
  ActiveTriggerRef,
  ModalId,
  StateValues,
  TriggerProps,
  GetTriggerProps,
  TriggerPropsOptions,
  OpenModal,
  CloseModal,
} from './types';

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

  const open: OpenModal = (triggerRef, triggerOptions) => {
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
        modalId = triggerOptions.id || modalId;
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
  };

  const close: CloseModal = () => {
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
  };

  const getTriggerProps: GetTriggerProps = (
    options?: ModalId | TriggerPropsOptions
  ): TriggerProps => {
    const ref = useRef<any>();
    return {
      ref,
      [typeof options === 'object' && options !== null && options.event
        ? options.event
        : event]: open.bind(null, ref, options),
    };
  };

  return {
    open,
    close,
    activeModal,
    getTriggerProps,
    modalProps: {
      placeholderRef,
      state,
      close,
    },
  };
}
