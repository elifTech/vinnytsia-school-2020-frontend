import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import chat from './chat';
import windowSensors from './window-sensors';

export default combineReducers({
  chat,
  windowSensors,
  form: formReducer,
});
