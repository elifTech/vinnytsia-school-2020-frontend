import React from 'react';
import PropTypes from 'prop-types';
import replace from 'lodash/replace';
import upperCase from 'lodash/upperCase';

export default function Input({ name, inputChangeHandler, value }) {
  return (
    <label htmlFor={name}>
      <span>{replace(name, name[0], upperCase(name[0]))}</span>
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
