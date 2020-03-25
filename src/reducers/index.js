import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import as from './as';
import calcTable from './calc-table';
import movementDetection from './movement-detection';
import chat from './chat';

export default combineReducers({
  as,
  calcTable,
  movementDetection,
  chat,
  form: formReducer,
});
