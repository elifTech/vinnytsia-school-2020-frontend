import React, { useState, useCallback, useEffect } from 'react';
import get from 'lodash/get';
import property from 'lodash/property';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import { useDispatch, useSelector } from 'react-redux';

import Messages from './components/messages';
import ChatInput from './components/chatInput';
import {
  chatAddMessage,
  chatMessageIsLoading,
  fetchMessages,
} from '../../actions/security-chat';
import socket from '../../utils/socket';
// import testData from './testData.json';

import s from './Chat.css';

const testUserId = '1';

function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector(property('chat.messages'));
  // console.info(messages);
  useEffect(() => {
    dispatch(fetchMessages());
    socket.on('SERVER:NEW_MESSAGE', function reloadMessagesList() {
      dispatch(fetchMessages());
    });
  }, [dispatch]);
  const initialState = '';
  const [userInput, setUserInput] = useState(initialState);
  const handleChange = useCallback(
    event => {
      socket.emit('CHAT:TYPING', testUserId);
      // console.info(event.target.value);
      setUserInput(get(event, 'target.value'));
      dispatch(chatMessageIsLoading(true));
    },
    [dispatch],
  );

  const sendUserMessage = useCallback(
    event => {
      event.preventDefault();
      const newMessage = {
        user: testUserId,
        text: userInput,
      };
      // console.info('Text', newMessage);
      socket.emit('SERVER:NEW_MESSAGE', newMessage);
      dispatch(chatAddMessage(newMessage));
      return setUserInput(initialState);
    },
    [dispatch, userInput],
  );
  return (
    <div className={s.chatContainer}>
      <div className={s.content}>
        <div className={s.header}>Security Chat</div>
        <div className={s.messagesContent}>
          <div className={s.messages}>
            {!messages || null || undefined ? (
              <span>LOADING</span>
            ) : (
              <Messages items={messages} />
            )}
          </div>
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
