import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import chat from './chat';
import wSensors from './window-sensors';

export default combineReducers({
  chat,
  wSensors,
  form: formReducer,
});
