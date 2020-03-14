import {
  CHAT_ADD_MESSAGE,
  CHAT_MESSAGE_IS_TYPING,
  // CHAT_REMOVE_MESSAGE,
} from '../constants';

import messages from '../routes/chat/testData.json';

export function chatAddMessage(userInput) {
  return {
    payload: userInput,
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
  chatAddMessage(messages);
}
