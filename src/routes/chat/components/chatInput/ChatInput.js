import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';

import s from './ChatInput.css';

function ChatInput({ handleChange, userInput, sendUserMessage }) {
  return (
    <form className={s.chatInput} onSubmit={sendUserMessage}>
      <input onChange={handleChange} type="text" value={userInput} />
      {userInput !== '' && (
        <button
          className="btn btn-primary"
          onClick={sendUserMessage}
          type="submit"
        >
          Send
        </button>
      )}
    </form>
  );
}

ChatInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  sendUserMessage: PropTypes.func.isRequired,
  userInput: PropTypes.string,
};
ChatInput.defaultProps = {
  userInput: '',
};

export default withStyles(s)(ChatInput);
