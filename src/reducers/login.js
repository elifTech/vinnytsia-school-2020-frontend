import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTRATION_START,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
  ALERT_HIDE,
  ALERT_SHOW,
} from '../constants';

const initialState = {
  loading: false,
  isLogedIn: false,
  alert: null,
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
        ...action.data,
        isLogedIn: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        ...action.data,
        isLogedIn: false,
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
        ...action.data,
        isLogedIn: false,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.data,
        isLogedIn: true,
      };
    case ALERT_HIDE:
      return {
        ...state,
        alert: null,
      };
    case ALERT_SHOW:
      return {
        ...state,
        alert: action.text,
      };
    default:
      return state;
  }
}
