import React, { memo } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import Avatar from '../avatar';
import IconMessageStatus from '../messageStatus/IconMessageStatus';

import s from './Message.css';

const testIsRead = true;

function Message({ currentUserId, createdAt, text, user }) {
  useStyles(s);
  let isMe = false;
  let messageUserId = currentUserId;
  const checkUserId = () => {
    if (!isEmpty(user)) {
      messageUserId = user.id;
    }
    return messageUserId;
  };
  checkUserId();
  const isMeValue = () => {
    if (currentUserId === messageUserId) {
      isMe = true;
      return isMe;
    }
    return isMe;
  };
  isMeValue();
  return (
    <div
      className={classNames('message', {
        [s.isMe]: isMe,
      })}
    >
      <div className={s.message}>
        <span
          className={classNames({
            [s.fullname]: isMe,
          })}
        >
          {user.fullname}
        </span>
        <div>
          <div className={s.content}>
            <Avatar user={user} />
            <div
              className={classNames(s.bubble, {
                [s.bubbleIsMe]: isMe,
              })}
            >
              <p>{text}</p>
            </div>
            <IconMessageStatus isMe={isMe} isRead={testIsRead} />
          </div>
          <span
            className={classNames(s.date, {
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
  currentUserId: null,
  // isMe: false,
  text: null,
  user: {},
};

Message.propTypes = {
  createdAt: PropTypes.string,
  currentUserId: PropTypes.number,
  text: PropTypes.string,
  user: PropTypes.shape({
    fullname: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default memo(Message);
