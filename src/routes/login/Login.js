import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Field, reduxForm } from 'redux-form';
import CustomFieldLogin from './components/CustomFieldLogin/CustomFieldLogin';
import s from './Login.css';
import LoginButton from './components/LoginButton/LoginButton';
import { login, registration, alertCreator } from '../../actions/login';
import Alert from './components/Alert/Alert';

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
  const formLoginValue = useSelector(state => state.form.Login.values);
  const loginState = useSelector(state => state.login);
  const dispatch = useDispatch();
  useStyles(s);
  const buttonLoginHandler = useCallback(
    event => {
      event.preventDefault();
      const { name } = event.target;
      if (formLoginState.syncErrors) {
        return dispatch(alertCreator('Fields valuse are invalid'));
      }
      if (name === 'login') {
        return dispatch(login(formLoginValue));
      }
      if (name === 'registration') {
        return dispatch(registration(formLoginValue));
      }
      return true;
    },
    [dispatch, formLoginValue],
  );
  // console.info(formLoginState);
  return (
    <div className={s.containerLogin}>
      <h1 className={s.textLogin}>
        Want to be on safe? Please, log in or register
      </h1>
      <form className={s.formContainer}>
        {loginState.alert && <Alert message={loginState.alert} />}
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
          // hasError={true}
          name="login"
        />
        <LoginButton
          buttonLoginHandler={buttonLoginHandler}
          // hasError={false}
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
