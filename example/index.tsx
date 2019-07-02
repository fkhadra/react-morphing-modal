import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { useModal, Modal } from '../.';
import { RegisterForm, Projects, ForkMe, LoremIpsum } from './components';

import '../dist/ReactMorphingModal.css';
import './index.css';

const App = () => {
  const { close, modalProps, activeModal, triggerProps } = useModal({
    event: 'onClick',
  });

  let componentToRender: React.ReactNode;

  switch (activeModal) {
    case 'registerForm':
      componentToRender = <RegisterForm closeModal={close} />;
      break;
    case 'projects':
      componentToRender = <Projects />;
      break;
    default:
      componentToRender = <LoremIpsum />;
      break;
  }

  return (
    <div>
      <ForkMe />
      <div className="btn-group">
        <button
          {...triggerProps({ id: 'registerForm' })}
          className="btn btn__register"
        >
          📜Register
        </button>
        <button {...triggerProps('projects')} className="btn btn__projects">
          🐙 Projects
        </button>
      </div>
      <button className="fab" {...triggerProps()}>
        <span>✌️</span>
      </button>
      <Modal {...modalProps}>{componentToRender}</Modal>
      <ToastContainer />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
