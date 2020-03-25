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
async function createMessage(newMessage) {
  try {
    const response = await fetch('http://localhost:8080/api/message', {
      method: 'post',
      body: JSON.stringify(newMessage),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json(response);
    console.info('Add message', result);
    return result;
  } catch (error) {
    return error;
  }
}
export function setCurrentMessage(messageId, text, item) {
  return {
    messageId,
    editMessageText: text,
    message: item,
    type: EDIT_MESSAGE,
  };
}
export async function fetchMessageById(messageId) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/message/${messageId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const result = await response.json(response);
    console.info('Get by id result', result);
    return result;
  } catch (error) {
    return error;
  }
}
export function chatAddMessage(newMessage) {
  createMessage(newMessage);
  return {
    message: newMessage,
    isTyping: false,
    type: CHAT_ADD_MESSAGE,
  };
}
export function chatMessageIsTyping(boolean) {
  return {
    items: null,
    isTyping: boolean,
    type: CHAT_MESSAGE_IS_TYPING,
  };
}
export function chatRemoveMessage(messageId) {
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
export function removeMessage(messageId) {
  chatRemoveMessage(messageId);
  return async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/message/${messageId}`,
        {
          method: 'delete',
        },
      );
      const result = await response.json(response);
      console.info('Delete result', result);
      return result;
    } catch (error) {
      return error;
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
      const result = await response.json(response);
      console.info('Update result', result);
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
