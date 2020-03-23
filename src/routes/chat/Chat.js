import React, { memo, useState, useCallback, useEffect } from 'react';
import get from 'lodash/get';
import property from 'lodash/property';
import isEmpty from 'lodash/isEmpty';
import useStyles from 'isomorphic-style-loader/useStyles';
import { useDispatch, useSelector } from 'react-redux';

import Messages from './components/messages';
import ChatInput from './components/chatInput';
import {
  chatAddMessage,
  chatMessageIsTyping,
  fetchMessages,
  chatRemoveMessage,
  fetchUpdateMessage,
  setCurrentMessage,
} from '../../actions/security-chat';
import socket from '../../utils/socket';
// Without api need to use testData instead messages in <Messages> component
// import testData from './testData.json';

import s from './Chat.css';

const testUserId = '1';

function Chat() {
  useStyles(s);
  const dispatch = useDispatch();
  const messages = useSelector(property('chat.messages'));
  const message = useSelector(property('chat.message'));
  const messageId = useSelector(property('chat.messageId'));
  useEffect(() => {
    dispatch(fetchMessages());
    socket.on('SERVER:NEW_MESSAGE', function reloadMessagesList() {
      dispatch(fetchMessages());
    });
  }, [dispatch]);
  useEffect(() => {
    socket.on('SERVER:REMOVE_MESSAGE', function reloadMessagesList() {
      dispatch(fetchMessages());
    });
  }, [dispatch]);
  useEffect(() => {
    socket.on('SERVER:UPDATE_MESSAGE', function reloadMessagesList() {
      dispatch(fetchMessages());
    });
  }, [dispatch]);
  const initialState = '';
  const [userInput, setUserInput] = useState(initialState);
  const [isEditMessage, setIsEditMessage] = useState(false);
  const changeInputToEdit = useCallback(async () => {
    await setIsEditMessage(true);
  }, []);
  const handleChange = useCallback(
    event => {
      socket.emit('CHAT:TYPING', testUserId);
      setUserInput(get(event, 'target.value'));
      dispatch(chatMessageIsTyping(true));
      return userInput;
    },
    [dispatch, userInput],
  );

  const sendUserMessage = useCallback(
    event => {
      event.preventDefault();
      const newMessage = {
        UserId: testUserId,
        text: userInput,
      };
      socket.emit('SERVER:NEW_MESSAGE', newMessage);
      dispatch(chatAddMessage(newMessage));
      return setUserInput(initialState);
    },
    [dispatch, userInput],
  );
  const updateUserMessage = useCallback(
    async event => {
      event.preventDefault();
      const oldMessage = await message;
      console.info('OOOOOOOOO', oldMessage);
      const updateMessageText = {
        ...oldMessage,
        text: userInput,
      };
      socket.emit('SERVER:UPDATE_MESSAGE', updateMessageText);
      dispatch(fetchUpdateMessage(messageId, updateMessageText));
      setIsEditMessage(false);
      setCurrentMessage(null, '');
      setUserInput(initialState);
      return setUserInput(initialState);
    },
    [dispatch, message, messageId, userInput],
  );
  return (
    <div className={s.chatContainer}>
      <div className={s.content}>
        <div className={s.header}>Security Chat</div>
        <div className={s.messagesContent}>
          <div className={s.messages}>
            {isEmpty(messages) ? (
              <span>No messages</span>
            ) : (
              <Messages
                changeInputToEdit={changeInputToEdit}
                chatRemoveMessage={chatRemoveMessage}
                items={messages}
              />
            )}
          </div>
        </div>
        <ChatInput
          handleChange={handleChange}
          isEditMessage={isEditMessage}
          sendUserMessage={sendUserMessage}
          setUserInput={setUserInput}
          updateUserMessage={updateUserMessage}
          userInput={userInput}
        />
      </div>
    </div>
  );
}
Chat.whyDidYouRender = true;

export default memo(Chat);
