import React from 'react';
import PropTypes from 'prop-types';

export default function AlertMessage({ message }) {
  return (
    <div className="alert alert-success" role="alert">
      {message}
    </div>
  );
}
AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
