import React, { DOMAttributes } from 'react';

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

export interface GetTriggerProps {
  (id?: ModalId): TriggerProps;
  (options?: TriggerPropsOptions): TriggerProps;
}

export interface OpenModal {
  (
    triggerRef: React.MutableRefObject<any>,
    triggerOptions?: ModalId | TriggerPropsOptions
  ): void;
}

export interface CloseModal {
  (): void;
}

export interface ModalProps {
  placeholderRef: React.MutableRefObject<HTMLDivElement | null>;
  state: StateValues;
  close: CloseModal;
}

export interface UseModal {
  open: OpenModal;
  close: CloseModal;
  activeModal: ModalId;
  modalProps: ModalProps;
  getTriggerProps: GetTriggerProps;
}
