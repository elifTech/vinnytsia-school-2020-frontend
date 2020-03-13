import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import as from './as';
import calcTable from './calc-table';

export default combineReducers({
  as,
  calcTable,
  form: formReducer,
});
