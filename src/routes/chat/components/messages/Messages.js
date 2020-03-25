import React from 'react';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import Message from '../message';

const testValueIsMe = true;

function Messages({ items }) {
  console.info('In messages', items);
  return (
    <div>
      {!isEmpty(items) &&
        map(items, item => {
          return (
            <Message
              key={item.id}
              createdAt={item.createdAt}
              isMe={testValueIsMe}
              text={item.text}
              user={item.user}
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
      user: PropTypes.object,
    }),
  ),
};
Messages.defaultProps = {
  items: [],
};

export default Messages;
