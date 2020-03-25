import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './OnlineStatus.css';

function OnlineStatus() {
  useStyles(s);
  return (
    <div className={s.root}>
      <div className={s.container}>Check online status</div>
    </div>
  );
}
OnlineStatus.whyDidYouRender = true;
export default React.memo(OnlineStatus);
