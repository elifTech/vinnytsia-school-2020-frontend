import React from 'react';
import PropTypes from 'prop-types';
import readedSvg from './assets/readed.svg';
import noReadedSvg from './assets/noreaded.svg';

function IconMessageStatus({ isMe, isReaded }) {
  return (
    (isMe &&
      (isReaded ? (
        <img alt="Readed icon" src={readedSvg} />
      ) : (
        <img alt="No readed icon" src={noReadedSvg} />
      ))) ||
    null
  );
}

IconMessageStatus.propTypes = {
  isMe: PropTypes.bool,
  isReaded: PropTypes.bool,
};

export default IconMessageStatus;
