import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useModal, Modal } from '../.';

import '../dist/ReactFancyModal.css';
import './index.css';

const App = () => {
  const { modalProps, open, triggerRef } = useModal();
  return (
    <div>
      <div className="card">
        <img src="https://picsum.photos/300" alt="Avatar" />
        <div className="container">
          <h4>
            <b>John Doe</b>
          </h4>
          <div className="action">
            <span>Engineer</span>
            <button ref={triggerRef as any} onClick={open}>
              Read More
            </button>
          </div>
        </div>
      </div>
      <Modal {...modalProps}>hello good morning</Modal>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
