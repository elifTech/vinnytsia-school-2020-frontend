import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import movementDetection from './movement-detection';
import chat from './chat';

export default combineReducers({
  chat,
  movementDetection,
  form: formReducer,
});
