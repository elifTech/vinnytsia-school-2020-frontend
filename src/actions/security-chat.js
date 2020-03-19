import fetch from 'node-fetch';
import {
  GET_ALL_MESSAGES,
  CHAT_ADD_MESSAGE,
  CHAT_MESSAGE_IS_TYPING,
  FETCH_DATA_START,
  FETCH_DATA_FAILURE,
  // CHAT_REMOVE_MESSAGE,
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
    console.info('333', result);
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
// export function chatRemoveMessage(messageId) {
//   return {
//     messageId: action.messageId,
//     type: CHAT_REMOVE_MESSAGE,
//   };
// }
export function fetchMessages() {
  return async dispatch => {
    dispatch(fetchDataStart());
    try {
      const response = await fetch('http://localhost:8080/api/messages');
      const data = await response.json();
      // console.info('Data from fetchMessages', data);
      return dispatch(fetchMessagesSuccess(data.data));
    } catch (error) {
      return dispatch(fetchDataFailure(error));
    }
  };
}
