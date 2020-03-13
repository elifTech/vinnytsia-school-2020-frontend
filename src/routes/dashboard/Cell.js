import property from 'lodash/property';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { changeCellValue } from '../../actions/calc-table';

export default function Cell({ i, className, j }) {
  const dispatch = useDispatch();
  const handleChange = useCallback(
    event => dispatch(changeCellValue(i, j, event.target.value)),
    [dispatch, i, j],
  );
  const value = useSelector(
    property(`calcTable.table.${j}.${i}`),
    shallowEqual,
  );
  return (
    <div key={i} className={className}>
      <input onChange={handleChange} type="number" value={value} />
    </div>
  );
}
Cell.propTypes = {
  className: PropTypes.string,
  i: PropTypes.number.isRequired,
  j: PropTypes.number.isRequired,
};
Cell.defaultProps = {
  className: undefined,
};
