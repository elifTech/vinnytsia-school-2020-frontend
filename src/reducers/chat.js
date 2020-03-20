import isEmpty from 'lodash/isEmpty';
import {
  GET_ALL_MESSAGES,
  CHAT_ADD_MESSAGE,
  CHAT_MESSAGE_IS_TYPING,
  // CHAT_REMOVE_MESSAGE,
} from '../constants';

export default function chat(state = { messages: [] }, action) {
  const { messages } = state;
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return {
        ...state,
        messages: action.items,
        isTyping: false,
      };
    case CHAT_ADD_MESSAGE:
      return {
        ...state,
        messages: isEmpty(messages)
          ? [action.message]
          : [...messages, action.message],
        isTyping: false,
      };
    case CHAT_MESSAGE_IS_TYPING:
      return {
        ...state,
        isTyping: action.isTyping,
      };
    // case CHAT_REMOVE_MESSAGE:
    //   return {
    //     ...state,
    //     messageId: id,
    //   };
    default:
      return state;
  }
}
