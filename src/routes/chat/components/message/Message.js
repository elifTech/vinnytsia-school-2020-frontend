import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import s from './Message.css';

function Message({ isMe, createdAt, text, user }) {
  return (
    <div
      className={classNames('message', {
        [s.isMe]: isMe,
      })}
    >
      <div className={s.message}>
        <span>{user.fullname}</span>
        <div>
          <div className={s.content}>
            <img
              alt="user avatar"
              className={s.avatar}
              src="https://googleretailtraining.exceedlms.com/assets/student/google/default_avatar-5298a7fcd9a9a0ce0d2b32e9aa826a32cc521cb5249540190792626b75504b39.png"
            />
            <div className={s.bubble}>
              <p className={s.bubbleText}>{text}</p>
            </div>
          </div>
          <span className={s.date}>{createdAt}</span>
        </div>
      </div>
    </div>
  );
}

Message.defaultProps = {
  createdAt: null,
  fullname: null,
  isMe: false,
  text: PropTypes.string,
  user: {},
};

Message.propTypes = {
  createdAt: PropTypes.string,
  fullname: PropTypes.string,
  isMe: PropTypes.bool,
  text: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
};

export default withStyles(s)(Message);
