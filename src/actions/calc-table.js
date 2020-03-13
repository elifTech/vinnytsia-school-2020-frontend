import {
  CHANGE_CELL_VALUE,
  CHANGE_NUM_OF_ROWS,
  CHANGE_NUM_OF_COLUMNS,
} from '../constants';

export function changeCellValue(i, j, newValue) {
  return {
    i,
    j,
    newValue: parseInt(newValue),
    type: CHANGE_CELL_VALUE,
  };
}
export function changeNumberOfRows(newValue) {
  return {
    newValue,
    type: CHANGE_NUM_OF_ROWS,
  };
}

export function changeNumberOfColumns(newValue) {
  return {
    newValue,
    type: CHANGE_NUM_OF_COLUMNS,
  };
}
