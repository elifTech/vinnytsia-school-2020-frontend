import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import s from './CustomFieldLogin.css';

export default function CustomFieldLogin({
  input: { name, onBlur, onChange, onDragStart, onDrop, onFocus },
  label,
  type,
  meta: { touched, error },
}) {
  useStyles(s);

  return (
    <div>
      <label htmlFor={name}>
        {label}
        <div className="form-group">
          <input
            className="form-control form-control-lg"
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onFocus={onFocus}
            placeholder={label}
            type={type}
          />
          {touched && error && <div className={s.inputsError}>{error}</div>}
        </div>
      </label>
    </div>
  );
}
CustomFieldLogin.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  type: PropTypes.string,
};
CustomFieldLogin.defaultProps = {
  label: 'input',
  type: 'text',
};
