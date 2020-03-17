import React from 'react';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import size from 'lodash/size';

import Message from '../message';

const testValueIsMe = true;

function Messages({ items }) {
  // console.info('In messages', items);
  return (
    <div>
      {size(items) > 0 &&
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
  items: PropTypes.shape([]),
};
Messages.defaultProps = {
  items: [],
};

export default Messages;
