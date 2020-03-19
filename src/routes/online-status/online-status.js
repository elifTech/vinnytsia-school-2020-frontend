import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Online-status.css';

function OnlineStatus() {
  return (
    <div className={s.root}>
      <div className={s.container}>Check online status</div>
    </div>
  );
}
OnlineStatus.whyDidYouRender = true;
export default withStyles(s)(React.memo(OnlineStatus));
