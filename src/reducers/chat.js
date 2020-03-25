import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';
import assign from 'lodash/assign';
import {
  GET_ALL_MESSAGES,
  CHAT_ADD_MESSAGE,
  CHAT_MESSAGE_IS_TYPING,
  CHAT_REMOVE_MESSAGE,
  CHAT_UPDATE_MESSAGE_BY_ID,
  EDIT_MESSAGE,
} from '../constants';

export default function chat(state = { messages: [] }, action) {
  const { messages } = state;
  const editMessageIndex = findIndex(messages, { id: action.messageId });
  const newArrayMessages = Array.from(
    assign(messages, (messages[editMessageIndex] = action.message)),
  );

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
    case CHAT_REMOVE_MESSAGE:
      return {
        ...state,
        messageId: action.messageId,
      };
    case CHAT_UPDATE_MESSAGE_BY_ID:
      return {
        ...state,
        messages: newArrayMessages,
      };
    case EDIT_MESSAGE:
      return {
        ...state,
        message: action.message,
        messageId: action.messageId,
        editMessageText: action.editMessageText,
      };
    default:
      return state;
  }
}
