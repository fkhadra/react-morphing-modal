import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useModal, Modal } from '../.';

import '../dist/ReactMorphingModal.css';
import './index.css';

const App = () => {
  const {
    modalProps,
    open,
    triggerRef,
    triggerProps,
    multiTriggerProps,
  } = useModal({
    event: 'onClick',
  });
  return (
    <div>
      <div className="card">
        <img src="https://picsum.photos/300" alt="Avatar" />
        <div className="container">
          <h4>
            <b>John Doe</b>
          </h4>
          <div className="action">
            <span>Lorem Ipsum</span>
            <button {...triggerProps}>Read More</button>
            <button
              {...multiTriggerProps('foo')}
              style={{ backgroundColor: 'purple', borderRadius: '12px' }}
            >
              Read More
            </button>
          </div>
        </div>
        <button className="fab" {...multiTriggerProps('baz')}>
          F
        </button>
      </div>
      <Modal {...modalProps}>
        {modalProps.activeModal === 'foo' ? 'bar' : 'plop'}
      </Modal>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
