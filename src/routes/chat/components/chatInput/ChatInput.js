import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import property from 'lodash/property';
import isEmpty from 'lodash/isEmpty';

import s from './ChatInput.css';

function ChatInput({
  isEditMessage,
  handleChange,
  updateUserMessage,
  userInput,
  sendUserMessage,
  setUserInput,
}) {
  useStyles(s);
  const editMessageText = useSelector(property('chat.editMessageText'));
  useEffect(() => {
    if (
      // isEmpty does not work as expected
      isEditMessage === true &&
      (userInput === '' || isEmpty(userInput) || undefined)
    ) {
      setUserInput(editMessageText);
    }
  });
  return (
    <div>
      {isEditMessage !== true ? (
        <form className={s.chatInput} onSubmit={sendUserMessage}>
          <input onChange={handleChange} type="text" value={userInput} />
          {userInput !== '' && (
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          )}
        </form>
      ) : (
        <form className={s.chatInput} onSubmit={updateUserMessage}>
          <input onChange={handleChange} type="text" value={userInput} />
          {userInput !== '' && (
            <button className="btn btn-success" type="submit">
              Update
            </button>
          )}
        </form>
      )}
    </div>
  );
}

ChatInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  isEditMessage: PropTypes.bool.isRequired,
  sendUserMessage: PropTypes.func.isRequired,
  setUserInput: PropTypes.func.isRequired,
  updateUserMessage: PropTypes.func.isRequired,
  userInput: PropTypes.string,
};
ChatInput.defaultProps = {
  userInput: '',
};

export default memo(ChatInput);
