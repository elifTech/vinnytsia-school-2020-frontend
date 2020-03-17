import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import toUpper from 'lodash/toUpper';

import s from './Avatar.css';

function Avatar({ user }) {
  if (user.avatar) {
    return (
      <img
        alt={`Avatar ${user.fullname}`}
        className={s.avatar}
        src={user.avatar}
      />
    );
  }
  const firstChar = toUpper(`${user.fullname[0]}`);
  return <div className={s.symbol}>{firstChar}</div>;
}

Avatar.defaultProps = {
  fullname: 'someone',
  user: {},
};

Avatar.propTypes = {
  fullname: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
};

export default withStyles(s)(Avatar);
