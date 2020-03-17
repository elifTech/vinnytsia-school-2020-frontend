// import get from 'lodash/get';
import {
  GET_ALL_MESSAGES,
  CHAT_ADD_MESSAGE,
  CHAT_MESSAGE_IS_TYPING,
  // CHAT_REMOVE_MESSAGE,
} from '../constants';

// const initialState = {
//   messages: [],
//   isTyping: false,
// };

export default function chat(state = {}, action) {
  // let newValue = action;
  // let messages = get(state, 'messages', []);
  switch (action.type) {
    case GET_ALL_MESSAGES:
      // messages = Array.from(messages);
      return {
        ...state,
        messages: action.items,
        isTyping: false,
      };
    case CHAT_ADD_MESSAGE:
      return {
        ...state,
        newMessage: action.payload,
        isTyping: false,
      };
    case CHAT_MESSAGE_IS_TYPING:
      return {
        ...state,
        // messages: null,
        isTyping: action.payload,
      };
    // case CHAT_REMOVE_MESSAGE:
    //   return {
    //     ...state,
    //     items: payload,
    //   };
    default:
      return state;
  }
}
