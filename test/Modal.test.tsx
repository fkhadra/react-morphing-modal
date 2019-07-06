import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Modal, useModal } from '../src';
import { render, fireEvent, cleanup } from '@testing-library/react';

const App: React.FC<{ closeButton?: boolean; padding?: boolean }> = ({
  closeButton,
  padding,
}) => {
  const { triggerProps, modalProps, close } = useModal();

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
      <button data-testid="trigger-with-double-click" {...triggerProps()}>
        trigger with double click
      </button>
      <button data-testid="close-modal" onClick={close}>
        close modal
      </button>
      <Modal {...modalProps} closeButton={closeButton} padding={padding} />
    </div>
  );
};

App.defaultProps = {
  closeButton: true,
  padding: true,
};

afterEach(cleanup);

function openModal(container: HTMLElement, getByTestId: any) {
  fireEvent.click(getByTestId('trigger'));
  triggerTransitionEnd(container);
}

function triggerTransitionEnd(container: HTMLElement) {
  const placeholder = container.querySelector('.RMM__placeholder');
  fireEvent.transitionEnd(placeholder!);
}

describe('Morphing modal', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should be hidden on initial load', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.RMM__container--is-active')).toBe(null);
  });

  it('should display the modal when the trigger is clicked', () => {
    const { container, getByTestId } = render(<App />);

    expect(container.querySelector('.RMM__container--is-active')).toBe(null);
    expect(container.querySelector('.RMM__body--is-active')).toBe(null);

    openModal(container, getByTestId);

    expect(container.querySelector('.RMM__body--is-active')).not.toBe(null);
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

  describe('Close Modal', () => {
    it('should close the modal when the close button is clicked', () => {
      const { container, getByTestId } = render(<App />);

      openModal(container, getByTestId);
      fireEvent.click(container.querySelector('.RMM__close-button')!);
      triggerTransitionEnd(container);

      expect(container.querySelector('.RMM__body--is-active')).toBe(null);
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
      expect(container.querySelector('.RMM__body--is-active')).toBe(null);
    });

    it('should be possible to close the modal programmatically', () => {
      const { container, getByTestId } = render(<App />);
      openModal(container, getByTestId);
      fireEvent.click(getByTestId('close-modal'));
      triggerTransitionEnd(container);

      expect(container.querySelector('.RMM__body--is-active')).toBe(null);
    });
  });
});
