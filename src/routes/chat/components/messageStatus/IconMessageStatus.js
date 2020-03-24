import React from 'react';
import PropTypes from 'prop-types';
import readSvg from './assets/read.svg';
import noReadSvg from './assets/noread.svg';

function IconMessageStatus({ isMe, isRead }) {
  return (
    (isMe &&
      (isRead ? (
        <img alt="Read icon" src={readSvg} />
      ) : (
        <img alt="No read icon" src={noReadSvg} />
      ))) ||
    null
  );
}

IconMessageStatus.propTypes = {
  isMe: PropTypes.bool,
  isRead: PropTypes.bool,
};

export default IconMessageStatus;
