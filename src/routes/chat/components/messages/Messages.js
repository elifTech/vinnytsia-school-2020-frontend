import React from 'react';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import Message from '../message';

// const testValueIsMe = true;
const testUserId = 1;

function Messages({ items }) {
  console.info('In messages', items);
  return (
    <div>
      {!isEmpty(items) &&
        map(items, item => {
          let isMe = false;
          let messageUserId = testUserId;
          const checkUserId = () => {
            if (!isEmpty(item.userData)) {
              messageUserId = item.userData.id;
            }
            return messageUserId;
          };
          checkUserId();
          const isMeValue = () => {
            if (testUserId === messageUserId) {
              isMe = true;
              return isMe;
            }
            return isMe;
          };
          isMeValue();
          return (
            <Message
              key={item.id}
              createdAt={item.createdAt}
              isMe={isMe}
              text={item.text}
              user={item.userData}
            />
          );
        })}
    </div>
  );
}

Messages.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      attachment: PropTypes.object,
      createdAt: PropTypes.string,
      id: PropTypes.number,
      text: PropTypes.string,
      updatedAt: PropTypes.string,
      userData: PropTypes.object,
    }),
  ),
};
Messages.defaultProps = {
  items: [],
};

export default Messages;
