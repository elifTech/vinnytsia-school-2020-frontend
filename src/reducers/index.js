import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import movementDetection from './movement-detection';
import chat from './chat';
import windowSensors from './window-sensors';

export default combineReducers({
  chat,
  windowSensors,
  movementDetection,
  form: formReducer,
});
