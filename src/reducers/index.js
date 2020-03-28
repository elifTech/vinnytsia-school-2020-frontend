import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import movementDetection from './movement-detection';
import chat from './chat';
import login from './login';

export default combineReducers({
  chat,
  movementDetection,
  form: formReducer,
  login,
});
