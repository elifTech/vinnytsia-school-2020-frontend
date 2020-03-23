import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useStyles from 'isomorphic-style-loader/useStyles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import Avatar from '../avatar';
import IconMessageStatus from '../messageStatus/IconMessageStatus';
import { setCurrentMessage } from '../../../../actions/security-chat';
import deleteicon from './assets/deleticon.svg';

import s from './Message.css';

const testIsRead = true;

function Message({
  chatRemoveMessage,
  changeInputToEdit,
  currentUserId,
  createdAt,
  item,
  messageId,
  text,
  user,
}) {
  useStyles(s);
  const dispatch = useDispatch();
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
  const deleteMessages = useCallback(() => {
    dispatch(chatRemoveMessage(messageId));
  }, [chatRemoveMessage, dispatch, messageId]);
  const setEditMessageDataToRedux = useCallback(() => {
    dispatch(changeInputToEdit);
    dispatch(setCurrentMessage(messageId, text, item));
  }, [changeInputToEdit, dispatch, messageId, text, item]);
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
            {isMe && (
              <div>
                <button
                  className={s.deleteButton}
                  onClick={deleteMessages}
                  type="submit"
                >
                  <img alt="del" src={deleteicon} />
                </button>
                <button
                  className={s.updateButton}
                  onClick={setEditMessageDataToRedux}
                  type="submit"
                >
                  Edit
                </button>
              </div>
            )}
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
  item: {},
  messageId: null,
  text: null,
  user: {},
};

Message.propTypes = {
  changeInputToEdit: PropTypes.func.isRequired,
  chatRemoveMessage: PropTypes.func.isRequired,
  createdAt: PropTypes.string,
  currentUserId: PropTypes.number,
  item: PropTypes.shape({
    attachment: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    userData: PropTypes.object.isRequired,
    UserId: PropTypes.number.isRequired,
  }),
  messageId: PropTypes.number,
  text: PropTypes.string,
  user: PropTypes.shape({
    fullname: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default memo(Message);
