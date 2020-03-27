import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import property from 'lodash/property';

import s from './ChatInput.css';

function ChatInput({
  isEditCondition,
  handleChange,
  updateUserMessage,
  userInput,
  sendUserMessage,
  setUserInput,
}) {
  useStyles(s);
  const editMessageText = useSelector(property('chat.editMessageText'));
  useEffect(() => {
    if (isEditCondition && !userInput) {
      setUserInput(editMessageText);
    }
  });
  return (
    <div>
      {isEditCondition !== true ? (
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
  isEditCondition: PropTypes.bool.isRequired,
  sendUserMessage: PropTypes.func.isRequired,
  setUserInput: PropTypes.func.isRequired,
  updateUserMessage: PropTypes.func.isRequired,
  userInput: PropTypes.string,
};
ChatInput.defaultProps = {
  userInput: '',
};

export default memo(ChatInput);
