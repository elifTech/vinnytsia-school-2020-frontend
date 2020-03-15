import React, { memo, useState, useCallback } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './Chat.css';

function Chat() {
  useStyles(s);
  const [userInput, setUserInput] = useState('');
  const handleChange = useCallback(event => {
    console.info(event.target.value);
    setUserInput(get(event, 'target.value'));
  }, []);
  return (
    <div className={s.root}>
      <div className={s.content}>
        <div className={s.header}>Security Chat</div>
        <div className={s.messages}>Messages</div>
        <input
          className={s.input}
          onChange={handleChange}
          type="text"
          value={userInput}
        />
      </div>
    </div>
  );
}
Chat.whyDidYouRender = true;
Chat.prototype = {
  name: PropTypes.string,
};
Chat.defaultProps = {
  name: '',
};

export default memo(Chat);
