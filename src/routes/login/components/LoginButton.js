import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';

export default function LoginButton({ name, buttonLoginHandler }) {
  return (
    <button name={name} onClick={buttonLoginHandler} type="submit">
      {capitalize(name)}
    </button>
  );
}
LoginButton.propTypes = {
  buttonLoginHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
