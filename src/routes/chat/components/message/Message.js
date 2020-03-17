import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import Avatar from '../avatar';
import IconMessageStatus from '../messageStatus/MessageStatus';

import s from './Message.css';

const testIsReaded = true;

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
              alt="User"
              className={s.avatar}
              src="https://googleretailtraining.exceedlms.com/assets/student/google/default_avatar-5298a7fcd9a9a0ce0d2b32e9aa826a32cc521cb5249540190792626b75504b39.png"
            />
            <div
              className={classNames(`${s.bubble}`, {
                [s.bubbleIsMe]: isMe,
              })}
            >
              <p>{text}</p>
            </div>
            <IconMessageStatus
              className={s.messageStatus}
              isMe={isMe}
              isReaded={testIsReaded}
            />
          </div>
          <span
            className={classNames(`${s.date}`, {
              [s.isMeDate]: isMe,
            })}
          >
            {createdAt}
          </span>
        </div>
      </div>
    </div>
  );
}

Message.defaultProps = {
  createdAt: null,
  isMe: false,
  text: PropTypes.string,
  user: {},
};

Message.propTypes = {
  createdAt: PropTypes.string,
  isMe: PropTypes.bool,
  text: PropTypes.string,
  user: PropTypes.shape({
    fullname: PropTypes.string,
  }),
};

export default withStyles(s)(Message);