import {
  CHAT_ADD_MESSAGE,
  CHAT_MESSAGE_IS_TYPING,
  // CHAT_REMOVE_MESSAGE,
} from '../constants';

const initialState = {
  items: null,
  isTyping: false,
};

export default function chatReducer(state = initialState, { type, payload }) {
  // let newValue = action;
  switch (type) {
    case CHAT_ADD_MESSAGE:
      return {
        ...state,
        items: payload,
        isTyping: false,
      };
    case CHAT_MESSAGE_IS_TYPING:
      return {
        ...state,
        items: null,
        isTyping: payload,
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
