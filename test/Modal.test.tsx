import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Modal, useModal } from '../src';
import { render, fireEvent, cleanup } from '@testing-library/react';

const App: React.FC<{ closeButton?: boolean; padding?: boolean }> = ({
  closeButton,
  padding,
}) => {
  const { triggerProps, modalProps, close, activeModal } = useModal();

  return (
    <div>
      <button data-testid="trigger" {...triggerProps()}>
        trigger
      </button>
      <button data-testid="trigger2" {...triggerProps()}>
        trigger 2
      </button>
      <button data-testid="trigger-with-id" {...triggerProps('foobar')}>
        trigger with id
      </button>
      <button
        data-testid="trigger-with-double-click"
        {...triggerProps({ event: 'onDoubleClick' })}
      >
        trigger with double click
      </button>
      <button data-testid="close-modal" onClick={close}>
        close modal
      </button>
      <span data-testid="modal-id">{activeModal}</span>
      <Modal {...modalProps} closeButton={closeButton} padding={padding} />
    </div>
  );
};

App.defaultProps = {
  closeButton: true,
  padding: true,
};

afterEach(cleanup);

function openModal(
  container: HTMLElement,
  getByTestId: any,
  triggerId: string = 'trigger'
) {
  assertModalIsClosed(container);
  fireEvent.click(getByTestId(triggerId));
  triggerTransitionEnd(container);
  assertModalIsOpen(container);
}

function triggerTransitionEnd(container: HTMLElement) {
  const placeholder = container.querySelector('.RMM__placeholder');
  fireEvent.transitionEnd(placeholder!);
}

function assertModalIsOpen(container: HTMLElement) {
  expect(container.querySelector('.RMM__body--is-active')).not.toBe(null);
}

function assertModalIsClosed(container: HTMLElement) {
  expect(container.querySelector('.RMM__body--is-active')).toBe(null);
}

describe('Morphing modal', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should be hidden on initial load', () => {
    const { container } = render(<App />);
    assertModalIsClosed(container);
  });

  it('should display the modal when the trigger is clicked', () => {
    const { container, getByTestId } = render(<App />);

    openModal(container, getByTestId);
    assertModalIsOpen(container);
  });

  it('should display a close button by default', () => {
    const { container, getByTestId } = render(<App />);

    expect(container.querySelector('.RMM__close-button--is-active')).toBe(null);
    openModal(container, getByTestId);
    expect(container.querySelector('.RMM__close-button--is-active')).not.toBe(
      null
    );
  });

  it('should be possible to disable the close button', () => {
    const { container, getByTestId } = render(<App closeButton={false} />);

    expect(container.querySelector('.RMM__close-button')).toBe(null);
    openModal(container, getByTestId);
    expect(container.querySelector('.RMM__close-button')).toBe(null);
  });

  it('should be possible to use multiple trigger for the same modal', () => {
    const { container, getByTestId } = render(<App />);

    // test with 'trigger'
    openModal(container, getByTestId);
    fireEvent.click(container.querySelector('.RMM__close-button')!);
    triggerTransitionEnd(container);
    assertModalIsClosed(container);
    openModal(container, getByTestId, 'trigger2');
  });

  it('should be possible to define an id for a trigger', () => {
    const { container, getByTestId } = render(<App />);

    openModal(container, getByTestId, 'trigger-with-id');
    expect(getByTestId('modal-id').innerHTML).toBe('foobar');
  });

  it('should be possible to use any DOM event to open the modal. Double-click in that case', () => {
    const { container, getByTestId } = render(<App />);

    assertModalIsClosed(container);
    fireEvent.doubleClick(getByTestId('trigger-with-double-click'));
    triggerTransitionEnd(container);
    assertModalIsOpen(container);
  });

  describe('Close Modal', () => {
    it('should close the modal when the close button is clicked', () => {
      const { container, getByTestId } = render(<App />);

      openModal(container, getByTestId);
      fireEvent.click(container.querySelector('.RMM__close-button')!);
      triggerTransitionEnd(container);

      assertModalIsClosed(container);
    });

    it('should close the modal when esc key is pressed', () => {
      const { container, getByTestId } = render(<App />);
      openModal(container, getByTestId);

      fireEvent.keyDown(document.body, {
        key: 'Escape',
        keyCode: 27,
        code: 27,
      });
      triggerTransitionEnd(container);
      assertModalIsClosed(container);
    });

    it('should be possible to close the modal programmatically', () => {
      const { container, getByTestId } = render(<App />);

      openModal(container, getByTestId);
      fireEvent.click(getByTestId('close-modal'));
      triggerTransitionEnd(container);
      assertModalIsClosed(container);
    });
  });
});
