import React, { useState, useCallback } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';

import Messages from './components/messages';
import ChatInput from './components/chatInput';

import messages from './testData.json';

import s from './Chat.css';

function Chat() {
  const [userInput, setUserInput] = useState('');
  const handleChange = useCallback(event => {
    console.info(event.target.value);
    setUserInput(get(event, 'target.value'));
  }, []);
  const sendUserMessage = useCallback(
    event => {
      event.preventDefault();
      console.info('Text', userInput);
    },
    [userInput],
  );
  return (
    <div className={s.chatContainer}>
      <div className={s.content}>
        <div className={s.header}>Security Chat</div>
        <div className={s.messages}>
          <Messages items={messages} />
        </div>
        <ChatInput
          handleChange={handleChange}
          sendUserMessage={sendUserMessage}
          userInput={userInput}
        />
      </div>
    </div>
  );
}
Chat.whyDidYouRender = true;
Chat.prototype = {
  Messages: PropTypes.object,
};
Chat.defaultProps = {
  Messages: {},
};

export default withStyles(s)(React.memo(Chat));
