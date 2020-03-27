import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTRATION_START,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
} from '../constants';

const initialState = {
  loading: false,
};
export default function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case REGISTRATION_START:
      return {
        ...state,
        loading: true,
      };
    case REGISTRATION_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
