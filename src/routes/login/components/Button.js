import React from 'react';
import PropTypes from 'prop-types';
import replace from 'lodash/replace';
import upperCase from 'lodash/upperCase';

export default function Button({ name, buttonLoginHandler }) {
  return (
    <button name={name} onClick={buttonLoginHandler} type="submit">
      {replace(name, name[0], upperCase(name[0]))}
    </button>
  );
}
Button.propTypes = {
  buttonLoginHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
