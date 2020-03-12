import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';

export default function Input({ name, inputChangeHandler, value }) {
  return (
    <label htmlFor={name}>
      <span>{capitalize(name)}</span>
      <input
        id={name}
        name={name}
        onChange={inputChangeHandler}
        type={name}
        value={value}
      />
    </label>
  );
}
Input.propTypes = {
  inputChangeHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
