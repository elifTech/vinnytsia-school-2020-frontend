import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

function CustomField({
  className,
  input: { name, onBlur, onChange, onDragStart, onDrop, onFocus },
  label,
  meta: { touched, error, warning },
  placeholder,
  type,
}) {
  return (
    <label className="form-group" htmlFor={name}>
      {label}
      <input
        className={classNames('form-control', className, {
          'is-invalid': touched && error,
        })}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onFocus={onFocus}
        placeholder={placeholder}
        type={type}
      />
      {touched &&
        ((error && <p className="invalid-feedback">{error}</p>) ||
          (warning && <p>{warning}</p>))}
    </label>
  );
}
CustomField.propTypes = {
  className: PropTypes.string,
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
    warning: PropTypes.string,
  }).isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};
CustomField.defaultProps = {
  className: null,
  label: null,
  placeholder: null,
  type: 'text',
};

export default CustomField;
