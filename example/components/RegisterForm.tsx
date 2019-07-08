import * as React from 'react';
import { toast } from 'react-toastify';

const RegisterForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  function onSubmit() {
    toast('🚀 Hey thank your for passing by. The form will close soon');
    setTimeout(() => {
      closeModal();
    }, 3000);
  }

  return (
    <section>
      <form
        action="#"
        className="register-form"
        onSubmit={e => e.preventDefault()}
      >
        <h2>Register</h2>
        <label htmlFor="Username">Username:</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <div className="register-form__btn-group">
          <button className="btn btn__cancel" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn btn__submit" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};
export { RegisterForm };
