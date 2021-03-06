import fetch from 'node-fetch';
import {
  GET_ALL_MESSAGES,
  CHAT_ADD_MESSAGE,
  CHAT_MESSAGE_IS_TYPING,
  FETCH_DATA_START,
  FETCH_DATA_FAILURE,
  CHAT_REMOVE_MESSAGE,
  CHAT_UPDATE_MESSAGE_BY_ID,
  EDIT_MESSAGE,
} from '../constants';

import socket from '../utils/socket';

function fetchDataStart() {
  return {
    type: FETCH_DATA_START,
  };
}
function fetchDataFailure(error) {
  return {
    type: FETCH_DATA_FAILURE,
    error,
  };
}

function fetchMessagesSuccess(items) {
  socket.emit('CHAT:ON', { message: 'Chat is open' });
  return {
    items,
    isTyping: false,
    type: GET_ALL_MESSAGES,
  };
}
function chatAddMessage(newMessage) {
  return {
    message: newMessage,
    isTyping: false,
    type: CHAT_ADD_MESSAGE,
  };
}
export function setCurrentMessage(messageId, text, item) {
  return {
    messageId,
    editMessageText: text,
    message: item,
    type: EDIT_MESSAGE,
  };
}
export function chatMessageIsTyping(boolean) {
  return {
    items: null,
    isTyping: boolean,
    type: CHAT_MESSAGE_IS_TYPING,
  };
}
function chatRemoveMessage(messageId) {
  return {
    messageId,
    type: CHAT_REMOVE_MESSAGE,
  };
}
export function setUpdatedMessage(messageId, updatedMessage) {
  return {
    messageId,
    message: updatedMessage,
    isTyping: false,
    type: CHAT_UPDATE_MESSAGE_BY_ID,
  };
}
export function createMessage(newMessage) {
  return async dispatch => {
    dispatch(fetchDataStart());
    try {
      const response = await fetch('http://localhost:8080/api/message', {
        method: 'post',
        body: JSON.stringify(newMessage),
        headers: { 'Content-Type': 'application/json' },
      });
      await response.json();
      return dispatch(chatAddMessage(newMessage));
    } catch (error) {
      return dispatch(fetchDataFailure(error));
    }
  };
}
export function removeMessage(messageId) {
  return async dispatch => {
    dispatch(fetchDataStart());
    try {
      const response = await fetch(
        `http://localhost:8080/api/message/${messageId}`,
        {
          method: 'delete',
        },
      );
      await response.json();
      return dispatch(chatRemoveMessage(messageId));
    } catch (error) {
      return dispatch(fetchDataFailure(error));
    }
  };
}
export function updateMessage(messageId, updatedMessage) {
  return async dispatch => {
    dispatch(fetchDataStart());
    try {
      const response = await fetch(
        `http://localhost:8080/api/message/${messageId}`,
        {
          method: 'put',
          body: JSON.stringify(updatedMessage),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      await response.json();
      return dispatch(setUpdatedMessage(messageId, updatedMessage));
    } catch (error) {
      return dispatch(fetchDataFailure(error));
    }
  };
}
export function fetchMessages() {
  return async dispatch => {
    dispatch(fetchDataStart());
    try {
      const response = await fetch('http://localhost:8080/api/messages');
      const data = await response.json();
      // console.info('Data from fetchMessages', data.data);
      return dispatch(fetchMessagesSuccess(data.data));
    } catch (error) {
      return dispatch(fetchDataFailure(error));
    }
  };
}
