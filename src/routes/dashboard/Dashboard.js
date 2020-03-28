import invoke from 'lodash/invoke';
import property from 'lodash/property';
import React, { memo } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { useSelector } from 'react-redux';
import s from './Dashboard.css';
import SuperheroesForm from './SuperheroesForm';

function preventDefault(event) {
  invoke(event, 'preventDefault');
}

function Dashboard() {
  useStyles(s);
  const superheroesData = useSelector(property('form.superheroes'));
  return (
    <div className={s.root}>
      <div className={s.container}>Smart Security Dashboard</div>
      <SuperheroesForm handleSubmit={preventDefault} />
      <pre>{JSON.stringify(superheroesData, null, 2)}</pre>
    </div>
  );
}

Dashboard.whyDidYouRender = true;
export default memo(Dashboard);
