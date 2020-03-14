import React from 'react';
import map from 'lodash/map';
import Message from '../message';

function Messages(itemstest) {
  const { items } = itemstest;
  return (
    <div>
      {items.length > 0 &&
        map(items, item => {
          return (
            <Message
              key={item.id}
              createdAt={item.created_at}
              isMe={false}
              text={item.text}
              user={item.user}
            />
          );
        })}
    </div>
  );
}

export default Messages;

// {items.length > 0 &&
// map(item => {
//   // console.info(item);
//   return (
//     <Message
//       key={item.id}
//       createdAt={item.created_at}
//       isMe={false}
//       text={item.text}
//       user={item.user}
//     />
//   );
// })}
//
