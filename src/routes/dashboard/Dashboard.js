import get from 'lodash/get';
import property from 'lodash/property';
import times from 'lodash/times';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import isNaN from 'lodash/isNaN';
import sum from 'lodash/sum';
import sumBy from 'lodash/sumBy';
import s from './Dashboard.css';
import fetchData from '../../actions/as';
import Row from './Row';
import {
  changeNumberOfRows,
  changeNumberOfColumns,
} from '../../actions/calc-table';

function Dashboard() {
  useStyles(s);
  const dispatch = useDispatch();
  const table = useSelector(property('calcTable.table'));
  const numberOfRows =
    useSelector(property('calcTable.numberOfRows'), shallowEqual) || 0;
  const numberOfColumns =
    useSelector(property('calcTable.numberOfColumns'), shallowEqual) || 0;
  const sumOfCells = useMemo(() => sumBy(table, sum), [table]);
  const asData = useSelector(property('as.data'), shallowEqual);
  const isLoading = useSelector(property('as.isLoading'), shallowEqual);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const handleNumberOfRowsChange = useCallback(
    event => {
      let newValue = parseInt(get(event, 'target.value', 0));
      if (isNaN(newValue)) {
        newValue = 0;
      }
      dispatch(changeNumberOfRows(newValue));
    },
    [dispatch],
  );
  const handleNumberOfColumnsChange = useCallback(
    event => {
      let newValue = parseInt(get(event, 'target.value', 0));
      if (isNaN(newValue)) {
        newValue = 0;
      }
      dispatch(changeNumberOfColumns(newValue));
    },
    [dispatch],
  );
  return (
    <div className={s.root}>
      <div className={s.container}>Smart Security Dashboard</div>
      <p>
        <label htmlFor="number-of-rows">
          Number of rows:{' '}
          <input
            id="number-of-rows"
            onChange={handleNumberOfRowsChange}
            type="number"
            value={numberOfRows}
          />
        </label>
        <label htmlFor="number-of-columns">
          Number of columns:{' '}
          <input
            id="number-of-columns"
            onChange={handleNumberOfColumnsChange}
            type="number"
            value={numberOfColumns}
          />
        </label>
      </p>
      {times(numberOfRows, j => (
        <Row key={j} className={s.row} j={j} />
      ))}
      <p>{sumOfCells}</p>
      {isLoading && <h1>LOADING</h1>}
      <p>{JSON.stringify(asData)}</p>
    </div>
  );
}

Dashboard.whyDidYouRender = true;
export default memo(Dashboard);
