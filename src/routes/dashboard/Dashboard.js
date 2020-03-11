import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Dashboard.css';

function Dashboard() {
  return (
    <div className={s.root}>
      <div className={s.container}>Smart Security Dashboard</div>
    </div>
  );
}

Dashboard.whyDidYouRender = true;
export default withStyles(s)(React.memo(Dashboard));
