// import fetch from 'node-fetch';
import {
  GET_ALL_MESSAGES,
  CHAT_ADD_MESSAGE,
  CHAT_MESSAGE_IS_TYPING,
  FETCH_DATA_START,
  FETCH_DATA_FAILURE,
  // FETCH_DATA_SUCCESS,
  // CHAT_REMOVE_MESSAGE,
} from '../constants';

import messageApi from '../utils/api/messages-api';
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

function getAllMessage(items) {
  socket.emit('CHAT:ON', { message: 'Chat is open' });
  // console.info('22222', items);
  return {
    items,
    isTyping: false,
    type: GET_ALL_MESSAGES,
  };
}
export function chatAddMessage(newMessage) {
  messageApi.createMessage(newMessage);
  return {
    payload: newMessage,
    isTyping: false,
    type: CHAT_ADD_MESSAGE,
  };
}
export function chatMessageIsLoading(boolean) {
  return {
    items: null,
    payload: boolean,
    type: CHAT_MESSAGE_IS_TYPING,
  };
}
// export function chatRemoveMessage(messageId) {
//   return {
//     messageId,
//     type: CHAT_REMOVE_MESSAGE,
//   };
// }
export function fetchMessages() {
  return async dispatch => {
    dispatch(fetchDataStart());
    try {
      const items = await messageApi.getAllMessages();
      // console.info('11111', items.data.data);
      return dispatch(getAllMessage(items.data.data));
    } catch (error) {
      return dispatch(fetchDataFailure(error));
    }
  };
}
// export function fetchMessages() {
//   // chatAddMessage(messages);
//   return async dispatch => {
//     dispatch(fetchDataStart());
//     try {
//       const response = await fetch('http://localhost:8080/api/message');
//       const items = await response.json();
//       console.info('11111', items.data);
//       return dispatch(getAllMessage(items.data));
//     } catch (error) {
//       return dispatch(fetchDataFailure(error));
//     }
//   };
// }
