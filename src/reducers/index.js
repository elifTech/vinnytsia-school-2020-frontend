import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import as from './as';
import calcTable from './calc-table';
import chat from './chat';

export default combineReducers({
  as,
  calcTable,
  chat,
  form: formReducer,
});
