import property from 'lodash/property';
import times from 'lodash/times';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import Cell from './Cell';

export default function Row({ className, j }) {
  const numberOfColumns =
    useSelector(property('calcTable.numberOfColumns')) || 0;
  return (
    <div className={className}>
      {times(numberOfColumns, i => (
        <Cell key={i} i={i} j={j} />
      ))}
    </div>
  );
}
Row.propTypes = {
  className: PropTypes.string,
  j: PropTypes.number.isRequired,
};
Row.defaultProps = {
  className: undefined,
};
