import React, { useState, useCallback, useReducer } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Login.css';

function Login() {
  const [inputValue, setInputValue] = useState({
    password: '',
    email: '',
  });
  const inputChangeHandler = useCallback(e => {
    const { name } = e.target;
    const { value } = e.target;
    setInputValue(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }, []);
  const btnLoginHandler = useCallback(
    e => {
      e.preventDefault();
      const { name } = e.target;
      switch (name) {
        case 'logIn':
          console.log('What we do now? :', name);
          console.log('What mail of user is? :', inputValue.email);
          console.log('What password is? :', inputValue.password);
          break;
        case 'registration':
          console.log('What we do now? :', name);
          console.log('What mail of user is? :', inputValue.email);
          console.log('What password is? :', inputValue.password);
          break;
      }
    },
    [inputValue],
  );
  console.log(inputValue.password);
  return (
    <div className={s.containerLogin}>
      <h1 className={s.textLogin}>
        Want to be on safe? Please, log in or register
      </h1>
      <form className={s.formContainer}>
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          id="email"
          value={inputValue.email}
          onChange={inputChangeHandler}
        />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          id="password"
          value={inputValue.password}
          onChange={inputChangeHandler}
        />
        <div className={s.wrapperForButtonLogin}>
          <button type="submit" name="logIn" onClick={btnLoginHandler}>
            Log in
          </button>
          <button type="submit" name="registration" onClick={btnLoginHandler}>
            Registration
          </button>
        </div>
      </form>
    </div>
  );
}
Login.whyDidYouRender = true;
export default withStyles(s)(React.memo(Login));
