import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';

import s from './ChatInput.css';

function ChatInput({ handleChange, userInput, sendUserMessage }) {
  // const [value, setValue] = useState('');

  return (
    <div className={s.chatInput}>
      <form onSubmit={sendUserMessage}>
        <input onChange={handleChange} type="text" value={userInput} />
      </form>
      <div className="chat-input__actions">
        {userInput !== '' && (
          <button
            className="btn btn-primary"
            onClick={sendUserMessage}
            type="submit"
          >
            Send
          </button>
        )}
      </div>
    </div>
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
