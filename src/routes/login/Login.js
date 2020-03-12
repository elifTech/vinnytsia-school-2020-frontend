import React, { useState, useCallback } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Login.css';
import Input from './components/Input';
import LoginButton from './components/LoginButton';

function Login() {
  const [inputValue, setInputValue] = useState({
    password: '',
    email: '',
  });
  const inputChangeHandler = useCallback(event => {
    const { name } = event.target;
    const { value } = event.target;
    setInputValue(previous => {
      return {
        ...previous,
        [name]: value,
      };
    });
  }, []);
  const buttonLoginHandler = useCallback(
    event => {
      event.preventDefault();
      const { name } = event.target;
      switch (name) {
        case 'logIn':
          console.info('What we do now? :', name);
          console.info('What mail of user is? :', inputValue.email);
          console.info('What password is? :', inputValue.password);
          break;
        case 'registration':
          console.info('What we do now? :', name);
          console.info('What mail of user is? :', inputValue.email);
          console.info('What password is? :', inputValue.password);
          break;
        default:
          console.info('something whent wrong');
      }
    },
    [inputValue],
  );
  return (
    <div className={s.containerLogin}>
      <h1 className={s.textLogin}>
        Want to be on safe? Please, log in or register
      </h1>
      <form className={s.formContainer}>
        <Input
          inputChangeHandler={inputChangeHandler}
          name="email"
          value={inputValue.email}
        />
        <Input
          inputChangeHandler={inputChangeHandler}
          name="password"
          value={inputValue.password}
        />
        <LoginButton buttonLoginHandler={buttonLoginHandler} name="logIn" />
        <LoginButton
          buttonLoginHandler={buttonLoginHandler}
          name="registration"
        />
      </form>
    </div>
  );
}
Login.whyDidYouRender = true;
export default withStyles(s)(React.memo(Login));
