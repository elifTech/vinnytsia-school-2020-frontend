import React, { useState, useCallback } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Auth.css';

function Auth() {
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
  const btnAuthHandler = useCallback(
    e => {
      e.preventDefault();
      const { name } = e.target;
      switch (name) {
        case 'logIn':
          console.log('What we do now? :', name);
          console.log('What mail of user is? :', inputValue.password);
          console.log('What password is? :', inputValue.email);
          break;
        case 'registration':
          console.log('What we do now? :', name);
          console.log('What mail of user is? :', inputValue.password);
          console.log('What password is? :', inputValue.email);
          break;
      }
    },
    [inputValue],
  );
  console.log(inputValue.password);
  return (
    <div className={s.containerAuth}>
      <h1 className={s.textAuth}>
        Want to be on safe? Please, log in or register
      </h1>
      <form className={s.formContiner}>
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
        <div className={s.wrapperForButtobAuth}>
          <button type="submit" name="logIn" onClick={btnAuthHandler}>
            Log in
          </button>
          <button type="submit" name="registration" onClick={btnAuthHandler}>
            Registration
          </button>
        </div>
      </form>
    </div>
  );
}
Auth.whyDidYouRender = true;
export default withStyles(s)(React.memo(Auth));
