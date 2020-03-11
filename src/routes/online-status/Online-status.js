import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Online-status.css';

class OnlineStatus extends PureComponent {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>Chheck online status</div>
      </div>
    );
  }
}
OnlineStatus.whyDidYouRender = true;
export default withStyles(s)(React.memo(OnlineStatus));
