import React, { useState, useCallback, useEffect } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import { useDispatch } from 'react-redux';

import Messages from './components/messages';
import ChatInput from './components/chatInput';
import {
  chatAddMessage,
  chatMessageIsLoading,
  // chatRemoveMessage,
  fetchMessages,
} from '../../actions/security-chat';

import messages from './testData.json';

import s from './Chat.css';

function Chat() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchMessages();
  }, [dispatch]);
  const initialState = '';
  const [userInput, setUserInput] = useState(initialState);
  const handleChange = useCallback(event => {
    console.info(event.target.value);
    setUserInput(get(event, 'target.value'));
    dispatch(chatMessageIsLoading(true));
  }, []);
  const sendUserMessage = useCallback(
    event => {
      event.preventDefault();
      // const newValue = parseInt(get(event, 'target.value'));
      console.info('Text', userInput);
      dispatch(chatAddMessage(userInput));
      return setUserInput(initialState);
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
