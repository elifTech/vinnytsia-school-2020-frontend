import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
} from '../constants';

export function loginStart() {
  return {
    type: LOGIN_START,
  };
}
export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  };
}
export function login() {
  return dispatch => {
    dispatch(loginStart());
    try {
      // fetcing to server
      return dispatch(loginSuccess());
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
