import React, { useRef, useEffect } from 'react';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import Message from '../message';

const testUserId = 1;
const temporaryId = Math.random();

function Messages({ changeInputToEdit, chatRemoveMessage, items }) {
  console.info('In messages', items);
  const messageReference = useRef(null);
  useEffect(() => {
    messageReference.current.scrollIntoView(0, items[items.length - 1]);
  }, [items]);
  return (
    <div ref={messageReference}>
      {!isEmpty(items) ? (
        map(items, item => {
          return (
            <Message
              key={item.id || temporaryId}
              attachment={item.attachments}
              changeInputToEdit={changeInputToEdit}
              chatRemoveMessage={chatRemoveMessage}
              createdAt={item.createdAt}
              currentUserId={testUserId}
              item={item}
              messageId={item.id}
              text={item.text}
              user={item.userData}
            />
          );
        })
      ) : (
        <span>Server disconnected</span>
      )}
    </div>
  );
}

Messages.propTypes = {
  changeInputToEdit: PropTypes.func.isRequired,
  chatRemoveMessage: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      attachments: PropTypes.string,
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
