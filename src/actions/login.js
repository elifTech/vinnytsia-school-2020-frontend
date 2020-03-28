import cookie from 'isomorphic-cookie';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  apiURL,
} from '../constants';
import fetchAsync from '../utils/fetch';

const maxAge = 604800; // a week
export function loginStart() {
  return {
    type: LOGIN_START,
  };
}
export function loginSuccess(data) {
  cookie.save('token', data.token, {
    maxAge,
  });
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  };
}
export function login(loginValue) {
  return async dispatch => {
    dispatch(loginStart());
    try {
      const data = await fetchAsync(`${apiURL}/auth`, 'POST', loginValue);
      if (!data.token) {
        return dispatch(loginFailure());
      }
      return dispatch(loginSuccess(data));
    } catch (error) {
      return dispatch(loginFailure());
    }
  };
}

export function registrationStart() {
  return {
    type: REGISTRATION_START,
  };
}
export function registrationSuccess() {
  return {
    type: REGISTRATION_SUCCESS,
  };
}

export function registrationFailure() {
  return {
    type: REGISTRATION_FAILURE,
  };
}

export function registration() {
  return dispatch => {
    dispatch(registrationStart());
    try {
      // fetching registration
      return dispatch(registrationSuccess());
    } catch (error) {
      return dispatch(registrationFailure());
    }
  };
}
