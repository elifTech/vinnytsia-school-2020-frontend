import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';

export default function LoginButton({ name, buttonLoginHandler, hasError }) {
  return (
    <button
      className="btn btn-primary"
      disabled={hasError}
      name={name}
      onClick={buttonLoginHandler}
      type="submit"
    >
      {capitalize(name)}
    </button>
  );
}
LoginButton.propTypes = {
  buttonLoginHandler: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};
