import React, { memo } from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import toUpper from 'lodash/toUpper';
import isEmpty from 'lodash/isEmpty';

import s from './Avatar.css';

function Avatar({ user }) {
  useStyles(s);
  if (user.avatar) {
    return (
      <img
        alt={`Avatar ${user.fullname}`}
        className={s.avatar}
        src={user.avatar}
      />
    );
  }
  if (!isEmpty(user.fullname)) {
    const firstChar = toUpper(`${user.fullname[0]}`);
    return <div className={s.symbol}>{firstChar}</div>;
  }

  const userNameSymbol = 'N';
  const firstChar = toUpper(userNameSymbol);
  return <div className={s.symbol}>{firstChar}</div>;
}

Avatar.defaultProps = {
  user: {},
};

Avatar.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    fullname: PropTypes.string,
  }),
};

export default memo(Avatar);
