import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Field, reduxForm } from 'redux-form';
import CustomFieldLogin from './components/CustomFieldLogin/CustomFieldLogin';
import s from './Login.css';
import LoginButton from './components/LoginButton';
import { login, registration } from '../../actions/login';

const validate = value => {
  const errors = {};
  const minLengthPassword = 5;
  if (!value.email) {
    errors.email = 'Required';
  } else if (value.email.length < minLengthPassword) {
    errors.email = `Bro, not enough characters for a valid email`;
  } else if (!value.email.match(/^[\d.a-z-]+@[\da-z-]{2,}.[a-z]{2,}$/i)) {
    errors.email = 'Please, check your email, it looks invalid ';
  }
  if (!value.password) {
    errors.password = 'Required';
  } else if (value.password.length < minLengthPassword) {
    errors.password = `Password must have at least 5 characters, you typed only ${value.password.length}`;
  }

  return errors;
};

function Login() {
  const formLoginState = useSelector(state => state.form.Login);
  const dispatch = useDispatch();
  useStyles(s);

  const buttonLoginHandler = useCallback(
    event => {
      event.preventDefault();
      const { name } = event.target;
      if (name === 'login') {
        return dispatch(login());
      }
      if (name === 'registration') {
        return dispatch(registration());
      }
      return true;
    },
    [dispatch],
  );
  return (
    <div className={s.containerLogin}>
      {/* <a href="chat">chat</a> */}
      <h1 className={s.textLogin}>
        Want to be on safe? Please, log in or register
      </h1>
      <form className={s.formContainer}>
        <Field
          component={CustomFieldLogin}
          label="Email "
          name="email"
          type="text"
        />
        <Field
          component={CustomFieldLogin}
          label="Password"
          name="password"
          type="password"
        />
        <LoginButton
          buttonLoginHandler={buttonLoginHandler}
          hasError={!!formLoginState.syncErrors}
          name="login"
        />
        <LoginButton
          buttonLoginHandler={buttonLoginHandler}
          hasError={!!formLoginState.syncErrors}
          name="registration"
        />
      </form>
    </div>
  );
}

Login.whyDidYouRender = true;
export default reduxForm({
  form: 'Login',
  validate,
})(Login);
