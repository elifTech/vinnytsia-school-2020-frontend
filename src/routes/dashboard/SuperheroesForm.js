import useStyles from 'isomorphic-style-loader/useStyles';
import includes from 'lodash/includes';
import noop from 'lodash/noop';
import toLower from 'lodash/toLower';
import PropTypes from 'prop-types';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import CustomField from './CustomField';
import style from './SuperheroesForm.css';

function validate(values) {
  const errors = {};
  if (!values.dc) {
    errors.dc = 'You should choose at least your least hated superhero';
  }
  if (includes(toLower(values.dc), 'batman')) {
    errors.dc = "Batman's fans are not allowed";
  }
  if (!values.marvel) {
    errors.marvel = 'You should choose at least your least hated superhero';
  }
  if (includes(toLower(values.marvel), 'deadpool')) {
    errors.marvel = "Deadpool? A hero? C'mon";
  }
  return errors;
}

function NonDecoratedFormComponent({ handleSubmit = noop }) {
  useStyles(style);
  return (
    <form className={style.root} onSubmit={handleSubmit}>
      <Field
        className="form-control"
        component={CustomField}
        label="Your favourite DC superhero"
        name="dc"
      />
      <Field
        component={CustomField}
        label="Your favourite Marvel superhero"
        name="marvel"
      />
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}

const SuperheroesForm = reduxForm({ form: 'superheroes', validate })(
  NonDecoratedFormComponent,
);
NonDecoratedFormComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export default SuperheroesForm;
