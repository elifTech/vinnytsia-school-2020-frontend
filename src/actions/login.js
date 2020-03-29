import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  apiURL,
  ALERT_SHOW,
  ALERT_HIDE,
} from '../constants';
import fetchAsync from '../utils/fetch';
import createExpiresCookie from '../utils/create-expires-cookie';

const cookie = require('isomorphic-cookie');

const minutesOfCookieLive = 60;
export function loginStart() {
  return {
    type: LOGIN_START,
  };
}
export function loginSuccess(data) {
  cookie.save('token', data.data.token, {
    expires: createExpiresCookie(minutesOfCookieLive),
    secure: false,
  });
  return {
    type: LOGIN_SUCCESS,
    data,
  };
}
export function alertShow(text) {
  return {
    type: ALERT_SHOW,
    text,
  };
}
export function alertHide() {
  return {
    type: ALERT_HIDE,
  };
}
export function alertCreator(text) {
  const millisecondsToAlertDisapear = 3000;
  return dispatch => {
    dispatch(alertShow(text));
    setTimeout(() => {
      dispatch(alertHide());
    }, millisecondsToAlertDisapear);
  };
}

export function loginFailure(data) {
  return {
    type: LOGIN_FAILURE,
    data,
  };
}
export function login(loginValue) {
  return async dispatch => {
    dispatch(loginStart());
    try {
      const payload = await fetchAsync(`${apiURL}/login`, 'POST', loginValue);
      if (!payload.data) {
        dispatch(alertCreator(payload.message));
        return dispatch(loginFailure(payload));
      }
      dispatch(alertCreator(payload.message));
      return dispatch(loginSuccess(payload));
    } catch (error) {
      dispatch(alertCreator('Wow, some error appear'));
      return dispatch(loginFailure(error));
    }
  };
}

export function registrationStart() {
  return {
    type: REGISTRATION_START,
  };
}
export function registrationSuccess(data) {
  cookie.save('token', data.data.token, {
    expires: createExpiresCookie(minutesOfCookieLive),
    secure: false,
  });
  return {
    type: REGISTRATION_SUCCESS,
    data,
  };
}

export function registrationFailure(data) {
  return {
    type: REGISTRATION_FAILURE,
    data,
  };
}

export function registration(regitrationValue) {
  return async dispatch => {
    dispatch(registrationStart());
    try {
      const payload = await fetchAsync(
        `${apiURL}/registration`,
        'POST',
        regitrationValue,
      );
      if (!payload.data) {
        dispatch(alertCreator(payload.message));
        return dispatch(registrationFailure(payload));
      }
      dispatch(alertCreator(payload.message));
      return dispatch(registrationSuccess(payload));
    } catch (error) {
      dispatch(alertCreator('Wow, some error appear'));
      return dispatch(registrationFailure(error));
    }
  };
}
