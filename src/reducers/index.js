import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import as from './as';
import calcTable from './calc-table';
import chatReducer from './security-chat';

export default combineReducers({
  as,
  calcTable,
  chatReducer,
  form: formReducer,
});
